# 專案狀態

建立日期：2026-09-10

## 目前狀態

已完成專案重新命名、核心定位、設計憲法、五章結構、每章約五萬字內容規格、MVP 範圍、第一章重構方向、事件模板、存活率目標與墓誌銘素材庫。

第一章正文已完成第一版 5～6 萬字主檔：`data/content/chapter1_full_text.md`。目前統計為含空白 52,465 字、不含空白 50,005 字、共 2,329 行。此檔不是骨架，而是可直接拆入遊戲事件池、選項結果、死亡畫面、墓誌銘與死後情報的正文內容。

第一章互動頁已在 `fanren.html` 依照 Replit 舊版「凡人修仙：你活不過第一章」的體驗重做：改為手機直式全螢幕劇情機，直接進入序章與三岔口流程，保留頂部狀態列、逐段正文、選項成本/風險、隨機命運底牌、死亡墓碑卡、存活卡、此生最接近仙途、死後情報與再投一世；舊名已替換為《凡人不修仙》。

第一章互動頁節奏已修正：正文改為逐字浮現，加入「命運氣息」氛圍條與閱讀提示；選項必須等所有正文跑完才會出現，避免破壞文字 Roguelike 的閱讀氛圍。

第二章《山門不渡凡人》正文第一版已完成並落檔：`data/content/chapter2_full_text.md`，另保留 `data/content/chapter2_parts/` 九個可維護分段。主檔目前為 55,940 個 Unicode 字元、210 個 `ch2.*` 正文區段，內容不是骨架，已實作靈根測試、雜役契約、靈石搬運、藥田、師兄利用、外門規矩、殘缺功法、外門補錄、宗門耗材、凡人/記名/外門等收束與第三章坊市伏筆。

第二章互動第一版已接入 `fanren.html`，互動資料獨立放在 `data/runtime/chapter2_scenes.js`。第一章「灰衣」結算新增正式第二章入口；第二章目前有 66 個可到達場景、14 個死亡場景、6 個存活收束、19 個含隱藏結果池的隨機事件場景。Runtime 新增 choice-level `nextPool` 與 scene-level `randomNexts`，讓同一表面行動可落入不同背後真相，避免死亡後背固定答案。主線已涵蓋契約、分工、搬靈石、帳房、藥田、夜間臨時差、鄭師兄利用、外門規矩、殘缺功法、引氣、外門補錄與第一次成為「師兄」後向下轉嫁壓力。

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

1. 將 Replit 參考版風格的 `fanren.html` push 到 GitHub Pages，並用手機實機驗證觸控流程、文字節奏與墓碑卡可讀性。
2. 將 `chapter1_full_text.md` 更細拆分映射到 runtime 可抽取的 scene / choice / death / epitaph blocks。
3. 進行第一章 20～30 次輪迴測試，檢查是否符合死亡曲線與「死後想再投一世」。
4. 依實測補足更多事件變體與特殊死法。
5. 以手機實測第二章互動節奏與死亡/存活分支，再把正文主檔剩餘尚未映射的 `ch2.*` 變體逐步補進 `data/runtime/chapter2_scenes.js`。

## 禁止膨脹項目

目前不做築基、戰鬥、大地圖、抽卡、多角色、排行榜、商城或線上功能。
