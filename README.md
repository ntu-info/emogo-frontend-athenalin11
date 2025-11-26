# Emogo - Experience Sampling App

## 📱 應用程式資訊

- **名稱**: Emogo
- **版本**: 1.0.0
- **套件名稱**: com.athena11.emogo

## 🚀 部署連結

**Expo.dev APK 下載（最新版）**: https://expo.dev/artifacts/eas/jYyUUTyPXphVdrYjB62Jwa.apk

### 版本歷史
- **v1.0.3** (2025-11-26 4:45 PM) - 修復資料匯出功能 ⭐ **推薦使用**
  - **資料匯出功能已修復並可正常運作**
  - 正確的 JSON 格式 (sentiment_records, vlog_records, gps_records)
  - 固定檔名為 emogo_exported_data.json
  - GPS 和相機功能完整
  - 注意：會顯示 deprecation 警告但不影響功能
- **v1.0.2** (2025-11-26 5:41 AM) - 修復資料匯出格式和檔案系統 API 警告
- **v1.0.1** (2025-11-26 4:01 AM) - 修復 GPS 和相機功能
- **v1.0.0** (2025-11-26 3:36 AM) - 初始版本

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
