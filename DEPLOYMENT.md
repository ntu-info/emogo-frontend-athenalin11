# 📦 部署與測試指南

## 🧪 本地測試

### 方法 1：使用 Expo Go（開發測試）

1. **啟動開發伺服器**
   ```bash
   npx expo start --tunnel
   ```
   
2. **在手機上安裝 Expo Go**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

3. **掃描 QR Code**
   - 使用 Expo Go 掃描終端機顯示的 QR code
   - 或手動輸入 exp:// 開頭的連結

### 方法 2：使用模擬器

**iOS 模擬器（需要 macOS）：**
```bash
npx expo start
# 按下 'i' 開啟 iOS 模擬器
```

**Android 模擬器：**
```bash
npx expo start
# 按下 'a' 開啟 Android 模擬器
```

---

## 🚀 正式部署（作業繳交）

### 步驟 1：安裝 EAS CLI

```bash
npm install -g eas-cli
```

### 步驟 2：登入 Expo 帳號

```bash
eas login
```

如果沒有帳號，先到 [expo.dev](https://expo.dev) 註冊。

### 步驟 3：配置 EAS Build

```bash
eas build:configure
```

這會建立 `eas.json` 檔案。

### 步驟 4：建立 Android Preview Build

**重要：** 作業要求使用 Android preview build（無論你用 iPhone 或 Android）

```bash
eas build --platform android --profile preview
```

### 建置過程

- ⏱️ 建置時間：約 10-20 分鐘
- 🌐 可以在 [expo.dev/accounts](https://expo.dev/accounts/[你的帳號]/projects) 查看進度
- 📱 建置完成後會產生 `.apk` 檔案

### 步驟 5：取得分享連結

1. 建置完成後，前往 Expo 網站
2. 進入你的專案頁面
3. 點擊 **[Install]** 按鈕
4. 複製分享連結，格式如：
   ```
   https://expo.dev/accounts/[username]/projects/[project]/builds/[build-id]
   ```

### 步驟 6：更新 README.md

將上述連結貼到 README.md 的「部署連結」區域：

```markdown
## 🚀 部署連結

**Expo App URI:** `https://expo.dev/accounts/...`
```

---

## 📊 測試與資料收集

### 測試清單

1. **功能測試**
   - [ ] 首頁正常顯示統計資料
   - [ ] 可以填寫情緒問卷（三個量表）
   - [ ] 可以錄製 1 秒影片
   - [ ] GPS 位置自動記錄
   - [ ] 資料成功儲存到資料庫
   - [ ] 歷史記錄正確顯示
   - [ ] 資料匯出功能正常

2. **權限測試**
   - [ ] 相機權限授予
   - [ ] 麥克風權限授予（錄影用）
   - [ ] 位置權限授予
   - [ ] 通知權限授予

3. **通知測試**
   - [ ] 測試通知可以正常發送
   - [ ] 每日提醒已設定（10:00、15:00、20:00）

### 資料收集計畫

**目標：** 收集至少 3 筆記錄，時間跨度 > 12 小時

**建議時程：**

**第一天：**
- 08:00 - 第一次記錄
- 15:00 - 第二次記錄
- 20:00 - 第三次記錄

**第二天：**
- 10:00 - 第四次記錄（額外）

**資料匯出：**
1. 在「設定」頁面點擊「匯出所有資料」
2. 儲存 JSON 檔案
3. 將檔案複製到專案的 `data/` 資料夾
4. 提交到 GitHub

---

## 🐛 常見問題

### Q1: Expo Go 無法連線？
**A:** 確保手機和電腦在同一個 Wi-Fi 網路，或使用 `--tunnel` 模式：
```bash
npx expo start --tunnel
```

### Q2: 相機權限被拒絕？
**A:** 
- iOS: 設定 > 隱私與安全性 > 相機 > Expo Go
- Android: 設定 > 應用程式 > Expo Go > 權限

### Q3: SQLite 資料庫錯誤？
**A:** 清除應用程式快取重新啟動：
- 在 Expo Go 中長按應用程式 > 清除快取

### Q4: EAS build 失敗？
**A:** 檢查：
- Expo 帳號是否已登入
- `app.json` 配置是否正確
- 網路連線是否穩定
- 查看 build logs 了解具體錯誤

### Q5: 通知沒有顯示？
**A:** 
- 確認已授予通知權限
- 在「設定」頁面點擊「發送測試通知」
- 檢查排程通知數量（應該有 3 個）

---

## 📝 作業繳交前檢查

- [ ] ✅ 應用程式可以正常運行
- [ ] ✅ 已收集至少 3 筆記錄
- [ ] ✅ 記錄時間跨度 > 12 小時
- [ ] ✅ 資料已匯出到 `data/` 資料夾
- [ ] ✅ 已執行 `eas build --platform android --profile preview`
- [ ] ✅ Expo 連結已更新到 README.md
- [ ] ✅ `ai-interaction-history.md` 已完成
- [ ] ✅ 所有檔案已提交到 GitHub
- [ ] ✅ GitHub repo 連結已提交到作業系統

---

## 🎯 提交作業

1. **確認 GitHub repo 包含：**
   - ✅ 原始碼
   - ✅ `ai-interaction-history.md`
   - ✅ `data/` 資料夾（含匯出的 JSON）
   - ✅ README.md（含 Expo 連結）

2. **提交 GitHub repo 連結到：**
   - GitHub Classroom: https://classroom.github.com/a/1M59WghA

3. **截止日期：**
   - 📅 2025/11/27 (四) 23:59

---

**祝您作業順利！🎉**
