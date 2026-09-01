import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, ArrowRight, ArrowLeft, Zap, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface TrustMeterStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const TrustMeterStep: React.FC<TrustMeterStepProps> = ({ onNext, onBack }) => {
  const [score, setScore] = useState<number>(30);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const startVal = 30;
    const targetVal = 100;
    const duration = 2400; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(startVal + (targetVal - startVal) * easeProgress);
      setScore(current);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setScore(100);
        setIsCompleted(true);
        sound.playSuccess();
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleNext = () => {
    sound.playPop();
    onNext();
  };

  const handleBack = () => {
    sound.playTing();
    onBack();
  };

  const getMilestone = (val: number) => {
    if (val < 50) return { label: 'TikTok Inbox Salam & First Hello 💬', badge: 'Level 1' };
    if (val < 75) return { label: 'The "Rukhsana" Name Guess 🎯', badge: 'Level 2' };
    if (val < 99) return { label: 'Deep Conversations & Understanding ✨', badge: 'Level 3' };
    return { label: '100% Pure, Complete & Genuine Trust 👑', badge: 'Maximum Trust 💜' };
  };

  const milestone = getMilestone(score);

  return (
    <motion.div
      id="trust-meter-section"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="max-w-2xl mx-auto py-8 px-4"
    >
      <div className="glass-card p-6 sm:p-10 relative overflow-hidden text-center">
        {/* Decorative Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-pink-500/20 rounded-full filter blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-4 h-4 text-pink-400" />
          <span>Real-Time Trust Meter</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          How Our Trust Grew 📈
        </h2>
        <p className="text-purple-200/80 text-sm max-w-md mx-auto">
          Starting from that first message, watch the trust level reach its absolute peak!
        </p>

        {/* Trust Number Display */}
        <div className="my-8 py-6 rounded-3xl bg-white/[0.03] border border-white/10 relative">
          <motion.div
            key={isCompleted ? 'done' : 'counting'}
            className="flex items-baseline justify-center font-extrabold"
          >
            <span className="text-6xl sm:text-8xl tracking-tight bg-gradient-to-r from-pink-400 via-pink-200 to-purple-400 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(255,79,154,0.4)]">
              {score}
            </span>
            <span className="text-3xl sm:text-4xl text-pink-400 ml-1 font-bold">%</span>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="max-w-md mx-auto px-6 mt-4">
            <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15">
              <div
                className="h-full rounded-full transition-all duration-75 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 progress-glow"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {/* Current Milestone Badge */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-pink-200">
            <Zap className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span className="font-semibold text-pink-300">{milestone.badge}:</span>
            <span>{milestone.label}</span>
          </div>
        </div>

        {/* Comparison Details */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left text-xs sm:text-sm mb-8">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-pink-400 font-semibold mb-1">First Interaction</div>
            <div className="text-purple-200/70 text-xs">Polite & respectful inquiry (30%)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/30">
            <div className="text-pink-300 font-semibold mb-1 flex items-center gap-1">
              <span>Today&apos;s Bond</span>
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            </div>
            <div className="text-purple-200/90 text-xs font-medium">100% Complete & Real 💜</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <button
            id="trust-meter-back-btn"
            onClick={handleBack}
            className="btn-secondary px-6 py-3 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            id="trust-meter-next-btn"
            disabled={!isCompleted}
            onClick={handleNext}
            className={`btn-primary px-8 py-3.5 text-sm sm:text-base font-semibold flex items-center gap-3 w-full sm:w-auto justify-center shadow-lg transition-all ${
              isCompleted ? 'opacity-100 scale-100' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <span>One Quick Question...</span>
            <Sparkles className="w-4 h-4" />
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
