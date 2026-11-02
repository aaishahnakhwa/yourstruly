import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar as CalendarIcon, Send, Sparkles } from 'lucide-react';
import type { ProposalCard, ThemeConfig } from '../../types';
import { InteractiveNoButton } from '../shared/InteractiveNoButton';
import { ConfettiEffect } from '../shared/ConfettiEffect';
import { cardStorage } from '../../services/cardStorage';
import { FlowerFrame } from '../themes/FloralDecorations';
import { Tilt3D } from '../shared/Tilt3D';

export const formatDateTime = (dateTimeStr: string) => {
  if (!dateTimeStr) return '';
  try {
    const date = new Date(dateTimeStr);
    if (isNaN(date.getTime())) return dateTimeStr;
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return dateTimeStr;
  }
};

interface ProposalSceneProps {
  card: ProposalCard;
  themeConfig: ThemeConfig;
}

export const ProposalScene: React.FC<ProposalSceneProps> = ({ card, themeConfig }) => {
  const [step, setStep] = useState<'question' | 'calendar' | 'confirmed'>('question');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  const handleAccept = () => {
    setStep('calendar');
  };

  const handleSaveDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate.trim()) return;

    // Save response to localStorage
    const updatedCard = {
      ...card,
      acceptedDate: selectedDate.trim(),
      acceptedNote: selectedNote.trim() || undefined,
    };
    cardStorage.save(updatedCard);
    setStep('confirmed');
  };

  const colors = themeConfig.decorations;
  const isMidnight = themeConfig.id === 'midnight';
  const isDark = ['midnight', 'bollywood', 'monsoon'].includes(themeConfig.id);
  const isAccepted = step === 'calendar' || step === 'confirmed';

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden ${colors.proposalBgClass}`}>
      {/* Background decorations specific to proposal */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/10 pointer-events-none" />

      {/* 2D Blooming Flowers Frame */}
      <FlowerFrame themeId={themeConfig.id} active={isAccepted} />

      {/* Confetti / Petal drop active during calendar and confirmation */}
      <ConfettiEffect active={isAccepted} themeId={themeConfig.id} />

      <div className="w-full max-w-2xl text-center relative z-10 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center"
            >
              {/* Spinning heart/theme symbol above question */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="mb-8 w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
              >
                <Heart
                  size={36}
                  style={{ color: colors.heartColor }}
                  fill={isMidnight ? 'none' : colors.heartColor}
                />
              </motion.div>

              <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 ${colors.headingTextClass} ${themeConfig.fontHeading}`}>
                {card.proposalQuestion || 'Will you go on this beautiful adventure with me?'}
              </h2>

              <p className={`text-sm md:text-base font-light mb-12 opacity-80 ${colors.pageTextClass} ${themeConfig.fontBody}`}>
                Take all the time you need...
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[120px] w-full max-w-md px-4">
                <button
                  onClick={handleAccept}
                  className={`w-full sm:w-auto px-8 py-4 text-base md:text-lg rounded-full font-bold cursor-pointer shadow-lg active:scale-95 transition-all duration-300 ${colors.buttonClass}`}
                >
                  {card.yesText || 'Yes!'}
                </button>

                <InteractiveNoButton
                  text={card.noText || 'No'}
                  className={`w-full sm:w-auto px-8 py-4 text-sm md:text-base rounded-full font-semibold border transition-all duration-300 ${
                    themeConfig.id === 'midnight'
                      ? 'border-slate-700 text-slate-400 bg-slate-900/40 hover:bg-slate-900'
                      : 'border-slate-300 text-slate-500 bg-slate-50 hover:bg-slate-100'
                  }`}
                />
              </div>
            </motion.div>
          )}

          {step === 'calendar' && (
            <Tilt3D maxTilt={6} className="w-full max-w-md">
              <motion.div
                key="calendar"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-left flex flex-col shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="text-rose-400" size={20} />
                  <h3 className={`text-xl md:text-2xl font-bold font-serif ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    Choose Our Date 📅
                  </h3>
                </div>
                
                <p className={`text-xs md:text-sm mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {card.recipientName}, when are you free to be taken out on a special date? Pick a day and share a note.
                </p>

                <form onSubmit={handleSaveDate} className="space-y-4">
                  <div>
                    <label className={`block text-[10px] uppercase tracking-wider font-semibold font-mono mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Select Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      style={{ colorScheme: isDark ? 'dark' : 'light' }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                        isDark 
                          ? 'bg-slate-900/80 border-slate-800 text-white focus:border-rose-500' 
                          : 'bg-white border-slate-200 text-slate-800 focus:border-rose-500 shadow-inner'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[10px] uppercase tracking-wider font-semibold font-mono mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Add a custom note (Optional)
                    </label>
                    <input
                      type="text"
                      value={selectedNote}
                      onChange={(e) => setSelectedNote(e.target.value)}
                      placeholder="E.g., Surprise me! 🍿 / Let's get pasta 🍝"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                        isDark 
                          ? 'bg-slate-900/80 border-slate-800 text-white focus:border-rose-500' 
                          : 'bg-white border-slate-200 text-slate-800 focus:border-rose-500 shadow-inner'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedDate.trim()}
                    className={`w-full py-3 rounded-xl font-bold transition-all active:scale-98 flex items-center justify-center gap-1.5 shadow-lg ${
                      selectedDate.trim() 
                        ? colors.buttonClass + ' cursor-pointer' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50 shadow-none'
                    }`}
                  >
                    <Send size={15} />
                    Lock it in! 🔒
                  </button>
                </form>
              </motion.div>
            </Tilt3D>
          )}

          {step === 'confirmed' && (
            <Tilt3D maxTilt={8}>
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="flex flex-col items-center justify-center text-center"
              >
                {/* Confetti seal */}
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-xl mb-8 relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.8, times: [0, 0.7, 1] }}
                  >
                    <Heart size={48} style={{ color: colors.heartColor }} fill={colors.heartColor} />
                  </motion.div>
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#ffb7b2] animate-spin" style={{ animationDuration: '20s' }} />
                </div>

                <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 tracking-wide ${colors.headingTextClass} ${themeConfig.fontHeading}`}>
                  Yay! Forever & Always ❤️
                </h1>

                <p className={`text-base md:text-lg max-w-lg mb-4 leading-relaxed ${colors.pageTextClass} ${themeConfig.fontBody}`}>
                  My heart is completely full. I cannot wait to write our next chapters together, hand in hand, side by side.
                </p>

                {/* Schedule Confirmation Card */}
                <div className={`mb-8 p-5 rounded-2xl inline-flex flex-col items-center gap-2 max-w-sm w-full border ${
                  isDark 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-black/5 border-black/10'
                }`}>
                  <div className={`flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest font-mono ${
                    isDark ? 'text-rose-300' : 'text-rose-700'
                  }`}>
                    <Sparkles size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
                    It's a date!
                  </div>
                  <h4 className={`font-serif text-lg font-bold ${
                    isDark ? 'text-white' : 'text-slate-850'
                  }`}>
                    📅 Scheduled for {formatDateTime(selectedDate)}
                  </h4>
                  {selectedNote && (
                    <p className={`text-xs italic ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      "{selectedNote}"
                    </p>
                  )}
                </div>

                <span className={`text-xs md:text-sm tracking-widest uppercase opacity-75 px-4 py-2 rounded-full border border-current font-semibold ${colors.accentTextClass}`}>
                  Sent by {card.senderName || 'Your Love'}
                </span>
              </motion.div>
            </Tilt3D>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
