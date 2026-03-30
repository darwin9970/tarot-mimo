'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrawnCard, ReadingCategory } from '@/lib/types';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardDetailProps {
  drawnCard: DrawnCard;
  reading: string;
  category: ReadingCategory;
}

export function CardDetail({ drawnCard, reading, category }: CardDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { card, isReversed, position } = drawnCard;

  const catKey = category === 'love' ? 'love'
    : category === 'career' ? 'career'
    : category === 'finance' ? 'finance'
    : 'spiritual';

  const dimensionMeaning = isReversed
    ? card.dimensions[catKey].reversed
    : card.dimensions[catKey].upright;

  return (
    <motion.div
      className="w-full rounded-xl border border-arcane/20 bg-cosmos-50/50 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-5 flex items-center gap-4 text-left hover:bg-arcane/5 transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-14 md:w-12 md:h-16 rounded-lg bg-gradient-to-b from-mystic to-cosmos border border-gold/20 flex items-center justify-center">
          <span className="text-lg md:text-xl text-gold/80 font-serif">
            {String(card.number).padStart(2, '0')}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm md:text-base text-gold font-serif truncate">
              {card.nameCn}
            </h3>
            <span className={cn(
              'text-[10px] px-1.5 py-0.5 rounded-full',
              isReversed
                ? 'bg-red-900/30 text-red-400/80'
                : 'bg-emerald-900/30 text-emerald-400/80'
            )}>
              {isReversed ? '逆位' : '正位'}
            </span>
          </div>
          <p className="text-xs text-silver/50 mt-0.5">
            {card.nameEn} · {position}
          </p>
        </div>

        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-silver/40" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {card.keywords.map((kw) => (
                  <span key={kw} className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-arcane/10 text-arcane-light/70 border border-arcane/20">
                    {kw}
                  </span>
                ))}
              </div>

              <div>
                <h4 className="text-xs text-silver/50 mb-1 font-serif">
                  {isReversed ? '逆位含义' : '正位含义'}
                </h4>
                <p className="text-sm text-silver-light/80 leading-relaxed">
                  {isReversed ? card.reversedMeaning : card.uprightMeaning}
                </p>
              </div>

              <div>
                <h4 className="text-xs text-silver/50 mb-1 font-serif">
                  {category === 'love' ? '爱情解读'
                    : category === 'career' ? '事业解读'
                    : category === 'finance' ? '财运解读'
                    : '灵性解读'}
                </h4>
                <p className="text-sm text-silver-light/80 leading-relaxed">
                  {dimensionMeaning}
                </p>
              </div>

              <div className="pt-2 border-t border-arcane/10">
                <h4 className="text-xs text-silver/50 mb-1 font-serif">象征意义</h4>
                <p className="text-xs text-silver/60 leading-relaxed">{card.symbolism}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
