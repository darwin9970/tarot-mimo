'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BRAND } from '@/lib/constants';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen py-24 md:py-28">
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

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-arcane/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-2xl">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-arcane/20 bg-arcane/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-arcane-light" />
            <span className="text-xs text-arcane-light/80 font-serif tracking-widest uppercase">{BRAND.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-gradient mb-4">关于夜之秘义</h1>
        </motion.div>

        <div className="space-y-10">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-lg font-serif text-gold mb-3">什么是塔罗牌？</h2>
            <p className="text-sm text-silver-light/70 leading-relaxed">
              塔罗牌是一种古老的象征系统，由 78 张牌组成——22 张大阿卡纳和 56 张小阿卡纳。每一张牌都承载着丰富的象征意义，像一面镜子，映照出我们内心深处的真相。
            </p>
            <p className="text-sm text-silver-light/70 leading-relaxed mt-3">
              塔罗牌不是预言未来的工具。它是一面镜子，帮助你看清当下的能量、潜在的可能性，以及你内心已经知道但尚未意识到的答案。
            </p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-lg font-serif text-gold mb-3">如何使用 Arcana Noctis？</h2>
            <div className="space-y-4">
              {[
                { step: '01', title: '选择牌阵', desc: '根据你的需求选择单张牌指引、三张牌阵、爱情或事业占卜。' },
                { step: '02', title: '提出问题', desc: '在心中默想你的问题，或直接写下来。问题可以是任何困扰你的事情。' },
                { step: '03', title: '洗牌与抽牌', desc: '闭上眼睛，深呼吸，让宇宙的能量引导你翻开属于你的牌。' },
                { step: '04', title: '解读牌义', desc: '每张牌都有正位和逆位的不同含义，结合你的问题来理解宇宙的指引。' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-xs text-arcane-light/50 font-serif mt-0.5">{item.step}</span>
                  <div>
                    <h3 className="text-sm font-serif text-gold mb-1">{item.title}</h3>
                    <p className="text-xs text-silver/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-lg font-serif text-gold mb-3">关于正位与逆位</h2>
            <p className="text-sm text-silver-light/70 leading-relaxed">
              当牌被抽到时，它可能以正位（牌面朝上）或逆位（牌面倒置）出现。正位通常表示牌的正面能量正在流动，而逆位则暗示能量可能被阻滞、内化或以不同的方式表达。
            </p>
            <p className="text-sm text-silver-light/70 leading-relaxed mt-3">
              逆位并不意味着"坏"——它只是在提醒你注意某些被忽视的方面。
            </p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-lg font-serif text-gold mb-3">免责声明</h2>
            <p className="text-xs text-silver/40 leading-relaxed">
              Arcana Noctis 提供的塔罗牌占卜仅供娱乐和自我反思之用，不构成任何专业建议。塔罗牌不能替代医学、法律、财务或心理咨询等专业服务。在做出重要决定时，请咨询相关专业人士。
            </p>
          </motion.section>

          <motion.div className="pt-8 border-t border-arcane/10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <p className="text-sm text-silver/40 font-serif mb-4">准备好揭开你的命运了吗？</p>
            <button onClick={() => router.push('/reading')} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-arcane to-arcane-light text-white font-serif text-sm tracking-wider hover:shadow-[0_0_20px_rgba(109,40,217,0.3)] transition-all">
              <Sparkles className="w-4 h-4" /> 开始占卜
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
