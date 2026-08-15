import type { ThemeConfig } from '../types';

export const THEME_IDS = {
  CLASSIC: 'classic',
  BOLLYWOOD: 'bollywood',
  MIDNIGHT: 'midnight',
  SOFT: 'soft',
  STORY: 'story',
  CAFE: 'cafe',
  MONSOON: 'monsoon',
} as const;

export const THEME_CONFIGS: Record<string, ThemeConfig> = {
  [THEME_IDS.CLASSIC]: {
    id: THEME_IDS.CLASSIC,
    name: 'Classic Love',
    description: 'Inspired by elegant romantic stationery, cream paper, roses, and sophisticated typography.',
    className: 'theme-classic',
    primaryColor: '#8b1e3f', // Deep Crimson
    secondaryColor: '#fdfbf7', // Cream
    accentColor: '#3a3a3a', // Ink charcoal
    backgroundColor: '#f5f0e6',
    fontHeading: 'font-classic-heading',
    fontBody: 'font-classic-body',
    decorations: {
      envelopeBg: 'bg-[#8b1e3f]',
      envelopePatternBg: 'bg-[#701530]',
      heartColor: '#8b1e3f',
      cardBgClass: 'bg-[#fdfbf7] border-2 border-[#8b1e3f]/20 shadow-xl rounded-sm',
      proposalBgClass: 'bg-[#fcf8f2] border-t border-b border-[#8b1e3f]/20',
      pageTextClass: 'text-[#3a3a3a] leading-relaxed',
      headingTextClass: 'text-[#8b1e3f] font-serif tracking-wide',
      accentTextClass: 'text-[#b89c5e] italic font-serif',
      buttonClass: 'bg-[#8b1e3f] text-[#fdfbf7] hover:bg-[#721531] transition-all font-serif duration-300 shadow-md',
    },
  },
  [THEME_IDS.BOLLYWOOD]: {
    id: THEME_IDS.BOLLYWOOD,
    name: 'Vintage Bollywood',
    description: 'Nostalgic Indian cinema styling with warm tones, old film textures, and dramatic cinematic layouts.',
    className: 'theme-bollywood',
    primaryColor: '#c23b22', // Marigold Red
    secondaryColor: '#f9f3eb', // Distressed Warm Cream
    accentColor: '#dca11d', // Cinema Gold
    backgroundColor: '#1b120f', // Deep Cinema Charcoal
    fontHeading: 'font-bollywood-heading',
    fontBody: 'font-bollywood-body',
    decorations: {
      envelopeBg: 'bg-[#c23b22]',
      envelopePatternBg: 'bg-[#a32e18]',
      heartColor: '#dca11d',
      cardBgClass: 'bg-[#fdf9f2] border-4 border-[#c23b22]/80 shadow-2xl rounded-md relative overflow-hidden',
      proposalBgClass: 'bg-[#1b120f] border-t-4 border-[#dca11d]',
      pageTextClass: 'text-[#2a1b14] leading-relaxed',
      headingTextClass: 'text-[#c23b22] font-extrabold uppercase tracking-wider',
      accentTextClass: 'text-[#dca11d] font-bold tracking-widest',
      buttonClass: 'bg-[#c23b22] text-[#f9f3eb] hover:bg-[#dca11d] hover:text-[#1b120f] transition-all duration-300 border-2 border-[#dca11d]',
    },
  },
  [THEME_IDS.MIDNIGHT]: {
    id: THEME_IDS.MIDNIGHT,
    name: 'Midnight Love',
    description: 'Deep navy skies, glowing stars, moonlit reflections, and dreamy celestial details.',
    className: 'theme-midnight',
    primaryColor: '#1d243d', // Midnight Blue
    secondaryColor: '#0a0d1a', // Starlight black
    accentColor: '#e2f1af', // Starlight glow pale green-yellow
    backgroundColor: '#0a0d1a',
    fontHeading: 'font-midnight-heading',
    fontBody: 'font-midnight-body',
    decorations: {
      envelopeBg: 'bg-[#141b2e]',
      envelopePatternBg: 'bg-[#0f1424]',
      heartColor: '#e2f1af',
      cardBgClass: 'bg-[#141b2e]/90 backdrop-blur-md border border-[#e2f1af]/20 shadow-2xl rounded-2xl text-white',
      proposalBgClass: 'bg-[#0a0d1a]/95 border-t border-[#e2f1af]/10',
      pageTextClass: 'text-slate-300 leading-relaxed',
      headingTextClass: 'text-white tracking-widest font-light',
      accentTextClass: 'text-[#e2f1af] font-mono tracking-wider',
      buttonClass: 'bg-[#e2f1af] text-[#0a0d1a] hover:bg-white hover:scale-105 transition-all duration-300 font-bold tracking-wider rounded-full shadow-lg shadow-[#e2f1af]/20',
    },
  },
  [THEME_IDS.SOFT]: {
    id: THEME_IDS.SOFT,
    name: 'Soft Love',
    description: 'Gentle pastel tones, flowers, cute hand-drawn doodles, and soft friendly vibes.',
    className: 'theme-soft',
    primaryColor: '#ffb7b2', // Pastel Coral/Pink
    secondaryColor: '#fff5f5', // Soft Blush White
    accentColor: '#e2f0cb', // Soft mint green
    backgroundColor: '#fffcf9',
    fontHeading: 'font-soft-heading',
    fontBody: 'font-soft-body',
    decorations: {
      envelopeBg: 'bg-[#ffb7b2]',
      envelopePatternBg: 'bg-[#ffa39c]',
      heartColor: '#ffb7b2',
      cardBgClass: 'bg-[#fff5f5] border-4 border-dashed border-[#ffb7b2] shadow-lg rounded-3xl',
      proposalBgClass: 'bg-[#fffdfd] border-t-4 border-dashed border-[#ffb7b2]',
      pageTextClass: 'text-[#6d5c5b] leading-relaxed',
      headingTextClass: 'text-[#ff9890] font-bold tracking-normal',
      accentTextClass: 'text-[#a2b588] font-bold',
      buttonClass: 'bg-[#ffb7b2] text-white hover:bg-[#ffa39c] rounded-2xl transition-all duration-300 px-6 py-3 shadow-md border-b-4 border-[#e08984]',
    },
  },
  [THEME_IDS.STORY]: {
    id: THEME_IDS.STORY,
    name: 'Our Story',
    description: 'An illustrated storybook theme where each memory unfolds like pages of a classic novel.',
    className: 'theme-story',
    primaryColor: '#5c4033', // Dark Brown Sepia
    secondaryColor: '#f4ecd8', // Aged Paper Parchment
    accentColor: '#964b00', // Warm brown
    backgroundColor: '#efe5cb',
    fontHeading: 'font-story-heading',
    fontBody: 'font-story-body',
    decorations: {
      envelopeBg: 'bg-[#5c4033]',
      envelopePatternBg: 'bg-[#4a3328]',
      heartColor: '#964b00',
      cardBgClass: 'bg-[#f4ecd8] border-8 border-double border-[#5c4033] shadow-inner-book shadow-2xl rounded-sm',
      proposalBgClass: 'bg-[#efe5cb] border-t-2 border-b-2 border-[#5c4033]/40',
      pageTextClass: 'text-[#2e231e] leading-relaxed tracking-normal font-serif',
      headingTextClass: 'text-[#5c4033] font-serif border-b border-[#5c4033]/20 pb-1 italic font-semibold',
      accentTextClass: 'text-[#964b00] italic',
      buttonClass: 'bg-[#5c4033] text-[#f4ecd8] hover:bg-[#4a3328] transition-all duration-300 font-serif border border-[#2e231e]',
    },
  },
  [THEME_IDS.CAFE]: {
    id: THEME_IDS.CAFE,
    name: 'Café Love',
    description: 'Cozy warm colors, sketches of steaming coffee cups, handwritten notes, and comfortable spaces.',
    className: 'theme-cafe',
    primaryColor: '#6f4e37', // Coffee Brown
    secondaryColor: '#fffbf4', // Warm Coffee Cream
    accentColor: '#c0a9bd', // Dusty Mauve
    backgroundColor: '#f5ebe0',
    fontHeading: 'font-cafe-heading',
    fontBody: 'font-cafe-body',
    decorations: {
      envelopeBg: 'bg-[#6f4e37]',
      envelopePatternBg: 'bg-[#593e2b]',
      heartColor: '#c0a9bd',
      cardBgClass: 'bg-[#fffbf4] border border-[#6f4e37]/20 shadow-lg rounded-xl',
      proposalBgClass: 'bg-[#f5ebe0]/80 border-t border-[#6f4e37]/10',
      pageTextClass: 'text-[#4e3629] leading-relaxed',
      headingTextClass: 'text-[#6f4e37] font-semibold tracking-wide',
      accentTextClass: 'text-[#a47b9b] font-medium italic',
      buttonClass: 'bg-[#6f4e37] text-white hover:bg-[#593e2b] transition-all duration-300 font-sans tracking-wide shadow',
    },
  },
  [THEME_IDS.MONSOON]: {
    id: THEME_IDS.MONSOON,
    name: 'Monsoon Love',
    description: 'Rainy backgrounds, floating umbrellas, and misty reflections with a dreamy melancholic tone.',
    className: 'theme-monsoon',
    primaryColor: '#2b5060', // Slate Teal
    secondaryColor: '#eceff1', // Soft rain cloud white
    accentColor: '#607d8b', // Fog blue
    backgroundColor: '#1b2d36', // Misty Dark Teal
    fontHeading: 'font-monsoon-heading',
    fontBody: 'font-monsoon-body',
    decorations: {
      envelopeBg: 'bg-[#2b5060]',
      envelopePatternBg: 'bg-[#223e4b]',
      heartColor: '#eceff1',
      cardBgClass: 'bg-[#eceff1]/95 border border-[#2b5060]/30 shadow-2xl rounded-xl relative overflow-hidden backdrop-blur-sm',
      proposalBgClass: 'bg-[#1b2d36]/90 border-t border-[#eceff1]/20 text-white',
      pageTextClass: 'text-[#2b3a42] leading-relaxed',
      headingTextClass: 'text-[#2b5060] font-semibold font-serif tracking-tight',
      accentTextClass: 'text-[#607d8b] font-serif italic',
      buttonClass: 'bg-[#2b5060] text-white hover:bg-[#1b2d36] transition-all duration-300 border border-[#eceff1]/20 font-serif tracking-wider shadow-lg',
    },
  },
};
