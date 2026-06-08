"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Typography } from "@/components/ui/Typography";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { MobileWaterTreatmentPage } from "./mobile/MobileWaterTreatmentPage";
import { Footer } from "@/components/Footer";
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

function DesktopWaterTreatmentPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          { scrollTrigger: { trigger: el, start: "top 80%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      });

      gsap.utils.toArray(".stagger-item").forEach((item: any, i) => {
        gsap.fromTo(item, 
          { x: -20, opacity: 0 },
          { scrollTrigger: { trigger: ".stagger-container", start: "top 75%" }, x: 0, opacity: 1, duration: 0.6, delay: (i % 3) * 0.05, ease: "power2.out" }
        );
      });

      gsap.to(".hero-bg", {
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
        y: "20%", ease: "none"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <main className="bg-[#0A1F3C] min-h-screen text-white overflow-hidden" ref={containerRef}>
        <Header />
        
        <section className="hero-section relative min-h-[20vh] flex items-end pb-10 pt-40 px-6">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="hero-bg absolute inset-0">
              <Image src="/images/water-treatment-service.webp" alt="Water Treatment Solutions" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3C] via-transparent to-transparent" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/30 mb-8 backdrop-blur-md">
                <Waves className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-bold tracking-widest uppercase">Our Expertise</span>
              </div>
              <h1 className="reveal-up text-5xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-6">
                Water Treatment <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Solutions</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="relative pt-10 pb-20 px-6 z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#66B2E8]/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              
              <div className="reveal-up p-10 lg:p-14 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl mb-24 relative overflow-hidden group shadow-[0_0_50px_rgba(255,255,255,0.03)]">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:bg-white/20 transition-colors duration-700" />
                
                <h3 className="text-2xl lg:text-3xl font-medium text-white mb-8 leading-snug relative z-10 max-w-4xl">
                  The Single Source for Complete Water Treatment Solutions & Supply of Chemicals
                </h3>
                
                <div className="space-y-6 text-white/70 leading-relaxed text-lg font-light relative z-10 columns-1 md:columns-2 gap-12">
                  <p>
                    Water treatment requires in-depth knowledge and skills to understand, rectify & even build specific systems that are customized to its surrounding operations. Any procedure that raises the quality of water to make it more suitable for a certain end user is referred to as water treatment.
                  </p>
                  <p>
                    This concept covers physical procedures that modify the characteristics of water by removing solutes or altering its pH, as well as procedures to remove undesired components like germs and other pollutants. Wolgan is a team of experienced and highly qualified individuals who provide excellent service for various commercial & residential sectors across Qatar.
                  </p>
                  <p className="md:col-span-2 mt-6 inline-block w-full break-inside-avoid">
                    The demand for safe and clean water is constantly increasing, both to meet human needs and to support industrial activities. Current water resources are unlikely to meet the escalating needs due to urbanization and economic growth. Wolgan thus employs cutting-edge methods of water treatment to produce water suitable for use.
                  </p>
                </div>
              </div>

              <div className="reveal-up mb-12">
                <h2 className="text-3xl lg:text-4xl font-medium text-white mb-4">Our Comprehensive Range</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-white to-transparent" />
              </div>

              <div className="stagger-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {solutions.map((item, i) => (
                  <div key={i} className="stagger-item group flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                    <CheckCircle2 className="w-6 h-6 text-white shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="text-white/80 group-hover:text-white transition-colors font-light leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
        
        <Footer waveColor="#0A1F3C" waveStroke="rgba(255,255,255,0.05)" />
      </main>
    </SmoothScroll>
  );
}

export function WaterTreatmentPage() {
  return (
    <ResponsiveWrapper
      desktop={<DesktopWaterTreatmentPage />}
      mobile={<MobileWaterTreatmentPage />}
    />
  );
}
