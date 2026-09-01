import React from 'react';
import { motion } from 'motion/react';
import { MessageCircleHeart, Sparkles, ArrowRight, ArrowLeft, HeartHandshake } from 'lucide-react';
import { sound } from '../utils/audio';

interface StoryStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const StoryStep: React.FC<StoryStepProps> = ({ onNext, onBack }) => {
  const handleNext = () => {
    sound.playPop();
    onNext();
  };

  const handleBack = () => {
    sound.playTing();
    onBack();
  };

  return (
    <motion.div
      id="story-section"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="max-w-2xl mx-auto py-8 px-4"
    >
      <div className="glass-card p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/30 border border-pink-500/30 mb-4 shadow-inner">
            <MessageCircleHeart className="w-7 h-7 text-pink-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How It All Truly Began <span className="text-pink-400">💬</span>
          </h2>
          <p className="text-pink-300/80 text-sm mt-1">From a TikTok inbox message to an unbreakable bond</p>
        </div>

        {/* Narrative Flow */}
        <div className="space-y-4 text-purple-100/90 leading-relaxed text-sm sm:text-base">
          {/* Card 1: The Inbox Salam */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-pink-500/30 transition-all">
            <div className="flex items-start gap-3.5">
              <span className="text-2xl select-none mt-0.5">📩</span>
              <div>
                <h3 className="font-semibold text-pink-300 mb-1 text-base">The First Message</h3>
                <p className="font-normal text-purple-100/90 leading-relaxed">
                  It all started right in my TikTok inbox requests. You sent a simple and polite{' '}
                  <strong className="text-pink-300 font-semibold bg-pink-500/20 px-2 py-0.5 rounded-lg border border-pink-500/30">
                    &ldquo;Assalam-o-Alaikum&rdquo;
                  </strong>
                  , and I warmly replied{' '}
                  <strong className="text-pink-300 font-semibold bg-purple-500/20 px-2 py-0.5 rounded-lg border border-purple-500/30">
                    &ldquo;Walaikum Assalam&rdquo;
                  </strong>
                  . Who would have guessed such a respectful, quiet start would turn into something so meaningful?
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: The Name Guess */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-pink-500/30 transition-all">
            <div className="flex items-start gap-3.5">
              <span className="text-2xl select-none mt-0.5">🎯</span>
              <div>
                <h3 className="font-semibold text-pink-300 mb-1 text-base">You Said &ldquo;Rukh&rdquo;...</h3>
                <p className="font-normal text-purple-100/90 leading-relaxed">
                  When you dropped the short hint <strong className="text-pink-400 font-semibold">&ldquo;Rukh&rdquo;</strong>, I took a leap of faith and instantly guessed{' '}
                  <strong className="text-pink-300 font-semibold font-dancing text-xl">&ldquo;Rukhsana&rdquo;</strong>.
                  Landing the exact right name on the very first try felt like pure magic! ✨
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: The Trust Conversation */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-pink-500/30 transition-all">
            <div className="flex items-start gap-3.5">
              <span className="text-2xl select-none mt-0.5">🤝</span>
              <div>
                <h3 className="font-semibold text-pink-300 mb-1 text-base">The Heart-to-Heart on Trust</h3>
                <p className="font-normal text-purple-100/90 leading-relaxed">
                  Soon after, we had that real conversation about trust. We talked about how rare it is to find someone genuine, and how trust isn&apos;t just random—it is built with honesty, mutual respect, and heartfelt care.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote / Song hint */}
        <div className="mt-6 text-center py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-pink-500/15 border border-pink-500/25 text-xs sm:text-sm text-pink-200 flex items-center justify-center gap-2">
          <HeartHandshake className="w-4 h-4 text-pink-400 shrink-0" />
          <span className="font-medium italic">
            &ldquo;Mile ho tum humko bade naseebon se, churaya hai humne kismat ki lakeeron se...&rdquo;
          </span>
          <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <button
            id="story-back-btn"
            onClick={handleBack}
            className="btn-secondary px-6 py-3 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            id="story-next-btn"
            onClick={handleNext}
            className="btn-primary px-8 py-3.5 text-sm sm:text-base font-semibold flex items-center gap-3 w-full sm:w-auto justify-center shadow-lg"
          >
            <span>Check Trust Meter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
