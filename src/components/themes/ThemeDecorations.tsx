import React from 'react';

// Film Grain Overlay for Bollywood
export const FilmGrain: React.FC = () => {
  return <div className="film-grain pointer-events-none absolute inset-0 z-10" />;
};

// Rainy window simulation for Monsoon
export const RainOverlay: React.FC = () => {
  return (
    <div className="rain-container">
      {Array.from({ length: 40 }).map((_, idx) => {
        const left = Math.random() * 100;
        const duration = Math.random() * 1.5 + 0.8;
        const delay = Math.random() * 2;
        const height = Math.random() * 40 + 30;
        return (
          <div
            key={idx}
            className="rain-drop"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `-${delay}s`,
              height: `${height}px`,
            }}
          />
        );
      })}
    </div>
  );
};

// Twinkling stars for Midnight
export const StarryConstellations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Stars */}
      {Array.from({ length: 30 }).map((_, idx) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 4;
        const duration = Math.random() * 2 + 2;
        return (
          <div
            key={idx}
            className="absolute rounded-full bg-white twinkle-star"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              boxShadow: size > 2 ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
            }}
          />
        );
      })}

      {/* Constellation SVGs */}
      <svg className="absolute w-full h-full opacity-10" viewBox="0 0 800 1200" fill="none" stroke="#e2f1af" strokeWidth="1">
        <path d="M100 150 L180 220 L280 200 L320 280 M280 200 L260 100" strokeDasharray="3 3" />
        <circle cx="100" cy="150" r="3" fill="#e2f1af" />
        <circle cx="180" cy="220" r="4" fill="#e2f1af" />
        <circle cx="280" cy="200" r="3" fill="#e2f1af" />
        <circle cx="320" cy="280" r="3" fill="#e2f1af" />
        <circle cx="260" cy="100" r="2" fill="#e2f1af" />

        <path d="M600 800 L680 720 L720 780 L650 870 Z" strokeDasharray="3 3" />
        <circle cx="600" cy="800" r="3" fill="#e2f1af" />
        <circle cx="680" cy="720" r="3" fill="#e2f1af" />
        <circle cx="720" cy="780" r="4" fill="#e2f1af" />
        <circle cx="650" cy="870" r="3" fill="#e2f1af" />
      </svg>
    </div>
  );
};

// Hand-drawn sketch overlays for Classic Love
export const ClassicDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20">
      {/* Top Left Rose Drawing */}
      <svg className="absolute -top-4 -left-4 w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="#8b1e3f" strokeWidth="1">
        <path d="M10 20 C10 10, 25 5, 30 15 C35 5, 50 10, 50 20 C50 35, 25 45, 10 20 Z" />
        <path d="M12 21 C15 15, 22 12, 28 17 C26 22, 18 25, 12 21 Z" />
        <path d="M30 15 C33 22, 38 25, 45 20 C42 16, 36 14, 30 15 Z" />
        <path d="M26 31 C24 38, 15 48, 5 44" />
        <path d="M18 35 C15 38, 12 40, 10 45" />
        {/* Leaf */}
        <path d="M26 31 C32 35, 38 32, 40 26 C34 24, 28 26, 26 31 Z" fill="none" />
      </svg>
      {/* Bottom Right Leaf Drawing */}
      <svg className="absolute -bottom-6 -right-6 w-32 h-32" viewBox="0 0 100 100" fill="none" stroke="#8b1e3f" strokeWidth="1">
        <path d="M90 90 C80 60, 60 50, 40 60 C50 80, 60 90, 90 90 Z" />
        <path d="M90 90 L45 63" />
        <path d="M72 78 C65 72, 60 70, 58 72" />
        <path d="M82 85 C75 80, 70 78, 68 80" />
      </svg>
    </div>
  );
};

// Hand-drawn sketch overlays for Soft Love
export const SoftLoveDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-30">
      {/* Floating Flowers */}
      <svg className="absolute top-10 right-8 w-16 h-16 animate-pulse" viewBox="0 0 100 100" fill="#ffb7b2">
        <circle cx="50" cy="50" r="10" fill="#ffe082" />
        <path d="M50 30 C50 20, 40 20, 40 30 C40 40, 50 40, 50 30 Z" />
        <path d="M50 70 C50 80, 60 80, 60 70 C60 60, 50 60, 50 70 Z" />
        <path d="M70 50 C80 50, 80 40, 70 40 C60 40, 60 50, 70 50 Z" />
        <path d="M30 50 C20 50, 20 60, 30 60 C40 60, 40 50, 30 50 Z" />
        <path d="M36 36 C28 28, 20 36, 28 44 C36 52, 44 44, 36 36 Z" />
        <path d="M64 64 C72 72, 80 64, 72 56 C64 48, 56 56, 64 64 Z" />
      </svg>
      {/* Floating Hearts */}
      <svg className="absolute bottom-12 left-10 w-12 h-12" viewBox="0 0 24 24" fill="#ffdac1" style={{ transform: 'rotate(-15deg)' }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

// Steam waves for Cozy Café Love
export const CafeDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-25">
      {/* Coffee Mug Sketch in corner */}
      <div className="absolute bottom-6 left-6 flex flex-col items-center">
        <div className="steam-container scale-75 -mb-4">
          <div className="steam-line" />
          <div className="steam-line" />
          <div className="steam-line" />
        </div>
        <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="#6f4e37" strokeWidth="2">
          {/* Cup */}
          <path d="M25 45 C25 65, 35 75, 55 75 C75 75, 85 65, 85 45 Z" />
          {/* Handle */}
          <path d="M85 50 C95 50, 95 62, 85 62" />
          {/* Plate */}
          <path d="M15 80 L95 80" />
        </svg>
      </div>
    </div>
  );
};

// Main dispatcher to render custom decorations for the specific theme
interface ThemeDecoratorProps {
  themeId: string;
}

export const ThemeDecorator: React.FC<ThemeDecoratorProps> = ({ themeId }) => {
  switch (themeId) {
    case 'classic':
      return <ClassicDecorations />;
    case 'bollywood':
      return <FilmGrain />;
    case 'midnight':
      return <StarryConstellations />;
    case 'soft':
      return <SoftLoveDecorations />;
    case 'cafe':
      return <CafeDecorations />;
    case 'monsoon':
      return <RainOverlay />;
    case 'story':
      // The Our Story layout uses page styling and margins, no overlay animations needed
      return <div className="book-crease" />;
    default:
      return null;
  }
};
