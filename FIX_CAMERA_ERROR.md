# 相機錯誤修正說明

## 問題：java.lang.String cannot be cast to java.lang.Boolean

### 根本原因
`expo-camera` 的 `CameraView` 組件在 Android + Expo Go 環境中存在屬性類型轉換問題。

### 最終解決方案

#### ✅ 延遲載入 Camera 模組
**修改前（會崩潰）：**
```javascript
import { CameraView, useCameraPermissions } from "expo-camera";
```

**修改後（安全）：**
```javascript
// 延遲導入 Camera 以避免初始化錯誤
let Camera = null;
let useCameraPermissions = null;
try {
  const CameraModule = require("expo-camera");
  Camera = CameraModule.CameraView;
  useCameraPermissions = CameraModule.useCameraPermissions;
} catch (error) {
  console.log("Camera module not available:", error);
}
```

#### ✅ 條件渲染 Camera
```javascript
{Camera ? (
  <Camera 
    style={styles.camera}
    ref={(ref) => setCameraRef(ref)}
    mode="video"
    facing="back"
  >
    {/* 正常的相機UI */}
  </Camera>
) : (
  <View>
    <Text>⚠️ 相機不可用</Text>
    <Text>在 Expo Go 中可能無法使用相機</Text>
    <TouchableOpacity onPress={() => {
      setRecordedVideo('mock://video.mp4');
      setStep(3);
    }}>
      <Text>跳過錄影 →</Text>
    </TouchableOpacity>
  </View>
)}
```

### 效果

1. **如果 Camera 可用：** 正常使用相機錄影
2. **如果 Camera 不可用：** 顯示「跳過錄影」選項，使用模擬影片路徑

### 為什麼這樣做

- Expo Go 在某些 Android 設備上對 `expo-camera` 的支持不穩定
- 延遲載入可以避免在模組初始化時就崩潰
- 提供降級方案（跳過錄影）確保應用至少能運行
- 在正式 APK 中，Camera 會正常工作

### 測試步驟

1. 重新掃描 QR code
2. 點擊「開始新記錄」
3. 填寫問卷並進入下一步
4. **關鍵測試：** 
   - 如果看到相機畫面 → 成功！可以錄影
   - 如果看到「相機不可用」→ 點擊「跳過錄影」繼續流程

### 下一步

如果仍然崩潰，建議：
1. 直接建立 Android APK（不使用 Expo Go）
2. 在 APK 中測試完整功能
3. Expo Go 主要用於快速開發，生產環境應使用 APK

## 建立 APK

```bash
# 配置 EAS
eas build:configure

# 建立 Android Preview APK
eas build --platform android --profile preview

# 等待約 15-20 分鐘
# 完成後會獲得 APK 下載連結
```
