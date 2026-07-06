"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";

export function MobileAbout() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".mobile-about-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0A1F3C] py-20 px-6 font-montserrat overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F3C] to-[#0f2a4f] opacity-90" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mobile-about-reveal flex items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-white/40" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/70">
            About Wolgan
          </span>
          <div className="w-8 h-[1px] bg-white/40" />
        </div>

        <h2 className="mobile-about-reveal text-4xl font-light text-white leading-tight tracking-tight mb-6 drop-shadow-lg">
          Built For a Better <br />
          <span className="font-medium text-[#66B2E8]">Tomorrow</span>
        </h2>

        <p className="mobile-about-reveal text-sm text-white/80 leading-relaxed max-w-[320px] mb-10">
          Technical Excellence in Water & Infrastructure Engineering. Founded in 2020, Wolgan delivers smart and reliable solutions across commercial, institutional, and industrial sectors.
        </p>

        {/* Core Expertise List */}
        <div className="mobile-about-reveal w-full max-w-[320px] bg-white/5 border border-white/10 rounded-3xl p-6 mb-10 text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 text-white font-bold mb-4">
            Core Expertise
          </p>
          <ul className="flex flex-col gap-4">
            {["Water Treatment", "MEP Installations", "Chemical Supplies"].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-sm font-semibold text-white/90">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#66B2E8]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#66B2E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Stat Card */}
        <div className="mobile-about-reveal w-full max-w-[320px] bg-gradient-to-br from-[#66B2E8]/10 to-[#66B2E8]/5 border border-[#66B2E8]/20 rounded-3xl p-6 mb-10 text-center shadow-lg">
          <span className="block text-4xl font-bold text-[#66B2E8] mb-2">100+</span>
          <span className="block text-xs uppercase tracking-widest text-white/80 font-bold">Projects Across GCC</span>
        </div>

        <div className="mobile-about-reveal flex flex-col w-full max-w-[320px] gap-4">
          <Button
            variant="primaryBrand"
            href="/about"
            className="w-full justify-center py-4 text-sm bg-[#66B2E8] text-[#0A1F3C] hover:bg-white"
          >
            Explore Our Story
          </Button>
          {/* <Button
            variant="primaryBrand"
            href="/api/download?file=Wolgan_Brochure.pdf"
            download="Wolgan_Brochure.pdf"
            className="w-full justify-center py-4 text-sm bg-white/10 text-white hover:bg-white/20 border border-white/10"
          >
            Company Profile
          </Button> */}
        </div>
      </div>
    </section>
  );
}
