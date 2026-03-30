'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useReadingStore } from '@/store/readingStore';
import { SPREADS } from '@/lib/constants';
import { CardReveal } from '@/components/cards/CardReveal';
import { QuestionInput } from '@/components/reading/QuestionInput';
import { ShuffleAnimation } from '@/components/reading/ShuffleAnimation';
import { EnergyLoading } from '@/components/reading/EnergyLoading';
import { Sparkles, ArrowLeft } from 'lucide-react';

function ReadingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const spreadId = searchParams.get('spread');

  const {
    phase,
    selectedSpread,
    question,
    drawnCards,
    revealedCount,
    selectSpread,
    setQuestion,
    startShuffling,
    incrementRevealed,
    resetReading,
  } = useReadingStore();

  // Auto-select spread from URL param
  useEffect(() => {
    if (spreadId && phase === 'select-spread') {
      selectSpread(spreadId);
    }
  }, [spreadId]);

  const handleRevealNext = () => {
    if (revealedCount < drawnCards.length) {
      incrementRevealed();
    }
  };

  const handleQuestionSubmit = (q: string) => {
    setQuestion(q);
    startShuffling();
  };

  const handleStartFresh = () => {
    resetReading();
    router.push('/');
  };

  return (
    <main className="relative min-h-screen">
      {phase === 'select-spread' && (
        <motion.button
          onClick={handleStartFresh}
          className="absolute top-20 left-6 z-20 flex items-center gap-2 text-silver/40 hover:text-silver/70 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-serif">返回</span>
        </motion.button>
      )}

      <div className="container mx-auto px-4 py-24 md:py-28">
        <AnimatePresence mode="wait">
          {/* Spread Selection */}
          {phase === 'select-spread' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-2xl md:text-3xl font-serif text-gold mb-3">选择占卜方式</h1>
                <p className="text-sm text-silver/50">每种牌阵都是通往不同维度的门</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPREADS.map((spread, i) => (
                  <motion.button
                    key={spread.id}
                    onClick={() => selectSpread(spread.id)}
                    className="text-left p-6 rounded-xl border border-arcane/15 bg-cosmos-50/50 backdrop-blur-sm hover:border-arcane/30 hover:bg-arcane/5 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <h3 className="text-base font-serif text-gold mb-1 group-hover:text-gold-light transition-colors">
                      {spread.name}
                    </h3>
                    <p className="text-[10px] text-silver/40 font-serif uppercase tracking-wider mb-2">
                      {spread.nameEn} · {spread.cardCount} {spread.cardCount > 1 ? 'cards' : 'card'}
                    </p>
                    <p className="text-xs text-silver/50 leading-relaxed">{spread.description}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Question Input */}
          {phase === 'input-question' && selectedSpread && (
            <motion.div key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuestionInput onSubmit={handleQuestionSubmit} spreadName={selectedSpread.name} />
            </motion.div>
          )}

          {/* Shuffling */}
          {phase === 'shuffling' && (
            <motion.div key="shuffling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ShuffleAnimation />
            </motion.div>
          )}

          {/* Energy Loading */}
          {phase === 'energy-loading' && (
            <motion.div key="energy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EnergyLoading />
            </motion.div>
          )}

          {/* Drawing / Revealing Cards */}
          {(phase === 'drawing' || phase === 'revealing') && (
            <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <motion.h2 className="text-xl md:text-2xl font-serif text-gold mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {phase === 'drawing'
                    ? '你的牌已被选中'
                    : revealedCount < drawnCards.length
                    ? '点击卡牌，揭示你的命运'
                    : '所有牌已揭晓'}
                </motion.h2>
                <p className="text-xs text-silver/50">
                  {selectedSpread?.name}
                  {question && ` · "${question}"`}
                </p>
              </div>

              <CardReveal
                drawnCards={drawnCards}
                revealedCount={revealedCount}
                onRevealNext={handleRevealNext}
                isComplete={revealedCount >= drawnCards.length}
              />

              {/* Show "查看解读" button when all cards revealed in revealing phase */}
              {revealedCount >= drawnCards.length && phase === 'revealing' && (
                <motion.div className="text-center mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <button
                    onClick={() => router.push('/result')}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-arcane to-arcane-light text-white font-serif text-sm tracking-wider hover:shadow-[0_0_20px_rgba(109,40,217,0.3)] transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    查看解读
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Complete */}
          {phase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl md:text-2xl font-serif text-gradient mb-4">占卜完成</h2>
                <p className="text-sm text-silver/50 mb-6">宇宙的指引已经为你揭晓</p>
                <button
                  onClick={() => router.push('/result')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-arcane to-arcane-light text-white font-serif text-sm tracking-wider"
                >
                  <Sparkles className="w-4 h-4" />
                  查看解读
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function ReadingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-silver/40 font-serif">Loading...</div></div>}>
      <ReadingContent />
    </Suspense>
  );
}
