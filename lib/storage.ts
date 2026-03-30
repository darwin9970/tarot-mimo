import { ReadingRecord } from './types';

const STORAGE_KEYS = {
  READINGS: 'arcana-noctis-readings',
  DAILY_CARD: 'arcana-noctis-daily',
  SETTINGS: 'arcana-noctis-settings',
} as const;

export function getReadings(): ReadingRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.READINGS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveReading(record: ReadingRecord): void {
  if (typeof window === 'undefined') return;
  const readings = getReadings();
  readings.unshift(record);
  const trimmed = readings.slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(trimmed));
}

export function deleteReading(id: string): void {
  if (typeof window === 'undefined') return;
  const readings = getReadings().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(readings));
}

export function clearReadings(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.READINGS);
}

export function getDailyCardDate(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.DAILY_CARD);
}

export function setDailyCardDate(date: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.DAILY_CARD, date);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
