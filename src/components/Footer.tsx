"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  waveColor?: string;
  waveStroke?: string;
}

export function Footer({ waveColor = "#f8f9fb", waveStroke }: FooterProps = {}) {
  return (
    <footer className="relative w-full bg-[#0A1F3C] pt-24 md:pt-40 pb-12 z-10 overflow-hidden" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
      
      {/* SVG Wave Transition at the very top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px] md:h-[120px] -mt-[1px]">
          <path fill={waveColor} stroke={waveStroke} strokeWidth={waveStroke ? "2" : "0"} d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
        </svg>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 mt-8">
        
        {/* Soft Modern Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#66B2E8] opacity-[0.08] blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#66B2E8] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"></div>

        {/* Top Section: Newsletter */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-20 md:mb-28 border-b border-white/10 pb-16 lg:pb-20">
          <div className="max-w-2xl mb-10 xl:mb-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight mb-4">
              Stay ahead of the <span className="font-semibold italic text-white/90">curve.</span>
            </h2>
            <p className="text-[#88A4C4] text-lg font-light leading-relaxed max-w-xl">
              Receive occasional insights on engineering, sustainable systems, and market trends directly to your inbox.
            </p>
          </div>

          <div className="w-full xl:w-auto flex-shrink-0">
            <form className="relative w-full sm:w-[450px] lg:w-[500px]" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Business Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-8 pr-36 text-white placeholder-[#88A4C4] focus:outline-none focus:border-[#66B2E8] transition-all focus:bg-white/10"
                required
              />
              <button aria-label="Subscribe to newsletter" className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white hover:bg-[#66B2E8] hover:text-white text-[#0A1F3C] px-6 md:px-8 py-3 rounded-full font-bold tracking-widest uppercase text-[10px] md:text-xs transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="-mb-8 overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Wolgan-logo.png"
                alt="Wolgan Logo"
                style={{ height: '130px', width: 'auto', display: 'block', transform: 'translateX(-53px) translateY(-25px)' }}
              />
            </div>
            <p className="text-[#88A4C4] text-sm leading-relaxed max-w-sm font-light mb-6">
              Founded in Qatar in 2020, Wolgan is a global “Water Treatment Specialist” dedicated to delivering high-quality chemicals, maintenance supplies, engineered solutions, and technical services. Serving a broad range of industries, we help clients overcome complex water treatment challenges while advancing sustainability initiatives across the GCC and international markets.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/wolgan-qatar/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#66B2E8] hover:text-white hover:border-[#66B2E8] hover:-translate-y-1 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/wolgan.qa?igsh=MXA3cDJwY3VjMmwxcw==" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#66B2E8] hover:text-white hover:border-[#66B2E8] hover:-translate-y-1 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/wolganqatar/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#66B2E8] hover:text-white hover:border-[#66B2E8] hover:-translate-y-1 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col pt-6">
            <h5 className="text-white font-semibold tracking-[0.2em] uppercase text-[10px] mb-8 opacity-50">Navigation</h5>
            <div className="flex flex-col space-y-5">
              <Link href="/about" className="text-white/80 hover:text-white text-sm font-light transition-colors w-fit relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/services" className="text-white/80 hover:text-white text-sm font-light transition-colors w-fit relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/team" className="text-white/80 hover:text-white text-sm font-light transition-colors w-fit relative group">
                Our Team
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/blogs" className="text-white/80 hover:text-white text-sm font-light transition-colors w-fit relative group">
                Blogs
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>



          {/* Contact Info */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col pt-6">
            <h5 className="text-white font-semibold tracking-[0.2em] uppercase text-[10px] mb-8 opacity-50">Get in Touch</h5>
            
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              {/* Dubai Office */}
              <div>
                <h6 className="text-white/90 text-sm font-bold mb-4">Dubai - Contact Us</h6>
                <div className="flex flex-col space-y-4">
                  <a href="https://wa.me/971565052820" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/80 hover:text-white text-sm font-light transition-colors group w-fit">
                    <div className="w-8 h-8 rounded-full bg-[#66B2E8]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#66B2E8] transition-colors duration-300">
                      <Phone className="w-4 h-4 text-[#66B2E8] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Whatsapp</span>
                      <span>00971 565052820</span>
                    </div>
                  </a>
                  <a href="mailto:info@wolgan.ae" className="flex items-center gap-4 text-white/80 hover:text-white text-sm font-light transition-colors group w-fit">
                    <div className="w-8 h-8 rounded-full bg-[#66B2E8]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#66B2E8] transition-colors duration-300">
                      <Mail className="w-4 h-4 text-[#66B2E8] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Email</span>
                      <span>info@wolgan.ae</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Qatar Office */}
              <div>
                <h6 className="text-white/90 text-sm font-bold mb-4">Qatar - Contact Us</h6>
                <div className="flex flex-col space-y-4">
                  <a href="https://wa.me/97471251155" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/80 hover:text-white text-sm font-light transition-colors group w-fit">
                    <div className="w-8 h-8 rounded-full bg-[#66B2E8]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#66B2E8] transition-colors duration-300">
                      <Phone className="w-4 h-4 text-[#66B2E8] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Whatsapp</span>
                      <span>00974 71251155</span>
                    </div>
                  </a>
                  <a href="mailto:info@wolgan.qa" className="flex items-center gap-4 text-white/80 hover:text-white text-sm font-light transition-colors group w-fit">
                    <div className="w-8 h-8 rounded-full bg-[#66B2E8]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#66B2E8] transition-colors duration-300">
                      <Mail className="w-4 h-4 text-[#66B2E8] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Email</span>
                      <span>info@wolgan.qa</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 pb-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[11px] uppercase tracking-widest font-semibold">
            © {new Date().getFullYear()} Wolgan. All rights reserved.
          </p>
          <p className="text-white/40 text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2">
            Pioneering Industrial Infrastructure
          </p>
        </div>

      </div>
    </footer>
  );
}
