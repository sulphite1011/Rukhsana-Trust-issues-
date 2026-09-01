import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { MusicToggle } from './components/MusicToggle';
import { IntroStep } from './components/IntroStep';
import { StoryStep } from './components/StoryStep';
import { TrustMeterStep } from './components/TrustMeterStep';
import { QuestionStep } from './components/QuestionStep';
import { CelebrationStep } from './components/CelebrationStep';
import type { StepId } from './types';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');

  const stepsList: StepId[] = ['intro', 'story', 'trust-meter', 'question', 'celebration'];
  const currentIndex = stepsList.indexOf(currentStep);

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden selection:bg-pink-500 selection:text-white font-poppins">
      {/* Background Animated Blobs and Particles */}
      <BackgroundParticles />

      {/* Floating Sound / Music Controller */}
      <MusicToggle />

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        {/* Step Progress Dots (Hidden on final celebration for cinematic focus) */}
        {currentStep !== 'celebration' && (
          <div className="flex items-center justify-center gap-2 mb-4">
            {stepsList.slice(0, 4).map((step, idx) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(255,79,154,0.6)]'
                    : idx < currentIndex
                    ? 'w-2 bg-pink-400/60'
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <IntroStep key="intro" onNext={() => setCurrentStep('story')} />
          )}

          {currentStep === 'story' && (
            <StoryStep
              key="story"
              onNext={() => setCurrentStep('trust-meter')}
              onBack={() => setCurrentStep('intro')}
            />
          )}

          {currentStep === 'trust-meter' && (
            <TrustMeterStep
              key="trust-meter"
              onNext={() => setCurrentStep('question')}
              onBack={() => setCurrentStep('story')}
            />
          )}

          {currentStep === 'question' && (
            <QuestionStep
              key="question"
              onYes={() => setCurrentStep('celebration')}
              onBack={() => setCurrentStep('trust-meter')}
            />
          )}

          {currentStep === 'celebration' && (
            <CelebrationStep
              key="celebration"
              onRestart={() => setCurrentStep('intro')}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-purple-300/40 select-none">
        <span>Rukh... Rukhsana? 💜 • A Story of Trust</span>
      </footer>
    </div>
  );
}
