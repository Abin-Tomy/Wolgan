"use client";

import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  waveColor?: string;
}

export function Footer({ waveColor = "#f8f9fb" }: FooterProps = {}) {
  return (
    <footer className="relative w-full bg-[#0A1F3C] pt-24 md:pt-40 pb-12 z-10 overflow-hidden" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
      
      {/* SVG Wave Transition at the very top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px] md:h-[120px] -mt-[1px]">
          <path fill={waveColor} d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
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
            <h4 className="text-white font-black text-4xl tracking-tighter mb-6">WOLGAN.</h4>
            <p className="text-[#88A4C4] text-sm leading-relaxed max-w-sm font-light mb-10">
              Pioneering the future of industrial infrastructure with sustainable water treatment, MEP installations, and advanced chemical solutions.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#66B2E8] hover:text-white hover:border-[#66B2E8] hover:-translate-y-1 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#66B2E8] hover:text-white hover:border-[#66B2E8] hover:-translate-y-1 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#66B2E8] hover:text-white hover:border-[#66B2E8] hover:-translate-y-1 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:pl-8 flex flex-col">
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

          {/* Legal */}
          <div className="lg:col-span-2 flex flex-col">
            <h5 className="text-white font-semibold tracking-[0.2em] uppercase text-[10px] mb-8 opacity-50">Legal</h5>
            <div className="flex flex-col space-y-5">
              <Link href="#" className="text-white/80 hover:text-white text-sm font-light transition-colors w-fit relative group">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white text-sm font-light transition-colors w-fit relative group">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white text-sm font-light transition-colors w-fit relative group">
                Cookie Policy
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 flex flex-col">
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
                  <a href="mailto:a.sampath@wolgan.ae" className="flex items-center gap-4 text-white/80 hover:text-white text-sm font-light transition-colors group w-fit">
                    <div className="w-8 h-8 rounded-full bg-[#66B2E8]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#66B2E8] transition-colors duration-300">
                      <Mail className="w-4 h-4 text-[#66B2E8] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Email</span>
                      <span>a.sampath@wolgan.ae</span>
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
                  <a href="mailto:a.nazeel@wolgan.qa" className="flex items-center gap-4 text-white/80 hover:text-white text-sm font-light transition-colors group w-fit">
                    <div className="w-8 h-8 rounded-full bg-[#66B2E8]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#66B2E8] transition-colors duration-300">
                      <Mail className="w-4 h-4 text-[#66B2E8] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Email</span>
                      <span>a.nazeel@wolgan.qa</span>
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
            © {new Date().getFullYear()} Wolgan Engineering. All rights reserved.
          </p>
          <p className="text-white/40 text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2">
            Pioneering Industrial Infrastructure
          </p>
        </div>

      </div>
    </footer>
  );
}
