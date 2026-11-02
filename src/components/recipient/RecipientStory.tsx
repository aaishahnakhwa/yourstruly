import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { ProposalCard, ThemeConfig } from '../../types';
import { ThemeDecorator } from '../themes/ThemeDecorations';
import { ProposalScene } from './ProposalScene';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tilt3D } from '../shared/Tilt3D';

interface RecipientStoryProps {
  card: ProposalCard;
  themeConfig: ThemeConfig;
  isPreview?: boolean;
}

export const RecipientStory: React.FC<RecipientStoryProps> = ({
  card,
  themeConfig,
  isPreview = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const memoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPreview) return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Configuration for the scrolling container
      const scroller = window;

      // 1. Fade-in animations for the intro section elements
      gsap.fromTo(
        '.gsap-intro-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: '.gsap-intro-title',
            scroller: scroller,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.gsap-intro-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          scrollTrigger: {
            trigger: '.gsap-intro-text',
            scroller: scroller,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Cinematic entrance for memory cards
      gsap.utils.toArray('.gsap-memory-card').forEach((cardEl: any, idx: number) => {
        const direction = idx % 2 === 0 ? -50 : 50;
        gsap.fromTo(
          cardEl,
          { opacity: 0, x: direction, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: cardEl,
              scroller: scroller,
              start: 'top 75%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert(); // clean up GSAP animations
    };
  }, [card.memories, isPreview, themeConfig.id]);

  const colors = themeConfig.decorations;
  const isDark = ['midnight', 'bollywood', 'monsoon'].includes(themeConfig.id);

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen relative overflow-x-hidden ${themeConfig.className} ${
        isDark ? 'text-slate-100' : 'text-slate-800'
      }`}
      style={{ backgroundColor: themeConfig.backgroundColor }}
    >
      {/* Background Decorator overlay */}
      <ThemeDecorator themeId={themeConfig.id} />

      {/* Intro Scene (Hero page of card) */}
      <div
        ref={introRef}
        className="min-h-screen w-full flex flex-col justify-between items-center py-20 px-6 relative"
      >
        <div /> {/* Spacer for alignment */}

        <div className="w-full max-w-2xl text-center z-15 select-none">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-block p-3 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Heart size={20} style={{ color: colors.heartColor }} fill={colors.heartColor} />
          </motion.div>

          <h2
            className={`text-xs md:text-sm uppercase tracking-[0.25em] font-sans opacity-70 mb-4 ${colors.accentTextClass}`}
          >
            For {card.recipientName || 'My Beloved'}
          </h2>

          <h1
            className={`gsap-intro-title text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight ${colors.headingTextClass} ${themeConfig.fontHeading}`}
          >
            {card.introTitle || 'To the One Who Holds My Heart'}
          </h1>

          <p
            className={`gsap-intro-text text-base md:text-xl font-light leading-relaxed max-w-xl mx-auto ${colors.pageTextClass} ${themeConfig.fontBody}`}
          >
            {card.introText ||
              'This is a little window into our universe, made of the quiet moments, silly inside jokes, and dreams we hold together.'}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 select-none z-15 opacity-70">
          <span className="text-[10px] tracking-widest font-sans uppercase">Scroll to unfold</span>
          <div className="w-6 h-10 border border-current rounded-full flex justify-center p-1.5 opacity-60">
            <div className="w-1.5 h-1.5 bg-current rounded-full scroll-indicator-wheel" />
          </div>
        </div>
      </div>

      {/* Memories Section */}
      <div
        ref={memoriesRef}
        className="w-full max-w-4xl mx-auto py-24 px-6 flex flex-col gap-24 relative z-10"
      >
        {card.memories && card.memories.length > 0 ? (
          card.memories.map((memory, index) => {
            const hasPhoto = !!memory.photoUrl;

            return (
              <div
                key={memory.id || index}
                className={`gsap-memory-card w-full flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Photo or illustrated card element */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <Tilt3D className="w-full max-w-[340px] flex justify-center">
                    {hasPhoto ? (
                      // Polaroid Photo Frame
                      <motion.div
                        whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? -1 : 1 }}
                        className="bg-white p-4 pb-8 shadow-2xl border border-slate-100 rounded-sm transform max-w-[340px] w-full"
                        style={{
                          transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                        }}
                      >
                        <div className="w-full aspect-square overflow-hidden bg-slate-50 relative border border-slate-100">
                          <img
                            src={memory.photoUrl}
                            alt={memory.title}
                            className="w-full h-full object-cover select-none"
                          />
                        </div>
                        <p className="font-cafe-heading text-slate-800 text-lg md:text-xl text-center mt-4">
                          {memory.title || 'A sweet moment'}
                        </p>
                      </motion.div>
                    ) : (
                      // Scrap Paper/Diary Card Frame
                      <div
                        className={`p-8 w-full max-w-[340px] aspect-[4/3] flex flex-col justify-center items-center text-center paper-texture shadow-xl rounded-sm border-l-4 transform border-[#8b1e3f]/25`}
                        style={{
                          transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)`,
                        }}
                      >
                        <h4
                          className={`text-lg md:text-xl font-bold mb-3 ${colors.headingTextClass} ${themeConfig.fontHeading}`}
                        >
                          {memory.title || 'A Memory'}
                        </h4>
                        <p className={`text-xs md:text-sm italic text-slate-600 ${themeConfig.fontBody}`}>
                          "Remember when..."
                        </p>
                      </div>
                    )}
                  </Tilt3D>
                </div>

                {/* Narrative text card element */}
                <div className="w-full md:w-1/2 px-4 text-center md:text-left">
                  <span className={`text-[10px] uppercase tracking-widest font-semibold ${colors.accentTextClass}`}>
                    Chapter 0{index + 1}
                  </span>
                  <h3
                    className={`text-2xl md:text-3xl font-bold mt-2 mb-4 ${colors.headingTextClass} ${themeConfig.fontHeading}`}
                  >
                    {memory.title}
                  </h3>
                  <p className={`text-sm md:text-base leading-relaxed ${colors.pageTextClass} ${themeConfig.fontBody}`}>
                    {memory.text}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          /* Placeholder memory when card has no memories yet */
          <div className="gsap-memory-card p-12 text-center border-2 border-dashed border-slate-300 rounded-2xl max-w-md mx-auto opacity-60">
            <p className="text-sm font-sans">Memories you configure will scroll into view here...</p>
          </div>
        )}
      </div>

      {/* Culmination Proposal Scene */}
      <ProposalScene card={card} themeConfig={themeConfig} />
    </div>
  );
};
