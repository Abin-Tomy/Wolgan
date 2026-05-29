"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";

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

      <section className="relative w-full min-h-[50vh] flex flex-col justify-end pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <Image src="/images/water-treatment-service.jpg" alt="Water Treatment" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/40" />
        </div>

        <div className="relative z-10 mt-24">
          <span className="mobile-fade-up inline-block text-[#66B2E8] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 px-4 py-2 border border-[#66B2E8]/30 bg-[#66B2E8]/10 rounded-full">
            Our Expertise
          </span>
          <h1 className="mobile-fade-up text-4xl font-light text-white leading-tight tracking-tight mb-6">
            Water Treatment Solutions
          </h1>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mobile-fade-up bg-white/5 p-6 rounded-3xl border border-white/10 mb-12 backdrop-blur-sm">
          <h2 className="text-xl font-medium text-white mb-6 leading-snug">
            The Single Source for Complete Water Treatment Solutions & Supply of Chemicals
          </h2>
          <div className="space-y-4 text-white/70 text-sm font-light leading-relaxed">
            <p>
              Water treatment requires in-depth knowledge and skills to understand, rectify & even build specific systems that are customized to its surrounding operations. Any procedure that raises the quality of water to make it more suitable for a certain end user is referred to as water treatment.
            </p>
            <p>
              This concept covers physical procedures that modify the characteristics of water by removing solutes or altering its pH, as well as procedures to remove undesired components like germs and other pollutants. Wolgan is a team of experienced and highly qualified individuals who provide excellent service for various commercial & residential sectors across Qatar.
            </p>
            <p>
              The demand for safe and clean water is constantly increasing, both to meet human needs and to support industrial activities. Current water resources are unlikely to meet the escalating needs due to urbanization and economic growth. Wolgan thus employs cutting-edge methods of water treatment to produce water suitable for use.
            </p>
          </div>
        </div>

        <div className="mobile-fade-up">
          <h2 className="text-2xl font-light text-white mb-8">Our Comprehensive Range</h2>
          <div className="flex flex-col gap-3">
            {solutions.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#66B2E8]" />
                <span className="text-white/90 text-sm font-light leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <MobileFooter />
      </div>
    </div>
  );
}
