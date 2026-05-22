"use client";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { createLenis, destroyLenis } from "@/lib/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";


export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Wrap setup in a short setTimeout so the proxy and Lenis are only registered
    // after the DOM has fully painted on back-navigation (React may re-run effects
    // before the browser has finished restoring scroll position).
    const setupTimer = setTimeout(() => {
      const lenis = createLenis();

      // Connect ScrollTrigger to Lenis via scrollerProxy
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value as number, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      lenis.on("scroll", ScrollTrigger.update);

      // GSAP ticker gives time in seconds; Lenis.raf() expects milliseconds.
      const raf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();
      ScrollTrigger.normalizeScroll(false);
    }, 50);

    return () => {
      // Clear the setup timer in case component unmounts before it fires
      clearTimeout(setupTimer);

      // Clear the stale scrollerProxy BEFORE destroying Lenis so that new
      // ScrollTrigger instances (after back-navigation) get correct metrics.
      ScrollTrigger.scrollerProxy(document.body, undefined as any);
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.update();

      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}