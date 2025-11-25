# Emogo - Experience Sampling App 📱

> 一個使用 Expo Router 建構的體驗取樣應用程式，用於收集結構化與非結構化的主動/被動資料。

## 🚀 部署連結

**Expo App URI:** `[待部署後更新]`

部署後請將連結更新到此處。

---

## 📋 專案簡介

Emogo 是一個體驗取樣應用程式（Experience Sampling App），每天提醒使用者 3 次記錄以下資料：

### 收集的資料類型

1. **📊 情緒問卷**（結構化主動資料）
   - 使用 PAD 情緒模型（Pleasure-Arousal-Dominance）
   - 1-9 量表評估愉悅度、激動度、主導度

2. **🎥 1 秒 Vlog**（非結構化主動資料）
   - 使用裝置相機錄製 1 秒影片
   - 自動儲存至本地資料庫

3. **📍 GPS 座標**（結構化被動資料）
   - 自動取得當前位置（緯度、經度、精確度）
   - 背景資料收集

---

## 🛠️ 技術架構

### 核心技術
- **Framework:** Expo SDK 54.0.1
- **Router:** expo-router 6.0.0
- **UI Framework:** React Native 0.81.5
- **Database:** expo-sqlite (本地資料庫)

### 使用的 Expo 套件
- `expo-notifications` - 每日 3 次提醒通知（10:00、15:00、20:00）
- `expo-sqlite` - 儲存結構化資料
- `expo-camera` - 錄製 1 秒影片
- `expo-file-system` - 檔案管理
- `expo-sharing` - 資料匯出分享
- `expo-location` - GPS 定位

---

## 📁 專案結構

```
emogo-frontend/
├── app/
│   ├── _layout.js          # 根層級路由配置
│   ├── index.js            # 首頁重定向
│   ├── record.js           # 記錄頁面（問卷+錄影+GPS）
│   ├── history.js          # 歷史記錄頁面
│   └── (tabs)/             # 分頁導航
│       ├── _layout.js      # 分頁配置
│       ├── index.js        # 首頁
│       └── settings.js     # 設定頁面
├── utils/
│   ├── database.js         # SQLite 資料庫操作
│   ├── exportData.js       # 資料匯出功能
│   └── notifications.js    # 通知系統
├── data/                   # 匯出的資料（作業繳交用）
├── ai-interaction-history.md  # AI 互動歷史記錄
└── README.md
```

---

## 🚀 如何執行

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npx expo start --tunnel
```

### 3. 在裝置上測試

使用 Expo Go 掃描 QR code，或在模擬器中開啟。

---

## 📦 部署步驟

### 配置 EAS Build

```bash
eas build:configure
```

### 建立 Android Preview Build

```bash
eas build --platform android --profile preview
```

建置完成後：
1. 前往 Expo 網站查看專案
2. 點擊 **[Install]** 按鈕
3. 複製分享連結並更新到本 README

---

## 🎯 主要功能

### 1. 首頁
- 📈 顯示記錄統計（問卷、影片、GPS 數量）
- 🔔 自動設定每日通知
- 🚀 快速導航到記錄和歷史頁面

### 2. 記錄頁面
- **步驟 1：** 填寫情緒問卷（PAD 模型）
- **步驟 2：** 錄製 1 秒影片
- **步驟 3：** 確認並儲存（自動記錄 GPS）

### 3. 歷史記錄
- 📊 分頁顯示三種資料類型
- 🕐 時間戳記和詳細資訊
- 📱 清晰的資料呈現

### 4. 設定頁面
- 📊 資料統計總覽
- 📤 資料匯出功能（JSON 格式）
- 🔔 通知管理（測試、設定、取消）
- ⚠️ 資料清除功能

---

## 📊 資料匯出

在「設定」頁面可以：
- 匯出所有資料（包含問卷、影片、GPS）
- 個別匯出特定資料類型
- 資料格式：JSON
- 可透過分享功能儲存或傳送

---

## 🔔 通知系統

應用程式會在以下時間發送提醒：
- 🌅 上午 10:00
- ☀️ 下午 15:00
- 🌙 晚上 20:00

每次提醒會引導使用者記錄當下的情緒、影片和位置。

---

## 📝 作業繳交清單

- [x] ✅ 原始碼（React Native app）
- [x] ✅ AI 互動歷史記錄（`ai-interaction-history.md`）
- [ ] ⏳ data 資料夾（3+ 筆記錄，時間跨度 > 12 小時）
- [ ] ⏳ README.md 中的 Expo 部署連結

---

## 📚 學習資源

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [PAD Emotion Model](https://en.wikipedia.org/wiki/PAD_emotional_state_model)

---

## 👨‍💻 開發者

- **學生：** athenalin11
- **課程：** NTU Info
- **作業：** Emogo Frontend
- **開發日期：** 2025/11/22
- **截止日期：** 2025/11/27 23:59

---

## 📄 授權

此專案為課程作業，僅供學習使用。
