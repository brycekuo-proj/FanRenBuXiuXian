window.CHAPTER2_SCENES = {
  ch2_contract_entry: {
    bookChapter: 2,
    chapter: '第二章・青雲宗雜役院',
    title: '三年短契',
    paragraphs: [
      '你活過了第一天試工。第二天清早，趙管事把昨天那塊灰木牌收回去，換成一張比木牌薄得多、也重得多的紙。',
      '「試工過了。簽三年短契，才算正式留用。」',
      '契紙很薄，字很多。你識得其中大半，偏偏最小的那幾行最難懂。',
      '你看見一句：服役期間因宗門差遣致傷亡者，各安天命。',
      '再往下，是保人欄。趙管事說，家中有親族就寫，死了方便送信。',
      '第一章裡，山門外的死多半像意外。第二章第一張真正屬於你的宗門文書，已經替你的死留好位置。'
    ],
    choices: [
      { text: '把最小的字一條條問清楚', next: 'ch2_contract_question', moment: '第一次要求宗門解釋契紙' },
      { text: '後面還有人排隊，直接按手印', nextPool: [
        { next: 'ch2_contract_signed', weight: 78 },
        { next: 'ch2_contract_ink_death', weight: 22 }
      ], risk: '未知', moment: '在三年短契上按下手印' },
      { text: '不簽。趁現在還能下山就走', next: 'ch2_refuse_roll', risk: '中', moment: '在宗門內第一次說不' }
    ]
  },

  ch2_contract_question: {
    bookChapter: 2,
    chapter: '第二章・契紙',
    title: '誰來解釋規矩',
    paragraphs: [
      '你指著「各安天命」問，出了事到底怎麼辦。',
      '趙管事說：「照規矩辦。」',
      '你又問照哪條規矩。',
      '他終於抬頭。後面八十幾個人也一起看你，因為你每多問一句，他們就多站一會。',
      '趙管事把筆一擱：「吃住宗門出，每月兩枚靈砂，做滿三年可參加一次外門補錄。傷了先送醫館，欠費從工錢扣。死了有籍貫便送信，有保人便結帳。」',
      '你聽懂了一半。另一半不是聽不懂，是你第一次知道「結帳」也可以跟死人放在同一句話裡。'
    ],
    choices: [
      { text: '至少問過了，簽', next: 'ch2_contract_signed', moment: '知道契紙由宗門解釋' },
      { text: '問保人是不是也要替你還帳', next: 'ch2_guarantor_warning', risk: '低', moment: '注意到保人欄不只是送信' },
      { text: '越問越不想簽，離開', next: 'ch2_refuse_roll', risk: '中' }
    ]
  },

  ch2_guarantor_warning: {
    bookChapter: 2,
    chapter: '第二章・契紙',
    title: '保人',
    paragraphs: [
      '趙管事沒有回答「是」或「不是」。',
      '他只把契紙轉過來，指著另一行更小的字：差遣損耗、器物欠賠、醫館欠費，依名下資財與保籍追補。',
      '「規矩都寫著。」',
      '你想到母親。也想到第一章裡，凡人最常聽見的一句話，就是有權替你做決定的人說自己沒辦法。',
      '你可以不寫保人。但沒有保人，有些好差事不會派給你；出了事，也沒人知道你死在哪。'
    ],
    choices: [
      { text: '不寫家人，只寫原籍', next: 'ch2_contract_signed', moment: '第一次把家人從自己的仙途風險裡拿開' },
      { text: '寫母親。至少出了事有人知道', next: 'ch2_contract_signed', moment: '把青溪村寫進宗門契紙' },
      { text: '這張紙不值得三年，走', next: 'ch2_refuse_roll', risk: '中' }
    ]
  },

  ch2_contract_ink_death: {
    bookChapter: 2,
    chapter: '第二章・契紙',
    title: '防偽',
    type: 'death',
    ageAtDeath: 17,
    closestMoment: '通過青雲宗雜役試工',
    death: {
      cause: '契紙手印使用鎖靈砂防止修士竄改，你的凡人傷口卻受不住印泥。',
      epitaph: '此地長眠著王狗蛋，享年十七。\n他還沒正式替仙門做事，\n先被仙門的防偽手續送走。'
    },
    intel: '規矩通常是為有能力破壞規矩的人設計的。凡人只是順便承受。',
    paragraphs: [
      '你割破手指按印。傷口很小，晚上卻開始發黑。',
      '醫館學徒說印泥混了鎖靈砂，防修士以靈氣改手印。',
      '你說自己不是修士。',
      '他說：「對啊。」',
      '兩人都沉默了一下。'
    ]
  },

  ch2_refuse_roll: {
    bookChapter: 2,
    chapter: '第二章・下山',
    title: '拒簽',
    paragraphs: [
      '你把筆放回去。',
      '趙管事沒有為難你，甚至把路引還給你。',
      '「下山吧。」',
      '原來拒絕真的可以。只是可以離開，不代表離開之後世界會替你把路擦乾。',
      '午後山裡開始落雨。你身上只剩兩日乾糧，最近的驛站在天黑前未必趕得到。'
    ],
    randomNexts: [
      { next: 'ch2_refuse_alive', weight: 58 },
      { next: 'ch2_refuse_death', weight: 42 }
    ],
    waitMs: 1050
  },

  ch2_refuse_alive: {
    bookChapter: 2,
    chapter: '第二章・凡人結局',
    title: '這次真的走掉了',
    type: 'survival',
    ageAtEnd: 62,
    closestMoment: '通過青雲宗雜役試工後拒絕簽契',
    intel: '契不能一概簽，也不能一概不簽。你真正買到的是知道誰有權解釋那張紙。',
    paragraphs: [
      '你在雨裡摔了兩次，第三次學會扶著石壁走。',
      '天黑前你沒到驛站，只找到一間破土地廟。你餓了一夜，卻活著下了山。',
      '後來你在鎮上替人抄契書。你還是不喜歡小字，但開始知道，小字不是因為不重要才寫得小。',
      '你沒有成仙。你只是比很多成仙的人更早學會看契紙。'
    ]
  },

  ch2_refuse_death: {
    bookChapter: 2,
    chapter: '第二章・下山',
    title: '避過宗門',
    type: 'death',
    ageAtDeath: 17,
    closestMoment: '成功拒絕三年短契',
    death: {
      cause: '拒簽宗門契約後趕夜路下山，雨中失足墜下石階。',
      epitaph: '此地長眠著王狗蛋，享年十七。\n他成功避開了三年苦役。\n代價是沒活到第三天。'
    },
    intel: '正確的判斷不保證好的結果。世界不是考卷。',
    paragraphs: [
      '你為了趕在天黑前到驛站，抄了近路。',
      '石階上長著一層很薄的青苔。',
      '你摔下去時忽然覺得荒謬：宗門確實沒有害你。',
      '這次只是雨。'
    ]
  },

  ch2_contract_signed: {
    bookChapter: 2,
    chapter: '第二章・留用',
    title: '二十七個缺',
    paragraphs: [
      '山門外願意簽契的有八十三個。雜役房只缺二十七人。',
      '你原本以為沒靈根才會被挑剩。後來才發現，雜役也不是想當就能當。',
      '管事看年紀、手腳、力氣、識不識字、會不會種田、家住哪裡，甚至問父親做什麼。',
      '一個十七歲、身體壯、會算帳的少年因父親是縣衙書吏被劃掉。沒人說哪裡不合。',
      '你忽然懂了：有些差事除了要能幹活，最好還要出了事沒人太會追問。',
      '輪到你，趙管事問：「會什麼？」'
    ],
    choices: [
      { text: '有力氣，能搬能抬', next: 'ch2_haul_first', qiDelta: -4, moment: '被分進靈石搬運隊' },
      { text: '識幾個字，也會簡單算帳', next: 'ch2_ledger_first', moment: '被分進帳房抄錄' },
      { text: '身子一般，但鼻子靈，認得些山草', next: 'ch2_herbfield_first', moment: '被藥堂挑去藥田' }
    ]
  },

  ch2_haul_first: {
    bookChapter: 2,
    chapter: '第二章・搬運隊',
    title: '第一車',
    paragraphs: [
      '搬運隊的工錢比普通雜役多半枚靈砂。',
      '你第一天就知道為什麼。',
      '一只木箱要四個人抬，箱角貼著符，底板有細灰。監工說靈石不能摔，至於人，只說「自己站穩」。',
      '牛大站在你對面。他比你壯一圈，抬棍往肩上一架：「跟著我，別亂動。」',
      '箱子剛離地，你聞到一點乾燥的礦粉味。也可能只是你太緊張。'
    ],
    choices: [
      { text: '先看箱角、繩結和地上的粉，再抬', nextPool: [
        { next: 'ch2_haul_ordinary', weight: 46 },
        { next: 'ch2_haul_leak_seen', weight: 34 },
        { next: 'ch2_haul_theft_seen', weight: 20 }
      ], qiDelta: -5, moment: '學會先看箱子，不只看工錢' },
      { text: '牛大都抬了，自己別顯得怕事', nextPool: [
        { next: 'ch2_haul_ordinary', weight: 48 },
        { next: 'ch2_haul_powder_death', weight: 25 },
        { next: 'ch2_haul_crush_death', weight: 27 }
      ], qiDelta: -14, risk: '高', moment: '肩膀真正碰過靈石箱' },
      { text: '讓旁邊新人換到你的位置先試一車', next: 'ch2_haul_other_first', moment: '第一次在宗門裡把風險往旁邊推' }
    ]
  },

  ch2_haul_ordinary: {
    bookChapter: 2,
    chapter: '第二章・搬運隊',
    title: '今天只是重',
    paragraphs: [
      '這一箱沒有漏粉，沒有暗符，也沒有誰偷靈石。',
      '它就只是很重。',
      '你們抬了十二趟，肩膀磨破一層皮。傍晚領工時，監工照數發了靈砂，甚至沒少你。',
      '你有一瞬間懷疑自己是不是太多疑。',
      '陳瘸子晚飯時聽完，只說：「今天沒事，跟明天有什麼關係？」'
    ],
    choices: [
      { text: '記住：正常的差事也會存在', next: 'ch2_dorm_night', coinDelta: 1, qiDelta: -5, moment: '安全搬完一整天靈石' },
      { text: '既然安全，明天多接一車', next: 'ch2_haul_first', qiDelta: -4, risk: '中' }
    ]
  },

  ch2_haul_leak_seen: {
    bookChapter: 2,
    chapter: '第二章・搬運隊',
    title: '箱子漏了',
    paragraphs: [
      '你在抬之前看見箱底有一條比木紋更直的細縫。',
      '縫裡積著灰白粉末。牛大說以前也見過，擦掉就好。',
      '你沒有立刻碰。找來監工後，他先罵你耽誤工，接著用靴尖刮了一下粉。',
      '靴底冒出一點白煙。',
      '他沉默兩息，改口叫器房來人。',
      '你今天少了一趟工錢，也少了一次把手掌磨爛的機會。'
    ],
    choices: [
      { text: '少賺就少賺，換另一箱', next: 'ch2_dorm_night', coinDelta: -1, moment: '靠多看一眼避過碎靈粉' },
      { text: '既然監工處理過，再去幫忙清粉', next: 'ch2_haul_powder_death', risk: '高' }
    ]
  },

  ch2_haul_theft_seen: {
    bookChapter: 2,
    chapter: '第二章・搬運隊',
    title: '少一塊',
    paragraphs: [
      '箱底沒裂，符也完整。真正不對的是重量。',
      '牛大抬到一半低聲說：「比早上輕。」',
      '你們在轉角停下，看見前一班雜役的袖口鼓了一小塊。',
      '你不知道他偷的是靈石，還是替誰拿。',
      '告發可能有賞，也可能只是替某個你看不見的人指出證人。'
    ],
    choices: [
      { text: '裝作沒看見，把自己的箱送到', next: 'ch2_dorm_night', moment: '知道有些缺口不該急著補' },
      { text: '向監工說箱子重量不對，但不點名', next: 'ch2_senior_intro', moment: '學會只說自己確定的事' },
      { text: '直接指出偷東西的人', nextPool: [
        { next: 'ch2_dorm_night', weight: 45 },
        { next: 'ch2_senior_letter_death', weight: 55 }
      ], risk: '高' }
    ]
  },

  ch2_haul_other_first: {
    bookChapter: 2,
    chapter: '第二章・搬運隊',
    title: '別人的肩',
    paragraphs: [
      '你說自己昨夜扭了肩，請旁邊叫高七的新人換位。',
      '高七看你一眼，沒有多想。他也想留下。',
      '第一箱平安。第二箱也平安。',
      '第三箱下坡時，前棍突然一滑，高七整個人跪下去。箱角擦著他耳邊砸在石階上。',
      '他沒死，只折了兩根手指。監工先看箱，再看他。',
      '你今天沒有受傷。這件事很難說是不是你害的，也很難說你完全沒有得到好處。'
    ],
    choices: [
      { text: '替高七把剩下的工做完', next: 'ch2_dorm_night', qiDelta: -12, moment: '把推給別人的工又扛回一部分' },
      { text: '裝作那只是輪班，照常領工錢', next: 'ch2_senior_intro', coinDelta: 1, moment: '第一次靠別人受傷保住自己' }
    ]
  },

  ch2_haul_powder_death: {
    bookChapter: 2,
    chapter: '第二章・搬運隊',
    title: '碎靈粉',
    type: 'death',
    ageAtDeath: 17,
    closestMoment: '正式替青雲宗搬運靈石',
    death: {
      cause: '靈石箱破損，碎靈粉從傷口進入經脈，夜間靈壓灼傷而亡。',
      epitaph: '此地長眠著王狗蛋，享年十七。\n他終於碰到真正的靈氣。\n醫館說，位置不太對。'
    },
    intel: '宗門不用刻意殺人。只要讓最便宜的人去處理昂貴物品的損耗。',
    paragraphs: [
      '粉末沾上掌心時只是發熱。你把手往衣服上擦了擦。',
      '夜裡那股熱順著手臂往上爬。',
      '你第一次清楚感到有東西沿經脈流動。',
      '可惜不是你想要的那種引氣入體。'
    ]
  },

  ch2_haul_crush_death: {
    bookChapter: 2,
    chapter: '第二章・搬運隊',
    title: '接箱',
    type: 'death',
    ageAtDeath: 17,
    closestMoment: '替青雲宗抬過完整靈石箱',
    death: {
      cause: '下坡搬運時前工失足，你為保住靈石箱沒有放棍，被箱體拖倒壓死。',
      epitaph: '此地長眠著王狗蛋。\n箱子沒有摔壞。\n宗門對這件事相當滿意。'
    },
    intel: '有些地方的優先順序寫得很清楚：先貨，再人。',
    paragraphs: [
      '牛大腳下一滑。監工第一聲喊的是：「接箱！」',
      '你本能把肩往上一頂。',
      '箱子穩住半息。你沒穩住。',
      '四個人最後真的保住了箱。只是其中三個人站著。'
    ]
  },

  ch2_ledger_first: {
    bookChapter: 2,
    chapter: '第二章・帳房',
    title: '會識字的好處',
    paragraphs: [
      '識字讓你被分到帳房。第一個月，你沒有斷骨、沒有中毒，只有手指磨出繭。',
      '你抄工簿時發現「暴病」兩字出現得比山下多。',
      '藥田暴病，丹房暴病，礦洞暴病。',
      '一張舊頁上原本寫著「毒」，旁邊有人用新墨改成「病」。',
      '老帳房看見你停筆，問：「你識字多久了？」',
      '你說五年。他把筆遞給你：「那再學一個字。」'
    ],
    choices: [
      { text: '照他的意思，把「毒」改成「病」', next: 'ch2_ledger_live', moment: '學會有些字看懂也要裝不懂' },
      { text: '問這些人到底怎麼死的', nextPool: [
        { next: 'ch2_ledger_warning', weight: 62 },
        { next: 'ch2_rules_question_death', weight: 38 }
      ], risk: '中' },
      { text: '偷偷記住幾個名字，不問', next: 'ch2_ledger_names', moment: '第一次看見宗門耗材名單' }
    ]
  },

  ch2_ledger_live: {
    bookChapter: 2,
    chapter: '第二章・帳房',
    title: '這個字叫活',
    paragraphs: [
      '你把「毒」劃掉，改成「病」。',
      '老帳房點頭，沒有誇你。',
      '那天你第一次明白，識字確實能讓人活久一點。前提是知道哪些字不能看懂。',
      '月底你領到完整工錢。你也開始被叫去替外門弟子抄一些私人名冊。',
      '安全的差事常常只是比較晚才讓你看見代價。'
    ],
    choices: [
      { text: '繼續做，先活下來', next: 'ch2_dorm_night', coinDelta: 1, moment: '在帳房安全活過一個月' },
      { text: '趁能看帳，多找找外門補錄規矩', next: 'ch2_manual_offer', moment: '從舊工簿找到補錄日期' }
    ]
  },

  ch2_ledger_warning: {
    bookChapter: 2,
    chapter: '第二章・帳房',
    title: '問到哪裡算多',
    paragraphs: [
      '老帳房沒有立刻回答。',
      '他把門關了一半，才說：「有些真是病。有些不是。你若每個都要弄清楚，最後帳上也會有人問你是怎麼病的。」',
      '他不是威脅你。至少聽起來不是。',
      '你獲得了一點情報，也同時讓別人知道你會追問。'
    ],
    choices: [
      { text: '到此為止', next: 'ch2_senior_intro', moment: '知道宗門的病字有很多意思' },
      { text: '記住名字，日後再查', next: 'ch2_ledger_names', risk: '低' }
    ]
  },

  ch2_ledger_names: {
    bookChapter: 2,
    chapter: '第二章・帳房',
    title: '高七還在帳上',
    paragraphs: [
      '你沒有抄走任何紙，只把幾個名字記在腦子裡。',
      '其中一個叫高七。你明明昨天還在飯堂見過他，工簿上卻已經先寫了「調東坡」。',
      '另一個名字旁邊有死亡折銀，銀子卻尚未支出。',
      '帳比人先知道人會去哪。',
      '你不知道這是正常排班、預先造冊，還是有人已經替某些人的結局留了格子。'
    ],
    choices: [
      { text: '提醒高七看看自己的差牌', next: 'ch2_senior_intro', moment: '第一次提醒別人看自己的名字' },
      { text: '別插手。你連自己都保不住', next: 'ch2_dorm_night', moment: '選擇不替別人追問' }
    ]
  },

  ch2_herbfield_first: {
    bookChapter: 2,
    chapter: '第二章・藥田',
    title: '三瓢與兩瓢半',
    paragraphs: [
      '藥田看起來比靈石庫安靜。水渠整齊，靈草成排，連土都像被人仔細梳過。',
      '周婆子交給你木瓢：「東畦三瓢黑水，西畦兩瓢半。白花別聞，銀線別踩。」',
      '你問黑水是什麼。她說肥水。',
      '你再問銀線是什麼。她說看見就別踩。',
      '第一章讓你學會看蟲、聞味、問代價。問題是第二章裡，連知道得更多的人也未必願意講完。'
    ],
    choices: [
      { text: '照數澆，不多碰任何東西', nextPool: [
        { next: 'ch2_herbfield_normal', weight: 58 },
        { next: 'ch2_herbfield_blackwater', weight: 24 },
        { next: 'ch2_herbfield_silver', weight: 18 }
      ], qiDelta: -6, moment: '第一次替宗門照料靈草' },
      { text: '白花只是聞一下，不碰總沒事', nextPool: [
        { next: 'ch2_herbfield_flower_normal', weight: 48 },
        { next: 'ch2_herbfield_flower_death', weight: 52 }
      ], risk: '高', moment: '聞過宗門藥田的白花' },
      { text: '先找老雜役問黑水和銀線到底是什麼', next: 'ch2_herbfield_ask', coinDelta: -1, moment: '用一頓飯換藥田情報' }
    ]
  },

  ch2_herbfield_normal: {
    bookChapter: 2,
    chapter: '第二章・藥田',
    title: '今天只是肥水',
    paragraphs: [
      '黑水今天真的只是混過靈獸糞與草木灰的肥水。',
      '銀線也只是寒星草浮在土面的細根。',
      '你照數澆完，手上只有臭味，沒有毒。',
      '周婆子甚至給了你半塊餅。',
      '你開始理解一件令人不舒服的事：不是每個警告後面都有陷阱。若你把所有警告都當騙局，也活不久。'
    ],
    choices: [
      { text: '把今天當今天，不把它背成答案', next: 'ch2_dorm_night', qiDelta: 2, moment: '安全做完一天藥田' },
      { text: '覺得自己已經摸懂藥田，主動接聞藥差事', next: 'ch2_herbfield_smell_job', risk: '中' }
    ]
  },

  ch2_herbfield_blackwater: {
    bookChapter: 2,
    chapter: '第二章・藥田',
    title: '上游換了桶',
    paragraphs: [
      '第一瓢沒事。第二瓢時，你手背開始發癢。',
      '你停下來，看見今天水面比昨天多一層很薄的油光。',
      '周婆子趕來罵了一句上游丹房，叫所有人停手。',
      '原來昨夜有人把洗爐水接錯渠。',
      '規矩沒有錯。黑水這個名字也沒錯。錯的是今天上游換了一桶。'
    ],
    choices: [
      { text: '立刻洗手去醫館，工錢不要了', next: 'ch2_dorm_night', coinDelta: -1, qiDelta: -8, moment: '看見同一條水渠也會換真相' },
      { text: '只剩半畦，澆完再說', next: 'ch2_herbfield_blackwater_death', risk: '極高' }
    ]
  },

  ch2_herbfield_blackwater_death: {
    bookChapter: 2,
    chapter: '第二章・藥田',
    title: '黑水',
    type: 'death',
    ageAtDeath: 17,
    closestMoment: '在青雲宗藥田照料過真正靈植',
    death: {
      cause: '丹房洗爐水誤接藥田水渠，你在皮膚出現異狀後仍繼續澆灌，藥毒由傷口入體。',
      epitaph: '此地長眠著王狗蛋。\n規矩說東畦三瓢。\n他一瓢也沒少。\n只是今天水不一樣。'
    },
    intel: '遵守舊規矩之前，還要確認今天的環境是不是昨天那個環境。',
    paragraphs: [
      '手背發癢時，你想只剩半畦。',
      '第三瓢下去，指節開始腫。',
      '周婆子趕來時先聞了水，又往上游看。',
      '她罵的是丹房。你的身體沒有等她罵完。'
    ]
  },

  ch2_herbfield_silver: {
    bookChapter: 2,
    chapter: '第二章・藥田',
    title: '銀線動了一下',
    paragraphs: [
      '你踩到畦邊時，土面那條銀線縮了一寸。',
      '根不會這樣縮。至少你在山下沒見過。',
      '你停住。旁邊另一個新雜役沒看見，木屐直接壓了下去。',
      '銀線彈起來，像極細的蟲，纏住他腳踝。',
      '周婆子一鏟子把那截土整塊挖走。她第一句是：「今天誰放它跑出畦的？」'
    ],
    choices: [
      { text: '退開，記住會動比叫什麼更重要', next: 'ch2_senior_intro', moment: '看見銀線其實是活物' },
      { text: '幫被纏住的人扯開銀線', nextPool: [
        { next: 'ch2_dorm_night', weight: 55 },
        { next: 'ch2_herbfield_blackwater_death', weight: 45 }
      ], risk: '高' }
    ]
  },

  ch2_herbfield_flower_normal: {
    bookChapter: 2,
    chapter: '第二章・藥田',
    title: '白花只是花',
    paragraphs: [
      '你屏住一半呼吸，靠近聞了一下。',
      '有點甜。沒有暈，沒有幻覺，也沒有毒。',
      '周婆子看見後罵你：「那株今天沒開透，當然沒事。」',
      '你問開透會怎樣。她叫你明天自己看，但別拿鼻子看。',
      '一次沒出事，最大的風險是你開始把運氣誤認成常識。'
    ],
    choices: [
      { text: '到此為止，不再試第二次', next: 'ch2_senior_intro', moment: '一次冒險沒出事但沒有當成答案' },
      { text: '既然沒事，主動接聞藥差事', next: 'ch2_herbfield_smell_job', risk: '高' }
    ]
  },

  ch2_herbfield_flower_death: {
    bookChapter: 2,
    chapter: '第二章・藥田',
    title: '醉魂花',
    type: 'death',
    ageAtDeath: 17,
    closestMoment: '在青雲宗藥田照料真正靈植',
    death: {
      cause: '近聞成熟醉魂花，神識昏迷後跌入藥渠，吸入混藥肥水。',
      epitaph: '此地長眠著王狗蛋。\n他只是聞了一下。\n花也只是開了一下。'
    },
    intel: '「只是看、只是聞、只是碰一下」不是風險等級。要看那東西是什麼。',
    paragraphs: [
      '甜味進鼻時，你先覺得很舒服。',
      '你甚至想，周婆子是不是太小題大作。',
      '下一刻藥田往旁邊倒。',
      '其實不是藥田倒，是你。'
    ]
  },

  ch2_herbfield_ask: {
    bookChapter: 2,
    chapter: '第二章・藥田',
    title: '一頓飯的情報',
    paragraphs: [
      '你把晚飯的一半給陳瘸子，問黑水、白花、銀線。',
      '他說黑水大多是肥水，但上游丹房偶爾接錯渠；白花有幾種，不開透時連他也分不清；銀線有時是根，有時是寄生蟲。',
      '你說這不就等於什麼都沒說？',
      '陳瘸子看你一眼：「有說。看今天，不要背昨天。」',
      '這答案沒有讓事情變安全，只讓你知道該注意哪些變化。'
    ],
    choices: [
      { text: '回去照數做，但每次先看水色與銀線', next: 'ch2_herbfield_normal', qiDelta: -4, moment: '學會看今天，不背昨天' },
      { text: '藥田太麻煩，申請換差', next: 'ch2_dorm_night', coinDelta: -1, moment: '付代價離開藥田' }
    ]
  },

  ch2_herbfield_smell_job: {
    bookChapter: 2,
    chapter: '第二章・藥堂',
    title: '聞藥的差事',
    paragraphs: [
      '周婆子說你鼻子還行，叫你替藥堂分三只沒有標籤的小瓶。',
      '「開塞，聞一下，辛辣放左、腥甜放右、沒味道放中間。」',
      '你問為什麼沒標籤。她說搬庫時掉了。',
      '聽起來合理。問題是，合理不等於瓶裡只是普通藥粉。'
    ],
    choices: [
      { text: '照吩咐聞，但每瓶只開一道縫', nextPool: [
        { next: 'ch2_dorm_night', weight: 62 },
        { next: 'ch2_herbfield_flower_death', weight: 20 },
        { next: 'ch2_senior_intro', weight: 18 }
      ], risk: '中', moment: '替藥堂驗過無標藥瓶' },
      { text: '要求周婆子先確認瓶底批號', next: 'ch2_senior_intro', moment: '知道先查瓶子，不只聞內容' },
      { text: '把這個差事讓給想賺工分的人', next: 'ch2_dorm_night', moment: '第一次把高工錢差事讓給別人' }
    ]
  },

  ch2_dorm_night: {
    bookChapter: 2,
    chapter: '第二章・雜役房',
    title: '半夜點名',
    paragraphs: [
      '十八人一間的長屋到了子時忽然有人敲門。',
      '「臨時差遣，來五個。丹房搬藥渣，兩倍工。」',
      '屋裡沒人動。靠門的少年家裡欠債，白天還說想多攢靈砂寄回去。他慢慢坐起來。',
      '陳瘸子在黑暗裡咳了一聲。很輕。',
      '門外補一句：「只搬藥渣，不進爐房。」',
      '危險聽起來被說小了。也可能它本來就小。'
    ],
    choices: [
      { text: '兩倍工，去', nextPool: [
        { next: 'ch2_night_job_safe', weight: 55 },
        { next: 'ch2_night_job_injury', weight: 30 },
        { next: 'ch2_night_job_death', weight: 15 }
      ], risk: '中', coinDelta: 1, moment: '第一次接宗門夜間臨時差' },
      { text: '裝睡，明天照正常班', next: 'ch2_senior_intro', moment: '放棄兩倍工換睡眠' },
      { text: '先問陳瘸子那聲咳是什麼意思', next: 'ch2_dorm_chen', moment: '開始讀老雜役的暗示' }
    ]
  },

  ch2_dorm_chen: {
    bookChapter: 2,
    chapter: '第二章・雜役房',
    title: '嗓子癢',
    paragraphs: [
      '你壓低聲音問陳瘸子。',
      '他說：「嗓子癢。」',
      '你不信。',
      '他又說：「上個月的藥渣只是苦。再上個月有妖獸膽。今天是哪批，我不知道。」',
      '老人沒有給你答案，不是因為高深，是因為他也不知道今天和昨天是不是同一批。'
    ],
    choices: [
      { text: '不知道就不賭，睡', next: 'ch2_senior_intro' },
      { text: '至少知道要戴手套，去', nextPool: [
        { next: 'ch2_night_job_safe', weight: 72 },
        { next: 'ch2_night_job_injury', weight: 28 }
      ], coinDelta: 1, qiDelta: -5, risk: '低' }
    ]
  },

  ch2_night_job_safe: {
    bookChapter: 2,
    chapter: '第二章・丹房外',
    title: '今晚沒有死人',
    paragraphs: [
      '今晚的藥渣真的只是焦掉的草根和爐灰。',
      '五個人搬到寅時，人人一身臭味，沒人中毒。',
      '你領到兩倍工，回房時天都快亮了。',
      '第二天正常班照樣點名。宗門沒有因為你昨晚替它多做一班，就替你少算今天。'
    ],
    choices: [
      { text: '撐著去上工', next: 'ch2_senior_intro', qiDelta: -14, coinDelta: 1, moment: '安全賺到一次兩倍工' },
      { text: '請半天病假，扣工就扣工', next: 'ch2_senior_intro', coinDelta: -1, qiDelta: 4, moment: '花工錢買半天睡眠' }
    ]
  },

  ch2_night_job_injury: {
    bookChapter: 2,
    chapter: '第二章・丹房外',
    title: '藥渣裡的東西',
    paragraphs: [
      '第三筐裡混著一塊破掉的妖獸膽囊。',
      '不是你先碰到，是旁邊少年割破了手。傷口很快腫起來。',
      '管事叫人把他送醫館，又催你們把剩下兩筐搬完。',
      '你第一次真正看見「有人出事」與「工作繼續」可以同時發生。'
    ],
    choices: [
      { text: '陪他去醫館，今晚工錢不要了', next: 'ch2_senior_intro', coinDelta: -1, moment: '第一次為別人放掉自己的工' },
      { text: '把剩下的搬完，明早再去看他', next: 'ch2_senior_intro', qiDelta: -8, coinDelta: 1, moment: '看見有人受傷而工作沒有停' }
    ]
  },

  ch2_night_job_death: {
    bookChapter: 2,
    chapter: '第二章・丹房外',
    title: '兩倍工',
    type: 'death',
    ageAtDeath: 17,
    closestMoment: '在仙門內靠臨時差賺到雙倍工錢',
    death: {
      cause: '搬運混有妖獸膽液的藥渣，傷口中毒後無力支付醫館費用。',
      epitaph: '此地長眠著王狗蛋。\n他那一夜拿兩倍工。\n醫館收三倍。'
    },
    intel: '高工錢不是危險證明，但往往是有人願意多付一點，換你先承擔不確定。',
    paragraphs: [
      '你只是在搬最後一筐時被竹刺扎了一下。',
      '天亮前手臂腫到肩。',
      '醫館說能治。價錢比你三個月工錢還多。',
      '宗門確實包吃住。醫藥另計。'
    ]
  },

  ch2_senior_intro: {
    bookChapter: 2,
    chapter: '第二章・外門邊緣',
    title: '叫你一聲師弟',
    paragraphs: [
      '第三天，或者第三十天，一名青衣青年在雜役院叫住你。',
      '「新來的？哪裡人？」',
      '他姓鄭，外門弟子。進山以來，第一次有人不是叫你「喂」或編號。',
      '「按規矩，你們也算半個同門。叫我鄭師兄就行。」',
      '半個同門四個字很香。香到你差點忘了，他接著問你識不識字、家裡幾口、想不想學吐納。',
      '最後他拿出一封信：「有件小事，幫師兄跑一趟西峰。」'
    ],
    choices: [
      { text: '只是送信，替師兄跑一趟', nextPool: [
        { next: 'ch2_senior_letter_safe', weight: 58 },
        { next: 'ch2_senior_letter_trouble', weight: 25 },
        { next: 'ch2_senior_letter_death', weight: 17 }
      ], risk: '中', moment: '第一次被外門弟子叫師弟' },
      { text: '請他在你的差牌上留字，證明是他叫你去', next: 'ch2_senior_written', moment: '第一次要求師兄留下責任痕跡' },
      { text: '說自己今日有班，婉拒', next: 'ch2_rules_night', moment: '得罪一點人情換掉一次未知差事' }
    ]
  },

  ch2_senior_written: {
    bookChapter: 2,
    chapter: '第二章・外門邊緣',
    title: '留個字',
    paragraphs: [
      '鄭師兄的笑停了半息。',
      '「你倒謹慎。」',
      '你說西峰守門若問起，自己一個雜役總要有憑據。',
      '理由很正。鄭師兄最後真的在差牌背面寫了一個「鄭」字。',
      '這一筆不保證你安全，只讓事情真出問題時，比完全沒有痕跡多一點談判的東西。',
      '他從此也知道，你不是最好使的那種人。'
    ],
    choices: [
      { text: '拿著差牌去送信', nextPool: [
        { next: 'ch2_senior_letter_safe', weight: 76 },
        { next: 'ch2_senior_letter_trouble', weight: 24 }
      ], qiDelta: -5, moment: '拿到師兄親筆差遣痕跡' },
      { text: '他臉色已變，乾脆不去', next: 'ch2_rules_night' }
    ]
  },

  ch2_senior_letter_safe: {
    bookChapter: 2,
    chapter: '第二章・西峰',
    title: '真的只是送信',
    paragraphs: [
      '這一次，信真的只是信。',
      '守門弟子看了鄭師兄名字便放你進去。沈師姐收信後連封口都沒拆，只說：「辛苦。」',
      '你平安回來。鄭師兄也守信用，丟給你半頁吐納抄本。',
      '被利用不代表一定沒有得到。真正麻煩的是，你很容易因為第一次拿到東西，就把這個人從「要判斷」改成「可信」。'
    ],
    choices: [
      { text: '半頁也是功法，收著但先不練', next: 'ch2_rules_night', moment: '拿到半頁真正吐納抄本' },
      { text: '趁他對你有好感，再問完整一點', next: 'ch2_manual_offer', moment: '開始接觸殘缺功法' }
    ]
  },

  ch2_senior_letter_trouble: {
    bookChapter: 2,
    chapter: '第二章・西峰',
    title: '收信的人不對',
    paragraphs: [
      '你到西峰時，沈師姐不在。另一名弟子問你手上是什麼。',
      '你照鄭師兄交代說只能交本人。',
      '對方笑了：「一個雜役，也跟我講規矩？」',
      '事情沒有立刻變成刀光。更麻煩的是，他記住了你。',
      '你最後把信帶回去，鄭師兄先皺眉，過一會才說你做得對。',
      '你分不清他是真的認同，還是因為這封信沒落到別人手上。'
    ],
    choices: [
      { text: '不追問信裡是什麼', next: 'ch2_rules_night', moment: '知道完成差事不等於知道差事' },
      { text: '問鄭師兄自己差點為什麼惹事', next: 'ch2_manual_offer', risk: '低' }
    ]
  },

  ch2_senior_letter_death: {
    bookChapter: 2,
    chapter: '第二章・西峰',
    title: '替人送信',
    type: 'death',
    ageAtDeath: 17,
    closestMoment: '被外門弟子叫過一聲師弟',
    death: {
      cause: '替外門弟子遞送私人信件，捲入同門私怨後被當成知情雜役處理。',
      epitaph: '此地長眠著王狗蛋。\n信不是他寫的。\n事不是他惹的。\n名字最後倒是他自己的。'
    },
    intel: '「只是跑腿」描述的是動作，不是你正在替誰承擔哪一段因果。',
    paragraphs: [
      '你沒拆信，也沒有偷看。',
      '問題恰恰是你把它完整送到了不該在場的人眼前。',
      '當晚執法堂來問話時，你只知道鄭師兄讓你送。',
      '這句真話不足以證明你無辜，只足以證明你確實在場。'
    ]
  },

  ch2_rules_night: {
    bookChapter: 2,
    chapter: '第二章・外門規矩',
    title: '三十七條',
    paragraphs: [
      '雜役房牆上貼著三十七條規矩。',
      '夜鐘三響後不得離房；見內門弟子須停步讓路；未奉差牌不得入西峰；不許私藏靈石碎屑。',
      '你開始覺得規矩至少比人可靠。',
      '當夜三更，鐘已響過，窗外忽然傳來很低的呻吟。',
      '「救……救我……」',
      '聲音就在院牆外。規矩說不能出去。第一章學過的常識則說，聲音也可能是人，也可能不是。'
    ],
    choices: [
      { text: '守規矩，不出去', nextPool: [
        { next: 'ch2_rules_ignore_real', weight: 35 },
        { next: 'ch2_rules_ignore_safe', weight: 65 }
      ], moment: '第一次把宗門規矩放在人聲之前' },
      { text: '拿燈出去看一眼', nextPool: [
        { next: 'ch2_rules_rescue', weight: 34 },
        { next: 'ch2_rules_beast_death', weight: 33 },
        { next: 'ch2_rules_trap', weight: 33 }
      ], risk: '高', moment: '夜鐘後踏出雜役房' },
      { text: '不出去，先把陳瘸子和其他人叫醒', nextPool: [
        { next: 'ch2_rules_rescue', weight: 45 },
        { next: 'ch2_rules_ignore_safe', weight: 55 }
      ], qiDelta: -3, moment: '用別人的判斷分攤未知' }
    ]
  },

  ch2_rules_ignore_real: {
    bookChapter: 2,
    chapter: '第二章・夜鐘後',
    title: '真的有人',
    paragraphs: [
      '你沒有出去。呻吟到後半夜才停。',
      '天亮後，牆外躺著一個巡夜雜役。他從坡上摔下來，腿折了，爬到院牆外求救。',
      '人還活著，但失血太多。',
      '管事沒有罰你。因為你確實守了規矩。',
      '那人被抬走時也沒有罵你。這反而更難受。'
    ],
    choices: [
      { text: '規矩沒錯，但它也沒有替人負責', next: 'ch2_manual_offer', moment: '第一次因守規矩看別人差點死' }
    ]
  },

  ch2_rules_ignore_safe: {
    bookChapter: 2,
    chapter: '第二章・夜鐘後',
    title: '今晚不出去是對的嗎',
    paragraphs: [
      '你忍到天亮。牆外沒有屍體，也沒有血。',
      '只有草叢裡一排奇怪的四趾腳印，一直延伸到後山。',
      '陳瘸子看了一眼，說去年靈獸棚跑過一隻會學人聲的東西。',
      '你這次沒出去，確實比較好。',
      '可你不能把「夜裡求救別理」背成答案，因為昨月牆外真的摔過人。'
    ],
    choices: [
      { text: '記住徵兆，不記固定答案', next: 'ch2_manual_offer', moment: '學會同一聲求救也可能有不同真相' }
    ]
  },

  ch2_rules_rescue: {
    bookChapter: 2,
    chapter: '第二章・夜鐘後',
    title: '牆外的人',
    paragraphs: [
      '你沒有一個人衝出去，而是叫醒兩個人，帶繩和燈到門邊。',
      '牆外真有巡夜雜役摔斷腿。',
      '你們把他拖進來，天亮後一起挨罵：夜鐘後擅動。',
      '好處是人活了。壞處是每人扣三日工。',
      '宗門不是不知道你救人，只是它仍然要讓違規有成本，否則下一次所有人都能拿「救人」當理由亂跑。'
    ],
    choices: [
      { text: '認罰。至少知道自己為什麼付', next: 'ch2_manual_offer', coinDelta: -1, moment: '用三日工換一條別人的腿' }
    ]
  },

  ch2_rules_beast_death: {
    bookChapter: 2,
    chapter: '第二章・夜鐘後',
    title: '呻吟不是人',
    type: 'death',
    ageAtDeath: 18,
    closestMoment: '在青雲宗內活到能聽懂部分外門規矩',
    death: {
      cause: '夜鐘後循仿人聲離院，遭逃逸靈獸伏擊。',
      epitaph: '此地長眠著王狗蛋。\n他聽見有人喊救命。\n那東西後來學會了他的聲音。'
    },
    intel: '善意不是護身符。先確認自己面對的是什麼，並不等於冷血。',
    paragraphs: [
      '你提燈靠近草叢。',
      '裡面又叫了一聲你的名字。',
      '你從沒告訴它你的名字。',
      '這個念頭來得比爪子慢了一點。'
    ]
  },

  ch2_rules_trap: {
    bookChapter: 2,
    chapter: '第二章・夜鐘後',
    title: '有人在抓違規的人',
    paragraphs: [
      '你走到門邊，呻吟立刻停了。',
      '兩名執法堂弟子從暗處出來。',
      '原來最近有人夜裡偷靈藥，他們故意用留音符引人出門，看誰違規。',
      '你不是賊，但你出來了。',
      '差別最後體現在處分輕重，不體現在你有沒有處分。'
    ],
    choices: [
      { text: '認違規，交代自己只是聽見求救', next: 'ch2_manual_offer', coinDelta: -1, moment: '知道有些規矩還會被拿來釣人' },
      { text: '跟執法堂爭到底', next: 'ch2_rules_question_death', risk: '高' }
    ]
  },

  ch2_rules_question_death: {
    bookChapter: 2,
    chapter: '第二章・規矩',
    title: '問得太細',
    type: 'death',
    ageAtDeath: 18,
    closestMoment: '開始看懂宗門名冊與規矩如何運作',
    death: {
      cause: '持續追查雜役死亡與外門差遣紀錄，被調往高危差事後死於事故。',
      epitaph: '此地長眠著王狗蛋。\n他只是多問了幾句。\n宗門沒有不准問。\n只是後來很缺搬礦的人。'
    },
    intel: '資訊有價。追問也會讓別人重新評估你適合被放在哪裡。',
    paragraphs: [
      '沒有人當場殺你。',
      '三天後，你的名字被調去東坡礦隊。',
      '調令上理由寫得很公整：人手所需。',
      '兩個月後東坡塌了一次。'
    ]
  },

  ch2_manual_offer: {
    bookChapter: 2,
    chapter: '第二章・殘缺功法',
    title: '《小周天引氣訣》',
    paragraphs: [
      '做滿一段日子後，你終於摸到一份真正屬於青雲宗的入門抄本。',
      '不是秘傳。是外門淘汰下來的舊本，缺角、缺前置篇，旁邊還有好幾種不同筆跡的註解。',
      '第一頁寫：氣入鼻而不滯，意守臍下而不強。',
      '旁註卻有人寫：不痛不入脈，痛則加行。',
      '你想起山下那本三文錢假功法也寫過「痛則通」。',
      '這次書是真的。問題是旁註未必是真的，版本也未必適合你。'
    ],
    choices: [
      { text: '先照正文慢慢試，不理旁註', nextPool: [
        { next: 'ch2_qi_real', weight: 38 },
        { next: 'ch2_qi_stomach', weight: 32 },
        { next: 'ch2_qi_dust', weight: 18 },
        { next: 'ch2_manual_pain_death', weight: 12 }
      ], qiDelta: -6, moment: '第一次修真正宗門吐納法' },
      { text: '拿去問教習或老雜役，先確認版本', next: 'ch2_manual_ask', coinDelta: -1, moment: '第一次替功法找第二個來源' },
      { text: '機會難得，按旁註加行催氣', next: 'ch2_manual_pain_death', risk: '極高', moment: '強催真正功法' }
    ]
  },

  ch2_manual_ask: {
    bookChapter: 2,
    chapter: '第二章・殘缺功法',
    title: '完整不在封面',
    paragraphs: [
      '教習看了一眼，說正文是真的，版本也是真的。',
      '然後他翻到最前面：「你的前置篇呢？」',
      '你說拿到時就沒有。',
      '他又看旁註，冷笑：「這是誰寫的？」',
      '你不知道。',
      '真正的功法、缺掉的前置、陌生人的註解，可以同時出現在同一本書裡。完整不完整，不看封面。'
    ],
    choices: [
      { text: '補抄前置篇再練', nextPool: [
        { next: 'ch2_qi_real', weight: 58 },
        { next: 'ch2_qi_stomach', weight: 28 },
        { next: 'ch2_qi_dust', weight: 14 }
      ], coinDelta: -1, qiDelta: -4, moment: '補到缺失的功法前置篇' },
      { text: '先把修煉放一放，準備外門補錄', next: 'ch2_exam_notice', moment: '選擇先保住身體再考外門' }
    ]
  },

  ch2_qi_real: {
    bookChapter: 2,
    chapter: '第二章・引氣',
    title: '像一條小魚',
    paragraphs: [
      '某一夜，你腹下真的多了一點與呼吸不同的東西。',
      '它很細，像一條小魚從水草間滑過。',
      '你不敢高興太早，只照正文讓它走一寸就停。',
      '沒有鐘聲，沒有霞光，也沒有人推門說你是天才。',
      '第二天你照樣要去上工。',
      '真正靠近仙途的第一步，居然和你想像中最不像。'
    ],
    choices: [
      { text: '每天只練一點，先不耽誤上工', next: 'ch2_exam_notice', qiDelta: 4, moment: '真正感到一絲氣感' },
      { text: '今晚再多走幾寸，趁熱打鐵', nextPool: [
        { next: 'ch2_exam_notice', weight: 45 },
        { next: 'ch2_manual_pain_death', weight: 55 }
      ], risk: '高' }
    ]
  },

  ch2_qi_stomach: {
    bookChapter: 2,
    chapter: '第二章・引氣',
    title: '只是胃',
    paragraphs: [
      '你腹中一熱，激動得一夜沒睡。',
      '第二天教習摸了摸你的脈，又問昨晚吃什麼。',
      '你說豆飯。',
      '他沉默一下：「那是胃。」',
      '你很失望。但至少這次失望沒有要你的命。'
    ],
    choices: [
      { text: '承認判斷錯了，繼續慢慢練', next: 'ch2_exam_notice', qiDelta: -2, moment: '第一次把胃痛和氣感分開' },
      { text: '教習不懂你的體質，自己再催一次', next: 'ch2_manual_pain_death', risk: '高' }
    ]
  },

  ch2_qi_dust: {
    bookChapter: 2,
    chapter: '第二章・引氣',
    title: '靈塵入體',
    paragraphs: [
      '你每次在靈石庫下工後吐納，都能感到一點熱。休假不去靈石庫時卻沒有。',
      '教習聽完，把你的鼻孔和袖口看了一遍。',
      '「不是引氣。碎靈塵吸多了。」',
      '醫館讓你休三天。',
      '有些靠近仙途的感覺，真的只是工作環境太差。'
    ],
    choices: [
      { text: '休息三天，少賺三天工', next: 'ch2_exam_notice', coinDelta: -1, qiDelta: 7, moment: '分清靈塵與引氣' },
      { text: '工不能停，照常搬', next: 'ch2_haul_powder_death', risk: '高' }
    ]
  },

  ch2_manual_pain_death: {
    bookChapter: 2,
    chapter: '第二章・殘缺功法',
    title: '把疼當突破',
    type: 'death',
    ageAtDeath: 18,
    closestMoment: '修過真正的青雲宗入門功法',
    death: {
      cause: '以殘缺或錯註版本強催吐納，經脈受損後仍誤認為突破徵兆。',
      epitaph: '此地長眠著王狗蛋。\n這次功法是真的。\n他死於真的功法裡那句假的旁註。'
    },
    intel: '真東西裡可以混著錯資訊。來源可信，不代表每一行都適合你。',
    paragraphs: [
      '胸口開始刺痛時，你想起旁註：痛則加行。',
      '你沒有停。',
      '第二輪痛得更厲害，你反而以為自己終於摸到門。',
      '門確實開了。只是另一邊不是外門。'
    ]
  },

  ch2_exam_notice: {
    bookChapter: 2,
    chapter: '第二章・外門補錄',
    title: '門裡還有門',
    paragraphs: [
      '三年短契還沒滿，外門補錄告示先貼了出來。',
      '雜役只要年限、工簿與身體達標，交報名費，就能參加三關：測靈盤、一百零八階、執事問答。',
      '陳瘸子說自己年輕時也考過。',
      '你問差多少。',
      '「一階。」',
      '他說得很平，像那一階不是石階，而是二十年。'
    ],
    choices: [
      { text: '報名。至少這次門是真的', next: 'ch2_exam_steps', coinDelta: -2, qiDelta: -4, moment: '站上外門補錄的一百零八階' },
      { text: '不考，做滿契再走', next: 'ch2_contract_end', moment: '放棄一次外門補錄' },
      { text: '錢不夠，找鄭師兄借報名費', nextPool: [
        { next: 'ch2_exam_steps', weight: 58 },
        { next: 'ch2_senior_letter_death', weight: 42 }
      ], risk: '中', moment: '第一次為外門資格欠師兄人情' }
    ]
  },

  ch2_exam_steps: {
    bookChapter: 2,
    chapter: '第二章・外門補錄',
    title: '一百零八階',
    paragraphs: [
      '第二關是一百零八級青石階。不能跑，不能用藥，日落前到頂。',
      '看起來比第一章山路公平。至少每個人都看得見終點。',
      '走到六十階時開始有人喘。八十階時有人吐。九十階時前面一個少年腿軟，往後倒。',
      '你離他兩步。',
      '扶他，可能一起掉出時限；不扶，可能看著他一路滾下去。',
      '這一章終於把「看別人死」放到你伸手能碰到的距離。'
    ],
    choices: [
      { text: '扶住他，哪怕慢一點', nextPool: [
        { next: 'ch2_exam_fail_help', weight: 48 },
        { next: 'ch2_exam_pass', weight: 32 },
        { next: 'ch2_exam_help_death', weight: 20 }
      ], qiDelta: -10, risk: '中', moment: '在九十階伸手拉過另一個雜役' },
      { text: '先保住自己，側身繞過', nextPool: [
        { next: 'ch2_exam_pass', weight: 55 },
        { next: 'ch2_exam_fail', weight: 45 }
      ], moment: '在補錄石階上選擇不伸手' },
      { text: '趁別人都慢了，咬牙衝最後十八階', nextPool: [
        { next: 'ch2_exam_pass', weight: 38 },
        { next: 'ch2_exam_steps_death', weight: 62 }
      ], qiDelta: -16, risk: '極高', moment: '衝過外門補錄最後一段' }
    ]
  },

  ch2_exam_fail_help: {
    bookChapter: 2,
    chapter: '第二章・外門補錄',
    title: '差一刻',
    paragraphs: [
      '你把那少年拉住。你們都沒滾下去。',
      '代價是你到頂時鐘已敲過。',
      '執事看了看沙漏：「逾時。」',
      '你想說剛才有人差點摔死。',
      '他點頭：「我看見了。」',
      '然後在你名字旁寫了一個「不取」。他沒有惡意。規則也沒有因你的善意多長出一行。'
    ],
    choices: [
      { text: '回雜役房，繼續把契做完', next: 'ch2_contract_end', moment: '救下一個人，但失去一次補錄' }
    ]
  },

  ch2_exam_fail: {
    bookChapter: 2,
    chapter: '第二章・外門補錄',
    title: '差一階',
    paragraphs: [
      '你沒有停，但最後仍差一階。',
      '不是有人害你，也不是測靈盤壞了。',
      '你今天就是走不到。',
      '這種失敗反而最難怪誰。',
      '陳瘸子晚飯時看見你，挪了半個饅頭過來：「現在知道那一階多高了？」'
    ],
    choices: [
      { text: '知道了。把契做完再說', next: 'ch2_contract_end', moment: '外門補錄差一階' },
      { text: '明年再考，先續一年', next: 'ch2_contract_end', coinDelta: -1, moment: '為下一次補錄多留一年' }
    ]
  },

  ch2_exam_steps_death: {
    bookChapter: 2,
    chapter: '第二章・外門補錄',
    title: '九十四階',
    type: 'death',
    ageAtDeath: 19,
    closestMoment: '距離外門資格只剩十四階',
    death: {
      cause: '外門補錄石階上強行提速，氣血耗盡後失足墜落。',
      epitaph: '此地長眠著王狗蛋。\n他離外門只差十四階。\n從上面看，倒是很近。'
    },
    intel: '越接近成功，越容易把剩下的距離看小。身體不會因終點很近就少算十四階。',
    paragraphs: [
      '你開始跑。',
      '九十三。九十四。',
      '腳下忽然像不是自己的。',
      '你第一章從山路摔過。這次石階更整齊，摔得也更整齊。'
    ]
  },

  ch2_exam_help_death: {
    bookChapter: 2,
    chapter: '第二章・外門補錄',
    title: '兩個人一起下去',
    type: 'death',
    ageAtDeath: 19,
    closestMoment: '在外門補錄九十階伸手救人',
    death: {
      cause: '拉住失足考生時自身重心被帶走，兩人一同墜下石階。',
      epitaph: '此地長眠著王狗蛋。\n他伸了手。\n這次手不夠長。'
    },
    intel: '救人可以是好事，也可以需要能力、位置與工具。善意不會自動補足力量差。',
    paragraphs: [
      '你抓住他手腕。',
      '他比你想像中重。',
      '你後腳踩住石階邊緣，鞋底滑了一寸。',
      '那一寸把兩個人的故事一起往下拉。'
    ]
  },

  ch2_exam_pass: {
    bookChapter: 2,
    chapter: '第二章・外門補錄',
    title: '灰衣換青邊',
    paragraphs: [
      '你過了。沒有雷聲，也沒有長老親迎。',
      '管事只是把你灰衣袖口縫上一圈青邊，名冊從「雜役」挪到「記名」。',
      '你盯著那圈青邊看了很久。它很窄，卻是你幾世以來真正靠自己多走出的一點距離。',
      '第二天，一隊新雜役來搬貨。領頭少年看見你袖口，恭恭敬敬叫：「師兄。」',
      '你愣了一下。',
      '然後管事把差牌交給你：「帶他們把東坡那批箱搬完。日落前要到。」'
    ],
    choices: [
      { text: '讓新人先歇一刻，自己承擔晚交的責任', next: 'ch2_outer_rest', coinDelta: -1, moment: '第一次成為能讓別人少冒一點險的人' },
      { text: '照時限催。規矩就是規矩', nextPool: [
        { next: 'ch2_outer_push', weight: 60 },
        { next: 'ch2_outer_push_death', weight: 40 }
      ], moment: '第一次把宗門壓力往下交' },
      { text: '先問這批箱為什麼非得日落前到', next: 'ch2_outer_question', moment: '有了青邊後仍先問差事代價' }
    ]
  },

  ch2_outer_rest: {
    bookChapter: 2,
    chapter: '第二章・記名弟子',
    title: '第一次當師兄',
    type: 'survival',
    continueTo: 'ch3_call_entry',
    continueLabel: '收到藥谷徵召',
    ageAtEnd: 20,
    closestMoment: '成為青雲宗外門記名弟子',
    intel: '你第一次有能力讓別人少承擔一點風險。這不是終點，只是第五章那個問題第一次有了反方向的答案。',
    paragraphs: [
      '你讓那群新人喝水歇了一刻。箱子晚了半炷香。',
      '你被扣了當月一部分工分，沒有被逐出外門。',
      '其中一個新雜役手一直在抖。你後來才知道，他前一晚發熱。',
      '你沒有救世界，只是讓一個人今天沒有在坡道上倒下。',
      '晚上你低頭看自己的青邊。你開始明白，往上爬之後真正難的不是不被吃，而是你會不會開始學著吃下面的人。'
    ]
  },

  ch2_outer_push: {
    bookChapter: 2,
    chapter: '第二章・記名弟子',
    title: '日落前',
    type: 'survival',
    continueTo: 'ch3_call_entry',
    continueLabel: '收到藥谷徵召',
    ageAtEnd: 21,
    closestMoment: '第一次負責帶一隊雜役',
    intel: '世界會獎勵把壓力往下傳的人。真正可怕的不是你變壞，而是你發現這樣真的比較有效。',
    paragraphs: [
      '你照時限催。那批箱準時到了。',
      '管事第一次誇你辦事利落，工簿上還多了一筆。',
      '一個新雜役肩膀磨爛，另一個回房後發燒。都沒死。',
      '這讓事情顯得可以接受。',
      '你第一次很清楚地感到：把風險往下推，真的會得到獎勵。',
      '弒龍者不會在某一天突然長出鱗片。有時只是先學會一句：「再撐一下，日落前要到。」'
    ]
  },

  ch2_outer_push_death: {
    bookChapter: 2,
    chapter: '第二章・記名弟子',
    title: '第一次當師兄',
    type: 'death',
    ageAtDeath: 20,
    closestMoment: '成為青雲宗外門記名弟子',
    death: {
      cause: '催趕雜役運送有問題的靈石箱，事故後被追究帶隊責任。',
      epitaph: '此地長眠著王狗蛋。\n他終於能叫別人快一點。\n後來上面也叫他負責一點。'
    },
    intel: '權力不只讓你能把風險往下推，也會讓上面終於找到一個能簽字的人。',
    paragraphs: [
      '你催得很成功。直到其中一箱裂開。',
      '新人受傷兩個，箱損一只。',
      '管事拿出差牌，上面領隊欄第一次寫的是你的名字。',
      '你忽然很想念以前只負責抬東西的日子。'
    ]
  },

  ch2_outer_question: {
    bookChapter: 2,
    chapter: '第二章・記名弟子',
    title: '先問一句',
    paragraphs: [
      '你問為什麼非得日落前送到。',
      '管事有些不耐，最後說東坡夜裡要封陣，晚了就得等明天。',
      '不是什麼天大秘密。只是晚一天會耽誤器房。',
      '你再問能不能拆兩隊。管事算了算，居然同意。',
      '有些危險不是陰謀，只是大家都嫌麻煩所以一直沿用最省事的方法。',
      '你有了比雜役多一點點說話的資格。它仍然很小，但第一次真的改變了一件事。'
    ],
    choices: [
      { text: '拆兩隊，晚一點但別把人逼死', next: 'ch2_outer_rest', moment: '第一次用一點身份改掉差事安排' },
      { text: '既然只是效率問題，那照舊催', next: 'ch2_outer_push', moment: '知道可以改，最後仍選擇效率' }
    ]
  },

  ch2_contract_end: {
    bookChapter: 2,
    chapter: '第二章・契滿',
    title: '三年到了',
    paragraphs: [
      '你沒有進外門。至少這一世沒有。',
      '三年短契終於走到最後。宗門真的讓你選：離山、續契，或拿著工錢去青石坊市另找活路。',
      '你站在山門內往外看。三年前你從外面看進來，以為門後是另一種人生。',
      '現在你知道裡面有白米、有真功法、有靈石，也有小字、工簿、醫館欠費與一批批替換的人。',
      '你沒有得到答案。你只是比三年前更知道每個選項會吃掉什麼。'
    ],
    choices: [
      { text: '回青溪村。這一次真的不修了', next: 'ch2_end_mortal', moment: '活著做滿三年宗門短契' },
      { text: '再簽三年。你已經比新人會活', next: 'ch2_end_stay', moment: '自願第二次簽下宗門契約' },
      { text: '去青石坊市。至少那裡先談價錢', next: 'ch2_end_market', moment: '從宗門走向真正修仙坊市' }
    ]
  },

  ch2_end_mortal: {
    bookChapter: 2,
    chapter: '第二章・凡人結局',
    title: '回村',
    type: 'survival',
    ageAtEnd: 66,
    closestMoment: '在青雲宗活過完整三年短契',
    intel: '你沒有成仙，但你帶回了真正有用的世界知識。這也是一種資產。',
    paragraphs: [
      '你回青溪村時，母親先認出你的走路姿勢，再認出你的臉。',
      '你沒有帶仙丹，只帶回一些靈砂、幾張用過的藥方和一身看人做事的習慣。',
      '後來村裡有人發熱、中了普通藥毒，你比從前的郎中更早知道哪些情況不能拖。',
      '你沒成仙，但活到六十多歲。村人仍說你當年若再努力一點，也許能進外門。',
      '你通常只笑，不解釋。'
    ]
  },

  ch2_end_stay: {
    bookChapter: 2,
    chapter: '第二章・雜役院',
    title: '你成了陳瘸子',
    type: 'survival',
    ageAtEnd: 47,
    closestMoment: '在青雲宗雜役院活到新人開始問你規矩',
    intel: '留下不是一定失敗。只是當你成為知道很多的人，也會開始決定哪些話要不要告訴新人。',
    paragraphs: [
      '你又簽了三年。後來再三年。',
      '某一天，新雜役問你夜裡有人敲門能不能去。',
      '你張口想把所有故事都說完，最後只咳了一聲。',
      '不是你故作高深。',
      '是你真的不知道今晚門外會是哪一種。',
      '你忽然想起陳瘸子。原來有些人不是不肯給答案，是活久了才知道答案不存在。'
    ]
  },

  ch2_end_market: {
    bookChapter: 2,
    chapter: '第二章・山門外',
    title: '坊市的燈',
    type: 'survival',
    ageAtEnd: 21,
    closestMoment: '帶著宗門三年經驗離開青雲山',
    intel: '這是一條離開宗門的存活人生。正式第三章藥谷秘境只承接仍留在青雲宗、已取得記名／外門資格的路線。',
    paragraphs: [
      '你背著包袱走出山門。',
      '遠處青石坊市的燈一盞盞亮起。有人說那裡比宗門自由，功法有錢就能買，消息也比山上靈通。',
      '陳瘸子聽說你要去，只笑了一聲。',
      '「坊市好啊。」',
      '你問哪裡好。',
      '他把碗裡最後一口粥喝掉。',
      '「騙你的人至少先跟你談價錢。」',
      '這條人生往青石坊市繼續，但你不會被列進藥谷徵召名冊。'
    ]
  }
};
