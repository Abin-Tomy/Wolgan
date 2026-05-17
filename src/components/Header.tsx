"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import wolganLogo from "@/assets/images/brand/Wolgan-logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/icons/ArrowUpRight";

const serviceItems = [
  { name: "Water Treatment", href: "/services/water-treatment" },
  { name: "MEP Installations", href: "/services/mep-installations" },
  { name: "Chemical Supplies", href: "/services/chemical-supplies" },
];

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button variant="serviceDropdown">
        Our Services
        <svg
          className={`w-3 h-3 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {/* Invisible bridge to prevent menu from closing when moving mouse from button to panel */}
      <div className="absolute top-full left-0 w-full h-4 z-10" />

      {/* Dropdown Panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-200 z-50 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        style={{ 
          backgroundColor: "rgba(10, 25, 50, 0.95)", 
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)" 
        }}
      >
        {/* small arrow */}
        <div
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-l border-t border-white/10"
          style={{ 
            backgroundColor: "rgba(10, 25, 50, 0.95)",
            WebkitBackdropFilter: "blur(16px)"
          }}
        />
        <ul className="py-2">
          {serviceItems.map((item) => (
            <li key={item.name}>
              <Button variant="navLink" href={item.href}>
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-white/70 transition-colors duration-150" />
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    gsap.set(headerRef.current, { yPercent: -100, opacity: 0 });

    const showHeader = ScrollTrigger.create({
      start: "top+=100 top",
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

  const getPreloader = () => {
    if (typeof window !== "undefined") {
      return (window as any).Preloader;
    }
    return null;
  };

  // Rule 3: EVERY menu open: Call leave() to cover screen while menu opens
  const handleMobileMenuOpen = async () => {
    const preloader = getPreloader();
    if (preloader) await preloader.leave();
    setIsMobileMenuOpen(true);
    if (preloader) await preloader.enter();
  };

  // Rule 4: EVERY menu close: Call enter() to reveal page after menu closes
  const handleMobileMenuClose = async () => {
    const preloader = getPreloader();
    if (preloader) await preloader.leave();
    setIsMobileMenuOpen(false);
    if (preloader) await preloader.enter();
  };

  // Rule 2 & 4: Mobile Nav Click for Page Navigation (leave() -> swap -> enter())
  const handleMobileNavLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const preloader = getPreloader();
    if (preloader) await preloader.leave();
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  // Mobile Nav Click for same-page Hash Links (leave() -> close & scroll -> enter())
  const handleMobileHashLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const preloader = getPreloader();
    if (preloader) await preloader.leave();
    setIsMobileMenuOpen(false);
    window.location.hash = href;
    if (preloader) await preloader.enter();
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 h-20 w-full backdrop-blur-md border-b border-white/10"
        style={{ 
          backgroundColor: "rgba(10, 31, 60, 0.85)",
          WebkitBackdropFilter: "blur(12px)"
        }}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-6">

          {/* Logo */}
          <a href="/" className="shrink-0">
            <Image
              src={wolganLogo}
              alt="Wolgan Logo"
              className="h-16 w-auto object-contain"
              width={240}
              height={80}
              priority
            />
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#home" className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200">
              Home
            </a>
            <a href="/about" className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200">
              About
            </a>
            <ServicesDropdown />
            <a href="/#team" className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200">
              Our Team
            </a>
            <a href="/#clients" className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200">
              Our Clients
            </a>
            <a href="/#contact" className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <Button
            variant="headerCta"
            href="/#contact"
          >
            <span>Let&apos;s Talk</span>
            <div className="relative w-3.5 h-3.5 overflow-hidden">
              <ArrowUpRight className="absolute inset-0 transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
              <ArrowUpRight className="absolute inset-0 transition-transform duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
            </div>
          </Button>

          {/* Mobile hamburger */}
          <Button variant="mobileMenu" onClick={handleMobileMenuOpen} aria-label="Open Mobile Menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Cinematic Full-screen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex flex-col justify-between p-8 md:hidden"
          style={{
            backgroundColor: "rgba(10, 25, 50, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)"
          }}
        >
          {/* Menu Top: Header & Close */}
          <div className="flex items-center justify-between">
            <Image
              src={wolganLogo}
              alt="Wolgan Logo"
              className="h-12 w-auto object-contain"
              width={180}
              height={60}
            />
            <button 
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white hover:text-[#0A1F3C] transition-all duration-300"
              onClick={handleMobileMenuClose}
              aria-label="Close Mobile Menu"
            >
              <span className="text-lg">&times;</span> CLOSE
            </button>
          </div>

          {/* Menu Center: Navigation Links */}
          <div className="my-auto flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/35">Navigation</span>
            <ul className="flex flex-col gap-6">
              <li className="overflow-hidden">
                <a 
                  href="/#home" 
                  onClick={(e) => handleMobileHashLinkClick(e, "home")}
                  className="inline-block text-4xl font-light tracking-tight text-white/70 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Home
                </a>
              </li>
              <li className="overflow-hidden">
                <a 
                  href="/about" 
                  onClick={(e) => handleMobileNavLinkClick(e, "/about")}
                  className="inline-block text-4xl font-light tracking-tight text-white/70 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  About
                </a>
              </li>
              
              {/* Expandable Services list inside Menu */}
              <li className="flex flex-col gap-3">
                <span className="text-lg font-medium text-white/45">Our Services</span>
                <ul className="pl-4 flex flex-col gap-3 border-l border-white/10">
                  {serviceItems.map((item) => (
                    <li key={item.name}>
                      <a 
                        href={item.href}
                        onClick={(e) => handleMobileNavLinkClick(e, item.href)}
                        className="text-2xl font-light text-white/60 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="overflow-hidden">
                <a 
                  href="/#team" 
                  onClick={(e) => handleMobileHashLinkClick(e, "team")}
                  className="inline-block text-4xl font-light tracking-tight text-white/70 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Our Team
                </a>
              </li>
              <li className="overflow-hidden">
                <a 
                  href="/#clients" 
                  onClick={(e) => handleMobileHashLinkClick(e, "clients")}
                  className="inline-block text-4xl font-light tracking-tight text-white/70 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Our Clients
                </a>
              </li>
              <li className="overflow-hidden">
                <a 
                  href="/#contact" 
                  onClick={(e) => handleMobileHashLinkClick(e, "contact")}
                  className="inline-block text-4xl font-light tracking-tight text-white/70 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Menu Bottom: Footer */}
          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/30 tracking-wider">
            WOLGAN — PURE PERFORMANCE DELIVERED
          </div>
        </div>
      )}
    </>
  );
}
