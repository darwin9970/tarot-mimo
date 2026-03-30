'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SPREADS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export function SpreadShowcase() {
  const router = useRouter();

  return (
    <section className="relative py-20 md:py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-serif text-gold mb-3">选择你的牌阵</h2>
        <p className="text-sm text-silver/50 max-w-md mx-auto">
          每一种牌阵，都是一扇不同的门。选择与你此刻能量共振的方式。
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {SPREADS.filter((s) => s.id !== 'daily').map((spread, i) => (
          <motion.button
            key={spread.id}
            onClick={() => router.push(`/reading?spread=${spread.id}`)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative text-left p-6 rounded-xl border border-arcane/15 bg-cosmos-50/50 backdrop-blur-sm hover:border-arcane/30 hover:bg-arcane/5 transition-all duration-300"
          >
            <div className="text-2xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
              {spread.category === 'general' ? '✦' : spread.category === 'love' ? '♡' : '⚖'}
            </div>
            <h3 className="text-base md:text-lg font-serif text-gold mb-1">{spread.name}</h3>
            <p className="text-[10px] text-silver/40 font-serif uppercase tracking-wider mb-3">
              {spread.nameEn}
            </p>
            <p className="text-xs text-silver/50 leading-relaxed mb-4">{spread.description}</p>
            <div className="flex items-center gap-3 text-[10px] text-silver/40">
              <span>{spread.cardCount} 张牌</span>
              <span>·</span>
              <span>{spread.positions.map((p) => p.label).join(' / ')}</span>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity">
              <ArrowRight className="w-4 h-4 text-arcane-light" />
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto mt-6"
      >
        <button
          onClick={() => router.push('/daily')}
          className="w-full group relative p-6 md:p-8 rounded-xl border border-gold/15 bg-gradient-to-r from-cosmos-50/50 to-mystic-dark/30 backdrop-blur-sm hover:border-gold/30 transition-all duration-300 text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">☽</span>
                <h3 className="text-lg font-serif text-gold">每日运势</h3>
              </div>
              <p className="text-xs text-silver/50">每天一次，宇宙为你准备专属的今日指引。</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gold/40 group-hover:text-gold/70 group-hover:translate-x-1 transition-all" />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
