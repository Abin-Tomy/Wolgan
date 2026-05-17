"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/icons/ArrowUpRight";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<"UAE" | "Qatar">("UAE");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-left", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".reveal-right", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f8f9fb] py-24 md:py-32 z-10"
      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Heading & Content */}
        <div className="lg:col-span-5">
          <div className="reveal-left mb-6">
            <span className="text-[#66B2E8] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Connect with Wolgan</span>
            <h2 className="text-[3rem] md:text-[4rem] font-black text-[#0A1F3C] leading-[1.1] tracking-tighter mb-6">
              LET’S PIONEER THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A1F3C] to-[#66B2E8] font-light">
                FUTURE TOGETHER.
              </span>
            </h2>
            <div className="w-20 h-[3px] bg-[#66B2E8] rounded-full mb-8"></div>
          </div>

          <p className="reveal-left text-[#0A1F3C]/60 text-lg font-light leading-relaxed mb-12 max-w-lg">
            Whether you have a specific inquiry or want to explore potential partnerships, our regional teams in the UAE and Qatar are ready to assist you.
          </p>

          <div className="reveal-left space-y-8">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0A1F3C]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <p className="text-[#0A1F3C]/70 text-sm font-medium">
                {region === 'UAE' ? 'Silicon Oasis, Building A2, Dubai' : 'Al Saad District, Doha, Qatar'}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#66B2E8]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-[#0A1F3C]/70 text-sm font-medium">info@wolgan.com</p>
            </div>
          </div>
        </div>

        {/* Right Column: The "Good" Form */}
        <div className="lg:col-span-7 reveal-right">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_80px_-20px_rgba(10,31,60,0.1)] border border-[#0A1F3C]/5 overflow-hidden">
            
            {/* Internal Region Toggle with Sliding Animation */}
            <div className="flex justify-center py-6 bg-gray-50/50 border-b border-gray-100">
              <div className="relative inline-flex p-1 bg-white rounded-full border border-gray-200">
                {/* Sliding Background */}
                <div 
                  className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#0A1F3C] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] shadow-md ${region === 'Qatar' ? 'translate-x-full' : 'translate-x-0'}`}
                />
                
                <button 
                  type="button"
                  onClick={() => setRegion("UAE")}
                  className={`relative z-10 px-10 py-2.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase rounded-full transition-colors duration-500 ${region === 'UAE' ? 'text-white' : 'text-[#0A1F3C]/40 hover:text-[#0A1F3C]'}`}
                >
                  UAE
                </button>
                <button 
                  type="button"
                  onClick={() => setRegion("Qatar")}
                  className={`relative z-10 px-10 py-2.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase rounded-full transition-colors duration-500 ${region === 'Qatar' ? 'text-white' : 'text-[#0A1F3C]/40 hover:text-[#0A1F3C]'}`}
                >
                  Qatar
                </button>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={(e) => e.preventDefault()}>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-[0.6rem] font-bold text-[#0A1F3C]/40 uppercase tracking-widest ml-1">First Name</label>
                  <input type="text" className="w-full bg-[#fcfcfc] border border-gray-100 rounded-xl px-5 py-3.5 text-sm focus:bg-white focus:border-[#66B2E8] focus:outline-none transition-all" placeholder="John" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-[0.6rem] font-bold text-[#0A1F3C]/40 uppercase tracking-widest ml-1">Last Name</label>
                  <input type="text" className="w-full bg-[#fcfcfc] border border-gray-100 rounded-xl px-5 py-3.5 text-sm focus:bg-white focus:border-[#66B2E8] focus:outline-none transition-all" placeholder="Doe" />
                </div>

                <div className="md:col-span-2 flex flex-col space-y-2">
                  <label className="text-[0.6rem] font-bold text-[#0A1F3C]/40 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" className="w-full bg-[#fcfcfc] border border-gray-100 rounded-xl px-5 py-3.5 text-sm focus:bg-white focus:border-[#66B2E8] focus:outline-none transition-all" placeholder="john@company.com" />
                </div>

                <div className="md:col-span-2 flex flex-col space-y-2">
                  <label className="text-[0.6rem] font-bold text-[#0A1F3C]/40 uppercase tracking-widest ml-1">Inquiry Type</label>
                  <select defaultValue="" className="w-full bg-[#fcfcfc] border border-gray-100 rounded-xl px-5 py-3.5 text-sm focus:bg-white focus:border-[#66B2E8] focus:outline-none transition-all appearance-none cursor-pointer">
                    <option value="" disabled>Select project area</option>
                    <option>Water Treatment</option>
                    <option>MEP Installations</option>
                    <option>Chemical Supplies</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex flex-col space-y-2">
                  <label className="text-[0.6rem] font-bold text-[#0A1F3C]/40 uppercase tracking-widest ml-1">Message</label>
                  <textarea rows={4} className="w-full bg-[#fcfcfc] border border-gray-100 rounded-xl px-5 py-3.5 text-sm focus:bg-white focus:border-[#66B2E8] focus:outline-none transition-all resize-none" placeholder="How can we help?"></textarea>
                </div>

                <div className="md:col-span-2 pt-2">
                  <button className="w-full bg-[#0A1F3C] text-white py-4.5 rounded-xl text-[0.65rem] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-[#66B2E8] transition-all duration-500">
                    Send Message
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
