'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface OverallReadingProps {
  reading: string;
  question: string;
  spreadName: string;
}

export function OverallReading({ reading, question, spreadName }: OverallReadingProps) {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto rounded-xl border border-gold/15 bg-gradient-to-b from-cosmos-50/80 to-mystic-dark/20 backdrop-blur-sm p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-gold/60" />
        <h2 className="text-lg md:text-xl font-serif text-gold">宇宙的解读</h2>
      </div>

      {question && question !== '未提问' && (
        <div className="mb-6 p-4 rounded-lg bg-arcane/5 border border-arcane/10">
          <p className="text-[10px] text-silver/40 mb-1 font-serif uppercase tracking-wider">你的问题</p>
          <p className="text-sm text-silver-light/80 italic">"{question}"</p>
        </div>
      )}

      <div className="space-y-4">
        {reading.split('\n\n').map((paragraph, i) => (
          <motion.p
            key={i}
            className="text-sm md:text-base text-silver-light/75 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/20" />
        <span className="text-gold/30 text-xs">✦</span>
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/20" />
      </div>
    </motion.div>
  );
}
