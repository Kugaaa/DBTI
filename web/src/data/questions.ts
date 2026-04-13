export interface Option {
  id: string;
  text: string;
  score: number;
  hiddenTrigger?: boolean;
}

export interface Question {
  id: string;
  dimension: "D" | "E" | "S" | "C" | "G";
  angle: string;
  text: string;
  options: Option[];
  isHidden?: boolean;
}

export const questions: Question[] = [
  // ==================== D 酒势 (Drive) ====================
  // 测量：你和酒的主动性关系——猛/稳/避
  {
    id: "Q01", dimension: "D", angle: "接到邀请",
    text: "周五下午六点，你收到消息：「今晚老地方，不醉不归。」你的第一反应？",
    options: [
      { id: "A", text: "秒回「几点到？我带骰子」，顺便在群里再拉三个人", score: 3 },
      { id: "B", text: "「谁来？发个名单我看看阵容再说」", score: 0 },
      { id: "C", text: "已读不回，祈祷没人 @ 你", score: -3 },
    ],
  },
  {
    id: "Q02", dimension: "D", angle: "到场表现",
    text: "你到了酒局现场，桌上摆满了酒。你的标准开局动作？",
    options: [
      { id: "A", text: "先给自己满上：「来来来，我开个头！」", score: 3 },
      { id: "B", text: "看看大家喝什么，跟着点一样的", score: 0 },
      { id: "C", text: "坐到离酒最远的位置，默默打开矿泉水", score: -3 },
    ],
  },
  {
    id: "Q03", dimension: "D", angle: "被劝酒时",
    text: "有人端着酒杯过来：「这杯必须干了，不给面子啊？」你？",
    options: [
      { id: "A", text: "「就这？再来一杯我陪你！」直接反劝", score: 3 },
      { id: "B", text: "笑着碰杯，喝多少看心情", score: 0 },
      { id: "C", text: "掏出手机：「不好意思，刚吃了头孢」", score: -3 },
    ],
  },
  {
    id: "Q04", dimension: "D", angle: "酒过三巡",
    text: "桌上的酒快见底了，你的态度？",
    options: [
      { id: "A", text: "叫服务员：「再来两打！」全场欢呼", score: 3 },
      { id: "B", text: "「大家还喝吗？喝的话我加，不喝就算了」", score: 0 },
      { id: "C", text: "心里暗喜终于要结束了，嘴上说「够了够了」", score: -3 },
    ],
  },
  {
    id: "Q05", dimension: "D", angle: "续摊抉择",
    text: "凌晨一点，有人提议转场去酒吧续摊。你？",
    options: [
      { id: "A", text: "「走！我知道一家新开的，DJ 炸裂！」", score: 3 },
      { id: "B", text: "「都行，你们定地方我跟着」", score: 0 },
      { id: "C", text: "你半小时前就已经在滴滴上输好了家的地址", score: -3 },
    ],
  },
  {
    id: "Q06", dimension: "D", angle: "第二天回顾",
    text: "第二天醒来，关于昨晚酒局你的第一念头？",
    options: [
      { id: "A", text: "「爽！下次什么时候？」已经开始约了", score: 3 },
      { id: "B", text: "「还行吧」翻翻朋友圈看看大家发了啥", score: 0 },
      { id: "C", text: "「我发誓再也不去了」有效期约三天", score: -3 },
    ],
  },

  // ==================== E 酒能 (Energy) ====================
  // 测量：醉后能量外放还是内收——燥/衡/静
  {
    id: "Q07", dimension: "E", angle: "微醺状态",
    text: "喝到微醺时，你的音量和动作幅度会？",
    options: [
      { id: "A", text: "音量翻倍，拍桌敬酒，方圆三桌都知道你在这", score: 3 },
      { id: "B", text: "比平时活跃一点，话多了些，但还在座位上", score: 0 },
      { id: "C", text: "反而更安静了，缩在角落像按了静音键", score: -3 },
    ],
  },
  {
    id: "Q08", dimension: "E", angle: "游戏互动",
    text: "有人提议玩骰子 / 真心话大冒险，你的反应？",
    options: [
      { id: "A", text: "「我来定规则！输了罚三杯！」秒变主持人", score: 3 },
      { id: "B", text: "跟着玩，偶尔起哄，气氛到了笑得挺大声", score: 0 },
      { id: "C", text: "「你们玩，我看着就好」然后掏出手机", score: -3 },
    ],
  },
  {
    id: "Q09", dimension: "E", angle: "社交半径",
    text: "喝开了之后，你和周围人的距离？",
    options: [
      { id: "A", text: "全场巡回敬酒，连隔壁桌不认识的人都聊上了", score: 3 },
      { id: "B", text: "跟本桌聊得更起劲，偶尔跟旁边搭个话", score: 0 },
      { id: "C", text: "社交圈反而缩小了，只跟身边一两人低声聊", score: -3 },
    ],
  },
  {
    id: "Q10", dimension: "E", angle: "KTV 画风",
    text: "酒局后转场 KTV，你的画风？",
    options: [
      { id: "A", text: "抢过话筒从《死了都要爱》吼到《海阔天空》，全程不下台", score: 3 },
      { id: "B", text: "合唱时参与，偶尔点一两首自己喜欢的", score: 0 },
      { id: "C", text: "缩在沙发角落吃果盘，或者压根没跟来", score: -3 },
    ],
  },
  {
    id: "Q11", dimension: "E", angle: "肢体语言",
    text: "醉了之后你的肢体语言是？",
    options: [
      { id: "A", text: "搂肩拍背勾脖子，物理距离为零", score: 3 },
      { id: "B", text: "比平时多些接触，碰碰杯拍拍肩", score: 0 },
      { id: "C", text: "整个人趴桌上 / 靠椅背，像一台关机的电脑", score: -3 },
    ],
  },
  {
    id: "Q12", dimension: "E", angle: "散场能量",
    text: "酒局散场那一刻，你的状态？",
    options: [
      { id: "A", text: "「这就散了？再喝！」你是最后一个愿意走的", score: 3 },
      { id: "B", text: "意犹未尽但可以接受，热情道别", score: 0 },
      { id: "C", text: "你一小时前就已经「人间蒸发」了", score: -3 },
    ],
  },

  // ==================== S 酒魂 (Soul) ====================
  // 测量：醉后情感打开还是封锁——真/摇/铁
  {
    id: "Q13", dimension: "S", angle: "真心话阈值",
    text: "喝到一定程度，你干过最真情实感的事？",
    options: [
      { id: "A", text: "当场给人打电话说出藏了很久的心里话", score: 3 },
      { id: "B", text: "跟朋友聊了些平时不太会聊的私密话题", score: 0 },
      { id: "C", text: "没有。不管喝多少，嘴巴跟保险箱一样", score: -3 },
    ],
  },
  {
    id: "Q14", dimension: "S", angle: "情绪决堤",
    text: "酒桌上有人突然说了一句戳到你的话，你会？",
    options: [
      { id: "A", text: "眼眶立刻红了，当场没忍住", score: 3 },
      { id: "B", text: "心里被触动，但过一会儿才可能表现出来", score: 0 },
      { id: "C", text: "内心毫无波澜，情绪防火墙酒精穿透不了", score: -3 },
    ],
  },
  {
    id: "Q15", dimension: "S", angle: "吐真言战绩",
    text: "关于「酒后吐真言」，你的历史战绩？",
    options: [
      { id: "A", text: "辉煌——表白过、道歉过、吐槽老板过", score: 3 },
      { id: "B", text: "偶尔漏过几句，第二天后悔一整天", score: 0 },
      { id: "C", text: "零记录。醉了说的话比清醒时还少", score: -3 },
    ],
  },
  {
    id: "Q16", dimension: "S", angle: "醉后面具",
    text: "朋友说「你喝醉后跟平时完全不一样」，你觉得？",
    options: [
      { id: "A", text: "「醉了才是真的我」——你一直这么觉得", score: 3 },
      { id: "B", text: "「可能吧，有些话清醒时确实说不出口」", score: 0 },
      { id: "C", text: "「不可能，我喝多了也是这样」——确实如此", score: -3 },
    ],
  },
  {
    id: "Q17", dimension: "S", angle: "深夜通讯录",
    text: "酒后半夜打开手机通讯录，你最可能？",
    options: [
      { id: "A", text: "给前任 / 暗恋对象发一段语音长消息", score: 3 },
      { id: "B", text: "在好友群发些平时不会发的感慨", score: 0 },
      { id: "C", text: "喝再多也不碰手机。酒后社交？不存在的", score: -3 },
    ],
  },
  {
    id: "Q18", dimension: "S", angle: "次日社死",
    text: "第二天看到自己昨晚发的消息 / 朋友圈，你？",
    options: [
      { id: "A", text: "一条不删——说了就说了，那是真心话", score: 3 },
      { id: "B", text: "删了一部分，留了一部分，认了吧", score: 0 },
      { id: "C", text: "不用删——你昨晚什么都没发过", score: -3 },
    ],
  },

  // ==================== C 酒量 (Capacity) ====================
  // 测量：物理耐受上限——海量/普通/一碰就倒
  {
    id: "Q19", dimension: "C", angle: "绝对上限",
    text: "一场正常酒局下来，你的极限大概在？",
    options: [
      { id: "A", text: "全场躺了你还能叫代驾、收桌子、扶人上车", score: 3 },
      { id: "B", text: "能跟上节奏，喝到最后有点晕但还清醒", score: 0 },
      { id: "C", text: "一杯脸红两杯上头三杯你就是桌上的战损品", score: -3 },
    ],
  },
  {
    id: "Q20", dimension: "C", angle: "上头速度",
    text: "从清醒到「嗯有点上头了」，你大概需要多久？",
    options: [
      { id: "A", text: "别人都觉得你该醉了但你一点感觉没有", score: 3 },
      { id: "B", text: "两三个小时，慢慢有感觉", score: 0 },
      { id: "C", text: "第一杯没喝完脸就红了，上头速度比 5G 还快", score: -3 },
    ],
  },
  {
    id: "Q21", dimension: "C", angle: "酒类适应",
    text: "关于不同种类的酒，哪个最像你？",
    options: [
      { id: "A", text: "白的啤的红的洋的来者不拒，都是水", score: 3 },
      { id: "B", text: "有一两种擅长的，其他也能应付", score: 0 },
      { id: "C", text: "喝什么都一样——一样的快倒", score: -3 },
    ],
  },
  {
    id: "Q22", dimension: "C", angle: "宿醉恢复",
    text: "喝完酒第二天早上，你的身体状态？",
    options: [
      { id: "A", text: "该上班上班该健身健身，像什么都没发生", score: 3 },
      { id: "B", text: "有点头疼，一杯咖啡基本满血复活", score: 0 },
      { id: "C", text: "躺尸一整天，期间多次发毒誓「再也不喝了」", score: -3 },
    ],
  },
  {
    id: "Q23", dimension: "C", angle: "自我定位",
    text: "全场酒量排个名，你大概在？",
    options: [
      { id: "A", text: "前三不虚，朋友圈公认「永远倒数第一个倒」", score: 3 },
      { id: "B", text: "中游水平，不丢人也不能太嚣张", score: 0 },
      { id: "C", text: "垫底。你来酒局是凑人数的不是凑酒量的", score: -3 },
    ],
  },
  {
    id: "Q24", dimension: "C", angle: "极限战绩",
    text: "你人生中喝到最猛那一次，后果是？",
    options: [
      { id: "A", text: "比别人多喝一倍，第二天照常上班。疑似基因突变", score: 3 },
      { id: "B", text: "确实猛了，断片一小段，但整体还算体面", score: 0 },
      { id: "C", text: "你的「最猛」就是别人的「热身」，两杯就是极限", score: -3 },
    ],
  },

  // ==================== G 酒德 (Grace) ====================
  // 测量：你对周围人的影响——照顾全场/自得其乐/制造混乱
  {
    id: "Q25", dimension: "G", angle: "关注他人",
    text: "你注意到有人一直没怎么说话，你会？",
    options: [
      { id: "A", text: "主动端杯过去聊几句，帮 TA 融入话题", score: 3 },
      { id: "B", text: "心里注意到了，但不会特意做什么", score: 0 },
      { id: "C", text: "那个一直没说话的人……就是你自己", score: -3 },
    ],
  },
  {
    id: "Q26", dimension: "G", angle: "收场能力",
    text: "酒局结束，桌上一片狼藉，有人趴着了。你？",
    options: [
      { id: "A", text: "叫代驾、结账、扶人上车、给家人报平安——全套你来", score: 3 },
      { id: "B", text: "帮着张罗一下，跟别人分工送人回家", score: 0 },
      { id: "C", text: "你可能就是那个趴着的 / 你早就走了", score: -3 },
    ],
  },
  {
    id: "Q27", dimension: "G", angle: "劝酒态度",
    text: "有人明显不想喝但被灌酒，你会？",
    options: [
      { id: "A", text: "直接挡：「这杯我替 TA 喝了，别灌了」", score: 3 },
      { id: "B", text: "打个圆场：「差不多得了」", score: 0 },
      { id: "C", text: "你就是灌酒的那个 / 在旁边起哄「喝喝喝！」", score: -3 },
    ],
  },
  {
    id: "Q28", dimension: "G", angle: "黑历史",
    text: "回想你的酒局黑历史，最接近哪个？",
    options: [
      { id: "A", text: "没有黑历史——你是帮别人收拾黑历史的人", score: 3 },
      { id: "B", text: "偶尔闹过一次，事后诚恳道歉了", score: 0 },
      { id: "C", text: "你的黑历史能出一本书，朋友聚会保留节目就是复述你的事迹", score: -3 },
    ],
  },
  {
    id: "Q29", dimension: "G", angle: "隐私边界",
    text: "酒局上拍了些照片和视频，你会？",
    options: [
      { id: "A", text: "先问所有人「能发吗」，得到许可才发", score: 3 },
      { id: "B", text: "发自己的没问题，有别人的会打个码", score: 0 },
      { id: "C", text: "专挑别人最丑最醉的发出去，配文「哈哈哈哈」", score: -3 },
    ],
  },
  {
    id: "Q30", dimension: "G", angle: "终极自评", isHidden: true,
    text: "最后一题——如果酒局是一场游戏，你是什么角色？",
    options: [
      { id: "A", text: "奶妈 / 辅助——确保全队存活是你的使命", score: 3 },
      { id: "B", text: "输出 / DPS——你负责把气氛打出来", score: 0 },
      { id: "C", text: "开了外挂的 GM——你不属于任何阵营，你就是规则本身", score: 0, hiddenTrigger: true },
    ],
  },
];
