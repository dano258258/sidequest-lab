# Harness 驗證紀錄（操作模板）

> 下列測試尚待使用者在 Claude Code 真正執行；勿將預期行為當作實際通過結果。

## 測試 A：新增任務

**交辦**：「請先讀 CLAUDE.md、AGENTS.md，新增兩個城市探索類任務，不能修改既有任務 ID；執行 node scripts/validate.mjs 並更新 CHANGELOG。」

**預期更動**：`data/quests.json`、`docs/CHANGELOG.md`。

**驗收**：新任務有唯一 ID、符合 Schema、探索頁可查看詳情、完成與撤銷 XP 正確。

**實際執行日期**：2026-11-16（Claude Code，Opus 5.5）

**實際交辦目標**：先讀 AGENTS.md、CLAUDE.md、README.md，確認既有任務與 ID 後，新增 2 個不重複的探索類任務；不得覆蓋既有任務或修改 HTML／CSS／JS；執行驗證並更新 CHANGELOG 與本報告。

**執行前狀態**：已有 `quest-001`～`quest-012`，其中 `quest-011`、`quest-012` 為前一次交辦新增的探索任務，因此本次另建新主題。

**實際檔案差異**：
- `data/quests.json`：陣列末尾新增 `quest-013` 公共藝術尋寶圖（45 分、NT$0、40 XP、medium、5 步驟）、`quest-014` 市場季節偵查員（30 分、NT$0、30 XP、easy、5 步驟，不需購買）。既有 12 筆未更動。
- `docs/CHANGELOG.md`：新增本次紀錄。
- `docs/AGENT_TEST_REPORT.md`：填寫測試 A。

**驗證結果**：
| 項目 | 結果 |
|---|---|
| `node scripts/validate.mjs`（Node v26.13.1） | ✅ 實際通過：`PASS: 14 quests, 5 categories, 5 achievements, 5 HTML pages.` |
| Schema 長度等額外檢查（臨時 Python 腳本，validate.mjs 未檢查 maxLength） | ✅ 14 筆無錯誤 |
| 網站資料讀取：`python -m http.server` + 網站 `js/data.js` 的 `loadAll()` | ✅ 讀到 `quest-013`、`quest-014`，分類為已知的 exploration |
| `pages/detail.html?id=quest-013／014`、探索頁、首頁 HTTP 狀態 | ✅ 200 |
| 瀏覽器畫面：探索頁搜尋／篩選、詳情渲染、完成／撤銷 XP、成就與圖鑑、手機版 | ⚠️ **未驗證**（本次無瀏覽器實測） |

**限制**：未在真實瀏覽器操作，無法確認畫面渲染與 localStorage 行為；任務內容的安全性與可執行性為人工審閱判斷。另曾回報「點擊任務後網址變成 `/pages/detail` 且找不到任務」，診斷為伺服器轉址遺失 `?id=` 的推論，尚未確認，與本次資料變更無關。

**截圖／Commit**：未建立（專案目前非 git repository）

## 測試 B：更改 UI

**交辦**：「請先讀 CLAUDE.md、AGENTS.md，把任務卡片的 XP 提示更醒目，保持既有 Design System，不改 JSON Schema；完成後驗收並更新 CHANGELOG。」

**預期更動**：`css/style.css` 或 `js/ui.js`、`docs/CHANGELOG.md`。

**驗收**：五頁仍正常、任務卡片風格一致、沒有資料變動。

**實際執行日期**：待填
**實際檔案差異**：待填
**驗證結果**：待填
**截圖／Commit**：待填

## 課堂展示關鍵結論

透過一份常駐的 AGENTS.md，AI 不必每次重問設計、資料格式、目錄和驗收方法；與一次性生成網頁的 Vibe Coding 不同。
