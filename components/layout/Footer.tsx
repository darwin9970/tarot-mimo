'use client';

import { BRAND } from '@/lib/constants';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-arcane/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-arcane-light/50" />
            <span className="text-sm font-serif text-gold/60 tracking-wider">
              {BRAND.name}
            </span>
          </div>

          {/* 标语 */}
          <p className="text-xs text-silver/30 text-center max-w-md">
            {BRAND.subtitle}
          </p>

          {/* 装饰线 */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-arcane/20" />
            <span className="text-arcane/30 text-xs">✦</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-arcane/20" />
          </div>

          {/* 版权 */}
          <p className="text-[10px] text-silver/20">
            © {new Date().getFullYear()} Arcana Noctis. 在神秘中寻找答案。
          </p>

          {/* 预留链接 */}
          <div className="flex items-center gap-4 text-[10px] text-silver/20">
            <span className="cursor-default hover:text-silver/40 transition-colors">
              隐私政策
            </span>
            <span>·</span>
            <span className="cursor-default hover:text-silver/40 transition-colors">
              使用条款
            </span>
            <span>·</span>
            <span className="cursor-default hover:text-silver/40 transition-colors">
              联系我们
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
