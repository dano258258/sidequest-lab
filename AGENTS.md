# SideQuest Lab — AI Agent 工作手冊

> 專案唯一的共同開發規範（source of truth）。任何 AI Coding Agent 在修改程式之前必須先閱讀本檔。

## 1. 任務與成功定義

SideQuest Lab（日常支線任務所）是一個以繁體中文呈現的「奇幻 RPG × Cozy Game」互動網站。使用者可以依心情、時間、預算、同行方式探索日常小任務，完成後獲得 XP 與成就。重點是可持續擴充：新增任務不應複製貼上頁面 HTML。

**完成定義**：首頁、探索、任務詳情、成就、圖鑑可用；資料通過驗證；網站可在 GitHub Pages 的子路徑運作；所有互動有明確結果或空狀態。

## 2. 技術與執行限制

- 只使用原生 HTML、CSS、ES Modules JavaScript 和 JSON；不使用框架、打包器、付費 API 或服務端。
- `index.html` 放專案根目錄，其他 HTML 放 `pages/`；CSS 放 `css/`、JS 放 `js/`、任務資料放 `data/`、圖像放 `assets/`、規格及紀錄放 `docs/`、驗證腳本放 `scripts/`。
- 網站必須支援 `https://<user>.github.io/sidequest-lab/` 子路徑：首頁使用 `./`，次頁使用 `../` 作為相對根路徑；不要在連結或 fetch 使用開頭 `/` 的網站絕對路徑。
- 本地應使用 `python -m http.server 8000` 從專案根目錄預覽；不要直接雙擊 HTML（`fetch` 可能被 file:// 限制）。
- `localStorage` 儲存個人進度；不承諾跨裝置同步。不可蒐集帳號、個資或定位。
- 不引入外部圖像依賴。優先 CSS 裝飾、emoji 和本地 SVG。新增第三方資源要記錄來源及授權。

## 3. 視覺設計系統

- 氣質：溫暖、有探索感、友善的 RPG 界面；避免陰森、賭博感或逼迫打卡的設計。
- Token 只能在 `css/style.css` 的 `:root` 集中定義：奶油底色 `#fbf7ef`、墨綠字 `#243c35`、葡萄紫 `#8166a9`、薄荷綠 `#b9ded0`、蜜桃橘 `#f1bc8e`。
- 用系統字型堆疊；卡片圓角、柔和邊框、足夠留白；頁面最大寬度 1160px。
- 既有 `.site-header`、`.site-footer`、`.quest-card`、`.btn`、`.pill` 元件要重用，不可在新頁面另造不一致的導航。
- 所有互動控件需要可見文字、鍵盤操作、`focus-visible` 樣式與適當 ARIA 標籤；手機寬度 360px 不可有橫向捲軸。

## 4. 資料模型（不得自行更名）

- `data/quests.json` 必須是任務物件陣列；正式結構參考 `data/quest.schema.json`。
- 必填 `id,title,category,description,duration,budget,moods,companions,difficulty,xp,steps,completionCriteria`。
- `id` 格式為 `quest-001`；唯一且穩定，發布後禁止重用或改名（會影響既有完成紀錄）。
- `category` 限定 `exploration, creativity, wellbeing, social, learning`；新增分類需同步更新 `data/categories.json`、篩選 UI 與測試。
- `duration` 是分鐘數，`budget` 是新臺幣預估上限，均須非負；`xp` 為 10–100 正整數。
- 新任務至少 2 個可執行步驟，完成條件具體且不需要使用者透露個資。
- 不要加入危險、違法、鼓勵騷擾、闖入他人空間或強迫消費的活動。

## 5. 程式架構與行為契約

- `js/data.js`：載入 JSON 與顯示錯誤；`js/storage.js`：存取進度；`js/ui.js`：共用 DOM、任務卡片及導航；`js/app.js`：依 `data-page` 初始化頁面。
- 每個頁面 `<body data-page="home|explore|detail|achievements|collection" data-root="./|../">`。
- 任務卡片連到 `pages/detail.html?id=quest-001`，次頁需使用相對路徑。
- XP 僅在首次完成任務時取得。重複按完成不可重複加分。撤銷完成時須回收該任務 XP。
- `localStorage` 格式使用有版本號的 key `sidequest-progress-v1`。可優雅應對儲存失敗、資料毀損。
- 使用 `textContent` 或受控文字節點渲染資料；不得直接把任務資料插入 `innerHTML`，防止不可信內容被當作 HTML。

## 6. AI 交辦執行 SOP（每次都做）

1. **讀取**：先閱讀本檔、`README.md`，再讀與任務相關的程式與 JSON。
2. **規劃**：列出預期成果、將修改的檔案、不能變動的部分、驗收方式。若會大量刪除或覆蓋，先請負責人確認。
3. **實作**：只改必要檔案；遵循現有命名與元件。若需求模糊，優先採取最小且可回復的方案並註明假設。
4. **驗證**：執行 `node scripts/validate.mjs`，檢查 JSON、頁面連結與基本行為；手動檢查功能和手機版。無法實測者須誠實列為未驗證。
5. **交付**：說明修改檔案、驗證結果、已知限制、如何檢視，並更新 `docs/CHANGELOG.md`。

## 7. 任務範本與常見交辦

### A. 新增任務

- 只在 `data/quests.json` 新增物件，遵循 Schema。
- 不可重用 ID；內容不可重複；更新紀錄並執行驗證。
- 驗收：可在探索頁搜尋／篩選到、可進入詳情、可完成／撤銷、XP 計算正確。

### B. 新增頁面

- 參考 `pages/explore.html` 的頁首、頁尾、CSS/JS 路徑與 `data-root="../"`。
- 與現有導航、Design System 一致；新增連結需檢查所有相關頁面。
- 驗收：桌面和手機可以打開、無瀏覽器 console error、連結正確。

### C. 調整 UI

- 先修改既有 CSS token / 共用元件，不要逐頁複製 CSS。
- 優先保持可用性與對比，避免更動資料模型。

## 8. 驗收清單（Definition of Done）

- [ ] `node scripts/validate.mjs` 通過
- [ ] 所有五頁正常載入，導航連結正確
- [ ] 任務搜尋、篩選、隨機抽選有結果與空狀態
- [ ] 任務詳情根據 URL `id` 顯示，無效 id 有提示
- [ ] 完成／撤銷不重複計算 XP，重整仍保存
- [ ] 成就與圖鑑能反映實際完成狀態
- [ ] 小螢幕、鍵盤焦點、讀屏基本可操作
- [ ] 新內容符合 JSON Schema，無重複 ID
- [ ] 修改紀錄已更新；不可聲稱未執行的測試已通過

## 9. 安全與版權

- 不提交任何 API Key、Token、帳密、使用者私有檔案。
- 不自動執行破壞性 shell 指令、force push，或修改 GitHub 安全設定。
- 未經授權不可使用遊戲角色、商標、受版權保護的圖片當作自己的品牌素材。

## 10. 教學展示：Harness 可重複使用

請依 `docs/AGENT_TEST_REPORT.md` 執行兩次交辦：新增 2 個任務，再修改任務顯示需求。保留交辦指令、檔案差異、測試結果作為作業證據。測試前後的首頁與已完成任務必須正常。
