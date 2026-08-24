"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { MobileChemicalSuppliesPage } from "./mobile/MobileChemicalSuppliesPage";
import { Footer } from "@/components/Footer";
import { gsap } from "@/lib/gsap";
import { Droplet, FlaskConical, ArrowRight } from "lucide-react";

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

function DesktopChemicalSuppliesPage({ additionalContent }: { additionalContent?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          { scrollTrigger: { trigger: el, start: "top 80%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      });

      gsap.utils.toArray(".stagger-list").forEach((list: any) => {
        const items = list.querySelectorAll(".stagger-item");
        gsap.fromTo(items, 
          { x: -30, opacity: 0 },
          { scrollTrigger: { trigger: list, start: "top 85%" }, x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
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
              <Image src="/images/chemical-supplies-services.webp" alt="Water treatment chemical supplies by Wolgan" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3C] via-transparent to-transparent" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#66B2E8]/10 border border-[#66B2E8]/30 mb-8 backdrop-blur-md">
                <FlaskConical className="w-4 h-4 text-[#66B2E8]" />
                <span className="text-[#66B2E8] text-xs font-bold tracking-widest uppercase">Quality & Supply</span>
              </div>
              <h1 className="reveal-up text-5xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-6">
                Chemical <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-white">Supplies</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="relative pt-10 pb-20 px-6 z-10">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#66B2E8]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              
              <div className="reveal-up p-10 lg:p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-lg mb-24 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#66B2E8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <h2 className="text-2xl lg:text-3xl font-medium text-white mb-8 leading-snug max-w-3xl">
                  The Single Source for Complete Supply of Chemicals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/70 text-lg font-light leading-relaxed">
                  <p>
                    The demand for safe and clean water is constantly increasing, both to meet human needs and to support industrial activities. Current water resources are unlikely to meet the escalating needs due to urbanization and economic growth. Wolgan thus employs cutting-edge methods of <Link href="/services/water-treatment" className="underline hover:text-[#66B2E8] transition-colors">water treatment</Link> to produce water suitable for use. 
                  </p>
                  <p>
                    In the course of treating water, suspended particles, viruses, fungi, bacteria, algae, and minerals are all eliminated. Both chemical and physical approaches are used in these procedures. Wolgan supplies a range of water treatment chemicals, including corrosion inhibitors, scale control, microbiological growth control, and antiscalants.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="stagger-list">
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#66B2E8]/20 to-[#66B2E8]/5 flex items-center justify-center border border-[#66B2E8]/30 shadow-[0_0_30px_rgba(102,178,232,0.2)]">
                      <Droplet className="w-8 h-8 text-[#66B2E8]" />
                    </div>
                    <h3 className="text-3xl font-light text-white">Water Treatment<br/><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]">Speciality Chemicals</span></h3>
                  </div>
                  <ul aria-label="Water treatment speciality chemicals" className="flex flex-col gap-4">
                    {waterTreatmentChemicals.map((item, i) => (
                      <li key={i} className="stagger-item group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#66B2E8]/50 hover:bg-white/10 transition-all duration-300 flex items-center justify-between">
                        <span className="text-white/90 text-lg font-light">{item}</span>
                        <div className="w-2 h-2 rounded-full bg-[#66B2E8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(102,178,232,0.8)]" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="stagger-list">
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                      <FlaskConical className="w-8 h-8 text-white/80" />
                    </div>
                    <h3 className="text-3xl font-light text-white">Commodity<br/><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]">Chemicals</span></h3>
                  </div>
                  <ul aria-label="Commodity chemicals" className="flex flex-col gap-4">
                    {commodityChemicals.map((item, i) => (
                      <li key={i} className="stagger-item group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 flex items-center justify-between">
                        <span className="text-white/90 text-lg font-light">{item}</span>
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 pb-20 z-10">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="reveal-up relative rounded-[3rem] overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-[#0A1F3C]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#66B2E8]/10 to-transparent" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#66B2E8]/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="relative z-10 p-12 lg:p-20 text-center flex flex-col items-center">
                  <h2 className="text-3xl lg:text-5xl font-light text-white mb-6">Ready to start a project?</h2>
                  <p className="text-xl text-white/70 font-light mb-10 max-w-2xl leading-relaxed">
                    Our team of experts is ready to help you with your chemical supply and treatment programme needs. Contact us today for a consultation.
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-4 bg-white text-[#0A1F3C] px-10 py-5 rounded-full font-medium text-lg hover:bg-[#f0f8ff] transition-colors duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
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

export function ChemicalSuppliesPage() {
  const additionalContent = (
    <section className="relative py-16 px-6 z-10 border-t border-white/10 bg-[#0A1F3C]/50 backdrop-blur-md">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <ServiceFAQ
              title="Chemical Supplies — Frequently Asked Questions"
              items={[
                {
                  question: "What water treatment chemicals does Wolgan supply?",
                  answer:
                    "Wolgan supplies a comprehensive range of water treatment chemicals including corrosion inhibitors, scale control agents (antiscalants), microbiological growth control (biocides), flocculants, coagulants, and pH adjusters. Commodity chemicals supplied include caustic soda solution, sodium hypochlorite 12%, calcium hypochlorite 65%, sulphuric acid 98%, sodium meta bi-sulphate, and soda ash light.",
                },
                {
                  question: "What is antiscalant used for in water treatment?",
                  answer:
                    "Antiscalant is a chemical added to water systems — especially RO plants, cooling towers, and boilers — to prevent the formation of mineral scale on membranes, heat exchangers, and pipework. It works by sequestering calcium, magnesium, and other scale-forming ions. Wolgan supplies and doses antiscalant as part of water treatment chemical programmes.",
                },
                {
                  question: "What causes legionella in water systems and how is it controlled?",
                  answer:
                    "Legionella bacteria thrive in warm stagnant water (20–45°C) in cooling towers, hot water systems, and spa pools. Control methods include maintaining water temperatures outside the growth range, regular disinfection using biocides (chlorine, bromine, or non-oxidising biocides), and periodic hyperchlorination. Wolgan supplies legionella control chemicals and provides water treatment programmes compliant with regional health guidelines.",
                },
                {
                  question: "What is the difference between a corrosion inhibitor and a biocide?",
                  answer:
                    "A corrosion inhibitor is a chemical that forms a protective layer on metal surfaces to prevent oxidation and corrosion in water systems. A biocide is a chemical that kills or controls microorganisms such as bacteria, algae, and fungi. In cooling water and chilled water treatment programmes, both are typically used together to control MIC (microbiologically influenced corrosion), scaling, and fouling.",
                },
                {
                  question: "What is odour control in water and wastewater treatment?",
                  answer:
                    "Odour in water and wastewater systems is typically caused by hydrogen sulphide (H2S) produced by sulphate reducing bacteria (SRB) in anaerobic conditions. Odour control chemicals — such as iron salts, oxidants, or bioaugmentation products — are dosed to neutralise odorous compounds. Wolgan supplies odour control chemicals and provides ongoing dosing programmes for STPs, pump stations, and drainage networks.",
                },
              ]}
            />
          </div>
          <div className="lg:col-span-1">
            <RelatedServices currentService="chemical" />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <ResponsiveWrapper
      desktop={<DesktopChemicalSuppliesPage additionalContent={additionalContent} />}
      mobile={<MobileChemicalSuppliesPage additionalContent={additionalContent} />}
    />
  );
}
