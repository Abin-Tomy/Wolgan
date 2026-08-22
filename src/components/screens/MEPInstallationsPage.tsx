"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { RelatedServices } from "@/components/RelatedServices";
import { MobileMEPInstallationsPage } from "./mobile/MobileMEPInstallationsPage";
import { Footer } from "@/components/Footer";
import { gsap } from "@/lib/gsap";
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

function DesktopMEPInstallationsPage({ additionalContent }: { additionalContent?: React.ReactNode }) {
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
                <span className="text-[#66B2E8] text-xs font-bold tracking-widest uppercase">Infrastructure &amp; Services</span>
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

              {/* Intro Card */}
              <div className="reveal-up p-10 lg:p-14 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl mb-24 relative shadow-[0_0_50px_rgba(255,255,255,0.03)]">
                <h3 className="text-2xl lg:text-3xl font-medium text-white mb-2 leading-snug relative z-10 max-w-4xl">
                  MEP &amp; Infrastructure Solutions
                </h3>
                <p className="text-[#66B2E8] text-sm font-medium tracking-wide mb-8 relative z-10">
                  Complete MEP Installation and Infrastructure Services
                </p>
                <div className="space-y-6 text-white/70 leading-relaxed text-lg font-light relative z-10 columns-1 md:columns-2 gap-12">
                  <p>
                    Wolgan delivers comprehensive Mechanical, Electrical, and Plumbing (MEP) installation services for infrastructure, industrial, commercial, and utility projects across Qatar. Backed by a highly experienced management and engineering team with decades of industry expertise, we provide end-to-end solutions from engineering and procurement to installation, testing, commissioning, and maintenance.
                  </p>
                  <p className="md:col-span-2 mt-2 inline-block w-full break-inside-avoid">
                    Over the years, Wolgan has successfully executed major infrastructure and utility projects, earning a reputation for quality workmanship, technical excellence, and on-time project delivery. Our capabilities extend beyond conventional MEP works to include the installation of critical utility and energy infrastructure systems that support large-scale developments and industrial operations.
                  </p>
                </div>
              </div>

              {/* Our Expertise heading */}
              <div className="reveal-up mb-12">
                <h2 className="text-3xl lg:text-4xl font-medium text-white mb-4">Our Expertise</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#66B2E8] to-transparent" />
              </div>

              {/* 3-column category grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
                {serviceCategories.map((cat, ci) => (
                  <div key={ci} className="stagger-card p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-[#66B2E8]/30 transition-all duration-500 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4 leading-snug">{cat.title}</h3>
                    <div className="w-8 h-0.5 bg-[#66B2E8]/50 mb-6" />
                    <ul className="space-y-3">
                      {cat.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-3 text-white/70 text-sm font-light leading-relaxed group">
                          <CheckCircle2 className="w-4 h-4 text-[#66B2E8]/70 shrink-0 mt-0.5 group-hover:text-[#66B2E8] transition-colors" />
                          <span className="group-hover:text-white/90 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="reveal-up relative rounded-[3rem] overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-[#0A1F3C]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#66B2E8]/10 to-transparent" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#66B2E8]/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="relative z-10 p-12 lg:p-20 text-center flex flex-col items-center">
                  <h2 className="text-3xl lg:text-5xl font-light text-white mb-6">Ready to start a project?</h2>
                  <p className="text-xl text-white/70 font-light mb-10 max-w-2xl leading-relaxed">
                    Our team of experts is ready to help you with your MEP installation and maintenance needs. Contact us today for a consultation.
                  </p>
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-4 bg-white text-[#0A1F3C] px-10 py-5 rounded-full font-medium text-lg hover:bg-[#f0f8ff] transition-colors duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {additionalContent}
        
        <Footer waveColor="#0A1F3C" waveStroke="rgba(255,255,255,0.05)" />
      </main>
    </SmoothScroll>
  );
}

export function MEPInstallationsPage() {
  const additionalContent = (
    <section className="relative py-16 px-6 z-10 border-t border-white/10 bg-[#0A1F3C]/50 backdrop-blur-md">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <RelatedServices currentService="mep" />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <ResponsiveWrapper
      desktop={<DesktopMEPInstallationsPage additionalContent={additionalContent} />}
      mobile={<MobileMEPInstallationsPage additionalContent={additionalContent} />}
    />
  );
}
