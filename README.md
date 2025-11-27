# Emogo - Experience Sampling App

## 📱 應用程式資訊

- **名稱**: Emogo
- **版本**: 1.0.7
- **套件名稱**: com.athena11.emogo

## 🚀 部署連結

### 📥 作業繳交版本

**v1.0.7** - ⭐ **正式繳交版本**
- **下載連結**：https://expo.dev/accounts/athena_11/projects/emogo-frontend-athenalin11/builds/859b4afa-a978-40fc-8d72-94d2a7d20290
- ✅ 使用最新 File API
- ✅ 無 deprecation 警告
- ✅ 匯出功能正常（已成功匯出實際資料）
- ✅ 所有功能完整運作
- 📝 說明：匯出一次後需重新安裝 App 才能再次匯出（不影響作業要求）

### 📦 其他版本

**v1.0.8** - ⚠️ **不建議使用**
- 狀態：建立中但有問題
- 說明：嘗試支援重複匯出但遇到技術問題

**v1.0.5** - 備用版本
- 下載：https://expo.dev/accounts/athena_11/projects/emogo-frontend-athenalin11/builds/7c14765d-c1cf-4a43-a597-796f5c66560e
- ✅ 匯出功能正常
- ⚠️ 有 deprecation 警告（不影響功能）

### 版本歷史
- **v1.0.7** (2025-11-27) - ⭐ **作業繳交版本** - 使用 File API，所有功能正常
- **v1.0.8** (2025-11-27) - ⚠️ 不建議 - 建立中但有問題
- **v1.0.6** (2025-11-27) - ❌ 路徑錯誤
- **v1.0.5** (2025-11-26) - ✅ 備用 - 使用 Sharing API 匯出
- **v1.0.4** (2025-11-26) - ❌ StorageAccessFramework 錯誤
- **v1.0.3** (2025-11-26) - 有 deprecation 警告
- **v1.0.2** (2025-11-26) - 匯出格式修正
- **v1.0.1** (2025-11-26) - GPS 和相機修復
- **v1.0.0** (2025-11-26) - 初始版本

## 📦 使用的套件

1. `expo-notifications` - 每日三次提醒通知
2. `expo-sqlite` - 本地資料庫儲存
3. `expo-camera` - 1 秒影片錄製
4. `expo-file-system` - 檔案系統操作
5. `expo-sharing` - 資料匯出分享
6. `expo-location` - GPS 座標擷取

## 📊 資料收集

本應用程式收集三種類型的資料：
- **情感問卷** (PAD 模型：Pleasure, Arousal, Dominance)
- **1 秒 Vlog** 影片記錄
- **GPS 座標**

匯出的資料位於 `data/emogo_exported_data.json`

## 🔧 安裝方式

1. 下載上方 APK 連結
2. 在 Android 手機上安裝
3. 允許相機、位置等權限
4. 開始記錄您的情感體驗

## 📝 作業資訊

- **學生**: athena_11
- **提交日期**: 2025-11-26
- **資料筆數**: 4 筆（超過 47 小時時間跨度）
