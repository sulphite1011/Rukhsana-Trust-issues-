import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { sound } from '../utils/audio';

interface QuestionStepProps {
  onYes: () => void;
  onBack: () => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({ onYes, onBack }) => {
  const [noCount, setNoCount] = useState<number>(0);
  const [noPos, setNoPos] = useState<{ top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const playfulPhrases = [
    'No 😈',
    'Are you sure? 😏',
    'Wait, think again! 😜',
    'Wrong button! 🏃‍♀️',
    'Still trying? 😂',
    'You cannot escape! 💜',
    '100% is inevitable! ✨',
    'Just click YES already! 🥹',
  ];

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    sound.playDodge();
    setNoCount((prev) => prev + 1);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 60;

      const maxLeft = Math.max(0, rect.width - 150);
      const maxTop = Math.max(0, rect.height - 100);

      const randomLeft = Math.floor(Math.random() * (maxLeft - padding)) + padding / 2;
      const randomTop = Math.floor(Math.random() * (maxTop - padding)) + padding / 2;

      setNoPos({ left: randomLeft, top: randomTop });
    }
  };

  const handleYes = () => {
    sound.playSuccess();
    onYes();
  };

  const yesScale = Math.min(1 + noCount * 0.22, 2.5);
  const currentPhrase = playfulPhrases[Math.min(noCount, playfulPhrases.length - 1)];

  return (
    <motion.div
      id="question-section"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="max-w-2xl mx-auto py-8 px-4"
    >
      <div
        ref={containerRef}
        className="glass-card p-6 sm:p-12 relative overflow-hidden text-center min-h-[460px] flex flex-col justify-between"
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/15 rounded-full filter blur-3xl pointer-events-none" />

        {/* Top Tag */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span>The Moment of Truth</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-2 leading-tight">
            Do you trust me <span className="name-gradient font-dancing text-4xl sm:text-5xl">100%</span>? 🥹💜
          </h2>

          <p className="text-purple-200/80 text-sm mt-3 max-w-md mx-auto">
            Choose from the heart... (Hint: One button is overwhelmingly more truthful! 😉)
          </p>
        </div>

        {/* Interactive Playground Area */}
        <div className="my-10 flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[140px]">
          {/* YES BUTTON (Grows dynamically) */}
          <motion.button
            id="trust-yes-btn"
            onClick={handleYes}
            animate={{ scale: yesScale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="btn-primary px-10 py-5 text-lg font-bold flex items-center gap-3 shadow-2xl z-20 cursor-pointer text-white"
          >
            <Sparkles className="w-5 h-5 text-pink-200 animate-spin" />
            <span>YES, 100%! 💖</span>
          </motion.button>

          {/* NO BUTTON (Dodges and moves) */}
          <AnimatePresence>
            <motion.button
              id="trust-no-btn"
              onClick={handleNoClick}
              onMouseEnter={noCount > 0 ? handleNoClick : undefined}
              onTouchStart={handleNoClick}
              style={
                noPos
                  ? {
                      position: 'absolute',
                      left: `${noPos.left}px`,
                      top: `${noPos.top}px`,
                      zIndex: 30,
                    }
                  : { position: 'relative', zIndex: 10 }
              }
              animate={noPos ? { x: [0, -5, 5, 0], y: [0, -5, 5, 0] } : {}}
              transition={{ duration: 0.2 }}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-purple-200 hover:text-white text-sm font-semibold transition-all backdrop-blur-md cursor-pointer whitespace-nowrap"
            >
              {currentPhrase}
            </motion.button>
          </AnimatePresence>
        </div>

        {/* Playful hint text if No was clicked */}
        {noCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center gap-2 text-xs text-pink-300 bg-pink-500/10 border border-pink-500/20 py-2 px-4 rounded-xl mx-auto max-w-sm"
          >
            <AlertCircle className="w-4 h-4 text-pink-400 shrink-0" />
            <span>
              {noCount === 1 && 'Look at the YES button growing! 👀'}
              {noCount === 2 && 'It keeps expanding! You know the right answer 💖'}
              {noCount >= 3 && 'Resistance is futile! The YES button is taking over ✨'}
            </span>
          </motion.div>
        )}

        {/* Bottom bar */}
        <div className="mt-8 flex items-center justify-start">
          <button
            id="question-back-btn"
            onClick={onBack}
            className="btn-secondary px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Trust Meter</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
