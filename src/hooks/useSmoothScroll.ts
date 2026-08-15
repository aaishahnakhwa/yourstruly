import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useSmoothScroll = (enabled = true) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom ease out quintic
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    let rAFId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rAFId = requestAnimationFrame(raf);
    };

    rAFId = requestAnimationFrame(raf);

    // Synchronize Lenis scrolling with ScrollTrigger if GSAP is loaded
    // This is vital for ScrollTrigger animations to look perfectly fluid
    const checkGsapAndSync = () => {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    // Delay slightly to ensure page assets/GSAP have initialized
    const timer = setTimeout(checkGsapAndSync, 100);

    return () => {
      cancelAnimationFrame(rAFId);
      clearTimeout(timer);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  const scrollTo = (target: string | HTMLElement, options?: any) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: 0,
        immediate: false,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options
      });
    }
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const start = () => {
    lenisRef.current?.start();
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start,
  };
};
