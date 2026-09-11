# 第一章事件圖：村外有仙

本圖描述第一章內容流向。實際 runtime 不必固定照線性順序播放，而是依角色狀態、隱藏真相與玩家策略抽取事件。

## 入口

```text
CH1_START
  ↓
CH1_LIFE_PROFILE_ROLL
  ↓
CH1_YOUTH_FILTER
  ├─ 少年期事故死亡 → EPITAPH → REBIRTH
  ├─ 傷病／欠債開局 → VILLAGE_YOUTH
  └─ 普通可玩開局 → VILLAGE_YOUTH
```

## 山村少年線

```text
VILLAGE_YOUTH
  ├─ CH1_VIL_001 母親阻止進山
  │    ├─ 聽完 → +village_bonds, +mountain_lore clue
  │    ├─ 頂嘴 → -village_bonds, +greed_mark
  │    └─ 偷偷進山 → MOUNTAIN_HERB 或 NIGHT_FOG
  │
  ├─ CH1_VIL_002 老獵戶的獸足
  │    ├─ 付銀請教 → +mountain_lore, -silver
  │    ├─ 幫忙搬柴 → +mountain_lore, -body
  │    ├─ 不聽 → 後續獸跡 clue 失效
  │    └─ 讓同村少年先去問 → +transferred_risk seed
  │
  ├─ CH1_VIL_003 父親見仙傳聞
  │    ├─ 細問 → +sect_rumor, +family_pressure
  │    ├─ 當成夢話 → 保持安全但錯失 clue
  │    └─ 拿祖傳玉佩驗證 → WANDERING_CULTIVATOR risk up
  │
  └─ CH1_VIL_004 同村少年先走一步
       ├─ 跟上 → higher danger, higher opportunity
       ├─ 等消息 → witnessed_death possible
       └─ 阻止他 → +bonds, chance lose opportunity
```

## 山中靈草線

```text
MOUNTAIN_HERB
  ├─ CH1_HERB_001 山腰發光草
  │    ├─ 直接採下 → true herb / poison / beast / tracking
  │    ├─ 遠處觀察 → reveal clue, +caution_debt
  │    ├─ 檢查足跡 → requires mountain_lore
  │    ├─ 找獵戶同行 → -silver or -bonds, lower beast risk
  │    ├─ 做記號回村 → opportunity may be stolen
  │    └─ 放棄離開 → live, missed chance, possible long life ending
  │
  ├─ CH1_HERB_002 甜味山霧
  │    ├─ 深吸辨味 → miasma death risk
  │    ├─ 濕布掩口 → requires prep item
  │    ├─ 繞路 → -time, chance into beast trail
  │    └─ 退回 → safe but chance lost
  │
  └─ CH1_HERB_003 沒有蟲鳴
       ├─ 靠近確認 → danger escalates
       ├─ 丟石試探 → may trigger hidden mark
       ├─ 等到天亮 → opportunity contested
       └─ 叫別人先看 → transferred_risk seed
```

## 青雲宗線

```text
QINGYUN_RECRUITMENT
  ├─ CH1_QY_001 招雜役告示
  │    ├─ 花錢上山 → -silver, enter test
  │    ├─ 酒樓打聽 → -silver, +sect_rumor
  │    ├─ 找回村雜役 → +danger clue, may be too late
  │    ├─ 混入隊伍 → high risk, possible fast entry
  │    ├─ 賣家產 → +silver, +family_debt aftermath
  │    └─ 留在村中 → missed chance / safe ending
  │
  ├─ CH1_QY_002 山門台階
  │    ├─ 硬撐 → body check, injury/death
  │    ├─ 慢慢走 → +caution_debt, queue disadvantage
  │    ├─ 幫富戶子弟搬包 → +silver or humiliation
  │    └─ 退出 → safe, family consequence
  │
  └─ CH1_QY_003 雜役初選
       ├─ 報真實身體狀況 → possible reject, preserve life
       ├─ 隱瞞舊傷 → entry chance, future death risk
       ├─ 問工錢 → suspicion, maybe reject
       └─ 主動吃苦 → marked as useful expendable
```

## 遊方散修線

```text
WANDERING_CULTIVATOR
  ├─ CH1_WC_001 青袍散修入村
  │    ├─ 立刻拜師 → high danger, fast opportunity
  │    ├─ 偷聽村長談話 → +truth clue, caught risk
  │    ├─ 問師門 → reveal evasive clue
  │    ├─ 觀察幾天 → -time, truth drift
  │    ├─ 不理他 → safe/missed/retaliation depending truth
  │    └─ 帶玉佩求鑑定 → unlock jade truth, high greed mark
  │
  ├─ CH1_WC_002 第一顆丹藥
  │    ├─ 馬上吃 → test medicine risk
  │    ├─ 藏起來 → deception risk
  │    ├─ 給雞吃 → clue, culticator suspicion
  │    └─ 送郎中看 → -bonds or +intel
  │
  └─ CH1_WC_003 夜半離村
       ├─ 跟走 → route to sect/outland, death risk
       ├─ 裝病拖延 → truth revealed / chance lost
       ├─ 叫同村人同行 → witness/transferred risk
       └─ 逃回家 → family may be punished
```

## 章節出口

```text
CH1_EXIT
  ├─ DEATH_SELF              # 第一章主軸：自己死
  ├─ WITNESSED_OTHER_DEATH   # 第三章伏筆：別人的死會留下風險情報，但不等於固定答案
  ├─ TRANSFERRED_RISK        # 第五章伏筆：讓別人死
  ├─ MUNDANE_SURVIVAL        # 苟活凡人
  ├─ DAMAGED_MERIDIAN        # 失去資格
  ├─ SERVANT_ENTRY           # 帶傷進入第二章
  ├─ FAKE_METHOD             # 第三章假功法伏筆
  └─ BROKEN_BREATHING_METHOD # 稀有：拿到殘缺吐納法
```

## 關鍵規則

1. 事件不是固定答案題。
2. 同一個表面事件可抽到不同 hidden truth。
3. 玩家選項代表策略，不代表正解。
4. 保守選項必須有成本。
5. 冒險選項必須有可觀察、可準備、可延後的判斷空間。
6. 死亡必須有伏筆，死後情報不能直接告訴玩家按哪個選項。
7. 第一章每次死亡都應該讓玩家更理解：凡人不是輸在笨，而是輸在沒有承擔資訊錯誤的本錢。
