'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardDeckProps {
  isShuffling?: boolean;
  className?: string;
}

export function CardDeck({ isShuffling = false, className }: CardDeckProps) {
  const cards = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className={cn('relative w-[140px] h-[220px]', className)}>
      {cards.map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-mystic-dark via-mystic to-arcane-dark border border-arcane/20 card-glow"
          initial={{
            x: i * 3,
            y: i * -2,
            rotate: (i - 3) * 2,
          }}
          animate={
            isShuffling
              ? {
                  x: [i * 3, (i % 2 === 0 ? -30 : 30) + i * 3, i * 3, (i % 2 === 0 ? 20 : -20) + i * 3, i * 3],
                  y: [i * -2, -10 + i * -2, i * -2, -5 + i * -2, i * -2],
                  rotate: [(i - 3) * 2, (i % 2 === 0 ? -15 : 15) + (i - 3) * 2, (i - 3) * 2, (i % 2 === 0 ? 10 : -10) + (i - 3) * 2, (i - 3) * 2],
                }
              : { x: i * 3, y: i * -2, rotate: (i - 3) * 2 }
          }
          transition={
            isShuffling
              ? { duration: 0.6, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }
              : { duration: 0.5, delay: i * 0.1 }
          }
          style={{ zIndex: 7 - i }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold/50" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
