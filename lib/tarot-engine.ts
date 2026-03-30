import { majorArcana } from '@/data/major-arcana';
import { TarotCard, DrawnCard, SpreadConfig } from './types';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function drawCards(count: number): DrawnCard[] {
  const shuffled = shuffleArray(majorArcana);
  const drawn: DrawnCard[] = [];

  for (let i = 0; i < count; i++) {
    drawn.push({
      card: shuffled[i],
      isReversed: Math.random() < 0.5,
      position: '',
      positionIndex: i,
    });
  }

  return drawn;
}

export function drawForSpread(spread: SpreadConfig): DrawnCard[] {
  const drawn = drawCards(spread.cardCount);
  return drawn.map((d, i) => ({
    ...d,
    position: spread.positions[i]?.label || `位置 ${i + 1}`,
  }));
}

export function drawDailyCard(): DrawnCard {
  const today = new Date();
  const dateString = today.toDateString();
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
    seed = ((seed << 5) - seed + dateString.charCodeAt(i)) | 0;
  }
  seed = Math.abs(seed);

  const cardIndex = Math.floor(seededRandom(seed) * majorArcana.length);
  const isReversed = seededRandom(seed + 1) < 0.5;

  return {
    card: majorArcana[cardIndex],
    isReversed,
    position: '今日指引',
    positionIndex: 0,
  };
}

export function isToday(dateString: string): boolean {
  const today = new Date().toDateString();
  return dateString === today;
}
