import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { ThemeConfig } from '../../types';
import { ThemeFlowers } from '../themes/FloralDecorations';

interface EnvelopeProps {
  senderName: string;
  recipientName: string;
  themeConfig: ThemeConfig;
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  senderName,
  recipientName,
  themeConfig,
  onOpen,
}) => {
  const isDark = ['midnight', 'bollywood', 'monsoon'].includes(themeConfig.id);

  return (
    <div className={`w-full min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 overflow-hidden relative ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-rose-50 text-slate-800'
    }`}>
      {/* 2D Floral Corner Ornaments */}
      <ThemeFlowers themeId={themeConfig.id} position="top-left" />
      <ThemeFlowers themeId={themeConfig.id} position="top-right" />
      <ThemeFlowers themeId={themeConfig.id} position="bottom-left" />
      <ThemeFlowers themeId={themeConfig.id} position="bottom-right" />
      {/* Cinematic subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className={`text-xs md:text-sm tracking-widest uppercase mb-8 font-sans ${
          isDark ? 'text-slate-400' : 'text-rose-800'
        }`}
      >
        A handwritten world created just for you
      </motion.p>

      {/* Envelope Container */}
      <div className="relative w-full max-w-[400px] aspect-[4/3] flex items-center justify-center">
        {/* Envelope Body */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className={`w-full h-full relative shadow-2xl rounded-lg p-6 flex flex-col justify-between border ${
            isDark ? 'border-slate-800' : 'border-rose-100'
          } ${themeConfig.decorations.envelopeBg}`}
        >
          {/* Inner envelope pattern lining */}
          <div className={`absolute inset-2 rounded border border-white/5 opacity-20 pointer-events-none ${themeConfig.decorations.envelopePatternBg || 'bg-black/20'}`} />

          {/* Stamp / Decorative Wax Seal Placement */}
          <div className="absolute top-4 right-4 w-12 h-16 border border-white/20 rounded flex flex-col items-center justify-center bg-white/5">
            <Heart size={14} className="text-white/40" fill="currentColor" />
            <span className="text-[8px] text-white/40 mt-1 uppercase font-mono">STAMP</span>
          </div>

          {/* Letter Address Header */}
          <div className="mt-8 select-none z-10">
            <p className="text-[10px] tracking-widest text-white/50 uppercase font-sans">For my beloved</p>
            <h2 className={`text-2xl md:text-3xl mt-1 text-white font-medium ${themeConfig.fontHeading}`}>
              {recipientName || 'You'}
            </h2>
          </div>

          {/* Seal and Open CTA */}
          <div className="flex flex-col items-center justify-center mt-6 mb-2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="w-14 h-14 rounded-full flex items-center justify-center bg-white text-rose-700 shadow-lg cursor-pointer transition-colors hover:bg-rose-50"
              style={{ color: themeConfig.decorations.heartColor }}
            >
              <Heart size={24} className="animate-pulse" fill="currentColor" />
            </motion.button>
            <p className="text-xs text-white/80 font-sans tracking-wide mt-2">
              Tap wax seal to open
            </p>
          </div>

          {/* Sender signoff */}
          <div className="text-right select-none z-10">
            <p className="text-[10px] tracking-widest text-white/50 uppercase font-sans">With love,</p>
            <p className={`text-sm text-white/90 ${themeConfig.fontHeading}`}>
              {senderName || 'Your Love'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Minimal Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="text-[10px] font-sans tracking-wide mt-12 text-slate-500"
      >
        Make sure your volume is on 🎵
      </motion.p>
    </div>
  );
};
