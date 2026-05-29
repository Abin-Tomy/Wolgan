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
  { name: "Medgulf Construction", src: "/images/Qatar Clients/1. Medgulf Construction.jpg" },
  { name: "Navayuga", src: "/images/Qatar Clients/2. Navayuga.png" },
  { name: "Trags Engineering", src: "/images/Qatar Clients/3. Trags Engineering.png" },
  { name: "Qatar Aviation Services", src: "/images/Qatar Clients/4. Qatar-Aviation-Services.png" },
  { name: "Al Mirqab", src: "/images/Qatar Clients/5. Al mirqab.png" },
  { name: "Arabian MEP", src: "/images/Qatar Clients/6. Arabian MEP.png" },
];

const uaeClients = [
  { name: "BRF", src: "/images/UAE Clients/1. BRF.jpg" },
  { name: "Transguard", src: "/images/UAE Clients/2. Trasnguard.png" },
  { name: "Dubai Holding", src: "/images/UAE Clients/3. Dubai Holding.png" },
  { name: "Emaar", src: "/images/UAE Clients/4. Emaar.svg" },
  { name: "Imdaad", src: "/images/UAE Clients/5. Imdaad.png" },
  { name: "Sobha", src: "/images/UAE Clients/6. Sobha.png" },
];

export function MobileClientsPartners() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".mobile-scroll-item").forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white z-20 py-16 font-montserrat"
    >
      <div className="px-6 flex flex-col justify-center">
        
        {/* Main Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-[#0A1F3C] tracking-tight mb-4">
            Our <span className="font-medium text-[#66B2E8]">Network</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
            Collaborating with industry leaders across the Middle East.
          </p>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
             <h3 className="text-xl font-light text-[#0A1F3C] tracking-tight">
                Strategic <span className="font-medium text-[#66B2E8]">Partners</span>
             </h3>
             <div className="w-10 h-[2px] bg-[#66B2E8] mt-3 opacity-80"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {sharedPartners.map((partner, i) => (
              <div 
                key={`partner-${i}`} 
                className="mobile-scroll-item relative aspect-square bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 p-4"
              >
                <img src={partner.src} alt={partner.name} className="object-contain max-w-full max-h-full mix-blend-multiply" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Clients */}
        <div>
          <div className="mb-8 flex flex-col items-center justify-center text-center">
             <h3 className="text-xl font-light text-[#0A1F3C] tracking-tight">
                Featured <span className="font-medium text-[#66B2E8]">Clients</span>
             </h3>
             <div className="w-10 h-[2px] bg-[#66B2E8] mt-3 opacity-80"></div>
          </div>

          <div className="flex flex-col gap-10">
            {/* Qatar */}
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
                <h4 className="text-lg font-light text-[#0A1F3C]">
                  Qatar <span className="font-medium text-[#66B2E8]">Clients</span>
                </h4>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-full">QA</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {qatarClients.map((client, i) => (
                  <div key={`qatar-${i}`} className="mobile-scroll-item aspect-square bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm p-3">
                    <img src={client.src} alt={client.name} className="object-contain max-w-full max-h-full mix-blend-multiply" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* UAE */}
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
                <h4 className="text-lg font-light text-[#0A1F3C]">
                  UAE <span className="font-medium text-[#66B2E8]">Clients</span>
                </h4>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-full">UAE</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {uaeClients.map((client, i) => (
                  <div key={`uae-${i}`} className="mobile-scroll-item aspect-square bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm p-3">
                    <img src={client.src} alt={client.name} className="object-contain max-w-full max-h-full mix-blend-multiply" loading="lazy" />
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
