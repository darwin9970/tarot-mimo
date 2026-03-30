import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Starfield } from '@/components/layout/Starfield';

export const metadata: Metadata = {
  title: 'Arcana Noctis — 夜之秘义',
  description: '在星辰与阴影之间，寻找你的答案。沉浸式塔罗牌占卜体验。',
  keywords: ['塔罗牌', '占卜', 'tarot', 'arcana noctis', '命运'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen bg-cosmos text-silver-light antialiased">
        <Starfield />
        <div className="noise-overlay" />
        <Navigation />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
