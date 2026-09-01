import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface IntroStepProps {
  onNext: () => void;
}

export const IntroStep: React.FC<IntroStepProps> = ({ onNext }) => {
  const handleStart = () => {
    sound.playPop();
    // Play the song on first user interaction
    if (!sound.getIsPlaying()) {
      sound.playMusic();
    }
    onNext();
  };

  return (
    <motion.div
      id="intro-section"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="flex flex-col items-center text-center max-w-xl mx-auto py-10 px-4"
    >
      {/* Top Label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        <span>A Special Memory For You</span>
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
      </motion.div>

      {/* Main Title / Name */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mb-4"
      >
        <h1 className="name-gradient drop-shadow-lg">
          Rukh... Rukhsana?
        </h1>
        <div className="flex justify-center items-center gap-3 mt-2">
          <Heart className="w-9 h-9 text-pink-500 fill-pink-500 heart-pulse filter drop-shadow-[0_0_12px_rgba(255,79,154,0.8)]" />
        </div>
      </motion.div>

      {/* Subtitle & Story Hook */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-purple-100/90 text-lg leading-relaxed max-w-md mx-auto mt-4 font-light"
      >
        Remember when you only said <span className="text-pink-400 font-semibold italic">&ldquo;Rukh&rdquo;</span>... and out of nowhere, I guessed <span className="text-pink-300 font-semibold underline decoration-pink-500/60 underline-offset-4">&ldquo;Rukhsana&rdquo;</span>? 😄✨
      </motion.p>

      {/* Interactive Card preview */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-sm w-full text-sm text-pink-200/80 flex items-center justify-center gap-3"
      >
        <span className="text-2xl select-none">💌</span>
        <span className="text-left font-light">
          From your &ldquo;Assalam-o-Alaikum&rdquo; in my inbox to 100% genuine trust.
        </span>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        id="intro-continue-btn"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleStart}
        className="btn-primary mt-9 px-8 py-4 text-base font-semibold flex items-center gap-3 shadow-xl hover:shadow-pink-500/30"
      >
        <span>Let&apos;s Begin</span>
        <ArrowRight className="w-5 h-5 text-pink-200" />
      </motion.button>
    </motion.div>
  );
};
