"use client";

import { Phone, Mail } from "lucide-react";

interface MobileFooterProps {
  waveColor?: string;
}

export function MobileFooter({ waveColor = "#f8f9fb" }: MobileFooterProps = {}) {
  return (
    <footer className="relative w-full bg-[#0A1F3C] pt-16 pb-8 z-10 overflow-hidden font-montserrat">
      {/* SVG Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[30px] -mt-[1px]">
          <path fill={waveColor} d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
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
          <div className="text-center">
            <h4 className="text-white font-black text-3xl tracking-tighter mb-4">WOLGAN.</h4>
            <p className="text-[#88A4C4] text-xs leading-relaxed font-light mx-auto">
              Pioneering the future of industrial infrastructure with sustainable water treatment, MEP installations, and advanced chemical solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <h5 className="text-white font-semibold tracking-[0.2em] uppercase text-[10px] mb-4 opacity-50">Company</h5>
              <ul className="flex flex-col gap-3">
                <li><a href="/about" className="text-white/80 text-xs">About Us</a></li>
                <li><a href="/services" className="text-white/80 text-xs">Services</a></li>
                <li><a href="/team" className="text-white/80 text-xs">Our Team</a></li>
                <li><a href="/blogs" className="text-white/80 text-xs">Blogs</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold tracking-[0.2em] uppercase text-[10px] mb-4 opacity-50">Legal</h5>
              <ul className="flex flex-col gap-3">
                <li><a href="#" className="text-white/80 text-xs">Privacy</a></li>
                <li><a href="#" className="text-white/80 text-xs">Terms</a></li>
                <li><a href="#" className="text-white/80 text-xs">Cookies</a></li>
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
                  <a href="mailto:a.sampath@wolgan.ae" className="flex flex-col items-center gap-2 group">
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
                  <a href="mailto:a.nazeel@wolgan.qa" className="flex flex-col items-center gap-2 group">
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
            © {new Date().getFullYear()} Wolgan Engineering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
