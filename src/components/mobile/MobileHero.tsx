"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Typography } from "@/components/ui/Typography";

const wolganLogo = "/images/Wolgan-logo.png";

export function MobileHero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade up for mobile to save performance
      gsap.from(".mobile-hero-wolgan", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".mobile-hero-tag", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ backgroundColor: "var(--brand-navy)" }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "var(--brand-navy)" }}>
        {/* Cinematic Background Video Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Vertical gradient to ensure text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/40 to-transparent" />

        {/* Logo overlay */}
        <div className="absolute inset-0 flex items-start mt-[20vh] justify-center pointer-events-none px-4">
          <Image
            src={wolganLogo}
            alt="Wolgan Logo"
            width={800}
            height={200}
            className="mobile-hero-wolgan w-full max-w-[400px] h-auto select-none object-contain"
            fetchPriority="high"
            style={{
              filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.6))",
            }}
          />
        </div>

        {/* Text content moved higher up for mobile keyboard/scrolling */}
        <div className="mobile-hero-tag absolute bottom-[12vh] left-0 w-full px-6 flex flex-col items-center text-center">
          <Typography
            variant="tagline"
            as="h1"
            className="text-white text-[10px] sm:text-xs tracking-[0.3em] !opacity-90 max-w-[300px] mx-auto leading-relaxed"
          >
            Delivering smart, reliable, and performance-driven systems
            <span className="block mt-2">across Qatar, UAE, and India.</span>
          </Typography>
          
          <Typography
            variant="h3"
            as="h2"
            className="mt-6 text-white/95 text-xl sm:text-2xl font-medium tracking-wide"
          >
            Pure Performance Delivered
          </Typography>
          
          <div className="mt-8 flex flex-col w-full max-w-[280px] gap-4">
            <Button
              variant="heroServicesCta"
              href="#services"
              className="w-full justify-center py-4 text-sm"
            >
              Our services
            </Button>
            <Button
              variant="heroContactCta"
              href="#contact"
              className="w-full justify-center py-4 text-sm bg-white/10"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
