"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

export function MobileContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<"UAE" | "Qatar">("UAE");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mobile-reveal", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const activeColor = region === "UAE" ? "#66B2E8" : "#8A1538";

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full bg-[#020610] py-20 px-6 z-10 overflow-hidden font-montserrat"
    >
      {/* Dynamic Background Glows */}
      <div
        className="absolute top-0 left-0 w-full h-[50%] opacity-10 blur-[100px] rounded-full pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: activeColor }}
      />

      <div className="relative z-10">
        <div className="mobile-reveal mb-8 text-center">
          <span
            className="font-bold tracking-[0.2em] text-[10px] uppercase mb-3 block transition-colors duration-500"
            style={{ color: activeColor }}
          >
            Connect with Wolgan
          </span>
          <h2 className="text-4xl font-black text-white leading-tight tracking-tighter mb-4">
            LET’S PIONEER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 font-light">
              THE FUTURE.
            </span>
          </h2>
          <div
            className="w-12 h-1 rounded-full mb-6 mx-auto transition-colors duration-500"
            style={{ backgroundColor: activeColor }}
          ></div>
        </div>

        {/* Region Selector */}
        <div className="mobile-reveal mb-10 flex justify-center">
          <div className="inline-flex p-1 bg-[#050A14] rounded-full border border-white/5 shadow-inner relative w-full max-w-[280px]">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] shadow-[0_0_15px_rgba(0,0,0,0.5)] ${region === 'Qatar' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-1'}`}
              style={{ backgroundColor: activeColor }}
            />
            <button
              type="button"
              onClick={() => setRegion("UAE")}
              className={`relative z-10 flex-1 py-3 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-colors duration-500 ${region === 'UAE' ? 'text-white' : 'text-gray-500'}`}
            >
              UAE
            </button>
            <button
              type="button"
              onClick={() => setRegion("Qatar")}
              className={`relative z-10 flex-1 py-3 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-colors duration-500 ${region === 'Qatar' ? 'text-white' : 'text-gray-500'}`}
            >
              Qatar
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="mobile-reveal bg-[#0A1120]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative">
          <h3 className="text-white text-xl font-light tracking-tight mb-6 border-b border-white/10 pb-4">
            Send an Inquiry to {region}
          </h3>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600" placeholder="Your Name" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600" placeholder="your@email.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone</label>
              <div className="flex">
                <div className="bg-white/5 border border-white/10 border-r-0 rounded-l-xl px-3 py-3 text-gray-400 text-sm flex items-center shrink-0">
                  {region === 'UAE' ? '+971' : '+974'}
                </div>
                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-r-xl px-4 py-3 text-white text-sm focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600" placeholder="000 0000" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:bg-white/10 focus:outline-none transition-all resize-none placeholder:text-gray-600" placeholder="Tell us about your project..."></textarea>
            </div>

            <button
              className="mt-4 w-full text-white py-4 rounded-xl text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-colors duration-500 shadow-lg"
              style={{ backgroundColor: activeColor }}
            >
              Submit <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Contact Info Stacks */}
        <div className="mobile-reveal mt-12 flex flex-col gap-6">
          {/* UAE Contact Info */}
          <div className={`flex gap-4 items-center p-4 rounded-2xl transition-all duration-500 border border-white/5 ${region === 'UAE' ? 'bg-white/10 backdrop-blur-md' : 'opacity-50'}`}
            onClick={() => setRegion('UAE')}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A1F3C] to-[#112D55] flex items-center justify-center text-[#66B2E8] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <p className="text-white font-bold text-[10px] tracking-widest uppercase mb-1">UAE HQ</p>
              <p className="text-gray-400 text-[11px] font-light">Silicon Oasis, Dubai</p>
            </div>
          </div>

          {/* Qatar Contact Info */}
          <div className={`flex gap-4 items-center p-4 rounded-2xl transition-all duration-500 border border-white/5 ${region === 'Qatar' ? 'bg-white/10 backdrop-blur-md' : 'opacity-50'}`}
            onClick={() => setRegion('Qatar')}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D0B15] to-[#4A1122] flex items-center justify-center text-[#8A1538] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="text-white font-bold text-[10px] tracking-widest uppercase mb-1">Qatar Office</p>
              <p className="text-gray-400 text-[11px] font-light">Al Saad District, Doha</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
