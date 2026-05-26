"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
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

function DiamondSpotlightCard({ client }: { client: any }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    // Using nativeEvent offset ensures accuracy even when the element is rotated
    setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-xl md:rounded-3xl border border-gray-200 bg-white overflow-hidden group hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(102,178,232,0.3)] transition-all duration-500 will-change-transform z-10 hover:z-20"
    >
      {/* Spotlight Border Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl md:rounded-3xl opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(102,178,232,0.6), transparent 40%)`,
        }}
      />
      
      {/* Spotlight Background Glow */}
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[11px] md:rounded-[23px] bg-white opacity-0 transition-opacity duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(102,178,232,0.08), transparent 40%)`,
        }}
      />
      
      <div className="absolute inset-[1px] rounded-[11px] md:rounded-[23px] bg-white z-0"></div>

      <div
        className="pointer-events-none absolute inset-[1px] rounded-[11px] md:rounded-[23px] opacity-0 transition-opacity duration-500 z-10 mix-blend-multiply"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(102,178,232,0.15), transparent 40%)`,
        }}
      />

      {/* Content - Counter-rotated so the image stays upright */}
      <div className="relative z-20 w-[140%] h-[140%] transform -rotate-45 flex items-center justify-center p-3 md:p-6">
        <img 
          src={client.src} 
          alt={client.name}
          title={client.name}
          className="object-contain max-w-[85%] max-h-[85%] opacity-75 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 mix-blend-multiply"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function ClientsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Stagger
      if (textRef.current) {
        const chars = textRef.current.querySelectorAll('.char');
        gsap.from(chars, {
          y: 40,
          opacity: 0,
          stagger: 0.02,
          duration: 1,
          ease: "back.out(1.5)",
          delay: 0.2
        });
      }

      // Hero Image Slow Scale
      gsap.to(".hero-bg-img", {
        scale: 1.1,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      // Floating Orbs
      if (orbsRef.current) {
        const orbs = orbsRef.current.querySelectorAll('.orb');
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            y: "random(-50, 50)",
            x: "random(-50, 50)",
            duration: "random(3, 6)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.5
          });
        });
      }

      // Stagger Grid Reveal for Diamonds
      gsap.utils.toArray('.grid-reveal').forEach((grid: any) => {
        gsap.from(grid.querySelectorAll('.spotlight-card-wrapper'), {
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
          },
          scale: 0.8,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out"
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <main className="bg-[#FDFCFB] min-h-screen overflow-clip">
        <Header />
        
        {/* --- HERO SECTION --- */}
        <section ref={heroRef} className="relative w-full h-[70vh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-[#0A1F3C] pb-24">
          
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/mep-installation.jpeg"
              alt="Wolgan Clients Background"
              fill
              className="hero-bg-img object-cover opacity-20 origin-center"
              priority
            />
            <div className="absolute inset-0" style={{
              background: "radial-gradient(circle at center, transparent 0%, #0A1F3C 100%), linear-gradient(to bottom, rgba(10,31,60,0.4) 0%, #0A1F3C 100%)",
            }} />
          </div>

          {/* Glassmorphic Orbs (The Network) */}
          <div ref={orbsRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-40">
            <div className="orb absolute top-1/4 left-1/4 w-64 h-64 bg-[#66B2E8] rounded-full mix-blend-screen filter blur-[100px]"></div>
            <div className="orb absolute top-1/3 right-1/4 w-80 h-80 bg-[#C7B59D] rounded-full mix-blend-screen filter blur-[120px]"></div>
            <div className="orb absolute bottom-1/4 left-1/2 w-72 h-72 bg-[#0A1F3C] rounded-full mix-blend-screen filter blur-[90px]"></div>
          </div>

          <div className="container mx-auto px-6 md:px-14 relative z-20">
            <div className="max-w-5xl">
              <div className="overflow-hidden mb-6">
                <span className="inline-block text-[#66B2E8] text-sm font-bold tracking-[0.3em] uppercase px-5 py-2.5 border border-[#66B2E8]/30 bg-[#66B2E8]/10 rounded-full backdrop-blur-md">
                  Our Network
                </span>
              </div>
              <h1 ref={textRef} className="text-5xl md:text-7xl lg:text-[6.5rem] font-light text-white leading-[1.05] tracking-tight flex flex-wrap">
                {/* Splitting text for GSAP stagger */}
                {Array.from("Trusted").map((char, i) => <span key={i} className="char inline-block">{char}</span>)}
                <span className="w-[0.3em]"></span>
                {Array.from("by").map((char, i) => <span key={i} className="char inline-block">{char}</span>)}
                <br className="hidden md:block"/>
                <span className="w-[0.3em] block md:hidden"></span>
                {Array.from("industry").map((char, i) => <span key={i} className="char inline-block">{char}</span>)}
                <span className="w-[0.3em]"></span>
                <span className="font-semibold italic text-[#E5D5C5] flex">
                  {Array.from("Leaders.").map((char, i) => <span key={i} className="char inline-block">{char}</span>)}
                </span>
              </h1>
              <p className="mt-8 text-xl text-white/60 leading-relaxed max-w-2xl font-light">
                We collaborate with industry leaders across the Middle East to deliver exceptional, scalable MEP and Contracting solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Asymmetrical Sweeping Curve Divider connecting from Hero to Marquee */}
        <div className="relative w-full overflow-hidden leading-none z-20 bg-[#E5D5C5]" style={{ transform: "translateY(-1px)" }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px] md:h-[120px]">
            <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
          </svg>
        </div>

        {/* --- INFINITE MARQUEE DIVIDER --- */}
        <div className="relative w-full bg-[#E5D5C5] pb-5 pt-1 overflow-hidden border-b border-black/5 z-30 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex">
          <div className="flex whitespace-nowrap animate-[marquee_80s_linear_infinite]">
            {Array.from({ length: 12 }).map((_, idx) => (
              <span key={idx} className="text-[#0A1F3C] text-sm md:text-base font-bold tracking-[0.2em] uppercase flex items-center shrink-0">
                <span className="mx-6 md:mx-10">WATER TREATMENT</span>
                <span className="text-[#0A1F3C]/40">•</span> 
                <span className="mx-6 md:mx-10">MEP INSTALLATIONS</span>
                <span className="text-[#0A1F3C]/40">•</span> 
                <span className="mx-6 md:mx-10">CHEMICAL SUPPLIES</span>
                <span className="text-[#0A1F3C]/40">•</span> 
              </span>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}} />
        </div>

        {/* --- STICKY SCROLL REGIONAL SHOWCASE --- */}
        <section className="py-24 md:pt-40 md:pb-64 relative z-20 overflow-clip">
          <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">

            {/* Strategic Partners */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-40 lg:mb-64">
              
              <div className="lg:w-1/3 relative z-30">
                <div className="lg:sticky lg:top-40">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-[#66B2E8]" />
                    <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">Strategic</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-light text-[#0A1F3C] tracking-tight leading-none mb-6">
                    Our <br/><span className="font-semibold italic text-[#C7B59D]">Partners</span>
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
                    Collaborating with industry-leading manufacturers and innovators to deliver uncompromising quality and performance.
                  </p>
                </div>
              </div>

              <div className="lg:w-2/3 grid-reveal flex justify-center items-center py-12 md:py-24">
                {/* Diamond Grid Container - 2x2 for 4 items */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 transform rotate-45 origin-center">
                  {strategicPartners.map((partner, i) => (
                    <div key={`partner-${i}`} className="spotlight-card-wrapper">
                      <DiamondSpotlightCard client={partner} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Qatar Region */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-40 lg:mb-64">
              
              <div className="lg:w-1/3 relative z-30">
                <div className="lg:sticky lg:top-40">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-[#66B2E8]" />
                    <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">QA Region</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-light text-[#0A1F3C] tracking-tight leading-none mb-6">
                    Qatar <br/><span className="font-semibold italic text-[#C7B59D]">Operations</span>
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
                    Powering infrastructure and strategic developments for Qatar's leading enterprises and government bodies.
                  </p>
                </div>
              </div>

              <div className="lg:w-2/3 grid-reveal flex justify-center items-center py-12 md:py-24">
                {/* Diamond Grid Container */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 transform rotate-45 origin-center">
                  {qatarClients.map((client, i) => (
                    <div key={`qatar-${i}`} className="spotlight-card-wrapper">
                      <DiamondSpotlightCard client={client} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* UAE Region */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              
              <div className="lg:w-1/3 relative z-30">
                <div className="lg:sticky lg:top-40">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-[#66B2E8]" />
                    <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">UAE Region</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-light text-[#0A1F3C] tracking-tight leading-none mb-6">
                    Emirates <br/><span className="font-semibold italic text-[#C7B59D]">Operations</span>
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
                    Delivering world-class MEP, Water Treatment, and facility management solutions across the United Arab Emirates.
                  </p>
                </div>
              </div>

              <div className="lg:w-2/3 grid-reveal flex justify-center items-center pt-12 pb-32 md:pt-24 md:pb-48">
                {/* Diamond Grid Container */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 transform rotate-45 origin-center">
                  {uaeClients.map((client, i) => (
                    <div key={`uae-${i}`} className="spotlight-card-wrapper">
                      <DiamondSpotlightCard client={client} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
