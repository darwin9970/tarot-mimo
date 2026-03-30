import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ReadingPhase,
  SpreadConfig,
  DrawnCard,
  ReadingCategory,
} from '@/lib/types';
import { drawForSpread } from '@/lib/tarot-engine';
import { generateReading } from '@/lib/reading-generator';
import { SPREADS } from '@/lib/constants';
import { saveReading, generateId } from '@/lib/storage';

interface ReadingState {
  phase: ReadingPhase;
  selectedSpread: SpreadConfig | null;
  question: string;
  category: ReadingCategory;
  drawnCards: DrawnCard[];
  individualReadings: string[];
  overallReading: string;
  revealedCount: number;

  setPhase: (phase: ReadingPhase) => void;
  selectSpread: (spreadId: string) => void;
  setQuestion: (question: string) => void;
  startShuffling: () => void;
  incrementRevealed: () => void;
  revealCards: () => void;
  completeReading: () => void;
  resetReading: () => void;
}

export const useReadingStore = create<ReadingState>()(
  persist(
    (set, get) => ({
      phase: 'select-spread',
      selectedSpread: null,
      question: '',
      category: 'general',
      drawnCards: [],
      individualReadings: [],
      overallReading: '',
      revealedCount: 0,

      setPhase: (phase) => set({ phase }),

      selectSpread: (spreadId) => {
        const spread = SPREADS.find((s) => s.id === spreadId);
        if (spread) {
          set({
            selectedSpread: spread,
            category: spread.category,
            phase: spread.category === 'daily' ? 'shuffling' : 'input-question',
          });
        }
      },

      setQuestion: (question) => set({ question }),

      startShuffling: () => {
        set({ phase: 'shuffling' });
        setTimeout(() => {
          const state = get();
          if (state.phase === 'shuffling') {
            set({ phase: 'energy-loading' });
            setTimeout(() => {
              const state2 = get();
              if (state2.phase === 'energy-loading' && state2.selectedSpread) {
                const drawn = drawForSpread(state2.selectedSpread);
                set({ drawnCards: drawn, phase: 'drawing', revealedCount: 0 });
                setTimeout(() => {
                  const state3 = get();
                  if (state3.phase === 'drawing') {
                    set({ phase: 'revealing' });
                  }
                }, 1500);
              }
            }, 2000);
          }
        }, 2500);
      },

      incrementRevealed: () => {
        const state = get();
        const newCount = state.revealedCount + 1;
        set({ revealedCount: newCount });

        if (newCount >= state.drawnCards.length && state.drawnCards.length > 0) {
          // All cards revealed, generate reading after short delay
          setTimeout(() => {
            const s = get();
            if (s.selectedSpread && s.drawnCards.length > 0) {
              const { overall, individual } = generateReading(
                s.drawnCards,
                s.selectedSpread,
                s.category,
                s.question
              );
              set({
                overallReading: overall,
                individualReadings: individual,
                phase: 'complete',
              });

              saveReading({
                id: generateId(),
                timestamp: Date.now(),
                question: s.question || '未提问',
                spreadId: s.selectedSpread.id,
                spreadName: s.selectedSpread.name,
                drawnCards: s.drawnCards,
                overallReading: overall,
                category: s.category,
              });
            }
          }, 800);
        }
      },

      revealCards: () => {
        const state = get();
        if (state.selectedSpread && state.drawnCards.length > 0) {
          const { overall, individual } = generateReading(
            state.drawnCards,
            state.selectedSpread,
            state.category,
            state.question
          );
          set({
            overallReading: overall,
            individualReadings: individual,
            phase: 'complete',
          });

          saveReading({
            id: generateId(),
            timestamp: Date.now(),
            question: state.question || '未提问',
            spreadId: state.selectedSpread.id,
            spreadName: state.selectedSpread.name,
            drawnCards: state.drawnCards,
            overallReading: overall,
            category: state.category,
          });
        }
      },

      completeReading: () => set({ phase: 'complete' }),

      resetReading: () => {
        set({
          phase: 'select-spread',
          selectedSpread: null,
          question: '',
          category: 'general',
          drawnCards: [],
          individualReadings: [],
          overallReading: '',
          revealedCount: 0,
        });
      },
    }),
    {
      name: 'arcana-noctis-reading',
      partialize: (state) => ({
        phase: state.phase,
        selectedSpread: state.selectedSpread,
        question: state.question,
        category: state.category,
        drawnCards: state.drawnCards,
        individualReadings: state.individualReadings,
        overallReading: state.overallReading,
        revealedCount: state.revealedCount,
      }),
    }
  )
);
