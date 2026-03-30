'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '@/lib/constants';
import { Sparkles, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/reading', label: '占卜' },
  { href: '/daily', label: '每日运势' },
  { href: '/history', label: '历史' },
  { href: '/about', label: '关于' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 text-arcane-light group-hover:text-gold transition-colors" />
            <span className="text-sm md:text-base font-serif text-gold tracking-wider">
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-xs font-serif tracking-wider transition-colors rounded-lg',
                  pathname === item.href
                    ? 'text-gold bg-arcane/10'
                    : 'text-silver/60 hover:text-silver-light hover:bg-arcane/5'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-silver/60 hover:text-silver-light transition-colors"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-cosmos/95 backdrop-blur-lg border-b border-arcane/10"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-serif tracking-wider transition-colors rounded-lg',
                    pathname === item.href
                      ? 'text-gold bg-arcane/10'
                      : 'text-silver/60 hover:text-silver-light hover:bg-arcane/5'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-arcane/20 to-transparent" />
    </header>
  );
}
