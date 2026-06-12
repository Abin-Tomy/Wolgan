"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
const wolganLogo = "/images/Wolgan-logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Typography } from "@/components/ui/Typography";

// Wave SVG path
const waveSvgPath =
  "M251.5 70.5C142.5 70.5 61.3953 140.3 0 170.832V1457.52H1440V0C1409.7 0 1371.43 18.9006 1312.43 69.7866C1253.42 120.673 1177.1 108.532 1145.78 90.9575C1089.27 59.2438 1077.69 48.2224 1064.45 44.3436C947.695 -3.6571 852.378 27.2675 766.246 79.9638C705.648 117.038 626.711 164.289 580.465 172.286C496.744 194.821 462.514 163.926 428.173 142.481C345.664 90.9575 287.126 70.5 251.5 70.5Z";

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter-scroll the video to make it feel 'fixed' only while in the Hero
      gsap.to(".hero-video-container", {
        y: () => window.innerHeight * 0.8, // Adjust speed for a slight parallax + stationary feel
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Wolgan text rises slowly + scales as you scroll
      gsap.to(".hero-wolgan", {
        yPercent: -25,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Initial reveal
      gsap.from(".hero-wolgan", {
        y: 80,
        opacity: 0,
        duration: 1.6,
        ease: "power3.out",
      });
      gsap.from(".hero-tag", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "power2.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "var(--brand-navy)" }}
    >
      {/* Dark scene with organic wave bottom */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--brand-navy)",
        }}
      >
        {/* Cinematic Background Video Container */}
        <div className="hero-video-container absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Organic wave shape at bottom */}
        <svg
          className="absolute inset-x-0 bottom-[24vh] h-[20vh] w-full"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          style={{ transform: "scaleX(-1)" }}
        >
          <path d={waveSvgPath} fill="var(--brand-navy)" />
        </svg>

        <div
          className="absolute inset-x-0 bottom-0 h-[calc(24vh+2px)]"
          style={{ backgroundColor: "var(--brand-navy)" }}
        />

        {/* WOLGAN — Logo image with mix-blend and animation class */}
        <div className="absolute inset-0 flex items-center justify-center -translate-y-24 pointer-events-none">
          <Image
            src={wolganLogo}
            alt="Wolgan Logo"
            width={1600}
            height={400}
            className="hero-wolgan w-[100%] max-w-[1600px] h-auto select-none object-contain"
            fetchPriority="high"
            style={{
              mixBlendMode: "overlay",
              filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
            }}
          />
        </div>

        {/* Subtle tagline */}
        <div className="hero-tag absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center w-max max-w-[90vw]">
          <Typography
            variant="tagline"
            as="h1"
            className="text-white relative text-xs sm:text-sm tracking-[0.4em] sm:tracking-[0.5em] !opacity-85"
          >
            Delivering smart, reliable, and performance-driven systems
            <span className="block mt-2">across the Middle East and India.</span>
          </Typography>
          <Typography
            variant="h3"
            as="h2"
            className="mt-10 text-white/90 relative"
          >
            Pure Performance Delivered
          </Typography>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8 relative">
            <Button
              variant="heroServicesCta"
              href="#services"
            >
              Our services
            </Button>
            <Button
              variant="heroContactCta"
              href="#contact"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 inset-x-0 flex flex-col items-center justify-center gap-2">
        <span className="text-[8px] uppercase tracking-[0.4em] text-white opacity-40 font-medium -mr-[0.4em]">
          scroll
        </span>
        <div 
          className="w-[18px] h-[30px] border-2 border-white rounded-full relative opacity-60"
        >
          <div className="absolute top-1.5 inset-x-0 flex justify-center animate-scroll-wheel">
            <div className="w-1 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
