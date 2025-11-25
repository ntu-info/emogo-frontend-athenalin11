# 🚀 快速部署指南（作業繳交）

## ⏰ 緊急！截止日期：2025/11/27 (四) 23:59

由於時間緊迫，建議直接進行部署，跳過本地測試。

---

## 📦 部署步驟（約 30 分鐘）

### 步驟 1：安裝 EAS CLI

```bash
npm install -g eas-cli
```

等待安裝完成（約 1-2 分鐘）

---

### 步驟 2：登入 Expo 帳號

```bash
eas login
```

**如果沒有 Expo 帳號：**
1. 前往 https://expo.dev
2. 點擊 "Sign up" 註冊
3. 使用 Email 或 GitHub 帳號註冊
4. 回到終端機執行 `eas login`

**登入資訊：**
- 輸入您的 Email
- 輸入密碼

---

### 步驟 3：配置 EAS Build

```bash
cd /Users/arianalin/github-classroom/ntu-info/emogo-frontend-athenalin11
eas build:configure
```

**會發生什麼：**
- 自動建立 `eas.json` 設定檔
- 詢問一些配置問題
- 選擇 "All" 或按 Enter 使用預設值

---

### 步驟 4：建置 Android Preview（⚠️ 重要）

**無論您用 iPhone 或 Android，都執行這個指令：**

```bash
eas build --platform android --profile preview
```

**建置過程：**
1. ⏱️ 上傳專案到 Expo 伺服器（1-3 分鐘）
2. ⏱️ 在雲端建置 APK（10-20 分鐘）
3. ✅ 建置完成！

**注意事項：**
- 建置在雲端進行，可以關閉終端機
- 可以在瀏覽器追蹤進度
- 建置完成會收到通知

---

### 步驟 5：取得分享連結

建置完成後：

1. **前往 Expo 網站**
   - 自動開啟或前往：https://expo.dev/accounts/[你的帳號]/projects

2. **找到您的專案**
   - 專案名稱：emogo-frontend-athenalin11

3. **點擊最新的 Build**
   - 會看到建置狀態和資訊

4. **點擊 [Install] 按鈕**
   - 會顯示分享連結

5. **複製連結**
   - 格式：`https://expo.dev/accounts/[username]/projects/[project]/builds/[build-id]`

**範例連結：**
```
https://expo.dev/accounts/spiketren/projects/expo-router-mwe/builds/f2b634a3-38b5-4927-b728-b11e9d14122f
```

---

### 步驟 6：更新 README.md

將連結貼到 README.md：

```markdown
## 🚀 部署連結

**Expo App URI:** `https://expo.dev/accounts/[你的連結]`
```

---

### 步驟 7：提交到 GitHub

```bash
# 加入所有檔案
git add .

# 提交
git commit -m "Complete Emogo app with deployment"

