"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";
import { Waves, CheckCircle2 } from "lucide-react";

const solutions = [
  "Wastewater Treatment (Design, Build, Operate & Maintain)",
  "Grey Water System",
  "RO Polishing Unit",
  "Containerized RO Polishing Unit",
  "Effluent/Sewage Treatment Plant",
  "Ultra-Filtration System",
  "Water Treatment System",
  "Condenser Water System",
  "Chilled Water System",
  "Boiler Water System",
  "Domestic Water System",
  "Water Treatment Equipment",
  "Automatic/Manual Chemical Dosing Controls",
  "Automatic/Manual Side Stream Filtration Units",
  "Cooling Tower Sweeper System",
];

export function MobileWaterTreatmentPage() {
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
          <Image src="/images/water-treatment-service.webp" alt="Water Treatment" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/20" />
        </div>

        <div className="relative z-10 mt-24">
          <div className="mobile-fade-up inline-flex items-center gap-2 mb-6 px-4 py-2 border border-white/30 bg-white/10 rounded-full backdrop-blur-md">
            <Waves className="w-3 h-3 text-white" />
            <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">
              Our Expertise
            </span>
          </div>
          <h1 className="mobile-fade-up text-4xl font-light text-white leading-tight tracking-tight mb-6">
            Water Treatment <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Solutions</span>
          </h1>
        </div>
      </section>

      <section className="px-6 pb-20 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="mobile-fade-up bg-white/5 p-8 rounded-[2rem] border border-white/10 mb-16 backdrop-blur-lg relative overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-[40px]" />
          
          <h2 className="text-xl font-medium text-white mb-6 leading-snug relative z-10">
            The Single Source for Complete Water Treatment Solutions & Supply of Chemicals
          </h2>
          <div className="space-y-4 text-white/70 text-sm font-light leading-relaxed relative z-10">
            <p>
              Water treatment requires in-depth knowledge and skills to understand, rectify & even build specific systems that are customized to its surrounding operations.
            </p>
            <p>
              This concept covers physical procedures that modify the characteristics of water by removing solutes or altering its pH, as well as procedures to remove undesired components like germs and other pollutants.
            </p>
            <p>
              The demand for safe and clean water is constantly increasing. Wolgan employs cutting-edge methods of water treatment to produce water suitable for use.
            </p>
          </div>
        </div>

        <div className="mobile-fade-up mb-8">
          <h2 className="text-2xl font-light text-white mb-4">Our Comprehensive Range</h2>
          <div className="w-12 h-0.5 bg-white" />
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          {solutions.map((item, i) => (
            <div key={i} className="mobile-fade-up flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-white shrink-0 opacity-80" />
              <span className="text-white/90 text-sm font-light leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="relative z-20">
        <MobileFooter waveColor="#0A1F3C" waveStroke="rgba(255,255,255,0.05)" />
      </div>
    </div>
  );
}
