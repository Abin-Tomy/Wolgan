"use client";

import { Phone, Mail } from "lucide-react";

interface MobileFooterProps {
  waveColor?: string;
  waveStroke?: string;
}

export function MobileFooter({ waveColor = "#f8f9fb", waveStroke }: MobileFooterProps = {}) {
  return (
    <footer className="relative w-full bg-[#0A1F3C] pt-16 pb-8 z-10 overflow-hidden font-montserrat">
      {/* SVG Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[30px] -mt-[1px]">
          <path fill={waveColor} stroke={waveStroke} strokeWidth={waveStroke ? "2" : "0"} d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
        </svg>
      </div>

      <div className="px-6 relative z-10 mt-8">
        
        {/* Newsletter */}
        <div className="mb-12 border-b border-white/10 pb-10 text-center">
          <h2 className="text-2xl font-light text-white leading-tight tracking-tight mb-3">
            Stay ahead of the <span className="font-semibold italic text-white/90">curve.</span>
          </h2>
          <p className="text-[#88A4C4] text-xs font-light leading-relaxed mb-6">
            Insights on engineering and market trends directly to your inbox.
          </p>
          <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Business Email" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-white text-sm placeholder-[#88A4C4] focus:outline-none focus:border-[#66B2E8]"
              required
            />
            <button aria-label="Subscribe" className="mt-4 w-full bg-white hover:bg-[#66B2E8] text-[#0A1F3C] py-3 rounded-full font-bold tracking-widest uppercase text-[10px] transition-colors">
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-10 mb-12">
          {/* Brand */}
          <div className="text-center flex flex-col items-center">
            <div className="mb-2 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Wolgan-logo.png"
                alt="Wolgan Logo"
                style={{ height: '80px', width: 'auto', display: 'block' }}
              />
            </div>
            <p className="text-[#88A4C4] text-xs leading-relaxed font-light text-center max-w-xs">
              Wolgan is an established and reputed Contracting Company in Qatar that serves exceptional service in the area of Water Treatment, Mechanical Installations, Chemical Supply and more.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="https://www.linkedin.com/company/wolgan-qatar/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#66B2E8] hover:text-white hover:border-[#66B2E8] transition-all duration-300 group">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/wolgan.qa?igsh=MXA3cDJwY3VjMmwxcw==" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#66B2E8] hover:text-white hover:border-[#66B2E8] transition-all duration-300 group">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 gap-6 text-center">
            <div>
              <h5 className="text-white font-semibold tracking-[0.2em] uppercase text-[10px] mb-4 opacity-50">Company</h5>
              <ul className="flex flex-col gap-3">
                <li><a href="/about" className="text-white/80 text-xs">About Us</a></li>
                <li><a href="/services" className="text-white/80 text-xs">Services</a></li>
                <li><a href="/team" className="text-white/80 text-xs">Our Team</a></li>
                <li><a href="/blogs" className="text-white/80 text-xs">Blogs</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Cards */}
          <div>
            <h5 className="text-white text-center font-semibold tracking-[0.2em] uppercase text-[10px] mb-6 opacity-50">Get in Touch</h5>
            <div className="flex flex-col gap-4">
              
              {/* UAE Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center">
                <span className="text-white font-bold text-xs uppercase tracking-widest mb-4">Dubai Office</span>
                <div className="flex justify-center gap-6">
                  <a href="https://wa.me/971565052820" className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-[#66B2E8]/10 flex items-center justify-center text-[#66B2E8]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-white/60 text-[9px] uppercase tracking-wider">Whatsapp</span>
                  </a>
                  <a href="mailto:info@wolgan.ae" className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-[#66B2E8]/10 flex items-center justify-center text-[#66B2E8]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-white/60 text-[9px] uppercase tracking-wider">Email</span>
                  </a>
                </div>
              </div>

              {/* Qatar Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center">
                <span className="text-white font-bold text-xs uppercase tracking-widest mb-4">Qatar Office</span>
                <div className="flex justify-center gap-6">
                  <a href="https://wa.me/97471251155" className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-[#66B2E8]/10 flex items-center justify-center text-[#66B2E8]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-white/60 text-[9px] uppercase tracking-wider">Whatsapp</span>
                  </a>
                  <a href="mailto:info@wolgan.qa" className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-[#66B2E8]/10 flex items-center justify-center text-[#66B2E8]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-white/60 text-[9px] uppercase tracking-wider">Email</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-[9px] uppercase tracking-widest font-semibold">
            © {new Date().getFullYear()} Wolgan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
