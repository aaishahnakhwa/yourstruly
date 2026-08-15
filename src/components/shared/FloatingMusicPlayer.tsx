import React from 'react';
import { Music, Music4 } from 'lucide-react';

interface FloatingMusicPlayerProps {
  isPlaying: boolean;
  isReady: boolean;
  onToggle: () => void;
  hasMusic: boolean;
  themeId: string;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  isPlaying,
  isReady,
  onToggle,
  hasMusic,
  themeId,
}) => {
  if (!hasMusic) return null;

  const isDarkTheme = ['midnight', 'bollywood', 'monsoon'].includes(themeId);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Small informative label */}
      <span
        className={`text-xs px-2.5 py-1 rounded-full shadow-sm select-none border backdrop-blur-md transition-opacity duration-500 font-sans ${
          isPlaying ? 'opacity-0' : 'opacity-80'
        } ${
          isDarkTheme
            ? 'bg-slate-900/80 border-slate-700/50 text-slate-300'
            : 'bg-white/80 border-rose-100 text-rose-800'
        }`}
      >
        {isReady ? 'Tap vinyl for music' : 'Loading melody...'}
      </span>

      {/* Rotating Vinyl/Music Button */}
      <button
        onClick={onToggle}
        disabled={!isReady}
        className={`w-12 h-12 rounded-full flex items-center justify-center relative shadow-lg focus:outline-none transition-all duration-300 ${
          isReady ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-wait opacity-60'
        } ${
          isDarkTheme
            ? 'bg-[#182035] border border-slate-700/50 text-white'
            : 'bg-[#fff5f5] border border-rose-100 text-rose-700'
        }`}
        aria-label="Toggle background music"
      >
        {/* Record grooves */}
        <div
          className={`absolute inset-1 rounded-full border border-black/10 flex items-center justify-center transition-transform ${
            isPlaying ? 'rotate-slow' : ''
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle, transparent 35%, rgba(0,0,0,0.2) 36%, rgba(0,0,0,0.2) 38%, transparent 39%, transparent 55%, rgba(0,0,0,0.2) 56%, rgba(0,0,0,0.2) 58%, transparent 59%)',
          }}
        >
          {/* Label in middle */}
          <div
            className={`w-4 h-4 rounded-full flex items-center justify-center ${
              isDarkTheme ? 'bg-[#e2f1af]' : 'bg-[#ffb7b2]'
            }`}
          />
        </div>

        {/* Floating notes when playing */}
        {isPlaying && (
          <>
            <span className="absolute -top-2 -left-1 text-xs animate-bounce text-rose-500">
              <Music size={10} />
            </span>
            <span
              className="absolute -top-3 right-1 text-xs text-rose-500"
              style={{ animationDelay: '0.4s', animation: 'bounce 1.2s infinite' }}
            >
              <Music4 size={8} />
            </span>
          </>
        )}
      </button>
    </div>
  );
};
