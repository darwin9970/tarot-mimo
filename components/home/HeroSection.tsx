'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BRAND } from '@/lib/constants';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arcane/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-mystic-light/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-arcane/20 bg-arcane/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-arcane-light" />
            <span className="text-xs text-arcane-light/80 font-serif tracking-widest uppercase">
              {BRAND.name}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
        >
          <span className="text-gradient">{BRAND.heroTitle}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-silver/70 mb-10 leading-relaxed max-w-lg mx-auto"
        >
          {BRAND.heroSubtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={() => router.push('/reading')}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-arcane to-arcane-light text-white font-serif text-sm md:text-base tracking-wider overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(109,40,217,0.4)]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">{BRAND.ctaText}</span>
          <Sparkles className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-arcane-light to-arcane opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] text-silver/30 tracking-widest uppercase">Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-silver/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
