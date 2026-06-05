"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Settings2, ArrowRight } from "lucide-react";

const services = [
  "Chilled Water System Installation",
  "Primary and Secondary Chilled Water System",
  "Energy Transfer Station and HEX Buildings",
  "Heating Ventilation and Air Conditioning Systems (HVAC)",
  "Plumbing Systems – Potable Water and Drainage",
];

export function MobileMEPInstallationsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".mobile-fade-up").forEach((el: any) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%" }, y: 30, opacity: 0, duration: 0.8, ease: "power2.out" });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-[#0A1F3C]" ref={containerRef}>
      <MobileHeader />

      <section className="relative w-full min-h-[55vh] flex flex-col justify-end pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <Image src="/images/MEP-installation-service.webp" alt="MEP Installations" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/20" />
        </div>

        <div className="relative z-10 mt-24">
          <div className="mobile-fade-up inline-flex items-center gap-2 mb-6 px-4 py-2 border border-[#66B2E8]/30 bg-[#66B2E8]/10 rounded-full backdrop-blur-md">
            <Settings2 className="w-3 h-3 text-[#66B2E8]" />
            <span className="text-[#66B2E8] text-[10px] font-bold tracking-[0.3em] uppercase">
              Infrastructure & Services
            </span>
          </div>
          <h1 className="mobile-fade-up text-4xl font-light text-white leading-tight tracking-tight mb-6">
            MEP <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]">Installations</span>
          </h1>
          <p className="mobile-fade-up text-sm text-white/60 leading-relaxed border-l-2 border-[#66B2E8] pl-4">
            We provide high-precision mechanical, electrical, and plumbing execution for large-scale infrastructure projects across healthcare, hospitality, and commercial sectors.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#66B2E8]/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="mobile-fade-up mb-8 text-center relative z-10">
          <h2 className="text-2xl font-light text-white">Our Services</h2>
          <div className="w-8 h-0.5 bg-[#66B2E8] mx-auto mt-4" />
        </div>

        <div className="flex flex-col gap-4 mb-16 relative z-10">
          {services.map((service, i) => (
            <div key={i} className="mobile-fade-up p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#66B2E8]/10 to-transparent rounded-bl-full" />
              
              <div className="text-[#66B2E8]/50 text-xs font-mono font-bold tracking-widest">0{i + 1}</div>
              <h3 className="text-lg font-light text-white leading-snug">{service}</h3>
            </div>
          ))}
        </div>

        <div className="mobile-fade-up relative rounded-[2.5rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#66B2E8] to-[#2a73ab]" />
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10 p-10 text-center text-white flex flex-col items-center">
            <h2 className="text-2xl font-light mb-4">Ready to start?</h2>
            <p className="text-sm opacity-90 mb-8 leading-relaxed max-w-[280px]">
              Our team of experts is ready to help you with your MEP installation and maintenance needs.
            </p>
            <Button variant="outline" href="/contact" className="w-full bg-white text-[#66B2E8] hover:bg-[#f0f8ff] border-none justify-center h-14 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <MobileFooter waveColor="#0A1F3C" waveStroke="rgba(255,255,255,0.05)" />
      </div>
    </div>
  );
}
