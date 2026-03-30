'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCard as TarotCardType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TarotCardProps {
  card: TarotCardType;
  isReversed?: boolean;
  isFlipped?: boolean;
  isRevealing?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBack?: boolean;
  index?: number;
}

const sizeClasses = {
  sm: 'w-[100px] h-[160px]',
  md: 'w-[140px] h-[220px]',
  lg: 'w-[180px] h-[280px]',
};

const CARD_SYMBOLS = [
  '☆', '☿', '☽', '♀', '♈', '✡', '♊', '♋',
  '♌', '⛎', '☸', '♎', '♓', '♏', '♐', '♑',
  '⛎', '✦', '☾', '☉', '⚖', '⊕',
];

export function TarotCard({
  card,
  isReversed = false,
  isFlipped = false,
  isRevealing = false,
  onClick,
  size = 'md',
  className,
  showBack = true,
  index = 0,
}: TarotCardProps) {
  const [imageError, setImageError] = useState(false);
  const sizeClass = sizeClasses[size];

  return (
    <motion.div
      className={cn('relative cursor-pointer', sizeClass, className)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={!isFlipped ? { y: -8, scale: 1.02 } : undefined}
      style={{ perspective: '1000px' }}
    >
      <AnimatePresence mode="wait">
        {!isFlipped && showBack ? (
          /* BACK FACE */
          <motion.div
            key="back"
            className={cn(
              'absolute inset-0 rounded-xl overflow-hidden',
              'bg-gradient-to-br from-mystic-dark via-mystic to-arcane-dark',
              'border border-arcane/30 card-glow'
            )}
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/40 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-arcane-light/60 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-gold/70" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-3 h-3 border-t border-l border-gold/30" />
                <div className="absolute -top-4 -right-4 w-3 h-3 border-t border-r border-gold/30" />
                <div className="absolute -bottom-4 -left-4 w-3 h-3 border-b border-l border-gold/30" />
                <div className="absolute -bottom-4 -right-4 w-3 h-3 border-b border-r border-gold/30" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl border border-gold/10" />
          </motion.div>
        ) : (
          /* FRONT FACE */
          <motion.div
            key="front"
            className={cn(
              'absolute inset-0 rounded-xl overflow-hidden',
              'bg-gradient-to-b from-cosmos-50 to-cosmos border border-gold/20',
              isReversed && 'rotate-180',
              isRevealing && 'card-glow'
            )}
            initial={showBack ? { rotateY: -90, opacity: 0 } : { opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {!imageError ? (
              <div className="relative w-full h-full">
                <img
                  src={`/cards/${card.imageFilename}`}
                  alt={card.nameCn}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cosmos/90 to-transparent pt-8 pb-2 px-2">
                  <p className="text-[8px] md:text-[10px] text-gold font-serif text-center truncate">
                    {card.nameCn}
                  </p>
                </div>
              </div>
            ) : (
              /* CSS Fallback */
              <div className="relative w-full h-full flex flex-col items-center justify-center p-3">
                <div className="absolute top-2 left-2 text-[10px] text-gold/60 font-serif">
                  {String(card.number).padStart(2, '0')}
                </div>
                <div className="absolute top-2 right-2 text-[8px] text-arcane-light/50 uppercase">
                  {card.type === 'major' ? 'MAJOR' : card.suit}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl mb-2 opacity-80">
                      {CARD_SYMBOLS[card.number] || '✦'}
                    </div>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] md:text-xs text-gold font-serif truncate">
                    {card.nameCn}
                  </p>
                  <p className="text-[7px] md:text-[8px] text-silver/50 font-serif truncate">
                    {card.nameEn}
                  </p>
                </div>
                <div className="absolute inset-1 rounded-lg border border-gold/10 pointer-events-none" />
                <div className="absolute inset-2 rounded-md border border-arcane/10 pointer-events-none" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
