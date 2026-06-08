"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";
import { Droplet, FlaskConical } from "lucide-react";

const waterTreatmentChemicals = [
  "Corrosion Inhibitors",
  "Deposit and Scale Control",
  "Microbiological Growth Control",
  "Flocculent & Coagulant",
  "Birm Media (Iron Removal)",
];

const commodityChemicals = [
  "Caustic Soda Solution 48-50%",
  "Sodium Meta Bi-sulphate",
  "Calcium Hypochlorite 65%",
  "Sodium Hypochlorite 12%",
  "Sulphuric Acid 98%",
  "Soda Ash Light",
];

export function MobileChemicalSuppliesPage() {
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
          <Image src="/images/chemical-supplies-services.webp" alt="Chemical Supplies" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/20" />
        </div>

        <div className="relative z-10 mt-24">
          <div className="mobile-fade-up inline-flex items-center gap-2 mb-6 px-4 py-2 border border-[#66B2E8]/30 bg-[#66B2E8]/10 rounded-full backdrop-blur-md">
            <FlaskConical className="w-3 h-3 text-[#66B2E8]" />
            <span className="text-[#66B2E8] text-[10px] font-bold tracking-[0.3em] uppercase">
              Quality & Supply
            </span>
          </div>
          <h1 className="mobile-fade-up text-4xl font-light text-white leading-tight tracking-tight mb-6">
            Chemical <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-white">Supplies</span>
          </h1>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mobile-fade-up bg-white/5 p-8 rounded-[2rem] border border-white/10 mb-16 backdrop-blur-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#66B2E8]/10 rounded-full blur-[30px]" />
          <h2 className="text-xl font-medium text-white mb-6 leading-snug relative z-10">
            The Single Source for Complete Supply of Chemicals
          </h2>
          <div className="space-y-4 text-white/70 text-sm font-light leading-relaxed relative z-10">
            <p>
              The demand for safe and clean water is constantly increasing, both to meet human needs and to support industrial activities. Current water resources are unlikely to meet the escalating needs due to urbanization and economic growth.
            </p>
            <p>
              In the course of treating water, suspended particles, viruses, fungi, bacteria, algae, and minerals are all eliminated. Wolgan provides Water Treatment Chemicals with Corrosion Inhibitors, Scale Control, and Microbiological Growth Control.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="mobile-fade-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#66B2E8]/20 to-[#66B2E8]/5 flex items-center justify-center border border-[#66B2E8]/30 shrink-0 shadow-[0_0_20px_rgba(102,178,232,0.15)]">
                <Droplet className="w-6 h-6 text-[#66B2E8]" />
              </div>
              <h2 className="text-2xl font-light text-white leading-snug">Water Treatment<br/><span className="font-medium text-[#66B2E8] text-xl">Chemicals</span></h2>
            </div>
            <div className="flex flex-col gap-3">
              {waterTreatmentChemicals.map((item, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 text-white/90 text-sm font-light flex items-center justify-between">
                  {item}
                  <div className="w-1.5 h-1.5 rounded-full bg-[#66B2E8]/50" />
                </div>
              ))}
            </div>
          </div>

          <div className="mobile-fade-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/20 shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <FlaskConical className="w-6 h-6 text-white/80" />
              </div>
              <h2 className="text-2xl font-light text-white leading-snug">Commodity<br/><span className="font-medium text-xl">Chemicals</span></h2>
            </div>
            <div className="flex flex-col gap-3">
              {commodityChemicals.map((item, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 text-white/90 text-sm font-light flex items-center justify-between">
                  {item}
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <MobileFooter waveColor="#0A1F3C" waveStroke="rgba(255,255,255,0.05)" />
      </div>
    </div>
  );
}
