import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Award, RotateCcw, Share2, CheckCircle2, Music } from 'lucide-react';
import { sound } from '../utils/audio';

interface CelebrationStepProps {
  onRestart: () => void;
}

export const CelebrationStep: React.FC<CelebrationStepProps> = ({ onRestart }) => {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [copied, setCopied] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState(sound.getIsPlaying());

  useEffect(() => {
    // Fire celebratory confetti explosion
    const count = 220;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ff4f9a', '#8c52ff', '#ff82bb', '#ffffff', '#ffd700'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    sound.playSuccess();

    // Start playing the romantic song if not already started
    if (!sound.getIsPlaying()) {
      sound.playMusic();
    }

    const unsub = sound.subscribe((playing) => setIsPlayingSong(playing));
    return unsub;
  }, []);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sound.playPop();
    const newBurst = { id: Date.now() + Math.random(), x, y };
    setBursts((prev) => [...prev.slice(-15), newBurst]);

    confetti({
      particleCount: 15,
      spread: 40,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#ff4f9a', '#8c52ff', '#ff82bb'],
    });
  };

  const handleShare = () => {
    sound.playTing();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div
      id="celebration-section"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="max-w-2xl mx-auto py-6 sm:py-8 px-4 relative"
      onClick={handleScreenClick}
    >
      {/* Floating Hearts from user clicks */}
      {bursts.map((b) => (
        <motion.div
          key={b.id}
          initial={{ scale: 0, opacity: 1, y: 0 }}
          animate={{ scale: 1.5, opacity: 0, y: -80 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ left: b.x, top: b.y }}
          className="absolute pointer-events-none z-50 text-2xl select-none"
        >
          💜
        </motion.div>
      ))}

      <div className="glass-card p-6 sm:p-10 relative overflow-hidden text-center">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/15 via-purple-500/10 to-transparent pointer-events-none" />

        {/* Heart & Sparkles Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.7, ease: 'backOut' }}
          className="relative inline-block mb-3"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(255,79,154,0.6)] mx-auto">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white heart-pulse" />
          </div>
          <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
          <Sparkles className="w-5 h-5 text-pink-300 absolute -bottom-1 -left-1 animate-pulse" />
        </motion.div>

        {/* Celebration Title */}
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
          Yay! I Knew It! 🎉
        </h2>
        <p className="name-gradient font-dancing text-3xl sm:text-4xl">
          100% Trust Certified 💜
        </p>

        {/* Song dedication banner */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-200 text-xs sm:text-sm backdrop-blur-md">
          <Music className={`w-4 h-4 text-pink-400 ${isPlayingSong ? 'animate-bounce' : ''}`} />
          <span className="font-medium italic">
            &ldquo;Mile ho tum humko bade naseebon se...&rdquo; 🎵
          </span>
        </div>

        {/* Emotional Certificate Card */}
        <div className="my-6 p-5 sm:p-6 rounded-3xl bg-white/[0.04] border border-pink-500/30 backdrop-blur-lg text-left relative overflow-hidden shadow-inner">
          <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
            <Award className="w-6 h-6 text-pink-400 shrink-0" />
            <div>
              <h3 className="text-base font-bold text-white">Official Certificate of 100% Trust</h3>
              <p className="text-xs text-pink-300">
                Awarded with all respect & care to: <span className="font-semibold font-dancing text-base">Rukhsana 🌸</span>
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-purple-100/90 text-sm sm:text-base leading-relaxed font-light">
            <p>
              From that polite <strong className="text-pink-300 font-medium">&ldquo;Assalam-o-Alaikum&rdquo;</strong> in my TikTok inbox to replying <strong className="text-pink-300 font-medium">&ldquo;Walaikum Assalam&rdquo;</strong>, all the way to discovering the name behind <strong className="text-pink-400 font-semibold font-dancing text-lg">&ldquo;Rukhsana&rdquo;</strong>!
            </p>
            <p>
              Thank you for being genuine, kind-hearted, and trustworthy. True bonds are built on honest conversations, and having 100% mutual trust is the greatest blessing. 🌸✨
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300/80">
            <span>✨ Started: TikTok Inbox Request</span>
            <span className="font-semibold text-pink-300">Trust: 100% Complete 💎</span>
          </div>
        </div>

        {/* Interactive Tip */}
        <div className="text-xs text-pink-300/70 mb-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Tap anywhere on the screen to shower floating hearts!</span>
        </div>

        {/* Bottom CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            id="celebration-replay-btn"
            onClick={(e) => {
              e.stopPropagation();
              sound.playPop();
              onRestart();
            }}
            className="btn-primary px-7 py-3 text-sm sm:text-base font-semibold flex items-center gap-2.5 w-full sm:w-auto justify-center shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Relive The Story</span>
          </button>

          <button
            id="celebration-share-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="btn-secondary px-6 py-3 text-sm font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-green-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Story</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
