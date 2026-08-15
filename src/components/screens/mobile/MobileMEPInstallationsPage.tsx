"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Settings2, ArrowRight, CheckCircle2 } from "lucide-react";

const serviceCategories = [
  {
    title: "District Cooling & Energy Systems",
    items: [
      "Energy Transfer Station (ETS) Installation",
      "Heat Exchanger (HEX) Installation",
      "Chilled Water Network Connections",
      "Pumping Stations",
      "Mechanical Plant Room Installation",
      "District Cooling Infrastructure",
    ],
  },
  {
    title: "Water & Utility Infrastructure",
    items: [
      "Desalination Plant Installation",
      "Water Treatment Plant Installation",
      "Pumping Stations",
      "Utility Network Installation",
      "Process Piping Systems",
    ],
  },
  {
    title: "Plumbing & Infrastructure Services",
    items: [
      "Domestic Water Systems",
      "Drainage & Sewer Networks",
      "Firefighting Systems",
      "Utility Connections",
      "Underground Infrastructure Works",
    ],
  },
];

export function MobileMEPInstallationsPage({ additionalContent }: { additionalContent?: React.ReactNode }) {
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

      <section className="relative w-full min-h-[25vh] flex flex-col justify-end pb-6 px-6">
        <div className="absolute inset-0 z-0">
          <Image src="/images/MEP-installation-service.webp" alt="MEP Installations" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/20" />
        </div>

        <div className="relative z-10 mt-24">
          <div className="mobile-fade-up inline-flex items-center gap-2 mb-6 px-4 py-2 border border-[#66B2E8]/30 bg-[#66B2E8]/10 rounded-full backdrop-blur-md">
            <Settings2 className="w-3 h-3 text-[#66B2E8]" />
            <span className="text-[#66B2E8] text-[10px] font-bold tracking-[0.3em] uppercase">
              Infrastructure &amp; Services
            </span>
          </div>
          <h1 className="mobile-fade-up text-4xl font-light text-white leading-tight tracking-tight mb-6">
            MEP <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]">Installations</span>
          </h1>
        </div>
      </section>

      <section className="px-6 pb-20 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#66B2E8]/5 rounded-full blur-[60px] pointer-events-none" />

        {/* Intro Card */}
        <div className="mobile-fade-up bg-white/5 p-8 rounded-[2rem] border border-white/10 mb-10 backdrop-blur-lg relative overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-[40px]" />
          <h2 className="text-xl font-medium text-white mb-1 leading-snug relative z-10">
            MEP &amp; Infrastructure Solutions
          </h2>
          <p className="text-[#66B2E8] text-xs font-medium tracking-wide mb-5 relative z-10">
            Complete MEP Installation and Infrastructure Services
          </p>
          <div className="space-y-4 text-white/70 text-sm font-light leading-relaxed relative z-10">
            <p>
              Wolgan delivers comprehensive Mechanical, Electrical, and Plumbing (MEP) installation services for infrastructure, industrial, commercial, and utility projects across Qatar. Backed by a highly experienced management and engineering team with decades of industry expertise, we provide end-to-end solutions from engineering and procurement to installation, testing, commissioning, and maintenance.
            </p>
            <p>
              Over the years, Wolgan has successfully executed major infrastructure and utility projects, earning a reputation for quality workmanship, technical excellence, and on-time project delivery. Our capabilities extend beyond conventional MEP works to include the installation of critical utility and energy infrastructure systems that support large-scale developments and industrial operations.
            </p>
          </div>
        </div>

        {/* Our Expertise */}
        <div className="mobile-fade-up mb-8">
          <h2 className="text-2xl font-medium text-white mb-4">Our Expertise</h2>
          <div className="w-12 h-0.5 bg-[#66B2E8]" />
        </div>

        <div className="flex flex-col gap-6 mb-16 relative z-10">
          {serviceCategories.map((cat, ci) => (
            <div key={ci} className="mobile-fade-up p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-base font-semibold text-white mb-3 leading-snug">{cat.title}</h3>
              <div className="w-6 h-0.5 bg-[#66B2E8]/50 mb-4" />
              <ul className="space-y-2.5">
                {cat.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-3 text-white/70 text-sm font-light leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#66B2E8]/70 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mobile-fade-up relative rounded-[2.5rem] overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-[#0A1F3C]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#66B2E8]/10 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#66B2E8]/10 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 p-10 text-center text-white flex flex-col items-center">
            <h2 className="text-2xl font-light mb-4">Ready to start a project?</h2>
            <p className="text-sm opacity-70 mb-8 leading-relaxed max-w-[280px]">
              Our team of experts is ready to help you with your MEP installation and maintenance needs. Contact us today for a consultation.
            </p>
            <Button variant="outline" href="/contact" className="w-full bg-white text-[#0A1F3C] hover:bg-[#f0f8ff] border-none justify-center h-14 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)]">
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
