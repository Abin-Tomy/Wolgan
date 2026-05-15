"use client";
import { useEffect } from "react";
import { createLenis, destroyLenis, getLenis } from "@/lib/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";



export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}