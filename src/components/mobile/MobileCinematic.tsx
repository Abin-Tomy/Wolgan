"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

const service1 = "/images/water-treatment.jpeg";
const service2 = "/images/mep-installation.jpeg";
const service3 = "/images/chemical-supply.jpeg";

const SERVICES_DATA = [
  {
    title: "Water Treatment",
    desc: "Water treatment requires in-depth knowledge and skills to understand, rectify & even build specific systems customized to surrounding operations.",
    serviceImg: service1,
    href: "/services/water-treatment",
  },
  {
    title: "Chemical Supplies",
    desc: "The demand for safe and clean water is constantly increasing. Wolgan employs cutting-edge methods of water treatment to produce water suitable for use.",
    serviceImg: service3,
    href: "/services/chemical-supplies",
  },
  {
    title: "MEP Installations & Services",
    desc: "WOLGAN MEP Division is dedicated to providing MEP solutions for the most demanding commercial and industrial facilities.",
    serviceImg: service2,
    href: "/services/mep-installations",
  },
];

export function MobileCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade-up animations on scroll for mobile
      gsap.utils.toArray(".mobile-service-card").forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="mobile-services"
      className="relative w-full py-20 px-6 font-montserrat"
      style={{ backgroundColor: "#0A1F3C", zIndex: 1 }}
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-white tracking-tight mb-4">
          Our <span className="font-medium text-[#66B2E8]">Services</span>
        </h2>
        <div className="w-12 h-1 bg-[#66B2E8] mx-auto opacity-80 rounded-full"></div>
      </div>

      <div className="flex flex-col gap-12">
        {SERVICES_DATA.map((service, idx) => (
          <div key={idx} className="mobile-service-card flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={service.serviceImg}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] to-transparent opacity-80" />
            </div>
            
            <div className="p-8 -mt-16 relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#66B2E8] text-[#0A1F3C] flex items-center justify-center font-bold text-lg mb-4 shadow-lg border-4 border-[#0A1F3C]">
                0{idx + 1}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 leading-tight">
                {service.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {service.desc}
              </p>
              <a 
                href={service.href}
                className="inline-flex items-center gap-2 text-[#66B2E8] text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-block border border-[#66B2E8]/30 rounded-full px-6 py-2 bg-[#66B2E8]/10 text-[#66B2E8] text-xs font-bold tracking-[0.2em]">
          UAE ● QATAR ● INDIA
        </div>
      </div>
    </section>
  );
}
