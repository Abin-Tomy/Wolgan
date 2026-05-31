"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TransitionLink, usePageTransition } from "@/components/PageTransition";

const wolganLogo = "/images/Wolgan-logo.png";

const serviceItems = [
  { name: "Water Treatment", href: "/services/water-treatment" },
  { name: "MEP Installations", href: "/services/mep-installations" },
  { name: "Chemical Supplies", href: "/services/chemical-supplies" },
];

const downloadItems = [
  { name: "Wolgan Brochure", file: "/api/download?file=Wolgan_Brochure.pdf", download: "Wolgan_Brochure.pdf" },
  { name: "NCR Brochure", file: "/api/download?file=NCR_Brochure.pdf", download: "NCR_Brochure.pdf" },
  { name: "Rydlyme Brochure", file: "/api/download?file=Rydlyme_Brochure.pdf", download: "Rydlyme_Brochure.pdf" },
];

export function MobileHeader() {
  const { navigate } = usePageTransition();
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Basic show/hide on scroll for mobile header too
    gsap.set(headerRef.current, { yPercent: -100, opacity: 0 });

    const showHeader = ScrollTrigger.create({
      start: "top+=50 top",
      onUpdate: (self) => {
        if (self.direction === 1 && self.progress > 0) {
          gsap.to(headerRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });
        } else if (self.progress === 0) {
          gsap.to(headerRef.current, {
            yPercent: -100,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            overwrite: true,
          });
        }
      },
    });

    return () => {
      showHeader.kill();
    };
  }, []);

  // Centralized body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuOpen = () => {
    setIsMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileNavLinkClick = (e: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleMobileMenuClose();
    navigate(href);
  };

  const handleMobileHashLinkClick = (e: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleMobileMenuClose();
    if (window.location.pathname === "/") {
      window.location.hash = href;
    } else {
      navigate(`/#${href}`);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 h-16 w-full backdrop-blur-md border-b border-white/10"
        style={{ 
          backgroundColor: "rgba(10, 31, 60, 0.95)",
          WebkitBackdropFilter: "blur(16px)"
        }}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          {/* Logo */}
          <TransitionLink href="/" className="shrink-0 relative z-10">
            <Image
              src={wolganLogo}
              alt="Wolgan Logo"
              className="h-10 w-auto object-contain"
              width={160}
              height={50}
              priority
            />
          </TransitionLink>

          {/* Right Side Items */}
          <div className="flex items-center gap-3 relative z-10">
            {/* Mobile hamburger */}
            <Button variant="mobileMenu" onClick={handleMobileMenuOpen} aria-label="Open Mobile Menu" className="p-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[10000] overflow-y-auto overscroll-contain transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(10, 25, 50, 0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)"
        }}
      >
        <div className={`w-full min-h-full flex flex-col p-6 transition-transform duration-500 ease-out ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-8"}`}>
          {/* Menu Top: Header & Close */}
          <div className="flex items-center justify-between shrink-0 mb-8 mt-2">
            <Image
              src={wolganLogo}
              alt="Wolgan Logo"
              className="h-10 w-auto object-contain"
              width={160}
              height={50}
            />
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-[#0A1F3C] transition-all duration-300"
              onClick={handleMobileMenuClose}
              aria-label="Close Mobile Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Center: Navigation Links */}
          <div className="flex-1 flex flex-col w-full gap-10 pb-8">
            
            {/* Main Navigation */}
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/40 pl-2">Navigation</span>
              <ul className="flex flex-col gap-3">
                {[
                  { name: "Home", href: "/#home", isHash: true },
                  { name: "About", href: "/about" },
                  { name: "Our Team", href: "/team" },
                  { name: "Our Clients", href: "/clients" },
                  { name: "Blogs", href: "/blogs" },
                  { name: "Contact", href: "/#contact", isHash: true },
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      onClick={(e) => item.isHash ? handleMobileHashLinkClick(e, item.href.replace('/#', '')) : handleMobileNavLinkClick(e, item.href)}
                      className="block px-2 py-1 text-[2.5rem] leading-none font-light tracking-tight text-white/90 active:text-white active:scale-95 origin-left transition-all duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/40 pl-2">Services</span>
              <ul className="flex flex-col gap-4 pl-6 border-l border-white/10 ml-2">
                {serviceItems.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      onClick={(e) => handleMobileNavLinkClick(e, item.href)}
                      className="block text-2xl font-light text-white/70 active:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Downloads */}
            <div className="flex flex-col gap-4 mt-2">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/40 pl-2">Downloads</span>
              <div className="grid grid-cols-1 gap-3">
                {downloadItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.file}
                    download={item.download}
                    className="flex items-center justify-between px-5 py-4 rounded-xl bg-white/5 border border-white/10 active:bg-white/10 transition-colors duration-200"
                  >
                    <span className="text-base font-medium text-white/90">{item.name}</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
