import React, { useEffect, useState } from 'react';

interface ConfettiEffectProps {
  active: boolean;
  themeId: string;
}

interface Particle {
  id: number;
  x: number; // percentage
  y: number; // percentage offset
  size: number;
  delay: number; // seconds
  duration: number; // seconds
  rotation: number; // degrees
  color: string;
  type: 'heart' | 'petal' | 'star' | 'coffee' | 'drop' | 'circle';
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ active, themeId }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const count = 70;
    const items: Particle[] = [];

    // Setup colors and particles based on the theme
    let colors = ['#ff8a80', '#ff5252', '#ff1744', '#ffb7b2'];
    let types: Particle['type'][] = ['heart', 'circle'];

    if (themeId === 'classic') {
      colors = ['#8b1e3f', '#701530', '#c23b22', '#b89c5e'];
      types = ['petal', 'heart'];
    } else if (themeId === 'bollywood') {
      colors = ['#c23b22', '#dca11d', '#ffe082', '#ff5252'];
      types = ['petal', 'star'];
    } else if (themeId === 'midnight') {
      colors = ['#e2f1af', '#ffe082', '#ffffff', '#90caf9'];
      types = ['star', 'circle'];
    } else if (themeId === 'soft') {
      colors = ['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#ff9890'];
      types = ['heart', 'circle'];
    } else if (themeId === 'story') {
      colors = ['#5c4033', '#964b00', '#efe5cb', '#b89c5e'];
      types = ['petal', 'circle'];
    } else if (themeId === 'cafe') {
      colors = ['#6f4e37', '#c0a9bd', '#a47b9b', '#fffbf4'];
      types = ['coffee', 'heart'];
    } else if (themeId === 'monsoon') {
      colors = ['#2b5060', '#aeebed', '#eceff1', '#607d8b'];
      types = ['drop', 'circle'];
    }

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: Math.random() * 100, // width 0% - 100%
        y: -10 - Math.random() * 20, // start above screen
        size: Math.random() * 16 + 10, // 10px to 26px
        delay: Math.random() * 4, // delay between 0s and 4s
        duration: Math.random() * 3 + 3, // drop speed 3s to 6s
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)]
      });
    }

    setParticles(items);
  }, [active, themeId]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <style>{`
        @keyframes drift {
          0% {
            transform: translateY(-50px) rotate(0deg) translateX(0);
            opacity: 1;
          }
          50% {
            translateX: 15px;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(-15px);
            opacity: 0.3;
          }
        }
        .confetti-particle {
          animation: drift linear infinite;
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute confetti-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.type === 'heart' && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full opacity-80">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {p.type === 'petal' && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full opacity-85">
              <path d="M12 2C6.48 2 2 12 12 22C22 12 17.52 2 12 2Z" />
            </svg>
          )}

          {p.type === 'star' && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full opacity-90 twinkle-star">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}

          {p.type === 'coffee' && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full opacity-80">
              <ellipse cx="12" cy="12" rx="6" ry="10" transform="rotate(45 12 12)" />
              <path d="M9 7C11 11 13 13 15 17" stroke="#3e2723" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}

          {p.type === 'drop' && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full opacity-60">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          )}

          {p.type === 'circle' && (
            <div
              className="w-full h-full rounded-full opacity-70"
              style={{ backgroundColor: p.color }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
