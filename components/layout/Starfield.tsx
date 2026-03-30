'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  minOpacity: number;
  maxOpacity: number;
}

export function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      minOpacity: Math.random() * 0.2 + 0.1,
      maxOpacity: Math.random() * 0.5 + 0.3,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="starfield">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
            '--min-opacity': star.minOpacity,
            '--max-opacity': star.maxOpacity,
          } as React.CSSProperties}
        />
      ))}
      {/* 远处的星云效果 */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-arcane/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[300px] bg-mystic/[0.04] rounded-full blur-[120px]" />
    </div>
  );
}
