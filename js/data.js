// PET English Daily Check-in - Passage Data
// 8 passages with questions, hints, and vocabulary examples for PET B1 level

const PASSAGES = [
  {
    id: 1,
    theme: "School Life",
    themeEmoji: "🏫",
    title: "A Typical School Day",
    text: `My school day begins at eight o'clock, although I often arrive fifteen minutes early to chat with friends. We walk to school together, discussing our homework or planning what we might do at lunchtime.\n\nOur morning lessons are usually the most <b>demanding</b>. Mathematics, for instance, requires considerable concentration, especially when we're solving complex problems. Our teacher, Mrs Green, is remarkably <b>patient</b> and always explains things thoroughly until everyone understands.\n\nDuring the break, I prefer to spend time in the <b>courtyard</b>, where we can relax and <b>socialise</b> with classmates. The school <b>canteen</b> offers a variety of meals, though I usually bring my own lunch from home.\n\nAfter school, I attend the library twice a week. I'm particularly <b>fond</b> of adventure novels, which transport me to exciting worlds. I find reading an excellent way to <b>unwind</b> after a busy day.`,
    vocabulary: [
      { word: "demanding", phonetic: "/dɪˈmɑːndɪŋ/", meaning: "要求高的，费力的", examples: ["The exam was more demanding than I expected.", "She has a demanding job that requires long hours.", "Learning a new language can be demanding but rewarding."] },
      { word: "patient", phonetic: "/ˈpeɪʃnt/", meaning: "有耐心的", examples: ["You need to be patient when learning to play an instrument.", "The doctor was very patient with the worried patient.", "Teaching young children requires a patient approach."] },
      { word: "courtyard", phonetic: "/ˈkɔːtjɑːd/", meaning: "庭院，操场", examples: ["Students gather in the courtyard during breaks.", "The old house has a beautiful courtyard with flowers.", "We played games in the courtyard after school."] },
      { word: "socialise", phonetic: "/ˈsəʊʃəlaɪz/", meaning: "社交，交流", examples: ["School helps children learn to socialise with others.", "He finds it difficult to socialise at parties.", "We socialise with neighbours every weekend."] },
      { word: "canteen", phonetic: "/kænˈtiːn/", meaning: "食堂，小卖部", examples: ["The canteen serves healthy meals at reasonable prices.", "We decided to eat in the canteen today.", "The school canteen was crowded at lunchtime."] },
      { word: "fond", phonetic: "/fɒnd/", meaning: "喜爱的，喜欢的", examples: ["She is particularly fond of classical music.", "I'm fond of walking in the countryside.", "He has always been fond of animals."] },
      { word: "unwind", phonetic: "/ɪʆnˈwaɪnd/", meaning: "放松，解压", examples: ["Reading helps me unwind after a stressful day.", "She likes to unwind by listening to music.", "It's important to unwind before going to bed."] }
    ],
    questions: [
      {
        type: "detail",
        question: "Why does the writer arrive at school early?",
        options: ["To finish homework", "To chat with friends", "To help the teacher"],
        answer: 1,
        hint: "📖 回到文章第一段第一句！原文说：\'although I often arrive fifteen minutes early to chat with friends\'——作者早到是为了和朋友聊天。"
      },
      {
        type: "vocabulary",
        question: "What does \"demanding\" mean in this context?",
        options: ["Easy and relaxing", "Requiring a lot of effort", "Boring and repetitive"],
        answer: 1,
        hint: "🔍 文章第二段说数学课 \'requires considerable concentration\'，需要很多注意力。所以 demanding 的意思是“要求高的、费力的”。"
      },
      {
        type: "inference",
        question: "What can we infer about the writer's attitude to school?",
        options: ["They find it stressful and unpleasant", "They have a balanced and positive view", "They only care about reading books"],
        answer: 1,
        hint: "🧠 通读全文，作者既描述了学习的挑战（demanding lessons），也描述了享受的部分（socialising, reading）。这说明作者对学校生活有平衡且积极的看法。"
      },
      {
        type: "detail",
        question: "Where does the writer prefer to spend time during breaks?",
        options: ["In the classroom", "In the courtyard", "In the library"],
        answer: 1,
        hint: "📖 文章第三段说：'During the break, I prefer to spend time in the courtyard'——作者喜欢在庭院度过课间。"
      },
      {
        type: "vocabulary",
        question: "What does 'unwind' mean in the last paragraph?",
        options: ["To get more stressed", "To relax and rest", "To study harder"],
        answer: 1,
        hint: "🔍 文章最后说阅读是 'an excellent way to unwind after a busy day'——在忙碌一天后放松的好方法。所以 unwind 的意思是'放松、解压'。"
      },
      {
        type: "inference",
        question: "What does the writer usually do after school?",
        options: ["Play sports with friends", "Attend the library twice a week", "Go straight home"],
        answer: 1,
        hint: "🧠 文章最后一段说：'After school, I attend the library twice a week'——作者每周去两次图书馆。"
      },
    ]
  },
  {
    id: 2,
    theme: "Friendship",
    themeEmoji: "🤝",
    title: "An Unforgettable Friendship",
    text: `My closest friend, Lily, and I have known each other since we were five. She lives directly <b>opposite</b> my house, which means we've grown up practically as neighbours. Our friendship has <b>developed</b> gradually over the years.\n\nLily is remarkably <b>cheerful</b> and has a natural ability to make people feel comfortable. She's always <b>willing</b> to listen when I'm having problems, and her <b>advice</b> is usually sensible and helpful. What I <b>admire</b> most about her is her honesty—she never pretends to be someone she's not.\n\nWe share many interests, particularly outdoor activities. Every Saturday, we cycle to the park near the river, where we sometimes <b>encounter</b> interesting wildlife. Last summer, we <b>participated</b> in a camping trip together, which was an absolutely <b>memorable</b> experience.\n\nI consider myself extremely <b>fortunate</b> to have such a genuine friend. Our friendship has taught me the importance of trust and <b>loyalty</b>.`,
    vocabulary: [
      { word: "opposite", phonetic: "/ˈɒpəzɪt/", meaning: "对面，对岸", examples: ["The bank is opposite the post office.", "She sat opposite me during the interview.", "Our house is opposite the school."] },
      { word: "developed", phonetic: "/dɪˈveləpt/", meaning: "发展的，形成的", examples: ["Their friendship developed over many years.", "The city has developed rapidly since 2000.", "She developed an interest in painting at school."] },
      { word: "cheerful", phonetic: "/ˈtʃɪəfəl/", meaning: "快乐的，阳光的", examples: ["She has a cheerful personality that attracts friends.", "The room was bright and cheerful.", "He remained cheerful despite the difficulties."] },
      { word: "willing", phonetic: "/ˈwɪlɪŋ/", meaning: "愉意的，乐意的", examples: ["She's always willing to help her classmates.", "Are you willing to try something new?", "He was willing to admit his mistake."] },
      { word: "admire", phonetic: "/ədˈmaɪə/", meaning: "钦佩，赞赏", examples: ["I admire her courage and determination.", "We admired the beautiful view from the hill.", "She admires people who work hard."] },
      { word: "encounter", phonetic: "/ɪnˈkaʊntə/", meaning: "遇到，偶遇", examples: ["We encountered many difficulties during the project.", "She encountered an old friend at the station.", "The hikers encountered wild animals in the forest."] },
      { word: "memorable", phonetic: "/ˈmemərəbəl/", meaning: "难忘的，值得纪念的", examples: ["The trip was a memorable experience for everyone.", "It was a memorable day in our lives.", "She gave a memorable speech at the ceremony."] },
      { word: "fortunate", phonetic: "/ˈfɔːtʃənət/", meaning: "幸运的，幸福的", examples: ["I feel fortunate to have such good friends.", "She was fortunate to pass the exam.", "We were fortunate with the weather that day."] },
      { word: "loyalty", phonetic: "/ˈlɔɪəlti/", meaning: "忠诚，忠心", examples: ["Loyalty is an important quality in a friend.", "The dog showed great loyalty to its owner.", "He earned their loyalty through his kindness."] }
    ],
    questions: [
      {
        type: "detail",
        question: "What does the writer admire most about Lily?",
        options: ["Her cheerful personality", "Her honesty", "Her cycling skills"],
        answer: 1,
        hint: "📖 回到文章第二段最后一句！原文说：\'What I admire most about her is her honesty\'——作者最欣赏 Lily 的诚实。"
      },
      {
        type: "vocabulary",
        question: "Which word is closest in meaning to \"encounter\"?",
        options: ["Avoid completely", "Meet unexpectedly", "Plan carefully"],
        answer: 1,
        hint: "🔍 文章第三段说他们在公园 \'sometimes encounter interesting wildlife\'——偶尔遇到有趣的野生动物。所以 encounter 的意思是“偶遇、遇到”。"
      },
      {
        type: "inference",
        question: "What has the writer learned from this friendship?",
        options: ["That friends should live nearby", "The value of trust and loyalty", "How to cycle long distances"],
        answer: 1,
        hint: "🧠 文章最后一句说：\'Our friendship has taught me the importance of trust and loyalty\'——这段友谊教会了作者信任和忠诚的重要性。"
      },
      {
        type: "detail",
        question: "What outdoor activity do the writer and Lily enjoy together?",
        options: ["Swimming", "Cycling", "Running"],
        answer: 1,
        hint: "📖 文章第三段说：'Every Saturday, we cycle to the park near the river'——每周六他们骑车去公园。"
      },
      {
        type: "vocabulary",
        question: "What does 'fortunate' mean in the last paragraph?",
        options: ["Unlucky", "Lucky and happy", "Sad and disappointed"],
        answer: 1,
        hint: "🔍 文章说：'I consider myself extremely fortunate to have such a genuine friend'——作者觉得自己非常幸运。所以 fortunate 的意思是'幸运的'。"
      },
      {
        type: "inference",
        question: "How long have the writer and Lily been friends?",
        options: ["Since they were five", "Since last year", "Since high school"],
        answer: 0,
        hint: "🧠 文章第一段说：'Lily, and I have known each other since we were five'——从五岁开始就认识了。"
      },
    ]
  },
  {
    id: 3,
    theme: "Animals",
    themeEmoji: "🦁",
    title: "A Visit to the Wildlife Park",
    text: `Last Sunday, my family visited the city's wildlife park. The weather was <b>exceptionally</b> pleasant, making it an ideal day for outdoor activities.\n\nOur first destination was the lion enclosure. The male lion, with its <b>magnificent</b> golden mane, appeared remarkably <b>powerful</b> yet dignified. It was resting peacefully in the sunshine while the female lion <b>patrolled</b> the perimeter of their habitat.\n\nThe monkey enclosure proved to be the most <b>entertaining</b> area. The monkeys were <b>agile</b> and playful, swinging from branch to branch with impressive skill. One <b>mischievous</b> young monkey actually managed to <b>snatch</b> a visitor's sunglasses! The crowd erupted in laughter.\n\nHowever, my most <b>memorable</b> experience was in the aquarium section. I observed various <b>spectacular</b> marine creatures swimming gracefully through the water. The <b>vivid</b> colours of the tropical fish were absolutely <b>breathtaking</b>.\n\nBefore leaving, we purchased some <b>souvenirs</b> from the gift shop. The entire visit was an educational and enjoyable experience that I would highly <b>recommend</b>.`,
    vocabulary: [
      { word: "exceptionally", phonetic: "/ɪkˈsepʃənəli/", meaning: "异常地，特别地", examples: ["The weather was exceptionally warm for October.", "She is exceptionally talented at music.", "The task was exceptionally difficult to complete."] },
      { word: "magnificent", phonetic: "/mæɡˈnɪfɪsnt/", meaning: "壮观的，宏伟的", examples: ["The palace has a magnificent garden.", "She looked magnificent in her wedding dress.", "The view from the mountain was magnificent."] },
      { word: "patrolled", phonetic: "/pəˈtrəʊld/", meaning: "巡逻，巡视", examples: ["The guard patrolled the building all night.", "Police officers patrolled the streets.", "The lion patrolled around its territory."] },
      { word: "entertaining", phonetic: "/ˎntəˈteɪnɪŋ/", meaning: "有趣的，娱乐的", examples: ["The show was entertaining and educational.", "He is an entertaining speaker.", "We had an entertaining evening with friends."] },
      { word: "agile", phonetic: "/ˈædʒaɪl/", meaning: "敏捷的，灵活的", examples: ["Cats are naturally agile animals.", "The dancer was agile and graceful.", "You need to be agile to play tennis well."] },
      { word: "mischievous", phonetic: "/ˈmɪstʃɪvəs/", meaning: "淋皮的，恶作剧的", examples: ["The mischievous child hid behind the door.", "She had a mischievous smile on her face.", "The dog's mischievous behaviour amused everyone."] },
      { word: "snatch", phonetic: "/snætʃ/", meaning: "抢夺，突然拿走", examples: ["The thief snatched her bag and ran away.", "He snatched the opportunity to speak.", "The monkey snatched food from visitors."] },
      { word: "spectacular", phonetic: "/spekˈtækjələ/", meaning: "壮观的，惊人的", examples: ["The fireworks display was spectacular.", "She made a spectacular recovery from illness.", "The view from the top was spectacular."] },
      { word: "vivid", phonetic: "/ˈvɪvɪd/", meaning: "鲜明的，生动的", examples: ["The painting has vivid colours.", "She has vivid memories of her childhood.", "He gave a vivid description of the accident."] },
      { word: "breathtaking", phonetic: "/ˈbretʌteɪkɪŋ/", meaning: "惊叹的，惊人的", examples: ["The view from the cliff was breathtaking.", "She gave a breathtaking performance.", "The beauty of the sunset was breathtaking."] },
      { word: "recommend", phonetic: "/rekəˈmend/", meaning: "推荐，建议", examples: ["I highly recommend this restaurant.", "Can you recommend a good book?", "The doctor recommended that she rest."] }
    ],
    questions: [
      {
        type: "detail",
        question: "What did the mischievous monkey do?",
        options: ["It threw food at visitors", "It took a visitor's sunglasses", "It climbed on top of the enclosure"],
        answer: 1,
        hint: "📖 回到文章第三段！原文说：\'One mischievous young monkey actually managed to snatch a visitor's sunglasses\'——一只淋皮的小猴子抢走了游客的太阳镜。"
      },
      {
        type: "vocabulary",
        question: "What does \"agile\" mean in this context?",
        options: ["Slow and careful", "Quick and flexible", "Large and heavy"],
        answer: 1,
        hint: "🔍 文章第三段描述猴子 \'swinging from branch to branch with impressive skill\'——以令人印象深刻的技巧在树枝间摇摆。所以 agile 的意思是“敏捷的、灵活的”。"
      },
      {
        type: "inference",
        question: "What was the writer's overall impression of the visit?",
        options: ["It was disappointing and boring", "It was educational and enjoyable", "It was too expensive"],
        answer: 1,
        hint: "🧠 文章最后一句说：\'The entire visit was an educational and enjoyable experience that I would highly recommend\'——作者认为这是一次寓教于乐的体验。"
      },
      {
        type: "detail",
        question: "What did the young monkey take from a visitor?",
        options: ["A camera", "Sunglasses", "A hat"],
        answer: 1,
        hint: " 文章第三段说：'One mischievous young monkey actually managed to snatch a visitor's sunglasses'——小猴子抢走了游客的太阳镜。"
      },
      {
        type: "vocabulary",
        question: "What does 'enclosure' mean in this context?",
        options: ["An open field", "An enclosed area for animals", "A restaurant"],
        answer: 1,
        hint: "🔍 文章说猴子在'monkey enclosure'里——这是动物园里围起来的动物栅栏区域。"
      },
      {
        type: "inference",
        question: "What does the writer think of the zoo visit overall?",
        options: ["It was boring", "It was educational and enjoyable", "It was too expensive"],
        answer: 1,
        hint: "🧠 文章最后说：'The entire visit was an educational and enjoyable experience'——寓教于乐的体验。"
      },
    ]
  },
  {
    id: 4,
    theme: "Hobbies",
    themeEmoji: "🎨",
    title: "Discovering a New Passion",
    text: `Until last year, I hadn't considered myself particularly <b>creative</b>. However, everything changed when my art teacher <b>introduced</b> us to watercolour painting during a school workshop.\n\nInitially, I found the technique quite <b>challenging</b>. Controlling the water and <b>pigments</b> required considerable <b>precision</b> and patience. The colours would often <b>blend</b> in unexpected ways, which was both <b>frustrating</b> and fascinating.\n\nGradually, I began to <b>develop</b> my own style. I started <b>experimenting</b> with different brushes and techniques, discovering what worked best for me. My teacher <b>encouraged</b> me to enter a local art competition, which I did <b>reluctantly</b> at first.\n\nTo my <b>astonishment</b>, I won second prize! This <b>achievement</b> gave me the <b>confidence</b> to continue pursuing painting seriously. Now I spend most of my free time creating artwork, and I've even started selling some pieces at local markets.\n\nThis experience has taught me that we should never <b>underestimate</b> our potential. Sometimes, all we need is the <b>opportunity</b> to discover what we're truly capable of.`,
    vocabulary: [
      { word: "creative", phonetic: "/kriˈeɪtɪv/", meaning: "有创意的，创造性的", examples: ["She has a creative approach to problem-solving.", "The school encourages creative thinking.", "He works in a creative industry."] },
      { word: "introduced", phonetic: "/ɪntrəˈdjuːst/", meaning: "介绍，引入", examples: ["The teacher introduced a new topic today.", "She introduced me to her colleagues.", "The company introduced a new product line."] },
      { word: "challenging", phonetic: "/ˈtʃəlɪndʒɪŋ/", meaning: "有挑战性的", examples: ["The project was challenging but rewarding.", "She enjoys challenging tasks at work.", "Learning Chinese can be challenging for beginners."] },
      { word: "precision", phonetic: "/prɪˈsɪʒn/", meaning: "精确，精密", examples: ["The surgery requires great precision.", "He measures ingredients with precision.", "The clock is known for its precision."] },
      { word: "blend", phonetic: "/blend/", meaning: "混合，融合", examples: ["The colours blend beautifully together.", "She blends work and family life well.", "The music blends different styles."] },
      { word: "frustrating", phonetic: "/frʌˈstreɪtɪŋ/", meaning: "令人沮丧的，令人气恼的", examples: ["It's frustrating when technology doesn't work.", "The delays were frustrating for everyone.", "She found the situation frustrating."] },
      { word: "experimenting", phonetic: "/ɪkˈsperɪmentɪŋ/", meaning: "实验，尝试", examples: ["She enjoys experimenting with new recipes.", "The scientists are experimenting with new materials.", "He's experimenting with different photography styles."] },
      { word: "encouraged", phonetic: "/ɪnˈkʌrɪdʒd/", meaning: "鼓励，支持", examples: ["Her parents encouraged her to study hard.", "The teacher encouraged students to ask questions.", "He was encouraged by his progress."] },
      { word: "reluctantly", phonetic: "/rɪˈlʌktəntli/", meaning: "勉强地，不情愿地", examples: ["She reluctantly agreed to help.", "He reluctantly admitted his mistake.", "They reluctantly accepted the decision."] },
      { word: "astonishment", phonetic: "/əˈstɒnɪʃmənt/", meaning: "惊讶，惊奇", examples: ["To my astonishment, she remembered my name.", "He stared in astonishment at the result.", "The news was received with astonishment."] },
      { word: "achievement", phonetic: "/əˈtʃiːvmənt/", meaning: "成就，成功", examples: ["Winning the prize was a great achievement.", "She celebrated her academic achievements.", "The project was a remarkable achievement."] },
      { word: "underestimate", phonetic: "/ɪʊndərˈestɪmeɪt/", meaning: "低估，轻视", examples: ["Don't underestimate the difficulty of the task.", "She underestimated his abilities.", "We should never underestimate the power of nature."] }
    ],
    questions: [
      {
        type: "detail",
        question: "How did the writer feel when first asked to enter the competition?",
        options: ["Excited and confident", "Reluctant and unsure", "Angry and disappointed"],
        answer: 1,
        hint: "📖 回到文章第三段！原文说：\'which I did reluctantly at first\'——作者开始是勉强参加的。"
      },
      {
        type: "vocabulary",
        question: "What does \"reluctantly\" mean?",
        options: ["With great enthusiasm", "Without much willingness", "With complete confidence"],
        answer: 1,
        hint: "🔍 文章说作者 \'did reluctantly at first\'，后来才获得了奖项。所以 reluctantly 的意思是“勉强地、不情愿地”。"
      },
      {
        type: "inference",
        question: "What lesson has the writer learned from this experience?",
        options: ["That art is the only important subject", "That we all have untapped potential", "That competitions are always worthwhile"],
        answer: 1,
        hint: "🧠 文章最后一段说：\'we should never underestimate our potential\'——作者学到的教训是不要低估自己的潜力。"
      },
      {
        type: "detail",
        question: "What competition did the writer enter?",
        options: ["A sports competition", "An art competition", "A music competition"],
        answer: 1,
        hint: "📖 文章第二段说：'I decided to enter the school art competition'——作者参加了学校的艺术比赛。"
      },
      {
        type: "vocabulary",
        question: "What does 'reluctantly' mean?",
        options: ["Happily", "Unwillingly", "Quickly"],
        answer: 1,
        hint: "🔍 文章说作者'did reluctantly at first'——开始是勉强参加的。所以 reluctantly 的意思是'勉强地'。"
      },
      {
        type: "inference",
        question: "What lesson did the writer learn from this experience?",
        options: ["Art is unimportant", "We all have untapped potential", "Competitions are bad"],
        answer: 1,
        hint: " 文章最后说：'we should never underestimate our potential'——不要低估自己的潜力。"
      },
    ]
  },
  {
    id: 5,
    theme: "Travel",
    themeEmoji: "✈️",
    title: "An Unexpected Journey",
    text: `Last summer, my family decided to spend our holiday in a small <b>coastal</b> village in Cornwall. We had <b>originally</b> planned to visit Italy, but due to flight <b>cancellations</b>, we had to change our destination <b>considerably</b> at the last minute.\n\nInitially, I was rather <b>disappointed</b> about this change. However, as soon as we arrived, I realised that this <b>unexpected</b> trip might turn out to be quite <b>remarkable</b>. The village was <b>picturesque</b>, with <b>colourful</b> cottages overlooking a <b>harbour</b> full of fishing boats.\n\nEach morning, we would walk along the <b>cliffs</b>, enjoying the <b>spectacular</b> views of the sea. The air was <b>remarkably</b> fresh and clean, which was a welcome <b>contrast</b> to the city where we live. We also had the <b>opportunity</b> to try various local <b>delicacies</b>, particularly the fresh seafood.\n\nOne afternoon, we <b>encountered</b> a group of dolphins swimming near the shore. It was an absolutely <b>memorable</b> moment that I'll never forget. The locals were extremely <b>hospitable</b> and always willing to share stories about the area's history.\n\nBy the end of the week, I had completely changed my <b>perspective</b>. This <b>unplanned</b> holiday turned out to be one of the most enjoyable experiences of my life.`,
    vocabulary: [
      { word: "coastal", phonetic: "/ˈkəʊstəl/", meaning: "海岸的，沿海的", examples: ["We stayed in a coastal town for our holiday.", "The coastal path offers beautiful views.", "Many people live in coastal areas."] },
      { word: "originally", phonetic: "/əˈrɪdʒənəli/", meaning: "最初，原来", examples: ["The building was originally a factory.", "We originally planned to leave early.", "The book was originally written in French."] },
      { word: "cancellations", phonetic: "/ˈkænsəˈleɪʃnz/", meaning: "取消", examples: ["Flight cancellations caused many problems.", "There were several cancellations due to bad weather.", "The event was postponed, not cancelled."] },
      { word: "considerably", phonetic: "/kənˈsɪdərəbli/", meaning: "相当地，大大地", examples: ["The price has increased considerably.", "Her English has improved considerably.", "The situation has changed considerably."] },
      { word: "disappointed", phonetic: "/ˌdɪsəˈpɔɪntɪd/", meaning: "失望的，沮丧的", examples: ["She was disappointed with her exam results.", "I'm disappointed that you couldn't come.", "The movie was disappointing."] },
      { word: "picturesque", phonetic: "/ˈpɪktʃəresk/", meaning: "如画的，美丽的", examples: ["The village is very picturesque.", "We stayed in a picturesque cottage.", "The scene was picturesque and peaceful."] },
      { word: "harbour", phonetic: "/ˈhɑːbə/", meaning: "港口，港湾", examples: ["The boats were moored in the harbour.", "We walked around the harbour at sunset.", "The harbour was busy with fishing boats."] },
      { word: "cliffs", phonetic: "/klɪfs/", meaning: "悬崖，崖壁", examples: ["The house is built on top of the cliffs.", "We walked along the cliff path.", "The cliffs overlook the sea."] },
      { word: "contrast", phonetic: "/ˈkɒntrɑːst/", meaning: "对比，差异", examples: ["There is a sharp contrast between the two cities.", "In contrast to her sister, she is very quiet.", "The colours create an interesting contrast."] },
      { word: "delicacies", phonetic: "/ˈdelɪkəsiz/", meaning: "美食，佳肴", examples: ["We tried local delicacies at the market.", "The restaurant serves many delicacies.", "Chocolate is considered a delicacy."] },
      { word: "hospitable", phonetic: "/hɒˈspɪtəbl/", meaning: "好客的，热情的", examples: ["The locals were very hospitable.", "She is known for her hospitable nature.", "We received a hospitable welcome."] },
      { word: "perspective", phonetic: "/pəˈspektɪv/", meaning: "视角，观点", examples: ["Travel gives you a new perspective on life.", "She has a different perspective on the issue.", "Try to see things from another perspective."] }
    ],
    questions: [
      {
        type: "detail",
        question: "Why did the family change their holiday destination?",
        options: ["They wanted to visit Cornwall", "Their flights to Italy were cancelled", "They couldn't afford Italy"],
        answer: 1,
        hint: "📖 回到文章第一段！原文说：\'due to flight cancellations, we had to change our destination\'——由于航班取消，他们不得不改变目的地。"
      },
      {
        type: "vocabulary",
        question: "What does \"hospitable\" mean?",
        options: ["Cold and unfriendly", "Warm and welcoming", "Quiet and reserved"],
        answer: 1,
        hint: "🔍 文章第四段说当地人 \'extremely hospitable and always willing to share stories\'——非常热情且乐于分享。所以 hospitable 的意思是“好客的、热情的”。"
      },
      {
        type: "inference",
        question: "How did the writer's feelings about the holiday change?",
        options: ["They remained disappointed throughout", "They went from disappointment to enjoyment", "They were excited from the beginning"],
        answer: 1,
        hint: "🧠 文章开头说作者 \'rather disappointed\'，但最后说 \'one of the most enjoyable experiences\'。作者的感受从失望变成了享受。"
      },
      {
        type: "detail",
        question: "Why did the family change their holiday destination?",
        options: ["They wanted to visit Cornwall", "Flights to Italy were cancelled", "They couldn't afford Italy"],
        answer: 1,
        hint: "📖 文章第一段说：'due to flight cancellations, we had to change our destination'——因为航班取消。"
      },
      {
        type: "vocabulary",
        question: "What does 'hospitable' mean?",
        options: ["Cold and unfriendly", "Warm and welcoming", "Quiet and reserved"],
        answer: 1,
        hint: "🔍 文章说当地人'extremely hospitable and always willing to share stories'——非常热情。所以 hospitable 的意思是'好客的'。"
      },
      {
        type: "inference",
        question: "How did the writer's feelings change during the trip?",
        options: ["Remained disappointed", "From disappointment to enjoyment", "Excited from the beginning"],
        answer: 1,
        hint: "🧠 文章开头说作者'rather disappointed'，但最后说'one of the most enjoyable experiences'——从失望变成享受。"
      },
    ]
  },
  {
    id: 6,
    theme: "Family",
    themeEmoji: "👨‍👩‍👧",
    title: "A Family Tradition",
    text: `Every Sunday, my family maintains a <b>cherished</b> tradition that has been passed down for generations. We gather at my grandparents' house for a <b>substantial</b> lunch, which is always <b>accompanied</b> by lively conversation and laughter.\n\nMy grandmother, who is an <b>exceptional</b> cook, prepares a variety of dishes using recipes that have been in our family for over a century. Her <b>signature</b> dish is a <b>hearty</b> vegetable soup, which she makes from vegetables grown in her own garden. The <b>aroma</b> alone is enough to make everyone's mouth water.\n\nDuring these gatherings, we share news about our lives, discuss current events, and occasionally <b>debate</b> various topics. My grandfather, who is remarkably <b>knowledgeable</b> about history, often tells fascinating stories about our family's past. These <b>anecdotes</b> are both entertaining and educational.\n\nAlthough my cousins and I sometimes have <b>conflicting</b> opinions, we always manage to resolve our differences <b>peacefully</b>. These Sunday meetings have <b>strengthened</b> our family bonds and created <b>lasting</b> memories that we will treasure forever.\n\nI <b>genuinely</b> believe that maintaining such traditions is <b>essential</b> for keeping families connected in today's fast-paced world.`,
    vocabulary: [
      { word: "cherished", phonetic: "/ˈtʃerɪʃt/", meaning: "珍视的，珍爱的", examples: ["She has many cherished memories of her childhood.", "The ring is a cherished family heirloom.", "These are cherished moments we'll never forget."] },
      { word: "substantial", phonetic: "/səbˈstænʃəl/", meaning: "大量的，丰盛的", examples: ["We had a substantial meal for dinner.", "She made a substantial contribution to the project.", "The house has substantial grounds."] },
      { word: "accompanied", phonetic: "/əˈkʌmpənid/", meaning: "随伴，伴随", examples: ["The dish is accompanied by a fresh salad.", "She was accompanied by her brother.", "The music was accompanied by beautiful lighting."] },
      { word: "exceptional", phonetic: "/ɪkˈsepʃənəl/", meaning: "异常的，特别的", examples: ["She is an exceptional musician.", "The service was exceptional.", "This is an exceptional opportunity."] },
      { word: "signature", phonetic: "/ˈsɪɡnɪtʃə/", meaning: "标志性的，拿手的", examples: ["This is her signature dish.", "He has a signature style of writing.", "The building has a signature architectural feature."] },
      { word: "hearty", phonetic: "/ˈhɑːti/", meaning: "丰盛的，热烈的", examples: ["We had a hearty breakfast before the hike.", "She gave him a hearty welcome.", "The meal was hearty and satisfying."] },
      { word: "aroma", phonetic: "/əˈrəʊmə/", meaning: "芳香，香气", examples: ["The aroma of fresh coffee filled the room.", "The garden has a lovely aroma in spring.", "The aroma of baking bread is wonderful."] },
      { word: "debate", phonetic: "/dɪˈbeɪt/", meaning: "辩论，讨论", examples: ["They had a debate about politics.", "The issue is still being debated.", "We debated the best solution for hours."] },
      { word: "knowledgeable", phonetic: "/ˈnɒlɪdʒəbəl/", meaning: "博学的，有见识的", examples: ["She is knowledgeable about ancient history.", "He is a knowledgeable guide.", "The professor is very knowledgeable in his field."] },
      { word: "anecdotes", phonetic: "/ˈænɪkdəʊts/", meaning: "轶事，趣事", examples: ["He told amusing anecdotes about his childhood.", "The book is full of interesting anecdotes.", "She shared anecdotes from her travels."] },
      { word: "conflicting", phonetic: "/kənˈflɪktɪŋ/", meaning: "冲突的，矛盾的", examples: ["They have conflicting opinions on the matter.", "The reports gave conflicting information.", "We need to resolve these conflicting views."] },
      { word: "genuinely", phonetic: "/ˈdʒenjuɪnli/", meaning: "真诚地，真正地", examples: ["She genuinely cares about her students.", "I genuinely believe this is the right decision.", "He was genuinely surprised by the news."] }
    ],
    questions: [
      {
        type: "detail",
        question: "What is the grandmother's signature dish?",
        options: ["Roast chicken", "Vegetable soup", "Chocolate cake"],
        answer: 1,
        hint: "📖 回到文章第二段！原文说：\'Her signature dish is a hearty vegetable soup\'——奶奶的拿手好菜是丰盛的蔬菜汤。"
      },
      {
        type: "vocabulary",
        question: "What does \"anecdotes\" mean?",
        options: ["Serious arguments", "Short amusing stories", "Formal speeches"],
        answer: 1,
        hint: "🔍 文章第三段说爷爷讲的故事 \'both entertaining and educational\'——既有趣又有教育意义。所以 anecdotes 的意思是“轶事、趣事”。"
      },
      {
        type: "inference",
        question: "Why does the writer think these traditions are important?",
        options: ["Because they are fun", "Because they keep families connected", "Because the food is delicious"],
        answer: 1,
        hint: "🧠 文章最后一句说：\'maintaining such traditions is essential for keeping families connected\'——作者认为传统对于保持家庭联系很重要。"
      },
      {
        type: "detail",
        question: "What is grandma's signature dish?",
        options: ["Roast chicken", "Vegetable soup", "Chocolate cake"],
        answer: 1,
        hint: "📖 文章第二段说：'Her signature dish is a hearty vegetable soup'——奶奶的拿手好菜是蔬菜汤。"
      },
      {
        type: "vocabulary",
        question: "What does 'anecdotes' mean?",
        options: ["Serious arguments", "Short amusing stories", "Formal speeches"],
        answer: 1,
        hint: "🔍 文章说爷爷讲的故事'both entertaining and educational'——既有趣又有教育意义。所以 anecdotes 的意思是'轶事、趣事'。"
      },
      {
        type: "inference",
        question: "Why does the writer think family traditions are important?",
        options: ["Because they are fun", "Because they keep families connected", "Because the food is delicious"],
        answer: 1,
        hint: "🧠 文章最后说：'maintaining such traditions is essential for keeping families connected'——保持家庭联系。"
      },
    ]
  },
  {
    id: 7,
    theme: "Sports",
    themeEmoji: "⚽",
    title: "The Big Match",
    text: `Last Saturday, our school football team <b>participated</b> in the regional finals, which was undoubtedly the most <b>significant</b> match of the season. The <b>atmosphere</b> was <b>electric</b>, with supporters from both schools creating an <b>incredible</b> noise.\n\nWe had <b>trained</b> intensively for weeks, <b>determined</b> to bring the trophy home. Our coach had <b>emphasised</b> the importance of teamwork and <b>discipline</b>, reminding us that individual skill alone wouldn't <b>guarantee</b> victory.\n\nThe match began <b>promisingly</b> for our team. We scored within the first ten minutes, which <b>boosted</b> our confidence considerably. However, the opposing team <b>responded</b> quickly, equalising just before half-time. The score remained 1-1 throughout a tense second half.\n\nIn the final minutes, our captain <b>executed</b> a <b>brilliant</b> pass to our striker, who scored the winning goal. The <b>celebration</b> was <b>spontaneous</b> and joyful. We had <b>demonstrated</b> exactly what our coach had taught us: that <b>perseverance</b> and unity can <b>overcome</b> any obstacle.\n\nThis experience taught me that success often depends not just on talent, but on <b>dedication</b> and the ability to work effectively with others.`,
    vocabulary: [
      { word: "participated", phonetic: "/pɑːˈtɪsɪpeɪtɪd/", meaning: "参加，参与", examples: ["She participated in the competition.", "All students must participate in the activity.", "He participated actively in the discussion."] },
      { word: "significant", phonetic: "/sɪɡˈnɪfɪkənt/", meaning: "重要的，有意义的", examples: ["This is a significant achievement.", "She made a significant contribution.", "The discovery was scientifically significant."] },
      { word: "atmosphere", phonetic: "/ˈætməsfɪə/", meaning: "氛围，气氛", examples: ["The atmosphere in the room was tense.", "The city has a friendly atmosphere.", "The restaurant has a romantic atmosphere."] },
      { word: "electric", phonetic: "/ɪˈlektrɪk/", meaning: "令人激动的，充满活力的", examples: ["The atmosphere was electric with excitement.", "Her performance was electric.", "The crowd's reaction was electric."] },
      { word: "trained", phonetic: "/treɪnd/", meaning: "训练，培训", examples: ["She trained hard for the marathon.", "The team trained every day.", "He was trained as a doctor."] },
      { word: "determined", phonetic: "/dɪˈtɜːmɪnd/", meaning: "坚决的，有决心的", examples: ["She is determined to succeed.", "He was determined to finish the race.", "They were determined to win."] },
      { word: "emphasised", phonetic: "/ˈemfəsaɪzd/", meaning: "强调，着重", examples: ["The teacher emphasised the importance of reading.", "She emphasised that punctuality is essential.", "He emphasised the need for teamwork."] },
      { word: "discipline", phonetic: "/ˈdɪsɪplin/", meaning: "纪律，自律", examples: ["Self-discipline is important for success.", "The school has strict discipline.", "She showed great discipline in her training."] },
      { word: "guarantee", phonetic: "/ˈɡærənˈtiː/", meaning: "保证，确保", examples: ["Hard work doesn't guarantee success.", "The product comes with a guarantee.", "I can't guarantee the results."] },
      { word: "promisingly", phonetic: "/ˈprɒmɪsɪŋli/", meaning: "有希望地，有前途地", examples: ["The project started promisingly.", "She performed promisingly in the trial.", "The signs were promisingly positive."] },
      { word: "executed", phonetic: "/ˈeksɪkjuːtɪd/", meaning: "执行，实施", examples: ["She executed the plan perfectly.", "The move was executed with precision.", "He executed the strategy brilliantly."] },
      { word: "perseverance", phonetic: "/ˈpɜːsɪˈvɪərəns/", meaning: "坚持不懈，毅力", examples: ["Success requires perseverance.", "She showed great perseverance in learning.", "His perseverance paid off in the end."] },
      { word: "dedication", phonetic: "/ˈdedɪˈkeɪʃn/", meaning: "奉献，专注", examples: ["Her dedication to the project was admirable.", "He showed great dedication to his work.", "The team's dedication was evident."] }
    ],
    questions: [
      {
        type: "detail",
        question: "What did the coach emphasise as important?",
        options: ["Individual skill only", "Teamwork and discipline", "Winning at all costs"],
        answer: 1,
        hint: "📖 回到文章第二段！原文说：\'Our coach had emphasised the importance of teamwork and discipline\'——教练强调了团队合作和纪律的重要性。"
      },
      {
        type: "vocabulary",
        question: "What does \"perseverance\" mean?",
        options: ["Giving up easily", "Continuing despite difficulties", "Being naturally talented"],
        answer: 1,
        hint: "🔍 文章说 \'perseverance and unity can overcome any obstacle\'——坚持和团结可以克服任何障碍。所以 perseverance 的意思是“坚持不懈”。"
      },
      {
        type: "inference",
        question: "What lesson did the writer learn from this experience?",
        options: ["That talent is everything", "That success requires dedication and teamwork", "That winning is the only thing that matters"],
        answer: 1,
        hint: "🧠 文章最后一句说：\'success often depends not just on talent, but on dedication and the ability to work effectively with others\'——成功不仅靠天赋，还靠奉献和团队合作。"
      },
      {
        type: "detail",
        question: "What did the coach emphasise as important?",
        options: ["Individual skill only", "Teamwork and discipline", "Winning at all costs"],
        answer: 1,
        hint: "📖 文章第二段说：'Our coach had emphasised the importance of teamwork and discipline'——团队合作和纪律。"
      },
      {
        type: "vocabulary",
        question: "What does 'perseverance' mean?",
        options: ["Giving up easily", "Continuing despite difficulties", "Being naturally talented"],
        answer: 1,
        hint: "🔍 文章说'perseverance and unity can overcome any obstacle'——坚持和团结可以克服任何障碍。所以 perseverance 的意思是'坚持不懈'。"
      },
      {
        type: "inference",
        question: "What does the writer believe about success?",
        options: ["Talent is everything", "Success requires dedication and teamwork", "Winning is the only thing that matters"],
        answer: 1,
        hint: " 文章最后说：'success often depends not just on talent, but on dedication and the ability to work effectively with others'——成功靠奉献和团队合作。"
      },
    ]
  },
  {
    id: 8,
    theme: "Nature",
    themeEmoji: "🌿",
    title: "A Day in the Countryside",
    text: `Last weekend, I had the <b>opportunity</b> to visit my uncle's farm in the countryside. It was a welcome <b>escape</b> from the <b>hustle</b> and bustle of city life, and I was <b>eager</b> to experience a different pace of living.\n\nThe farm is <b>situated</b> in a <b>tranquil</b> valley, <b>surrounded</b> by rolling hills and <b>ancient</b> woodlands. My uncle, who is a <b>knowledgeable</b> farmer, explained how he <b>maintains</b> the land <b>sustainably</b>, using methods that <b>preserve</b> the environment for future generations.\n\nDuring my visit, I <b>assisted</b> with various tasks, including feeding the animals and <b>harvesting</b> vegetables from the garden. Although the work was physically <b>demanding</b>, I found it remarkably <b>rewarding</b>. There's something <b>satisfying</b> about seeing the direct results of your labour.\n\nIn the afternoon, we walked through the <b>orchard</b>, where apple and pear trees were in full <b>bloom</b>. The air was filled with the <b>fragrance</b> of flowers and the <b>melodious</b> singing of birds. It was a <b>serene</b> environment that allowed me to <b>reflect</b> on the importance of nature in our lives.\n\nThis experience gave me a new <b>appreciation</b> for rural life and the people who work tirelessly to produce our food. I left with a <b>profound</b> sense of gratitude for the natural world.`,
    vocabulary: [
      { word: "escape", phonetic: "/ɪˈskeɪp/", meaning: "逃离，解脱", examples: ["The weekend was an escape from work stress.", "They planned a great escape from the city.", "Reading is my escape from reality."] },
      { word: "hustle", phonetic: "/ˈhʌsl/", meaning: "喧嚣，忙碌", examples: ["I need a break from the hustle of the city.", "The hustle and bustle of London is exhausting.", "She enjoys the hustle of market day."] },
      { word: "situated", phonetic: "/ˈsɪtʃueɪtɪd/", meaning: "位于，坐落在", examples: ["The house is situated on a hill.", "The hotel is situated near the beach.", "The village is situated in a valley."] },
      { word: "tranquil", phonetic: "/ˈtræŋkwɪl/", meaning: "安静的，宁静的", examples: ["The lake was tranquil and peaceful.", "She enjoys the tranquil countryside.", "The garden is a tranquil place to relax."] },
      { word: "sustainably", phonetic: "/səˈsteɪnəbli/", meaning: "可持续地", examples: ["We need to farm sustainably.", "The company operates sustainably.", "She lives sustainably and recycles."] },
      { word: "preserve", phonetic: "/prɪˈzɜːv/", meaning: "保护，保存", examples: ["We must preserve the environment.", "The museum preserves ancient artifacts.", "She wants to preserve family traditions."] },
      { word: "assisted", phonetic: "/əˈsɪstɪd/", meaning: "协助，帮助", examples: ["She assisted the teacher in class.", "He assisted with the project.", "The nurse assisted the doctor."] },
      { word: "harvesting", phonetic: "/ˈhɑːvɪstɪŋ/", meaning: "收割，收获", examples: ["They are harvesting wheat in the field.", "The farmers are harvesting apples.", "We spent the day harvesting vegetables."] },
      { word: "rewarding", phonetic: "/rɪˈwɔːdɪŋ/", meaning: "有回报的，值得的", examples: ["Teaching is a rewarding career.", "The experience was very rewarding.", "She found the work rewarding."] },
      { word: "orchard", phonetic: "/ˈɔːtʃəd/", meaning: "果园", examples: ["The orchard is full of apple trees.", "We picked fruit in the orchard.", "The orchard was in full bloom."] },
      { word: "fragrance", phonetic: "/ˈfreɪɡrəns/", meaning: "芳香，香气", examples: ["The fragrance of flowers filled the air.", "She wore a sweet fragrance.", "The candle has a lovely fragrance."] },
      { word: "serene", phonetic: "/sɪˈriːn/", meaning: "宁静的，平静的", examples: ["The lake was serene and calm.", "She has a serene expression.", "The morning was serene and peaceful."] },
      { word: "appreciation", phonetic: "/əˈpriːʃiˈeɪʃn/", meaning: "感激，欣赏", examples: ["She showed great appreciation for the help.", "I have a deep appreciation for music.", "He expressed his appreciation to the team."] },
      { word: "profound", phonetic: "/prəˈfaʊnd/", meaning: "深刻的，深远的", examples: ["The book had a profound effect on me.", "She has a profound understanding of the subject.", "The experience was profoundly moving."] }
    ],
    questions: [
      {
        type: "detail",
        question: "How does the writer's uncle maintain the farm?",
        options: ["Using modern machinery only", "Using sustainable methods", "By hiring many workers"],
        answer: 1,
        hint: "📖 回到文章第二段！原文说：\'he maintains the land sustainably, using methods that preserve the environment\'——叔叔用可持续的方法维护农场。"
      },
      {
        type: "vocabulary",
        question: "What does \"tranquil\" mean?",
        options: ["Noisy and busy", "Calm and peaceful", "Dark and mysterious"],
        answer: 1,
        hint: "🔍 文章描述农场位于 \'a tranquil valley\'，周围是山丘和树林。所以 tranquil 的意思是“安静的、宁静的”。"
      },
      {
        type: "inference",
        question: "What did the writer gain from this experience?",
        options: ["A desire to become a farmer", "A new appreciation for rural life", "Skills in animal care"],
        answer: 1,
        hint: "🧠 文章最后一段说：\'This experience gave me a new appreciation for rural life\'——作者对乡村生活有了新的欣赏。"
      },
      {
        type: "detail",
        question: "How does the uncle maintain the land?",
        options: ["Using modern machinery only", "Using sustainable methods", "By hiring many workers"],
        answer: 1,
        hint: " 文章第二段说：'he maintains the land sustainably, using methods that preserve the environment'——可持续的方法。"
      },
      {
        type: "vocabulary",
        question: "What does 'tranquil' mean?",
        options: ["Noisy and busy", "Calm and peaceful", "Dark and mysterious"],
        answer: 1,
        hint: "🔍 文章描述农场位于'a tranquil valley'，周围是山丘和树林。所以 tranquil 的意思是'安静的、宁静的'。"
      },
      {
        type: "inference",
        question: "What did the writer gain from the farm experience?",
        options: ["A desire to become a farmer", "A new appreciation for rural life", "Skills in animal care"],
        answer: 1,
        hint: "🧠 文章最后说：'This experience gave me a new appreciation for rural life'——对乡村生活有了新的欣赏。"
      },
    ]
  }
];

