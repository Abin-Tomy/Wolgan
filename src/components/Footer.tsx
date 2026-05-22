import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

export function Footer() {
  return (
    <footer className="relative w-full bg-[#f8f9fb] pb-6 px-4 md:px-8 z-10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
      
      {/* Floating Dark Card Layout */}
      <div className="max-w-[1500px] mx-auto bg-[#0A1F3C] rounded-[2rem] md:rounded-[3rem] px-8 md:px-16 lg:px-24 py-16 md:py-24 overflow-hidden relative shadow-2xl">
        
        {/* Soft Modern Glow Effects */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#66B2E8] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#66B2E8] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Top Section: Hero CTA & Newsletter */}
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-end mb-24 md:mb-32">
          
          <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-light text-white leading-[1.05] tracking-tight mb-12 xl:mb-0">
            Let's build <br /> 
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#88A4C4]">
              the future.
            </span>
          </h2>

          <div className="flex flex-col items-start xl:items-end w-full xl:w-auto">
            <p className="text-[#88A4C4] text-lg max-w-sm text-left xl:text-right mb-6">
              Join our newsletter for the latest insights in sustainable engineering.
            </p>
            <div className="relative w-full max-w-md">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-8 pr-16 text-white placeholder-[#88A4C4] focus:outline-none focus:border-[#66B2E8] transition-all focus:bg-white/10"
              />
              <button aria-label="Subscribe to newsletter" className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#66B2E8] hover:text-white text-[#0A1F3C] transition-colors group">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
              </button>
            </div>
          </div>
          
        </div>

        {/* Bottom Section: Links & Branding */}
        <div className="relative z-10 flex flex-col md:flex-row flex-wrap justify-between pt-12 border-t border-white/10 gap-12">
          
          {/* Links Group */}
          <div className="flex flex-wrap gap-16 md:gap-24">
            <div className="flex flex-col">
              <h4 className="text-white font-semibold mb-6 tracking-wide">Company</h4>
              <a href="#" className="text-[#88A4C4] hover:text-white mb-3 transition-colors">About Us</a>
              <a href="#" className="text-[#88A4C4] hover:text-white mb-3 transition-colors">Services</a>
              <a href="#" className="text-[#88A4C4] hover:text-white mb-3 transition-colors">Careers</a>
            </div>
            
            <div className="flex flex-col">
              <h4 className="text-white font-semibold mb-6 tracking-wide">Contact</h4>
              <a href="#" className="text-[#88A4C4] hover:text-white mb-3 transition-colors">Dubai Office</a>
              <a href="#" className="text-[#88A4C4] hover:text-white mb-3 transition-colors">Qatar Office</a>
              <a href="#" className="text-[#88A4C4] hover:text-white mb-3 transition-colors">info@wolgan.com</a>
            </div>
            
            <div className="flex flex-col">
              <h4 className="text-white font-semibold mb-6 tracking-wide">Legal</h4>
              <a href="#" className="text-[#88A4C4] hover:text-white mb-3 transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#88A4C4] hover:text-white mb-3 transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Brand & Copyright */}
          <div className="flex flex-col items-start md:items-end mt-8 md:mt-0">
            <h4 className="text-white font-black text-4xl tracking-tighter mb-4">WOLGAN.</h4>
            <p className="text-[#88A4C4] text-sm text-left md:text-right leading-relaxed">
              © {new Date().getFullYear()} Wolgan Engineering.<br/>All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
