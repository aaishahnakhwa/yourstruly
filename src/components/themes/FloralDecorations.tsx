import React from 'react';
import { motion } from 'framer-motion';

// 1. Elegant Crimson Rose SVG
export const VectorRose: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Stems & Leaves */}
    <path d="M50 55 C52 70, 48 85, 45 95" stroke="#2e5436" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M48 68 C35 68, 30 58, 25 65 C32 75, 42 70, 47 69" fill="#3a6643" stroke="#2e5436" strokeWidth="1.5" />
    <path d="M50 78 C65 78, 70 70, 75 75 C68 85, 58 82, 51 79" fill="#3a6643" stroke="#2e5436" strokeWidth="1.5" />
    
    {/* Rose Buds - Layered petals */}
    <path d="M50 20 C32 20, 26 38, 42 55 C46 59, 54 59, 58 55 C74 38, 68 20, 50 20 Z" fill="#a82346" />
    <path d="M50 20 C38 22, 34 32, 45 42 C48 45, 52 45, 55 42 C66 32, 62 22, 50 20 Z" fill="#c9325a" />
    <path d="M50 24 C44 26, 42 32, 48 38 C49 39, 51 39, 52 38 C58 32, 56 26, 50 24 Z" fill="#e8587d" />
    
    {/* Outer Petals detail */}
    <path d="M30 40 C22 45, 25 55, 38 52" stroke="#6b1128" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M70 40 C78 45, 75 55, 62 52" stroke="#6b1128" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 2. Pastel Daisy SVG
export const PastelDaisy: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Petals */}
    {Array.from({ length: 8 }).map((_, i) => {
      const rotation = i * 45;
      return (
        <path
          key={i}
          d="M50 50 C40 30, 42 10, 50 10 C58 10, 60 30, 50 50 Z"
          fill="#ffdfdb"
          stroke="#ffa9a3"
          strokeWidth="1.5"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '50px 50px',
          }}
        />
      );
    })}
    {/* Flower Pistil Center */}
    <circle cx="50" cy="50" r="14" fill="#ffd166" stroke="#ffb703" strokeWidth="1.5" />
  </svg>
);

// 3. Dreamy Lavender Sprig SVG
export const LavenderSprig: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 100 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Stem */}
    <path d="M40 110 C41 80, 39 50, 40 20" stroke="#4a5d4b" strokeWidth="2" strokeLinecap="round" />
    
    {/* Lavender Blossoms along stem */}
    <circle cx="40" cy="20" r="6" fill="#b39ddb" opacity="0.9" />
    <circle cx="35" cy="35" r="7" fill="#9575cd" />
    <circle cx="45" cy="35" r="7" fill="#7e57c2" />
    <circle cx="34" cy="55" r="8" fill="#9575cd" />
    <circle cx="46" cy="55" r="8" fill="#7e57c2" />
    <circle cx="36" cy="75" r="7" fill="#b39ddb" />
    <circle cx="44" cy="75" r="7" fill="#9575cd" />
    <circle cx="40" cy="92" r="6" fill="#b39ddb" />
  </svg>
);

// 4. Cozy Café Wildflower SVG
export const CafeBlossom: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 90 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Hand-drawn style lines */}
    <path d="M50 50 L25 15" stroke="#6f4e37" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 50 L75 15" stroke="#6f4e37" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 50 L50 90" stroke="#6f4e37" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Simple retro pods */}
    <circle cx="25" cy="15" r="8" fill="#d0b49f" stroke="#6f4e37" strokeWidth="1.5" />
    <circle cx="75" cy="15" r="8" fill="#d0b49f" stroke="#6f4e37" strokeWidth="1.5" />
    
    <path d="M50 40 C35 40, 32 55, 50 65 C68 55, 65 40, 50 40 Z" fill="#e8ded4" stroke="#6f4e37" strokeWidth="2" />
    <circle cx="50" cy="52" r="4" fill="#6f4e37" />
  </svg>
);

// 5. Monsoon Blue Lily SVG
export const MonsoonLily: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 110 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Base Pad */}
    <ellipse cx="60" cy="85" rx="50" ry="12" fill="#243f4d" stroke="#1c303b" strokeWidth="1.5" />
    <path d="M95 85 L110 82" stroke="#1c303b" strokeWidth="1.5" />

    {/* Floating Lily Petals */}
    <path d="M60 25 C50 45, 25 75, 60 82 C95 75, 70 45, 60 25 Z" fill="#90caf9" opacity="0.85" />
    <path d="M60 38 C53 52, 35 73, 60 78 C85 73, 67 52, 60 38 Z" fill="#bbdefb" />
    <path d="M42 62 C32 65, 30 75, 60 80" stroke="#547285" strokeWidth="1.5" />
    <path d="M78 62 C88 65, 90 75, 60 80" stroke="#547285" strokeWidth="1.5" />
  </svg>
);

// Theme-based helper to render matching flower decoration
export const ThemeFlowers: React.FC<{ themeId: string; position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' }> = ({
  themeId,
  position,
}) => {
  const getPositionClass = () => {
    switch (position) {
      case 'top-left':
        return 'absolute top-0 left-0 -translate-x-8 -translate-y-8';
      case 'top-right':
        return 'absolute top-0 right-0 translate-x-8 -translate-y-8 rotate-90';
      case 'bottom-left':
        return 'absolute bottom-0 left-0 -translate-x-8 translate-y-8 -rotate-90';
      case 'bottom-right':
        return 'absolute bottom-0 right-0 translate-x-8 translate-y-8 rotate-180';
      case 'center':
        return 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      default:
        return '';
    }
  };

  const renderFlower = (size: number) => {
    switch (themeId) {
      case 'classic':
      case 'bollywood':
      case 'story':
        return <VectorRose size={size} />;
      case 'soft':
        return <PastelDaisy size={size} />;
      case 'midnight':
        return <LavenderSprig size={size} />;
      case 'cafe':
        return <CafeBlossom size={size} />;
      case 'monsoon':
        return <MonsoonLily size={size} />;
      default:
        return <VectorRose size={size} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 0.85, scale: 1 }}
      transition={{ duration: 1.2, type: 'spring' }}
      className={getPositionClass()}
    >
      {renderFlower(140)}
    </motion.div>
  );
};

// Flower frame component for proposal card
export const FlowerFrame: React.FC<{ themeId: string; active?: boolean }> = ({ themeId, active = false }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <motion.div
        animate={active ? { scale: [1, 1.05, 1], rotate: [0, 2, 0] } : {}}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="w-full h-full relative"
      >
        <ThemeFlowers themeId={themeId} position="top-left" />
        <ThemeFlowers themeId={themeId} position="top-right" />
        <ThemeFlowers themeId={themeId} position="bottom-left" />
        <ThemeFlowers themeId={themeId} position="bottom-right" />
      </motion.div>
    </div>
  );
};