// Badges definition
const BADGES = [
  { id: "first_checkin", name: "First Step 第一步", emoji: "🌟", desc: "Complete your first check-in! 完成第一次打卡", condition: (s) => s.total_days >= 1 },
  { id: "streak_3", name: "Three Days 三天打卡", emoji: "🔥", desc: "3-day streak! 连续3天打卡", condition: (s) => s.streak_days >= 3 },
  { id: "streak_7", name: "One Week 一周打卡", emoji: "⭐", desc: "7-day streak! 连续7天打卡", condition: (s) => s.streak_days >= 7 },
  { id: "streak_14", name: "Two Weeks 两周打卡", emoji: "🏆", desc: "14-day streak! 连续14天打卡", condition: (s) => s.streak_days >= 14 },
  { id: "streak_30", name: "One Month 一个月", emoji: "👑", desc: "30-day streak! 连续30天打卡", condition: (s) => s.streak_days >= 30 },
  { id: "perfect", name: "Perfect Score 全对", emoji: "🎯", desc: "Get all questions right! 全部答对", condition: (s) => s.perfect_count >= 1 },
  { id: "perfect_3", name: "Triple Perfect 三连全对", emoji: "💎", desc: "3 perfect scores! 全对3次", condition: (s) => s.perfect_count >= 3 },
  { id: "energy_100", name: "Energy Master 能量大师", emoji: "⚡", desc: "Reach 100 energy! 能量达到100", condition: (s) => s.energy_points >= 100 },
  { id: "energy_500", name: "Energy King 能量王者", emoji: "🌟", desc: "Reach 500 energy! 能量达到500", condition: (s) => s.energy_points >= 500 },
  { id: "passages_5", name: "Reading Explorer 阅读探索者", emoji: "📚", desc: "Complete 5 passages! 完成5篇短文", condition: (s) => (s.completed_passage_ids || []).length >= 5 },
  { id: "passages_all", name: "Reading Master 阅读大师", emoji: "🎓", desc: "Complete all passages! 完成所有短文", condition: (s) => (s.completed_passage_ids || []).length >= PASSAGES.length }
];

// Encouragement messages
const ENCOURAGEMENTS = {
  perfect: [
    "Amazing, Emma! You're a PET superstar! 你是PET超级星！",
    "Brilliant work! Mimi & BunBun are so proud! 太棒了！",
    "Outstanding! You're making incredible progress! 进步神速！",
    "Wow, Emma! Perfect score again! 又是全对，太厉害了！"
  ],
  good: [
    "Great effort, Emma! Keep it up! 加油！",
    "Well done! You're getting better every day! 每天都在进步！",
    "Good job! Practice makes perfect! 练习让你更强！",
    "Nice work, Emma! Keep practising! 继续努力！"
  ],
  retry: [
    "Don't worry, Emma! Let's learn from these words! 没关系，来学习这些词！",
    "Mistakes help us learn! You'll do better next time! 错误帮助我们学习！",
    "Keep going, Emma! Every word you learn matters! 每个单词都很重要！",
    "Practice makes progress! You've got this! 加油，你可以的！"
  ]
};