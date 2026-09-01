import React, { useEffect, useState } from 'react';
import { Play, Pause, Music, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(sound.getIsPlaying());

  useEffect(() => {
    const unsubscribe = sound.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = async () => {
    await sound.toggleMusic();
  };

  return (
    <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-50 flex items-center gap-2">
      <button
        id="song-player-btn"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause Mile Ho Tum Humko' : 'Play Mile Ho Tum Humko song'}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 text-xs sm:text-sm font-medium shadow-xl active:scale-95 cursor-pointer backdrop-blur-md ${
          isPlaying
            ? 'bg-gradient-to-r from-pink-600/40 via-purple-600/40 to-pink-500/40 border-pink-400 text-white shadow-pink-500/30'
            : 'bg-black/40 hover:bg-black/60 border-pink-500/30 text-pink-200 hover:text-white'
        }`}
      >
        {/* Play / Pause Icon */}
        <div className="w-6 h-6 rounded-full bg-pink-500/30 flex items-center justify-center shrink-0 border border-pink-400/40">
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-pink-200 fill-pink-200" />
          ) : (
            <Play className="w-3.5 h-3.5 text-pink-300 fill-pink-300 ml-0.5" />
          )}
        </div>

        {/* Title & Status */}
        <div className="flex flex-col text-left leading-tight">
          <span className="flex items-center gap-1 font-semibold text-pink-100">
            <Music className={`w-3.5 h-3.5 text-pink-400 ${isPlaying ? 'animate-bounce' : ''}`} />
            <span>Mile Ho Tum Humko</span>
            {isPlaying && <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />}
          </span>
          <span className="text-[10px] text-pink-300/80 font-light">
            {isPlaying ? 'Now Playing ♪' : 'Click to Play Song'}
          </span>
        </div>

        {/* Animated Equalizer Bars when playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3.5 ml-1">
            <span className="w-1 bg-pink-400 rounded-full animate-[equalize_0.8s_ease-in-out_infinite]" />
            <span className="w-1 bg-purple-400 rounded-full animate-[equalize_0.6s_ease-in-out_infinite_0.2s]" />
            <span className="w-1 bg-pink-300 rounded-full animate-[equalize_0.9s_ease-in-out_infinite_0.4s]" />
          </div>
        )}
      </button>

      <style>{`
        @keyframes equalize {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
      `}</style>
    </div>
  );
};
