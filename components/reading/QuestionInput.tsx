'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  spreadName: string;
}

export function QuestionInput({ onSubmit, spreadName }: QuestionInputProps) {
  const [question, setQuestion] = useState('');

  return (
    <motion.div
      className="w-full max-w-lg mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-serif text-gold mb-2">你想问宇宙什么？</h2>
        <p className="text-xs text-silver/50">
          {spreadName} · 将你的问题写下来，或留空让宇宙直接指引
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：我在事业上应该做出什么改变？"
          className="w-full h-28 px-4 py-3 rounded-xl bg-cosmos-50/50 border border-arcane/20 text-silver-light placeholder:text-silver/30 text-sm resize-none focus:outline-none focus:border-arcane/50 focus:ring-1 focus:ring-arcane/30 transition-colors"
          maxLength={200}
        />

        <div className="flex items-center justify-between text-[10px] text-silver/30">
          <span>可选</span>
          <span>{question.length}/200</span>
        </div>

        <motion.button
          onClick={() => onSubmit(question)}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-arcane to-arcane-light text-white font-serif text-sm tracking-wider hover:shadow-[0_0_20px_rgba(109,40,217,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Sparkles className="w-4 h-4" />
          感应宇宙能量
        </motion.button>
      </div>
    </motion.div>
  );
}
