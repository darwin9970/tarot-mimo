import { SpreadConfig } from './types';

export const SPREADS: SpreadConfig[] = [
  {
    id: 'single',
    name: '单张牌指引',
    nameEn: 'Single Card',
    description: '从宇宙中接收一条直接的指引。最简洁，也最深刻的占卜方式。',
    cardCount: 1,
    positions: [{ label: '指引', description: '宇宙为你选择的指引' }],
    category: 'general',
  },
  {
    id: 'three-card',
    name: '三张牌阵',
    nameEn: 'Past · Present · Future',
    description: '穿越时间的河流，看清过去如何塑造现在，现在如何引领未来。',
    cardCount: 3,
    positions: [
      { label: '过去', description: '影响当下的过去能量' },
      { label: '现在', description: '当前状况的核心' },
      { label: '未来', description: '可能的发展方向' },
    ],
    category: 'general',
  },
  {
    id: 'love',
    name: '爱情占卜',
    nameEn: 'Love Reading',
    description: '探索你感情世界的深层能量。了解你在爱中的状态与即将到来的缘分。',
    cardCount: 3,
    positions: [
      { label: '你的能量', description: '你在感情中的状态' },
      { label: '对方的能量', description: '对方在感情中的状态' },
      { label: '关系走向', description: '这段关系的发展方向' },
    ],
    category: 'love',
  },
  {
    id: 'career',
    name: '事业占卜',
    nameEn: 'Career Reading',
    description: '洞察你事业道路的能量流向。看清机遇与挑战，找到前行的方向。',
    cardCount: 3,
    positions: [
      { label: '当前处境', description: '你事业的现状' },
      { label: '挑战与机遇', description: '需要关注的关键因素' },
      { label: '建议方向', description: '前行的最佳路径' },
    ],
    category: 'career',
  },
  {
    id: 'daily',
    name: '每日运势',
    nameEn: 'Daily Fortune',
    description: '今日宇宙能量的指引。每天只为你抽取一张专属的牌。',
    cardCount: 1,
    positions: [{ label: '今日指引', description: '今日宇宙能量的指引' }],
    category: 'daily',
  },
];

export const BRAND = {
  name: 'Arcana Noctis',
  tagline: '夜之秘义',
  subtitle: '在星辰与阴影之间，寻找你的答案',
  heroTitle: '揭开命运的帷幕',
  heroSubtitle: '每一张牌，都是一面镜子。照见你不敢直视的真相。',
  ctaText: '开始占卜',
};

export const READING_TEXTS = {
  shuffling: '牌组正在感应你的能量……',
  energyLoading: '宇宙的指引正在汇聚……',
  drawing: '你的牌已被选中……',
  revealing: '帷幕正在揭开……',
  complete: '你的命运已揭晓',
  emptyHistory: '你的占卜之旅，从这里开始',
  emptyHistoryDesc: '每一次占卜都被珍藏于此，记录你与宇宙的对话。',
  dailyUsed: '今日的指引已经为你准备好了',
  dailyUsedDesc: '宇宙每天只为你准备一条指引。明天，新的牌将再次降临。',
};
