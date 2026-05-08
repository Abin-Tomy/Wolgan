"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import wolganLogo from "@/assets/Wolgan-logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const serviceItems = [
  "Water Treatment",
  "MEP Installation & Services",
  "Commodity Chemical Supplies",
  "Electrical Installation & Maintenance Services",
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

      {/* Dropdown Panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        style={{ backgroundColor: "rgba(10, 25, 50, 0.95)", backdropFilter: "blur(16px)" }}
      >
        {/* small arrow */}
        <div
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-l border-t border-white/10"
          style={{ backgroundColor: "rgba(10, 25, 50, 0.95)" }}
        />
        <ul className="py-2">
          {serviceItems.map((item) => (
            <li key={item}>
              <Button variant="navLink" href="#services">
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-white/70 transition-colors duration-150" />
                {item}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 h-20 w-full backdrop-blur-md border-b border-white/10"
      style={{ backgroundColor: "rgba(10, 31, 60, 0.85)" }}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6">

        {/* Logo */}
        <a href="#" className="shrink-0">
          <Image
            src={wolganLogo}
            alt="Wolgan Logo"
            className="h-14 w-auto transform scale-125"
            width={210}
            height={70}
          />
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200">
            Home
          </a>
          <a href="#about" className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200">
            About
          </a>
          <ServicesDropdown />
          <a href="#clients" className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200">
            Our Clients
          </a>
          <a href="#contact" className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200">
            Contact
          </a>
        </nav>

        {/* CTA Button */}
        <Button
          variant="headerCta"
          href="#contact"
        >
          <span>Let&apos;s Talk</span>
          <div className="relative w-3.5 h-3.5 overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            <svg
              className="absolute inset-0 w-full h-full transition-transform duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </Button>

        {/* Mobile hamburger (placeholder) */}
        <Button variant="mobileMenu">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </header>
  );
}
