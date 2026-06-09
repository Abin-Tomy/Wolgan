"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ShieldCheck, Clock, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

const cards = [
  { title: "Quality Materials", desc: "Sourcing only the finest, internationally certified materials.", icon: ShieldCheck },
  { title: "24/7 Service", desc: "Round-the-clock support ensuring your systems never halt.", icon: Clock },
  { title: "Quick Estimates", desc: "Accurate, transparent, and rapid project cost estimation.", icon: Zap },
  { title: "Professional Touch", desc: "Expert engineers bringing decades of experience to every job.", icon: Star },
];

export function MobileWhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".mobile-why-card").forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 20,
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
      className="relative w-full bg-[#050B14] py-20 px-6 font-montserrat overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-20%] w-[150%] h-[50%] bg-[#66B2E8] opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50">
            Why Choose Us
          </span>
          <div className="w-8 h-[1px] bg-white/20" />
        </div>
        
        <h2 className="text-3xl font-light leading-tight tracking-tight mb-6 text-white">
          Building on <br />
          <span className="text-[#66B2E8] font-medium">Reliability</span> & Expertise.
        </h2>
        
        <p className="text-sm text-white/70 leading-relaxed max-w-[300px]">
          We provide precision-engineered solutions tailored to your operational needs, ensuring long-term performance.
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-6 mb-16">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className="mobile-why-card bg-white/5 border border-white/10 rounded-3xl p-6 flex items-start gap-5 shadow-lg backdrop-blur-sm"
          >
            <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-[#66B2E8]/20 to-[#66B2E8]/5 border border-[#66B2E8]/20 flex items-center justify-center text-[#66B2E8]">
              <card.icon size={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col text-left pt-1">
              <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>



    </section>
  );
}
