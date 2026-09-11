(() => {
  const S = (section, title, paragraphs, extra = {}) => ({
    bookChapter: 4,
    chapter: `第四章・${section}`,
    title,
    paragraphs,
    ...extra
  });

  const death = (section, title, paragraphs, cause, epitaph, intel, extra = {}) =>
    S(section, title, paragraphs, {
      type: 'death',
      ageAtDeath: 21,
      closestMoment: extra.closestMoment || title,
      death: { cause, epitaph },
      intel,
      ...extra
    });

  const survive = (section, title, paragraphs, intel, extra = {}) =>
    S(section, title, paragraphs, { type: 'survival', ageAtEnd: extra.ageAtEnd || 42, intel, ...extra });

  window.CHAPTER4_SCENES = {
    ch4_descent_entry: S('下山任務', '那枚玉簡，最後在誰手上？', [
      '第三章最後，外門堂問的不是你傷得重不重，而是那枚玉簡最後在誰手上。',
      '你沒有立刻回答。三天後，柳執事的名下多出一件白石仙城送藥公差，而你的名字剛好在上面。',
      '你領到青木腰牌、封口公文、三塊路費靈石，還有一張只能動用一次的柳家通符。',
      '你第一次不是因為太弱被盯上。是因為你終於有了一點值得別人注意的東西。'
    ], {
      choices: [
        { text: '接差事，但先查柳執事與白石城最近的往來', next: 'ch4_descent_check', intelDelta: 8, factionSectDelta: 2, moment: '第一次在下山前查自己的靠山' },
        { text: '宗門正式公差，直接出發', next: 'ch4_descent_toll', factionSectDelta: 3, moment: '帶著宗門公文第一次下山' },
        { text: '先問同行師兄陳槐：這差事以前死過人嗎？', next: 'ch4_descent_chen', intelDelta: 4, moment: '先問活著回來的人' }
      ]
    }),

    ch4_descent_check: S('下山任務', '宗門有姓了', [
      '檔房只肯讓你看公開往來。柳執事每季都會讓人送藥去白石城，並不罕見。',
      '奇怪的是，最近兩次公差都在萬珍閣拍賣日附近。',
      '你沒有查到陰謀。只知道這趟可能不只是送藥。'
    ], {
      choices: [{ text: '把疑點記著，和陳槐出發', next: 'ch4_descent_toll', intelDelta: 3 }]
    }),

    ch4_descent_chen: S('下山任務', '活人的版本', [
      '陳槐說，送藥本身不算危險。真正麻煩的是進城後有人會問你認識誰、替誰辦事、手上有沒有能賣的東西。',
      '他又補一句：「下山後最貴的不是情報，是讓別人知道你知道哪條情報值錢。」',
      '你還沒進城，先學到一條城市規矩。'
    ], {
      choices: [{ text: '出發', next: 'ch4_descent_toll', intelDelta: 4 }]
    }),

    ch4_descent_toll: S('下山任務', '宗門的路也收錢', [
      '下山半里，一座木亭攔住官道。亭裡的人沒有宗門衣袍，桌上卻擺著青雲宗路引印。',
      '陳槐熟練地交了碎銀。你問為什麼宗門的路還要收宗門弟子的錢。',
      '「不是宗門收，是替宗門看路的人收。」',
      '離開山門不是走出規矩，只是從寫在牆上的規矩走進沒人替你寫下來的規矩。'
    ], {
      choices: [
        { text: '照陳槐做，付錢過亭', next: 'ch4_descent_watcher', spiritStoneDelta: -1, factionSectDelta: 1 },
        { text: '亮青雲腰牌，問憑什麼收', nextPool: [
          { next: 'ch4_descent_toll_waived', weight: 55 },
          { next: 'ch4_descent_toll_grudge', weight: 45 }
        ], factionSectDelta: 2, risk: '中' },
        { text: '繞小路，不把行程留在亭子', next: 'ch4_descent_detour', qiDelta: -8, wantedDelta: 1, risk: '中' }
      ]
    }),

    ch4_descent_toll_waived: S('下山任務', '背景替你省了一點', [
      '亭裡人看了腰牌，最後揮手讓路。',
      '你第一次感到宗門身份的好處：它沒有讓所有人跪下，只替你省了一點錢。',
      '真正讓普通人想攀背景的，往往就是這種每天都能少付一點的地方。'
    ], { choices: [{ text: '繼續走', next: 'ch4_descent_watcher', factionSectDelta: 2 }] }),

    ch4_descent_toll_grudge: S('下山任務', '他讓路，也記住你', [
      '亭裡人沒有硬攔，只笑著說：「青雲宗的師兄，當然不用。」',
      '他讓路時多看了你的臉兩眼。',
      '背景替你省了錢，也替你留下了一個人情緒很不好的目擊者。'
    ], { choices: [{ text: '繼續走', next: 'ch4_descent_watcher', wantedDelta: 1, intelDelta: 2 }] }),

    ch4_descent_detour: S('下山任務', '沒有免費的隱私', [
      '小路確實沒人收錢，也沒人登記。',
      '代價是你們多走三個時辰，藥箱封條被樹枝刮出一道痕。',
      '你保住行程隱私，卻多了一個交貨時需要解釋的異常。'
    ], { choices: [{ text: '趕路補時間', next: 'ch4_descent_watcher', qiDelta: -5, intelDelta: 2 }] }),

    ch4_descent_watcher: S('下山任務', '第三次看見同一個人', [
      '第一晚客棧，你看見木亭附近那個灰衣人。',
      '第二天渡口，他還在。第三次出現時，他沒有躲，甚至朝你點了點頭。',
      '陳槐只說一句：「看得出來，就當沒看出來。」'
    ], {
      choices: [
        { text: '花錢請腳夫穿舊青袍走另一條路，測他跟誰', nextPool: [
          { next: 'ch4_descent_decoy_goods', weight: 55 },
          { next: 'ch4_descent_decoy_person', weight: 45 }
        ], spiritStoneDelta: -1, intelDelta: 6, karmaDelta: -2 },
        { text: '不動，觀察他是看人、看貨還是看腰牌', next: 'ch4_descent_watch_observe', intelDelta: 8, qiDelta: -2 },
        { text: '直接堵住他問清楚', nextPool: [
          { next: 'ch4_descent_watch_debt', weight: 40 },
          { next: 'ch4_descent_watch_liu', weight: 35 },
          { next: 'ch4_descent_watch_hostile', weight: 25 }
        ], risk: '高' }
      ]
    }),

    ch4_descent_decoy_goods: S('下山任務', '他沒有跟衣服', [
      '腳夫穿著你的舊青袍往北。灰衣人連頭都沒抬，只盯著藥箱。',
      '你花一塊靈石買到一條情報：至少這一世，他主要盯的是貨。',
      '測試有效，而且沒有人受傷。'
    ], { choices: [{ text: '收回判斷，不再多做', next: 'ch4_descent_corpse', intelDelta: 8 }] }),

    ch4_descent_decoy_person: S('下山任務', '腳夫少了半隻耳朵', [
      '灰衣人真的跟走。三個時辰後，腳夫哭著跑回來，左耳被割掉一半。',
      '他只是替你穿了一件衣服。',
      '你知道對方盯的是你。代價是一個不相干的人替你先碰了一次風險。'
    ], {
      choices: [
        { text: '賠他治傷錢，再走', next: 'ch4_descent_corpse', spiritStoneDelta: -1, karmaDelta: 4, intelDelta: 10 },
        { text: '他收了工錢，風險本來就算進去', next: 'ch4_descent_corpse', blackCreditDelta: 2, karmaDelta: -8, intelDelta: 10 }
      ]
    }),

    ch4_descent_watch_observe: S('下山任務', '他怕的是你回頭', [
      '你故意換了兩次藥箱位置，又讓陳槐單獨進茶棚。',
      '灰衣人不跟衣服，也不盯陳槐，只在你離藥箱太遠時起身。',
      '你仍不知道他替誰做事，但至少知道他要的是「你與貨之間的關係」。'
    ], { choices: [{ text: '夠了，不把調查變成新的危險', next: 'ch4_descent_corpse', intelDelta: 8 }] }),

    ch4_descent_watch_debt: S('下山任務', '原來不是你', [
      '灰衣人先愣，隨後問陳槐：「十一塊，打算什麼時候還？」',
      '你這才知道他是丹鋪債主的人。',
      '同一個跟蹤徵兆，背後根本不是你的玉簡。你若先動手，等於替師兄打了一場債務架。'
    ], { choices: [{ text: '讓陳槐自己處理，繼續上路', next: 'ch4_descent_debt', intelDelta: 8 }] }),

    ch4_descent_watch_liu: S('下山任務', '柳執事的人', [
      '灰衣人沒有否認。他只說：「貨若少一株，我先倒楣。」',
      '柳執事並不一定懷疑你，只是不願讓一批藥完全靠兩個外門弟子的自覺。',
      '監視可以很難看，也可以只是制度成本。'
    ], { choices: [{ text: '記住這點，繼續走', next: 'ch4_descent_corpse', factionSectDelta: 3, intelDelta: 6 }] }),

    ch4_descent_watch_hostile: death('下山任務', '問得太早', [
      '灰衣人沒有回答。你剛靠近，他袖中細針已經出手。',
      '你擋下一根，沒擋第二根。對方搜過藥箱與公文後，沒有拿走藥。',
      '他只確認了一件事：這批貨確實和柳家有關。'
    ], '在官道上直接逼問身份不明的跟蹤者，被淬毒暗器擊殺。', '此地長眠著王狗蛋。\n他終於問清了一件事。\n可惜答案在對方袖子裡。', '有人跟蹤只是徵兆。先確認對方在看誰、怕什麼、是否介意被發現，通常比直接逼問更有價值。'),

    ch4_descent_corpse: S('下山任務', '官道旁的屍體', [
      '路邊一具男人屍體，右手五指全黑，錢袋卻還鼓著。',
      '陳槐看一眼就繞。你注意到袖口偶爾落出細白粉。',
      '半個時辰後，一支凡人商隊從後面過來。一名年輕夥計已經看見那只錢袋。'
    ], {
      choices: [
        { text: '先看風向，再遠遠提醒別靠近', nextPool: [
          { next: 'ch4_descent_corpse_saved', weight: 55 },
          { next: 'ch4_descent_corpse_swarm', weight: 45 }
        ], intelDelta: 5, karmaDelta: 4 },
        { text: '不喊，自己先離開未知風險', nextPool: [
          { next: 'ch4_descent_corpse_debtpaper', weight: 55 },
          { next: 'ch4_descent_corpse_guilt', weight: 45 }
        ], karmaDelta: -2 },
        { text: '走近查身份牌和死因', next: 'ch4_descent_corpse_swarm', appraisalDelta: 4, risk: '極高' }
      ]
    }),

    ch4_descent_corpse_saved: S('下山任務', '這次提醒有用', [
      '風往林子吹，你讓商隊從上風處繞。',
      '沒有人碰錢袋。後來驛站來人處理，才知道白粉是會受熱裂開的蟲卵。',
      '你沒有靠近，也沒有讓整隊人停在下風處。這次善意和風險管理剛好站在同一邊。'
    ], { choices: [{ text: '繼續趕路', next: 'ch4_descent_crossing', karmaDelta: 4, intelDelta: 6 }] }),

    ch4_descent_corpse_swarm: death('下山任務', '善意停車', [
      '商隊停下來聽你解釋。有人拿樹枝翻屍袖，白粉受熱裂開。',
      '極細灰蟲順風飛進人群。你撐得比凡人久，所以也看得比他們久。',
      '第一個孩子咳血時，你才知道「提醒」也需要距離和方法。'
    ], '讓人群在未知蟲卵附近停留並翻動屍體，引發噬靈蠅孵化感染。', '他見路旁有禍，出聲相告。\n眾人因此停下。\n後來都留在那裡。', '提醒別人不是固定安全選項。未知傳染物先看風向、距離與是否需要停留，比單純喊「別碰」更重要。'),

    ch4_descent_corpse_debtpaper: S('下山任務', '見死不救沒有天雷', [
      '夥計撿了錢袋，沒有中毒。袋裡真正麻煩的是一張顧家欠據。',
      '當晚顧家護院把他當成殺人奪財者拖走。你知道他只是撿的，卻沒有作證。',
      '沒有人懲罰你。半年後顧家人甚至誇你「懂規矩」。因果沒有變成雷，只變成某個勢力更喜歡你。'
    ], { choices: [{ text: '把這份不舒服也記住', next: 'ch4_descent_crossing', factionGuDelta: 4, karmaDelta: -5, intelDelta: 5 }] }),

    ch4_descent_corpse_guilt: S('下山任務', '你不知道後來死了幾個', [
      '你沒有停。背後後來傳來慘叫，但距離太遠，聽不出是誰。',
      '你活著離開未知風險。這不是錯。只是你再也無法知道提醒是否會更好。',
      '保守有時留下的不是懲罰，是一個永遠沒答案的如果。'
    ], { choices: [{ text: '往白石城走', next: 'ch4_descent_crossing', karmaDelta: -1 }] }),

    ch4_descent_crossing: S('下山任務', '報靠山也可能更麻煩', [
      '青石渡被王府軍士攔住。校尉要開藥箱。陳槐先報青雲宗，對方不動。',
      '再報柳執事，校尉的眼神反而更冷：「柳家那位？那更要查。」',
      '你胸前那張只能動一次的通符忽然變得很重。'
    ], {
      choices: [
        { text: '用掉柳家通符，強行確認公差身分', nextPool: [
          { next: 'ch4_descent_crossing_pass', weight: 70 },
          { next: 'ch4_descent_crossing_enemy', weight: 30 }
        ], factionSectDelta: 4, factionGovDelta: -2, intelDelta: 2 },
        { text: '先問查的是什麼，不急著搬名字', nextPool: [
          { next: 'ch4_descent_crossing_bribe', weight: 45 },
          { next: 'ch4_descent_crossing_real', weight: 55 }
        ], intelDelta: 6 },
        { text: '直接說「青雲宗的箱子你也敢查？」', next: 'ch4_descent_crossing_death', factionSectDelta: 3, risk: '極高' }
      ]
    }),

    ch4_descent_crossing_pass: S('下山任務', '符是真的', [
      '通符亮起柳家印記。校尉最後放行。',
      '你過了這一關，也用掉整趟唯一一次最硬的背景確認。',
      '靠山不是無限護甲。更像一張只能在某些場合兌現的票。'
    ], { choices: [{ text: '進城前先處理陳槐的債', next: 'ch4_descent_debt', factionSectDelta: 3 }] }),

    ch4_descent_crossing_enemy: S('下山任務', '柳家的敵人也認得柳家', [
      '通符一亮，校尉沒有硬攔，只把你的名字抄得特別仔細。',
      '陳槐離開後才說，王府最近正在查柳家名下商號走私。',
      '靠山替你開門，也把你送進另一張名單。'
    ], { choices: [{ text: '接受這筆曝光成本', next: 'ch4_descent_debt', wantedDelta: 3, factionSectDelta: 3, factionGovDelta: -4, intelDelta: 4 }] }),

    ch4_descent_crossing_bribe: S('下山任務', '原來只是想收錢', [
      '你問了幾句，發現對方對藥名和封條毫無興趣，只一直說「查起來耽誤很久」。',
      '陳槐塞了半塊靈石，查驗立刻結束。',
      '不是每個關卡都藏著大陰謀。有些真的只是小人物在收自己敢收的錢。'
    ], { choices: [{ text: '讓陳槐處理這筆過路錢，繼續', next: 'ch4_descent_debt', intelDelta: 5 }] }),

    ch4_descent_crossing_real: S('下山任務', '王府真的在查', [
      '校尉拿出前月通緝文書。柳家商號真的被查出一批違禁血參。',
      '他只核封條與箱數，沒有拆藥。你配合後正常放行。',
      '這一次制度不是來坑你，只是你的靠山剛好也在制度的嫌疑名單裡。'
    ], { choices: [{ text: '過渡口', next: 'ch4_descent_debt', factionGovDelta: 3, intelDelta: 5 }] }),

    ch4_descent_crossing_death: death('下山任務', '你搬出了宗門', [
      '校尉笑著讓路。當晚驛館，一根細針穿過窗紙。',
      '第二天陳槐找到你時，藥、靈石、腰牌都沒少。只有封口公文被人打開看過，再原樣放回。',
      '柳執事知道後只說了一聲「哦」，然後補了一個送貨弟子。'
    ], '在渡口以宗門名號壓人後遭報復性暗殺。', '生前最大的靠山，\n死後只替他補了一個缺。', '勢力名號的威懾力取決於對方相信上面會不會為你追究。外門弟子的死若不影響貨與利益，宗門未必會啟動報復。'),

    ch4_descent_debt: S('下山任務', '陳槐欠十一塊', [
      '快到白石城，陳槐終於承認自己欠城裡丹鋪十一塊靈石。',
      '丹鋪老闆只有練氣四層，問題是他岳父是白石幫帳房；幫主侄子又在赤霞門。',
      '「正因為兩宗有交情，為十一塊鬧大更丟臉。」陳槐說。靠山有時讓你更不能打。'
    ], {
      choices: [
        { text: '借他三塊，換一個人情', next: 'ch4_city_gate', spiritStoneDelta: -3, factionSectDelta: 3, karmaDelta: 2 },
        { text: '不借，這是他的債', next: 'ch4_city_gate' },
        { text: '陪他去談，但不替他付', next: 'ch4_city_gate', intelDelta: 4, factionBlackDelta: 1 }
      ]
    }),

    ch4_city_gate: S('仙城初見', '白石仙城', [
      '白石仙城沒有浮空宮殿。你先看見的是高牆，牆外是凡人棚屋、牲口、糞坑和排隊進城的人。',
      '一個抱孩子的婦人因少兩文入城錢被推到旁邊。錦袍修士丟一枚靈錢，門立刻開。',
      '輪到你，青雲腰牌替你少收一靈錢。背景第一次以非常實際、也非常小的方式有用。'
    ], {
      choices: [{ text: '用公差補貼交入城靈錢，先去青雲藥行交貨', next: 'ch4_city_delivery', factionSectDelta: 2, moment: '第一次踏進真正的修仙城市' }]
    }),

    ch4_city_delivery: S('仙城初見', '貨先數，人後數', [
      '青雲藥行周掌櫃先數箱，再數封條，最後才數你和陳槐。',
      '驗完貨，他給你二十靈錢食宿補貼。其中兩枚舊鑄，坊市只按七成收。',
      '陳槐照樣收下：「他知道我不會為兩枚靈錢找上面。」',
      '仙城每個人的膽量，都在算你背後的人會不會為這點事來。'
    ], {
      choices: [
        { text: '先去半真樓看看第三章情報值多少', next: 'ch4_city_halftruth', intelDelta: 3 },
        { text: '跟陳槐去黑市，先學真正的行情', next: 'ch4_city_blackmarket', blackCreditDelta: 1 },
        { text: '先找客棧，別帶著貨款和腰牌亂逛', next: 'ch4_city_inn', spiritStoneDelta: -1 }
      ]
    }),

    ch4_city_halftruth: S('仙城初見', '情報也要能轉賣', [
      '你拿第三章秘境側路去半真樓。掌櫃只問：「誰證明？」',
      '「我走過。」你說。掌櫃搖頭：「那是你的經驗，不是我的貨。」',
      '一條只有你自己知道真假的話，在你嘴裡可能值命，到了市場上卻未必值錢。'
    ], {
      choices: [
        { text: '拿路線、污染樣本與死者位置做成可驗證版本', next: 'ch4_city_info_sale', intelDelta: 5, spiritStoneDelta: 2, karmaDelta: -1 },
        { text: '不賣死人的細節，只問行情', next: 'ch4_city_blackmarket', intelDelta: 5, karmaDelta: 2 }
      ]
    }),

    ch4_city_info_sale: S('仙城初見', '死人也有價格', [
      '梁敬死在哪、誰先碰了寄生草、哪條窄道有靈絲，都被拆成不同價格。',
      '你賣掉一部分。下一批人也許會因此少死幾個。',
      '你也第一次直接從別人的死法裡換到靈石。這不是第五章，卻已經離它不遠。'
    ], { choices: [{ text: '收錢後去黑市', next: 'ch4_city_blackmarket', spiritStoneDelta: 2, blackCreditDelta: 1, karmaDelta: -2 }] }),

    ch4_city_blackmarket: S('仙城初見', '洗馬巷的綠燈', [
      '白石城官方地圖沒有黑市，所以人人都知道黑市在洗馬巷。',
      '這裡有白印、灰印、黑印。不是道德評分，是別人預測你會不會付錢、跑路、下毒，以及出了事賠不賠得起。',
      '沒有家族的人，只能用很多次小生意慢慢模仿背景。'
    ], {
      choices: [
        { text: '先做一筆小額符墨交易，建立信用', next: 'ch4_city_credit_test', spiritStoneDelta: -1, blackCreditDelta: 5 },
        { text: '直接看便宜養脈丹', next: 'ch4_city_pill', appraisalDelta: 2 },
        { text: '花錢雇小六帶路，先認人和巷子', next: 'ch4_city_runner', spiritStoneDelta: -1, blackCreditDelta: 2, intelDelta: 7 }
      ]
    }),

    ch4_city_credit_test: S('仙城初見', '少算二十靈錢', [
      '賣符墨的老人故意少算給你二十靈錢。你當場就看出來。',
      '你不知道這是失誤，還是測試。'
    ], {
      choices: [
        { text: '退回去', next: 'ch4_city_pill', blackCreditDelta: 8, karmaDelta: 2 },
        { text: '不說，這點便宜不拿白不拿', next: 'ch4_city_pill', spiritStoneDelta: 1, blackCreditDelta: -5, karmaDelta: -2 }
      ]
    }),

    ch4_city_pill: S('仙城初見', '三塊靈石的養脈丹', [
      '官方同類丹至少八塊，黑市只賣三塊。攤主說是外形煉壞，藥性沒差。',
      '旁邊真有人吞半顆，坐了半刻，臉色紅潤，沒死。',
      '你已經會檢查風險，所以此刻最容易把「我檢查過」誤認成「它安全」。'
    ], {
      choices: [
        { text: '買一顆，但先刮粉、驗蠟封、問貨源', nextPool: [
          { next: 'ch4_city_pill_true', weight: 34 },
          { next: 'ch4_city_pill_weak', weight: 28 },
          { next: 'ch4_city_pill_tracking', weight: 20 },
          { next: 'ch4_city_pill_poison', weight: 18 }
        ], spiritStoneDelta: -3, appraisalDelta: 8, intelDelta: 4 },
        { text: '太便宜的理由不夠清楚，不買', next: 'ch4_city_vendor_chain', appraisalDelta: 4 },
        { text: '先查攤主白印／灰印紀錄', next: 'ch4_city_pill_reputation', blackCreditDelta: 2, intelDelta: 6 }
      ]
    }),

    ch4_city_pill_reputation: S('仙城初見', '信用不是保證真貨', [
      '攤主灰印，做過十幾次交易。沒有明確死人紀錄。',
      '這能降低他純粹下毒跑路的可能，不能證明這批丹沒有保存問題、追蹤蠟或體質衝突。',
      '信用能縮小風險，不會替你鑑丹。'
    ], { choices: [
      { text: '有了這層資訊再買', nextPool: [
        { next: 'ch4_city_pill_true', weight: 45 },
        { next: 'ch4_city_pill_weak', weight: 30 },
        { next: 'ch4_city_pill_tracking', weight: 15 },
        { next: 'ch4_city_pill_poison', weight: 10 }
      ], spiritStoneDelta: -3, appraisalDelta: 6 },
      { text: '仍然不買', next: 'ch4_city_vendor_chain' }
    ] }),

    ch4_city_pill_true: S('仙城初見', '這次真的是便宜貨', [
      '丹是真的。倒閉藥坊清貨，攤主急著回款。',
      '你三塊買到八塊級別的東西，服後經脈也穩了一點。',
      '黑市不能被背成「全是假貨」。如果真便宜從不存在，誘惑也就不存在。'
    ], { choices: [{ text: '把成功記成一次結果，不記成保證', next: 'ch4_city_vendor_chain', qiDelta: 8, appraisalDelta: 5 }] }),

    ch4_city_pill_weak: S('仙城初見', '真丹，六成藥性', [
      '丹沒毒，只是放太久。你花三塊買到大概兩塊的藥效。',
      '沒有死人，也沒有大騙局，只是一筆不太划算的生意。',
      '城市裡更多交易其實死不了人，只會慢慢讓窮人更窮。'
    ], { choices: [{ text: '接受小虧', next: 'ch4_city_vendor_chain', qiDelta: 3, appraisalDelta: 3 }] }),

    ch4_city_pill_tracking: S('仙城初見', '丹沒問題，蠟有', [
      '藥性正常。你卻在蠟封上聞到極淡尋香油。',
      '攤主不一定想殺你。也可能只是把「買得起三塊、又不像有大背景」的新客位置賣給別人。',
      '貨是真的，交易仍然可能有第二層。'
    ], { choices: [
      { text: '把蠟封留作反追蹤樣本', next: 'ch4_city_vendor_chain', intelDelta: 10, wantedDelta: 1 },
      { text: '當場掀攤質問', next: 'ch4_city_vendor_chain', blackCreditDelta: -5, factionBlackDelta: -3, risk: '中' }
    ] }),

    ch4_city_pill_poison: death('仙城初見', '四分之一顆', [
      '你只吞四分之一。半個時辰先熱，一個時辰後才變痛。',
      '醫館說是燒脈粉，專門模仿養脈丹初期藥熱。真正致命的是讓你錯過最早催吐時間。',
      '十二塊靈石能救。你沒有。藥行願墊，條件是多年差役債。這一世，毒只是第一張帳。'
    ], '服用以燒脈粉偽裝的廉價養脈丹，錯過早期處置並無力支付救治成本。', '三年前吞錯一口藥。\n三年後，帳還在收。', '假藥風險不只是真假。症狀是否故意模仿正常藥效、你有沒有救治資本，都會改變結果。'),

    ch4_city_vendor_chain: S('仙城初見', '打得過，不代表該打', [
      '你看見另一個攤主把明顯假符當真符賣給新修士。攤主只有練氣一層，你現在真打得過。',
      '第三章以前，你很少有「我可以處理他」這種選項。現在有了。'
    ], {
      choices: [
        { text: '當眾揭穿並把人按住', next: 'ch4_city_vendor_whitegang', factionBlackDelta: -4, karmaDelta: 3, risk: '高' },
        { text: '私下提醒買家，別碰攤主', next: 'ch4_city_runner', karmaDelta: 3, intelDelta: 2 },
        { text: '不介入，先保自己的黑市信用', next: 'ch4_city_runner', blackCreditDelta: 2, karmaDelta: -1 }
      ]
    }),

    ch4_city_vendor_whitegang: S('仙城初見', '小的後面有人', [
      '你兩招把攤主按住。黑市管事驗出假貨，砍了他兩根手指。',
      '三天後來找你的不是攤主，是他姐夫。姐夫後面又是白石幫小頭目。',
      '你報青雲宗，小頭目真的退了。第四天周掌櫃卻把你叫去：「別再報了。白石幫後面有顧家，顧家又和柳家沾親。」',
      '你一路往上追，最後追到自己這邊桌上。'
    ], {
      choices: [
        { text: '到這裡停，不把一場假貨糾紛升級成兩家關係', next: 'ch4_city_runner', factionSectDelta: 2, factionGuDelta: -1, intelDelta: 8 },
        { text: '既然有宗門，偏要追到底', next: 'ch4_city_chain_death', factionSectDelta: -4, factionGuDelta: -8, risk: '極高' }
      ]
    }),

    ch4_city_chain_death: death('仙城初見', '追到底', [
      '你繼續查白石幫的貨源，查到顧家商號，再查到赤霞門器坊。',
      '你沒有被任何一個「老的」當面殺死。最後是一群山賊在城外伏你。',
      '他們收了十二塊靈石，甚至不知道你叫什麼。'
    ], '把小販假貨案一路追入家族與宗門利益鏈，最終遭匿名買兇滅口。', '想殺他的人沒有動手。\n動手的人不認識他。\n中間每個人都只做了一點點。', '套娃不一定是師父親自來報仇。利益鏈更常把麻煩一層層外包，最後交給最便宜的暴力。'),

    ch4_city_runner: S('仙城初見', '小六', [
      '小六十二三歲，腿跛，專替人跑腿。五靈錢認路，十靈錢問人，進黑印巷另算。',
      '你問危險怎麼算。他說：「要我拿不該拿的東西，先給我娘三十。」',
      '他不是不知道自己會替別人承擔風險。他只是替命分了價。'
    ], {
      choices: [
        { text: '只雇他帶路，不讓他替你查人', next: 'ch4_city_inn', spiritStoneDelta: -1, blackCreditDelta: 3, intelDelta: 5, karmaDelta: 2 },
        { text: '雇他去查白石幫最近在盯誰', nextPool: [
          { next: 'ch4_city_runner_info', weight: 60 },
          { next: 'ch4_city_runner_dead', weight: 40 }
        ], spiritStoneDelta: -2, intelDelta: 8, karmaDelta: -3 },
        { text: '身上錢不夠，只問他幾條公開路線後離開', next: 'ch4_city_inn', intelDelta: 2 }
      ]
    }),

    ch4_city_runner_info: S('仙城初見', '跑得慢，只能記路', [
      '小六帶回三個名字和兩條巷子。沒有任何驚天秘密，只是讓你知道哪一帶最近最好別走。',
      '這份情報很小，卻能真的降低日常風險。',
      '城市知識和秘境知識一樣，不一定神秘，只是有人願意記。'
    ], { choices: [{ text: '付清工錢，去找住處', next: 'ch4_city_inn', blackCreditDelta: 4, intelDelta: 8, karmaDelta: 2 }] }),

    ch4_city_runner_dead: S('仙城初見', '小六沒有回來', [
      '第三天，城外溝裡找到小六。錢還在，鞋被拿走。',
      '不是搶劫，是有人警告。你做了準備、給足工錢、告訴他不對就走。',
      '可你仍然把一件自己不願冒的風險交給一個比你更缺錢的人。世界不在乎你是不是故意。'
    ], {
      choices: [
        { text: '給他母親補償，停止往下查', next: 'ch4_city_inn', spiritStoneDelta: -3, karmaDelta: 8, factionBlackDelta: -2 },
        { text: '他的死證明那條線很重要，繼續查', next: 'ch4_auction_invite', karmaDelta: -8, intelDelta: 12, factionBlackDelta: -5, risk: '高' }
      ]
    }),

    ch4_city_inn: S('仙城初見', '住哪裡也是交易', [
      '便宜客棧門薄；中等客棧有禁制，會把真名抄進住客冊；最貴的能保密，也因此知道你願意花大錢藏自己。',
      '安全不是價格越高越完整。你只是把不同種類的風險交給不同的人。'
    ], {
      choices: [
        { text: '住中等客棧，登記真名', next: 'ch4_auction_invite', spiritStoneDelta: -1, factionGovDelta: 1 },
        { text: '加錢只寫「青雲外門」', next: 'ch4_auction_invite', spiritStoneDelta: -2, wantedDelta: -1 },
        { text: '用假名，避免住宿紀錄', next: 'ch4_auction_invite', blackCreditDelta: 2, wantedDelta: 2, factionGovDelta: -2 }
      ]
    }),

    ch4_auction_invite: S('拍賣殺局', '柳席', [
      '周掌櫃把一張萬珍閣黑底金字邀請帖放到你面前。不是給你的，是柳執事席位。',
      '「去替他看一件東西。」你問看什麼。周掌櫃說：「不知道。看誰買。」',
      '你不是去買東西。你是去看人，也一定會被人看。'
    ], {
      choices: [
        { text: '接帖入場，先把自己當觀察者', next: 'ch4_auction_entry', factionSectDelta: 4, intelDelta: 5, moment: '第一次坐進大人物的席位' },
        { text: '拒絕私人差事，只做宗門公差', next: 'ch4_plague_task', factionSectDelta: -3, karmaDelta: 1 }
      ]
    }),

    ch4_auction_entry: S('拍賣殺局', '一張帖子改變你是誰', [
      '你拿柳帖進二樓。修為比你高的散修仍在大堂驗資。沒有人知道你全身有幾塊靈石，只看見侍者把你送進柳席。',
      '那一刻，你不是你自己。你是別人眼裡「柳家席位裡的年輕人」。',
      '背景最強的地方，有時不是替你打人，而是先替別人決定怎麼理解你。'
    ], {
      choices: [{ text: '先看前十件，不急著喊價', next: 'ch4_auction_bargain', intelDelta: 5 }]
    }),

    ch4_auction_bargain: S('拍賣殺局', '真便宜', [
      '五張破甲符起價兩塊，最後二塊七成交。轉手市價四塊以上。',
      '你親眼看見一件真正的便宜貨。只要真的撿漏一次，後面所有「可能撿漏」的東西都會亮起來。'
    ], {
      choices: [
        { text: '記住便宜確實存在，但不用柳席買自己的東西', next: 'ch4_auction_jade', appraisalDelta: 5 },
        { text: '下一件有便宜就跟', next: 'ch4_auction_jade', betrayalDelta: 3, risk: '中' }
      ]
    }),

    ch4_auction_jade: S('拍賣殺局', '第三十七件', [
      '灰白古玉簡被抬上來，邊緣焦痕與第三章秘境殘紋極像。起價八塊，很快喊到二十。',
      '你看見至少四個沒有出價的人同時抬頭。',
      '這件東西的價值不只在玉簡，也在誰願意為它動一下。'
    ], {
      choices: [
        { text: '記出價者，也記那些只觀察的人', next: 'ch4_auction_signal', intelDelta: 12, appraisalDelta: 5 },
        { text: '只盯最高價包間', next: 'ch4_auction_signal', intelDelta: 5 },
        { text: '用柳席試探性抬一次價', nextPool: [
          { next: 'ch4_auction_signal', weight: 70 },
          { next: 'ch4_auction_bid_trap', weight: 30 }
        ], factionSectDelta: -2, risk: '高' }
      ]
    }),

    ch4_auction_signal: S('拍賣殺局', '一隻眼的人', [
      '東側獨眼散修在價格停頓時看你兩次。像是在等柳席抬價。',
      '他可能是賣家的托、顧家的人、柳執事第二條線，也可能只是覺得你年輕好激。',
      '你甚至不知道自己是不是正在被考。'
    ], {
      choices: [
        { text: '不抬，先觀察他之後跟誰走', next: 'ch4_auction_wood', intelDelta: 8 },
        { text: '抬一口就停', nextPool: [
          { next: 'ch4_auction_wood', weight: 65 },
          { next: 'ch4_auction_bid_trap', weight: 35 }
        ], risk: '高', intelDelta: 3 }
      ]
    }),

    ch4_auction_bid_trap: death('拍賣殺局', '抬到自己手上', [
      '你喊三十七。對面沉默。拍賣師敲了三次。',
      '你沒有三十七塊。萬珍閣說沒關係，正因是柳席，所以可以欠。',
      '柳執事第二天只回一句：「誰買的，誰還。」一個眼神把你未來很多年的差事先賣了。'
    ], '使用他人席位抬價失手，被迫背負遠超自身能力的拍賣欠契，後續死於償債差役。', '他在拍賣場多喊了一次。\n很多年後，別人才替拍賣師落槌。', '信用不是免費購買力。你使用誰的信用，就可能把一筆看似當下的交易變成多年的人情與債。'),

    ch4_auction_wood: S('拍賣殺局', '一截黑木', [
      '一截不起眼的雷擊枯木起價一塊。你卻聞到第三章晶種附近那種很淡的焦甜味。',
      '這是第一次只有你可能多知道一點的拍品。也可能只是你把舊經驗硬套上去。'
    ], {
      choices: [
        { text: '一塊二買下，這是承擔得起的情報下注', nextPool: [
          { next: 'ch4_auction_wood_plain', weight: 55 },
          { next: 'ch4_auction_wood_true', weight: 45 }
        ], spiritStoneDelta: -2, appraisalDelta: 4 },
        { text: '不買，只記誰對它有興趣', next: 'ch4_auction_mark', intelDelta: 6 }
      ]
    }),

    ch4_auction_wood_plain: S('拍賣殺局', '只是一截雷木', [
      '你判斷錯了。它就是低階雷木，沒有古雷紋。',
      '虧了幾十靈錢，沒死人。這種小錯誤也應該存在。',
      '如果每次仔細觀察都只能導向大獎或大死，世界反而會變得像題庫。'
    ], { choices: [{ text: '把小虧當成本', next: 'ch4_auction_mark', appraisalDelta: 2 }] }),

    ch4_auction_wood_true: S('拍賣殺局', '真寶', [
      '黑木內部真有一小段古雷紋。半真樓願意出十二塊。',
      '你第一次真正靠過去付過的代價與世界知識賺到錢。',
      '問題是拍賣場不只你一個人有眼睛。'
    ], {
      choices: [
        { text: '立刻轉賣，不把撿漏變成持有風險', next: 'ch4_auction_mark', spiritStoneDelta: 10, appraisalDelta: 8 },
        { text: '自己留，十二塊只是別人願意出的價', next: 'ch4_auction_relic_death', intelDelta: 3, risk: '極高' }
      ]
    }),

    ch4_auction_relic_death: death('拍賣殺局', '十塊時你該賣', [
      '一名老修先出五塊，再出十塊。你都拒絕。他笑著走了。',
      '第四天離城三十里，他在路邊等你。你報青雲宗，他說知道；報柳執事，他也說知道。',
      '他敢來，正因已經算過你的靠山不會為一截黑木追到天涯。'
    ], '持有拍賣撿漏的真寶離城，遭更高階修士殺人奪寶。', '他真的撿到漏了。\n所以別人把他撿走了。', '真寶比假寶更可能引來後續追索。持有成本、離場成本與靠山願不願為你追究，都應算進「寶物價值」。'),

    ch4_auction_mark: S('拍賣殺局', '袖口的銀粉', [
      '散場後，你發現袖口多了一點銀粉。符光下才看得見。陳槐說是尋香粉。',
      '它可能來自萬珍閣防盜、柳家監視、競買者追蹤，也可能只是端茶時沾上。',
      '異常本身沒有立場。'
    ], {
      choices: [
        { text: '洗掉，不拿自己當餌', next: 'ch4_auction_exit', wantedDelta: -1, intelDelta: 2 },
        { text: '保留一點在布條上，用來看誰跟', next: 'ch4_auction_exit', intelDelta: 10, risk: '中' },
        { text: '把外袍送給乞丐，讓追蹤離開自己', next: 'ch4_auction_coat', karmaDelta: -8, wantedDelta: -3 }
      ]
    }),

    ch4_auction_coat: S('拍賣殺局', '善行也是風險轉移', [
      '老乞丐很高興得到一件青袍。第二天，他死在城外，喉嚨被割開，衣服被翻得很亂。',
      '你因此知道兩件事：尋香粉確實衝你來；對方會殺人搜身。',
      '兩條情報很有用。有用得讓你很不舒服。'
    ], { choices: [{ text: '把這筆因果記在自己身上', next: 'ch4_auction_exit', karmaDelta: -10, intelDelta: 12 }] }),

    ch4_auction_exit: S('拍賣殺局', '離場才開始', [
      '萬珍閣場內保交易，場外不保命。匿名後門一塊，築基護送五塊。',
      '護送越貴，也越像在公開告訴別人：你覺得自己身上的東西值得保護。',
      '成交價只是成本的一部分。'
    ], {
      choices: [
        { text: '走普通路，但換衣、換客棧、分段回去', next: 'ch4_plague_task', intelDelta: 5, qiDelta: -3 },
        { text: '花一塊走匿名後門', nextPool: [
          { next: 'ch4_plague_task', weight: 75 },
          { next: 'ch4_auction_exit_betray', weight: 25 }
        ], spiritStoneDelta: -1, wantedDelta: -2 },
        { text: '買築基護送，確定把收益帶回去', next: 'ch4_plague_task', spiritStoneDelta: -5, wantedDelta: -4, factionSectDelta: 1 }
      ]
    }),

    ch4_auction_exit_betray: death('拍賣殺局', '匿名後門名單', [
      '你花一塊靈石買匿名。後門車夫花十靈錢把你的出發時間賣掉。',
      '兩名散修在酒樓後巷堵住你。你打傷一個，第二個刀更快。',
      '每個人都覺得自己的交易很合理。'
    ], '購買拍賣行匿名離場服務後，行程被內部人員轉賣，遭埋伏殺人奪寶。', '他花一塊買隱私。\n有人花十靈錢買到了他的隱私。', '服務能降低風險，但服務提供者本身也可能成為資料來源。不要把「付費」等同「絕對保密」。'),

    ch4_plague_task: S('凡人疫村', '本來可以回山', [
      '拍賣後第三天，你原本就能返宗。周掌櫃卻推來另一封公文：城南七十里柳溪村起疫，送兩箱清瘟散到南關屯所。',
      '不用進村，不用治人，只交貨。兩點貢獻。',
      '差事看起來很划算。第三章教過你：看起來特別划算時，先問缺的是什麼。這次缺的可能不是人，是有人不想靠近那個村。'
    ], {
      choices: [
        { text: '接差事，但先查疫病傳聞與封路原因', next: 'ch4_plague_rumor', intelDelta: 8, factionSectDelta: 2 },
        { text: '只是送藥到屯所，不進村', next: 'ch4_plague_checkpoint', meritDelta: 2, factionSectDelta: 3 },
        { text: '拒絕額外差事，立刻返宗', next: 'ch4_end_clean', factionSectDelta: -2, karmaDelta: -1 }
      ]
    }),

    ch4_plague_rumor: S('凡人疫村', '五種說法', [
      '有人說是凡人瘟病，有人說水田裡出了妖蟲，有人說上游礦水有毒。',
      '王府告示只寫「疫」。赤霞門弟子最近卻頻繁往南走。',
      '你沒有查到答案，只查到這件事至少不該先把「清瘟散」當成答案。'
    ], { choices: [{ text: '送藥，但把共同暴露與水源列為優先檢查', next: 'ch4_plague_checkpoint', intelDelta: 8, appraisalDelta: 4 }] }),

    ch4_plague_checkpoint: S('凡人疫村', '三個村，四百包', [
      '南關屯所外聚了上百人。有人咳，有人哭，有人拿地契，有人只拿一隻雞。',
      '主簿驗完藥箱第一句是：「少了。」公文四百包，三個村根本不夠。',
      '陳槐說王府買多少，青雲宗就送多少。主簿反問：「青雲宗不管人死活？」兩邊都對，也都很難聽。'
    ], {
      choices: [
        { text: '交貨拿收據。任務到此為止', nextPool: [
          { next: 'ch4_plague_leave_clean', weight: 55 },
          { next: 'ch4_plague_blackmarket_leak', weight: 45 }
        ], meritDelta: 2, factionSectDelta: 3 },
        { text: '留下半日，看藥怎麼發、病人症狀是不是同一種', next: 'ch4_plague_woman', intelDelta: 6, karmaDelta: 2 },
        { text: '直接問屯所醫官：真正缺的是藥還是別的', next: 'ch4_plague_doctor', intelDelta: 8, karmaDelta: 2 }
      ]
    }),

    ch4_plague_leave_clean: survive('凡人疫村', '你只交了貨', [
      '你按公文交貨、拿收據、返城。沒有感染，沒有得罪任何人。',
      '半個月後你聽說柳溪村死了一百多人。也聽說後續援助壓住了疫情，村子沒有全滅。',
      '你不救，世界也不是立刻毀掉。你只是永遠不知道自己多留半天會改變多少。'
    ], '保守退出可以是真正合理的存活選擇。它不應被固定懲罰，但會放棄資訊、關係與可能改變結果的機會。', { closestMoment: '把清瘟散平安送到南關屯所', continueTo: 'ch4_siege_bells', continueLabel: '數日後，白石城鐘聲響起' }),

    ch4_plague_blackmarket_leak: S('凡人疫村', '一百四十包去哪了', [
      '你回城後在黑市看見同批封紙的清瘟散，價格翻了六倍。',
      '你無法證明那就是自己送的兩箱。可屯所最後實發數量確實少了一百多包。',
      '你沒有做錯任何正式流程。流程本身仍可能讓東西在後面被吃掉。'
    ], {
      choices: [
        { text: '拿封紙樣式去半真樓查流向', next: 'ch4_plague_trace', intelDelta: 10, blackCreditDelta: 2, wantedDelta: 1 },
        { text: '沒有證據，不把猜測當真相', next: 'ch4_siege_bells', appraisalDelta: 5 }
      ]
    }),

    ch4_plague_trace: S('凡人疫村', '藥從哪裡回城', [
      '半真樓只查到其中一批來自南關周邊小販。可能是屯所流出，也可能是村民領到後自己賣掉。',
      '你再次遇到一個不完整答案。窮人也可能把救命藥賣掉換糧。',
      '「藥被偷」和「藥被賣」會導向完全不同的責任。'
    ], { choices: [{ text: '停止追線，先回南關看人', next: 'ch4_plague_woman', intelDelta: 6 }] }),

    ch4_plague_woman: S('凡人疫村', '求一包', [
      '一個女人抱著五歲女孩跪下：「仙師，求一包。」她手裡只有十二枚銅錢。',
      '藥箱已交割，不再是你的。你自己可能還有一包備用清瘟散。',
      '給藥可能救，也可能無用，甚至可能害。真正麻煩的是你一旦給一個，後面幾十個人都會知道你有藥。'
    ], {
      choices: [
        { text: '先問症狀、水源、家裡誰先病，再決定', next: 'ch4_plague_doctor', intelDelta: 8, appraisalDelta: 4 },
        { text: '先給她一包，孩子等不起', nextPool: [
          { next: 'ch4_plague_one_saved', weight: 60 },
          { next: 'ch4_plague_wrong_medicine', weight: 40 }
        ], karmaDelta: 6, spiritStoneDelta: -1 },
        { text: '不給。你不是醫師，也沒有能力替所有人分配', next: 'ch4_plague_doctor', karmaDelta: -2 }
      ]
    }),

    ch4_plague_one_saved: S('凡人疫村', '一個人退燒，三十個人來了', [
      '女孩當晚退了一點燒。第二天，屯所外三十多人喊你「仙師」。',
      '你只有一兩包備藥。現在每個沒拿到的人都知道：你曾經有。',
      '善意不是錯。善意只是會改變其他人的期待。'
    ], {
      choices: [
        { text: '不再直接發藥，和醫官一起先分症狀', next: 'ch4_plague_doctor', karmaDelta: 4, intelDelta: 5 },
        { text: '誰最急就先給誰', next: 'ch4_plague_stabbed', karmaDelta: 5, risk: '高' }
      ]
    }),

    ch4_plague_wrong_medicine: death('凡人疫村', '藥不是答案', [
      '女孩吃下清瘟散後抽搐。趙醫官趕來時只看一眼就說，她不是風熱，是嚴重脫水。',
      '藥性太烈，身體反而撐不住。女人沒有殺你。她只是抱著孩子一直問：「仙師不是會救人嗎？」',
      '三日後你自己也因在混亂中感染高熱倒下。'
    ], '未辨症狀便向重度脫水病童給予不合適的清瘟散，後續又在疫區暴露感染。', '他帶著救人的藥來。\n藥是真的。\n病不是那一種。', '疫病先確認症狀、共同暴露與傳播路徑。真藥也可能用錯地方；「有藥」不等於「知道怎麼救」。'),

    ch4_plague_stabbed: death('凡人疫村', '兩包藥', [
      '你連續替幾個人看症狀。沒拿到藥的男人跪了很久，他妻子當晚死了。',
      '第三天，他拿凡鐵刀刺你。你本來躲得開，當時卻正替另一名老人看眼白。',
      '你反手打死他，自己也因傷口混入污泥，高熱三日而死。'
    ], '在疫村有限藥物分配中遭未獲藥家屬刺傷，傷口感染後死亡。', '他有兩包藥。\n所以每一個沒拿到的人，\n都知道他曾經有藥。', '幫助一個人會改變其他人的期待。有限資源最好建立透明分配規則、角色分工與退出條件，而不是把所有判斷集中在一個人身上。'),

    ch4_plague_doctor: S('凡人疫村', '趙醫官', [
      '趙醫官五十多歲，凡人，沒有靈根。他第一句是：「別亂發清瘟散。」',
      '他說一半病人真正需要的是乾淨水、補鹽和隔離。你說那就燒水。他問：「柴呢？」',
      '知道正確答案沒有想像中有用。疫病是一串缺柴、缺錢、缺人、缺路、缺信任的問題。'
    ], {
      choices: [
        { text: '出一塊靈石買柴與車，解最便宜的大問題', next: 'ch4_plague_firewood', spiritStoneDelta: -1, karmaDelta: 5 },
        { text: '跟趙醫官進村半日，只做搬運與觀察', next: 'ch4_plague_village', karmaDelta: 4, qiDelta: -4, intelDelta: 8 },
        { text: '醫官比你專業，交給他，自己按時回城', next: 'ch4_plague_leave_clean', karmaDelta: 1 }
      ]
    }),

    ch4_plague_firewood: S('凡人疫村', '一塊靈石買得到柴，買不到通行', [
      '一塊靈石能買很多凡柴。問題是車夫不願進疫區；加錢後，王府兵又說未奉令，物資不得私入。',
      '你第一次看到「知道便宜解法」還不夠。制度本身也需要成本。'
    ], {
      choices: [
        { text: '用青雲公差身份替車作保', next: 'ch4_plague_village', factionSectDelta: 3, factionGovDelta: -1, karmaDelta: 4 },
        { text: '不把私人救助變成宗門行為，找趙醫官走屯所程序', next: 'ch4_plague_village', factionGovDelta: 2, intelDelta: 5 },
        { text: '硬闖封線，先把柴送進去再說', next: 'ch4_plague_arrest', wantedDelta: 8, factionGovDelta: -8, risk: '高' }
      ]
    }),

    ch4_plague_arrest: S('凡人疫村', '救人的柴也能變成違令', [
      '你把柴送進去了，村裡當晚真的多燒了很多鍋水。',
      '王府巡衛也把你的名字記進「妨礙封疫」名單。',
      '好結果沒有自動洗掉程序後果。你救到人，也真的增加了自己的通緝風險。'
    ], { choices: [{ text: '既然已經進來，跟趙醫官做完今天', next: 'ch4_plague_village', wantedDelta: 4, karmaDelta: 4, factionGovDelta: -4 }] }),

    ch4_plague_village: S('凡人疫村', '紅布、黑布、白布', [
      '白布：有人病。黑布：有人死。紅布：全家都病，別進。',
      '你走過第一條巷子就看見七扇黑布門。一個孩子坐門口削木頭，說屋裡的大人「都睡了」。',
      '修仙者說凡人如草芥很方便。走進草芥住的地方，才發現草芥也有沒洗的碗、門口的鞋和不知道父母不會醒的孩子。'
    ], {
      choices: [
        { text: '查共同水源、第一批病戶與牲畜症狀', nextPool: [
          { next: 'ch4_plague_truth_disease', weight: 28 },
          { next: 'ch4_plague_truth_parasite', weight: 24 },
          { next: 'ch4_plague_truth_pollution', weight: 28 },
          { next: 'ch4_plague_truth_poverty', weight: 20 }
        ], intelDelta: 12, appraisalDelta: 6 },
        { text: '先幫搬重病者，不急著查幕後', next: 'ch4_plague_work', qiDelta: -8, karmaDelta: 8 },
        { text: '看完就夠了，退出疫村', next: 'ch4_plague_leave_after_seen', intelDelta: 4 }
      ]
    }),

    ch4_plague_truth_disease: S('凡人疫村', '只是很普通的病', [
      '第一批病戶都喝過同一口淺井，雨後又有牲畜糞水倒灌。',
      '沒有修仙陰謀。煮水、補鹽、隔離比清瘟散更有效。',
      '很多凡人不是被仙人害死，只是沒有柴、沒有乾淨井，也沒有本錢照正確方法活。'
    ], { choices: [{ text: '把資源投入水、柴與分區', next: 'ch4_plague_work', karmaDelta: 8, intelDelta: 8 }] }),

    ch4_plague_truth_parasite: S('凡人疫村', '水田裡的卵', [
      '你在病戶腳踝與水田溝邊找到同樣的細小紅點。真正問題是低階妖蟲產卵。',
      '清瘟散只能壓症狀，燒田與清溝才是源頭處理。',
      '你若把「疫村」背成一種疾病，這一世會一直治錯方向。'
    ], { choices: [{ text: '請赤霞門火修處理水田，但先要求搬人', next: 'ch4_plague_fire_huts', intelDelta: 8, factionSectDelta: 1, karmaDelta: 4 }] }),

    ch4_plague_truth_pollution: S('凡人疫村', '墨骨礦洗礦液', [
      '東井上游有泛黑礦渣，和病戶指甲變色一致。',
      '半真樓若驗，八成能證明是墨骨礦洗礦液。礦場名義屬王府，實際由顧家經營，礦又賣給赤霞門器坊。',
      '一口井下面，完整站著本章的套娃。'
    ], {
      choices: [
        { text: '先找顧十三談，不直接公開', next: 'ch4_plague_gu_talk', factionGuDelta: 2, intelDelta: 6 },
        { text: '花錢鑑定後公開證據', next: 'ch4_plague_expose', spiritStoneDelta: -2, factionGuDelta: -8, factionGovDelta: -3, karmaDelta: 8, wantedDelta: 4 },
        { text: '只處理水源，不碰礦場所有權', next: 'ch4_plague_work', karmaDelta: 5, intelDelta: 4 }
      ]
    }),

    ch4_plague_truth_poverty: S('凡人疫村', '沒有大陰謀', [
      '你查不到妖蟲、靈毒、礦渣。只有擁擠、缺糧、同屋照護、沒柴煮水與病人繼續下田。',
      '最不浪漫的真相最難處理：窮。',
      '冷漠不需要陰謀，只需要救一個人的成本比上面願意付的高。'
    ], { choices: [
      { text: '花一塊靈石補水、柴、搬運與分區', next: 'ch4_plague_work', karmaDelta: 8, spiritStoneDelta: -1 },
      { text: '沒錢也能做：先分病戶、清井、用人力搬水', next: 'ch4_plague_work', karmaDelta: 4, qiDelta: -5 }
    ] }),

    ch4_plague_gu_talk: S('凡人疫村', '不完整的改善', [
      '顧十三提出：礦場停七天、修沉澱池、每戶補兩斗糧、重病戶給藥。死者家屬三兩銀。',
      '你覺得一條命三兩是侮辱。他反問：「那你覺得多少？」',
      '人命在道德上無價，賠償卻一定要落成數字。'
    ], {
      choices: [
        { text: '接受，先讓井水真的乾淨一點', next: 'ch4_plague_compromise', factionGuDelta: 8, karmaDelta: 5 },
        { text: '拒絕，要求停礦與完整賠償', next: 'ch4_plague_expose', factionGuDelta: -10, karmaDelta: 7, wantedDelta: 3, risk: '高' },
        { text: '加一條：賠糧交趙醫官與村民共同清點', next: 'ch4_plague_compromise', factionGuDelta: 4, factionGovDelta: 1, karmaDelta: 8, intelDelta: 4 }
      ]
    }),

    ch4_plague_compromise: S('凡人疫村', '半步', [
      '礦場停了七天。沉澱池真的修。賠糧到八成，銀子被里正吞一部分。',
      '三個月後，柳溪村沒有再出同症大批病人。礦場也早就重開。',
      '這不算勝利，只是世界往好的一邊移了半步。小人物很多時候只能買得起半步。'
    ], { choices: [{ text: '接受不完美結果，回城', next: 'ch4_plague_leave_after_seen', factionGuDelta: 4, karmaDelta: 6 }] }),

    ch4_plague_expose: S('凡人疫村', '你把證據貼了出去', [
      '鑑定清楚寫著墨骨礦洗礦液。王府沒有立即回應，你又把副本貼在南關。',
      '村民開始堵礦車。顧十三第三天在客棧等你：「為什麼不先找我？」',
      '你說他們今天在死人。他回：「每天都有人死。」這句話很冷，也很真。'
    ], {
      choices: [
        { text: '不撤證，承擔仙門與家族反應', nextPool: [
          { next: 'ch4_plague_expose_cost', weight: 65 },
          { next: 'ch4_plague_expose_death', weight: 35 }
        ], wantedDelta: 5, factionGuDelta: -8, factionSectDelta: -2, karmaDelta: 8 },
        { text: '證據已公開，現在轉談沉澱池與賠糧', next: 'ch4_plague_compromise', factionGuDelta: 1, karmaDelta: 6 }
      ]
    }),

    ch4_plague_expose_cost: S('凡人疫村', '幫到了，也被記住了', [
      '礦場停四十天，村裡拿到一批賠糧。四十天後換名義重開。',
      '你被青雲宗調離白石外務一段時間，理由是「避風頭」。',
      '做好事可能真的有用，也可能真的讓自己的路變窄。兩件事可以同時成立。'
    ], { choices: [{ text: '先回城收尾', next: 'ch4_plague_fire_huts', factionSectDelta: -3, karmaDelta: 6, wantedDelta: 2 }] }),

    ch4_plague_expose_death: death('凡人疫村', '查清一口井', [
      '宗門把你調去北邊一處邊礦「暫避風頭」。',
      '半年後邊礦遇妖潮。你死時柳溪村的井已經乾淨很多，礦場也已換名重開。',
      '你確實幫到一些人，也確實因此被移出原本的安全位置。'
    ], '公開顧家礦場污染證據後被宗門調離核心外務，於後續邊礦妖潮中死亡。', '他查清一口井為什麼有毒。\n上面的人也因此查清了他是誰。', '好行為不保證好個人結果。政治與利益後果可以延遲結算，而且通常不會以「報應」的形式標記自己。'),

    ch4_plague_work: S('凡人疫村', '一天救不了一個村', [
      '你搬了二十七個重病者，真正救下多少無法精準知道。晚上趙醫官說今天做得不錯。你問死了多少，他算了算：「三十一。」',
      '你忙一整天，數字仍然是負的。',
      '無力和秘境不同。秘境裡你至少能逃。這裡你走了，事情仍會繼續。'
    ], {
      choices: [
        { text: '再留幾天，但開始分工，不再自己扛所有風險', next: 'ch4_plague_delegate', qiDelta: -10, karmaDelta: 8 },
        { text: '今天做到這裡，讓趙醫官接手', next: 'ch4_plague_leave_after_seen', karmaDelta: 4 }
      ]
    }),

    ch4_plague_delegate: S('凡人疫村', '開始安排別人', [
      '你讓症狀輕的搬水，沒發熱的送飯，病後恢復者照顧重病者。效率明顯提高。',
      '你第一次不是自己承擔危險，而是在決定誰承擔哪一種危險。',
      '這和第五章只差一條很細的線：他們知道多少、能不能拒絕、你有沒有把代價說清楚。'
    ], {
      choices: [
        { text: '所有高風險工作明說風險、提高工錢、允許拒絕', next: 'ch4_plague_fire_huts', spiritStoneDelta: -2, karmaDelta: 10, intelDelta: 5 },
        { text: '村裡缺糧，給錢就會有人做，不必講太細', next: 'ch4_plague_fire_huts', spiritStoneDelta: -1, karmaDelta: -8, blackCreditDelta: 2 },
        { text: '沒有多餘靈石，你自己繼續扛最危險的搬運', next: 'ch4_plague_fire_huts', qiDelta: -10, karmaDelta: 4 }
      ]
    }),

    ch4_plague_fire_huts: S('凡人疫村', '紅布屋', [
      '赤霞門三名弟子來到疫村。領頭者決定焚燒紅布屋，理由是重病戶移動會擴散、藥又不夠。',
      '趙醫官說裡面還有活人。紅衣弟子答：「活不了。」',
      '方案從防疫效率上可能正確。問題是當人被看得太小時，效率會變得非常容易。'
    ], {
      choices: [
        { text: '爭取半個時辰，先搬還能走的人', nextPool: [
          { next: 'ch4_plague_fire_rescue', weight: 70 },
          { next: 'ch4_plague_fire_spread', weight: 30 }
        ], karmaDelta: 6, factionSectDelta: 1 },
        { text: '不阻止焚燒，但要求先逐屋探生命跡象', next: 'ch4_plague_fire_rescue', intelDelta: 4, karmaDelta: 3 },
        { text: '拔劍擋在門前，報青雲宗', next: 'ch4_plague_fire_death', factionSectDelta: -5, risk: '極高' }
      ]
    }),

    ch4_plague_fire_rescue: S('凡人疫村', '四個活下來', [
      '半個時辰裡抬出十一個還有意識的人，最後活了四個。兩名參與搬運的村民後來也病死。',
      '你救四，可能害二。帳怎麼算，遊戲不替你算。',
      '至少你知道自己是在什麼條件下做了選擇。'
    ], { choices: [{ text: '疫勢下降後離開', next: 'ch4_plague_leave_after_seen', karmaDelta: 5 }] }),

    ch4_plague_fire_spread: S('凡人疫村', '半個時辰真的有代價', [
      '你爭到搬人時間，但其中一戶是高傳染源。搬運讓兩名村民與一名兵卒感染。',
      '你不是因為心軟「選錯」。你只是驗證了拖延也有真實成本。',
      '下一世不能把「先救人」或「立刻燒」背成固定答案。'
    ], { choices: [{ text: '接受代價，配合重新隔離', next: 'ch4_plague_leave_after_seen', karmaDelta: 1, intelDelta: 6 }] }),

    ch4_plague_fire_death: death('凡人疫村', '靠山站到對面', [
      '赤霞門弟子本來因你報柳執事而停手。片刻後，青雲宗外務堂飛符到了。',
      '上面只有一句：「疫務由赤霞門統理，本宗弟子不得阻撓。」',
      '你回頭時，自己的靠山已經站在對面。你若仍拔劍，就只剩一具很容易解釋的屍體。'
    ], '在疫村阻攔赤霞門執行焚疫命令，宗門明令不得干涉後仍衝突，被高階弟子擊殺。', '他以為身後站著宗門。\n回頭時，宗門站在對面。', '靠山與你的利益不會永遠一致。大勢力之間的合作、體面與整體成本，常常比一名外門弟子的立場更重要。'),

    ch4_plague_leave_after_seen: S('凡人疫村', '善惡太便宜', [
      '你離開柳溪村時已經很難再把問題分成「做好事」或「不管閒事」。',
      '留下會花錢、花信用、得罪人，也可能真的少死一些；離開能保住退路，世界也不一定因此崩掉。',
      '真正的判斷開始變成：你承擔得起哪些後果？又準備把多少風險留給別人？'
    ], { choices: [{ text: '回白石城。那晚，城北鐘聲忽然響起', next: 'ch4_siege_bells', intelDelta: 5 }] }),

    ch4_siege_bells: S('城破之夜', '第一聲不是爆炸，是鐘', [
      '一長兩短：北門封。兩長一短：西門也封。第三輪鐘聲沒有規律，像有人在死前一直撞同一口鐘。',
      '客棧裡同時出現七種消息：妖群、顧家叛亂、赤霞門封城、古玉簡啟陣、疫病、青雲宗攻城。',
      '真相還沒到，市場已經先漲價。符、藥、米、房間全部重新定價。'
    ], {
      choices: [
        { text: '先回青雲藥行，找宗門據點', next: 'ch4_siege_shop', factionSectDelta: 3 },
        { text: '先去黑市問出口與哪幾條街已封', next: 'ch4_siege_blackroute', blackCreditDelta: 2, intelDelta: 8 },
        { text: '先向城主府報到，官方令最容易留下合法紀錄', next: 'ch4_siege_order', factionGovDelta: 4 }
      ]
    }),

    ch4_siege_shop: S('城破之夜', '周掌櫃不見了', [
      '青雲藥行門開著。最值錢的藥還在，反而少了三本帳冊。後院有一小灘還溫的血。',
      '桌下半張燒紙只剩：「子時……東三井……內應……柳……」',
      '最後一個「柳」可能指柳執事、柳家、柳溪村，甚至另一個姓柳的人。殘紙能救命，也能害你把所有線連錯。'
    ], {
      choices: [
        { text: '帶上殘紙，先報「東三井異常」，不先指認柳家', next: 'ch4_siege_order', intelDelta: 10, factionSectDelta: 1 },
        { text: '留在藥行找缺的是哪三本帳', next: 'ch4_siege_account_clue', intelDelta: 12, risk: '中' },
        { text: '周掌櫃可能已撤，別困在空據點', next: 'ch4_siege_order', appraisalDelta: 4 }
      ]
    }),

    ch4_siege_account_clue: S('城破之夜', '缺的都是陣務往來', [
      '三本缺冊全和護城陣靈石、萬珍閣、顧家礦貨有關。',
      '周掌櫃可能是內鬼，也可能正因發現了內鬼才拿走帳。',
      '你多知道一層，也多握了一層會讓上面人不舒服的東西。'
    ], { choices: [{ text: '去東三井前先取得正式徵召身分', next: 'ch4_siege_order', intelDelta: 8 }] }),

    ch4_siege_blackroute: S('城破之夜', '黑市先賣路', [
      '洗馬巷已經開始按分鐘賣消息。南巷可走，西橋堵死，東三井附近巡衛突然翻倍。',
      '如果你的黑市信用夠，管事還提到第三口井下有舊排水道。',
      '平時那些很小的交易，到了災難時才變成有人願不願替你開一扇門。'
    ], {
      choices: [
        { text: '記下排水道，不急著逃，先處理宗門徵召', next: 'ch4_siege_order', intelDelta: 10, blackCreditDelta: 2 },
        { text: '現在就走排水道', next: 'ch4_siege_escape_check', requires: { blackCredit: 6 }, requireText: '需要黑市信用 6', factionBlackDelta: 5 }
      ]
    }),

    ch4_siege_order: S('城破之夜', '正式徵召', [
      '城主府巡衛持三家宗門共署令：「所有宗門在城弟子，持牌到西陣集合。」青雲宗印也在。',
      '真令比假令麻煩。你若拒絕，會留下正式紀錄。',
      '第一章的你逃就逃了。現在身份本身成了繩子。'
    ], {
      choices: [
        { text: '依法去西陣報到', next: 'ch4_siege_west', factionGovDelta: 5, factionSectDelta: 3 },
        { text: '先報到，再找機會離開', next: 'ch4_siege_west', wantedDelta: 1, intelDelta: 3 },
        { text: '花靈石找身形相近散修替你點卯', next: 'ch4_siege_proxy', spiritStoneDelta: -3, karmaDelta: -10, wantedDelta: -2 },
        { text: '直接違令，走地下路', next: 'ch4_siege_escape_check', wantedDelta: 10, factionGovDelta: -8, factionSectDelta: -4 }
      ]
    }),

    ch4_siege_proxy: S('城破之夜', '你的名字先死了', [
      '散修拿你的腰牌去西陣。他本以為只點名，結果所有報到低階修士都被留在陣腳。',
      '他死在第二輪衝擊。官方陣亡冊寫的是你的名字。',
      '你本人還活著，身份卻被凍結。你用三塊靈石買到一條命，也把自己從社會上殺掉一次。'
    ], {
      choices: [
        { text: '承認冒名，保住原身份但吃重罰', next: 'ch4_siege_after_proxy', wantedDelta: 15, factionSectDelta: -8, karmaDelta: -8 },
        { text: '讓「王狗蛋已死」成立，換身份走黑市', next: 'ch4_end_fugitive', blackCreditDelta: 8, wantedDelta: -8, factionBlackDelta: 6, karmaDelta: -12 }
      ]
    }),

    ch4_siege_after_proxy: S('城破之夜', '活著回到自己的名字', [
      '城主府把你列為違令與冒用陣務名額，青雲宗也記大過。',
      '至少你沒有把那名散修的死繼續抹掉。',
      '你保住名字，代價是名字後面多了一長串很難看的字。'
    ], { choices: [{ text: '既然無法進安全區，去東三井找周掌櫃', next: 'ch4_siege_eastwell', wantedDelta: 5, karmaDelta: 3 }] }),

    ch4_siege_west: S('城破之夜', '最外圈', [
      '陣中心是築基，再外是練氣後期、有家族的散修，最外圈才是你們與凡人兵。',
      '你一眼看懂為什麼城主府缺低階修士：不是人少，是需要緩衝層。',
      '疫村那個主張燒紅布屋的赤霞門弟子很快吐血倒下。陣官只喊：「補位！」昨天能決定別人死活的人，今天也只是可補的陣位。'
    ], {
      choices: [
        { text: '守完第一輪，利用正式身分申請撤去東三井查異常', next: 'ch4_siege_eastwell', requires: { intel: 20 }, requireText: '需要情報 20', factionGovDelta: 3, qiDelta: -10 },
        { text: '繼續守西陣，先把眼前城牆撐住', nextPool: [
          { next: 'ch4_siege_safezone', weight: 70 },
          { next: 'ch4_siege_west_death', weight: 30 }
        ], qiDelta: -15, factionGovDelta: 5, factionSectDelta: 3 },
        { text: '趁換陣時離開', next: 'ch4_siege_escape_check', wantedDelta: 7, factionGovDelta: -5 }
      ]
    }),

    ch4_siege_west_death: death('城破之夜', '補位', [
      '前面一人吐血倒下，陣官喊補位。你站上去時已經知道自己在做什麼。',
      '第三次反震從腳底灌進來，你聽見骨頭裡有很細的裂聲。',
      '城牆多撐了一段時間。你的名字進了撫恤冊。這一世至少沒有被寫成失蹤。'
    ], '在護城西陣最外圈承受連續反震，靈脈與臟器崩裂死亡。', '他終於成了宗門正式記錄裡的人。\n欄位是：陣亡。', '進入體制能換來正式保護與記錄，也會換來正式義務。身份不是只有福利；危機時它會要求你站到對應的位置。'),

    ch4_siege_safezone: S('城破之夜', '西內坊安全區', [
      '城主府開放西內坊集中避難。外來修士、商戶與重要家眷可登記進入。你符合。',
      '凡人難民大多不符合。容量有限時，秩序只是把「誰比較值得救」寫成名冊。',
      '你注意到入口有人量血氣、按修為分區，地上還有舊陣紋。'
    ], {
      choices: [
        { text: '先看高階修士家眷和低階外來者是不是同區', nextPool: [
          { next: 'ch4_siege_safe_real', weight: 55 },
          { next: 'ch4_siege_safe_sacrifice', weight: 45 }
        ], intelDelta: 8, appraisalDelta: 6 },
        { text: '城主府正式安全區，直接進', nextPool: [
          { next: 'ch4_siege_safe_real', weight: 58 },
          { next: 'ch4_siege_safe_death', weight: 42 }
        ], factionGovDelta: 3 },
        { text: '徵兆不對，去東三井', next: 'ch4_siege_eastwell', intelDelta: 4 }
      ]
    }),

    ch4_siege_safe_real: S('城破之夜', '這次真的只是避難', [
      '高階與低階雖分區，但只是方便護衛與醫師調度。沒有抽血陣，也沒有封閉靈脈。',
      '外面打了一夜，裡面很擠、有人搶水，但城主府真的守住。',
      '上一世若死在安全區，也不能把「官方安全區必是祭壇」背成答案。'
    ], { choices: [{ text: '天亮前收到東三井急報，決定是否再出去', next: 'ch4_siege_eastwell', factionGovDelta: 5, qiDelta: 5 }] }),

    ch4_siege_safe_sacrifice: S('城破之夜', '量血氣不是為了醫療', [
      '你多看了一眼，發現高階家眷根本不在這個陣紋區。被量血氣、按修為排位的，全是外來低階修士。',
      '護城主陣有一個備用方案，需要大量活人靈血穩陣。你現在比城外凡人重要，所以能進；又沒重要到不能犧牲。',
      '你正好是最好用的那一層。'
    ], {
      choices: [
        { text: '趁尚未封門離開', next: 'ch4_siege_eastwell', wantedDelta: 3, factionGovDelta: -4, intelDelta: 10 },
        { text: '拿青雲宗與柳執事身份質問', next: 'ch4_siege_safe_death', factionSectDelta: 2, risk: '極高' }
      ]
    }),

    ch4_siege_safe_death: death('城破之夜', '城保住了', [
      '門關後地面陣紋亮起，靈力開始從腳下抽走。高台上說：「諸位為守城出力，事後必有重賞。」',
      '你報青雲宗。對方說已同意。你報柳執事。對方說柳道友也知情。',
      '靠山名字一個個報出去都沒用。不是他們不怕，是你的靠山和他們站在同一張契約上。'
    ], '進入城主府外來修士安全區，被作為護城陣備用靈血與靈力來源抽乾。', '城主府說要保護他。\n這句話是真的。\n城保住了。', '官方避難區有時安全，有時是徵召池或資源池。看分區、陣紋、血氣檢查與高階家眷是否同區，比背「別信官方」更有用。'),

    ch4_siege_eastwell: S('城破之夜', '東三井下', [
      '井下舊陣室裡，周掌櫃還活著，手臂有傷。地上躺著一名城主府陣師。',
      '周掌櫃把帳冊丟給你。上面是半年來護城陣靈石被抽走轉賣的紀錄。',
      '「柳執事要我拿帳。」他說。「補陣，是我自己想做。」一個會塞你舊鑄靈錢的人，也可以做一次沒人命令的好事。'
    ], {
      choices: [
        { text: '把最後靈石灌進陣眼，帳會燒掉', next: 'ch4_siege_burn_accounts', karmaDelta: 8, factionGovDelta: 2, factionSectDelta: -1 },
        { text: '保帳離開，讓證據活到天亮', next: 'ch4_siege_keep_accounts', intelDelta: 15, factionSectDelta: 5, factionGovDelta: -5, karmaDelta: -2 },
        { text: '先抄關鍵頁，再用原帳補陣', next: 'ch4_siege_copy_accounts', requires: { intel: 35 }, requireText: '需要情報 35', intelDelta: 8, qiDelta: -10 }
      ]
    }),

    ch4_siege_burn_accounts: S('城破之夜', '二十七分鐘', [
      '帳冊進陣火。東陣重新亮起，實際只多撐二十七分鐘。約九百人趁這段時間撤進內坊。',
      '貪墨證據沒了。事後城主府把責任推給「外敵內應」。',
      '你救了一批人，也讓一批本來可能被追責的人逃過。好的結果和壞的結果一起存在。'
    ], { choices: [{ text: '陣穩後去南門', next: 'ch4_siege_gate', karmaDelta: 6, factionGovDelta: 3 }] }),

    ch4_siege_keep_accounts: S('城破之夜', '證據活下來了', [
      '東陣比另一條路早塌二十多分鐘。死的人更多。',
      '帳冊最後能換掉陣務官、罰商號、逼出部分礦權，後續城防真的修好一些。',
      '你不知道這算不算用當晚的死人換未來少死。沒有另一條時間線給你驗證。'
    ], { choices: [{ text: '帶帳往南門撤', next: 'ch4_siege_gate', intelDelta: 10, factionSectDelta: 4, wantedDelta: 2 }] }),

    ch4_siege_copy_accounts: S('城破之夜', '想兩邊都保', [
      '你抄下幾頁最關鍵的名字，再把原帳投入陣眼。',
      '東陣仍多撐一段，但比完整投入短。你手裡也只剩不完整證據。',
      '折衷不是沒有代價，只是把兩邊的損失都縮小，也把兩邊的確定性都降低。'
    ], { choices: [{ text: '帶副本離開', next: 'ch4_siege_gate', intelDelta: 12, factionSectDelta: 2, factionGovDelta: 1 }] }),

    ch4_siege_gate: S('城破之夜', '三十息關門', [
      '南街隔火門準備落下。門外還有數百人。關門能保內坊，不關，妖與火可能一起進來。',
      '校尉喊：「三十息！」有人摔倒，有人回頭扶，有人把孩子直接往前扔。',
      '這一次你的手真的可以按在門機上。'
    ], {
      choices: [
        { text: '幫忙關門，守住裡面', next: 'ch4_siege_gate_closed', factionGovDelta: 4, karmaDelta: -4 },
        { text: '最後十息出去拉人', nextPool: [
          { next: 'ch4_siege_gate_saved', weight: 58 },
          { next: 'ch4_siege_gate_death', weight: 42 }
        ], karmaDelta: 8, risk: '極高' },
        { text: '不阻止，也不親手幫關；去找別的出口', next: 'ch4_siege_escape_check', karmaDelta: -1 }
      ]
    }),

    ch4_siege_gate_closed: S('城破之夜', '一隻手卡在門縫', [
      '門落到一半，一個女人把孩子從縫裡推進來，自己沒進。她的手卡在門縫，校尉叫人砍掉，免得門關不實。',
      '你幫忙關門，可能保住裡面幾千人。孩子卻只記得你站在門機旁。',
      '宏大的正確，不會讓具體的人變得比較不死。'
    ], { choices: [{ text: '內坊暫穩，去處理自己的通緝與去向', next: 'ch4_siege_gu', karmaDelta: -3 }] }),

    ch4_siege_gate_saved: S('城破之夜', '差半步，但這次抓住了', [
      '你拉起老人與孩子，回身時隔火門已落到肩高。陳槐在裡面伸手把你拽進去。',
      '妖爪在門縫外擦過靴底。',
      '你沒有因此證明「出去救人一定對」。只是這一次，你付出的風險沒有收走你的命。'
    ], { choices: [{ text: '喘口氣，顧十三來找你', next: 'ch4_siege_gu', qiDelta: -10, karmaDelta: 8 }] }),

    ch4_siege_gate_death: death('城破之夜', '差半步', [
      '你拖回老人和孩子。門開始落，你差半步。',
      '陳槐在裡面抓住你手，鐵背狼咬住另一條腿。你知道再拖下去他也會死，所以鬆手。',
      '門落下。你救出的兩個人後來是否活過第二天，沒人能保證。'
    ], '在隔火門關閉前出門救人，回撤失敗遭妖群拖走。', '他差半步回到門裡。\n有兩個人因他早了幾步。', '犧牲不應被保證「一定值得」。你能控制的是是否理解風險與代價，不是世界一定替你的勇敢安排漂亮回報。'),

    ch4_siege_escape_check: S('城破之夜', '排水道只夠一小隊', [
      '洗馬巷第三口井下的排水道能通城外，但入口正逐步被封。管事只肯讓少數人進。',
      '你的黑市信用、通緝程度和你之前有沒有替人守過帳，都會影響他願不願開門。'
    ], {
      choices: [
        { text: '用黑市信用換路，按管事指定只帶兩人', next: 'ch4_siege_escape_good', requires: { blackCredit: 6 }, requireText: '需要黑市信用 6', factionBlackDelta: 6, wantedDelta: -3 },
        { text: '誰都想帶，大家擠一擠', next: 'ch4_siege_escape_death', karmaDelta: 8, risk: '極高' },
        { text: '沒有足夠信用，回地面找顧十三', next: 'ch4_siege_gu' }
      ]
    }),

    ch4_siege_escape_good: S('城破之夜', '信用第一次真的救命', [
      '你帶著管事指定的符墨老人和一名陌生女人下井。陳槐沒有跟，他說自己還能走宗門線。',
      '你曾以為「不帶他」像背叛。三天後才知道他在西陣重傷，但活了。',
      '別人也有自己的路。你不必把所有人的生死都扛成自己的選擇。'
    ], { choices: [{ text: '出城後等消息', next: 'ch4_siege_dawn', factionBlackDelta: 4, wantedDelta: -4 }] }),

    ch4_siege_escape_death: death('城破之夜', '出口沒有留給任何人', [
      '你多帶陳槐、趙醫官、孩子、兩個求你的人。排水道變得很慢。',
      '一個孩子哭，井上巡衛聽見。前後出口一起被封，煙灌進狹窄地道。',
      '修為在這裡沒有太大用。你不願留下一個人，最後出口沒有留給任何人。'
    ], '在容量有限的地下逃生道超額帶人，暴露後遭封堵與煙熏死亡。', '他不願留下一個人。\n所以出口最後沒有留給任何人。', '善意也受物理容量限制。有限通道、時間與空氣不是道德題；忽視容量會讓原本能救的人一起失去出口。'),

    ch4_siege_gu: S('城破之夜', '顧十三的木匣', [
      '顧十三帶血來找你：「跟我走。」顧家內院比街上安全，代價是替他帶一只黑木匣出城。',
      '他說裡面是「會死人那種帳」。可能真是帳，也可能是靈石、陣鑰、柳顧往來信，甚至可能只是測內鬼的空盒。',
      '你已經不再相信「不要問裡面是什麼」的東西。'
    ], {
      choices: [
        { text: '接受，但只承諾帶到城外，不承諾交給誰', next: 'ch4_siege_box', factionGuDelta: 10, wantedDelta: -2 },
        { text: '拒絕，不再加一條新的債', next: 'ch4_siege_scapegoat', factionGuDelta: -4 },
        { text: '答應後偷偷驗匣', nextPool: [
          { next: 'ch4_siege_box', weight: 60 },
          { next: 'ch4_siege_gu_betray', weight: 40 }
        ], intelDelta: 8, factionGuDelta: -5, risk: '高' }
      ]
    }),

    ch4_siege_gu_betray: death('城破之夜', '盒子就是測試', [
      '盒子裡什麼都沒有。顧十三故意讓你拿著，想看隊伍裡誰會忍不住開。',
      '你打開時，護衛就在後面。',
      '他沒有把你當大敵，只把你當一個在城破夜不能再信的小人物。處理得很快。'
    ], '在接受顧家庇護條件後私自開啟誘餌木匣，被視為內鬼當場處決。', '盒子是空的。\n因此他的死，\n裝得特別滿。', '查驗可以降低物品風險，但也可能直接破壞關係契約。情報獲取本身要算入被發現的成本。'),

    ch4_siege_box: S('城破之夜', '手上多了一件不能丟的東西', [
      '木匣沒有立刻害你。顧家真的給了一條較安全的內院通道。',
      '同時你從「青雲宗外門」又多了一個外部標籤：顧十三願意托東西的人。',
      '靠山會給路，也會替你分配敵人。'
    ], { choices: [{ text: '先活過今晚，天亮再談匣子', next: 'ch4_siege_scapegoat', factionGuDelta: 6 }] }),

    ch4_siege_scapegoat: S('城破之夜', '大小剛好', [
      '天快亮時，城主府開始查東三井。周掌櫃失蹤，你又是現場出現過的青雲弟子。',
      '城主府不想指控青雲宗，青雲宗也不想承認據點有問題。最佳方案是一個外門弟子私自行事。',
      '你夠有身份，能解釋為什麼進得去；又不夠重要，不值得宗門翻桌。大小剛好。'
    ], {
      choices: [
        { text: '交出自己掌握的帳與時間線，硬證明不是你', next: 'ch4_siege_clear_name', requires: { intel: 35 }, requireText: '需要情報 35', factionGovDelta: 2, factionSectDelta: 2 },
        { text: '把線索推給已死的白石幫小頭目', next: 'ch4_siege_push_blame', karmaDelta: -15, factionBlackDelta: -8, wantedDelta: -6 },
        { text: '相信宗門會把你撈出去，不說太多', nextPool: [
          { next: 'ch4_siege_clear_name', weight: 45 },
          { next: 'ch4_siege_scapegoat_death', weight: 55 }
        ], factionSectDelta: 4 }
      ]
    }),

    ch4_siege_clear_name: S('城破之夜', '做對一件事，不等於做對所有人的事', [
      '你把時辰、陣務帳與誰先到東三井拼成一條能驗證的線。城主府暫時放你。',
      '青雲外務堂卻問：「為何把帶柳字殘紙交外人？」',
      '你救城可能是真的，讓宗門難堪也是真的。兩件事不互相抵消。'
    ], { choices: [{ text: '接受宗門內部降評，至少不讓死人背鍋', next: 'ch4_siege_dawn', factionSectDelta: -3, karmaDelta: 6, wantedDelta: -4 }] }),

    ch4_siege_push_blame: S('城破之夜', '世界很順暢地接受了', [
      '你把幾條本來互不相干的線拼成一個七分真的故事：白石幫小頭目受外敵收買，破壞東三井，周掌櫃發現後失蹤。',
      '小頭目已死，無法反駁。城主府接受，青雲宗接受，白石幫也不願為死人和兩邊翻臉。',
      '你甚至得到兩點功勞。沒有天雷。世界只是順暢地獎勵了一次風險轉嫁。'
    ], { choices: [{ text: '天亮了。記住這一次真的有效', next: 'ch4_siege_dawn', meritDelta: 2, karmaDelta: -12, factionSectDelta: 4, wantedDelta: -5 }] }),

    ch4_siege_scapegoat_death: death('城破之夜', '大小剛好', [
      '宗門沒翻桌。城主府也沒把事情擴成宗門衝突。',
      '三天後官方紀錄寫你「畏罪自盡」。你沒有自盡。',
      '太小的人不值得解釋，太大的人不能拿來解釋。你大小剛好。'
    ], '城破後成為青雲宗與城主府之間最便宜的責任承擔者，被秘密處置並記為畏罪自盡。', '太小的人不值得解釋。\n太大的人不能拿來解釋。\n他大小剛好。', '背鍋往往不是因為你最有錯，而是因為你的身份足以解釋事件、又不足以讓上面為你支付衝突成本。'),

    ch4_siege_dawn: S('城破之夜', '白石城沒有停下來哀悼', [
      '天亮後，城牆還在大半。三條街燒掉，北門破，萬珍閣塌一角。午前已有人重新擺攤。',
      '一碗麵從十二文漲到三十。清瘟散更貴。屍體搬運一具五文。',
      '災難不是結局。對很多人來說，只是下一個市場。'
    ], {
      choices: [
        { text: '先回青雲宗接受清算', next: 'ch4_aftermath_return', factionSectDelta: 2 },
        { text: '通緝太高，先走黑市假身份', next: 'ch4_end_fugitive', requires: { wanted: 12 }, requireText: '需要通緝 12', factionBlackDelta: 5 },
        { text: '顧家願保，留在白石城做掛名行走', next: 'ch4_end_gu', requires: { factionGu: 8 }, requireText: '需要顧家傾向 8', factionGuDelta: 5 }
      ]
    }),

    ch4_aftermath_return: S('後果', '山門沒有晚一刻', [
      '你帶著煙味、傷、通緝或人情回山。晨鐘照響，外門弟子照樣排隊領差事。',
      '守門弟子只看腰牌：「回來了？」你點頭。他讓下一個人上前。',
      '大勢力真正的穩定不是不死人，是死多少人都有人補位置。理解這件事，比單純恨它更危險。'
    ], {
      choices: [
        { text: '如實交代自己在白石城做過的事', next: 'ch4_aftermath_review', factionSectDelta: 4, karmaDelta: 2 },
        { text: '只報有利於宗門的部分', next: 'ch4_aftermath_review', factionSectDelta: 6, karmaDelta: -4, wantedDelta: 1 }
      ]
    }),

    ch4_aftermath_review: S('後果', '能辦事，不守線', [
      '外務堂先問：藥送到沒有？柳席有沒有失禮？帳冊剩多少？城破時站哪邊？',
      '你很難回答最後一題。你用過黑市的路、王府的陣、顧家的名帖、青雲宗的身份。',
      '陣營不是你按下加入才成立。別人早已根據你做過的事，替你分好類。'
    ], {
      choices: [
        { text: '接受「能辦事、不守線」評語', next: 'ch4_end_deputy', intelDelta: 5 },
        { text: '拒絕再進外務，只想回普通外門', next: 'ch4_end_clean', factionSectDelta: -3 }
      ]
    }),

    ch4_end_deputy: survive('第四章章末', '白石藥路，副領', [
      '七天後，外務堂桌上放著一面新木牌：白石藥路，副領。',
      '你真的往上走了一層。每月有固定靈石，也第一次有權帶三個新人。',
      '門外三個少年衣服很新。最年輕的那個問：「師兄，這趟危險嗎？」',
      '你差一點說「不危險」，因為這樣最好帶。你停住。第三章你看別人死，第四章你看見大家把代價往下傳。現在，代價第一次停在你手裡。'
    ], '第四章真正的成長不是更能打，而是你開始有權分配風險。第五章會問：既然總要有人先去，為什麼不能是別人？', {
      ageAtEnd: 22,
      closestMoment: '第一次有權安排三名新人誰探路、誰守夜、誰斷後',
      continueTo: 'ch5_entry_deputy',
      continueLabel: '第五章：代價停在你手裡'
    }),

    ch4_end_clean: survive('第四章章末', '無失', [
      '你沒有把每個機會都抓住，也沒有把每條線都查到底。',
      '外務堂最後只給兩個字：「無失。」',
      '你資源普通、關係普通、通緝很低，退路最多。保守不是失敗，只是它真的會讓翻身速度慢很多。'
    ], '謹慎可以是合理勝利。它保留退路，代價是較少資源、較少深層關係與較窄的上升入口。', {
      ageAtEnd: 49,
      closestMoment: '在白石仙城完整辦完一次外務而沒有留下大債',
      continueTo: 'ch5_entry_clean',
      continueLabel: '第五章：你仍然要帶新人'
    }),

    ch4_end_fugitive: survive('第四章章末', '有名字不能用', [
      '王府通緝、白石城禁入、青雲宗暫時不承認你的公差身份。黑市給你一張假路引。',
      '你有功法、有情報、有幾個能報的名字，卻不能光明正大進城。',
      '合法選項變貴後，灰色手段會自然變得更有吸引力。不是性格忽然黑化，是環境正在替你塑形。'
    ], '通緝不是單純 Debuff。它提高官方生活成本，也會打開黑市、逃亡、灰色商隊路線；長期會改變玩家願意使用的手段。', {
      ageAtEnd: 31,
      closestMoment: '活著看見自己的名字從官方記錄裡失效',
      continueTo: 'ch5_entry_fugitive',
      continueLabel: '第五章：沒有乾淨身份的人怎麼帶人'
    }),

    ch4_end_gu: survive('第四章章末', '兩棵樹之間', [
      '顧家給你「掛名行走」：每月兩塊靈石，白石城有住處，需要時替顧家送信、驗貨、陪交易。',
      '你仍是青雲外門。顧十三說：「只要兩邊都覺得你有用，就能兩邊站。」',
      '這確實比以前自由。也意味著兩棵樹若哪天往不同方向倒，你可能是最先被撕開的那根藤。'
    ], '多靠山不是單純疊加安全。每增加一條關係，也增加衝突義務、情報暴露與被迫選邊的可能。', {
      ageAtEnd: 36,
      closestMoment: '同時被青雲宗與顧家視為「可以用的人」',
      continueTo: 'ch5_entry_gu',
      continueLabel: '第五章：現在你也有下面的人'
    })
  };
})();
