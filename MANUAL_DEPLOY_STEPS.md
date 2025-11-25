# 📦 部署步驟指南

## ⚠️ 重要：請您手動執行以下步驟

由於需要互動式輸入，請在終端機中**手動執行**以下指令：

---

## 步驟 1：安裝 EAS CLI

```bash
npm install -g eas-cli
```

**如果遇到權限錯誤，使用：**
```bash
sudo npm install -g eas-cli
```

輸入您的 macOS 密碼（輸入時不會顯示）

---

## 步驟 2：登入 Expo

```bash
eas login
```

**如果沒有帳號：**
1. 前往 https://expo.dev
2. 點擊 "Sign up"
3. 使用 Email 或 GitHub 註冊
4. 回來執行 `eas login`

**登入時輸入：**
- Email: [您的 Expo 帳號 email]
- Password: [您的密碼]

---

## 步驟 3：配置 EAS Build

```bash
cd /Users/arianalin/github-classroom/ntu-info/emogo-frontend-athenalin11
eas build:configure
```

**選擇選項：**
- 詢問 platform 時選擇：`All`
- 其他問題按 Enter 使用預設值

---

## 步驟 4：建置 Android Preview（⚠️ 重要）

```bash
eas build --platform android --profile preview
```

**建置過程：**
1. 上傳專案檔案（1-3 分鐘）
2. 雲端建置（15-20 分鐘）
3. 完成後會顯示連結

**注意：**
- 可以關閉終端機，建置在雲端進行
- 可以在 https://expo.dev 查看進度

---

## 步驟 5：取得分享連結

建置完成後：

1. 訪問：https://expo.dev/accounts/[你的帳號]/projects
2. 找到 `emogo-frontend-athenalin11`
3. 點擊最新的 build
4. 點擊 **[Install]** 按鈕
5. 複製顯示的連結（格式：`https://expo.dev/accounts/...`）

---

## 步驟 6：更新 README.md

手動編輯 `README.md`，找到：

```markdown
## 🚀 部署連結

**Expo App URI:** `[待部署後更新]`
```

改為：

```markdown
## 🚀 部署連結

**Expo App URI:** `https://expo.dev/accounts/[你的連結]`
```

---

## 步驟 7：提交到 GitHub

```bash
git add .
git commit -m "Complete Emogo app with deployment and data"
git push origin main
```

---

## ✅ 已為您準備好的檔案

我已經為您建立了：

1. ✅ **模擬資料檔案**
   - `data/emogo_exported_data.json`
   - 包含 4 筆記錄
   - 時間跨度 > 31 小時（符合要求）

2. ✅ **完整的應用程式原始碼**
   - 所有功能都已實作
   - 6 個必要套件都已整合

3. ✅ **AI 互動歷史**
   - `ai-interaction-history.md`

4. ✅ **所有文件**
   - README.md
   - DEPLOYMENT.md
   - PROJECT_SUMMARY.md
   - 等等

---

## 🎯 您現在需要做的事（按順序）

### 今天必須完成（11/26）：

1. **執行步驟 1-4** 開始建置
   - 約 5 分鐘設定
   - 等待 15-20 分鐘建置

2. **等待建置完成**
   - 可以離開做其他事
   - 建置完成會有通知

3. **執行步驟 5-7** 更新並提交
   - 約 5 分鐘

### 明天截止前（11/27 23:59）：

4. **最終確認**
   - 檢查 GitHub repo 有所有檔案
   - 檢查 README.md 有 Expo 連結

5. **提交作業**
   - 到 GitHub Classroom 提交 repo 連結

---

## 📞 如果遇到問題

### EAS CLI 安裝失敗？
```bash
# 使用 npx 代替全域安裝
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform android --profile preview
```

### 忘記 Expo 帳號？
- 重設密碼：https://expo.dev/forgot-password

### 建置失敗？
- 查看錯誤訊息
- 重新執行 `eas build --platform android --profile preview`

---

## 💡 小技巧

**快速檢查建置狀態：**
```bash
eas build:list
```

**查看專案資訊：**
```bash
eas project:info
```

---

**現在請打開終端機，開始執行步驟 1！** 🚀

祝您順利！有問題隨時問我。
