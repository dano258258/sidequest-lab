# Harness 驗證紀錄（操作模板）

> 下列測試尚待使用者在 Claude Code 真正執行；勿將預期行為當作實際通過結果。

## 測試 A：新增任務

**交辦**：「請先讀 CLAUDE.md、AGENTS.md，新增兩個城市探索類任務，不能修改既有任務 ID；執行 node scripts/validate.mjs 並更新 CHANGELOG。」

**預期更動**：`data/quests.json`、`docs/CHANGELOG.md`。

**驗收**：新任務有唯一 ID、符合 Schema、探索頁可查看詳情、完成與撤銷 XP 正確。

**實際執行日期**：待填
**實際檔案差異**：待填
**驗證結果**：待填
**截圖／Commit**：待填

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
