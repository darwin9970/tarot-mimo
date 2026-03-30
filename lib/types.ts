export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';
export type CardType = 'major' | 'minor';
export type ReadingCategory = 'general' | 'love' | 'career' | 'daily' | 'finance';

export interface CardDimension {
  upright: string;
  reversed: string;
}

export interface CardDimensions {
  love: CardDimension;
  career: CardDimension;
  finance: CardDimension;
  spiritual: CardDimension;
}

export interface TarotCard {
  id: string;
  number: number;
  nameEn: string;
  nameCn: string;
  type: CardType;
  suit?: Suit;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  imageFilename: string;
  symbolism: string;
  dimensions: CardDimensions;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position: string;
  positionIndex: number;
}

export interface SpreadPosition {
  label: string;
  description: string;
}

export interface SpreadConfig {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  cardCount: number;
  positions: SpreadPosition[];
  category: ReadingCategory;
}

export interface ReadingRecord {
  id: string;
  timestamp: number;
  question: string;
  spreadId: string;
  spreadName: string;
  drawnCards: DrawnCard[];
  overallReading: string;
  category: ReadingCategory;
}

export type ReadingPhase =
  | 'select-spread'
  | 'input-question'
  | 'shuffling'
  | 'energy-loading'
  | 'drawing'
  | 'revealing'
  | 'complete';
