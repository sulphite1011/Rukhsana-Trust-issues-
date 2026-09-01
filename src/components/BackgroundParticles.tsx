import React, { useEffect, useState } from 'react';
import type { FloatingParticle } from '../types';

export const BackgroundParticles: React.FC = () => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    const symbols = ['💜', '✨', '💖', '🌸', '💫', '🤍', '⭐'];
    const generated: FloatingParticle[] = [];

    for (let i = 0; i < 24; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.floor(Math.random() * 14) + 14,
        speed: Math.floor(Math.random() * 12) + 12,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: Math.random() * 0.45 + 0.25,
        delay: Math.random() * 8,
      });
    }

    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Glowing Ambient Blobs */}
      <div className="blob blob-one" />
      <div className="blob blob-two" />
      <div className="blob blob-three" />

      {/* Floating Sparkles & Hearts */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none transform-gpu"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `particleDrift ${p.speed}s ease-in-out infinite`,
            animationDelay: `-${p.delay}s`,
          }}
        >
          {p.symbol}
        </span>
      ))}

      <style>{`
        @keyframes particleDrift {
          0% {
            transform: translateY(20px) rotate(0deg) scale(0.9);
          }
          50% {
            transform: translateY(-40px) rotate(18deg) scale(1.15);
          }
          100% {
            transform: translateY(20px) rotate(0deg) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};
