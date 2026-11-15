# 🧭 SideQuest Lab｜日常支線任務所

把日常生活變成充滿驚喜的小型 RPG：按心情、時間、預算與同行人數探索支線任務，完成後獲得經驗值與成就。

## 🎯 本週作業：Harness Engineering

本專案不是一次性 Vibe Coding。`AGENTS.md` 是「AI 員工手冊」，明確規範目標、限制、資料結構、開發 SOP 和完成定義。`CLAUDE.md` 是 Claude Code 入口，會要求先讀 `AGENTS.md`，避免 AI 開新對話後忘記規則。

## ✨ 網站內容

- **首頁**：品牌故事、等級／XP、隨機推薦、主題分類。
- **探索任務**：文字搜尋與類別、心情、時長、預算、同行篩選。
- **任務詳情**：步驟、完成條件、完成／撤銷與 XP。
- **成就館**：成就徽章依實際完成情況解鎖。
- **任務圖鑑**：記錄已完成與尚未完成的任務。

> 進度儲存在目前瀏覽器的 `localStorage`，不支援跨裝置同步。沒有登入或付費 API。

## 🚀 本機執行

1. 下載 ZIP 後解壓縮，以 VS Code 開啟 `sidequest-lab` 資料夾。
2. 開啟 VS Code 終端機，執行 `python -m http.server 8000`（Windows 若 `python` 不可用，試 `py -m http.server 8000`）。
3. 瀏覽器開啟 `http://localhost:8000/`。不要直接雙擊 `index.html`，因為 `fetch` JSON 需要 HTTP。
4. 驗證資料與基本頁面：`node scripts/validate.mjs`（需 Node.js 20.11+）。

## 📁 專案結構

```text
sidequest-lab/
├── AGENTS.md               # 共用 AI 開發規範
├── CLAUDE.md               # Claude Code 專案入口
├── README.md               # 專案說明
├── index.html              # 首頁
├── pages/                  # 探索、詳情、成就、圖鑑
├── css/style.css           # 設計系統與響應式樣式
├── js/                     # 載入、狀態、UI 與頁面控制
├── data/quests.json        # 任務內容
├── data/quest.schema.json  # 任務 JSON Schema
├── data/categories.json    # 任務分類
├── data/achievements.json  # 成就規則
├── scripts/validate.mjs    # 自動基本驗證
└── docs/                   # 擴充規範、驗證紀錄與部署教學
```

## 🤖 讓 Claude Code 延續專案

在 VS Code 安裝 Claude Code 擴充功能並登入，開啟本專案，交辦：

> 請先讀 CLAUDE.md 和 AGENTS.md，遵守檔案與資料規範。在 data/quests.json 新增兩個「城市探索」任務，不更動原有 ID，執行 node scripts/validate.mjs，並將變更記錄至 docs/CHANGELOG.md。

若使用其他 AI Agent，可直接要求先閱讀 `AGENTS.md`。完整交辦與驗收範例見 `docs/AGENT_TEST_REPORT.md`。

## 🌍 GitHub Pages

1. 在 GitHub 建立公開 Repository `sidequest-lab`，不要勾選新增 README（本專案已有）。
2. VS Code 終端機於專案根目錄執行：

```bash
git init
git add .
git commit -m "Initial SideQuest Lab harness and website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sidequest-lab.git
git push -u origin main
```

3. GitHub Repository → **Settings → Pages** → Source 選 **Deploy from a branch** → `main` + `/(root)` → **Save**。
4. 網站網址：`https://YOUR_USERNAME.github.io/sidequest-lab/`。
5. 在瀏覽器測試五個頁面、任務篩選、完成與重新整理進度。

請將 `YOUR_USERNAME` 改成你的 GitHub 使用者名稱。部署網址僅為格式示例，完成部署前尚未存在。

## 📚 相關文件

- `AGENTS.md`：完整交辦 SOP、資料契約與驗收清單
- `docs/DESIGN_SYSTEM.md`：網站設計規範
- `docs/CONTENT_GUIDE.md`：任務資料管理
- `docs/AGENT_TEST_REPORT.md`：規則有效性展示記錄模板
- `docs/GITHUB_GUIDE.md`：GitHub 與 VS Code 逐步操作

## ⚖️ 素材與授權

原創網站程式與資料供課程展示使用；圖示採 emoji 與 CSS，不使用第三方遊戲美術、商標或商用素材。可視需要自行新增 LICENSE。
