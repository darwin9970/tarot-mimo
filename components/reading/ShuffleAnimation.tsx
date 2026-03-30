'use client';

import { motion } from 'framer-motion';
import { CardDeck } from '@/components/cards/CardDeck';
import { READING_TEXTS } from '@/lib/constants';

export function ShuffleAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 min-h-[60vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardDeck isShuffling={true} />

      <motion.p
        className="text-sm md:text-base text-silver/60 font-serif text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {READING_TEXTS.shuffling}
      </motion.p>

      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-8 rounded-full bg-arcane/40"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
