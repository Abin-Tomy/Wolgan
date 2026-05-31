"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { SmoothScroll } from "@/components/SmoothScroll";
import { gsap } from "@/lib/gsap";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Tanaji Dange",
    role: "Chairman / Managing Director",
    quote: "“Our vision is to build sustainable water infrastructure that empowers generations to come. We don't just solve today's problems; we engineer tomorrow's resilience.”",
    bgText: "VISION",
    imageSrc: "/images/employee-placeholder.png",
  },
  {
    id: 2,
    name: "Kevin Fernandez",
    role: "Director - Qatar",
    quote: "“Engineering excellence isn't just about the technology we use; it's about the relentless pursuit of perfection in every drop of water we treat.”",
    bgText: "EXPERT",
    imageSrc: "/images/employee-placeholder.png",
  },
  {
    id: 3,
    name: "Sampath Acharya",
    role: "Director - UAE",
    quote: "“Strategic insights are the bridge between complex MEP challenges and seamless, scalable solutions for our clients.”",
    bgText: "LEADER",
    imageSrc: "/images/Sampath-Acharya.png?v=4",
  },
];

type TeamCardProps = typeof TEAM_MEMBERS[0];

function MobileTeamCard({ id, name, role, quote, bgText, imageSrc }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
          }
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="relative w-full mb-16 px-6">
      <div className="absolute top-0 left-6 text-[#0A1F3C]/5 font-bold uppercase tracking-tighter text-6xl select-none -translate-y-8 z-0">
        {bgText}
      </div>

      <div className="relative z-10 bg-[#0A1F3C] w-full rounded-[2rem] pt-8 overflow-hidden shadow-2xl border border-white/10">
        
        <div className="px-6 relative z-20 mb-6">
          <h3 className="text-xl font-light text-white leading-snug italic mb-6">
            {quote}
          </h3>

          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-[#66B2E8]" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-wider uppercase">
                {name}
              </span>
              <span className="text-xs text-white/70 font-medium">
                {role}
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full flex justify-center bg-gradient-to-t from-[#051020] to-transparent pt-6">
          <img 
            src={imageSrc} 
            alt={name}
            className="h-[320px] w-auto object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export function MobileTeamPage() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-[#FDFCFB]">
      <MobileHeader />
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end pb-16 px-6 bg-[#0A1F3C]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/mep-installation.jpeg" alt="Wolgan Team Background" fill className="object-cover opacity-35" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F3C]/55 via-[#0A1F3C]/85 to-[#0A1F3C]" />
        </div>

        <div className="relative z-10 mt-24">
          <span className="inline-block text-[#66B2E8] text-[10px] font-semibold tracking-widest uppercase mb-6 px-4 py-2 border border-[#66B2E8]/20 bg-white/5 rounded-full">
            Leadership & Experts
          </span>
          <h1 className="text-4xl font-light text-white leading-tight tracking-tight mb-6">
            The minds <br/>
            behind <span className="font-semibold italic text-[#66B2E8]">Wolgan.</span>
          </h1>
          <p className="text-sm text-white/70 leading-relaxed border-l-2 border-white/20 pl-4">
            Meet the visionary leaders and expert engineers dedicated to delivering 
            smart, reliable water treatment and MEP solutions across the region.
          </p>
        </div>
      </section>

      {/* Curve */}
      <div className="relative w-full overflow-hidden leading-none z-0 -translate-y-[1px]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px]">
          <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
        </svg>
      </div>

      {/* Team Cards */}
      <section className="py-12 relative">
        {TEAM_MEMBERS.map((member) => (
          <MobileTeamCard key={member.id} {...member} />
        ))}
      </section>

      <div className="relative z-20 -mt-1">
        <MobileFooter waveColor="#f8f9fb" />
      </div>
    </div>
  );
}
