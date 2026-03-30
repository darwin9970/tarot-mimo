'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ReadingRecord } from '@/lib/types';
import { getReadings, clearReadings } from '@/lib/storage';
import { Clock, Trash2, ChevronDown, ArrowLeft } from 'lucide-react';

export default function HistoryPage() {
  const router = useRouter();
  const [readings, setReadings] = useState<ReadingRecord[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setReadings(getReadings());
  }, []);

  const handleClear = () => {
    if (typeof window !== 'undefined' && window.confirm('确定要清除所有占卜记录吗？')) {
      clearReadings();
      setReadings([]);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <main className="relative min-h-screen py-24 md:py-28">
      <motion.button onClick={() => router.push('/')} className="absolute top-20 left-6 z-20 flex items-center gap-2 text-silver/40 hover:text-silver/70 transition-colors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs font-serif">返回</span>
      </motion.button>

      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-serif text-gold mb-2">占卜历史</h1>
          <p className="text-sm text-silver/50">你与宇宙的每一次对话，都在这里被珍藏</p>
        </motion.div>

        {readings.length === 0 ? (
          <motion.div className="flex flex-col items-center justify-center min-h-[40vh] gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-4xl opacity-30">✦</div>
            <p className="text-sm text-silver/40 font-serif">你的占卜之旅，从这里开始</p>
            <p className="text-xs text-silver/30">每一次占卜都被珍藏于此，记录你与宇宙的对话。</p>
            <button onClick={() => router.push('/reading')} className="mt-4 px-6 py-3 rounded-full border border-arcane/30 text-arcane-light font-serif text-sm hover:bg-arcane/10 transition-all">
              开始第一次占卜
            </button>
          </motion.div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-end mb-6">
              <button onClick={handleClear} className="flex items-center gap-1.5 text-xs text-silver/30 hover:text-red-400/60 transition-colors">
                <Trash2 className="w-3 h-3" /> 清除全部
              </button>
            </div>

            <div className="space-y-3">
              {readings.map((reading, i) => (
                <motion.div key={reading.id} className="rounded-xl border border-arcane/15 bg-cosmos-50/50 backdrop-blur-sm overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <button onClick={() => setExpandedId(expandedId === reading.id ? null : reading.id)} className="w-full p-4 md:p-5 flex items-center gap-4 text-left hover:bg-arcane/5 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-arcane/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-arcane-light/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gold font-serif truncate">{reading.spreadName}</p>
                      <p className="text-[10px] text-silver/40 mt-0.5">{formatDate(reading.timestamp)}</p>
                      {reading.question && reading.question !== '未提问' && (
                        <p className="text-xs text-silver/50 mt-1 truncate italic">"{reading.question}"</p>
                      )}
                    </div>
                    <div className="flex -space-x-2">
                      {reading.drawnCards.slice(0, 3).map((dc, j) => (
                        <div key={j} className="w-6 h-8 rounded bg-gradient-to-b from-mystic to-cosmos border border-arcane/20 flex items-center justify-center">
                          <span className="text-[6px] text-gold/60 font-serif">{String(dc.card.number).padStart(2, '0')}</span>
                        </div>
                      ))}
                    </div>
                    <motion.div animate={{ rotate: expandedId === reading.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-4 h-4 text-silver/30" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedId === reading.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-3">
                          <div className="pt-3 border-t border-arcane/10">
                            <p className="text-[10px] text-silver/40 mb-2 font-serif uppercase tracking-wider">抽到的牌</p>
                            <div className="space-y-2">
                              {reading.drawnCards.map((dc, j) => (
                                <div key={j} className="flex items-center gap-3">
                                  <span className="text-xs text-silver/30 w-16">{dc.position}</span>
                                  <span className="text-sm text-gold font-serif">{dc.card.nameCn}</span>
                                  <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full', dc.isReversed ? 'bg-red-900/30 text-red-400/80' : 'bg-emerald-900/30 text-emerald-400/80')}>
                                    {dc.isReversed ? '逆' : '正'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="pt-3 border-t border-arcane/10">
                            <p className="text-[10px] text-silver/40 mb-2 font-serif uppercase tracking-wider">解读</p>
                            <p className="text-xs text-silver-light/60 leading-relaxed whitespace-pre-line">{reading.overallReading}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
