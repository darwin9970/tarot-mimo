'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { drawDailyCard, isToday } from '@/lib/tarot-engine';
import { getDailyCardDate, setDailyCardDate } from '@/lib/storage';
import { READING_TEXTS } from '@/lib/constants';
import { DrawnCard } from '@/lib/types';
import { TarotCard } from '@/components/cards/TarotCard';
import { CardDetail } from '@/components/cards/CardDetail';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DailyPage() {
  const router = useRouter();
  const [dailyCard, setDailyCard] = useState<DrawnCard | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    // Check if already drawn today
    const savedDate = getDailyCardDate();
    if (savedDate && isToday(savedDate)) {
      const card = drawDailyCard();
      setDailyCard(card);
      setIsRevealed(true);
      setHasDrawn(true);
    }
  }, []);

  const handleDraw = () => {
    if (hasDrawn) return;
    setHasDrawn(true);
    const card = drawDailyCard();
    setDailyCard(card);
    setDailyCardDate(new Date().toDateString());
    // Reveal after animation
    setTimeout(() => setIsRevealed(true), 800);
  };

  return (
    <main className="relative min-h-screen py-24 md:py-28">
      {/* Back button */}
      <motion.button
        onClick={() => router.push('/')}
        className="absolute top-20 left-6 z-20 flex items-center gap-2 text-silver/40 hover:text-silver/70 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs font-serif">返回</span>
      </motion.button>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-arcane/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* BEFORE DRAW */}
          {!hasDrawn && !dailyCard && (
            <motion.div
              key="before"
              className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-serif text-gold mb-3">今日塔罗</h1>
                <p className="text-sm text-silver/50 max-w-md mx-auto">
                  每一天，宇宙都为你准备了一条专属的指引。闭上眼睛，深呼吸，然后翻开你的牌。
                </p>
              </div>

              {/* Unflipped card */}
              <motion.div
                className="cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDraw}
              >
                <div className="relative w-[160px] h-[250px] md:w-[180px] md:h-[280px] rounded-xl bg-gradient-to-br from-mystic-dark via-mystic to-arcane-dark border border-arcane/30 card-glow">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-gold/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-arcane-light/60 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-gold/70" />
                      </div>
                    </div>
                    <span className="text-xs text-arcane-light/60 font-serif">翻开今日之牌</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* REVEALING */}
          {hasDrawn && !isRevealed && dailyCard && (
            <motion.div
              key="revealing"
              className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-[160px] h-[250px] md:w-[180px] md:h-[280px] rounded-xl bg-gradient-to-br from-mystic-dark via-mystic to-arcane-dark border border-arcane/30 card-glow animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-gold/50" />
                  </motion.div>
                </div>
              </div>
              <motion.p
                className="text-sm text-silver/60 font-serif"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {READING_TEXTS.revealing}
              </motion.p>
            </motion.div>
          )}

          {/* REVEALED */}
          {isRevealed && dailyCard && (
            <motion.div
              key="revealed"
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Title */}
              <div className="text-center mb-10">
                <motion.h1
                  className="text-2xl md:text-3xl font-serif text-gradient mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  今日指引
                </motion.h1>
                <motion.p
                  className="text-sm text-silver/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {new Date().toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                  })}
                </motion.p>
              </div>

              {/* Card */}
              <div className="flex justify-center mb-10">
                <TarotCard
                  card={dailyCard.card}
                  isReversed={dailyCard.isReversed}
                  isFlipped={true}
                  isRevealing={true}
                  size="lg"
                />
              </div>

              {/* Orientation */}
              <div className="text-center mb-6">
                <span
                  className={cn(
                    'text-sm px-3 py-1 rounded-full',
                    dailyCard.isReversed
                      ? 'bg-red-900/30 text-red-400/80'
                      : 'bg-emerald-900/30 text-emerald-400/80'
                  )}
                >
                  {dailyCard.isReversed ? '逆位' : '正位'}
                </span>
              </div>

              {/* Card Name */}
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-serif text-gold">{dailyCard.card.nameCn}</h2>
                <p className="text-sm text-silver/40 font-serif">{dailyCard.card.nameEn}</p>
              </motion.div>

              {/* Keywords */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {dailyCard.card.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-arcane/10 text-arcane-light/70 border border-arcane/20"
                  >
                    {kw}
                  </span>
                ))}
              </motion.div>

              {/* Daily reading */}
              <motion.div
                className="p-6 rounded-xl border border-gold/15 bg-gradient-to-b from-cosmos-50/50 to-mystic-dark/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-sm font-serif text-gold mb-3">今日能量指引</h3>
                <p className="text-sm text-silver-light/70 leading-relaxed mb-4">
                  {dailyCard.isReversed
                    ? dailyCard.card.reversedMeaning
                    : dailyCard.card.uprightMeaning}
                </p>
                <div className="pt-4 border-t border-arcane/10">
                  <h4 className="text-xs font-serif text-gold/70 mb-2">灵性指引</h4>
                  <p className="text-xs text-silver/60 leading-relaxed">
                    {dailyCard.isReversed
                      ? dailyCard.card.dimensions.spiritual.reversed
                      : dailyCard.card.dimensions.spiritual.upright}
                  </p>
                </div>
                <p className="text-xs text-silver/40 mt-4 font-serif">明天，新的牌将再次降临。</p>
              </motion.div>

              {/* Card detail */}
              <div className="mt-6">
                <CardDetail drawnCard={dailyCard} reading="" category="daily" />
              </div>

              {/* Back button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-arcane/30 text-arcane-light font-serif text-sm hover:bg-arcane/10 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> 返回首页
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
