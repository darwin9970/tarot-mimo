import { DrawnCard, ReadingCategory, SpreadConfig } from './types';

function getCategoryKey(category: ReadingCategory): 'love' | 'career' | 'finance' | 'spiritual' {
  switch (category) {
    case 'love': return 'love';
    case 'career': return 'career';
    case 'finance': return 'finance';
    default: return 'spiritual';
  }
}

function generateSingleReading(card: DrawnCard, category: ReadingCategory): string {
  const catKey = getCategoryKey(category);
  const meaning = card.isReversed
    ? card.card.dimensions[catKey].reversed
    : card.card.dimensions[catKey].upright;

  const orientation = card.isReversed ? '逆位' : '正位';
  const intro = `你抽到的是${orientation}的「${card.card.nameCn}」（${card.card.nameEn}）。`;

  return `${intro}\n\n${meaning}`;
}

function generateOverallReading(
  drawnCards: DrawnCard[],
  spread: SpreadConfig,
  category: ReadingCategory
): string {
  const catKey = getCategoryKey(category);
  const segments: string[] = [];

  segments.push(`在这次${spread.name}中，宇宙为你揭示了以下的指引：`);

  drawnCards.forEach((dc) => {
    const orientation = dc.isReversed ? '逆位' : '正位';
    const meaning = dc.isReversed
      ? dc.card.dimensions[catKey].reversed
      : dc.card.dimensions[catKey].upright;
    segments.push(
      `\n「${dc.position}」位出现了${orientation}的「${dc.card.nameCn}」——${meaning.split('。')[0]}。`
    );
  });

  const reversedCount = drawnCards.filter((d) => d.isReversed).length;
  const uprightCount = drawnCards.length - reversedCount;

  if (reversedCount === 0) {
    segments.push('\n\n所有牌都是正位，这暗示着你正处于一个能量顺畅的时期。宇宙的流动方向与你的方向一致——把握这个时机。');
  } else if (uprightCount === 0) {
    segments.push('\n\n所有牌都是逆位，这表明你可能正处于一段需要深度内省的时期。这些挑战并非阻碍，而是通往更深理解的门槛。');
  } else {
    segments.push(`\n\n正位与逆位的交织（${uprightCount}正${reversedCount}逆），暗示着你的处境既有光明也有阴影。接纳这种复杂性，它本身就是生命的真实面貌。`);
  }

  segments.push('\n\n记住——塔罗牌不是预言，而是镜子。它照见的，是你内心深处已经知道的真相。');

  return segments.join('');
}

export function generateReading(
  drawnCards: DrawnCard[],
  spread: SpreadConfig,
  category: ReadingCategory,
  _question?: string
): { overall: string; individual: string[] } {
  const overall = generateOverallReading(drawnCards, spread, category);
  const individual = drawnCards.map((dc) => generateSingleReading(dc, category));

  return { overall, individual };
}
