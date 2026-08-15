import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HomeProps {
  onCreateClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ onCreateClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the right preview mockup on scroll during the steps section
      ScrollTrigger.create({
        trigger: '.gsap-storyboard-section',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.gsap-mockup-pane',
        pinSpacing: false,
      });

      // Animate the screens on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.gsap-storyboard-section',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        }
      });

      // Step 1: Envelope rotates and floats in
      tl.to('.gsap-mock-envelope', { y: 0, scale: 1, rotate: 5, opacity: 1, duration: 1 })
        // Step 2: Envelope opens, letter slides out
        .to('.gsap-mock-envelope', { rotate: 0, duration: 0.5 })
        .to('.gsap-mock-letter', { y: -120, opacity: 1, duration: 1.5 })
        // Step 3: Photo cards float in
        .to('.gsap-mock-photo', { scale: 1, opacity: 1, rotate: -6, x: -30, duration: 1.5 })
        // Step 4: Stars twinkle and proposal box glows
        .to('.gsap-mock-proposal', { scale: 1.05, opacity: 1, y: 0, duration: 1.5 });

    }, scrollContainerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="w-full bg-[#0a0c10] text-slate-200 font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col justify-between items-center py-20 px-6 overflow-hidden border-b border-slate-900">
        {/* Twinkling star sky background in CSS */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950 to-slate-950 pointer-events-none" />
        
        {/* Simple decorative SVG moon */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-100/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-28 left-1/2 -translate-x-[40%] w-24 h-24 bg-amber-50/15 rounded-full pointer-events-none" />

        <div /> {/* Top spacing */}

        <div className="w-full max-w-4xl text-center z-10 flex flex-col items-center">
          {/* Pulsing core badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-rose-900/30 bg-rose-950/20 text-rose-400 text-xs mb-8"
          >
            <Heart size={12} className="fill-rose-400 animate-pulse" />
            <span className="font-serif italic font-medium tracking-wide">an interactive digital love letter canvas</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-bold tracking-tight leading-none mb-6 max-w-3xl"
          >
            Make them a little world <br className="hidden sm:inline" /> of their own.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg max-w-xl leading-relaxed text-slate-400 font-light mb-12"
          >
            yoursturly is a platform for cinematic 2D proposals. Create an illustrated letter filled with your memories, photos, and a custom soundtrack.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            onClick={onCreateClick}
            className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full text-base md:text-lg font-bold shadow-lg shadow-rose-950/20 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            Create Your Card
            <Sparkles size={16} className="text-rose-200" />
          </motion.button>
        </div>

        {/* Scroll hint */}
        <div className="flex flex-col items-center gap-2 select-none z-10 opacity-40">
          <span className="text-[9px] uppercase tracking-widest font-mono font-bold">Scroll to experience the journey</span>
          <div className="w-1.5 h-6 bg-slate-500 rounded-full animate-bounce" />
        </div>
      </section>

      {/* 2. SCROLL STORYBOARD SECTION (PINNED DEMONSTRATION) */}
      <section className="gsap-storyboard-section relative w-full min-h-[400vh] flex flex-col lg:flex-row bg-[#08090d]">
        
        {/* Left Column: Explanatory steps */}
        <div className="w-full lg:w-1/2 flex flex-col justify-around px-6 md:px-16 lg:py-0 py-20 z-10">
          {/* Step 1 */}
          <div className="min-h-screen flex flex-col justify-center max-w-md">
            <span className="text-xs uppercase font-mono tracking-widest text-rose-500 font-bold mb-3">01. Pick a Visual Theme</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white font-semibold mb-4">Choose their universe</h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
              Select from seven highly distinct illustrated templates. From the cream paper of <span className="text-rose-300">Classic Love</span> to the constellation skies of <span className="text-rose-300">Midnight Love</span>, each has its own custom layouts, typography, and animation assets.
            </p>
          </div>

          {/* Step 2 */}
          <div className="min-h-screen flex flex-col justify-center max-w-md">
            <span className="text-xs uppercase font-mono tracking-widest text-rose-500 font-bold mb-3">02. Pen the Narrative</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white font-semibold mb-4">Unfold your memories</h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
              Add your names, write a personalized letter intro, and add chapters of memories. Optionally upload files to present photos formatted as vintage Polaroid captures floating into place.
            </p>
          </div>

          {/* Step 3 */}
          <div className="min-h-screen flex flex-col justify-center max-w-md">
            <span className="text-xs uppercase font-mono tracking-widest text-rose-500 font-bold mb-3">03. Choose the Soundtrack</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white font-semibold mb-4">Add background music</h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
              Paste a YouTube URL. When the recipient opens the envelope, the app automatically initializes the audio API to play the track softly in the background with a beautiful rotating vinyl control.
            </p>
          </div>

          {/* Step 4 */}
          <div className="min-h-screen flex flex-col justify-center max-w-md">
            <span className="text-xs uppercase font-mono tracking-widest text-rose-500 font-bold mb-3">04. The Culmination</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white font-semibold mb-4">Custom Proposal Scene</h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
              Write your proposal question and customize the buttons. The "No" button will playfully run away on hover or tap, leading the recipient on a funny chase until they happily click "Yes".
            </p>
          </div>
        </div>

        {/* Right Column: Pinned vector mockup screen */}
        <div className="gsap-mockup-pane hidden lg:flex lg:w-1/2 h-screen items-center justify-center sticky top-0 bg-[#06070a]/80 backdrop-blur-sm z-20">
          {/* Mock Screen frame */}
          <div className="relative w-[360px] h-[580px] rounded-[36px] bg-slate-900 border border-slate-700/50 shadow-3xl p-4 overflow-hidden flex flex-col">
            
            {/* Mock Screen canvas */}
            <div className="flex-1 w-full rounded-2xl bg-indigo-950/20 border border-slate-800 relative overflow-hidden flex items-center justify-center p-6 text-center select-none">
              
              {/* Star background decoration */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-12 w-1.5 h-1.5 bg-white rounded-full twinkle-star" />
                <div className="absolute top-36 right-16 w-1 h-1 bg-white rounded-full twinkle-star" style={{ animationDelay: '1.2s' }} />
                <div className="absolute bottom-24 left-24 w-1.5 h-1.5 bg-white rounded-full twinkle-star" style={{ animationDelay: '2.5s' }} />
              </div>

              {/* Step 1 Visual: Sealed Envelope (starts scaled down, slides to center) */}
              <div className="gsap-mock-envelope opacity-0 transform translate-y-[200px] scale-75 absolute w-full max-w-[240px] aspect-[4/3] bg-rose-700 rounded-lg shadow-xl p-4 flex flex-col justify-between text-left border border-rose-600">
                <div className="w-8 h-10 border border-white/20 bg-white/5 rounded flex items-center justify-center self-end">
                  <Heart size={8} className="text-white/30" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center self-center shadow-lg text-rose-700">
                  <Heart size={16} fill="currentColor" />
                </div>
                <div className="h-4 w-16 bg-white/25 rounded" />
              </div>

              {/* Step 2 Visual: Letter emerging */}
              <div className="gsap-mock-letter opacity-0 transform translate-y-[150px] absolute w-[200px] bg-slate-100 p-4 shadow-xl border border-slate-200 rounded text-left flex flex-col gap-2">
                <div className="w-4 h-4 rounded-full bg-rose-200 flex items-center justify-center text-rose-600 self-center">
                  <Heart size={8} fill="currentColor" />
                </div>
                <div className="h-3 w-2/3 bg-slate-300 rounded" />
                <div className="h-2 w-full bg-slate-200 rounded" />
                <div className="h-2 w-5/6 bg-slate-200 rounded" />
                <div className="h-2 w-4/5 bg-slate-200 rounded" />
              </div>

              {/* Step 3 Visual: Floating Polaroid photo */}
              <div className="gsap-mock-photo opacity-0 transform scale-75 absolute w-[140px] bg-white p-2 pb-5 shadow-2xl border border-slate-100 rounded-sm">
                <div className="w-full aspect-square bg-slate-800 rounded-sm flex items-center justify-center text-slate-500">
                  <ImageIcon size={24} />
                </div>
                <div className="h-1.5 w-12 bg-slate-300 rounded mx-auto mt-2" />
              </div>

              {/* Step 4 Visual: Star proposal block */}
              <div className="gsap-mock-proposal opacity-0 transform scale-90 translate-y-[40px] absolute bg-slate-900/90 border border-rose-500/20 shadow-2xl rounded-xl p-5 w-[260px] flex flex-col items-center justify-center">
                <Heart size={20} className="text-rose-500 fill-rose-500 mb-3" />
                <h4 className="text-xs text-white font-serif font-bold mb-4">Will you spend forever with me?</h4>
                <div className="flex gap-2 w-full">
                  <div className="flex-1 py-1.5 bg-rose-600 text-white rounded-full text-[9px] font-bold">Yes</div>
                  <div className="flex-1 py-1.5 border border-slate-700 text-slate-400 rounded-full text-[9px]">No</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA & FOOTER */}
      <section className="py-24 px-6 text-center bg-[#07080b] border-t border-slate-900 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white font-bold mb-4">Start Writing Your Story</h2>
        <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-8">
          Design a personalized visual experience for the one you love. Completely free, no login or sign-ups required.
        </p>
        <button
          onClick={onCreateClick}
          className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-full text-base font-semibold shadow-lg shadow-rose-950/20 active:scale-95 transition-all cursor-pointer"
        >
          Open Creator Workspace
        </button>

        <footer className="mt-20 text-[10px] text-slate-600 flex flex-col items-center gap-2 select-none">
          <div className="flex items-center gap-1">
            <span>yoursturly</span>
            <Heart size={8} className="text-rose-800" fill="currentColor" />
            <span>2026. Made with romantic care.</span>
          </div>
        </footer>
      </section>

    </div>
  );
};
