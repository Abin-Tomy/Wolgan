"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";

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

      <section className="relative w-full min-h-[50vh] flex flex-col justify-end pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <Image src="/images/MEP-installation-service.webp" alt="MEP Installations" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/40" />
        </div>

        <div className="relative z-10 mt-24">
          <span className="mobile-fade-up inline-block text-[#ff7e33] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 px-4 py-2 border border-[#ff7e33]/30 bg-[#ff7e33]/10 rounded-full">
            Infrastructure & Services
          </span>
          <h1 className="mobile-fade-up text-4xl font-light text-white leading-tight tracking-tight mb-6">
            MEP Installations
          </h1>
          <p className="mobile-fade-up text-sm text-white/60 leading-relaxed border-l-2 border-[#ff7e33] pl-4">
            We provide high-precision mechanical, electrical, and plumbing execution for large-scale infrastructure projects across healthcare, hospitality, and commercial sectors.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mobile-fade-up mb-8 text-center">
          <h2 className="text-2xl font-light text-white">Our Services</h2>
        </div>

        <div className="flex flex-col gap-4 mb-16">
          {services.map((service, i) => (
            <div key={i} className="mobile-fade-up p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
              <div className="text-white/30 text-xs font-mono font-bold tracking-widest">0{i + 1}</div>
              <h3 className="text-lg font-light text-white leading-snug">{service}</h3>
            </div>
          ))}
        </div>

        <div className="mobile-fade-up bg-[#ff7e33] p-8 rounded-3xl text-center text-white flex flex-col items-center">
          <h2 className="text-2xl font-light mb-4">Ready to start?</h2>
          <p className="text-sm opacity-90 mb-8 leading-relaxed max-w-[280px]">
            Our team of experts is ready to help you with your MEP installation and maintenance needs.
          </p>
          <Button variant="outline" href="/#contact" className="w-full bg-white text-[#ff7e33] hover:bg-white/90 border-none justify-center h-12 rounded-full font-bold">
            Get in Touch
          </Button>
        </div>
      </section>

      <div className="relative z-20">
        <MobileFooter />
      </div>
    </div>
  );
}
