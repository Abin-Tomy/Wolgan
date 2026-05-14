"use client";
import { useEffect } from "react";
import { createLenis, destroyLenis, getLenis } from "@/lib/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";



export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = createLenis();

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}