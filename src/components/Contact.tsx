"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

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
            Whether you have a specific inquiry or want to explore potential partnerships, our regional teams are ready to assist you.
          </p>

          <div className="reveal-left flex flex-col sm:flex-row gap-10 sm:gap-16">
            {/* Dubai Office */}
            <div>
              <h3 className="text-[#0A1F3C] font-bold text-lg mb-5">Dubai - Contact Us</h3>
              <div className="space-y-4">
                <a href="https://wa.me/971565052820" target="_blank" rel="noreferrer" className="flex gap-4 items-center hover:opacity-80 transition-opacity w-fit">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0A1F3C]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#0A1F3C]/50 text-xs font-bold uppercase tracking-wider">Whatsapp</span>
                    <span className="text-[#0A1F3C]/80 text-sm font-medium">00971 565052820</span>
                  </div>
                </a>
                <a href="mailto:a.sampath@wolgan.ae" className="flex gap-4 items-center hover:opacity-80 transition-opacity w-fit">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#66B2E8]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#0A1F3C]/50 text-xs font-bold uppercase tracking-wider">Email</span>
                    <span className="text-[#0A1F3C]/80 text-sm font-medium">a.sampath@wolgan.ae</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Qatar Office */}
            <div>
              <h3 className="text-[#0A1F3C] font-bold text-lg mb-5">Qatar - Contact Us</h3>
              <div className="space-y-4">
                <a href="https://wa.me/97471251155" target="_blank" rel="noreferrer" className="flex gap-4 items-center hover:opacity-80 transition-opacity w-fit">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0A1F3C]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#0A1F3C]/50 text-xs font-bold uppercase tracking-wider">Whatsapp</span>
                    <span className="text-[#0A1F3C]/80 text-sm font-medium">00974 71251155</span>
                  </div>
                </a>
                <a href="mailto:a.nazeel@wolgan.qa" className="flex gap-4 items-center hover:opacity-80 transition-opacity w-fit">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#66B2E8]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#0A1F3C]/50 text-xs font-bold uppercase tracking-wider">Email</span>
                    <span className="text-[#0A1F3C]/80 text-sm font-medium">a.nazeel@wolgan.qa</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Light Mode Form */}
        <div className="lg:col-span-7 reveal-right relative">
          
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_30px_100px_-20px_rgba(10,31,60,0.1)] relative overflow-hidden">
            
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#66B2E8] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#66B2E8] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              {/* Premium Region Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0A1F3C]/10 pb-6 mb-8 gap-6">
                <div>
                  <h3 className="text-[#0A1F3C] text-2xl font-light tracking-tight mb-2">Send an Inquiry</h3>
                  <p className="text-[#66B2E8] text-xs font-bold tracking-[0.2em] uppercase">Select your region</p>
                </div>
                
                <div className="inline-flex p-1.5 bg-[#f8f9fb] rounded-full border border-gray-200 self-start sm:self-auto overflow-x-auto max-w-full">
                  <div className="relative flex items-center min-w-max">
                    {/* Sliding active pill */}
                    <div 
                      className={`absolute inset-y-0 left-0 w-1/2 bg-[#0A1F3C] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] shadow-sm ${region === 'Qatar' ? 'translate-x-full' : 'translate-x-0'}`}
                    />
                    
                    <button 
                      type="button"
                      onClick={() => setRegion("UAE")}
                      aria-label="Select UAE region"
                      aria-pressed={region === 'UAE'}
                      className={`relative z-10 px-6 py-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase rounded-full transition-colors duration-500 w-24 ${region === 'UAE' ? 'text-white' : 'text-[#0A1F3C]/40 hover:text-[#0A1F3C]/80'}`}
                    >
                      UAE
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRegion("Qatar")}
                      aria-label="Select Qatar region"
                      aria-pressed={region === 'Qatar'}
                      className={`relative z-10 px-6 py-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase rounded-full transition-colors duration-500 w-24 ${region === 'Qatar' ? 'text-white' : 'text-[#0A1F3C]/40 hover:text-[#0A1F3C]/80'}`}
                    >
                      Qatar
                    </button>
                  </div>
                </div>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={(e) => e.preventDefault()}>
                
                {/* First Name */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[0.65rem] font-bold text-[#0A1F3C]/60 uppercase tracking-widest ml-2">First Name</label>
                  <input type="text" className="w-full bg-[#fcfcfc] border border-gray-200 rounded-2xl px-5 py-3 text-[#0A1F3C] text-sm focus:bg-white focus:border-[#66B2E8] focus:ring-1 focus:ring-[#66B2E8]/20 focus:outline-none transition-all placeholder:text-[#0A1F3C]/20" placeholder="John" />
                </div>

                {/* Last Name */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[0.65rem] font-bold text-[#0A1F3C]/60 uppercase tracking-widest ml-2">Last Name</label>
                  <input type="text" className="w-full bg-[#fcfcfc] border border-gray-200 rounded-2xl px-5 py-3 text-[#0A1F3C] text-sm focus:bg-white focus:border-[#66B2E8] focus:ring-1 focus:ring-[#66B2E8]/20 focus:outline-none transition-all placeholder:text-[#0A1F3C]/20" placeholder="Doe" />
                </div>

                {/* Email Address */}
                <div className="md:col-span-2 flex flex-col space-y-1.5">
                  <label className="text-[0.65rem] font-bold text-[#0A1F3C]/60 uppercase tracking-widest ml-2">Email Address</label>
                  <input type="email" className="w-full bg-[#fcfcfc] border border-gray-200 rounded-2xl px-5 py-3 text-[#0A1F3C] text-sm focus:bg-white focus:border-[#66B2E8] focus:ring-1 focus:ring-[#66B2E8]/20 focus:outline-none transition-all placeholder:text-[#0A1F3C]/20" placeholder="john@company.com" />
                </div>

                {/* Inquiry Type */}
                <div className="md:col-span-2 flex flex-col space-y-1.5 relative">
                  <label className="text-[0.65rem] font-bold text-[#0A1F3C]/60 uppercase tracking-widest ml-2">Area of Interest</label>
                  <select defaultValue="" className="w-full bg-[#fcfcfc] border border-gray-200 rounded-2xl px-5 py-3 text-[#0A1F3C] text-sm focus:bg-white focus:border-[#66B2E8] focus:ring-1 focus:ring-[#66B2E8]/20 focus:outline-none transition-all appearance-none cursor-pointer">
                    <option value="" disabled className="text-gray-400">Select an area</option>
                    <option>Water Treatment</option>
                    <option>MEP Installations</option>
                    <option>Chemical Supplies</option>
                    <option>Other Inquiry</option>
                  </select>
                  <div className="absolute right-5 top-[2rem] pointer-events-none text-[#0A1F3C]/40">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div className="md:col-span-2 flex flex-col space-y-1.5">
                  <label className="text-[0.65rem] font-bold text-[#0A1F3C]/60 uppercase tracking-widest ml-2">Message</label>
                  <textarea rows={3} className="w-full bg-[#fcfcfc] border border-gray-200 rounded-2xl px-5 py-3 text-[#0A1F3C] text-sm focus:bg-white focus:border-[#66B2E8] focus:ring-1 focus:ring-[#66B2E8]/20 focus:outline-none transition-all resize-none placeholder:text-[#0A1F3C]/20" placeholder="How can we partner with you?"></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-2">
                  <button aria-label="Send inquiry" className="group relative overflow-hidden w-full bg-[#0A1F3C] text-white py-4 rounded-2xl text-[0.7rem] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all duration-500 shadow-xl shadow-[#0A1F3C]/10 hover:shadow-[#0A1F3C]/20 hover:scale-[1.01]">
                    <span className="relative z-10 flex items-center gap-3">
                      Send Inquiry <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                    <div className="absolute inset-0 bg-[#66B2E8] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
