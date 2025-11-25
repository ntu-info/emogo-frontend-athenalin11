# Android 測試指南

## 已修正的問題

### ✅ java.lang.String cannot be cast to java.lang.Boolean

**問題來源：**
- Expo Camera 在 Android 上的屬性類型問題
- Tabs 組件缺少明確的 screenOptions

**已實施的修正：**

1. **CameraView 配置簡化**
   - 移除所有可能導致類型衝突的參數
   - 使用手動 `setTimeout` 控制錄影時長

2. **Tabs Layout 明確配置**
   - 添加 `screenOptions={{ headerShown: true }}`
   - 確保所有屬性都是正確的類型

3. **Notifications 兼容性**
   - 在 Expo Go 中安全地禁用
   - 在正式 APK 中才會啟用

## 測試步驟

### 1. 重新載入應用程式
在手機上：
- 搖動手機
- 選擇 "Reload"

### 2. 測試首頁
- ✅ 應該能看到首頁
- ✅ 看到統計卡片
- ✅ 看到三個按鈕

### 3. 測試記錄功能
1. 點擊「📝 開始新記錄」
2. 填寫情緒問卷
3. 點擊「下一步」
4. **關鍵測試：** 進入相機頁面（這裡之前會崩潰）
5. 點擊錄影按鈕
6. 應該能成功錄製 1 秒影片

### 4. 測試 GPS
- 進入步驟 3
- 應該能自動獲取 GPS 座標

## 已知限制（在 Expo Go 中）

⚠️ **通知功能不可用** - 這是正常的
- Expo Go 不支援 expo-notifications
- 需要建立 APK 後才能測試通知

✅ **相機功能可用**
✅ **GPS 功能可用**
✅ **SQLite 功能可用**

## 如果還有問題

如果仍然出現 `java.lang.String cannot be cast to java.lang.Boolean` 錯誤，
請提供以下資訊：

1. 錯誤出現的確切時機（哪個頁面/操作）
2. 完整的錯誤堆疊
3. Android 版本
4. Expo Go 版本

## 下一步

如果測試成功，可以進行：
1. ✅ 實際數據收集（需要 12+ 小時跨度）
2. ✅ 建立 Android APK
3. ✅ 提交作業
