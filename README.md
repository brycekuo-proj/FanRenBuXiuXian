# 《凡人不修仙》

一款黑色幽默、短局制、文字 Roguelike 修仙生存遊戲。

這不是爽文修仙，也不是放置數值遊戲。玩家不是氣運之子，不是天才，沒有老爺爺，也不會因為選了一個「正確答案」就一路飛升。

玩家只是修仙世界裡的一個普通人。很多人連引氣入體都做不到，更多人甚至還沒真正踏入仙途，人生就已經結束。

> 修仙本是逆天而行。  
> 但不是每個人，都有逆天的資格。

> 這世上沒有廢物逆襲。  
> 只有活得比別人久的人。

## 核心玩法

玩家反覆投胎成不同條件的凡人，在村莊、宗門、坊市、散修與山野機緣之間做判斷：要不要冒險、要不要打聽、要不要花代價換情報、要不要放棄仙緣。

角色會死亡、殘廢、失去修仙資格、回歸凡俗，或在極少數情況下真正摸到仙途。玩家保留的不是角色能力，而是對世界風險與規則的理解。

```text
投胎／生成身分
→ 嘗試靠近仙途
→ 做出選擇
→ 活下來、失去資格、殘廢、回歸凡俗或暴斃
→ 顯示墓誌銘與世界情報
→ 再投一世
```

## 設計鐵律

> 玩家可以學會世界的危險，但不能學會世界的答案。

同一個表面事件不能有固定正解。死亡畫面只能提供世界知識與風險徵兆，不能直接揭露「應該按哪個選項」。保守選項不能永遠安全，冒險選項也不能只是純骰子。

## 目前製作重點（2026-10-02）

五章正文與互動第一版都已存在。請從 `fanren.html` 進入玩家版；`fanren-dev.html` 是不影響正式存檔的工程版章節入口。第五章正文主檔 `data/content/chapter5_full_text.md` 已補至 **75,103 個 Unicode 字元**，分段新增原稿另存於 `data/content/chapter5_addenda/`，可用 `python3 tools/merge_chapter5_addenda.py` 重新驗證與合併；新增正文的細部敘事變體並非全部已轉成可玩的場景。

程式現有本機自動存檔、刷新續玩、字級／閱讀速度記憶，跨世保留死亡數與世界常識殘念。每一世重新抽取隱藏命線，紀錄本世重要 NPC 因果；殘念不會給你正確按鈕。僅使用瀏覽器本機儲存，不需要伺服器或付費 API，無痕模式／清除網站資料可能失去進度。

## 本機檢查

`node --test tests/continuity.test.cjs`：存檔、資源驗證、種子重現、NPC 基礎因果、五章場景圖。需做瀏覽器煙霧測試時，從專案根目錄啟動 `python3 -m http.server 28765 --bind 127.0.0.1`，另執行 `python3 tools/browser_smoke.py`（需本機 Playwright 與 Chrome／Chromium）。真人測試表與公平性問題請見 `docs/PLAYTEST_ROUND_1.md`；目前尚未進行真人輪迴驗收。

## 文件索引

- `docs/PROJECT_CORE_CARD.md`：專案核心卡
- `docs/DESIGN_CONSTITUTION.md`：核心設計憲法
- `docs/CHAPTER_PLAN.md`：五章結構與主題曲線
- `docs/CONTENT_SCALE_AND_WORDCOUNT.md`：五章 × 每章約五萬字的內容規模規格
- `docs/MVP_SCOPE.md`：MVP 範圍與驗證問題
- `docs/CHAPTER_1_RESTRUCTURE.md`：第一章重構方向
- `docs/CHAPTER_1_IMPLEMENTATION.md`：第一章實作規格
- `docs/EVENT_TEMPLATE.md`：事件模板
- `docs/BALANCE_TARGETS.md`：存活率與節奏目標
- `docs/COPYWRITING_GUIDE.md`：文案口吻規範
- `docs/EPITAPH_SYSTEM.md`：墓誌銘系統
- `data/events/chapter1_seed_events.md`：第一章種子事件
- `data/events/chapter1_implementation.json`：第一章機器可讀事件資料
- `data/events/chapter1_event_graph.md`：第一章事件流與分支圖
- `data/events/chapter1_content_blocks.md`：第一章人工可讀文案池
- `data/content/chapter1_full_text.md`：第一章 5～6 萬字正文主檔
- `data/epitaphs/epitaph_seed_bank.md`：墓誌銘素材庫
- `PROJECT_STATUS.md`：目前五章內容與工程修正狀態
- `data/runtime/continuity.js`：輪迴命簿／本機儲存／資源檢核與抽樣
- `data/content/chapter5_addenda/`：第五章 5-1～5-11 分節補寫原稿
- `tools/merge_chapter5_addenda.py`：增補合併與 Unicode 字元數檢查
- `docs/PLAYTEST_ROUND_1.md`：真人輪迴驗收表及死亡公平性問題
