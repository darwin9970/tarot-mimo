'use client';

import { motion } from 'framer-motion';
import { DrawnCard } from '@/lib/types';
import { TarotCard } from './TarotCard';
import { cn } from '@/lib/utils';

interface CardRevealProps {
  drawnCards: DrawnCard[];
  revealedCount: number;
  onRevealNext: () => void;
  isComplete: boolean;
}

export function CardReveal({
  drawnCards,
  revealedCount,
  onRevealNext,
  isComplete,
}: CardRevealProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {drawnCards.map((drawn, i) => {
        const isRevealed = i < revealedCount;
        const isCurrent = i === revealedCount;

        return (
          <motion.div
            key={drawn.card.id}
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          >
            {/* Position label */}
            <motion.span
              className="text-xs md:text-sm text-silver/60 font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 + 0.3 }}
            >
              {drawn.position}
            </motion.span>

            {/* Card */}
            <div className="relative">
              {isRevealed ? (
                <TarotCard
                  card={drawn.card}
                  isReversed={drawn.isReversed}
                  isFlipped={true}
                  isRevealing={true}
                  size="md"
                  index={0}
                />
              ) : (
                <motion.div
                  className={cn(
                    'w-[140px] h-[220px] md:w-[160px] md:h-[250px] rounded-xl',
                    'bg-gradient-to-br from-mystic-dark via-mystic to-arcane-dark',
                    'border border-arcane/30 card-glow',
                    isCurrent && 'cursor-pointer'
                  )}
                  onClick={isCurrent ? onRevealNext : undefined}
                  whileHover={isCurrent ? { y: -5, scale: 1.02 } : undefined}
                  animate={
                    isCurrent
                      ? {
                          boxShadow: [
                            '0 0 15px rgba(109, 40, 217, 0.3)',
                            '0 0 30px rgba(109, 40, 217, 0.6)',
                            '0 0 15px rgba(109, 40, 217, 0.3)',
                          ],
                        }
                      : {}
                  }
                  transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border-2 border-gold/40 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border border-arcane-light/60 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold/70" fill="none" stroke="currentColor" strokeWidth="1">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {isCurrent && (
                    <div className="absolute bottom-3 left-0 right-0 text-center">
                      <span className="text-[10px] text-arcane-light/70 font-serif">点击翻开</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Orientation label */}
            {isRevealed && (
              <motion.span
                className={cn(
                  'text-[10px] md:text-xs px-2 py-0.5 rounded-full',
                  drawn.isReversed
                    ? 'bg-red-900/30 text-red-400/80'
                    : 'bg-emerald-900/30 text-emerald-400/80'
                )}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {drawn.isReversed ? '逆位' : '正位'}
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
