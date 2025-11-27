# Emogo - Experience Sampling App

情感體驗採樣應用程式，透過結構化問卷、影片記錄和 GPS 定位，收集使用者的情感狀態資料。

## 應用程式資訊

- 版本: 1.0.7
- 平台: Android
- 開發框架: Expo / React Native

## APK 下載連結

v1.0.7 - 正式版本  
https://expo.dev/accounts/athena_11/projects/emogo-frontend-athenalin11/builds/859b4afa-a978-40fc-8d72-94d2a7d20290

## 主要功能

### 1. 情感評估問卷（PAD 模型）
- Pleasure (愉悅度): 1-9 分量表
- Arousal (激動度): 1-9 分量表  
- Dominance (主導度): 1-9 分量表
- 支援文字備註記錄當下想法

### 2. 1 秒影片錄製
- 自動錄製 1 秒短片
- 若相機權限被拒絕，自動略過繼續流程
- 影片儲存於本機快取

### 3. GPS 座標擷取
- 多層級精確度策略（高精度 → 平衡模式）
- 自動記錄經緯度和精確度
- 權限被拒時使用預設座標

### 4. 本地資料庫
- 使用 SQLite 儲存所有記錄
- 三個資料表：sentiment_records, vlog_records, gps_records
- 支援歷史記錄瀏覽

### 5. 每日提醒通知
- 每天三次固定時間提醒（10:00, 15:00, 20:00）
- 可在設定頁面開關通知功能

### 6. 資料匯出
- 匯出為 JSON 格式
- 透過系統分享功能選擇儲存位置
- 包含所有情感、影片、GPS 記錄

## 專案結構

```
app/
├── _layout.js          # 根布局配置
├── index.js            # 首頁（統計資訊）
├── details.js          # 記錄流程頁面
└── (tabs)/
    ├── _layout.js      # Tab 導航配置
    ├── index.js        # 歷史記錄頁面
    └── settings.js     # 設定頁面
utils/
├── database.js         # SQLite 資料庫操作
├── exportData.js       # 資料匯出功能
└── notifications.js    # 通知排程管理
data/
├── sentiment_records.json
├── vlog_records.json
├── gps_records.json
└── emogo_exported_data.json
```

## 測試方法

### 安裝測試
1. 下載上方 APK 連結的檔案
2. 在 Android 裝置上安裝（可能需要允許未知來源）
3. 開啟應用程式

### 功能測試

**首次開啟**
- 系統會請求相機、位置、通知權限
- 建議全部允許以體驗完整功能

**記錄流程測試**
1. 點擊首頁「開始記錄」按鈕
2. 填寫 PAD 三個維度的分數（1-9）
3. （可選）輸入文字備註
4. 點擊「下一步」
5. 相機自動開始錄製 1 秒影片
6. GPS 自動擷取座標
7. 完成後顯示成功訊息

**歷史記錄測試**
1. 切換到「歷史」頁籤
2. 查看所有記錄列表
3. 每筆記錄顯示時間、情感分數、備註

**資料匯出測試**
1. 切換到「設定」頁籤
2. 點擊「匯出所有資料」
3. 選擇儲存位置（如 Google Drive, Files 等）
4. 確認 JSON 檔案內容包含所有記錄

**通知測試**
- 在設定頁面開啟通知
- 系統會在 10:00, 15:00, 20:00 發送提醒
- 點擊通知可直接進入記錄流程

### 資料驗證
- 匯出的 JSON 檔案應包含三個陣列
- `sentiment_records`: 情感評估資料
- `vlog_records`: 影片記錄路徑
- `gps_records`: GPS 座標資料
- 每筆記錄的時間戳應該一致（同一次記錄）

## 使用技術

| 套件 | 用途 |
|------|------|
| expo-notifications | 每日提醒通知 |
| expo-sqlite | 本地資料庫 |
| expo-camera | 影片錄製 |
| expo-file-system | 檔案操作 |
| expo-sharing | 資料分享匯出 |
| expo-location | GPS 定位 |

## 收集資料

專案已收集 5 筆實際資料，時間跨度約 19 小時，資料檔案位於 data/ 資料夾。

## 相關連結

- GitHub Repository: https://github.com/ntu-info/emogo-frontend-athenalin11
- Expo Project: https://expo.dev/accounts/athena_11/projects/emogo-frontend-athenalin11
