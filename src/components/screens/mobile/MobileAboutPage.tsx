"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Button } from "@/components/ui/button";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import {
  Globe2, Droplets, Settings, FlaskConical,
  Building2, Hotel, Factory, Ship, Landmark, Hospital, Target, Compass,
  Home, Utensils, Flame, Snowflake
} from "lucide-react";

const deck1 = "/images/about-deck-1.jpg";
const deck2 = "/images/about-deck-2.jpg";
const deck3 = "/images/about-deck-3.jpg";
const waterplant = "/images/about-waterplant.webp";

export function MobileAboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade up for mobile reveals
      gsap.utils.toArray<HTMLElement>(".mobile-anim-up").forEach((el) => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden" ref={containerRef}>
      <MobileHeader />

      {/* 1. HERO */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 bg-[#0A1F3C]">
        <div className="absolute inset-0 z-0">
          <Image src={deck1} alt="Wolgan engineering" fill className="object-cover opacity-35" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F3C]/55 via-[#0A1F3C]/75 to-[#0A1F3C]" />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="mobile-anim-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border border-white/10 bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-white/60">About Wolgan</span>
          </div>

          <h1 className="mobile-anim-up text-5xl font-black leading-[0.9] tracking-tighter text-white uppercase mb-6">
            Pure <br />
            <span className="text-white/30">Performance</span><br />
            Delivered.
          </h1>

          <p className="mobile-anim-up text-sm text-white/50 font-light leading-relaxed max-w-sm">
            An established Contracting Company delivering Water Treatment, MEP, and Chemical Supply across Qatar, UAE & India.
          </p>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="py-16 px-6 relative bg-[#f8f9fa] overflow-hidden">
        {/* Top Curve */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 -translate-y-[1px]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px]">
            <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
          </svg>
        </div>

        <div className="relative z-10 pt-10 flex flex-col gap-10">
          <div className="mobile-anim-up p-8 rounded-3xl bg-white/80 border border-white shadow-xl backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#0A1F3C]/40 mb-4">Who We Are</p>
            <h2 className="text-2xl font-light leading-tight tracking-tight text-[#0A1F3C] mb-6">
              Built on courage, vision, and leadership.
            </h2>
            <div className="space-y-4 text-sm font-light text-[#0A1F3C]/70">
              <p>Founded in 2020, Wolgan delivers smart, reliable solutions in water treatment, MEP, and specialized chemical supply.</p>
              <p>Serving diverse industries, our experienced team provides advanced, cost-effective solutions with environmental responsibility.</p>
            </div>
          </div>

          <div className="mobile-anim-up flex flex-col items-center gap-6">
            <div className="w-full h-[300px] relative rounded-3xl overflow-hidden border border-white/20 shadow-lg">
               <Image src={waterplant} alt="Water Plant" fill className="object-cover" />
               <div className="absolute inset-0 bg-[#0A1F3C]/60" />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                  <span className="text-5xl font-black mb-1">10<span className="text-3xl">+</span></span>
                  <span className="text-[9px] uppercase tracking-widest font-bold mb-6 opacity-80">Years</span>
                  <span className="text-5xl font-black mb-1">100<span className="text-3xl">+</span></span>
                  <span className="text-[9px] uppercase tracking-widest font-bold opacity-80">Projects</span>
               </div>
            </div>
            
            <Button variant="primaryBrand" href="/api/download?file=Wolgan_Brochure.pdf" download="Wolgan_Brochure.pdf" className="w-full h-14 justify-center text-sm shadow-xl rounded-full">
              Company Profile
            </Button>
          </div>

          <div className="flex flex-col gap-6">
             <div className="mobile-anim-up p-8 rounded-3xl bg-white/80 border border-white shadow-xl">
               <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#0A1F3C]/40 mb-3">Our Mission</p>
               <p className="text-sm font-light text-[#0A1F3C]">Providing High Quality Products and Services through our highly qualified workforce and reliable supply chain.</p>
             </div>
             <div className="mobile-anim-up p-8 rounded-3xl bg-white/80 border border-white shadow-xl">
               <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#0A1F3C]/40 mb-3">Our Vision</p>
               <p className="text-sm font-light text-[#0A1F3C]">Aiming to become the most successful diversified Company and preferred Business Partner across the industry.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. EXPERTISE */}
      <section className="py-20 relative bg-[#0A1F3C]">
        {/* Curve */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 -translate-y-[1px]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px]">
            <path fill="#f8f9fa" d="M0,0 L1440,0 L1440,160 C1080,40 360,280 0,160 Z"></path>
          </svg>
        </div>
        
        <div className="relative z-10 px-6 pt-10 text-center">
          <p className="mobile-anim-up text-[10px] uppercase tracking-[0.5em] font-bold text-white/30 mb-3">Our Expertise</p>
          <h2 className="mobile-anim-up text-3xl font-light text-white leading-tight mb-12">
            Three divisions.<br /><span className="text-white/30">One standard.</span>
          </h2>

          <div className="flex flex-col gap-6">
            {[
              { icon: Droplets, title: "Water Treatment", desc: "Advanced filtration, RO polishing, and STP execution.", img: deck2 },
              { icon: Settings, title: "Mechanical", desc: "Full-scale MEP execution, complex HVAC systems.", img: deck3 },
              { icon: FlaskConical, title: "Chemical Supply", desc: "Reliable chains for specialized treatment chemicals.", img: deck1 },
            ].map((s, idx) => (
              <div key={idx} className="mobile-anim-up relative rounded-3xl overflow-hidden p-8 flex flex-col items-center border border-white/10 shadow-2xl text-center">
                <div className="absolute inset-0 bg-[#0A1F3C]">
                  <Image src={s.img} alt={s.title} fill className="object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F3C]/20 to-[#0A1F3C]/95" />
                </div>
                <div className="relative z-10 w-14 h-14 rounded-full border border-white/30 flex items-center justify-center mb-6 bg-white/10">
                  <s.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="relative z-10 text-xl font-light text-white mb-3">{s.title}</h3>
                <p className="relative z-10 text-xs text-white/60 font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section className="py-20 relative bg-[#f8f9fb]">
        {/* Curve */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 -translate-y-[1px]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px]">
            <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
          </svg>
        </div>

        <div className="relative z-10 px-6 pt-10">
          <div className="mobile-anim-up mb-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#0A1F3C]/30 mb-3">Our Process</p>
            <h2 className="text-3xl font-light text-[#0A1F3C]">How we work.</h2>
          </div>

          <div className="flex flex-col gap-5">
            {[
              { num: "01", title: "Design", desc: "Rigorous site surveys and precision-engineered analysis." },
              { num: "02", title: "Build", desc: "Integrated installations to international standards." },
              { num: "03", title: "Operate", desc: "Continuous monitoring ensuring peak performance." },
              { num: "04", title: "Maintain", desc: "End-to-end chemical supply and maintenance contracts." },
            ].map((s, i) => (
              <div key={i} className="mobile-anim-up bg-white rounded-3xl p-6 border border-[#0A1F3C]/5 shadow-lg flex gap-5 items-start">
                <span className="text-3xl font-black text-[#0A1F3C]/10 leading-none">{s.num}</span>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A1F3C] mb-2">{s.title}</h3>
                  <p className="text-xs font-light text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mobile-anim-up mt-12 relative rounded-3xl overflow-hidden h-[300px]">
             <Image src={deck3} alt="Wolgan operations" fill className="object-cover" />
             <div className="absolute inset-0 bg-black/60" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
               <p className="text-white text-xl font-light mb-6">
                 Delivering solutions that work — <span className="text-white/60">for years after.</span>
               </p>
               <div className="flex flex-col w-full gap-3">
                 <Button variant="headerCta" href="/api/download?file=NCR_Brochure.pdf" download="NCR_Brochure.pdf" className="w-full justify-center text-xs h-12">
                   NCR Brochure
                 </Button>
                 <Button variant="headerCta" href="/api/download?file=Rydlyme_Brochure.pdf" download="Rydlyme_Brochure.pdf" className="w-full justify-center text-xs h-12">
                   Rydlyme Brochure
                 </Button>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES */}
      <section className="py-16 bg-[#f8f9fb] px-6">
        <div className="mobile-anim-up text-center mb-10">
           <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#0A1F3C]/35 mb-3">Industries</p>
           <h2 className="text-3xl font-light text-[#0A1F3C]">Across Sectors</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Building2, label: "Commercial", sub: "Offices & retail" },
            { icon: Hotel, label: "Hospitality", sub: "Resorts & hotels" },
            { icon: Factory, label: "Industrial", sub: "Heavy plants" },
            { icon: Home, label: "Residential", sub: "Towers & villas" },
            { icon: Landmark, label: "Municipal", sub: "Civic infra" },
            { icon: Utensils, label: "F&B", sub: "Processing" },
            { icon: Flame, label: "Oil & Gas", sub: "Rigs & refineries" },
            { icon: Snowflake, label: "Cooling", sub: "District plants" }
          ].map((item, i) => (
            <div key={i} className="mobile-anim-up bg-white rounded-3xl p-5 flex flex-col items-center text-center border border-[#0A1F3C]/5 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#0A1F3C]/5 flex items-center justify-center mb-3 text-[#0A1F3C]">
                <item.icon size={18} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold text-[#0A1F3C] mb-1">{item.label}</span>
              <span className="text-[9px] text-slate-400 font-light">{item.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. REGIONAL PRESENCE */}
      <section className="py-24 relative bg-[#0A1F3C] text-center px-6">
         {/* Curve */}
         <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 -translate-y-[1px]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px]">
            <path fill="#f8f9fb" d="M0,0 L1440,0 L1440,160 C1080,40 360,280 0,160 Z"></path>
          </svg>
        </div>

        <div className="relative z-10 pt-10 flex flex-col items-center">
          <div className="mobile-anim-up w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 text-white/80">
            <Globe2 size={24} />
          </div>
          <p className="mobile-anim-up text-[10px] uppercase tracking-[0.5em] font-bold text-white/40 mb-6">Presence</p>
          <h2 className="mobile-anim-up text-3xl font-light text-white mb-6">Qatar | UAE | India</h2>
          <p className="mobile-anim-up text-sm text-white/50 font-light leading-relaxed">
            Operating dynamic engineering hubs across the region to deliver industry-leading systems.
          </p>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-16 bg-[#f8f9fb] px-6">
        <div className="mobile-anim-up bg-[#0A1F3C] rounded-3xl p-8 text-center flex flex-col items-center">
          <h2 className="text-3xl font-light text-white mb-4">Ready to discuss?</h2>
          <p className="text-sm text-white/50 font-light mb-8">Become our preferred business partner across the contracting industry.</p>
          <Button variant="heroServicesCta" href="/#contact" className="w-full justify-center h-14 rounded-full">
            Contact Team
          </Button>
        </div>
      </section>

      <div className="relative z-20 -mt-1">
        <MobileFooter waveColor="#f8f9fb" />
      </div>
    </div>
  );
}
