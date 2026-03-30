'use client';

import { motion } from 'framer-motion';
import { READING_TEXTS } from '@/lib/constants';

export function EnergyLoading() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 min-h-[60vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-32 h-32">
        <motion.div
          className="absolute inset-0 rounded-full border border-arcane/30"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-arcane-light/30"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-gold/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-4 h-4 rounded-full bg-arcane-light/60 blur-sm" />
        </motion.div>
      </div>

      <motion.p
        className="text-sm md:text-base text-silver/60 font-serif text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {READING_TEXTS.energyLoading}
      </motion.p>
    </motion.div>
  );
}
