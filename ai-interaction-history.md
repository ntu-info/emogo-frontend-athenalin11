# AI 互動歷史記錄

## 日期：2025年11月22日

### 對話 1：了解作業要求

**我（學生）：**
解釋這份作業現有的檔案的功能 並且告訴我完成這份作業須要做什麼

**GitHub Copilot：**
[提供了專案結構說明和初步作業理解]

---

**我（學生）：**
[提供了完整的作業要求]

**GitHub Copilot：**
- 解釋了現有檔案功能
- 說明了作業繳交要求：
  1. README.md 中的 Expo 部署連結
  2. 原始碼 + AI 互動歷史
  3. data 資料夾（3+ 筆記錄，時間跨度 > 12 小時）
- 截止日期：2025/11/27 23:59

---

**我（學生）：**
[提供了部署步驟說明]

**GitHub Copilot：**
- 說明了完整的部署流程
- 強調需要建立 Android preview build（`eas build --platform android --profile preview`）
- 準備建立 AI 互動歷史文件

---

## 開發過程記錄

### 第一階段：環境設定與理解專案結構
- 了解 Expo Router 6.0.0 的使用方式
- 理解 Stack 和 Tabs 導航的運作原理
- 確認專案依賴版本相容性

### 第二階段：功能開發

**需求分析（Sprint Goal）：**
製作一個體驗取樣應用程式，具備本地儲存功能

**Sprint Backlog：**
每天收集 3 次以下資料：
1. 簡單的情緒問卷（結構化主動/前景資料）
2. 1 秒 vlog 錄影（非結構化主動/前景資料）
3. GPS 經緯度座標（結構化被動/背景資料）

**需要的套件：**
- expo-notifications：觸發 app 通知
- expo-sqlite：儲存結構化資料
- expo-camera：錄製 vlog
- expo-file-system 或 expo-media-library：儲存影片
- expo-sharing：匯出資料
- expo-location：取得 GPS 座標

**開發計畫：**
1. 安裝必要套件
2. 建立資料庫架構
3. 實作情緒問卷功能
4. 實作 1 秒 vlog 錄影
5. 實作 GPS 定位
6. 實作通知系統
7. 實作資料匯出功能
8. 建立資料展示介面
9. 測試並收集資料（3+ 筆，> 12 小時）
10. 部署到 Expo

### 第三階段：測試與除錯
（進行中）

### 第四階段：部署
（待進行）

---

## 使用的 AI 工具
- GitHub Copilot (VS Code)
- 對話時間：2025/11/22

## 學習重點
1. Expo Router 的檔案式路由系統
2. React Native 的導航架構
3. EAS Build 部署流程
4. 資料匯出與管理

---

**註：此文件會持續更新開發過程中與 AI 的所有互動**
