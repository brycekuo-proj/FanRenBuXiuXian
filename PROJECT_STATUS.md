# 專案狀態

建立日期：2026-09-10

## 目前狀態

已完成專案重新命名、核心定位、設計憲法、五章結構、每章約五萬字內容規格、MVP 範圍、第一章重構方向、事件模板、存活率目標與墓誌銘素材庫。

第一章正文已完成第一版 5～6 萬字主檔：`data/content/chapter1_full_text.md`。目前統計為含空白 52,465 字、不含空白 50,005 字、共 2,329 行。此檔不是骨架，而是可直接拆入遊戲事件池、選項結果、死亡畫面、墓誌銘與死後情報的正文內容。

## 本機資料夾

`Games/FanRenBuXiuXian`

顯示名稱：`《凡人不修仙》`

## 已建立第一章實作檔案

1. `docs/CHAPTER_1_IMPLEMENTATION.md`：第一章實作規格。
2. `data/events/chapter1_implementation.json`：第一章機器可讀事件資料。
3. `data/events/chapter1_event_graph.md`：第一章事件流與分支圖。
4. `data/events/chapter1_content_blocks.md`：第一章人工可讀文案池。
5. `data/content/chapter1_full_text.md`：第一章 5～6 萬字正文主檔。

## 下一步

1. 將現有 Replit Web MVP 的程式碼與第一章 JSON 事件資料對齊。
2. 建立 runtime loader：讀取 life profile、event lines、hidden truth、choices、death result、intel、epitaph。
3. 實作墓誌銘顯示與情報收集邏輯。
4. 將 `chapter1_full_text.md` 拆分映射到 runtime 可抽取的 scene / choice / death / epitaph blocks。
5. 進行第一章 20～30 次輪迴測試，檢查是否符合死亡曲線與「死後想再投一世」。

## 禁止膨脹項目

目前不做築基、戰鬥、大地圖、抽卡、多角色、排行榜、商城或線上功能。
