# 任務內容規格

`data/quest.schema.json` 是機器可讀欄位契約，`data/quests.json` 是目前資料。新增任務請沿用既有 JSON 欄位，不修改既有 ID；先確認相似任務避免重複。

| 欄位 | 意義 | 範例 |
|---|---|---|
| id | 唯一且不改動的識別碼 | quest-011 |
| title | 繁體中文任務名 | 晚霞收藏員 |
| category | 五大類 enum | exploration |
| duration | 預估分鐘數 | 30 |
| budget | 新臺幣預估最高花費 | 0 |
| moods | 適合的心情 | curious、calm |
| companions | 參與方式 | solo、friends |
| difficulty | easy／medium／hard | easy |
| xp | 10～100 的整數經驗值 | 30 |
| steps | 兩個以上具體步驟 | 找安全地點、記錄觀察 |
| completionCriteria | 明確完成條件 | 記下三件發現 |

新內容必須安全、低門檻，避免暗示須在危險地點打卡、拍攝陌生人或向他人索取個資。

完成後執行 `node scripts/validate.mjs`，再到探索頁測試篩選、任務詳情和完成獎勵。
