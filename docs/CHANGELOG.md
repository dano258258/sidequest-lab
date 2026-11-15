# CHANGELOG

## 2026-11-16 — 新增探索類任務（第二批）

- 在 `data/quests.json` 新增 2 個 exploration 任務：`quest-013` 公共藝術尋寶圖、`quest-014` 市場季節偵查員。
- 原有 `quest-001`～`quest-012` 未更動；未修改任何 HTML、CSS、JavaScript。
- 驗證：`node scripts/validate.mjs`（Node v26.13.1）實際執行通過：`PASS: 14 quests, 5 categories, 5 achievements, 5 HTML pages.`（此次一併涵蓋上一批 `quest-011`、`quest-012`）。
- 以 `python -m http.server` 啟動本機伺服器，透過網站的 `js/data.js` `loadAll()` 實際讀取到兩筆新任務；詳情頁、探索頁、首頁 HTTP 回應皆為 200。
- 尚未在瀏覽器手動測試畫面渲染、篩選、完成／撤銷 XP 與手機版。

## 2026-11-16 — 新增探索類任務

- 在 `data/quests.json` 新增 2 個 exploration 任務：`quest-011` 招牌字體收藏家、`quest-012` 路名身世偵探。
- 原有 `quest-001`～`quest-010` 未更動；未修改任何 HTML、CSS、JavaScript。
- 驗證：本機未安裝 Node.js，**`node scripts/validate.mjs` 未能執行，官方驗證尚未通過確認**。改以臨時 Python 腳本依 `quest.schema.json` 與 validate.mjs 規則檢查 12 筆任務，結果無錯誤（補充檢查，不取代官方驗證）。
- 尚未在瀏覽器手動測試探索頁篩選、詳情頁、完成／撤銷 XP。

## 2026-11-15 — Phase 1

- 建立 AGENTS.md 與 CLAUDE.md 專案規則入口。
- 完成五頁靜態網站與互動邏輯初版。
- 建立 10 個示範任務、5 個分類與 5 種成就。
- 建立任務 JSON Schema 與基本驗證腳本。
- 加入 GitHub Pages 上線與 AI 後續交辦指引。
