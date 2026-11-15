# VS Code + Claude Code + GitHub Pages 完整操作

## A. 準備

1. 安裝 VS Code、Git、Python、Node.js（建議 LTS）。
2. 在 VS Code 擴充功能搜尋 **Claude Code**（請確認發行者為 Anthropic），安裝後依畫面登入。Claude Code 的可用性與費用依帳號方案／使用方式決定。
3. 下載本專案 ZIP，解壓縮後以 **File → Open Folder** 開啟 `sidequest-lab`。
4. 確認根目錄含 `AGENTS.md`、`CLAUDE.md`、`index.html`。

## B. 在本機開站

1. Terminal → New Terminal。
2. 輸入 `python -m http.server 8000`，Windows 也可嘗試 `py -m http.server 8000`。
3. 開啟 `http://localhost:8000/`。
4. 另開終端機，執行 `node scripts/validate.mjs`。

## C. 第一次交辦 Claude Code

請先閱讀 CLAUDE.md、AGENTS.md 和 README.md。不要直接重寫網站，先列出修改計畫、不可更動處和驗收方法。請檢查現有網站是否符合 AGENTS.md，必要時做最小修正，執行 node scripts/validate.mjs，回報檢查結果，更新 CHANGELOG.md。

## D. 建立 GitHub Repository

1. 登入 GitHub → 右上角 `+` → New repository。
2. Repository name 填 `sidequest-lab`，選 Public。
3. 不勾選自動產生 README／.gitignore（本專案已有）。
4. Create repository。
5. 複製 Repository URL，用自己的帳號取代下列指令 `YOUR_USERNAME`。

```bash
git init
git add .
git commit -m "Initial SideQuest Lab harness and website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sidequest-lab.git
git push -u origin main
```

若提示未設定 Git 身分，先執行 `git config --global user.name "你的名字"` 和 `git config --global user.email "你的 GitHub Email"` 再重試 commit。若推送要求登入，依 Git Credential Manager / VS Code 認證流程，不要把密碼或 Token 寫入程式碼。

## E. 開啟 GitHub Pages

Repository → Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main，Folder: /(root) → Save。

等頁面顯示公開網址後，開啟 `https://YOUR_USERNAME.github.io/sidequest-lab/`。請特別點擊二級頁面、檢查 CSS、JSON 是否載入。必要時去 Actions 查看 Pages 建置錯誤。

## F. 更新網站

```bash
node scripts/validate.mjs
git add .
git commit -m "Add more quests and verify harness"
git push
```

## G. 提交老師作業

- 專案簡介
- GitHub Repository 連結
- GitHub Pages 網址
- `AGENTS.md` 原始碼連結
- 說明新增任務時 AI 如何依規則操作，以及 `docs/AGENT_TEST_REPORT.md` 的實際記錄

不可把範例 URL 當成已上線網址；必須親自成功推送與開啟確認。
