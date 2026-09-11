(() => {
  const S = (chapter, title, paragraphs, extra = {}) => ({
    bookChapter: 3,
    chapter: `第三章・${chapter}`,
    title,
    paragraphs,
    ...extra
  });

  window.CHAPTER3_SCENES = {
    ch3_call_entry: S('藥谷徵召', '外門福利', [
      '三天後，外門堂貼出新告示：藥谷春熟，外門徵採。',
      '七日，保底二十貢獻。指定靈藥另計。突出者可換聚氣丹、洗脈散與藏書閣時辰。',
      '第二章你最怕仙門不要你。現在仙門真的把一個像機緣的名額放到你面前。',
      '問題是，你已經不太相信「福利」兩個字了。'
    ], {
      choices: [
        { text: '先查往年死傷與徵召紀錄', next: 'ch3_call_history', intelDelta: 8, appraisalDelta: 4, moment: '第一次在機緣前先查前例' },
        { text: '二十貢獻很值，先把名字報上', next: 'ch3_slot', meritDelta: 2, moment: '報名藥谷徵採' },
        { text: '先問剛從藥谷回來的人，不查公文', next: 'ch3_call_rumor', intelDelta: 4, moment: '先聽活人的版本' }
      ]
    }),

    ch3_call_history: S('藥谷徵召', '去年少了十一個', [
      '檔房不給你看死亡冊，只給你看領貢獻名單。',
      '去年徵召四十八人，最後領到貢獻的只有三十七。',
      '你問另外十一個。檔房弟子說：「有人退出。」你再問，他才補一句：「也有人死了。」',
      '你沒有得到死法。至少得到一個分母。'
    ], {
      choices: [
        { text: '再花錢查今年和往年哪裡不一樣', nextPool: [
          { next: 'ch3_history_normal', weight: 55 },
          { next: 'ch3_history_warning', weight: 45 }
        ], coinDelta: -1, intelDelta: 8, appraisalDelta: 3 },
        { text: '知道會死人就夠了，仍然報名', next: 'ch3_slot', intelDelta: 2 },
        { text: '不報，至少這次不當分母', next: 'ch3_end_decline', moment: '在藥谷名冊前轉身' }
      ]
    }),

    ch3_call_rumor: S('藥谷徵召', '活人的版本', [
      '有人說藥谷很安全，去年自己只割破手。',
      '有人說裡面每年都埋人，二十貢獻就是買命錢。',
      '第三個人只問你一句：「你去的是採藥，還是去找機緣？」',
      '三個人都像在說真話。'
    ], {
      choices: [
        { text: '把傳聞記下，但不當答案', next: 'ch3_slot', intelDelta: 5, appraisalDelta: 2 },
        { text: '聽見「很安全」就直接報', next: 'ch3_slot', betrayalDelta: 2 },
        { text: '聽見死人就放棄', next: 'ch3_end_decline' }
      ]
    }),

    ch3_history_normal: S('藥谷徵召', '今年看起來很普通', [
      '你查到今年雨量、採收期與往年差不多。',
      '沒有神秘缺額，也沒有突然加倍的報酬。',
      '你花了一枚銅錢，只換到一個「目前沒看出異常」。',
      '調查不是每次都會挖出陰謀。有時候你買到的只是安心。'
    ], {
      choices: [
        { text: '報名。普通不代表安全，但至少不是明顯異常', next: 'ch3_slot', intelDelta: 3 },
        { text: '仍然不去', next: 'ch3_end_decline' }
      ]
    }),

    ch3_history_warning: S('藥谷徵召', '今年有一點不一樣', [
      '今年藥谷提前七天成熟。',
      '更奇怪的是，中圈兩處藥圃臨時改成「待驗」。',
      '告示沒有寫。檔房只說藥性波動，不影響外圈徵採。',
      '這不是證據。只是值得多留一條退路。'
    ], {
      choices: [
        { text: '仍報名，但把「中圈待驗」記死', next: 'ch3_slot', intelDelta: 8, appraisalDelta: 4 },
        { text: '這已經夠了，不去', next: 'ch3_end_decline' }
      ]
    }),

    ch3_slot: S('藥谷徵召', '一百二十六人，收八十', [
      '今年報名一百二十六人，只收八十。',
      '修為、工簿、保人排完，你在第八十四。',
      '第四天忽然空出三個名額。再過半日，又有人退出。你的名字被補進去。',
      '以前你只會高興。現在你先想：那幾個人為什麼不去了？'
    ], {
      choices: [
        { text: '接受補位，開始準備七天物資', next: 'ch3_prepare', meritDelta: 1 },
        { text: '先查空缺原因', nextPool: [
          { next: 'ch3_slot_harmless', weight: 58 },
          { next: 'ch3_slot_trade', weight: 42 }
        ], intelDelta: 6, appraisalDelta: 2 },
        { text: '把剛到手的名額賣給更想去的人', next: 'ch3_end_sell_slot', coinDelta: 3, moment: '把一次未知機緣換成確定收益' }
      ]
    }),

    ch3_slot_harmless: S('藥谷徵召', '只是被內門調走', [
      '三個空缺來自內門臨時調人。沒有失蹤，沒有恐嚇，也沒有死人。',
      '你又一次花時間查到「沒事」。',
      '但你至少知道這次補位不是踩著三具新屍體進去。'
    ], {
      choices: [{ text: '接受名額', next: 'ch3_prepare', intelDelta: 2 }]
    }),

    ch3_slot_trade: S('藥谷徵召', '有人把名額賣了', [
      '其中兩個退出者各收了兩塊靈石。',
      '他們不是怕，只是覺得兩塊靈石已經是夠好的機緣。',
      '你第一次知道，冒險權本身也能交易。'
    ], {
      choices: [
        { text: '你還是要進', next: 'ch3_prepare', intelDelta: 2 },
        { text: '照市場價把自己的也賣掉', next: 'ch3_end_sell_slot', coinDelta: 3 }
      ]
    }),

    ch3_prepare: S('藥谷徵召', '七天清單', [
      '宗門發下乾糧、解瘴丸、粗布手套、靈藥匣與火折。',
      '外門小市一夜漲價。有人賣去年藥谷地圖，一枚靈石。',
      '地圖上有三個紅叉：毒藤、地陷、未知。',
      '去年危險，不代表今年還危險；去年安全，也不代表今年還安全。'
    ], {
      choices: [
        { text: '買地圖，當參考，不當答案', next: 'ch3_map_bought', coinDelta: -1, intelDelta: 8, appraisalDelta: 3, moment: '買下過期程度未知的藥谷地圖' },
        { text: '不買，把錢留給藥和退路', next: 'ch3_team', qiDelta: 4 },
        { text: '只抄紅叉位置，和別人合買', next: 'ch3_team', intelDelta: 5, trustDelta: 2 }
      ]
    }),

    ch3_map_bought: S('藥谷徵召', '一張舊地圖', [
      '賣圖的人左耳缺了一角。',
      '他說外圈安全，中圈有妖獸，最深處有一道平常不開的封谷石門。',
      '你把地圖折好，也把一句話記在旁邊：舊情報需要驗證。'
    ], {
      choices: [{ text: '進谷前先找隊友', next: 'ch3_team', intelDelta: 2 }]
    }),

    ch3_team: S('藥谷徵召', '四人一組', [
      '你和梁敬、蘇禾、邵平分成一隊。',
      '梁敬練氣四層，想多賺貢獻。蘇禾懂藥。邵平修為最低，但帶了一面小盾。',
      '梁敬先說：「進去一起，不搶。」',
      '人在沒有東西可搶時，最容易講義氣。'
    ], {
      choices: [
        { text: '現在就把私人靈材、救命、探路怎麼分談清楚', next: 'ch3_team_rules', trustDelta: 10, betrayalDelta: -5, appraisalDelta: 3 },
        { text: '都是同門，進去再說', next: 'ch3_valley_entry', betrayalDelta: 10 },
        { text: '只和蘇禾交換辨藥情報，不談分配', next: 'ch3_valley_entry', intelDelta: 5, trustDelta: 3 }
      ]
    }),

    ch3_team_rules: S('藥谷徵召', '先談怎麼分', [
      '你們約定：宗門指定藥照規矩算；私人靈材，發現者五成、隊伍五成；額外冒險者多一成。',
      '「救命另談」四個字最後還是沒談清楚。',
      '至少大部分容易吵的地方，在東西還不值錢時先寫下了。'
    ], {
      choices: [{ text: '入谷', next: 'ch3_valley_entry', trustDelta: 3 }]
    }),

    ch3_valley_entry: S('藥谷徵召', '第一具屍體', [
      '青石門後不是小藥園，而是一整座霧壓著的谷地。',
      '進谷不到一里，你就在樹根間看見一具舊骨。腰間還掛著外門牌。',
      '有人問為什麼沒收屍。周執事只說：「去年霧厚，找不到。」',
      '你第一次知道，不是每一具屍體都會變成宗門公告。'
    ], {
      choices: [
        { text: '先看屍骨附近植物、地形和舊腳印', next: 'ch3_moss', intelDelta: 6, appraisalDelta: 4 },
        { text: '死人是去年的，先做今年的差事', next: 'ch3_moss' }
      ]
    }),

    ch3_moss: S('靈藥異變', '藍色靈苔', [
      '第三天早上，蘇禾發現一片靈苔顏色不對。',
      '正常灰綠，這片偏藍，還帶一點甜味。',
      '昨天沒有。今天卻像從地底滲出來。',
      '異常不等於危險。異常只代表值得停一下。'
    ], {
      choices: [
        { text: '取普通苔和藍苔做對照樣本，不直接碰', next: 'ch3_moss_sample', appraisalDelta: 10, intelDelta: 7 },
        { text: '靈性變濃可能值錢，直接採一小把', nextPool: [
          { next: 'ch3_moss_blessing', weight: 35 },
          { next: 'ch3_moss_touch_death', weight: 65 }
        ], pollutionDelta: 12, risk: '高' },
        { text: '繞開，不浪費採藥時間', next: 'ch3_ripe', meritDelta: 2 }
      ]
    }),

    ch3_moss_sample: S('靈藥異變', '先封', [
      '藥師把兩份樣本分開封。',
      '第二天，裝藍苔的陶片裂了。苔從裂縫裡多長了半寸。',
      '藥師沒有宣布答案，只說中圈先繞。',
      '你們比昨天多知道了一點，也只是一點。'
    ], {
      randomNexts: [
        { next: 'ch3_moss_blessing', weight: 42 },
        { next: 'ch3_infection', weight: 58 }
      ],
      waitMs: 1100
    }),

    ch3_moss_blessing: S('靈藥異變', '這次真的是機緣', [
      '藥師驗出藍苔只是地底靈脈短暫上湧造成的異化。',
      '它能做靈蟲培養底材，價值是普通靈苔的二十倍。',
      '蘇禾拿十五貢獻，你們每人也分到三點。',
      '如果你把「顏色不對」背成危險答案，這次就會把真機緣一起丟掉。'
    ], {
      choices: [{ text: '記住：異常先驗，不先判善惡', next: 'ch3_ripe', meritDelta: 3, intelDelta: 5 }]
    }),

    ch3_moss_touch_death: S('靈藥異變', '長在皮下', [
      '第一天只是手背發癢。',
      '第二天耳後多一塊藍斑。',
      '第三天，你看見一根極細的藍芽從指甲縫裡長出來。',
      '這株靈藥最後真的找到了一塊靈氣更足的土。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '用手採到第一把異變靈苔',
      death: { cause: '直接接觸藥谷異變孢苔後遭靈性寄生。', epitaph: '此地長眠著王狗蛋。\n他以為自己採到了靈藥。\n後來靈藥也採到了他。' },
      intel: '異常不等於危險，但未知異常值得先取樣、隔離、比較，而不是直接用身體做第一個容器。'
    }),

    ch3_infection: S('靈藥異變', '第一個倒下的人', [
      '另一隊的何師兄先咳了兩聲。第二天耳後出現藍斑。',
      '他堅持只是風寒，因為一旦承認症狀，就會失去採藥貢獻。',
      '第四天，他嘴裡長滿藍色細絲。',
      '何師兄死後，營地忽然變聰明：檢查耳後、重分睡帳、甜味和咳嗽第一次被寫在同一張警示上。'
    ], {
      choices: [
        { text: '把何師兄的症狀順序記下，不把藍苔一概判死', next: 'ch3_ripe', intelDelta: 12, appraisalDelta: 6, trustDelta: 2, moment: '第一次從別人的死裡得到直接生存情報' },
        { text: '既然死人了，所有藍色東西都不要碰', next: 'ch3_ripe', intelDelta: 3, meritDelta: -1 },
        { text: '趁大家怕，去採沒人敢碰的外緣藍苔', nextPool: [
          { next: 'ch3_moss_blessing', weight: 30 },
          { next: 'ch3_moss_touch_death', weight: 70 }
        ], risk: '極高', pollutionDelta: 15 }
      ]
    }),

    ch3_ripe: S('靈藥異變', '赤心草成熟', [
      '第四天，赤心草整片轉橙。成熟窗口只有兩個時辰。',
      '宗門把所有未隔離小隊調上坡。',
      '風裡有一點甜味。你不知道來自赤心草，還是藍苔孢子。',
      '時間第一次不允許你查到完全知道為止。'
    ], {
      choices: [
        { text: '只採外圈，戴布巾、判風向、縮短停留', next: 'ch3_ripe_outer', meritDelta: 5, qiDelta: -5, intelDelta: 3 },
        { text: '中心三倍收益，跟梁敬進去', nextPool: [
          { next: 'ch3_ripe_center_safe', weight: 50 },
          { next: 'ch3_ripe_center_sick', weight: 50 }
        ], meritDelta: 12, qiDelta: -10, pollutionDelta: 14, risk: '高' },
        { text: '先用舊地圖與風向重新比對中心低窪', next: 'ch3_ripe_checked', requires: { intel: 12 }, requireText: '需要情報 12', intelDelta: 6, appraisalDelta: 5 }
      ]
    }),

    ch3_ripe_checked: S('靈藥異變', '風往低處壓', [
      '你把舊地圖、藍苔位置和今日風向疊在一起。',
      '中心低窪剛好是氣流最容易沉的位置。',
      '這仍不能證明孢子一定在那裡，只讓你知道「中心三倍收益」同時可能是三倍暴露。'
    ], {
      choices: [
        { text: '採外圈', next: 'ch3_ripe_outer', meritDelta: 5, qiDelta: -5 },
        { text: '知道風險後仍進中心，限時半刻', nextPool: [
          { next: 'ch3_ripe_center_safe', weight: 62 },
          { next: 'ch3_ripe_center_sick', weight: 38 }
        ], meritDelta: 10, qiDelta: -8, pollutionDelta: 8, risk: '中' }
      ]
    }),

    ch3_ripe_outer: S('靈藥異變', '你少拿了', [
      '你們只採外圈。',
      '另一隊直接進中心，全員平安，貢獻多你們一倍。',
      '梁敬一路沒說話。你也知道他在想什麼。',
      '小心有時候真的就是少賺，而且會讓你親眼看別人靠冒險拿到好處。'
    ], {
      choices: [{ text: '把少拿的也算進風險成本', next: 'ch3_beast', intelDelta: 4, trustDelta: 2 }]
    }),

    ch3_ripe_center_safe: S('靈藥異變', '這次你賭到了', [
      '中心沒有孢子。',
      '你們採到整隊最多的赤心草，梁敬笑了一路。',
      '你沒有因為冒險就受罰。世界有時真的會獎勵你。',
      '正因如此，下一次才更難停。'
    ], {
      choices: [{ text: '收手，不把這次安全當成規律', next: 'ch3_beast', meritDelta: 8, intelDelta: 3 }, { text: '今天手氣好，再接高風險採集', next: 'ch3_beast', meritDelta: 4, betrayalDelta: 4, risk: '中' }]
    }),

    ch3_ripe_center_sick: S('靈藥異變', '晚上才開始咳', [
      '中心隊伍白天都沒事。',
      '晚上七個人同時咳。你也在其中。',
      '你的耳後還沒有藍斑，醫師只說觀察。',
      '你拿到了貢獻，也帶回一個還沒結算的代價。'
    ], {
      choices: [
        { text: '主動報症狀，暫停採集', next: 'ch3_beast', pollutionDelta: 6, meritDelta: -3, intelDelta: 6, trustDelta: 5 },
        { text: '還沒藍斑，先繼續做', next: 'ch3_beast', pollutionDelta: 12, meritDelta: 4, risk: '高' }
      ]
    }),

    ch3_beast: S('靈藥異變', '妖獸也聞到了', [
      '鐵背獾撞進藥圃時，第一個被追的是抱著整筐赤心草的人。',
      '師兄大喊「丟！」那人卻慢了半息。',
      '不是他蠢。那一筐等於半年貢獻。',
      '人腦很難在一瞬間把半年努力改成垃圾。'
    ], {
      choices: [
        { text: '妖獸轉向你時，立刻丟藥匣', next: 'ch3_beast_drop', meritDelta: -5, qiDelta: -3 },
        { text: '抱住，繞盾後撤，想把草和命一起帶走', nextPool: [
          { next: 'ch3_beast_escape', weight: 45 },
          { next: 'ch3_beast_hold_death', weight: 55 }
        ], qiDelta: -14, risk: '極高' },
        { text: '先把藥匣綁繩拖地，自己空手跑', next: 'ch3_beast_escape', requires: { appraisal: 12 }, requireText: '需要鑑別 12', qiDelta: -6, meritDelta: -2 }
      ]
    }),

    ch3_beast_drop: S('靈藥異變', '命保住了，草沒了', [
      '獾追著散開的赤心草去了。',
      '周執事記你處置正確，貢獻仍只按實際交回。',
      '你救了自己，宗門也沒有替你補掉丟掉的半年。',
      '下一次有人因此多猶豫半息，你會理解他。'
    ], {
      choices: [{ text: '接受損失，回營', next: 'ch3_gate_night', intelDelta: 4 }]
    }),

    ch3_beast_escape: S('靈藥異變', '兩個都帶出來', [
      '你真的把人和藥一起帶了出來。',
      '梁敬拍你肩膀，說就知道可以。',
      '這次準備與運氣都站在你這邊。',
      '成功最危險的地方，是它會替下一次冒險提供理由。'
    ], {
      choices: [{ text: '記住成功也不是保證', next: 'ch3_gate_night', meritDelta: 6, intelDelta: 2 }]
    }),

    ch3_beast_hold_death: S('靈藥異變', '半年', [
      '你抱緊藥匣。',
      '鐵背獾先撞到你，再撞開匣子。',
      '半年貢獻散了一地。你也沒有完整留下。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '抱著一匣赤心草準備出谷',
      death: { cause: '不願放棄高價靈藥，在妖獸衝擊時慢了一瞬。', epitaph: '此地長眠著王狗蛋。\n他捨不得丟掉半年。\n最後半年和他一起被丟在藥田。' },
      intel: '撤退成本若全部由個人承擔，人就會更晚放手。先想好什麼情況下必須丟，會比當場決定容易。'
    }),

    ch3_gate_night: S('秘境開口', '山腹亮了一下', [
      '第六夜，地面連震三次。',
      '舊地圖最內圈那道「平常不開」的封谷石門，真的裂了一條縫。',
      '冷風從裡面吹出來，帶著舊紙和藥灰的味道。',
      '「古修洞府」四個字沒人喊出口，每個人卻都在想。'
    ], {
      choices: [
        { text: '先退十丈，看陣師怎麼判', next: 'ch3_gate_order', intelDelta: 5, appraisalDelta: 3 },
        { text: '靠近裂縫，搶第一眼', next: 'ch3_gate_order', pollutionDelta: 4, intelDelta: 3, risk: '中' }
      ]
    }),

    ch3_gate_order: S('秘境開口', '三支先行隊', [
      '宗門高層也在爭：先封，還是趁靈脈未變先探。',
      '最後決定先派三支低階隊進外層，一炷香即回。',
      '每人額外二十貢獻。',
      '二十貢獻不是獎勵你探險，是獎勵你替後面的人知道前面會不會死人。'
    ], {
      choices: [
        { text: '自願進第一批', next: 'ch3_probe_slot', meritDelta: 4, trustDelta: 2, risk: '高' },
        { text: '等第一隊回來再決定', next: 'ch3_first_team', intelDelta: 4 },
        { text: '不進，準備按原計畫撤谷', next: 'ch3_retreat_choice' }
      ]
    }),

    ch3_probe_slot: S('秘境開口', '有人出三塊靈石買你的位置', [
      '點名後，一名練氣五層弟子私下找你。',
      '「三塊靈石，換你的先行位。」',
      '他說先進的人看到的，後面未必還在。',
      '你第一次可以把未知死亡風險和未知改命機會一起賣掉。'
    ], {
      choices: [
        { text: '賣。把未知換成確定的三塊靈石', nextPool: [
          { next: 'ch3_slot_buyer_dead', weight: 45 },
          { next: 'ch3_slot_buyer_rich', weight: 55 }
        ], coinDelta: 3, moment: '把秘境先行位賣給別人' },
        { text: '不賣，自己進', next: 'ch3_enter_outer', meritDelta: 4, risk: '高' }
      ]
    }),

    ch3_slot_buyer_dead: S('秘境開口', '你賣掉一場死局', [
      '買你位置的人進去了。',
      '第一隊回來三個，他沒回。',
      '你手裡多三塊靈石，看著他的名字被畫掉。',
      '你沒有殺他。他比你更想去。可你第一次從別人替你承擔風險中拿到確定收益。'
    ], {
      choices: [{ text: '等第二隊情報，再決定自己要不要進', next: 'ch3_first_team', intelDelta: 8, betrayalDelta: 3 }]
    }),

    ch3_slot_buyer_rich: S('秘境開口', '你賣掉真機緣', [
      '買你位置的人平安回來，帶出一枚古丹瓶。',
      '宗門鑑定後給了他一顆凝氣丹。價值遠超三塊靈石。',
      '你沒有被坑，也沒有陰謀。你就是把一個真的機緣賣便宜了。'
    ], {
      choices: [{ text: '承認保守也會有真實機會成本', next: 'ch3_first_team', intelDelta: 5 }]
    }),

    ch3_first_team: S('秘境開口', '三個人回來', [
      '第一隊進去不到一炷香，只有三個人衝出來。',
      '一人左臂流血，一人臉白，第三人手裡抓著黑色石片。',
      '第四個踩到一處像水一樣下陷的地面，沒回來。',
      '下一隊立刻在圖上把那裡畫成紅叉。沒有人有時間替死者停很久。'
    ], {
      choices: [
        { text: '把「看到」和「推測」分開記：下陷已驗證，原因未知', next: 'ch3_enter_decide', intelDelta: 12, appraisalDelta: 4, moment: '第一次站在別人的死後面往前走' },
        { text: '既然有人死，整個秘境都不碰', next: 'ch3_retreat_choice' },
        { text: '死過人的路不走，其他地方照進', next: 'ch3_enter_decide', intelDelta: 5 }
      ]
    }),

    ch3_retreat_choice: S('秘境開口', '現在走，還來得及', [
      '原定七日採集已經完成。',
      '你現在撤，保底貢獻仍在，也不用為秘境多押一條命。',
      '梁敬卻說：「你現在走，以後會後悔一輩子。」',
      '走了，你永遠不知道留下能拿什麼；留下死了，也永遠不知道走了能活多久。'
    ], {
      choices: [
        { text: '撤。把已知收益帶回去', nextPool: [
          { next: 'ch3_end_retreat_safe', weight: 52 },
          { next: 'ch3_end_retreat_cost', weight: 48 }
        ] },
        { text: '至少探外層，不碰深處', next: 'ch3_enter_outer', intelDelta: 3 }
      ]
    }),

    ch3_enter_decide: S('秘境開口', '不是進或不進', [
      '你問能不能只探前兩室，能不能綁繩，能不能先用紙鶴，遇事能不能直接退。',
      '答案大多是可以。',
      '你們最後把一個「要不要進秘境」的大問題，切成幾個能單獨判斷的小問題。'
    ], {
      choices: [
        { text: '只探前兩室，一炷香不到就退', next: 'ch3_enter_outer', trustDelta: 4, intelDelta: 4 },
        { text: '跟梁敬走深一點，先到的人先看', next: 'ch3_enter_outer', betrayalDelta: 8, risk: '高' },
        { text: '看到第一隊死人還是不舒服，撤', next: 'ch3_retreat_choice' }
      ]
    }),

    ch3_enter_outer: S('秘境開口', '第一室', [
      '石門裡比外面冷。牆角灰裡有白點，像骨屑。',
      '牆上只剩三個能辨出的字：「養……還……身……」',
      '半句話最容易被人補成自己想要的意思。',
      '第二室有三只石匣：一只裂、一只完整、一只結霜。'
    ], {
      choices: [
        { text: '先看地面、牆孔與匣蓋縫，不直接開', next: 'ch3_box_inspect', appraisalDelta: 10, intelDelta: 6 },
        { text: '完整那只最像寶，直接開', nextPool: [
          { next: 'ch3_box_air', weight: 35 },
          { next: 'ch3_box_root_death', weight: 65 }
        ], pollutionDelta: 10, risk: '極高' },
        { text: '什麼都不碰，把房間畫下來', next: 'ch3_intel_market', intelDelta: 8 }
      ]
    }),

    ch3_box_inspect: S('秘境開口', '三個匣後都有小孔', [
      '三只匣後方都有細孔，像通風，也像機關。',
      '你們用繩遠距拉開裂匣一指。',
      '裡面傳出一聲很輕的「呼」。',
      '四個人同時停住。'
    ], {
      choices: [
        { text: '等氣散，再用長杆探', nextPool: [
          { next: 'ch3_box_air', weight: 55 },
          { next: 'ch3_box_root', weight: 45 }
        ], appraisalDelta: 6, intelDelta: 5 },
        { text: '聲音只是密封氣體，現在就開', nextPool: [
          { next: 'ch3_box_air', weight: 40 },
          { next: 'ch3_box_root_death', weight: 60 }
        ], risk: '高' }
      ]
    }),

    ch3_box_air: S('秘境開口', '只是廢丹', [
      '那聲只是密封氣體跑掉。',
      '匣裡兩枚丹早已失效，藥具也爛了。',
      '你花了半炷香，最後只得到廢物。',
      '不是每個古匣後面都有寶。調查也有可能只幫你排除垃圾。'
    ], {
      choices: [{ text: '把房間資訊帶出去', next: 'ch3_intel_market', intelDelta: 6, appraisalDelta: 4 }]
    }),

    ch3_box_root: S('秘境開口', '匣裡的根醒了', [
      '匣內乾枯根鬚接觸空氣後慢慢舒展。',
      '你們站得遠，繩和盾讓所有人都能退。',
      '根鬚沒有追太遠。',
      '藥師聽完描述後，第一次把古洞府和外面的藍苔污染連起來。'
    ], {
      choices: [{ text: '公開這條情報，讓後隊避開', next: 'ch3_intel_market', intelDelta: 12, meritDelta: 3, trustDelta: 5 }]
    }),

    ch3_box_root_death: S('秘境開口', '你先替後面的人知道了', [
      '匣蓋掀開時，根鬚不是向外長。',
      '它先纏住最近的手腕，再沿著靈氣最濃的地方往上。',
      '後面的人退得很快。你替他們確認了：這只匣不能近開。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '第一批碰到古洞府石匣',
      death: { cause: '近距離開啟寄生根封匣，被古代靈植沿經脈寄生。', epitaph: '此地長眠著王狗蛋。\n他第一個打開箱子。\n後面的人都知道要用繩了。' },
      intel: '別人的死會變成後隊的路線與操作規則。第三章的殘酷不只是死人，而是你會真的從前人的死裡獲益。'
    }),

    ch3_intel_market: S('秘境開口', '情報開始有價', [
      '每支探查隊回來，石門外都有人問：哪邊有陣、哪邊有匣、誰拿到什麼。',
      '半天內，手繪圖已賣到兩塊靈石。',
      '一張圖上卻標著「右廊安全」，第一隊的人說自己根本沒走過右廊。',
      '有人想讓別人先踩。'
    ], {
      choices: [
        { text: '只買有來源、能交叉驗證的情報', next: 'ch3_inner_gate', coinDelta: -1, intelDelta: 10, appraisalDelta: 3 },
        { text: '自己手上有石匣情報，拿去交換右廊資料', next: 'ch3_inner_gate', intelDelta: 8, trustDelta: 2 },
        { text: '完整地圖最快，直接買', nextPool: [
          { next: 'ch3_inner_gate', weight: 55 },
          { next: 'ch3_false_map_death', weight: 45 }
        ], coinDelta: -2, risk: '中' }
      ]
    }),

    ch3_false_map_death: S('秘境開口', '右廊安全', [
      '地圖上寫右廊安全。',
      '你是第一個照著走的人。',
      '腳下陣紋亮起時，第二個人立刻停住。',
      '情報市場又完成了一次更新。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '買到一張最完整的秘境地圖',
      death: { cause: '相信混有假標記的秘境情報，踩入未驗證右廊禁制。', epitaph: '此地長眠著王狗蛋。\n他花兩塊靈石買了安全路線。\n後來大家免費知道那裡不安全。' },
      intel: '假情報最有效的方式，是混在一張大部分都真的圖裡。先問來源、觀察、驗證層級。'
    }),

    ch3_inner_gate: S('真正機緣', '第三層門', [
      '陣師找到開門順序。第三層門沉下去。',
      '正式進去前，每個人先交一張遺書。',
      '宗門第一次給你的不是功法，是方便出事後處理遺物的紙。',
      '門後第一個大室，滿地都是不同年代的屍骨。'
    ], {
      choices: [
        { text: '先看屍體怎麼死、什麼東西反而被留下', next: 'ch3_corpse_field', appraisalDelta: 8, intelDelta: 7 },
        { text: '死人的東西無主，先找儲物袋', next: 'ch3_corpse_greed', betrayalDelta: 8, risk: '高' }
      ]
    }),

    ch3_corpse_field: S('真正機緣', '散修屍地', [
      '一具骨架胸口有刀痕，一具頭骨裂，第三具沒有外傷。',
      '地上有鏽劍、破袋、骨珠與乾藥囊。',
      '你先問的不是「哪件最值錢」，而是「為什麼它們還留在死人身上」。',
      '留下來本身就是情報。'
    ], {
      choices: [
        { text: '先檢查鏽劍，從最不像寶的開始', next: 'ch3_corpse_rust', appraisalDelta: 6 },
        { text: '骨珠有靈性，遠距試它', next: 'ch3_bead_test', appraisalDelta: 8, intelDelta: 4 },
        { text: '不碰遺物，只記屍體姿勢', next: 'ch3_pill_room', intelDelta: 7 }
      ]
    }),

    ch3_corpse_greed: S('真正機緣', '先摸袋子', [
      '破儲物袋第一只真的只是空。',
      '第二只裡還有兩塊靈石。',
      '杜衡看你把靈石收起來，沒有說話。',
      '你拿到第一筆私人收益，也讓隊伍重新開始算你。'
    ], {
      choices: [
        { text: '拿出來按原約定分', next: 'ch3_pill_room', coinDelta: 1, trustDelta: 8, betrayalDelta: -4 },
        { text: '誰摸到算誰的，收自己袋裡', next: 'ch3_pill_room', coinDelta: 2, trustDelta: -8, betrayalDelta: 15 }
      ]
    }),

    ch3_corpse_rust: S('真正機緣', '真的只是垃圾', [
      '鏽劍是凡鐵。沒有劍靈，沒有暗格，沒有第二層封印。',
      '你花時間確認一件垃圾。',
      '這不是白做。至少你沒有因為「古」字就把每一件東西都當寶。'
    ], {
      choices: [{ text: '再去看骨珠', next: 'ch3_bead_test', appraisalDelta: 4 }]
    }),

    ch3_bead_test: S('真正機緣', '骨珠需要血', [
      '杜衡輸入靈力，骨珠沒有反應。',
      '邵平只滴了一滴血，珠面立刻亮紅。',
      '你看見他指尖的傷口比剛才更白。',
      '它有功能。代價還不清楚。'
    ], {
      choices: [
        { text: '停止測試，記錄「以血啟動，疑似吸取」', next: 'ch3_pill_room', intelDelta: 8, appraisalDelta: 7 },
        { text: '再滴一點，看能不能完整啟動', next: 'ch3_bead_blood', pollutionDelta: 5, qiDelta: -8, risk: '中' }
      ]
    }),

    ch3_bead_blood: S('真正機緣', '真的法器，真的吸血', [
      '骨珠亮得更紅。',
      '你也更快看清：它不是認主，是在吸血。',
      '東西是真的法器。功能也是真的。',
      '只是你直到支付代價後，才知道它從哪裡收錢。'
    ], {
      choices: [{ text: '封起來，交宗門鑑定', next: 'ch3_pill_room', appraisalDelta: 8, meritDelta: 2 }]
    }),

    ch3_pill_room: S('真正機緣', '古丹室', [
      '石室中央有一座封著的小丹爐。',
      '幾百年過去，室內卻還有藥香。',
      '蘇禾站在門外不進。杜衡覺得密封好才留得住。',
      '你把空白試紙放門口，半炷香後邊緣微黃。'
    ], {
      choices: [
        { text: '上報，等丹師與陣師來開', next: 'ch3_pill_report', appraisalDelta: 8, intelDelta: 4, meritDelta: 2 },
        { text: '先自己開，後面的人來了就沒你份', nextPool: [
          { next: 'ch3_pill_good', weight: 42 },
          { next: 'ch3_pill_poison', weight: 58 }
        ], pollutionDelta: 10, betrayalDelta: 6, risk: '高' },
        { text: '只記位置，先去看別處', next: 'ch3_manual_wall', intelDelta: 4 }
      ]
    }),

    ch3_pill_report: S('真正機緣', '安全會稀釋收益', [
      '丹師換氣、封門、再開爐。',
      '六枚丹，四枚全廢，兩枚仍有藥性。',
      '宗門收一枚，另一枚折成你們隊的貢獻。',
      '你沒有獨吞真丹，卻少承擔了把未知氣體吸進肺裡的風險。'
    ], {
      choices: [{ text: '接受「安全與所有權一起交易」', next: 'ch3_manual_wall', meritDelta: 12, appraisalDelta: 5 }]
    }),

    ch3_pill_good: S('真正機緣', '古丹是真的', [
      '爐裡兩枚丹真的還能用。',
      '你們私下先藏一枚，準備出去再談。',
      '杜衡第一次笑。',
      '真正的機緣確實會存在，否則沒有人會一次次冒險。'
    ], {
      choices: [
        { text: '現在就吃，別等宗門收走', nextPool: [
          { next: 'ch3_pill_breakthrough', weight: 38 },
          { next: 'ch3_pill_overload_death', weight: 62 }
        ], pollutionDelta: 10, risk: '極高' },
        { text: '先不吃，把丹封好', next: 'ch3_manual_wall', appraisalDelta: 4, betrayalDelta: 4 }
      ]
    }),

    ch3_pill_poison: S('真正機緣', '丹是真的，氣也是真的', [
      '爐蓋一掀，灰白氣體先湧出。',
      '丹藥是真的，丹毒也是真的。',
      '你們都吸到一點。',
      '杜衡算完仍說值得。蘇禾說不值得。兩邊都能算出自己的理由。'
    ], {
      choices: [
        { text: '立刻退、解毒，放棄現在吃', next: 'ch3_manual_wall', pollutionDelta: 10, qiDelta: -8, appraisalDelta: 6 },
        { text: '都中毒了，不拿丹才虧', next: 'ch3_manual_wall', pollutionDelta: 16, meritDelta: 6, betrayalDelta: 5 }
      ]
    }),

    ch3_pill_breakthrough: S('真正機緣', '它真的讓你更強', [
      '丹力進體後，你的氣息第一次明顯上了一截。',
      '沒有爆體，沒有吐血。',
      '你真的用一件秘境資源換到了修為。',
      '這次成功會成為下一次最危險的證據。'
    ], {
      choices: [{ text: '到此為止，不再試第二顆', next: 'ch3_manual_wall', qiDelta: 18, meritDelta: 8, pollutionDelta: 4 }]
    }),

    ch3_pill_overload_death: S('真正機緣', '開得太多', [
      '丹藥確實在拓寬經脈。',
      '第一晚你甚至覺得自己要突破。',
      '第二天開始經脈滲血。第四天，你連呼吸都像在漏。',
      '丹沒有騙人。只是古修承受得住的尺寸，你承受不住。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '服下一枚真正的古制開脈丹',
      death: { cause: '服用與自身體質不匹配的古制開脈丹，經脈強行拓張後崩裂。', epitaph: '此地長眠著王狗蛋。\n丹是真的。\n開脈也是真的。\n只是他沒有那麼大的命。' },
      intel: '效果強不等於適合你。鑑別不只要問「這是什麼」，還要問「現在還是不是原物」與「你承不承受得住」。'
    }),

    ch3_manual_wall: S('真正機緣', '牆上的功法', [
      '深廊石牆刻著一套陌生吐納法。',
      '第五段被人硬刮掉，下面卻還有第六、第七段。',
      '杜衡已經在抄。蘇禾只抄，不練。',
      '真正重要的不是「殘不殘」，而是缺的那一段在什麼位置。'
    ], {
      choices: [
        { text: '和青雲宗功法比對穴位，只做結構判斷', next: 'ch3_manual_compare', appraisalDelta: 10, intelDelta: 6 },
        { text: '第一段看起來完整，先走一小周天', nextPool: [
          { next: 'ch3_manual_gain', weight: 38 },
          { next: 'ch3_manual_death', weight: 62 }
        ], pollutionDelta: 5, qiDelta: -8, risk: '極高' },
        { text: '只拓印，帶回去再說', next: 'ch3_soul_door', intelDelta: 8, meritDelta: 4 }
      ]
    }),

    ch3_manual_compare: S('真正機緣', '缺的是哪一段', [
      '你發現第五段正好位在兩套運氣路徑交接處。',
      '可能只是養氣註解，也可能是轉脈關鍵。',
      '你現在能做的是提高懷疑，不是憑空補完。'
    ], {
      choices: [
        { text: '不試，完整拓印', next: 'ch3_soul_door', intelDelta: 8, appraisalDelta: 5, meritDelta: 4 },
        { text: '鑑別已做夠，試第一段但立刻停', next: 'ch3_manual_gain', requires: { appraisal: 38 }, requireText: '需要鑑別 38', qiDelta: -4, risk: '中' }
      ]
    }),

    ch3_manual_gain: S('真正機緣', '這次真的能修', [
      '第一段運氣比你的外門功法更順。',
      '你沒有繼續往缺段後面走。',
      '只這一小段，就可能是能改你修行效率的真資源。',
      '你第一次摸到不是「活命」，而是真正「變得不一樣」的東西。'
    ], {
      choices: [{ text: '停在已驗證的地方，帶拓本出去', next: 'ch3_soul_door', qiDelta: 8, meritDelta: 5, appraisalDelta: 3 }]
    }),

    ch3_manual_death: S('真正機緣', '缺的就是命', [
      '第一段沒事，第二段也沒事。',
      '氣走到胸口後突然逆衝。',
      '你終於知道被刮掉的第五段為什麼重要。',
      '可知道的時候，經脈已經替你把答案寫在血裡。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '摸到一部真正可修的古功法',
      death: { cause: '修煉缺失關鍵轉脈段的古功法，氣機逆衝。', epitaph: '此地長眠著王狗蛋。\n功法是真的。\n缺的也真的只有一段。\n剛好是命。' },
      intel: '殘缺不是統一風險。要看缺在哪裡、依賴什麼、能不能只驗證可逆的前段。'
    }),

    ch3_soul_door: S('真正機緣', '有人叫你的名字', [
      '最深處一扇封死石門後，有聲音直接叫你的名字。',
      '其他人都沒聽見。',
      '它說自己是洞府主人留下的殘魂，時日無多，可以傳你完整養脈法。',
      '它甚至指出你吐納的一處小缺陷。你照著微調，胸口真的舒服一點。'
    ], {
      choices: [
        { text: '只做可逆交換：先問它不知道也不該知道的事', next: 'ch3_soul_test', intelDelta: 8, appraisalDelta: 6 },
        { text: '它先給了真好處，開門', nextPool: [
          { next: 'ch3_soul_kind', weight: 35 },
          { next: 'ch3_soul_possess_death', weight: 65 }
        ], pollutionDelta: 20, risk: '極高' },
        { text: '不理，任何會叫名字的東西都當邪物', next: 'ch3_vault', intelDelta: 2 }
      ]
    }),

    ch3_soul_test: S('真正機緣', '先別把識海交出去', [
      '你問它為什麼知道你的名字。',
      '它說石門能讀腰牌。你把腰牌拿遠，聲音果然不再叫名，只叫「小輩」。',
      '至少這一件事驗到了。',
      '你再要求它先用不進識海的方式證明養脈法。'
    ], {
      choices: [
        { text: '保持門關著，讓它隔門說前三句', nextPool: [
          { next: 'ch3_soul_kind', weight: 58 },
          { next: 'ch3_soul_lure', weight: 42 }
        ], intelDelta: 10, appraisalDelta: 8 },
        { text: '驗到這裡已經夠，離開', next: 'ch3_vault', intelDelta: 5 }
      ]
    }),

    ch3_soul_kind: S('真正機緣', '這次它真的只想交換', [
      '殘魂沒有要求你打開識海。',
      '它隔門提供一段可由宗門功法驗證的養脈法，只求日後替它送一枚玉簡。',
      '不是每個秘境老者都要奪舍你。',
      '真正能帶走的是方法：先問、先驗、先做可逆交換。'
    ], {
      choices: [{ text: '記錄條件，不現在承諾遺願', next: 'ch3_vault', intelDelta: 10, appraisalDelta: 6, meritDelta: 3 }]
    }),

    ch3_soul_lure: S('真正機緣', '前三句都對', [
      '它說的前三句都能和你現有功法互相驗證。',
      '第四句也沒有問題。',
      '第五句卻要求把氣引到眉心，說這樣才能「看見完整傳承」。',
      '你已經知道真正危險的門在哪裡。'
    ], {
      choices: [
        { text: '到此為止，拒絕打開識海', next: 'ch3_vault', intelDelta: 10, appraisalDelta: 4 },
        { text: '前四句都是真的，第五句也試', next: 'ch3_soul_possess_death', pollutionDelta: 30, risk: '極高' }
      ]
    }),

    ch3_soul_possess_death: S('真正機緣', '你還是你嗎', [
      '它沒有撞進來。',
      '是你照著功法，把氣走到眉心，自己把門開了一條縫。',
      '前幾天只是做夢。再過幾天，你開始忘記母親做飯的味道。',
      '你說自己沒事時，已經不確定那句話是誰說的。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '得到一段真的古修養脈法',
      death: { cause: '依殘魂指引主動開放識海，遭古修殘魂逐步奪舍。', epitaph: '此地長眠著王狗蛋。\n墓裡沒有他的魂。\n至少最後幾天，誰是誰已經不好說。' },
      intel: '最危險的奪舍不是撞門，是先給真好處，再教你自己把門打開。可逆交換比一次性交出識海安全得多。'
    }),

    ch3_vault: S('真正機緣', '最深處只剩四樣', [
      '古物庫沒有滿地寶光。',
      '只剩裂玉、黑竹簡、晶種、空丹瓶，旁邊三具屍體。',
      '第一具手伸向裂玉，第二具抓著竹簡，第三具正對晶種。',
      '靠得近不等於一定死於它。你只能排序風險，不能直接定罪。'
    ], {
      choices: [
        { text: '先取樣、拓印、遠距觀察，不拿原物', next: 'ch3_vault_inspect', appraisalDelta: 12, intelDelta: 8 },
        { text: '裂玉最適合逃命，先拿', nextByState: [{ stat: 'betrayal', gte: 45, next: 'ch3_betrayal' }], next: 'ch3_carry_jade', risk: '中' },
        { text: '晶種可能最值錢，封進靈匣', nextByState: [{ stat: 'betrayal', gte: 45, next: 'ch3_betrayal' }], next: 'ch3_carry_seed', pollutionDelta: 10, risk: '中' },
        { text: '空丹瓶最不起眼，帶它', next: 'ch3_carry_bottle', appraisalDelta: 3 }
      ]
    }),

    ch3_vault_inspect: S('真正機緣', '取樣後再選', [
      '晶種會讓附近靈藥失色。裂玉灌靈後能讓人身體變輕。',
      '黑竹簡是煉體法，藥浴配方缺一味。空丹瓶雖空，瓶壁藥霜卻有複雜殘留。',
      '沒有一件純粹安全，也沒有一件純粹沒用。',
      '你們真正擁有的是更好的選擇條件。'
    ], {
      choices: [
        { text: '共同封存空丹瓶，按隊伍規則處理', next: 'ch3_carry_bottle', requires: { trust: 58 }, requireText: '需要隊伍信任 58', trustDelta: 5, meritDelta: 3 },
        { text: '帶裂玉，保留逃生工具', nextByState: [{ stat: 'betrayal', gte: 50, next: 'ch3_betrayal' }], next: 'ch3_carry_jade', appraisalDelta: 3 },
        { text: '帶晶種，接受持續吸靈風險', nextByState: [{ stat: 'betrayal', gte: 50, next: 'ch3_betrayal' }], next: 'ch3_carry_seed', pollutionDelta: 8, risk: '中' },
        { text: '什麼都不拿，只帶完整情報', next: 'ch3_carry_info', intelDelta: 12, appraisalDelta: 8 }
      ]
    }),

    ch3_betrayal: S('真正機緣', '規矩碰到真機緣就碎', [
      '你手才伸出去，杜衡也動了。',
      '他不是突然變壞。他第一天就說過：「誰拿到算誰的。」',
      '只是以前大家談的都是幾塊靈石。現在桌上可能是一輩子。',
      '你們的舊規則承受不了這個量級。'
    ], {
      choices: [
        { text: '放手，避免在坍塌前先內鬥', next: 'ch3_carry_info', trustDelta: -5, intelDelta: 4 },
        { text: '要求按原約定公開分配', nextPool: [
          { next: 'ch3_carry_bottle', weight: 52 },
          { next: 'ch3_betrayal_fight_death', weight: 48 }
        ], trustDelta: -4, risk: '高' },
        { text: '你先拔刀', next: 'ch3_betrayal_fight_death', risk: '極高' }
      ]
    }),

    ch3_betrayal_fight_death: S('真正機緣', '你們先替秘境省事', [
      '真正的禁制還沒動。',
      '你和杜衡先在石室裡動了手。',
      '落石第一聲響起時，你們都已經沒有完整餘力。',
      '古物最後誰也沒帶走。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '站在真正古物庫前',
      death: { cause: '秘境古物分配失控，與臨時隊友內鬥後死於坍塌。', epitaph: '此地長眠著王狗蛋。\n寶物沒有殺他。\n想怎麼分寶物的人先動了手。' },
      intel: '背叛風險來自利益量級、退路與舊承諾承受力。越大的機緣，越需要重新談規則。'
    }),

    ch3_carry_jade: S('活著出谷', '裂玉', [
      '裂玉灌靈後能讓身體短時間變輕。',
      '第一次用完，只是腿麻。',
      '你知道這東西很適合逃命，也很容易因為太好用而被反覆使用。'
    ], {
      choices: [{ text: '只把它當最後退路，不現在試第二次', next: 'ch3_collapse', appraisalDelta: 5, intelDelta: 2 }]
    }),

    ch3_carry_seed: S('活著出谷', '晶種', [
      '封靈匣裡的晶種仍在吸靈。',
      '附近靈石慢慢暗下去，蘇禾臉色也開始白。',
      '它不是邪物。它只是在生長。',
      '你拿到的機緣，正在一路向你收運費。'
    ], {
      choices: [{ text: '集中靈石維持封匣，繼續帶', next: 'ch3_collapse', meritDelta: -3, pollutionDelta: 10, qiDelta: -8, risk: '高' }]
    }),

    ch3_carry_bottle: S('活著出谷', '空瓶', [
      '空丹瓶裡沒有丹。',
      '只有瓶壁一層薄薄藥霜。',
      '蘇禾說這可能才是最容易安全帶出去的東西。',
      '你不知道它能不能改命，只知道它暫時不會吸你的命。'
    ], {
      choices: [{ text: '把空瓶封好，撤', next: 'ch3_collapse', appraisalDelta: 3, meritDelta: 2 }]
    }),

    ch3_carry_info: S('活著出谷', '空手', [
      '你沒有拿四件古物中的任何一件。',
      '手裡只有拓印、位置、屍體姿勢、試驗結果和一堆還沒驗完的推測。',
      '別人看你像白來。',
      '你知道真正要證明它值不值錢，要等活著出去。'
    ], {
      choices: [{ text: '帶情報撤', next: 'ch3_collapse', intelDelta: 8, appraisalDelta: 4 }]
    }),

    ch3_collapse: S('活著出谷', '機緣不等你整理完', [
      '最深石室開始掉灰。第一塊石板砸下來時，所有分配問題都變簡單。',
      '原路一段廊道沉下去。',
      '對面就是出口方向，中間差三丈；另一邊有一條從沒走過的窄道。',
      '已知高成本方案，和未知方案。你又得選。'
    ], {
      choices: [
        { text: '用已知路線找繩點，先送一人過去架繩', next: 'ch3_gap_plan', requires: { intel: 28 }, requireText: '需要情報 28', intelDelta: 3 },
        { text: '走未知窄道，至少全隊能一起動', next: 'ch3_narrow', risk: '高' },
        { text: '回頭找散修屍地的舊箭頭', next: 'ch3_hidden_route', requires: { appraisal: 28 }, requireText: '需要鑑別 28', intelDelta: 4 }
      ]
    }),

    ch3_gap_plan: S('活著出谷', '誰先過去', [
      '裂縫三丈。只要有人先過去，就能在對面固定繩。',
      '邵平說自己盾重。蘇禾會打結。杜衡若還在，修為最高。',
      '「誰最適合」很快又會變成「誰最該先承擔」。'
    ], {
      choices: [
        { text: '先用繩綁腰，讓會打結的蘇禾過', nextPool: [
          { next: 'ch3_exit_run', weight: 72 },
          { next: 'ch3_gap_death', weight: 28 }
        ], trustDelta: 4, qiDelta: -5, risk: '中' },
        { text: '你自己先過', nextPool: [
          { next: 'ch3_exit_run', weight: 60 },
          { next: 'ch3_gap_death', weight: 40 }
        ], qiDelta: -8, risk: '高' }
      ]
    }),

    ch3_gap_death: S('活著出谷', '只差三丈', [
      '你跳過去時，對面石沿又塌了一寸。',
      '手碰到繩，沒有抓穩。',
      '三丈看起來不遠。從下面往上看，也不遠。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '已經拿到秘境機緣，正準備離開',
      death: { cause: '秘境坍塌時試圖跨越斷廊，固定點二次崩落。', epitaph: '此地長眠著王狗蛋。\n他已經拿到東西。\n只是出口還沒有。' },
      intel: '拿到機緣不是結束。撤離本身也是一段風險鏈；工具和固定點都可能因環境改變而失效。'
    }),

    ch3_narrow: S('活著出谷', '總得有人先去', [
      '窄道只能一人爬。',
      '火把沒熄，紙蟲爬十丈後失去回應。',
      '杜衡看你：「你最輕。」',
      '這句話是真的。也正因為真，它聽起來特別像理由。'
    ], {
      choices: [
        { text: '拒絕指定，四人抽籤', nextPool: [
          { next: 'ch3_lottery_safe', weight: 58 },
          { next: 'ch3_lottery_death', weight: 42 }
        ], trustDelta: 3, intelDelta: 2 },
        { text: '你最輕，你先去', nextPool: [
          { next: 'ch3_exit_run', weight: 48 },
          { next: 'ch3_narrow_death', weight: 52 }
        ], risk: '極高' },
        { text: '情報夠了，回去找另一條舊路', next: 'ch3_hidden_route', requires: { intel: 35 }, requireText: '需要情報 35' }
      ]
    }),

    ch3_lottery_safe: S('活著出谷', '這次第一個人沒死', [
      '抽中邵平。',
      '他鑽進去一刻鐘後拉繩兩下：安全。',
      '窄道只是舊施工側路。',
      '公平程序沒有犧牲誰。至少這一次。'
    ], {
      choices: [{ text: '全隊通過', next: 'ch3_exit_run', trustDelta: 5 }]
    }),

    ch3_lottery_death: S('活著出谷', '公平也不保證好結果', [
      '抽中邵平。',
      '他爬進去後，繩突然鬆了。',
      '你們拉回來，只剩半截。',
      '杜衡第一句是：「至少知道不能走。」蘇禾一拳打在他臉上。',
      '那句話很難聽，偏偏是真的。'
    ], {
      choices: [{ text: '把邵平的死記成「靈絲」，不是「窄道必死」', next: 'ch3_hidden_route', intelDelta: 12, trustDelta: -5, moment: '又一次站在別人的死後面得到退路情報' }]
    }),

    ch3_narrow_death: S('活著出谷', '你最輕', [
      '你鑽進窄道。',
      '第二個轉角有一層幾乎看不見的靈絲。',
      '你確實是最輕、最適合探路的人。',
      '靈絲沒有反駁。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '替全隊先探秘境逃生窄道',
      death: { cause: '被隊友以體型與裝備理由推為先行探路者，觸發隱形靈絲。', epitaph: '此地長眠著王狗蛋。\n大家都同意他最適合先去。\n包括他自己。' },
      intel: '「最適合承擔」和「最應該承擔」不是同一件事。第三章看別人死，第五章才會問：既然總要有人先去，為什麼不能是別人？'
    }),

    ch3_hidden_route: S('活著出谷', '散修留下的箭頭', [
      '散修屍地牆角有一道以前沒注意的刀刻箭頭。',
      '箭頭指向一塊有磨痕的牆。',
      '暗門後是向上的石階，牆上滿是抓痕。',
      '有人從這裡出去過，或有人很想從這裡出去。兩種意思差很多。'
    ], {
      choices: [
        { text: '看灰、腳印方向與回程痕跡再走', nextPool: [
          { next: 'ch3_exit_run', weight: 70 },
          { next: 'ch3_beast_detour', weight: 30 }
        ], appraisalDelta: 6, intelDelta: 5 },
        { text: '有風就是出口，直接走', nextPool: [
          { next: 'ch3_exit_run', weight: 48 },
          { next: 'ch3_beast_detour', weight: 52 }
        ], risk: '高' }
      ]
    }),

    ch3_beast_detour: S('活著出谷', '抓痕是往裡的', [
      '走到一半，你聞到腥味。',
      '牆上抓痕不是往外逃，是被拖進去的人留下。',
      '你們及時退回，卻又浪費半個時辰。',
      '調查不是免費的。錯路也會吃掉逃命時間。'
    ], {
      choices: [{ text: '回斷廊，接受更高撤離風險', next: 'ch3_gap_plan', qiDelta: -8, risk: '高' }]
    }),

    ch3_exit_run: S('活著出谷', '把什麼丟掉', [
      '出口已經能看見。',
      '可你們身上的靈石、藥匣、古物和傷都在拖速度。',
      '如果帶著晶種，封靈匣此刻尤其燙。',
      '真正好的機緣，往往要到最後一段路才逼你回答：你到底捨不捨得丟。'
    ], {
      choices: [
        { text: '先丟普通靈藥與可替代物，只保命和情報', next: 'ch3_checkout', meritDelta: -6, qiDelta: 4, appraisalDelta: 2 },
        { text: '已經走到這了，全部帶出去', nextByState: [{ stat: 'pollution', gte: 48, next: 'ch3_pollution_flare_death' }], next: 'ch3_checkout', qiDelta: -10, pollutionDelta: 8, risk: '高' }
      ]
    }),

    ch3_pollution_flare_death: S('活著出谷', '它只是在等', [
      '你撐到出口前才第一次覺得胸口發甜。',
      '下一息，皮下藍線一起亮起。',
      '前面那些「低度污染」不是沒事，只是一直沒吃到足夠多的靈氣。',
      '你把機緣帶到了門口。它也把你帶到了自己的成熟期。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '距離藥谷出口只剩最後一段',
      death: { cause: '累積靈性污染在撤離高負荷狀態下爆發，寄生根失控。', epitaph: '此地長眠著王狗蛋。\n他活著走出最深處。\n沒活著走出自己身體。' },
      intel: '污染可能延遲收費。短期「沒事」不等於代價不存在；高負荷、衝境、再接觸都可能成為爆發條件。'
    }),

    ch3_checkout: S('活著出谷', '不是出門就算活', [
      '你們離開秘境後沒有直接回宗。',
      '所有人先查寄生、查神識、查私藏古物、查污染。',
      '有人抱怨拼命帶東西出來還被當賊。執法弟子只問：「你若帶一個會吃人的東西回宗，誰負責？」',
      '活著出谷的完整定義，是你帶出的東西沒有立刻把下一批人一起害死。'
    ], {
      choices: [
        { text: '完整申報接觸史與污染，接受暫時限制', next: 'ch3_reward_info', intelDelta: 8, trustDelta: 6, meritDelta: 5 },
        { text: '只報明顯傷口，私藏小東西', nextPool: [
          { next: 'ch3_reward_relic', weight: 55 },
          { next: 'ch3_contraband_death', weight: 45 }
        ], betrayalDelta: 8, risk: '高' },
        { text: '主動交完整拓印與路線，不要求獨占', next: 'ch3_reward_info', requires: { intel: 35 }, requireText: '需要情報 35', meritDelta: 10, trustDelta: 5 }
      ]
    }),

    ch3_contraband_death: S('活著出谷', '骨戒裂了', [
      '你私藏的東西在檢查時被搜出。',
      '爭執中骨戒裂開，一團黑霧先放倒最近兩個人。',
      '你不是因為違規才死。',
      '你是因為把一件沒鑑定的私人收益，連同公共風險一起帶了出來。'
    ], {
      type: 'death', ageAtDeath: 20,
      closestMoment: '已經離開秘境，只差回宗',
      death: { cause: '私藏未鑑定古物，在出谷檢查時觸發封存異物。', epitaph: '此地長眠著王狗蛋。\n秘境沒有把他留下。\n他把秘境帶了出來。' },
      intel: '上交鑑定會稀釋所有權，但也提供公共安全。是否私藏不是道德按鈕，而是你能不能承擔最壞後果。'
    }),

    ch3_reward_info: S('活著出谷', '你帶回的不是寶', [
      '丹師要你的污染樣本，陣師要你的路線，外門堂要死亡與退路記錄。',
      '你沒有拿到最閃亮的東西。',
      '幾個月後，宗門靠你留下的記錄避掉一次寄生擴散。',
      '第一次有人因為你「會處理未知」而記住你的名字。'
    ], {
      choices: [
        { text: '接受藥堂與檔房的記錄差事', next: 'ch3_end_info', meritDelta: 15, intelDelta: 5 },
        { text: '把貢獻換成修行資源，繼續走外門路', next: 'ch3_end_growth', meritDelta: 8, qiDelta: 12 }
      ]
    }),

    ch3_reward_relic: S('活著出谷', '你真的保住了一件東西', [
      '你私藏的小古物沒有污染，也沒有後續追查。',
      '這次你真的完整保住收益。',
      '不是每次上交才對，也不是每次私藏都錯。',
      '問題只在你能不能承擔判斷錯時的代價。'
    ], {
      choices: [
        { text: '賣掉，換一筆確定資源', next: 'ch3_end_relic', coinDelta: 8, meritDelta: 4 },
        { text: '自己留下研究', next: 'ch3_end_polluted', pollutionDelta: 10, appraisalDelta: 5 }
      ]
    }),

    ch3_end_decline: S('藥谷徵召', '你沒去', [
      '你沒有報名藥谷。',
      '七天後，有人死，有人重傷，也有人拿著你三年都攢不到的貢獻回來。',
      '你沒有選錯。你只是把「夠」定在這裡。',
      '多年後你仍可能慶幸，也仍可能在喝醉時問：那次秘境到底有沒有真東西？'
    ], { type: 'survival', ageAtEnd: 44, closestMoment: '有資格報名藥谷，最後選擇不進', intel: '保守能避開大量死法，也會真實失去翻身機會。第三章不能把「不貪」做成固定正解。' }),

    ch3_end_sell_slot: S('藥谷徵召', '把機緣賣掉', [
      '你用名額換到確定收益。',
      '後來有人靠那個位置死在秘境，也有人靠類似位置拿到真丹。',
      '你不知道自己賣掉的是哪一種。',
      '你只知道這一世，未知沒有直接從你身上收錢。'
    ], { type: 'survival', ageAtEnd: 39, closestMoment: '把藥谷名額變成確定資產', intel: '冒險權本身可以交易。賣掉風險，也是在賣掉上升空間。' }),

    ch3_end_retreat_safe: S('活著出谷', '你真的活著撤了', [
      '你在秘境升格前退出。',
      '當晚內廊坍塌，留下的人有人失蹤。',
      '你保住藥谷貢獻和完整身體。',
      '這一世很容易讓人相信「撤退就是答案」。下一世不一定。'
    ], { type: 'survival', ageAtEnd: 51, closestMoment: '在秘境門口選擇撤退', intel: '正確判斷不是由結果倒推。撤退這次救你，下一次也可能只讓你錯過真機緣。', continueTo: 'ch4_descent_entry', continueLabel: '第四章：下山去白石仙城' }),

    ch3_end_retreat_cost: S('活著出谷', '秋後清算', [
      '秘境最後沒有大規模坍塌。',
      '宗門把留隊探查者記功，提前退出者沒有被罰。',
      '只是下一輪高收益差事名單裡，你排到後面。',
      '理由很合理：風險承受能力較低。'
    ], { type: 'survival', ageAtEnd: 46, closestMoment: '活著退出藥谷秘境', intel: '逃避高風險任務也可能有制度成本。不貪不是免費安全鍵。', continueTo: 'ch4_descent_entry', continueLabel: '第四章：下山去白石仙城' }),

    ch3_end_info: S('活著出谷', '把正確情報帶出來', [
      '你一件最強古物都沒帶。',
      '卻帶回路線、污染樣本、功法拓印、殘魂對話與隊伍行為記錄。',
      '幾個月後，你被調去藥堂與檔房之間做專門記錄。',
      '你沒有靠一顆丹翻十倍。你只是終於不用站在最前面替別人踩未知。'
    ], { type: 'survival', ageAtEnd: 63, closestMoment: '活著帶出一套能被驗證的秘境情報', intel: '第三章的高價值勝利之一：別人的死提供情報，但你帶出去的是判斷方法，不是固定攻略。', continueTo: 'ch4_descent_entry', continueLabel: '第四章：下山去白石仙城' }),

    ch3_end_growth: S('活著出谷', '真改命', [
      '你把貢獻換成完整養脈法與穩定修行資源。',
      '一年後進一層，三年後再進一層。',
      '不是天才速度。對你來說卻第一次是一條能走的路。',
      '機緣真的會給你東西。所以你以後才還會伸手。'
    ], { type: 'survival', ageAtEnd: 58, closestMoment: '把秘境收益換成真正能走的修行路', intel: '「機緣皆是殺局」不等於機緣全是假的。真機緣必須存在，誘惑才成立。', continueTo: 'ch4_descent_entry', continueLabel: '第四章：下山去白石仙城' }),

    ch3_end_relic: S('活著出谷', '真的保住收益', [
      '你把古物賣掉，還清欠帳，換到幾年都攢不到的資源。',
      '沒有詛咒追來，也沒有失主找門。',
      '這次冒險真的值得。',
      '正因如此，你知道自己以後還會再冒一次。'
    ], { type: 'survival', ageAtEnd: 55, closestMoment: '從秘境帶出一件真正值錢的古物', intel: '冒險有時真的會成功。不要把成功背成保證，也不要把危險背成拒絕所有機緣。', continueTo: 'ch4_descent_entry', continueLabel: '第四章：下山去白石仙城' }),

    ch3_end_polluted: S('活著出谷', '你帶出來的東西也帶著你', [
      '你沒有立刻惡化。',
      '只是偶爾能比別人更早聞到靈藥異常，代價是每三月要去醫堂檢查。',
      '你得到一種以前沒有的能力，也失去部分核心區通行資格。',
      '機緣沒有單純加在你身上。它把你改成另一種人。'
    ], { type: 'survival', ageAtEnd: 37, closestMoment: '帶著低度機緣污染活著離開', intel: '污染不必只是負面狀態。真正有意思的是它同時給能力與長期條件，而且代價可能延後結算。', continueTo: 'ch4_descent_entry', continueLabel: '第四章：下山去白石仙城' })
  };
})();
