"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";

const strategicPartners = [
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
  { name: "KSC", src: "/images/Qatar Clients/7. ksc.png" },
  { name: "Balagh", src: "/images/Qatar Clients/8. balagh.png" },
  { name: "Milaha", src: "/images/Qatar Clients/9. milaha.png" },
];

const uaeClients = [
  { name: "BRF", src: "/images/UAE Clients/1. BRF.jpg" },
  { name: "Transguard", src: "/images/UAE Clients/2. Trasnguard.png" },
  { name: "Dubai Holding", src: "/images/UAE Clients/3. Dubai Holding.png" },
  { name: "Emaar", src: "/images/UAE Clients/4. Emaar.svg" },
  { name: "Imdaad", src: "/images/UAE Clients/5. Imdaad.png" },
  { name: "Sobha", src: "/images/UAE Clients/6. Sobha.png" },
  { name: "Tabreed", src: "/images/UAE Clients/7. Tabreedpng.png" },
  { name: "Engie", src: "/images/UAE Clients/8. engie.jpeg" },
  { name: "Emrill", src: "/images/UAE Clients/9. Emrill.png" },
];

function MobileClientCard({ client }: { client: any }) {
  return (
    <div className="flex items-center justify-center bg-white rounded-2xl p-4 shadow-sm border border-black/5 aspect-square">
      <img 
        src={client.src} 
        alt={client.name}
        className="max-w-[80%] max-h-[80%] object-contain filter grayscale opacity-70"
        loading="lazy"
      />
    </div>
  );
}

export function MobileClientsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mobile-hero-text", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
      });
      
      gsap.utils.toArray(".mobile-client-section").forEach((sec: any) => {
        gsap.from(sec, {
          scrollTrigger: { trigger: sec, start: "top 85%" },
          y: 30, opacity: 0, duration: 0.8, ease: "power2.out"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-[#FDFCFB]" ref={containerRef}>
      <MobileHeader />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end pb-16 px-6 bg-[#0A1F3C]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/mep-installation.jpeg" alt="Background" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/40" />
        </div>

        <div className="relative z-10 mt-24">
          <span className="mobile-hero-text inline-block text-[#66B2E8] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 px-4 py-2 border border-[#66B2E8]/30 bg-[#66B2E8]/10 rounded-full">
            Our Network
          </span>
          <h1 className="mobile-hero-text text-4xl font-light text-white leading-tight tracking-tight mb-6">
            Trusted by <br/>
            industry <span className="font-semibold italic text-[#E5D5C5]">Leaders.</span>
          </h1>
          <p className="mobile-hero-text text-sm text-white/70 leading-relaxed border-l-2 border-[#66B2E8] pl-4">
            We collaborate with industry leaders across the Middle East to deliver exceptional, scalable MEP and Contracting solutions.
          </p>
        </div>
      </section>

      {/* Curve */}
      <div className="relative w-full overflow-hidden leading-none z-20 bg-[#E5D5C5] -translate-y-[1px]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px]">
          <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
        </svg>
      </div>

      {/* INFINITE MARQUEE DIVIDER */}
      <div className="relative w-full bg-[#E5D5C5] pb-4 pt-1 overflow-hidden border-b border-black/5 shadow-sm">
        <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite]">
          {Array.from({ length: 12 }).map((_, idx) => (
            <span key={idx} className="text-[#0A1F3C] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center shrink-0">
              <span className="mx-4">WATER TREATMENT</span>
              <span className="text-[#0A1F3C]/40">•</span> 
              <span className="mx-4">MEP INSTALLATIONS</span>
              <span className="text-[#0A1F3C]/40">•</span> 
              <span className="mx-4">CHEMICAL SUPPLIES</span>
              <span className="text-[#0A1F3C]/40">•</span> 
            </span>
          ))}
        </div>
      </div>

      {/* SECTIONS */}
      <div className="py-16 px-6 flex flex-col gap-16">
        
        {/* Strategic Partners */}
        <section className="mobile-client-section">
          <div className="mb-8 text-center">
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Strategic</span>
            <h2 className="text-3xl font-light text-[#0A1F3C] tracking-tight leading-none mt-2">
              Our <span className="font-semibold italic text-[#C7B59D]">Partners</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {strategicPartners.map((c, i) => <MobileClientCard key={i} client={c} />)}
          </div>
        </section>

        {/* Qatar Clients */}
        <section className="mobile-client-section">
          <div className="mb-8 text-center">
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">QA Region</span>
            <h2 className="text-3xl font-light text-[#0A1F3C] tracking-tight leading-none mt-2">
              Qatar <span className="font-semibold italic text-[#C7B59D]">Operations</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {qatarClients.map((c, i) => <MobileClientCard key={i} client={c} />)}
          </div>
        </section>

        {/* UAE Clients */}
        <section className="mobile-client-section mb-12">
          <div className="mb-8 text-center">
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">UAE Region</span>
            <h2 className="text-3xl font-light text-[#0A1F3C] tracking-tight leading-none mt-2">
              Emirates <span className="font-semibold italic text-[#C7B59D]">Operations</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {uaeClients.map((c, i) => <MobileClientCard key={i} client={c} />)}
          </div>
        </section>

      </div>

      <div className="relative z-20 -mt-1">
        <MobileFooter waveColor="#f8f9fb" />
      </div>
    </div>
  );
}
