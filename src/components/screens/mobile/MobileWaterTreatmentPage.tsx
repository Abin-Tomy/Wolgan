"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Waves, CheckCircle2, ArrowRight } from "lucide-react";

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

export function MobileWaterTreatmentPage({ additionalContent }: { additionalContent?: React.ReactNode }) {
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
          <Image src="/images/water-treatment-service.jpg" alt="Water treatment solutions by Wolgan" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
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
            Water Treatment <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]">Solutions</span>
          </h1>
        </div>
      </section>

      <section className="px-6 pb-20 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="mobile-fade-up bg-white/5 p-8 rounded-[2rem] border border-white/10 mb-16 backdrop-blur-lg relative overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-[40px]" />
          
          <h2 className="text-xl font-medium text-white mb-6 leading-snug relative z-10">
            Complete Water &amp; Wastewater Treatment Solutions
          </h2>
          <div className="space-y-4 text-white/70 text-sm font-light leading-relaxed relative z-10">
            <p>
              Wolgan is a leading provider of comprehensive water and wastewater treatment solutions across Qatar and the Middle East. While the company was established six years ago, our true strength lies in the extensive expertise of our management and technical teams, who bring over 20 to 30 years of industry experience in designing, operating, and maintaining advanced water treatment systems.
            </p>
            <p>
              Over the years, Wolgan has successfully built a strong reputation for delivering reliable, efficient, and sustainable solutions. We are approved by major authorities, infrastructure organizations, and leading facilities across Qatar, reflecting our commitment to quality, safety, and regulatory compliance.
            </p>
            <p>
              As a single-source provider, Wolgan offers complete turnkey services covering design, engineering, supply, installation, commissioning, operation, maintenance, and <Link href="/services/chemical-supplies" className="underline text-white/90 hover:text-white transition-colors">chemical treatment programs</Link>. Our solutions are customized to meet the specific requirements of commercial, industrial, residential, hospitality, healthcare, and government sectors.
            </p>
          </div>
        </div>

        <div className="mobile-fade-up mb-8">
          <h2 className="text-2xl font-light text-white mb-4">Water Treatment Systems & Solutions</h2>
          <div className="w-12 h-0.5 bg-white" />
        </div>

        <ul aria-label="List of water treatment systems and solutions" className="flex flex-col gap-3 relative z-10">
          {solutions.map((item, i) => (
            <li key={i} className="mobile-fade-up flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-white shrink-0 opacity-80" />
              <span className="text-white/90 text-sm font-light leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

        {/* CTA */}
        <div className="mobile-fade-up relative rounded-[2.5rem] overflow-hidden border border-white/10 mx-6 mb-10">
          <div className="absolute inset-0 bg-[#0A1F3C]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#66B2E8]/10 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#66B2E8]/10 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 p-10 text-center text-white flex flex-col items-center">
            <h2 className="text-2xl font-light mb-4">Ready to start a project?</h2>
            <p className="text-sm opacity-70 mb-8 leading-relaxed max-w-[280px]">
              Our team of experts is ready to help you with your water treatment needs. Contact us today for a consultation.
            </p>
            <Button variant="outline" href="/contact" className="w-full bg-white text-[#0A1F3C] hover:bg-[#f0f8ff] border-none justify-center h-14 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

      {additionalContent}

      <div className="relative z-20">
        <MobileFooter waveColor="#0A1F3C" waveStroke="rgba(255,255,255,0.05)" />
      </div>
    </div>
  );
}
