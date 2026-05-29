"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";

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

      <section className="relative w-full min-h-[50vh] flex flex-col justify-end pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <Image src="/images/chemical-supplies-services.webp" alt="Chemical Supplies" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/40" />
        </div>

        <div className="relative z-10 mt-24">
          <span className="mobile-fade-up inline-block text-[#66B2E8] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 px-4 py-2 border border-[#66B2E8]/30 bg-[#66B2E8]/10 rounded-full">
            Quality & Supply
          </span>
          <h1 className="mobile-fade-up text-4xl font-light text-white leading-tight tracking-tight mb-6">
            Chemical Supplies
          </h1>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mobile-fade-up bg-white/5 p-6 rounded-3xl border border-white/10 mb-12 backdrop-blur-sm">
          <h2 className="text-xl font-medium text-white mb-6 leading-snug">
            The Single Source for Complete Supply of Chemicals
          </h2>
          <div className="space-y-4 text-white/70 text-sm font-light leading-relaxed">
            <p>
              The demand for safe and clean water is constantly increasing, both to meet human needs and to support industrial activities. Current water resources are unlikely to meet the escalating needs due to urbanization and economic growth. Wolgan thus employs cutting-edge methods of water treatment to produce water suitable for use. 
            </p>
            <p>
              In the course of treating water, suspended particles, viruses, fungi, bacteria, algae, and minerals are all eliminated. Both chemical and physical approaches are used in the procedure where Water treatment chemicals utilized in the process. Wolgan provides Water Treatment Chemicals with Corrosion Inhibitors, Scale Control, Microbiological Growth Control, and antisclant to name a few of the processes.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="mobile-fade-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#66B2E8]/20 flex items-center justify-center border border-[#66B2E8]/30 shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#66B2E8]" />
              </div>
              <h2 className="text-xl font-light text-white leading-snug">Water Treatment Chemicals</h2>
            </div>
            <div className="flex flex-col gap-3">
              {waterTreatmentChemicals.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/90 text-sm font-light">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mobile-fade-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                <div className="w-3 h-3 rounded-full bg-white/40" />
              </div>
              <h2 className="text-xl font-light text-white leading-snug">Commodity Chemicals</h2>
            </div>
            <div className="flex flex-col gap-3">
              {commodityChemicals.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/90 text-sm font-light">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <MobileFooter />
      </div>
    </div>
  );
}
