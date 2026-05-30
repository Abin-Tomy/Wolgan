"use client";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const sharedPartners = [
  { name: "SUEZ", src: "/images/Partners/SUEZ.png" },
  { name: "RYDLYME", src: "/images/Partners/RYDLYME.png" },
  { name: "IWAKI", src: "/images/Partners/IWAKI.png" },
  { name: "NCR", src: "/images/Partners/NCR.png" },
];

const qatarClients = [
  { name: "Medgulf Construction", src: "/images/Qatar Clients/MEDGULF-BG-RMV.png" },
  { name: "Navayuga", src: "/images/Qatar Clients/2. Navayuga.png" },
  { name: "Trags Engineering", src: "/images/Qatar Clients/TRAGS-BG-RMV.png" },
  { name: "Qatar Aviation Services", src: "/images/Qatar Clients/4. Qatar-Aviation-Services.png" },
  { name: "Al Mirqab", src: "/images/Qatar Clients/5. Al mirqab.png" },
  { name: "Arabian MEP", src: "/images/Qatar Clients/6. Arabian MEP.png" },
  { name: "KSC", src: "/images/Qatar Clients/7. ksc.png" },
  { name: "Balagh", src: "/images/Qatar Clients/8. balagh.png" },
  { name: "Milaha", src: "/images/Qatar Clients/MILAHA-BG-RMV.png" },
];

const uaeClients = [
  { name: "BRF", src: "/images/UAE Clients/BRF-BG-RMV.png" },
  { name: "Transguard", src: "/images/UAE Clients/TRANSGUARD-BG-RMV.png" },
  { name: "Dubai Holding", src: "/images/UAE Clients/HOLDING-BG-RMV.png" },
  { name: "Emaar", src: "/images/UAE Clients/4. Emaar.svg" },
  { name: "Imdaad", src: "/images/UAE Clients/IMDAAD-BG-RMV.png" },
  { name: "Sobha", src: "/images/UAE Clients/SOBHA-BG_RMV.png" },
  { name: "Tabreed", src: "/images/UAE Clients/7. Tabreedpng.png" },
  { name: "Engie", src: "/images/UAE Clients/ENGIE-BG-RMV.png" },
  { name: "Emrill", src: "/images/UAE Clients/EMRILL-BG-RMV.png" },
];

export function ClientsPartners() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".header-reveal", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Section Headings
      gsap.utils.toArray(".section-heading").forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Individual Grid Items
      gsap.utils.toArray(".scroll-item").forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%", // Early trigger for aggressive reveal
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white z-20 py-24 md:py-32"
      style={{
        minHeight: "100vh",
        marginTop: "-100vh",
        fontFamily: "var(--font-montserrat), sans-serif",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center">
        
        {/* Main Header */}
        <div className="header-reveal text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light text-[#0A1F3C] tracking-tight mb-6">
            Our <span className="font-medium text-[#66B2E8]">Network</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            We collaborate with industry leaders and serve top-tier clients across the Middle East to deliver exceptional MEP and Contracting solutions.
          </p>
        </div>

        {/* --- STRATEGIC PARTNERS SECTION --- */}
        <div className="mb-28">
          <div className="section-heading mb-12 flex flex-col items-center justify-center text-center">
             <h3 className="text-3xl font-light text-[#0A1F3C] tracking-tight">
                Strategic <span className="font-medium text-[#66B2E8]">Partners</span>
             </h3>
             <div className="w-16 h-[2px] bg-[#66B2E8] mt-5 opacity-80"></div>
             <p className="mt-4 text-gray-400 text-sm tracking-wide">
               Trusted across our entire regional footprint.
             </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {sharedPartners.map((partner, i) => (
              <div 
                key={`partner-${i}`} 
                className="scroll-item group relative aspect-[4/3] bg-gray-50/70 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-[#66B2E8]/40 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] to-[#eaf4fb] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
                  <img src={partner.src} alt={partner.name} title={partner.name} className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" loading="lazy" decoding="async" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- FEATURED CLIENTS SECTION --- */}
        <div>
          <div className="section-heading mb-16 flex flex-col items-center justify-center text-center">
             <h3 className="text-3xl font-light text-[#0A1F3C] tracking-tight">
                Featured <span className="font-medium text-[#66B2E8]">Clients</span>
             </h3>
             <div className="w-16 h-[2px] bg-[#66B2E8] mt-5 opacity-80"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Qatar Operations */}
            <div className="flex flex-col">
              <div className="section-heading mb-8 flex items-center justify-between border-b border-gray-100 pb-4">
                <h4 className="text-2xl font-light text-[#0A1F3C] tracking-tight">
                  Qatar <span className="font-medium text-[#66B2E8]">Operations</span>
                </h4>
                <span className="text-xs font-bold tracking-widest text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">QA</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {qatarClients.map((client, i) => (
                  <div 
                    key={`qatar-client-${i}`} 
                    className="scroll-item group relative aspect-square bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-[#66B2E8]/40 transition-all duration-300 cursor-pointer p-4"
                  >
                    <div className="absolute inset-0 bg-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <img src={client.src} alt={client.name} title={client.name} className="object-contain max-w-full max-h-full group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" loading="lazy" decoding="async" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UAE Operations */}
            <div className="flex flex-col">
              <div className="section-heading mb-8 flex items-center justify-between border-b border-gray-100 pb-4">
                <h4 className="text-2xl font-light text-[#0A1F3C] tracking-tight">
                  UAE <span className="font-medium text-[#66B2E8]">Operations</span>
                </h4>
                <span className="text-xs font-bold tracking-widest text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">UAE</span>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {uaeClients.map((client, i) => (
                  <div 
                    key={`uae-client-${i}`} 
                    className="scroll-item group relative aspect-square bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-[#66B2E8]/40 transition-all duration-300 cursor-pointer p-4"
                  >
                    <div className="absolute inset-0 bg-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <img src={client.src} alt={client.name} title={client.name} className="object-contain max-w-full max-h-full group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" loading="lazy" decoding="async" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
