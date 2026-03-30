'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useReadingStore } from '@/store/readingStore';
import { TarotCard } from '@/components/cards/TarotCard';
import { CardDetail } from '@/components/cards/CardDetail';
import { OverallReading } from '@/components/result/OverallReading';
import { RotateCcw, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

function ResultContent() {
  const router = useRouter();
  const {
    drawnCards,
    overallReading,
    individualReadings,
    selectedSpread,
    question,
    category,
    phase,
    resetReading,
  } = useReadingStore();

  const handleRetry = () => {
    resetReading();
    router.push('/reading');
  };

  // Show loading if data not ready yet (hydration delay from localStorage)
  if (drawnCards.length === 0) {
    return (
      <main className="relative min-h-screen py-24 md:py-28 flex flex-col items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-silver/40 font-serif mb-4">暂无占卜结果</p>
          <button
            onClick={() => router.push('/reading')}
            className="px-6 py-3 rounded-full border border-arcane/30 text-arcane-light font-serif text-sm hover:bg-arcane/10 transition-all"
          >
            开始新的占卜
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen py-24 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-arcane/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Title */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-serif text-gradient mb-2">命运已揭晓</h1>
          <p className="text-sm text-silver/50">{selectedSpread?.name}</p>
        </motion.div>

        {/* Card Display */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {drawnCards.map((drawn, i) => (
            <div key={drawn.card.id} className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-silver/40 font-serif">{drawn.position}</span>
              <TarotCard
                card={drawn.card}
                isReversed={drawn.isReversed}
                isFlipped={true}
                isRevealing={true}
                size="md"
                index={i}
              />
              <span className={cn(
                'text-[10px] px-2 py-0.5 rounded-full',
                drawn.isReversed
                  ? 'bg-red-900/30 text-red-400/80'
                  : 'bg-emerald-900/30 text-emerald-400/80'
              )}>
                {drawn.isReversed ? '逆位' : '正位'}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Overall Reading */}
        {overallReading && (
          <div className="mb-12">
            <OverallReading
              reading={overallReading}
              question={question}
              spreadName={selectedSpread?.name || ''}
            />
          </div>
        )}

        {/* Individual Card Details */}
        <div className="max-w-2xl mx-auto mb-12">
          <motion.h2
            className="text-lg font-serif text-gold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            逐牌解读
          </motion.h2>
          <div className="space-y-3">
            {drawnCards.map((drawn, i) => (
              <CardDetail
                key={drawn.card.id}
                drawnCard={drawn}
                reading={individualReadings[i] || ''}
                category={category}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleRetry}
            className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-arcane to-arcane-light text-white font-serif text-sm hover:shadow-[0_0_20px_rgba(109,40,217,0.3)] transition-all"
          >
            <RotateCcw className="w-4 h-4" /> 再抽一次
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-arcane/30 text-arcane-light font-serif text-sm hover:bg-arcane/10 transition-all"
          >
            <Home className="w-4 h-4" /> 返回首页
          </button>
        </motion.div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-silver/40 font-serif">Loading...</div></div>}>
      <ResultContent />
    </Suspense>
  );
}
