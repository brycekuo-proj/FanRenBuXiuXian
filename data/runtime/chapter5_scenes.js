(() => {
  const S = (section, title, paragraphs, extra = {}) => ({
    bookChapter: 5,
    chapter: `第五章・${section}`,
    title,
    paragraphs,
    ...extra
  });

  const death = (section, title, paragraphs, cause, epitaph, intel, extra = {}) =>
    S(section, title, paragraphs, {
      type: 'death',
      ageAtDeath: extra.ageAtDeath || 23,
      closestMoment: extra.closestMoment || title,
      death: { cause, epitaph },
      intel,
      ...extra
    });

  const survive = (section, title, paragraphs, intel, extra = {}) =>
    S(section, title, paragraphs, { type: 'survival', ageAtEnd: extra.ageAtEnd || 48, intel, ...extra });

  window.CHAPTER5_SCENES = {
    ch5_entry_deputy: S('代價停在你手裡', '木牌已經掛在腰上', [
      '第四章結束後，你正式成了白石藥路副領。這一次不是臨時幫忙，名冊、路引和下面三個人的評語都真的歸你寫。',
      '你曾經最怕別人決定你的風險。現在外務堂把同一支筆交到你手裡。'
    ], { choices: [{ text: '去見三個新人', next: 'ch5_lead_entry', factionSectDelta: 2 }] }),

    ch5_entry_clean: S('代價停在你手裡', '無失的人最適合暫代', [
      '你第四章沒有惹大事，也沒有深靠山。外務堂評語只有「無失」。',
      '正因如此，一名副領受傷時，執事第一個想到你暫代一趟白石藥路：「不用你升職，只帶三個新人走完。」',
      '你沒有追求權力，權力仍可能以「幫忙一下」的方式落到手裡。'
    ], { choices: [{ text: '只帶這一趟，先把風險說清楚', next: 'ch5_lead_entry', responsibilityDelta: 3, exitWillDelta: 2 }] }),

    ch5_entry_fugitive: S('代價停在你手裡', '復籍不是洗白', [
      '你第四章後有名字不能用，青雲宗也暫時不承認你的公差身份。可白石藥路重新缺人時，外務堂提出一筆很宗門的交易：完成一趟高風險帶隊，暫撤公差凍結。',
      '這不是赦免。你的通緝與黑市關係仍在，只是宗門忽然又覺得你「可用」。',
      '於是你重新拿到一面臨時副領牌，門外仍是三個新人。合法選項變貴以後，連回到制度裡都要先替制度做一件事。'
    ], { choices: [{ text: '先把復籍條件放一邊，去見三個新人', next: 'ch5_lead_entry', blackCreditDelta: 2, factionSectDelta: 2, exitWillDelta: 3 }] }),

    ch5_entry_gu: S('代價停在你手裡', '兩棵樹都在看你怎麼帶人', [
      '顧家把你當掛名行走，青雲宗仍把你算外門。兩邊都覺得你能辦事。',
      '白石藥路缺人時，外務堂仍把同樣三個新人交給你；顧十三只多說一句：「路上若有顧家的事，記得替我看一眼。」',
      '多一個靠山沒有讓你少做決定，只讓同一趟帶隊多了一層別人的期待。'
    ], { choices: [{ text: '先按青雲正式帶隊規則處理三個新人', next: 'ch5_lead_entry', responsibilityDelta: 4, factionGuDelta: 2 }] }),

    ch5_lead_entry: S('代價停在你手裡', '這趟危險嗎？', [
      '外務堂門外站著三個新人。周小滿十六歲，何春禾欠著藥債，裴舟以前在凡人鏢局趕車。',
      '你腰上多了一面「白石藥路，副領」木牌。它很輕，真正的重量在三個人身上。',
      '最年輕的周小滿問：「師兄，這趟危險嗎？」你以前最恨別人用一句「照規矩就行」把所有風險帶過。',
      '現在你第一次知道，那句話為什麼這麼方便。'
    ], {
      choices: [
        { text: '把已知風險、退出代價與未知都講清楚', next: 'ch5_lead_truth', responsibilityDelta: 8, exitWillDelta: 2, trustDelta: 6, moment: '第一次有權分配別人的風險' },
        { text: '只說「照規矩走，不會有大事」', next: 'ch5_lead_easy', riskShiftDelta: 7, factionSectDelta: 3, trustDelta: -4, moment: '第一次發現隱瞞風險能讓隊伍更好帶' },
        { text: '說有危險，但把退出評等的後果留到他們自己問', next: 'ch5_lead_partial', riskShiftDelta: 3, responsibilityDelta: 2, trustDelta: -1 }
      ]
    }),

    ch5_lead_truth: S('代價停在你手裡', '可以退出，但不是免費', [
      '你把北段妖獸、舊驛站、黑市線與藥路風險一條條說。',
      '何春禾第一個問：「自願退出會扣試役評等嗎？」答案是會。',
      '你突然覺得「可以退出」四個字很噁心。一個人退出就可能失去飯碗，還算不算自由？',
      '三個人最後都留下。至少這一次，他們不是在不知道價格的情況下點頭。'
    ], { choices: [{ text: '出發，第一段路重新分工', next: 'ch5_lead_front', intelDelta: 3, responsibilityDelta: 4 }] }),

    ch5_lead_easy: S('代價停在你手裡', '這句話真的很好用', [
      '三個新人明顯鬆了一口氣。沒有人要求加符，也沒有人問能不能換差事。',
      '隊伍準時出發，外務堂的表格很乾淨。',
      '你沒有撒一個完整的謊。你只是把自己知道、他們不知道的那部分留在嘴裡。',
      '效率立刻提高。這就是第五章最危險的獎勵。'
    ], { choices: [{ text: '出發', next: 'ch5_lead_front', factionSectDelta: 2, riskShiftDelta: 2 }] }),

    ch5_lead_partial: S('代價停在你手裡', '半句實話', [
      '你說「有風險」，卻沒有主動講退出會扣評等。',
      '裴舟多看了你一眼。他以前替鏢局跑過路，知道一句話裡最貴的常常是沒說的部分。',
      '何春禾沒有問。她只問這趟能拿幾點功。你知道她為什麼問，也知道自己可以利用這件事。'
    ], { choices: [{ text: '不要先替她做決定，照正常分工出發', next: 'ch5_lead_front', responsibilityDelta: 3 }, { text: '既然她最需要功，之後高風險工作優先給她', next: 'ch5_lead_front', riskShiftDelta: 6, meritDelta: 1 }] }),

    ch5_lead_front: S('代價停在你手裡', '誰走前面？', [
      '三岔路前，你第一次不是問「哪條最安全」，而是問「誰先走」。',
      '周小滿主動舉手。裴舟有鏢局經驗。何春禾需要額外功。你自己則帶著路引、藥單與宗門印。',
      '所有人都有一個看起來合理的理由走前面。理由多到最後，「我不想走第一個」可以藏得很好。'
    ], {
      choices: [
        { text: '四人輪換，每半個時辰換一次', next: 'ch5_lead_pool', responsibilityDelta: 5, qiDelta: -3, trustDelta: 3 },
        { text: '讓最有經驗的裴舟固定探路', next: 'ch5_lead_pei', riskShiftDelta: 3, responsibilityDelta: 2, trustDelta: -1 },
        { text: '讓何春禾探路，額外記功', next: 'ch5_lead_he', riskShiftDelta: 7, meritDelta: 1, trustDelta: -2 },
        { text: '你自己走前面', next: 'ch5_lead_self', responsibilityDelta: 8, qiDelta: -8, exitWillDelta: 1 }
      ]
    }),

    ch5_lead_pool: S('代價停在你手裡', '公平也會慢', [
      '輪到何春禾時，她在積水前停下。水面漂著三片很新的榆葉，山上卻沒有榆樹。',
      '你們繞過去，在泥裡找到一隻只剩半截的野狗。',
      '你第一個念頭不是「她救了大家」。而是：她很適合探路。',
      '你以前也曾因為「命硬」「眼細」被安排到更危險的位置。能力被看見，有時就是新的風險。'
    ], { choices: [{ text: '記她辨路有功，但不因此固定她的位置', next: 'ch5_lead_bridge', responsibilityDelta: 5, trustDelta: 3 }, { text: '把她調到每段第二順位，這是最有效率的用人', next: 'ch5_lead_bridge', riskShiftDelta: 5, factionSectDelta: 2 }] }),

    ch5_lead_pei: S('代價停在你手裡', '最適合的人', [
      '裴舟沒有反對。他看腳印、看路肩、看樹皮刮痕，比三個人都快。',
      '第一天因此非常順。你甚至開始覺得「讓最適合的人承擔」根本不是壓迫，只是分工。',
      '第二天他問你：「師兄，如果我最適合，是不是以後都我走前面？」',
      '你一時沒有答案。'
    ], { choices: [{ text: '不是。能力不能自動變成永久風險', next: 'ch5_lead_bridge', responsibilityDelta: 6, trustDelta: 5 }, { text: '任務本來就該按能力排', next: 'ch5_lead_bridge', riskShiftDelta: 5, factionSectDelta: 2 }] }),

    ch5_lead_he: S('代價停在你手裡', '欠債的人不能用你的價錢算命', [
      '何春禾答應得很快。她知道危險，也知道額外功可以換多少靈砂。',
      '你提醒她「命不只那點功」。她笑了一下：「欠債的人不能用你的價錢算命。」',
      '她是自願的。也正因如此，你更難判斷自己是不是在利用她。'
    ], { choices: [{ text: '把最好的避煞繩給她，至少把風險壓低', next: 'ch5_lead_bridge', responsibilityDelta: 4, spiritStoneDelta: -1, trustDelta: 2 }, { text: '她自己選的，按原配給就好', next: 'ch5_lead_bridge', riskShiftDelta: 4, factionSectDelta: 2 }] }),

    ch5_lead_self: S('代價停在你手裡', '副領先倒，誰帶隊？', [
      '你自己走前面，三個新人明顯安心很多。',
      '可你很快發現另一個問題：你身上帶著唯一的完整路冊與宗門印。你若先倒，剩下三人連如何合法交貨都未必知道。',
      '「自己扛所有風險」聽起來乾淨，也可能只是另一種不負責任。'
    ], { choices: [{ text: '把路冊與撤退規則同步給三人，再輪換', next: 'ch5_lead_bridge', responsibilityDelta: 7, intelDelta: 3 }, { text: '仍由自己走前，至少不讓新人替你踩', nextPool: [{ next: 'ch5_lead_bridge', weight: 78 }, { next: 'ch5_lead_self_death', weight: 22 }], responsibilityDelta: 4, qiDelta: -8, risk: '高' }] }),

    ch5_lead_self_death: death('代價停在你手裡', '領隊倒在第一個', [
      '你踩中一片被落葉蓋住的殘陣。',
      '三個新人把你拖出來，卻沒有人知道宗門印的解封口訣。藥車最後也丟了。',
      '你確實沒有讓任何人替你踩雷。你只是讓整隊人在你倒下後一起失去退路。'
    ], '副領堅持獨自承擔前哨風險，觸發殘陣後隊伍失去指揮與關鍵路引。', '他沒有把危險推給別人。\n於是他倒下時，\n別人也一起沒有路。', '承擔責任不等於把所有風險集中到自己。真正的帶隊還包括資訊備援、撤退權限與失能後的替代指揮。'),

    ch5_lead_bridge: S('代價停在你手裡', '三枚靈砂，三個時辰，一個人', [
      '倒塌小橋下有黑色石粉。繞路多三個時辰，兩瓶凝脈液會掉藥性。',
      '用紙鶴探路要花三枚靈砂。也可以讓一個人先過去繫索。',
      '你第一次看見一張極乾淨的帳：三枚靈砂、三個時辰、一個人的風險。'
    ], {
      choices: [
        { text: '花自己的探路符', next: 'ch5_lead_bridge_safe', spiritStoneDelta: -1, responsibilityDelta: 6, factionSectDelta: -1 },
        { text: '繞路，接受任務扣分', next: 'ch5_lead_bridge_delay', responsibilityDelta: 5, factionSectDelta: -3, exitWillDelta: 2 },
        { text: '讓自願者先過，額外記功', nextPool: [{ next: 'ch5_lead_bridge_volunteer_safe', weight: 70 }, { next: 'ch5_lead_bridge_volunteer_death', weight: 30 }], riskShiftDelta: 7, meritDelta: 1, risk: '高' }
      ]
    }),

    ch5_lead_bridge_safe: S('代價停在你手裡', '紙鶴燒掉了', [
      '紙鶴飛到橋中段忽然冒出紫火，只剩半片紙落下。',
      '周小滿吸了一口冷氣。何春禾小聲說：「三枚靈砂換一條命，很便宜。」',
      '你說是。因為如果連這點都不敢承認，下次就更容易拿「規矩」騙自己。'
    ], { choices: [{ text: '繞路回宗，接受外務堂扣評', next: 'ch5_lead_rules', responsibilityDelta: 4, intelDelta: 4 }] }),

    ch5_lead_bridge_delay: S('代價停在你手裡', '安全也會扣分', [
      '你們繞了三個時辰。凝脈液藥性掉了一些，外務堂扣你半級評等。',
      '執事沒有說你錯，只問：「你每次都替下面的人出成本，很快就不是副領了。」',
      '保守不是安全鍵。它會吃掉你的職位、資源與下一次能不能決定的資格。'
    ], { choices: [{ text: '問執事：那你覺得應該怎麼帶？', next: 'ch5_lead_rules', exitWillDelta: 3, factionSectDelta: -1 }] }),

    ch5_lead_bridge_volunteer_safe: S('代價停在你手裡', '這次沒死人', [
      '周小滿主動先過，索也成功繫緊。所有人平安過橋。',
      '世界甚至給了你一個很好的結果：任務準時，沒人受傷，周小滿多拿半點功。',
      '讓別人承擔風險並不總會死人。這正是它會變成常態的原因。'
    ], { choices: [{ text: '把這次成功記成結果，不記成正解', next: 'ch5_lead_rules', intelDelta: 4, responsibilityDelta: 2 }, { text: '證明這套分工有效，之後照做', next: 'ch5_lead_rules', riskShiftDelta: 5, factionSectDelta: 3 }] }),

    ch5_lead_bridge_volunteer_death: death('代價停在你手裡', '自願先過', [
      '周小滿踩到橋中段時，紫火沿舊索竄起。',
      '他只來得及回頭喊一聲。你們後面三個人因他的死看見了殘陣範圍。',
      '他是自願的。額外功也寫在規矩裡。所有程序都很乾淨。'
    ], '讓自願新人先過未知殘橋測路，觸發隱藏火陣死亡。', '他自己舉了手。\n所以所有人都比較容易說：\n不是我推的。', '自願能改善倫理條件，不能自動消除權力差與資訊差。誰知道風險、誰設計獎勵、誰能拒絕，仍然重要。'),

    ch5_lead_rules: S('代價停在你手裡', '規矩很公平', [
      '執事說：「該誰拿功，誰擔風險。規矩很公平。」',
      '三天後，他把北三洞採陰芝的差事交給你。半年死過七個試役，卻也不是每次死人。',
      '你若不接，可以摘掉副領牌。牌代表多六枚靈砂、二級路冊，以及完整吐納法後半卷的申請資格。',
      '你終於離開耗材的位置。門後第一件事，是決定誰去一個會死人的洞。'
    ], {
      choices: [
        { text: '接，但先查七個死者卷宗', next: 'ch5_resource_records', intelDelta: 8, responsibilityDelta: 4, factionSectDelta: 2 },
        { text: '接，照外務堂既有流程走', next: 'ch5_resource_roster', factionSectDelta: 4, riskShiftDelta: 3 },
        { text: '摘牌。不想要用這種方式換來的上升', next: 'ch5_early_exit', exitWillDelta: 12, factionSectDelta: -8 }
      ]
    }),

    ch5_early_exit: S('代價停在你手裡', '摘下來真的可以', [
      '你把副領牌放回桌上。沒有雷，沒有逐出宗門。執事只叫下一個人進來。',
      '北三洞任務沒有消失。另一個副領接了。你只是失去那面牌帶來的錢、路冊與上升速度。',
      '退出不是拯救所有人。只是你拒絕由自己繼續分配這一輪風險。'
    ], { choices: [{ text: '退回普通外門，看看自己還想不想修', next: 'ch5_final_crossroad', exitWillDelta: 10, responsibilityDelta: 4 }] }),

    ch5_resource_records: S('死亡開始變成資源', '七個死人留下的地圖', [
      '七份死亡記錄疊起來，死者多數走左壁。不是證明左壁一定危險，只證明那裡值得先查。',
      '你第一次能看到以前看不到的完整卷宗。權力的第一個好處，不是命令別人，是知道別人為什麼死。',
      '你可以把未知切成幾塊，再決定誰去碰。死亡從災難開始變成資料。'
    ], {
      choices: [
        { text: '先找上一批唯一活著回來的羅七', next: 'ch5_resource_luoqi', intelDelta: 8, spiritStoneDelta: -1, responsibilityDelta: 3 },
        { text: '地圖已經足夠，按右壁規劃', next: 'ch5_resource_roster', intelDelta: 3, riskShiftDelta: 2 }
      ]
    }),

    ch5_resource_luoqi: S('死亡開始變成資源', '上一個活著回來的人', [
      '羅七右眼瞎了，現在在山下磨刀。他收了你的錢，只說：「左邊會吃人。」',
      '你追問當年誰先進。他說阿福。為什麼是阿福？因為阿福最窮，最想拿額外功。',
      '領隊沒有逼，只說左壁先探者加一點功。羅七笑：「當年那個領隊沒死，後來升內務了。聽說人很好。」'
    ], { choices: [{ text: '記住：獎勵本身也能推人進危險', next: 'ch5_resource_roster', intelDelta: 10, responsibilityDelta: 4 }, { text: '至少這證明自願制能找到願意承擔的人', next: 'ch5_resource_roster', riskShiftDelta: 5, factionSectDelta: 2 }] }),

    ch5_resource_roster: S('死亡開始變成資源', '一點功', [
      '進洞前需要一個人掛三個探煞鈴。完成加一點功。',
      '何春禾幾乎立刻抬頭。一點功能換五枚靈砂。你知道她會有反應，甚至在說出口前就知道。',
      '你沒有點名。你只是把獎勵放在危險前面。'
    ], {
      choices: [
        { text: '把風險完整說完，再讓所有人決定', nextPool: [{ next: 'ch5_cave_bells_safe', weight: 82 }, { next: 'ch5_cave_bells_bad', weight: 18 }], responsibilityDelta: 6, riskShiftDelta: 2, trustDelta: 4 },
        { text: '只說流程和功點，何春禾最需要，她會自己選', nextPool: [{ next: 'ch5_cave_bells_safe', weight: 66 }, { next: 'ch5_cave_bells_bad', weight: 34 }], riskShiftDelta: 8, meritDelta: 1, trustDelta: -3 },
        { text: '不設額外功，你自己去掛', nextPool: [{ next: 'ch5_cave_bells_safe', weight: 72 }, { next: 'ch5_cave_self_hurt', weight: 28 }], responsibilityDelta: 8, qiDelta: -6, risk: '高' }
      ]
    }),

    ch5_cave_bells_safe: S('你開始知道怎麼讓別人死', '三個鈴都掛上了', [
      '三個探煞鈴安靜掛好。何春禾回來時手在抖，但沒有受傷。',
      '四個人第一次進洞時，你走最前，因為前廊已經有人替你試過。',
      '你清楚知道自己正在享受另一個人冒過的風險。她沒死，所以這看起來很正常。'
    ], { choices: [{ text: '只取任務要求的八株陰芝', next: 'ch5_cave_harvest', responsibilityDelta: 4 }, { text: '牆上還有四株，多採可以多拿功', next: 'ch5_cave_extra', meritDelta: 1, riskShiftDelta: 4 }] }),

    ch5_cave_bells_bad: death('你開始知道怎麼讓別人死', '第二個鈴沒有掛上', [
      '何春禾在左岔停得太久。等你們聽見第一聲鈴撞時，她已經被灰膜拖進牆裡。',
      '你們因此知道左壁不是一直危險，而是會在某些時段活過來。',
      '她的死立刻變成一條非常有用的時間情報。這正是最噁心的地方。'
    ], '試役弟子在北三洞掛探煞鈴時遭活性陰煞壁吞噬。', '她替所有後來的人，\n把一個時辰寫成了紅字。', '別人的死能提供高價值情報，但不能因此推導成「值得」。真正要學的是活動時段、徵兆與撤退條件，而不是固定派人去死。'),

    ch5_cave_self_hurt: S('你開始知道怎麼讓別人死', '你沒有死，但一個月不能帶隊', [
      '你親自掛鈴時被陰煞擦過胸口。沒有當場死，卻要休養一個月。',
      '外務堂照樣問：「下一次北三洞誰帶？」任務沒有因為你願意承擔而停。',
      '你不能再用「我自己去」逃避分配問題。'
    ], { choices: [{ text: '把已知情報完整交給裴舟，讓他臨時領隊', next: 'ch5_cave_harvest', responsibilityDelta: 6, trustDelta: 4 }, { text: '從十二人名冊挑陌生人補位', next: 'ch5_cave_names', riskShiftDelta: 7 }] }),

    ch5_cave_harvest: S('你開始知道怎麼讓別人死', '第五株時，前廊鈴響了', [
      '你們取到第五株陰芝，前廊第一個鈴忽然連續亂撞。',
      '任務要八株。現在撤，只完成六成。再拔三株也許只要十息。',
      '「差一點就完成」是最常把人留在危險裡的一句話。'
    ], {
      choices: [
        { text: '撤。五株也是情報和成果', next: 'ch5_cave_shortfall', responsibilityDelta: 6, factionSectDelta: -3 },
        { text: '再十息，三株很快', nextPool: [{ next: 'ch5_cave_skinwall', weight: 45 }, { next: 'ch5_cave_complete', weight: 55 }], meritDelta: 2, riskShiftDelta: 5, risk: '高' }
      ]
    }),

    ch5_cave_extra: S('你開始知道怎麼讓別人死', '任務完成後的四株', [
      '八株已經夠了，牆上還有四株。這一次不是宗門逼，是你們自己想多拿。',
      '何春禾說她可以採，因為超額部分能折功。裴舟看向洞外，沒有鈴聲。',
      '第十一株拔到一半，牆裡傳來一聲你們沒掛過的鈴。'
    ], {
      choices: [
        { text: '立刻走，不為超額收益留人', next: 'ch5_cave_complete', responsibilityDelta: 6 },
        { text: '何春禾已經抓住第十一株，讓她拔完', next: 'ch5_cave_skinwall', riskShiftDelta: 6, meritDelta: 1 }
      ]
    }),

    ch5_cave_skinwall: S('你開始知道怎麼讓別人死', '那不是牆', [
      '整面濕壁鼓起來，灰白薄膜下有幾十個人形凸起。七個失蹤者去哪，答案就在裡面。',
      '何春禾離得最近。你只有一張保命符，能拍她，也能留給自己。',
      '這一次沒有時間做漂亮的制度設計。'
    ], {
      choices: [
        { text: '把符拍到何春禾背上', next: 'ch5_cave_you_hurt', spiritStoneDelta: -1, responsibilityDelta: 10, trustDelta: 8, qiDelta: -18 },
        { text: '留符自保，命令所有人撤', nextPool: [{ next: 'ch5_cave_he_dead', weight: 65 }, { next: 'ch5_cave_complete', weight: 35 }], riskShiftDelta: 10, trustDelta: -8, risk: '極高' }
      ]
    }),

    ch5_cave_he_dead: S('你開始知道怎麼讓別人死', '你活著把三個人帶出去', [
      '保命符擋下灰舌，你和裴舟、周小滿退出洞口。何春禾沒有。',
      '任務完成了。你甚至保住了領隊與兩個隊員。按外務堂算法，這不是失敗。',
      '你很難否認：保住自己真的讓更多人活著回來。也很難否認，是你決定誰留在裡面。'
    ], { choices: [{ text: '把死亡原因、自己保符的決定全部寫進報告', next: 'ch5_cave_names', responsibilityDelta: 6, karmaDelta: 8, trustDelta: -2 }, { text: '報告只寫「撤退不及」', next: 'ch5_cave_names', riskShiftDelta: 7, factionSectDelta: 4, karmaDelta: 5 }] }),

    ch5_cave_you_hurt: S('你開始知道怎麼讓別人死', '符給了她', [
      '金光把何春禾彈開，你自己被灰舌掃中，胸口陰冷入脈。四個人都活著出去。',
      '你一個月不能運重靈力。副領任務照常，外務堂問下一隊誰帶。',
      '「我替他們承擔」不是永遠可用的答案。當你躺在床上，名字還是得有人寫。'
    ], { choices: [{ text: '讓熟悉北三洞的裴舟帶原隊，自己做洞外接應', next: 'ch5_cave_names', responsibilityDelta: 7, trustDelta: 6 }, { text: '換四個新人，避免原隊疲勞', next: 'ch5_cave_names', riskShiftDelta: 5, factionSectDelta: 2 }] }),

    ch5_cave_complete: S('你開始知道怎麼讓別人死', '八株都帶回來了', [
      '任務完成。沒有人死。外務堂給你「優」。',
      '因為你們把路摸清，北三洞從一月一次改成一月三次。兩個月後，另一隊照你的圖走，死了一個唐佑。',
      '他的死讓地圖多一行紅字：「午時後濕壁活性升高。」之後三批人都沒死。',
      '你成功降低單次死亡率，系統就提高使用頻率。死人更有效率了。'
    ], { choices: [{ text: '要求把使用頻率也列入風險評等', next: 'ch5_info_halftruth', responsibilityDelta: 6, factionSectDelta: -2 }, { text: '至少整體死亡率下降，這就是管理成果', next: 'ch5_info_halftruth', riskShiftDelta: 4, factionSectDelta: 4, meritDelta: 2 }] }),

    ch5_cave_shortfall: S('你開始知道怎麼讓別人死', '少三株', [
      '外務堂只看八株任務，你帶回五株。丹爐七日後開，陰芝缺口會讓一批外門弟子晚拿丹。',
      '你的謹慎也會有受害者。你不去，會有人去；你自己死了，下一隊仍要進。',
      '你開始理解「總得有人做」為什麼有時真的成立。真正該問的是：說這句話的人站在哪裡？'
    ], { choices: [{ text: '補準備後再進，不把急迫當免檢理由', next: 'ch5_cave_complete', spiritStoneDelta: -1, responsibilityDelta: 5, intelDelta: 4 }, { text: '下一批按功點找自願者補缺口', next: 'ch5_cave_names', riskShiftDelta: 6, factionSectDelta: 3 }] }),

    ch5_cave_names: S('你開始知道怎麼讓別人死', '十二個名字', [
      '你受傷時，名冊上有十二個候選人。你只要選四個。',
      '不認識的人最好寫。名字只是字，不知道他們的娘、債、怕不怕黑，筆就很輕。',
      '權力最方便的功能之一，是把臉磨掉，磨成人力。'
    ], {
      choices: [
        { text: '優先用已知有經驗的人，並把自己列洞外接應', next: 'ch5_info_halftruth', responsibilityDelta: 6, trustDelta: 4 },
        { text: '從陌生人裡按體力與修為選，最客觀', next: 'ch5_info_halftruth', riskShiftDelta: 5, factionSectDelta: 3 },
        { text: '抽籤，至少不是你決定誰倒楣', next: 'ch5_info_halftruth', responsibilityDelta: 2, riskShiftDelta: 2, exitWillDelta: 1 }
      ]
    }),

    ch5_info_halftruth: S('錯誤情報也能賣錢', '假的最值錢', [
      '半真樓掌櫃看見你的副領牌，說你手裡的北三洞規律現在很值錢。',
      '真情報只能賣一次。假情報能讓競爭者走錯一次。只要把「午時後活性升高」改成「午時最低」，五塊靈石。',
      '五塊足夠你半年不接高危差事。你第一次發現，讓別人死不一定是為了救命，也可能只是因為能賺。'
    ], {
      choices: [
        { text: '不寫假情報', next: 'ch5_info_refuse', responsibilityDelta: 6, exitWillDelta: 2 },
        { text: '寫半句真話：「右壁較穩」但省略時段', next: 'ch5_info_omission', riskShiftDelta: 7, spiritStoneDelta: 1, blackCreditDelta: 4 },
        { text: '直接寫錯誤時段，五塊靈石能買很多退路', nextPool: [{ next: 'ch5_info_false_profit', weight: 70 }, { next: 'ch5_info_false_revenge', weight: 30 }], riskShiftDelta: 12, spiritStoneDelta: 5, blackCreditDelta: 6, karmaDelta: 10, risk: '極高' }
      ]
    }),

    ch5_info_refuse: S('錯誤情報也能賣錢', '你沒寫，別人寫了', [
      '三天後，半真樓仍賣出一份錯誤情報。散修商隊兩死一傷，青雲藥鋪收購價回升。',
      '你沒有害那兩個人，卻從他們死後變好的市場裡受益。',
      '「我不做，別人會做」不能替你開脫；但「我沒做」也不是毫無差別。第五章開始把無辜磨得很薄。'
    ], { choices: [{ text: '至少不把別人的死變成自己的主動工具', next: 'ch5_curse_box', responsibilityDelta: 4, exitWillDelta: 2 }, { text: '結果都一樣，下次不必再裝乾淨', next: 'ch5_curse_box', riskShiftDelta: 5 }] }),

    ch5_info_omission: S('錯誤情報也能賣錢', '只少了一句', [
      '陸衡的商隊買了你的消息。三天後沒死人，但一個人折腿，陰芝損失六成。',
      '你的藥路壓力變小，還拿到一枚靈石情報費。',
      '一切都比想像中輕：只是一條腿、一枚靈石、一句沒有說完的真話。灰色手段真正危險的地方，是它真的很好用。'
    ], { choices: [{ text: '到此為止，不再把省略當武器', next: 'ch5_curse_box', responsibilityDelta: 3, riskShiftDelta: 2 }, { text: '把「七分真」正式當成競爭手段', next: 'ch5_curse_box', riskShiftDelta: 8, blackCreditDelta: 4, factionSectDelta: 3 }] }),

    ch5_info_false_profit: S('錯誤情報也能賣錢', '市場安靜了', [
      '散修商隊按你的錯誤時段進洞。一死兩傷，剩下的人退出白石藥路。',
      '青雲宗收購價回升，你拿錢，外務堂還說「最近路上清靜多了」。',
      '沒有任何人知道是你寫的。世界非常順暢地獎勵了你。'
    ], { choices: [{ text: '把錢收下，這就是競爭', next: 'ch5_curse_box', riskShiftDelta: 8, factionSectDelta: 4 }, { text: '匿名補一份正確情報給剩下的人', next: 'ch5_curse_box', responsibilityDelta: 5, spiritStoneDelta: -1, blackCreditDelta: -2 }] }),

    ch5_info_false_revenge: death('錯誤情報也能賣錢', '七分真的回來了', [
      '那支商隊沒有全滅。領頭人活著查到消息來源曾經經過半真樓。',
      '他不知道是你寫，但知道青雲宗最近是最大受益者。',
      '半個月後你下山時，被三個不認識的人堵在山道。他們只需要懷疑到這一層。'
    ], '以錯誤洞府情報打擊競爭商隊後，倖存者循利益鏈買兇報復。', '他只改了一個字。\n對方也只需要多猜一層。', '假情報的風險不只在「會不會被證明」。受益者、流向與時間點本身也會形成可追索線索。'),

    ch5_curse_box: S('詛咒法器', '一只不該出現在倉庫的盒子', [
      '白石城亂葬坡清庫送回一只黑木盒，原主不詳，疑似護心鏡殘件。鑑物堂排到下月，外務堂要你和段霄先驗。',
      '段霄是你一直不喜歡的人。他搶過名額、嘲笑過你，也最愛說你太謹慎。',
      '驅邪符靠近紅線時微微捲起。段霄卻笑：「一縷靈力而已。」你完全知道怎麼讓他自己走到盒子前。'
    ], {
      choices: [
        { text: '花三塊送半真樓私鑑，不拿人測', next: 'ch5_curse_paid', spiritStoneDelta: -3, responsibilityDelta: 8, factionSectDelta: -2, appraisalDelta: 6 },
        { text: '等鑑物堂，接受評等扣分', next: 'ch5_curse_wait', responsibilityDelta: 6, exitWillDelta: 3, factionSectDelta: -4 },
        { text: '順著段霄的面子：「那段師兄先？」', nextPool: [{ next: 'ch5_curse_marked', weight: 68 }, { next: 'ch5_curse_linked', weight: 18 }, { next: 'ch5_curse_harmless', weight: 14 }], riskShiftDelta: 10, factionSectDelta: 3, trustDelta: -5, risk: '高' }
      ]
    }),

    ch5_curse_paid: S('詛咒法器', '三塊驗一塊二的破鏡', [
      '半真樓確認紅線有命印殘留，建議不要直接輸靈。',
      '外務堂覺得你浪費錢，但你至少知道這不是普通受潮。',
      '真正荒謬的是：你付出的鑑定費比法器本身還貴。安全從來不是物品標價的一部分。'
    ], { choices: [{ text: '把結果交鑑物堂，等正式分類', next: 'ch5_curse_function', responsibilityDelta: 4, appraisalDelta: 4 }] }),

    ch5_curse_wait: S('詛咒法器', '等一個月', [
      '你真的等到鑑物堂空出位置。評等扣了一級，外務堂認為你「過度保守」。',
      '鏡的功能也因此沒有人先用身體試出來。',
      '延後不是免費答案。你買到的是少一個未知人命，賣掉的是職位速度。'
    ], { choices: [{ text: '接受這筆成本', next: 'ch5_curse_function', responsibilityDelta: 4, exitWillDelta: 2 }] }),

    ch5_curse_marked: S('詛咒法器', '段霄胸口多了一面鏡', [
      '段霄輸入第三息靈力，黑木盒像心跳一樣「咚」了一聲。五指陷進木面，盒裡黑鏡浮出四字：一命照一命。',
      '你及時斷線，他沒有死，胸口卻留下鏡形黑印，每天吸走一成靈力。',
      '正式記錄只寫：「段霄依驗收流程先行輸靈，觸發異常。」你的三個字和你知道他受不了激，都蒸發了。'
    ], { choices: [{ text: '向段霄承認：我確實利用你會逞強', next: 'ch5_curse_confess', responsibilityDelta: 8, trustDelta: 5 }, { text: '你主張照流程，我只是按能力分工', next: 'ch5_curse_function', riskShiftDelta: 6, factionSectDelta: 3 }] }),

    ch5_curse_linked: death('詛咒法器', '第二個人才是受代者', [
      '段霄先碰鏡，什麼都沒發生。你站在旁邊記錄。',
      '下一息，你胸口忽然凹下去，像有人隔著幾丈重擊心脈。',
      '這一世黑鏡第一個人只是標記，第二個靠近的人才承傷。讓別人先試沒有替你背出答案。'
    ], '誤以為先接觸者承擔詛咒，實際遭連命鏡第二順位轉傷擊中心脈。', '他讓別人先碰。\n鏡子看了一眼順序，\n選了第二個。', '同一類法器的觸發條件可能不同。上一世「先碰者受咒」只能教你看命印、觸發序列與距離，不能教固定順序答案。'),

    ch5_curse_harmless: S('詛咒法器', '這一世只是護主禁制', [
      '段霄輸靈後，黑鏡只映出一串舊主姓名。查亂葬坡記錄後，把原主名牌重新合葬，禁制自然散掉。',
      '沒有人受傷。你若上一世死過一次，就把「黑鏡一定轉命」背成答案，這一世反而會錯。',
      '世界仍然只允許你學徵兆，不允許背正解。'
    ], { choices: [{ text: '把命印與所有權列為鑑別項目', next: 'ch5_chase_notice', appraisalDelta: 10, intelDelta: 5, responsibilityDelta: 2 }] }),

    ch5_curse_confess: S('詛咒法器', '他說：學會了', [
      '段霄聽完沒有翻臉，只笑了一下：「行，學會了。」',
      '你不知道他學會的是不要相信你，還是學會以後也可以利用別人的性格。',
      '承認動機不能把傷害抹掉，但至少不讓制度替你把動機洗乾淨。'
    ], { choices: [{ text: '等鑑物堂確認功能', next: 'ch5_curse_function', trustDelta: 3 }] }),

    ch5_curse_function: S('詛咒法器', '一個真的很好用的邪器', [
      '鑑物堂回報：這一世黑鏡能把持鏡者一次致命重傷，轉嫁給提前留印的人。用完鏡裂。',
      '毀鏡可能反噬段霄；留著，他替持鏡者擋一次。段霄本人竟要求留，因為「驗器功」能換破障散。',
      '只要把報酬放在危險後面，總有人自己選。邪器最可怕的不是邪，是用途真的太好。'
    ], {
      choices: [
        { text: '申請等黑印衰弱後銷毀', next: 'ch5_curse_destroy', responsibilityDelta: 8, factionSectDelta: -3 },
        { text: '留用，但只能在受代者每次明確同意時啟用', next: 'ch5_curse_keep', responsibilityDelta: 4, riskShiftDelta: 4, factionSectDelta: 3 },
        { text: '留用。這能替領隊多一條命，宗門也給功', next: 'ch5_curse_keep_hard', riskShiftDelta: 12, meritDelta: 3, factionSectDelta: 6 }
      ]
    }),

    ch5_curse_destroy: S('詛咒法器', '你把很好用的東西毀了', [
      '黑印衰弱後，鑑物堂用陣火毀鏡。段霄吐了一口血，修為掉了一小截，但活著。',
      '外務堂沒有罰你，也沒獎你。三個月後另一支隊伍遇伏，有人說如果那面鏡還在，也許領隊不會死。',
      '你無法知道。拒絕一個殘酷工具，也可能真的失去它能救人的功能。'
    ], { choices: [{ text: '接受沒有另一條時間線能證明你對', next: 'ch5_chase_notice', responsibilityDelta: 4, exitWillDelta: 2 }] }),

    ch5_curse_keep: S('詛咒法器', '自願受代', [
      '黑鏡被封進外務庫。每次啟用都要受代者簽名、寫報酬與撤回權。',
      '制度比原本乾淨很多，但沒有改掉核心：一個人的保命工具仍靠另一個人站到傷害前面。',
      '你只能讓這件事更可見、更難被偷用，不能把代價變沒。'
    ], { choices: [{ text: '繼續下山任務', next: 'ch5_chase_notice', responsibilityDelta: 3, riskShiftDelta: 2 }] }),

    ch5_curse_keep_hard: S('詛咒法器', '用途', [
      '宗門把黑鏡列為「特殊護命器」。文件寫得非常中性。',
      '你得到三點功。段霄得到兩點。誰都沒有被稱為受害者。',
      '宗門不是不知道殘酷，只是有比殘酷更高一層的欄位：用途。'
    ], { choices: [{ text: '收下功點', next: 'ch5_chase_notice', riskShiftDelta: 6, factionSectDelta: 4 }] }),

    ch5_chase_notice: S('黑市追殺', '有人出十二塊買你的位置', [
      '白石城黑市有人悄悄告訴你：有人出十二塊靈石買你的住處、出城時辰和是否獨行。',
      '十二塊不是傳聞價。足夠讓低階散修真的動刀。',
      '你不知道原因。可能是錯誤情報、黑鏡、顧家舊帳、白石幫因果，甚至只是同名。'
    ], {
      choices: [
        { text: '先花錢查買主線，不急著跑', next: 'ch5_chase_reason', spiritStoneDelta: -2, intelDelta: 10, blackCreditDelta: 3, responsibilityDelta: 2 },
        { text: '換客棧、改時辰、降低暴露', next: 'ch5_chase_hide', spiritStoneDelta: -1, wantedDelta: -3, intelDelta: 3 },
        { text: '做一個假位置，把追殺者引去別處', next: 'ch5_chase_decoy', riskShiftDelta: 8, blackCreditDelta: 3 }
      ]
    }),

    ch5_chase_reason: S('黑市追殺', '追殺你的理由不固定', [
      '黑市只查到四種可能：被你擠掉藥路的商隊、曾替你背鍋的白石幫線、顧家舊帳，或一筆同名誤會。',
      '沒有哪個能完全證實。你只能根據誰知道你行程、誰有十二塊、誰最近受益受損縮小範圍。',
      '你若把追殺背成固定仇家，下一世一樣會死。'
    ], { choices: [{ text: '用最小暴露方案躲三天再看', next: 'ch5_chase_real', intelDelta: 6, responsibilityDelta: 2 }, { text: '既然最可能是藥路競爭，反向放消息引他們出手', next: 'ch5_chase_decoy', riskShiftDelta: 5, intelDelta: 4 }] }),

    ch5_chase_hide: S('黑市追殺', '不把位置留給任何人', [
      '你換住處、拆行程、不讓同一個跑腿同時知道起點和終點。',
      '這很麻煩，也很花錢，但沒有把風險明確丟到某個人身上。',
      '第三晚，買你位置的價格漲到十五塊。對方真的還在。'
    ], { choices: [{ text: '再躲不是辦法，查清後處理', next: 'ch5_chase_real', intelDelta: 5 }, { text: '把假住處賣出去測誰會來', next: 'ch5_chase_decoy', riskShiftDelta: 5 }] }),

    ch5_chase_decoy: S('黑市追殺', '假路需要一個落點', [
      '你能把自己的舊外袍、住宿筆跡與出城時辰拼成一條假線。',
      '問題是線最後必須落在某個地方。舊碼頭晚上有人住，廢倉比較空；段霄常去的茶棚更容易讓追殺者信。',
      '風險轉嫁最難看的地方不是做假，而是你開始挑「哪裡死人成本比較低」。'
    ], {
      choices: [
        { text: '用廢倉，只做無人誘餌', nextPool: [{ next: 'ch5_chase_real', weight: 78 }, { next: 'ch5_chase_decoy_backfire', weight: 22 }], spiritStoneDelta: -1, responsibilityDelta: 4, intelDelta: 5 },
        { text: '引去你討厭的段霄常去茶棚', next: 'ch5_chase_target_enemy', riskShiftDelta: 10, karmaDelta: 8, trustDelta: -6 },
        { text: '引去舊碼頭。那裡人命便宜，也最像黑市交易點', next: 'ch5_chase_dock', riskShiftDelta: 12, blackCreditDelta: 4, karmaDelta: 10 }
      ]
    }),

    ch5_chase_dock: S('黑市追殺', '舊碼頭死了兩個人', [
      '追殺者真的去了舊碼頭。你不在。',
      '第二天那裡死了兩個搬貨凡人。不是你指定，也不是你認識。只是他們剛好睡在你選的假位置附近。',
      '你的假路很成功。成功得讓你知道，以後如果再遇同類問題，這方法真的能用。'
    ], { choices: [{ text: '給家屬匿名補償，不再用有人住的落點', next: 'ch5_chase_real', spiritStoneDelta: -2, responsibilityDelta: 5, karmaDelta: 5 }, { text: '追殺你的人殺的，不是你', next: 'ch5_chase_real', riskShiftDelta: 5, karmaDelta: 4 }] }),

    ch5_chase_target_enemy: S('黑市追殺', '你選了一個本來就討厭的人', [
      '段霄那晚不在茶棚，卻有兩個和他同桌的外門弟子被打傷。',
      '追殺者以為線索斷了，很快退。你活得更安全。',
      '你不是把風險隨機推出去，而是開始挑「我比較不介意誰承擔」。這已經是另一層。'
    ], { choices: [{ text: '承認自己是在報復，不用「戰術」替動機洗白', next: 'ch5_chase_real', responsibilityDelta: 4, riskShiftDelta: 3 }, { text: '段霄本來就和你有過節，這是最合理的誘餌', next: 'ch5_chase_real', riskShiftDelta: 7, trustDelta: -4 }] }),

    ch5_chase_decoy_backfire: death('黑市追殺', '無人廢倉也會有人來', [
      '你選了看似沒人的廢倉。追殺者到時，裡面正好躲著一群私鹽販子。',
      '雙方打起來後抓到其中一人，從他嘴裡反查是誰最近刻意散布假位置。',
      '你沒有把風險推給特定的人，仍然無法控制一個城市裡誰會出現在你以為空的地方。'
    ], '以假位置誘導追殺者時誤捲入地下交易者，假線被反查後遭報復殺害。', '他挑了一個「沒有人」的地方。\n城市回答：\n你怎麼知道？', '風險轉移的落點也需要驗證。空屋、廢倉、舊碼頭都可能有你不知道的使用者；「沒有看見人」不是「沒有人」。'),

    ch5_chase_real: S('黑市追殺', '真正的追殺來了', [
      '第三天傍晚，兩名散修終於在你出城路上現身。沒有蒙面，因為他們不覺得需要。',
      '你現在有三條路：正面逃、花錢談、或用黑市中間人把他們導去接一個「更值得」的高報酬單。',
      '最後一條不需要你殺人。你只需要讓他們覺得另一個機會更好。'
    ], {
      choices: [
        { text: '花六塊靈石談掉這筆追殺', next: 'ch5_chase_paid', spiritStoneDelta: -6, responsibilityDelta: 6, blackCreditDelta: 2 },
        { text: '利用地形逃回宗門', nextPool: [{ next: 'ch5_chase_escape', weight: 72 }, { next: 'ch5_chase_escape_death', weight: 28 }], qiDelta: -15, responsibilityDelta: 2, risk: '高' },
        { text: '給他們一個「更值得接」的黑市單', nextPool: [{ next: 'ch5_chase_job_success', weight: 70 }, { next: 'ch5_chase_job_return', weight: 30 }], blackCreditDelta: 6, riskShiftDelta: 10, intelDelta: 4, risk: '高' }
      ]
    }),

    ch5_chase_paid: S('黑市追殺', '六塊買回一段安靜', [
      '六塊很痛。對方收錢後真的停手，因為原委託本來也只有十二塊。',
      '你沒有贏，也沒有讓誰替你死。你只是把問題重新變回價格。',
      '不是所有髒局都必須用更髒的方法解。前提是你付得起。'
    ], { choices: [{ text: '回宗，處理下一張名冊', next: 'ch5_mission_roster', responsibilityDelta: 3, spiritStoneDelta: 0 }] }),

    ch5_chase_escape: S('黑市追殺', '這次跑掉了', [
      '你用第四章學來的換路、斷視線與假足跡甩掉兩人，沒有讓第三者捲進來。',
      '代價只是自己受了一刀和半個月休養。',
      '自己承擔不是唯一高尚答案，但有時就是最直接的價格。'
    ], { choices: [{ text: '傷好後回外務堂', next: 'ch5_mission_roster', qiDelta: -5, responsibilityDelta: 4 }] }),

    ch5_chase_escape_death: death('黑市追殺', '你把風險全留給自己', [
      '你不願再把追殺引給別人，選擇自己跑。',
      '第二名散修比你預估得快。刀從肋下進去時，你至少知道這一次落點沒有被你設計到別人家門口。',
      '這不是系統獎勵。你還是死。'
    ], '拒絕將追殺轉嫁第三者，獨自脫逃失敗後被追殺者刺殺。', '他這一次沒有讓別人替他死。\n世界沒有因此放過他。', '承擔風險不保證存活。倫理選擇不是隱藏防禦值；它只決定這一輪代價落在哪裡。'),

    ch5_chase_job_success: S('黑市追殺', '機會本身也可以是武器', [
      '中間人把一個報酬更高的護送單送到兩名追殺者手裡。他們真的改接。',
      '那趟護送後來死了一人。你沒有下令，也沒碰刀，只是知道什麼樣的機會會讓他們自己走進去。',
      '第五章真正成熟的惡意，不需要命令。只要配置誘因。'
    ], { choices: [{ text: '承認這和設陷阱沒有本質差別', next: 'ch5_mission_roster', responsibilityDelta: 4, riskShiftDelta: 4 }, { text: '他們自己接單，和我無關', next: 'ch5_mission_roster', riskShiftDelta: 8, blackCreditDelta: 4 }] }),

    ch5_chase_job_return: death('黑市追殺', '他們回來了', [
      '那張高報酬單是陷阱沒錯，但兩名追殺者都活了。',
      '他們很快查出是誰把單送到眼前。這次不再收錢，也不再問話。',
      '把別人推進高風險事件不是刪除敵人，只是在賭對方不會回來。'
    ], '試圖以高危黑市委託轉移追殺者，對方倖存後反查報復。', '他沒有殺人。\n他只是替殺人的地方，\n介紹了兩個客人。', '利用機會、報酬與情報誘導他人承擔風險，仍然會留下可追索關係。最大風險是對方活著回來。'),

    ch5_mission_roster: S('高危任務', '名冊現在在你手裡', [
      '廢礦附近兩個凡人村失聯，外務堂要派八人進去。名冊由你排。',
      '其中有裴舟、周小滿，也有段霄，以及幾個你只見過名字的人。',
      '段霄曾羞辱你、搶過名額；現在你只要把他寫到前排，完全能用「修為高、經驗多」解釋。',
      '你終於有能力把討厭的人寫進高危任務，而且不需要撒謊。'
    ], {
      choices: [
        { text: '按能力、傷勢與近期出勤建立公開排序', next: 'ch5_mission_fair', responsibilityDelta: 8, factionSectDelta: 1 },
        { text: '段霄修為高，讓他第一前探', next: 'ch5_mission_revenge', riskShiftDelta: 10, factionSectDelta: 4, trustDelta: -5 },
        { text: '抽籤決定前探，自己不挑人', next: 'ch5_mission_lottery', responsibilityDelta: 3, riskShiftDelta: 2 },
        { text: '把自己也列進前探輪序', next: 'ch5_mission_self', responsibilityDelta: 9, qiDelta: -6, trustDelta: 6 }
      ]
    }),

    ch5_mission_fair: S('高危任務', '客觀排序也會死人', [
      '你把修為、礦道經驗、傷勢、近期高危出勤全部列出，讓每個人知道自己為什麼在那個位置。',
      '段霄仍排在前面，因為他真的最適合。公平沒有把他從風險裡救出去。',
      '差別只是你沒有偷偷把私人討厭藏進算法。'
    ], { choices: [{ text: '出發', next: 'ch5_mission_mine', responsibilityDelta: 4, trustDelta: 3 }] }),

    ch5_mission_revenge: S('高危任務', '第一次很合理的報復', [
      '你把段霄排第一，理由每一條都成立：修為高、護身法強、有外務經驗。',
      '只有你知道，如果名冊上是另一個同樣條件的人，你可能不會排得這麼乾脆。',
      '報復最方便的形態，就是它剛好和公事方向一致。'
    ], { choices: [{ text: '就照這份名冊出發', next: 'ch5_mission_mine', riskShiftDelta: 6, factionSectDelta: 3 }, { text: '臨出發前把私人過節寫進自我備註，改成輪替前探', next: 'ch5_mission_mine', responsibilityDelta: 5, riskShiftDelta: 2, trustDelta: 2 }] }),

    ch5_mission_lottery: S('高危任務', '不是我選的', [
      '抽籤讓每個人看起來機會一樣。',
      '問題是每個人的能力、債、裝備與承擔能力根本不一樣。把差異全部抹掉，也是一種決定。',
      '「不是我選的」確實讓你心裡比較輕，卻不一定讓隊伍更安全。'
    ], { choices: [{ text: '抽籤只決定同能力層級內的順序', next: 'ch5_mission_mine', responsibilityDelta: 5, intelDelta: 2 }, { text: '完全交給籤', nextPool: [{ next: 'ch5_mission_mine', weight: 72 }, { next: 'ch5_mission_lottery_death', weight: 28 }], riskShiftDelta: 3, risk: '高' }] }),

    ch5_mission_lottery_death: death('高危任務', '公平抽到不會的人', [
      '抽到前探的是一名第一次進礦的新人。',
      '他不知道舊礦的支柱裂聲代表什麼，等裴舟聽出來時，頂板已經下來。',
      '抽籤沒有偏心。礦坑也沒有。'
    ], '以完全隨機抽籤分配高危前探，缺乏礦道經驗的新人遭塌方掩埋。', '籤很公平。\n石頭也很公平。\n它們都不看你會不會。', '公平程序不等於忽略能力差異。高危分工可以在相近能力者中抽籤，而不是把風險平均丟給所有人。'),

    ch5_mission_self: S('高危任務', '你也在名冊上', [
      '你把自己列進輪序。隊伍氣氛立刻不一樣。',
      '這不代表你永遠應該走第一，而是至少讓「領隊免於前探」不再成為默認。',
      '裴舟說：「你如果每次都這樣，可能活不到升上去。」你說知道。'
    ], { choices: [{ text: '出發', next: 'ch5_mission_mine', responsibilityDelta: 4, trustDelta: 5 }] }),

    ch5_mission_mine: S('高危任務', '廢礦裡真的有東西', [
      '礦道沒有妖潮，卻有一段舊支架後藏著低階地火脈。兩個村失聯，是因為地下毒氣從廢井冒出去。',
      '如果關掉通氣井，村子能保；但最深處需要有人在十五息內手動拉下兩道閥。',
      '這不是陰謀。不是某個壞人故意要下面的人死。只是物理上真的需要有人靠近最危險的位置。'
    ], {
      choices: [
        { text: '按能力選兩人，完整告知風險並給退出權', nextPool: [{ next: 'ch5_mission_saved', weight: 78 }, { next: 'ch5_mission_one_dead', weight: 22 }], responsibilityDelta: 7, riskShiftDelta: 3, trustDelta: 4 },
        { text: '你和裴舟進去，其他人撤', nextPool: [{ next: 'ch5_mission_saved', weight: 66 }, { next: 'ch5_mission_you_die', weight: 34 }], responsibilityDelta: 8, qiDelta: -12, risk: '極高' },
        { text: '段霄修為最高，讓他和另一名老弟子進', nextPool: [{ next: 'ch5_mission_saved', weight: 72 }, { next: 'ch5_mission_one_dead', weight: 28 }], riskShiftDelta: 7, factionSectDelta: 3, risk: '高' },
        { text: '放棄閥門，撤退兩村，任務失敗', next: 'ch5_mission_retreat', responsibilityDelta: 4, factionSectDelta: -8, exitWillDelta: 4 }
      ]
    }),

    ch5_mission_saved: S('高危任務', '八人死零或一，兩村保住', [
      '閥門落下，毒氣改道。兩個村保住。',
      '這一類任務逼你承認：有些犧牲真的可能換來更多人活。第五章因此不能變成「所有犧牲都是壞人害的」那種簡單故事。',
      '真正危險的是：分配犧牲的權力會塑造你，而成功會讓更多權力交到你手上。'
    ], { choices: [{ text: '接受外務堂升任領事', next: 'ch5_mission_promotion', factionSectDelta: 7, meritDelta: 8 }, { text: '任務完成，但拒絕升任，先停下來', next: 'ch5_return_summons', exitWillDelta: 8, responsibilityDelta: 5, factionSectDelta: -2 }] }),

    ch5_mission_one_dead: S('高危任務', '你挑得很合理，還是死了人', [
      '兩道閥成功拉下。第二個人撤退時吸入太多毒氣，死在井口。',
      '你的選擇符合能力、公開風險、給足報酬，也沒有私人報復。',
      '人還是死了。這證明程序能讓責任更可承擔，不能把結果變成零。'
    ], { choices: [{ text: '把整個決策過程和死因留下，不把「任務成功」蓋過死人', next: 'ch5_mission_promotion', responsibilityDelta: 8, karmaDelta: 8, factionSectDelta: 3 }, { text: '按外務堂格式報「一人陣亡，任務優」', next: 'ch5_mission_promotion', riskShiftDelta: 5, factionSectDelta: 6, meritDelta: 5 }] }),

    ch5_mission_you_die: death('高危任務', '你把自己寫上去了', [
      '你和裴舟拉下第一道閥。第二道卡住。',
      '你留下多推一次，裴舟被你踢出毒氣區。村子後來保住。',
      '你沒有因此證明領隊都該自己死。只是這一世，名字真的包含你。'
    ], '親自進入廢礦毒氣核心關閉地火通氣閥，為完成第二道閥門暴露過量毒氣死亡。', '他沒有把自己的名字，\n從名冊上拿掉。', '把自己納入風險分配能降低權力豁免，但不能成為「領隊必須自殺式承擔」的新固定規則。'),

    ch5_mission_retreat: S('高危任務', '村子撤了，礦沒關', [
      '你放棄關閥，先把村人往上風撤。大多數人活了，兩個村半年不能回。',
      '外務堂評等很差，宗門要付安置成本。沒有人稱你英雄。',
      '保守方案能活人，也可能把代價變成長期流離與資源損失。'
    ], { choices: [{ text: '接受降評，這也是一種結果', next: 'ch5_return_summons', exitWillDelta: 6, responsibilityDelta: 5, factionSectDelta: -6 }] }),

    ch5_mission_promotion: S('高危任務', '白石外務，領事', [
      '任務後，你從副領升成領事。三條路、十二到十六個人、更多靈石、三級路冊。',
      '你不是靠陰人升的。你真的做成一件救很多人的事。也因此更有資格坐到能決定更多人風險的位置。',
      '「弒龍者終成惡龍」最可怕的版本，不是壞人升上去，而是有能力的人升上去後，被要求做更多殘酷決定。'
    ], { choices: [{ text: '接下領事牌', next: 'ch5_return_summons', factionSectDelta: 8, meritDelta: 5 }, { text: '不接。你已經看懂這個位置會要什麼', next: 'ch5_return_summons', exitWillDelta: 10, factionSectDelta: -4 }] }),

    ch5_return_summons: S('宗門召回', '你死過幾次？', [
      '升任後第九天，一名灰袍老人站在外務堂門口。第一句不是恭喜，而是：「你死過幾次？」',
      '第一章山瘴、第二章石場、第三章寄生草、第四章南門……互相矛盾的死亡片段忽然一起浮起。',
      '老人說：「你開始記得太多。跟我上祖峰。」'
    ], {
      choices: [
        { text: '跟他上祖峰', next: 'ch5_return_hall', intelDelta: 8 },
        { text: '先問他是誰、為什麼知道', next: 'ch5_return_question', intelDelta: 5, appraisalDelta: 3 },
        { text: '拒絕。你不想再碰一個不知道代價的機緣', next: 'ch5_final_crossroad', exitWillDelta: 10, responsibilityDelta: 3 }
      ]
    }),

    ch5_return_question: S('宗門召回', '照命殿最後一個看守', [
      '老人姓晏，不是掌門，也沒有顯赫職位。他只說自己守一個宗門地圖上不存在的地方。',
      '「你記得的不是前世。」他說。「至少不是你以為的前世。」',
      '你沒有因此更安心，只是知道這趟至少有人願意先把一部分代價說出口。'
    ], { choices: [{ text: '上祖峰', next: 'ch5_return_hall', intelDelta: 4 }] }),

    ch5_return_hall: S('宗門召回', '照命', [
      '祖峰沒有霞光，只有很老的石階與一座小殿。殿名「照命」。',
      '殿裡七塊裂碑刻滿名字。你在上面看見自己的名字不只一次：山瘴、外門石場、藥谷寄生、白石城南門。',
      '有些死法你記得，有些完全不記得。晏老說：「不是輪迴冊。」'
    ], { choices: [{ text: '問清楚：那些死掉的我，到底發生了什麼？', next: 'ch5_truth_lines', intelDelta: 8, exitWillDelta: 2 }] }),

    ch5_truth_lines: S('祖師真相', '沒有任何一世被重置', [
      '晏老說，死亡時最強的執念、恐懼與判斷會像水濺過河岸，落進相鄰的相似命線。',
      '不是完整魂穿。死掉的那個真的死了。醒來的是另一條很靠近的命線裡，另一個幾乎一樣的你。',
      '所以你記得「這類人要提防」，卻不能保證這一世他也會背叛；記得某個洞危險，也不能把按鈕背成答案。',
      '能再來的，從來不是死掉的那一個。'
    ], {
      choices: [
        { text: '那別人的死也都是真的？', next: 'ch5_truth_others', responsibilityDelta: 6, karmaDelta: 4 },
        { text: '那這些殘念能不能被系統性利用？', next: 'ch5_truth_abuse', intelDelta: 8, riskShiftDelta: 2 }
      ]
    }),

    ch5_truth_others: S('祖師真相', '另一個活著，不會把這個復活', [
      '晏老說，當然可能有另一條命線的何春禾、段霄、唐佑活著。',
      '可這一條死的，還是死了。多重命線不是赦免，只讓世界更多，不讓任何一條命變輕。',
      '你第一次失去「反正還有下一輪」這個最深的藉口。'
    ], { choices: [{ text: '問祖師為什麼把真相藏起來', next: 'ch5_truth_abuse', responsibilityDelta: 4, exitWillDelta: 3 }] }),

    ch5_truth_abuse: S('祖師真相', '公開過一次的宗門', [
      '祖師曾在一條命線公開死亡殘念的真相。三十年後，那個青雲宗變成試命場。',
      '外門弟子每天死一批，只為替上面測功法、洞府、丹藥，希望相鄰命線留下更多情報。',
      '真相本身變成更有效率的吃人方法。祖師最後把照命殿藏起來，只記徵兆、代價與人在壓力下最容易做的事。'
    ], { choices: [{ text: '這就是墓誌銘真正留下的東西', next: 'ch5_ascend_platform', intelDelta: 10, responsibilityDelta: 5 }] }),

    ch5_ascend_platform: S('登仙台', '真正的機緣沒有騙你', [
      '照命殿後有一座小石台，叫登仙台。它不能讓你飛升，卻能把散在相近命線的殘念往這一條收一點。',
      '成功後神識會穩固，功法理解可能直接跨過內門門檻。這不是假寶，是真正能讓你往上爬的大機緣。',
      '代價也是真的：你可能分不清哪些記憶屬於這一世，甚至直接死。'
    ], {
      choices: [
        { text: '先檢查陣台、天候、退出條件與備援，不急著上', next: 'ch5_ascend_prepare', intelDelta: 8, appraisalDelta: 8, responsibilityDelta: 3 },
        { text: '走了五章才等到真機緣，直接上', nextPool: [{ next: 'ch5_ascend_no_anchor_death', weight: 72 }, { next: 'ch5_ascend_true', weight: 28 }], risk: '極高', exitWillDelta: -2 },
        { text: '不碰。知道它是真的也不等於一定要拿', next: 'ch5_final_crossroad', exitWillDelta: 12, responsibilityDelta: 4 }
      ]
    }),

    ch5_ascend_prepare: S('登仙台', '定命錨', [
      '檢查後你才知道，登仙台最好有一個「定命錨」：與你關係深的人在台外守住你這一世的名字。',
      '你若迷失，他把你叫回來。失敗時，他也可能神識受損甚至一起死。',
      '走到最後，連真正屬於你的機緣仍然在問同一件事：誰替你承擔風險？'
    ], {
      choices: [
        { text: '完整告知裴舟風險，讓他自己決定是否當錨', next: 'ch5_ascend_anchor_offer', responsibilityDelta: 8, trustDelta: 6 },
        { text: '領事命令裴舟守台。這是宗門任務', next: 'ch5_ascend_anchor_forced', riskShiftDelta: 12, factionSectDelta: 5, trustDelta: -10 },
        { text: '不要錨。機緣是你的，風險也只留給你', nextPool: [{ next: 'ch5_ascend_no_anchor_death', weight: 65 }, { next: 'ch5_ascend_true', weight: 35 }], responsibilityDelta: 8, risk: '極高' },
        { text: '放棄登仙台', next: 'ch5_final_crossroad', exitWillDelta: 10, responsibilityDelta: 4 }
      ]
    }),

    ch5_ascend_anchor_offer: S('登仙台', '他可以說不', [
      '你把最壞結果也說完。裴舟沉默很久，最後問：「如果我說不，你還會讓我留在外務嗎？」',
      '你說會。',
      '他這才點頭：「那我願意。」自由拒絕的條件不是一句「可以拒絕」，而是拒絕後真的不被懲罰。'
    ], {
      choices: [
        { text: '再等一天，確認天候與陣柱維護後開始', nextPool: [{ next: 'ch5_ascend_true', weight: 68 }, { next: 'ch5_ascend_storm_death', weight: 32 }], requires: { intel: 28, appraisal: 18 }, requireText: '需要情報 28、鑑別 18', responsibilityDelta: 4, risk: '高' },
        { text: '條件已經足夠，現在開始', nextPool: [{ next: 'ch5_ascend_true', weight: 52 }, { next: 'ch5_ascend_storm_death', weight: 48 }], risk: '極高' }
      ]
    }),

    ch5_ascend_anchor_forced: S('登仙台', '程序很乾淨', [
      '裴舟站到台外。宗門公文寫著「協助領事試錄」。他沒有拒絕。',
      '你已經知道，「沒有拒絕」和「能自由拒絕」不是同一件事。',
      '這一次你的機緣幾乎純粹屬於你，風險卻仍有一部分被權力壓到別人身上。'
    ], { choices: [{ text: '開始', nextPool: [{ next: 'ch5_ascend_true_dragon', weight: 64 }, { next: 'ch5_ascend_anchor_death', weight: 36 }], riskShiftDelta: 6, factionSectDelta: 4, risk: '極高' }] }),

    ch5_ascend_no_anchor_death: death('登仙台', '沒有人叫得回你', [
      '山瘴、石場、寄生草、城破、黑鏡，無數條命線的死前片段一起湧進來。',
      '你一度撐住，卻在最後開始分不清哪個名字屬於這一世。',
      '沒有錨。沒有人能從台外把「王狗蛋」叫回來。你的身體還坐著，神識已經散了。'
    ], '無定命錨啟動登仙台，神識被多條命線死亡殘念沖散。', '他沒有讓別人替自己冒險。\n最後也沒有人，\n能把他叫回來。', '把風險只留給自己可以是清楚的選擇，但登仙台的錨不只是替你受傷，也是功能性備援。拒絕外部風險同時會降低成功率。'),

    ch5_ascend_storm_death: death('登仙台', '一棵樹先倒下', [
      '你和裴舟都準備完整，陣紋也檢查過。神識只差最後一層收束。',
      '祖峰暴雨裡一棵老松被雷擊斷，倒下時砸斷一根早已腐朽的引靈柱。陣勢偏了一寸。',
      '沒有陰謀，沒有報應。只是設備老、天氣壞、時機差。你死在成功前一息。'
    ], '登仙台收束命線殘念時遭暴雨落雷引發陣柱斷裂，陣勢偏移導致神識崩散。', '他走到登仙台最後一步。\n一棵樹比他的悟性更早倒下。', '高成功率不是必然成功。重大突破也要把環境、維護、天候、退出條件與備援算進風險，而不是只看功法與意志。'),

    ch5_ascend_anchor_death: death('登仙台', '錨先斷了', [
      '殘念衝擊比預估更強。裴舟先吐血。',
      '你在陣中有一瞬知道，只要現在退出，兩個人都可能活；繼續則還有機會跨過門檻。',
      '你沒有退出。裴舟先倒，下一息你也失去這一世的名字。'
    ], '以權力要求隊友擔任登仙台定命錨，衝擊超限後未及時退出，兩人一同神識崩潰。', '他的機緣需要一個錨。\n錨斷時，\n他選擇把船也開出去。', '定命錨不是消耗品。任何高風險協作都需要明確中止條件；當保護者先失能時，繼續通常同時放大兩人的風險。'),

    ch5_ascend_true: survive('登仙台', '真入仙門', [
      '你睜開眼時，第一次能把那些死亡片段放在正確距離。它們仍然痛，卻不再像自己的傷口同時裂開。',
      '祖峰給你一枚內門試錄牌。不是正式內門，還要考核、爭資源、承擔風險。',
      '修仙是真的。變強是真的。活更久也可能是真的。所以最後的選擇才真正有重量。'
    ], '真機緣必須存在，否則「不修仙」沒有真正代價。你靠準備、關係與承擔降低風險後成功，但成功依然不是世界欠你的。', {
      ageAtEnd: 26,
      closestMoment: '成功收束相鄰命線殘念，拿到內門試錄牌',
      continueTo: 'ch5_final_crossroad',
      continueLabel: '最後：修仙，還是不修仙'
    }),

    ch5_ascend_true_dragon: survive('登仙台', '你也成功了', [
      '你成功跨過神識門檻，裴舟也活著，只是神識受損，需要休養一年。',
      '這個結果最麻煩：你用一個不乾淨的方法，真的拿到一個很好的結果。',
      '世界沒有替你安排報應。你甚至更有能力以後保護更多人。'
    ], '手段的倫理與結果的好壞不會自動對齊。殘酷方法可能成功，善意方法可能失敗；真正留下的是你之後如何理解與使用這份成功。', {
      ageAtEnd: 26,
      closestMoment: '讓隊友承擔定命風險後成功跨過內門門檻',
      continueTo: 'ch5_final_crossroad',
      continueLabel: '最後：你現在知道價錢了'
    }),

    ch5_final_crossroad: S('選擇修仙，還是不修仙', '不是「要不要變強」', [
      '走到這裡，問題已經不是「要不要變強」。',
      '真正的問題是：你要不要繼續參與這套會把風險往下傳的世界？',
      '繼續修不代表一定成為惡龍。你可以公開風險、把自己放進輪序、讓名冊更透明，也可能真的把一小段制度變好。',
      '不修也不代表高尚。你可能窮、老得快、失去保護家人的力量，看著同輩築基。兩邊都有真代價。'
    ], {
      choices: [
        { text: '繼續修。你願意承認每一次分配都算在自己身上', nextByState: [{ stat: 'riskShift', gte: 48, next: 'ch5_end_dragon' }, { stat: 'responsibility', gte: 32, next: 'ch5_end_reformer' }], next: 'ch5_end_sect', factionSectDelta: 5 },
        { text: '離開外務與上升競爭，保留一點修為做散修／凡人工作', nextByState: [{ stat: 'exitWill', gte: 28, next: 'ch5_end_mortal' }], next: 'ch5_end_half', exitWillDelta: 8 },
        { text: '若已拿到內門試錄牌，就進去；但不把成功說成正義', nextByState: [{ stat: 'responsibility', gte: 30, next: 'ch5_end_true' }, { stat: 'riskShift', gte: 45, next: 'ch5_end_dragon' }], next: 'ch5_end_sect', requires: { intel: 30 }, requireText: '需要情報 30' }
      ]
    }),

    ch5_end_dragon: survive('最終結局', '成為你曾經痛恨的那種人', [
      '十年後，你桌上有三十七個名字。新領事問北三洞缺人怎麼排。',
      '你說：「先按能力，再看誰最近拿過額外功。告知風險，願意去的加兩點。」',
      '每一句都有理由。你甚至比很多前任更透明、更少死人。',
      '只是你現在已經很少親自走第一個。你沒有變成純粹壞人。你變成一條很有效率的龍。'
    ], '弒龍者終成惡龍不是道德值滿格，而是你逐漸熟練把危險轉成名冊、獎勵、程序與可接受損耗。這條路甚至可能真的降低總死亡。', { ageAtEnd: 41, closestMoment: '坐到當年那些領事坐過的位置，開始用更成熟的方式分配風險' }),

    ch5_end_reformer: survive('最終結局', '你仍然修，但讓代價可見', [
      '你沒有離開宗門。你仍然帶隊、升職，也仍然會有人因你的決定受傷甚至死。',
      '你做的改變很小：高危名冊公開理由、拒絕不影響評等、每次領隊也進輪序、死亡報告保留名字與決策過程。',
      '制度沒有因此變成善良。只是下面的人第一次比較難被一句「按規矩」抹掉。',
      '你沒有殺掉惡龍。你只是坐到牠的位置後，沒有假裝自己沒有牙。'
    ], '繼續修仙不必等於黑化。真正可持續的改善通常很小：資訊對稱、退出權、透明分工、領隊不豁免、死亡可追責。', { ageAtEnd: 52, closestMoment: '仍在宗門裡，卻讓高危差事第一次可以真正說不' }),

    ch5_end_sect: survive('最終結局', '宗門耗材，升級版', [
      '你繼續留在宗門，也沒有特別想改變誰。',
      '你比第一章強很多，有靈石、有名冊、有幾個能報的名字。',
      '可只要再往上看，你仍然是另一層人的「可用」。你從耗材變成了管理耗材的人，自己仍在更大的名冊上。',
      '這不算失敗。只是修仙世界最普通、也最穩定的一種成功。'
    ], '階級上升不等於脫離體系。很多人不是成為最上層，而是從被分配者變成中間分配者，同時仍受更高層分配。', { ageAtEnd: 44, closestMoment: '有資格管理別人的風險，也仍被更上面的人管理' }),

    ch5_end_half: survive('最終結局', '半吊子散修', [
      '你離開外務堂，沒有完全廢掉修為。偶爾替人驗貨、護一小段路、教凡人怎麼辨最常見的修士騙局。',
      '你賺得比宗門領事少，護身資源也少。遇到真正的大妖，你還是得跑。',
      '可你很少再拿到一張需要替別人排死活的名冊。',
      '你沒有成仙，也沒有徹底回到凡人。這是一條不漂亮但能活的路。'
    ], '退出核心競爭不是清零風險。散修失去宗門保護與資源，但也能降低被迫替制度分配高危任務的頻率。', { ageAtEnd: 61, closestMoment: '保留一點修為，卻不再把上升當作唯一人生' }),

    ch5_end_mortal: survive('最終結局', '凡人不修仙', [
      '你最後沒有再追內門。你可能留在城南幫趙醫官，也可能替坊市抄書、做低階鑑物、教孩子煮水與認山霧。',
      '四十歲後腰開始痛。同輩有人築基，有人死，有人已經不記得你。',
      '有一年妖潮靠近，你第一次非常清楚地後悔自己不夠強。後來妖潮轉向，你又活了下來。',
      '不修仙沒有被世界蓋章成正確答案。你只是知道價錢後，選了一個自己願意付的版本。'
    ], '「不修仙」是合理勝利，不是真結局。它放棄壽命、力量、資源與部分保護，換來較少被捲入高階風險分配的生活。', { ageAtEnd: 68, closestMoment: '知道仙途是真的，仍然決定不把它走到底' }),

    ch5_end_true: survive('最終結局', '真入仙門', [
      '你拿著內門試錄牌走進下一道門。這一次沒有反轉告訴你「修仙都是假的」。',
      '功法是真的，壽命可能更長，力量也真的能保護一些人。',
      '你只是再也不能說自己不知道力量從哪裡來、安全常常由誰替誰擋、機緣的代價會落到誰身上。',
      '你選擇繼續。不是因為乾淨，而是因為知道不乾淨後，仍願意為自己的每一次分配負責。'
    ], '真入仙門是極罕見但真實的成功。它不是道德獎勵，而是玩家在完整理解風險後仍選擇繼續修行。', { ageAtEnd: 33, closestMoment: '知道修仙是什麼後，仍然走進內門' })
  };
})();
