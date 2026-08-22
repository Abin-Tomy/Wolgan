"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Typography } from "@/components/ui/Typography";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { MobileWaterTreatmentPage } from "./mobile/MobileWaterTreatmentPage";
import { Footer } from "@/components/Footer";
import { gsap } from "@/lib/gsap";
import { CheckCircle2, ArrowRight } from "lucide-react";

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

function DesktopWaterTreatmentPage({ additionalContent }: { additionalContent?: React.ReactNode }) {
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
              <Image src="/images/water-treatment-service.jpg" alt="Water Treatment Solutions" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3C] via-transparent to-transparent" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/30 mb-8 backdrop-blur-md">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
                <span className="text-white text-xs font-bold tracking-widest uppercase">Our Expertise</span>
              </div>
              <h1 className="reveal-up text-5xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-6">
                Water Treatment <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]">Solutions</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="relative pt-10 pb-20 px-6 z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#66B2E8]/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              
              <div className="reveal-up p-10 lg:p-14 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl mb-24 relative group shadow-[0_0_50px_rgba(255,255,255,0.03)]">
                
                <h3 className="text-2xl lg:text-3xl font-medium text-white mb-8 leading-snug relative z-10 max-w-4xl">
                  Complete Water &amp; Wastewater Treatment Solutions
                </h3>
                
                <div className="space-y-6 text-white/70 leading-relaxed text-lg font-light relative z-10 columns-1 md:columns-2 gap-12">
                  <p>
                    Wolgan is a leading provider of comprehensive water and wastewater treatment solutions across Qatar and the Middle East. While the company was established six years ago, our true strength lies in the extensive expertise of our management and technical teams, who bring over 20 to 30 years of industry experience in designing, operating, and maintaining advanced water treatment systems.
                  </p>
                  <p>
                    Over the years, Wolgan has successfully built a strong reputation for delivering reliable, efficient, and sustainable solutions. We are approved by major authorities, infrastructure organizations, and leading facilities across Qatar, reflecting our commitment to quality, safety, and regulatory compliance.
                  </p>
                  <p className="md:col-span-2 mt-6 inline-block w-full break-inside-avoid">
                    As a single-source provider, Wolgan offers complete turnkey services covering design, engineering, supply, installation, commissioning, operation, maintenance, and chemical treatment programs. Our solutions are customized to meet the specific requirements of commercial, industrial, residential, hospitality, healthcare, and government sectors.
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

              {/* CTA */}
              <div className="reveal-up relative rounded-[3rem] overflow-hidden border border-white/10 mt-16">
                <div className="absolute inset-0 bg-[#0A1F3C]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#66B2E8]/10 to-transparent" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#66B2E8]/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="relative z-10 p-12 lg:p-20 text-center flex flex-col items-center">
                  <h2 className="text-3xl lg:text-5xl font-light text-white mb-6">Ready to start a project?</h2>
                  <p className="text-xl text-white/70 font-light mb-10 max-w-2xl leading-relaxed">
                    Our team of experts is ready to help you with your water treatment needs. Contact us today for a consultation.
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

export function WaterTreatmentPage() {
  const additionalContent = (
    <section className="relative py-16 px-6 z-10 border-t border-white/10 bg-[#0A1F3C]/50 backdrop-blur-md">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <ServiceFAQ
              title="Water Treatment — Frequently Asked Questions"
              items={[
                {
                  question: "What is reverse osmosis and how does it work?",
                  answer: [
                    "Reverse Osmosis (RO) is a membrane-based water treatment process used to remove dissolved salts, minerals, microorganisms, and other contaminants from water. Feed water is passed through a semi-permeable membrane under pressure, producing purified water while the rejected contaminants are discharged through the concentrate stream.",
                    "Wolgan provides RO system design, supply, installation, commissioning, and maintenance for commercial and industrial applications.",
                  ],
                },
                {
                  question: "How much does a water treatment plant cost?",
                  answer: [
                    "The cost of a water treatment plant depends on the capacity, treatment technology, water quality, equipment specifications, and site requirements. Each project therefore requires a customized technical and commercial evaluation.",
                    "Wolgan provides tailored solutions and quotations based on the client's specific requirements and project conditions. For detailed technical and commercial proposals, please contact — Qatar: info@wolgan.qa or UAE: info@wolgan.ae.",
                  ],
                },
                {
                  question: "What is included in a water treatment Annual Maintenance Contract?",
                  answer: [
                    "A Water Treatment Annual Maintenance Contract (AMC) typically includes scheduled inspections, preventive maintenance, equipment servicing, chemical dosing optimization, water quality monitoring, troubleshooting, and emergency support, depending on the agreed scope.",
                    "Wolgan provides customized AMC and O&M services for RO plants, STPs, filtration systems, cooling water, chilled water, and boiler water treatment systems.",
                  ],
                },
                {
                  question: "What is a sewage treatment plant and how does it work?",
                  answer: [
                    "A Sewage Treatment Plant (STP) treats domestic wastewater by removing solids, organic matter, and harmful microorganisms before discharge or reuse.",
                    "Depending on the project requirements, the treatment process may include screening, biological treatment, clarification or membrane separation, filtration, and disinfection.",
                    "Wolgan provides STP design, supply, installation, commissioning, and O&M services for commercial, residential, hospitality, healthcare, and industrial facilities.",
                  ],
                },
                {
                  question: "What is grey water treatment and can grey water be reused?",
                  answer: [
                    "Greywater is wastewater generated from sources such as showers, wash basins, and laundry, excluding toilet wastewater. After suitable treatment and disinfection, treated greywater can be reused for approved non-potable applications, such as irrigation and toilet flushing, subject to applicable water-quality requirements.",
                    "Wolgan provides greywater treatment and recycling solutions to help clients reduce freshwater consumption and increase water reuse.",
                  ],
                },
              ]}
            />
          </div>
          <div className="lg:col-span-1">
            <RelatedServices currentService="water" />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <ResponsiveWrapper
      desktop={<DesktopWaterTreatmentPage additionalContent={additionalContent} />}
      mobile={<MobileWaterTreatmentPage additionalContent={additionalContent} />}
    />
  );
}
