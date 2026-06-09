"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Typography } from "@/components/ui/Typography";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { MobileMEPInstallationsPage } from "./mobile/MobileMEPInstallationsPage";
import { Footer } from "@/components/Footer";
import { gsap } from "@/lib/gsap";
import { Settings2, ArrowRight } from "lucide-react";

const services = [
  "Chilled Water System Installation",
  "Primary and Secondary Chilled Water System",
  "Energy Transfer Station and HEX Buildings",
  "Heating Ventilation and Air Conditioning Systems (HVAC)",
  "Plumbing Systems – Potable Water and Drainage",
];

function DesktopMEPInstallationsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          { scrollTrigger: { trigger: el, start: "top 80%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      });

      gsap.utils.toArray(".stagger-card").forEach((card: any, i) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0 },
          { scrollTrigger: { trigger: card, start: "top 85%" }, y: 0, opacity: 1, duration: 0.8, delay: (i % 3) * 0.1, ease: "power2.out" }
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
              <Image src="/images/MEP-installation-service.webp" alt="MEP Installations" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3C] via-transparent to-transparent" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#66B2E8]/10 border border-[#66B2E8]/30 mb-8 backdrop-blur-md">
                <Settings2 className="w-4 h-4 text-[#66B2E8]" />
                <span className="text-[#66B2E8] text-xs font-bold tracking-widest uppercase">Infrastructure & Services</span>
              </div>
              <h1 className="reveal-up text-5xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-6">
                MEP <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]">Installations</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="relative pt-10 pb-20 px-6 z-10">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#66B2E8]/10 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
                <div className="lg:col-span-5 reveal-up">
                  <h2 className="text-3xl lg:text-4xl font-medium text-white mb-6">Our Services</h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#66B2E8] to-transparent mb-8" />
                  <p className="text-white/60 text-lg font-light leading-relaxed">
                    We provide high-precision mechanical, electrical, and plumbing execution for large-scale infrastructure projects across healthcare, hospitality, and commercial sectors.
                  </p>
                </div>
                
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {services.map((service, i) => (
                    <div key={i} className="stagger-card group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-[#66B2E8]/50 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between min-h-[200px]">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#66B2E8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />
                      
                      <div className="text-[#66B2E8]/40 text-sm font-mono font-bold tracking-widest mb-6">0{i + 1}</div>
                      <h3 className="text-xl font-light text-white group-hover:text-[#66B2E8] transition-colors duration-300 leading-snug">
                        {service}
                      </h3>
                      <div className="mt-6 flex justify-end overflow-hidden">
                        <ArrowRight className="w-5 h-5 text-[#66B2E8] transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal-up relative rounded-[3rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#66B2E8] to-[#2a73ab]" />
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                
                <div className="relative z-10 p-12 lg:p-20 text-center flex flex-col items-center">
                  <h2 className="text-3xl lg:text-5xl font-light text-white mb-6">Ready to start a project?</h2>
                  <p className="text-xl text-white/90 font-light mb-10 max-w-2xl leading-relaxed">
                    Our team of experts is ready to help you with your MEP installation and maintenance needs. Contact us today for a consultation.
                  </p>
                  <a 
                    href="/contact" 
                    className="group inline-flex items-center gap-4 bg-white text-[#66B2E8] px-10 py-5 rounded-full font-medium text-lg hover:bg-[#f0f8ff] transition-colors duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
        
        <Footer waveColor="#0A1F3C" waveStroke="rgba(255,255,255,0.05)" />
      </main>
    </SmoothScroll>
  );
}

export function MEPInstallationsPage() {
  return (
    <ResponsiveWrapper
      desktop={<DesktopMEPInstallationsPage />}
      mobile={<MobileMEPInstallationsPage />}
    />
  );
}
