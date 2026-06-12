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

        {/* Map Cards */}
        <div className="mobile-reveal mt-12 flex flex-col gap-6">
          {/* UAE Map Card */}
          <div className="flex flex-col rounded-2xl border border-white/5 bg-white/10 shadow-lg backdrop-blur-md overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A1F3C] to-[#112D55] flex items-center justify-center text-[#66B2E8] shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-white font-bold text-[10px] tracking-widest uppercase mb-0.5">UAE Office</p>
                <p className="text-gray-400 text-[11px] font-light">The European Business Centre, Dubai Investment Park, Dubai</p>
              </div>
            </div>
            <div className="h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.867323044399!2d55.1550228!3d25.004623900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d4888ee878b%3A0x2ea68bad90e7614c!2sThe%20European%20Business%20Centre!5e0!3m2!1sen!2sin!4v1781011618001!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UAE Headquarters Map"
              />
            </div>
          </div>

          {/* Qatar Map Card */}
          <div className="flex flex-col rounded-2xl border border-white/5 bg-white/10 shadow-lg backdrop-blur-md overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D0B15] to-[#4A1122] flex items-center justify-center text-[#8A1538] shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-white font-bold text-[10px] tracking-widest uppercase mb-0.5">Qatar Office</p>
                <p className="text-gray-400 text-[11px] font-light">Building Al Handasa Street, B Ring Rd, Doha, Qatar</p>
              </div>
            </div>
            <div className="h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3607.8821579512!2d51.5352435!3d25.2745493!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c5dcbf98ff87%3A0x4ab1713b2a89ec09!2sWolgan!5e0!3m2!1sen!2sin!4v1781011638549!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Qatar Office Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
