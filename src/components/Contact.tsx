"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

// ─── Turnstile Callback ─────────────────────────────────────────
// The Turnstile script calls this global function when the user
// completes the challenge. We store the token in a module-level
// variable that the form can read.
let _turnstileToken = "";
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).onTurnstileCallback = (token: string) => {
    _turnstileToken = token;
  };
}

const CustomDropdown = ({ options, value, onChange, placeholder, label }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col space-y-2 relative" ref={dropdownRef}>
      <label className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest ml-2">{label}</label>
      <div
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm flex justify-between items-center cursor-pointer hover:bg-white/10 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-gray-600"}>{value || placeholder}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div
        className={`absolute top-[4.5rem] left-0 w-full bg-[#0A1120] border border-white/10 rounded-2xl z-50 transition-all duration-300 shadow-2xl ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <div
          className="max-h-40 overflow-y-auto rounded-2xl py-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40 overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
        >
          {options.map((option: string) => (
            <div
              key={option}
              className={`px-5 py-3 text-sm cursor-pointer transition-colors ${value === option ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Submission Status Types ────────────────────────────────────
type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<"UAE" | "Qatar">("UAE");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emirate, setEmirate] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  // Submission states
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emiratesList = [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah"
  ];

  const interestOptions = [
    "Water Treatment Solutions",
    "MEP Installations",
    "Specialized Chemical Supplies",
    "Partnership Opportunities",
    "Other Inquiry"
  ];

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

  // Animation when region changes
  useEffect(() => {
    if (!formWrapperRef.current) return;

    // Reset specific states
    setEmirate("");
    setPhone("");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-content",
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }, formWrapperRef);

    return () => ctx.revert();
  }, [region]);

  // Re-render Turnstile widget when region changes (to reset it)
  useEffect(() => {
    if (!isMounted || !turnstileRef.current) return;
    _turnstileToken = "";

    // Clear previous widget
    turnstileRef.current.innerHTML = "";

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    // If the Turnstile script is loaded, render the widget
    const win = window as Record<string, any>;
    if (win.turnstile) {
      win.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: (token: string) => { _turnstileToken = token; },
        theme: "dark",
        size: "flexible",
      });
    }
  }, [region, status, isMounted]);

  // Reset form helper
  const resetForm = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setEmirate("");
    setPhone("");
    setInterest("");
    setMessage("");
    _turnstileToken = "";
  }, []);

  // ─── Form Submission ──────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    // Read the honeypot value
    const form = e.target as HTMLFormElement;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value ?? "";

    const payload = {
      firstName,
      lastName,
      email,
      region,
      emirate: region === "UAE" ? emirate : "",
      phone: region === "Qatar" ? phone : "",
      interest,
      message,
      website: honeypot,
      turnstileToken: _turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      resetForm();

      // Reset status after 6 seconds
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const uaeColor = "#66B2E8";
  const qatarColor = "#8A1538"; // Qatar maroon

  const activeColor = region === "UAE" ? uaeColor : qatarColor;

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full bg-[#020610] py-24 md:py-32 z-10 overflow-hidden"
      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      {/* Dynamic Background Glows based on region */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] opacity-20 blur-[150px] rounded-full pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: activeColor }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

        {/* Left Column: Heading & Content */}
        <div className="lg:col-span-5 relative z-10">
          <div className="reveal-left mb-6">
            <span
              className="font-bold tracking-[0.2em] text-xs uppercase mb-4 block transition-colors duration-500"
              style={{ color: activeColor }}
            >
              Connect with Wolgan
            </span>
            <h2 className="text-[3rem] md:text-[4.5rem] font-black text-white leading-[1.05] tracking-tighter mb-6">
              LET'S PIONEER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 font-light">
                THE FUTURE.
              </span>
            </h2>
            <div
              className="w-20 h-[3px] rounded-full mb-8 transition-colors duration-500"
              style={{ backgroundColor: activeColor }}
            ></div>
          </div>

          <p className="reveal-left text-gray-400 text-lg font-light leading-relaxed mb-12 max-w-lg">
            Whether you have a specific inquiry or want to explore potential partnerships, our regional teams are ready to architect the next big thing with you.
          </p>

          <div className="reveal-left space-y-6">
            {/* UAE Contact Info */}
            <div className="flex gap-5 items-center p-4 rounded-2xl border border-white/5 bg-white/10 shadow-lg backdrop-blur-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A1F3C] to-[#112D55] shadow-inner flex items-center justify-center text-[#66B2E8] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-widest uppercase mb-1">UAE Headquarters</p>
                <p className="text-gray-400 text-sm font-light">Silicon Oasis, Building A2, Dubai</p>
              </div>
            </div>

            {/* Qatar Contact Info */}
            <div className="flex gap-5 items-center p-4 rounded-2xl border border-white/5 bg-white/10 shadow-lg backdrop-blur-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D0B15] to-[#4A1122] shadow-inner flex items-center justify-center text-[#8A1538] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-widest uppercase mb-1">Qatar Office</p>
                <p className="text-gray-400 text-sm font-light">Al Saad District, Doha, Qatar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Dark/Glassmorphic Form */}
        <div className="lg:col-span-7 reveal-right relative z-10" ref={formWrapperRef}>

          <div className="bg-[#0A1120]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] relative group">

            {/* Subtle interactive hover light */}
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
              </div>
            </div>

            <div className="relative z-10">
              {/* Premium Region Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-8 mb-10 gap-6">
                <div>
                  <h3 className="text-white text-3xl font-light tracking-tight mb-2">Send an Inquiry</h3>
                  <p
                    className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-500"
                    style={{ color: activeColor }}
                  >
                    Direct to {region} Team
                  </p>
                </div>

                <div className="inline-flex p-1.5 bg-[#050A14] rounded-full border border-white/5 self-start sm:self-auto shadow-inner">
                  <div className="relative flex items-center">
                    {/* Sliding active pill */}
                    <div
                      className={`absolute inset-y-0 left-0 w-1/2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] shadow-[0_0_15px_rgba(0,0,0,0.5)] ${region === 'Qatar' ? 'translate-x-full' : 'translate-x-0'}`}
                      style={{ backgroundColor: activeColor }}
                    />

                    <button
                      type="button"
                      onClick={() => setRegion("UAE")}
                      aria-label="Select UAE region"
                      aria-pressed={region === 'UAE'}
                      className={`relative z-10 px-8 py-2.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase rounded-full transition-colors duration-500 w-28 ${region === 'UAE' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                    >
                      UAE
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegion("Qatar")}
                      aria-label="Select Qatar region"
                      aria-pressed={region === 'Qatar'}
                      className={`relative z-10 px-8 py-2.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase rounded-full transition-colors duration-500 w-28 ${region === 'Qatar' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                    >
                      Qatar
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-content">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8" onSubmit={handleSubmit}>

                  {/* ── Honeypot (invisible to humans) ── */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      top: "-9999px",
                      width: 0,
                      height: 0,
                      overflow: "hidden",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* First Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest ml-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-gray-600"
                      placeholder="John"
                      required
                      minLength={2}
                      maxLength={100}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest ml-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-gray-600"
                      placeholder="Doe"
                      required
                      minLength={1}
                      maxLength={100}
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest ml-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-gray-600"
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  {/* Dynamic Field based on Region */}
                  {region === 'UAE' ? (
                    <CustomDropdown
                      label="Emirate"
                      placeholder="Select Emirate"
                      options={emiratesList}
                      value={emirate}
                      onChange={setEmirate}
                    />
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <label className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest ml-2">Contact Number</label>
                      <div className="relative flex">
                        <div className="bg-white/5 border border-white/10 border-r-0 rounded-l-2xl px-4 py-4 text-gray-400 text-sm flex items-center">
                          +974
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-r-2xl px-5 py-4 text-white text-sm focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-gray-600"
                          placeholder="0000 0000"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Inquiry Type */}
                  <div className="md:col-span-2">
                    <CustomDropdown
                      label="Area of Interest"
                      placeholder="Select an area"
                      options={interestOptions}
                      value={interest}
                      onChange={setInterest}
                    />
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2 flex flex-col space-y-2">
                    <label className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest ml-2">Message</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all resize-none placeholder:text-gray-600"
                      placeholder="Tell us about your project..."
                      required
                      minLength={10}
                      maxLength={5000}
                    ></textarea>
                  </div>

                  {/* Cloudflare Turnstile Widget */}
                  <div className="md:col-span-2">
                    {isMounted && (
                      <div ref={turnstileRef} className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-callback="onTurnstileCallback" data-theme="dark" data-size="flexible" />
                    )}
                  </div>

                  {/* Status Messages */}
                  {status === "success" && (
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-4 text-emerald-400 text-sm animate-in fade-in duration-300">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Thank you! Your inquiry has been sent to our <strong>{region}</strong> team. We'll be in touch soon.</span>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-red-400 text-sm animate-in fade-in duration-300">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="md:col-span-2 pt-4">
                    <button
                      type="submit"
                      aria-label="Send inquiry"
                      disabled={status === "loading"}
                      className="group relative overflow-hidden w-full text-white py-5 rounded-2xl text-[0.75rem] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all duration-500 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{ backgroundColor: activeColor }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {status === "loading" ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Submit Inquiry <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
