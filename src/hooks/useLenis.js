import { useEffect, useRef } from 'react';

export const useLenis = (scrollTargetSelector = null) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let retries = 0;

    const init = async () => {
      const { default: Lenis } = await import('lenis');

      const resolveWrapper = () => {
        if (!scrollTargetSelector) return window;
        return document.querySelector(scrollTargetSelector);
      };

      const tryInit = () => {
        if (cancelled) return;
        const wrapper = resolveWrapper();

        if (!wrapper && scrollTargetSelector && retries < 20) {
          retries += 1;
          requestAnimationFrame(tryInit);
          return;
        }

        if (!wrapper && scrollTargetSelector) return; // give up silently

        const content = wrapper && wrapper !== window
          ? wrapper.querySelector('[data-lenis-content]') || wrapper.firstElementChild || wrapper
          : undefined;

        lenisRef.current = new Lenis({
          wrapper: wrapper !== window ? wrapper : undefined,
          content,
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          direction: 'vertical',
          gestureDirection: 'vertical',
          infinite: false,
          touchMultiplier: 1.2,
        });

        function raf(time) {
          if (lenisRef.current) {
            lenisRef.current.raf(time);
            rafRef.current = requestAnimationFrame(raf);
          }
        }
        rafRef.current = requestAnimationFrame(raf);

        // ensure layout measured
        setTimeout(() => {
          if (lenisRef.current) {
            try { lenisRef.current.resize(); } catch {}
          }
        }, 50);
      };

      tryInit();
    };

    init().catch((e) => console.error('Error loading Lenis:', e));

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lenisRef.current) {
        try { lenisRef.current.destroy(); } catch {}
        lenisRef.current = null;
      }
    };
  }, [scrollTargetSelector]);

  return lenisRef.current;
};
