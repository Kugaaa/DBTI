export type DimKey = "D" | "E" | "S" | "C" | "G";

export interface Option {
  id: string;
  text: string;
  /** 每个选项可影响多个维度，key 为维度，value 为分值 (-3 ~ +3) */
  scores: Partial<Record<DimKey, number>>;
  hiddenTrigger?: boolean;
}

export interface Question {
  id: string;
  /** 主维度，用于 UI 展示标签 */
  dimension: DimKey;
  angle: string;
  text: string;
  options: Option[];
  isHidden?: boolean;
}

export const questions: Question[] = [
  // ==================== D 酒势 (Drive) ====================
  {
    id: "Q01", dimension: "D", angle: "入场仪式",
    text: "居酒屋菜单上有个「今日隐藏特调」，只写了酒精度 15%。你？",
    options: [
      { id: "A", text: "「来一杯！不踩雷怎么知道好不好喝」", scores: { D: 3, E: 1 } },
      { id: "B", text: "先问店员配方，听完觉得行再点", scores: { D: 0, G: 1 } },
      { id: "C", text: "15%？告辞。默默划到无酒精饮品区", scores: { D: -3 } },
    ],
  },
  {
    id: "Q02", dimension: "D", angle: "冰箱考古",
    text: "朋友来你家做客，打开冰箱说「你冰箱也太能反映性格了」。他看到的是？",
    options: [
      { id: "A", text: "三种精酿、一瓶清酒、角落还有半瓶金酒——小型酒吧", scores: { D: 3 } },
      { id: "B", text: "上次聚会剩的两罐啤酒，过期了也不知道", scores: { D: -1, S: -1 } },
      { id: "C", text: "纯净水、牛奶、气泡水——一滴酒精都没有", scores: { D: -3 } },
    ],
  },
  {
    id: "Q03", dimension: "D", angle: "独处仪式",
    text: "周三加班到十点，回家瘫在沙发上。你的「解压三件套」里有酒吗？",
    options: [
      { id: "A", text: "必须有。开一罐冰啤配垃圾食品是刚需", scores: { D: 3, S: 1 } },
      { id: "B", text: "偶尔吧，大多数时候刷手机就够了", scores: { D: 0 } },
      { id: "C", text: "解压靠睡觉，酒只会让你更累", scores: { D: -3 } },
    ],
  },
  {
    id: "Q04", dimension: "D", angle: "礼物哲学",
    text: "闺蜜/兄弟过生日，你在小红书上做了半小时攻略。最后买的是？",
    options: [
      { id: "A", text: "一瓶包装好看的小众威士忌，卡片上写「记得配圆冰」", scores: { D: 2, G: 1, S: 1 } },
      { id: "B", text: "网红蛋糕 + 红包，不出错就是最大的成功", scores: { D: 0, G: 1 } },
      { id: "C", text: "一本 TA 提过想看的书——你们之间的默契不需要酒", scores: { D: -2, S: 1 } },
    ],
  },
  {
    id: "Q05", dimension: "D", angle: "旅行人格",
    text: "到了一个新城市，你发的第一条朋友圈大概率是？",
    options: [
      { id: "A", text: "当地酒吧的精酿墙 + 定位，配文「又来交作业了」", scores: { D: 3, E: 1 } },
      { id: "B", text: "街边大排档，桌上刚好有瓶本地啤酒入镜", scores: { D: 1 } },
      { id: "C", text: "咖啡厅、书店、寺庙——你的旅行和酒无关", scores: { D: -2, E: -1 } },
    ],
  },
  {
    id: "Q06", dimension: "D", angle: "自我认知",
    text: "朋友圈转疯了一篇「当代年轻人酒局生存指南」，你看完的感想？",
    options: [
      { id: "A", text: "「指南？我就是指南本南」转发到三个群", scores: { D: 3, E: 2 } },
      { id: "B", text: "默默收藏，下次用得上", scores: { D: 0 } },
      { id: "C", text: "「我的生存指南就一条：别去」", scores: { D: -3, E: -1 } },
    ],
  },

  // ==================== E 酒能 (Energy) ====================
  {
    id: "Q07", dimension: "E", angle: "地图炮",
    text: "你和朋友在大众点评选喝酒的地方。你手指划向？",
    options: [
      { id: "A", text: "「评分4.2但评论说超吵」——完美，气氛这不就来了", scores: { E: 3, D: 1 } },
      { id: "B", text: "「环境安静适合聊天」——重点是聊，酒是配角", scores: { E: -1, S: 1 } },
      { id: "C", text: "「可以点外卖送到家」——出门是不可能出门的", scores: { E: -3, D: -1 } },
    ],
  },
  {
    id: "Q08", dimension: "E", angle: "BGM 反射弧",
    text: "微醺时，酒吧突然放了一首你单曲循环过一百遍的歌。你的身体？",
    options: [
      { id: "A", text: "条件反射站起来，拿着酒瓶当话筒，朋友在拍你", scores: { E: 3, G: -1 } },
      { id: "B", text: "嘴角上扬开始跟着哼，手指在桌上打节拍", scores: { E: 0, S: 1 } },
      { id: "C", text: "突然觉得很吵，默默戴上一只耳机", scores: { E: -3 } },
    ],
  },
  {
    id: "Q09", dimension: "E", angle: "搭讪体质",
    text: "隔壁桌有个人穿了件你喜欢的乐队的 T 恤。你？",
    options: [
      { id: "A", text: "端着酒过去：「这巡演你也去了？」聊到加微信", scores: { E: 3, S: 1, D: 1 } },
      { id: "B", text: "多看了两眼，在心里默默点赞", scores: { E: 0 } },
      { id: "C", text: "没注意到——你一直在看自己的手机", scores: { E: -2, S: -1 } },
    ],
  },
  {
    id: "Q10", dimension: "E", angle: "话题霸主",
    text: "桌上有人在讲一个你听过三遍的段子，而且讲错了。你？",
    options: [
      { id: "A", text: "「不对不对，原版是这样的——」直接接管话语权", scores: { E: 3, G: -1 } },
      { id: "B", text: "配合笑一下，等 TA 讲完自己再补个更好的", scores: { E: 0, G: 1 } },
      { id: "C", text: "面无表情在心里默默修改了三个错误，但一字不说", scores: { E: -3, S: -1 } },
    ],
  },
  {
    id: "Q11", dimension: "E", angle: "续命信号",
    text: "凌晨十二点，你正准备打车走。群里弹出一条语音：「刚到！等你们！」",
    options: [
      { id: "A", text: "把打车软件关了：「来都来了！」原地复活", scores: { E: 3, D: 1 } },
      { id: "B", text: "犹豫了五秒，回了句「再坐会儿就走」", scores: { E: 0 } },
      { id: "C", text: "假装没看到，人已经在车上了。明天回复「啊我没看到」", scores: { E: -3, G: -1 } },
    ],
  },
  {
    id: "Q12", dimension: "E", angle: "宿醉社交",
    text: "喝大了的第二天，朋友发来消息「去吃个 brunch？」你？",
    options: [
      { id: "A", text: "「走！聊聊昨晚谁最丢人」——社交就是你的续命丹", scores: { E: 2, S: 1 } },
      { id: "B", text: "「下午吧，让我先躺一会」——你需要缓冲", scores: { E: 0, C: -1 } },
      { id: "C", text: "已读不回。你在黑暗的被窝里发誓不再见任何人", scores: { E: -3 } },
    ],
  },

  // ==================== S 酒魂 (Soul) ====================
  {
    id: "Q13", dimension: "S", angle: "emo 预警",
    text: "你的酒后 Spotify/网易云年度报告显示深夜最爱播放的是？",
    options: [
      { id: "A", text: "朴树/陈绮贞/Radiohead——越喝越文艺越上头", scores: { S: 3, E: -1 } },
      { id: "B", text: "随机播放，什么都听，不挑", scores: { S: 0 } },
      { id: "C", text: "你喝酒不听歌，或者根本不在意在放什么", scores: { S: -3 } },
    ],
  },
  {
    id: "Q14", dimension: "S", angle: "深夜编辑",
    text: "凌晨两点，你微醺着打开了朋友圈。你编辑了十分钟发出去的是？",
    options: [
      { id: "A", text: "一段没有配图的纯文字，看的人觉得你在写诗", scores: { S: 3, E: 1 } },
      { id: "B", text: "一张天花板的照片，配文是一个省略号", scores: { S: 1 } },
      { id: "C", text: "你打开了，又关了。你酒后的自制力比上班还强", scores: { S: -3, G: 1 } },
    ],
  },
  {
    id: "Q15", dimension: "S", angle: "时光机",
    text: "喝着酒，你刷到了大学时代的群聊记录截图。你？",
    options: [
      { id: "A", text: "鼻子突然酸了，给当年的室友发了一条「想你们了」", scores: { S: 3, E: 1 } },
      { id: "B", text: "嘴角一翘：「那时候真傻」——然后截图发了个九宫格", scores: { S: 0, E: 1 } },
      { id: "C", text: "看了一秒就划走了，过去式的东西你不太留恋", scores: { S: -2 } },
    ],
  },
  {
    id: "Q16", dimension: "S", angle: "机场离别",
    text: "送朋友出国的最后一顿，喝着喝着 TA 说「以后想你们了就看月亮」。你？",
    options: [
      { id: "A", text: "没忍住，当场眼眶红了，嘴上还在说「矫情什么」", scores: { S: 3 } },
      { id: "B", text: "心里一紧，但举起酒杯：「说好了常联系」", scores: { S: 0, G: 1 } },
      { id: "C", text: "「说得好像去了火星一样，视频通话不行吗」", scores: { S: -3, E: 1 } },
    ],
  },
  {
    id: "Q17", dimension: "S", angle: "社死现场",
    text: "第二天早上打开微信，发现自己凌晨给前任发了三条语音。你？",
    options: [
      { id: "A", text: "听了一遍——虽然社死了但每个字都是真心话。不撤回", scores: { S: 3, G: -1 } },
      { id: "B", text: "撤回两条，留了一条「最近还好吗」假装正常", scores: { S: 1 } },
      { id: "C", text: "不可能发生。你喝到断片也不会碰通讯录", scores: { S: -3, G: 1 } },
    ],
  },
  {
    id: "Q18", dimension: "S", angle: "玄学认同",
    text: "有人在酒桌上说「酒品看人品，醉了才是真的你」。你？",
    options: [
      { id: "A", text: "被说中了——你喝酒就是为了卸下白天那层壳", scores: { S: 2, D: 1 } },
      { id: "B", text: "半信半疑，可能得看跟谁喝吧", scores: { S: 0 } },
      { id: "C", text: "不信。你醉了和醒着的时候一模一样，都很稳", scores: { S: -3 } },
    ],
  },

  // ==================== C 酒量 (Capacity) ====================
  {
    id: "Q19", dimension: "C", angle: "预警系统",
    text: "你身体的「酒精预警系统」是什么样的？",
    options: [
      { id: "A", text: "基本没响过——别人都倒了你还在帮忙收桌", scores: { C: 3, G: 1 } },
      { id: "B", text: "脸发热、话变多，像手机进了低电量模式", scores: { C: 0, E: 1 } },
      { id: "C", text: "一口下去就全身泛红，预警系统灵敏度堪比军用雷达", scores: { C: -3 } },
    ],
  },
  {
    id: "Q20", dimension: "C", angle: "脸色管理",
    text: "喝了三杯之后自拍，你的脸色大概是？",
    options: [
      { id: "A", text: "完全看不出来喝了——被朋友怀疑在喝水", scores: { C: 3 } },
      { id: "B", text: "微微泛红，美颜相机能修回来的程度", scores: { C: 1 } },
      { id: "C", text: "关公附体，连耳朵都是红的。不用美颜用黑白滤镜", scores: { C: -3, G: -1 } },
    ],
  },
  {
    id: "Q21", dimension: "C", angle: "混搭挑战",
    text: "经典死亡组合：啤酒→红酒→白酒→调酒。你闯到第几关？",
    options: [
      { id: "A", text: "通关了还在问「还有吗」——你是 bug 不是玩家", scores: { C: 3, D: 1 } },
      { id: "B", text: "白酒关有点晕，但没倒。第二天头疼了半天", scores: { C: 0 } },
      { id: "C", text: "啤酒关就退赛了。你从来不碰这种副本", scores: { C: -3, D: -1 } },
    ],
  },
  {
    id: "Q22", dimension: "C", angle: "江湖传说",
    text: "关于你的酒量，朋友圈里流传最广的一句评价是？",
    options: [
      { id: "A", text: "「TA 是永远清醒的那个」——像酒桌上的 NPC", scores: { C: 3 } },
      { id: "B", text: "「还行，不拉胯也不逆天」——路人水平", scores: { C: 0 } },
      { id: "C", text: "「TA 不是来喝酒的，是来表演过敏的」", scores: { C: -3, D: -1 } },
    ],
  },
  {
    id: "Q23", dimension: "C", angle: "节奏攻防",
    text: "对面的人一直说「干了干了」，频率越来越高。你的求生策略？",
    options: [
      { id: "A", text: "不需要策略，你的配速比 TA 还快", scores: { C: 2, E: 1, D: 1 } },
      { id: "B", text: "碰杯但只抿一小口，表情管理到位", scores: { C: 0 } },
      { id: "C", text: "趁 TA 不注意把酒倒进旁边的花盆里", scores: { C: -2, G: -1 } },
    ],
  },
  {
    id: "Q24", dimension: "C", angle: "数据面板",
    text: "如果酒量有等级系统，你查看自己的面板显示？",
    options: [
      { id: "A", text: "Lv.MAX「传说级·千杯不醉」，还附赠称号「人形解酒器」", scores: { C: 3, D: 1 } },
      { id: "B", text: "Lv.5「普通级·社交达标」——勉强够用", scores: { C: 0 } },
      { id: "C", text: "Lv.1「青铜级·闻酒色变」，经验值永远卡在 0%", scores: { C: -3 } },
    ],
  },

  // ==================== G 酒德 (Grace) ====================
  {
    id: "Q25", dimension: "G", angle: "隐形守护",
    text: "你发现有个不太熟的人被连续敬了三次酒，脸色已经不对了。你？",
    options: [
      { id: "A", text: "自然地端起杯子插进去：「这杯我来！跟X哥好久没碰了」", scores: { G: 3, E: 1, S: 1 } },
      { id: "B", text: "在旁边小声提醒一下，但不会出头", scores: { G: 0 } },
      { id: "C", text: "忙着玩自己的骰子，没注意到这回事", scores: { G: -2, E: 1 } },
    ],
  },
  {
    id: "Q26", dimension: "G", angle: "战损评估",
    text: "朋友喝多了趴桌上，手机还在外放抖音。你的第一个动作？",
    options: [
      { id: "A", text: "帮 TA 关掉外放、扶正坐姿、倒杯水放手边", scores: { G: 3 } },
      { id: "B", text: "拍拍 TA 肩膀「没事吧」，得到含糊回应后继续聊", scores: { G: 0, E: 1 } },
      { id: "C", text: "把手机转过来看 TA 在刷什么——顺便截个图发群里", scores: { G: -3, E: 1 } },
    ],
  },
  {
    id: "Q27", dimension: "G", angle: "结账博弈",
    text: "服务员把账单放到桌上那一刻，桌上安静了两秒。你？",
    options: [
      { id: "A", text: "趁这两秒扫码付了——你享受这种「大家发现时已经晚了」的感觉", scores: { G: 2, D: 1 } },
      { id: "B", text: "打开计算器发起精确 AA，连服务费都算进去了", scores: { G: 0 } },
      { id: "C", text: "突然很认真地在回一条消息——时间恰到好处", scores: { G: -2, E: -1 } },
    ],
  },
  {
    id: "Q28", dimension: "G", angle: "八卦防火墙",
    text: "有人借着酒劲开始爆另一个朋友的猛料。桌上笑成一片时你？",
    options: [
      { id: "A", text: "笑完赶紧转话题：「行了行了，说个我自己的糗事」", scores: { G: 3, S: 1, E: 1 } },
      { id: "B", text: "没接话也没拦，等这个话题自然过去", scores: { G: 0, S: -1 } },
      { id: "C", text: "笑得最大声的就是你，还追问「然后呢？」", scores: { G: -3, E: 2 } },
    ],
  },
  {
    id: "Q29", dimension: "G", angle: "深夜物流",
    text: "凌晨一点散场，最晕的那个人住得最远。你？",
    options: [
      { id: "A", text: "帮 TA 叫好车、输好地址、给 TA 室友发了消息「注意接一下」", scores: { G: 3, S: 1 } },
      { id: "B", text: "问了句「能到家吗」，TA 含糊点头你就放心走了", scores: { G: 0 } },
      { id: "C", text: "你都不知道 TA 什么时候走的——你也没好到哪去", scores: { G: -2, C: -1 } },
    ],
  },
  {
    id: "Q30", dimension: "G", angle: "终极定位", isHidden: true,
    text: "如果今晚的酒局是一部电影，片尾字幕里你的角色名是？",
    options: [
      { id: "A", text: "「场务」——灯光音响道具散场全管，没你这局开不起来", scores: { G: 3, S: 1 } },
      { id: "B", text: "「主角的损友」——名场面都有你，经典台词贡献者", scores: { E: 2, D: 1 } },
      { id: "C", text: "「导演兼编剧」——表面参与，实际你在操控一切走向", scores: {}, hiddenTrigger: true },
    ],
  },
];
