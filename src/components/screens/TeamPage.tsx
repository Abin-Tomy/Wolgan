"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { gsap } from "@/lib/gsap";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Tanaji Dange",
    role: "Chairman / Managing Director",
    quote: "“Our vision is to build sustainable water infrastructure that empowers generations to come. We don't just solve today's problems; we engineer tomorrow's resilience.”",
    bgText: "VISION",
    imagePosition: "left" as const,
    imageSrc: "/images/employee-placeholder.png",
  },
  {
    id: 2,
    name: "Kevin Fernandez",
    role: "Director - Qatar",
    quote: "“Engineering excellence isn't just about the technology we use; it's about the relentless pursuit of perfection in every drop of water we treat.”",
    bgText: "EXPERT",
    imagePosition: "right" as const,
    imageSrc: "/images/employee-placeholder.png",
  },
  {
    id: 3,
    name: "Sampath Acharya",
    role: "Director - UAE",
    quote: "“Strategic insights are the bridge between complex MEP challenges and seamless, scalable solutions for our clients.”",
    bgText: "LEADER",
    imagePosition: "left" as const,
    imageSrc: "/images/Sampath-Acharya.png?v=4",
  },
];

type TeamCardProps = typeof TEAM_MEMBERS[0];

function TeamCard({ id, name, role, quote, bgText, imagePosition, imageSrc }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgTextRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Synchronized, hardware-accelerated timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 95%", // Start earlier to remove perceived delay
        }
      });

      // Quick, snappy slide up for the card
      tl.fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Overlapping slide up for the image (no scale animation to ensure buttery smooth 60fps)
      if (imageRef.current) {
        tl.fromTo(imageRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4" // Start slightly before the card finishes
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className={`relative w-full ${id === 3 ? "mt-48 md:mt-80" : "mt-40 md:mt-64"} mb-10`} style={{ willChange: "transform, opacity" }}>
      {/* Huge Background Text sitting on the white background ABOVE the dark section */}
      <div 
        ref={bgTextRef}
        className={`absolute bottom-full mb-4 md:mb-10 ${
          id === 1 ? "left-4 md:left-8 text-left" : 
          id === 2 ? "right-4 md:right-[5%] text-right" : 
          "left-4 md:left-[5%] text-left"
        } font-bold text-[#0A1F3C]/10 uppercase leading-none select-none z-0 tracking-tighter whitespace-nowrap`}
        style={{ fontSize: `clamp(2rem, ${100 / role.length * 1.55}vw, 12rem)` }}
      >
        {role}
      </div>

      {/* Dark Card - FULL WIDTH Edge-to-Edge */}
      <div className="relative bg-[#0A1F3C] w-full min-h-[300px] flex items-center z-10 shadow-2xl py-12 md:py-16 overflow-visible">
        
        {/* Container for content */}
        <div className="container mx-auto px-6 md:px-12 relative h-full flex flex-col md:flex-row items-center">
          
          {/* Text Content */}
          <div 
            className={`w-full md:w-1/2 flex flex-col justify-center z-20 ${
              imagePosition === "left" ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"
            }`}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-snug italic mb-8">
              {quote}
            </h3>

            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[#E5D5C5]" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-white tracking-wider uppercase">
                  {name}
                </span>
                <span className="text-sm md:text-base text-white/70 font-medium">
                  {role}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Breakout Image - Positioned absolutely relative to the section wrapper */}
      <div 
        className={`absolute bottom-0 z-20 pointer-events-none hidden md:block ${
          imagePosition === "left" ? "left-[5%] lg:left-[10%]" : "right-[5%] lg:right-[10%]"
        }`}
      >
        <img 
          ref={imageRef}
          src={imageSrc} 
          alt="Team Member"
          className="h-[600px] lg:h-[750px] w-auto object-contain object-bottom drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)]"
          style={{ willChange: 'transform, opacity' }}
        />
      </div>

      {/* Mobile Image (Inside Card Flow) */}
      <div className="md:hidden bg-[#0A1F3C] pt-0 pb-12 w-full flex justify-center z-20 relative px-6">
        <img 
          src={imageSrc} 
          alt="Team Member"
          className="h-[400px] w-auto object-contain object-bottom drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { MobileTeamPage } from "./mobile/MobileTeamPage";

function DesktopTeamPage() {
  return (
    <SmoothScroll>
      <main className="bg-[#FDFCFB] min-h-screen overflow-hidden">
        <Header />
        
        {/* --- HERO SECTION --- */}
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0A1F3C]">
          
          {/* Full-bleed background image with gradient overlay blending into wave */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/mep-installation.jpeg"
              alt="Wolgan Team Background"
              fill
              className="object-cover opacity-35"
              priority
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to bottom, rgba(10,31,60,0.55) 0%, rgba(10,31,60,0.85) 60%, #0A1F3C 100%)",
            }} />
          </div>

          <div className="container mx-auto px-6 md:px-14 relative z-10 flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="max-w-4xl">
              <span className="inline-block text-[#E5D5C5] text-sm font-semibold tracking-widest uppercase mb-8 px-5 py-2.5 border border-[#E5D5C5]/20 bg-white/5 rounded-full">
                Leadership & Experts
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-light text-white leading-[1.1] tracking-tight">
                The minds <br/>
                behind <span className="font-semibold italic text-[#E5D5C5]">Wolgan.</span>
              </h1>
            </div>
            <div className="max-w-md pb-4">
              <p className="text-xl text-white/70 leading-relaxed border-l-4 border-white/20 pl-8">
                Meet the visionary leaders and expert engineers dedicated to delivering 
                smart, reliable water treatment and MEP solutions across the region.
              </p>
            </div>
          </div>
        </section>

        {/* Asymmetrical Sweeping Curve Divider connecting from Hero */}
        <div className="relative w-full overflow-hidden leading-none z-0" style={{ transform: "translateY(-1px)" }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[60px] md:h-[160px]">
            <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
          </svg>
        </div>

        {/* Team Cards Section */}
        <section className="pb-40 overflow-hidden">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.id} {...member} />
          ))}
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}

export function TeamPage() {
  return (
    <ResponsiveWrapper
      desktop={<DesktopTeamPage />}
      mobile={<MobileTeamPage />}
    />
  );
}
