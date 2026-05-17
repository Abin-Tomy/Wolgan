"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function ClientsPartners() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant staggered fade-up for compact layout
      gsap.from(".fade-up", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Sleek compact heading
  const SectionHeading = ({ title }: { title: string }) => (
    <div className="fade-up mb-6">
      <h2 className="text-[2rem] font-light text-[#0A1F3C] tracking-tight mb-2">
        {title}
      </h2>
      <div className="w-16 h-[1px] bg-[#66B2E8] opacity-70"></div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white z-20"
      style={{
        minHeight: "100vh",
        marginTop: "-100vh",
        fontFamily: "var(--font-montserrat), sans-serif",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24">
        
        {/* LEFT COLUMN: Partners & Image */}
        <div className="flex flex-col">
          <SectionHeading title="Partners" />
          
          <div className="fade-up grid grid-cols-4 gap-3 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="h-16 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-md hover:border-[#66B2E8]/30 transition-all cursor-pointer"
              >
                <span className="text-gray-400 font-medium tracking-widest text-[0.55rem] uppercase">
                  Partner {i}
                </span>
              </div>
            ))}
          </div>

          {/* Compact Aesthetic Circular Image */}
          <div className="fade-up relative w-full max-w-[320px] aspect-square mx-auto flex items-center justify-center mt-auto">
            <div className="absolute inset-0 rounded-full border-[15px] border-[#eaf4fb] opacity-80 mix-blend-multiply"></div>
            <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-gray-50 to-gray-200 shadow-xl overflow-hidden flex items-center justify-center group">
              <span className="text-gray-400 font-light tracking-[0.2em] uppercase text-[10px] text-center px-4">
                Water Drop<br/>Image
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Clients */}
        <div className="flex flex-col space-y-12">
          
          {/* Qatar Clients */}
          <div>
            <SectionHeading title="Major Qatar Clients" />
            <div className="fade-up grid grid-cols-3 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div 
                  key={`q-${i}`} 
                  className="h-16 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-md hover:border-[#66B2E8]/30 transition-all cursor-pointer"
                >
                  <span className="text-[#0A1F3C]/50 font-medium tracking-wider text-[0.55rem] uppercase">
                    Client {i}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dubai Clients */}
          <div>
            <SectionHeading title="Major Dubai Clients" />
            <div className="fade-up grid grid-cols-3 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                <div 
                  key={`d-${i}`} 
                  className="h-16 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-md hover:border-[#66B2E8]/30 transition-all cursor-pointer"
                >
                  <span className="text-[#0A1F3C]/50 font-medium tracking-wider text-[0.55rem] uppercase">
                    Brand {i}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