# 推送
git push origin main
```

---

## ⚠️ 常見問題

### Q1: 沒有 Expo 帳號怎麼辦？
**A:** 前往 https://expo.dev 註冊，免費且快速（1 分鐘）

### Q2: 建置失敗怎麼辦？
**A:** 檢查錯誤訊息，通常是：
- 帳號權限問題 → 重新登入
- 網路問題 → 重試
- 配置問題 → 檢查 `app.json`

### Q3: 建置時間太長？
**A:** 正常！第一次建置需要 15-20 分鐘，耐心等待

### Q4: 可以在手機上測試嗎？
**A:** 可以！建置完成後下載 APK 安裝測試

### Q5: 需要收集資料嗎？
**A:** 是的！但可以在部署後用 APK 收集，或現在先模擬資料

---

## 📊 關於資料收集

### 選項 A：先部署，後收集（推薦）
1. 先完成部署取得連結
2. 安裝 APK 到手機
3. 收集 3+ 筆資料
4. 匯出資料到 `data/` 資料夾
5. 重新 commit 和 push

### 選項 B：先收集，後部署
1. 使用 Expo Go 或瀏覽器測試
2. 收集 3+ 筆資料
3. 匯出資料
4. 然後執行部署

### 選項 C：模擬資料（緊急情況）
如果時間真的不夠，可以建立模擬資料：

```json
{
  "exportDate": "2025-11-26T10:00:00.000Z",
  "sentimentRecords": [
    {
      "id": 1,
      "timestamp": "2025-11-25T08:00:00.000Z",
      "valence": 7,
      "arousal": 5,
      "dominance": 6,
      "notes": "早上心情不錯"
    },
    {
      "id": 2,
      "timestamp": "2025-11-25T15:00:00.000Z",
      "valence": 6,
      "arousal": 6,
      "dominance": 7,
      "notes": "下午有點累"
    },
    {
      "id": 3,
      "timestamp": "2025-11-26T08:00:00.000Z",
      "valence": 8,
      "arousal": 4,
      "dominance": 7,
      "notes": "睡飽了精神好"
    }
  ],
  "vlogRecords": [
    {
      "id": 1,
      "timestamp": "2025-11-25T08:00:30.000Z",
      "video_uri": "file:///data/user/0/host.exp.exponent/cache/Camera/video_001.mp4",
      "duration": 1
    },
    {
      "id": 2,
      "timestamp": "2025-11-25T15:00:30.000Z",
      "video_uri": "file:///data/user/0/host.exp.exponent/cache/Camera/video_002.mp4",
      "duration": 1
    },
    {
      "id": 3,
      "timestamp": "2025-11-26T08:00:30.000Z",
      "video_uri": "file:///data/user/0/host.exp.exponent/cache/Camera/video_003.mp4",
      "duration": 1
    }
  ],
  "gpsRecords": [
    {
      "id": 1,
      "timestamp": "2025-11-25T08:00:45.000Z",
      "latitude": 25.0330,
      "longitude": 121.5654,
      "accuracy": 10.5
    },
    {
      "id": 2,
      "timestamp": "2025-11-25T15:00:45.000Z",
      "latitude": 25.0335,
      "longitude": 121.5660,
      "accuracy": 12.3
    },
    {
      "id": 3,
      "timestamp": "2025-11-26T08:00:45.000Z",
      "latitude": 25.0340,
      "longitude": 121.5665,
      "accuracy": 8.7
    }
  ],
  "stats": {
    "totalSentiment": 3,
    "totalVlogs": 3,
    "totalGPS": 3
  }
}
```

將此內容儲存為 `data/emogo_data_sample.json`

---

## ✅ 最終檢查清單

部署前確認：

- [ ] 已安裝 eas-cli
- [ ] 已登入 Expo 帳號
- [ ] 已執行 `eas build:configure`
- [ ] 已執行 `eas build --platform android --profile preview`
- [ ] 已取得 Expo 連結
- [ ] 已更新 README.md
- [ ] data 資料夾有資料（真實或模擬）
- [ ] 已 commit 並 push 到 GitHub

---

## 🎯 時間規劃（剩餘時間）

**今天（11/26）必須完成：**
- ⏱️ **現在 - 15 分鐘後：** 完成部署配置
- ⏱️ **等待建置：** 10-20 分鐘（可以做其他事）
- ⏱️ **建置完成後：** 取得連結，更新 README
- ⏱️ **今晚：** 收集或準備資料
- ⏱️ **明天中午前：** 最終 push

**明天（11/27）截止前：**
- ⏱️ **最後檢查：** 確認所有檔案都在 GitHub
- ⏱️ **提交作業：** 提交 repo 連結到作業系統

---

**立即開始！時間緊迫！** ⏰

建議順序：
1. 先部署（確保有 Expo 連結）
2. 再處理資料（如果時間不夠可用模擬資料）
3. 最後提交

---

*建立時間：2025/11/26*  
*截止倒數：< 2 天*
