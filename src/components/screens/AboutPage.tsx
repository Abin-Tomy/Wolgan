"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import {
  Globe2, Droplets, Settings, FlaskConical,
  Building2, Hotel, Factory, Ship, Landmark, Hospital, Target, Compass,
  Home, Utensils, Flame, Snowflake
} from "lucide-react";

const deck1 = "/images/about-deck-1.jpg";
const deck2 = "/images/about-deck-2.jpg";
const deck3 = "/images/about-deck-3.jpg";
const waterplant = "/images/about-waterplant.webp";


import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { MobileAboutPage } from "./mobile/MobileAboutPage";

function DesktopAboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Hero: per-line reveal from bottom ── */
      gsap.set(".hero-line", { yPercent: 110, opacity: 0 });
      gsap.to(".hero-line", {
        yPercent: 0, opacity: 1,
        duration: 1.4, stagger: 0.13, ease: "expo.out", delay: 0.2,
      });
      gsap.fromTo(".hero-sub", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.85,
      });
      gsap.fromTo(".hero-badge", { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3,
      });
      gsap.fromTo(".hero-cta", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 1.1,
      });

      /* ── Hero image parallax ── */
      gsap.to(".hero-img", {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      /* ── Scroll reveal helpers ── */
      gsap.utils.toArray<HTMLElement>(".anim-up").forEach((el) => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 94%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".anim-left").forEach((el) => {
        gsap.fromTo(el, { x: -45, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 93%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".anim-right").forEach((el) => {
        gsap.fromTo(el, { x: 45, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 93%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".stagger-parent").forEach((parent) => {
        gsap.fromTo(parent.children, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: parent, start: "top 93%" },
        });
      });

      /* ── Image reveal clip-path (the "show over" animation) ── */
      gsap.utils.toArray<HTMLElement>(".img-reveal").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 94%" },
        });
      });

      /* ── Process step reveals ── */
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el, i) => {
        gsap.fromTo(el, { x: -25, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.05,
          scrollTrigger: { trigger: el, start: "top 94%" },
        });
      });

      /* ── CTA ── */
      gsap.fromTo(".cta-card", { scale: 0.95, opacity: 0, y: 30 }, {
        scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-card", start: "top 94%" },
      });

      /* ── Magnetic Button Hover Effect ── */
      const buttons = gsap.utils.toArray<HTMLElement>(".btn-magnetic");
      buttons.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.04,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });

      /* ── Hanging Cards Swing & Smooth Physics Interactions ── */
      gsap.utils.toArray<HTMLElement>(".hanging-card").forEach((card, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        
        // Set initial state: card is pulled up, rotated, and invisible
        gsap.set(card, {
          transformOrigin: "top center",
          y: -140,
          rotation: direction * 14,
          opacity: 0
        });
        
        // 1. Scroll-triggered entrance: Put down the hanging card (drop down, stretch/jolt, swing to stop)
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 94%",
            onEnter: () => {
              const delay = index * 0.16; // staggered entrance like putting down boards sequentially
              const tl = gsap.timeline({ delay });

              // Rapid smooth gravity drop
              tl.to(card, {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: "power2.in"
              })
              // Thread stretch & bounce (stretching past y: 0)
              .to(card, {
                y: 12,
                rotation: direction * -8,
                duration: 0.22,
                ease: "power1.out"
              })
              // Rebound upward
              .to(card, {
                y: -6,
                rotation: direction * 5.5,
                duration: 0.3,
                ease: "power1.inOut"
              })
              // Second downward settling bounce
              .to(card, {
                y: 3,
                rotation: direction * -3,
                duration: 0.35,
                ease: "power1.inOut"
              })
              // Third light rebound
              .to(card, {
                y: -1,
                rotation: direction * 1.5,
                duration: 0.4,
                ease: "power1.inOut"
              })
              // Perfectly settle to resting position
              .to(card, {
                y: 0,
                rotation: 0,
                duration: 0.45,
                ease: "power1.out"
              });
            }
          }
        });

        // 2. Physical interactive impulse: touch/hover gives a direct push and decay-to-stable swing
        const triggerSwingImpulse = (isEnter: boolean) => {
          gsap.killTweensOf(card);
          const tl = gsap.timeline();
          
          const impulseRotation = isEnter ? direction * 7.5 : direction * -5.0;
          const impulseX = isEnter ? direction * 2.0 : direction * -1.2;
          const impulseY = isEnter ? 3.0 : 0;

          // Swing phase 1: Instant response to push
          tl.to(card, {
            rotation: impulseRotation,
            x: impulseX,
            y: impulseY,
            duration: 0.32,
            ease: "power1.out"
          })
          // Swing phase 2: Swing back past resting state (pendulum peak deceleration)
          .to(card, {
            rotation: impulseRotation * -0.65,
            x: impulseX * -0.65,
            y: impulseY * 0.4,
            duration: 0.42,
            ease: "power1.inOut"
          })
          // Swing phase 3: Swing forward
          .to(card, {
            rotation: impulseRotation * 0.38,
            x: impulseX * 0.38,
            y: impulseY * 0.15,
            duration: 0.52,
            ease: "power1.inOut"
          })
          // Swing phase 4: Swing backward
          .to(card, {
            rotation: impulseRotation * -0.18,
            x: impulseX * -0.18,
            y: 0,
            duration: 0.62,
            ease: "power1.inOut"
          })
          // Settle completely back to resting position
          .to(card, {
            rotation: 0,
            x: 0,
            y: 0,
            duration: 0.72,
            ease: "power1.out"
          });
        };

        const onEnter = () => triggerSwingImpulse(true);
        const onLeave = () => triggerSwingImpulse(false);

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="overflow-hidden" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
        <Header />

        {/* ═══════════════════════════════════
            1. HERO — centered text layout
        ═══════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[75vh] flex flex-col items-center justify-center text-center overflow-hidden pt-24 pb-12"
          style={{ backgroundColor: "var(--brand-navy)" }}
        >
          {/* Full-bleed background image with parallax */}
          <div className="absolute inset-0 z-0">
            <Image
              src={deck1}
              alt="Wolgan engineering"
              fill
              className="hero-img object-cover opacity-35"
              priority
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to bottom, rgba(var(--brand-navy-rgb),0.55) 0%, rgba(var(--brand-navy-rgb),0.75) 60%, var(--brand-navy) 100%)",
            }} />
          </div>

          <div className="relative z-10 px-6 md:px-14 flex flex-col items-center">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-3 px-5 py-2 rounded-full mb-12"
              style={{ border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.6)" }} />
              <span className="text-[10px] uppercase tracking-[0.45em] font-semibold text-white/60">About Wolgan</span>
            </div>

            {/* Big centered heading */}
            <h1 className="hero-heading">
              <div className="overflow-hidden mb-1">
                <span className="hero-line block text-[clamp(3.2rem,7.5vw,8.5rem)] font-black leading-[0.88] tracking-tighter text-white uppercase">
                  Pure
                </span>
              </div>
              <div className="overflow-hidden mb-1">
                <span className="hero-line block text-[clamp(3.2rem,7.5vw,8.5rem)] font-black leading-[0.88] tracking-tighter uppercase"
                  style={{ color: "rgba(255,255,255,0.22)" }}>
                  Performance
                </span>
              </div>
              <div className="overflow-hidden mb-8">
                <span className="hero-line block text-[clamp(3.2rem,7.5vw,8.5rem)] font-black leading-[0.88] tracking-tighter text-white uppercase">
                  Delivered.
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="hero-sub text-base text-white/50 font-light max-w-sm leading-relaxed mb-0">
              An established Contracting Company delivering Water Treatment, MEP, and Chemical Supply across the Middle East &amp; India.
            </p>
          </div>

          {/* Bottom thin line removed for seamless blend into next section */}
        </section>

        {/* ═══════════════════════════════════
            2. WHO WE ARE — typography & details
        ═══════════════════════════════════ */}
        <section id="who-we-are" className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: "#f8f9fa" }}>
          
          {/* Asymmetrical Sweeping Curve Divider */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0" style={{ transform: "translateY(-1px)" }}>
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[60px] md:h-[160px]">
              <path fill="var(--brand-navy)" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
            </svg>
          </div>

          {/* Subtle background orb to make glassmorphism pop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-[var(--brand-navy)] opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-6 md:px-14 relative z-10">
            
            {/* 3-Column Editorial Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* COLUMN 1: Headline & Body Text (Span 4) */}
              <div className="lg:col-span-4 anim-left flex flex-col justify-center p-8 md:p-10 rounded-[2rem] border border-white shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-xl"
                   style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)" }}>
                <p className="text-[10px] uppercase tracking-[0.6em] font-bold mb-6"
                  style={{ color: "rgba(var(--brand-navy-rgb), 0.4)" }}>
                  Who We Are
                </p>
                <h2 className="text-[clamp(1.6rem,2.2vw,2.2rem)] font-light leading-[1.25] tracking-tight mb-8"
                  style={{ color: "var(--brand-navy)" }}>
                  Built on courage, vision, and entrepreneurial leadership.
                </h2>
                
                <div className="space-y-6 text-sm md:text-base font-light leading-relaxed"
                  style={{ color: "rgba(var(--brand-navy-rgb), 0.65)" }}>
                  <p>
                    Founded in 2020, Wolgan is an established Contracting Company operating in the Middle East. Driven by entrepreneurial leadership and vision, we deliver smart, reliable solutions in water treatment, MEP execution, and specialized chemical supply across commercial and industrial sectors.
                  </p>
                  <p>
                    Serving industries from healthcare to large-scale construction, our experienced team provides advanced, cost-effective solutions. We continuously explore strategic alliances to optimize performance, ensure international compliance, and help customers operate efficiently with greater environmental responsibility.
                  </p>
                </div>
              </div>

              {/* COLUMN 2: The Massive SVG Numbers (Span 4) - CENTER HIGHLIGHT */}
              <div className="lg:col-span-4 anim-up flex flex-col items-center justify-center gap-8 py-10 lg:py-0">
                <div className="w-full relative min-h-[450px] md:min-h-[580px] max-w-[450px]">
                  <svg viewBox="0 0 450 650" className="w-full h-full absolute inset-0">
                    <defs>
                      <clipPath id="textClip">
                        <text x="50%" y="160" textAnchor="middle" fontFamily="inherit" fontSize="180" fontWeight="900" letterSpacing="-0.05em">
                          10<tspan fontSize="110" dy="-50">+</tspan>
                        </text>
                        <text x="50%" y="195" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="700" letterSpacing="0.4em">
                          YEARS OF EXCELLENCE
                        </text>

                        <text x="50%" y="360" textAnchor="middle" fontFamily="inherit" fontSize="155" fontWeight="900" letterSpacing="-0.06em">
                          100<tspan fontSize="90" dy="-50">+</tspan>
                        </text>
                        <text x="50%" y="395" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="700" letterSpacing="0.4em">
                          PROJECTS DELIVERED
                        </text>

                        <text x="50%" y="560" textAnchor="middle" fontFamily="inherit" fontSize="180" fontWeight="900" letterSpacing="-0.05em">
                          30<tspan fontSize="110" dy="-50">+</tspan>
                        </text>
                        <text x="50%" y="595" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="700" letterSpacing="0.4em">
                          EXPERT ENGINEERS
                        </text>
                      </clipPath>
                    </defs>
                    <image
                      href={waterplant}
                      width="100%"
                      height="100%"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath="url(#textClip)"
                    />
                  </svg>
                </div>

                {/* Company Profile Button below the SVG */}
                <Button
                  variant="primaryBrand"
                  href="/api/download?file=Wolgan_Brochure.pdf"
                  download="Wolgan_Brochure.pdf"
                  className="group flex gap-2 items-center px-8 h-14 text-base font-semibold rounded-full shadow-xl shadow-[#0A1F3C]/10 hover:text-white transition-colors duration-300"
                >
                  <span>Company Profile</span>
                  <div className="relative w-4 h-4 overflow-hidden mt-0.5 ml-1">
                    <ArrowUpRight className="absolute inset-0 transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
                    <ArrowUpRight className="absolute inset-0 transition-transform duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
                  </div>
                </Button>
              </div>

              {/* COLUMN 3: Mission & Vision Editorial (Span 4) */}
              <div className="lg:col-span-4 anim-right flex flex-col gap-6 justify-center">
                
                {/* Mission Card */}
                <div className="p-8 md:p-10 rounded-[2rem] border border-white shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-xl relative overflow-hidden"
                     style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)" }}>
                  <div className="absolute -top-10 -right-10 p-4 opacity-[0.02] pointer-events-none">
                    <Target className="w-48 h-48" style={{ color: "var(--brand-navy)" }} />
                  </div>
                  <div className="relative z-10">
                    <span className="block text-[10px] uppercase tracking-[0.4em] font-bold mb-4"
                      style={{ color: "rgba(var(--brand-navy-rgb), 0.4)" }}>
                      Our Mission
                    </span>
                    <p className="text-base md:text-lg font-light leading-relaxed"
                      style={{ color: "var(--brand-navy)" }}>
                      We are dedicated to providing High Quality Products and Services through our highly qualified and fully trained workforce, as well as on a constant basis through our reliable supply chain and network of Business Partners.
                    </p>
                  </div>
                </div>

                {/* Vision Card */}
                <div className="p-8 md:p-10 rounded-[2rem] border border-white shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-xl relative overflow-hidden"
                     style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)" }}>
                  <div className="absolute -top-10 -right-10 p-4 opacity-[0.02] pointer-events-none">
                    <Compass className="w-48 h-48" style={{ color: "var(--brand-navy)" }} />
                  </div>
                  <div className="relative z-10">
                    <span className="block text-[10px] uppercase tracking-[0.4em] font-bold mb-4"
                      style={{ color: "rgba(var(--brand-navy-rgb), 0.4)" }}>
                      Our Vision
                    </span>
                    <p className="text-base md:text-lg font-light leading-relaxed"
                      style={{ color: "var(--brand-navy)" }}>
                      Wolgan aims to become one of the most successful and diversified Company in the Middle East and the preferred Business Partner across Contracting Industry.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. OUR EXPERTISE — card design
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: "var(--brand-navy)" }}>
          
          {/* Mirrored Wave Divider connecting from Who We Are */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0" style={{ transform: "translateY(-1px)" }}>
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[60px] md:h-[160px]">
              <path fill="#f8f9fa" d="M0,0 L1440,0 L1440,160 C1080,40 360,280 0,160 Z"></path>
            </svg>
          </div>

          <div className="container mx-auto px-6 md:px-14 relative z-10">

            <div className="anim-up mb-16 text-center">
              <p className="text-[10px] uppercase tracking-[0.6em] font-bold mb-4 text-white/30">Our Expertise</p>
              <h2 className="text-[clamp(2.2rem,4.5vw,4.5rem)] font-light text-white leading-tight tracking-tight">
                Three divisions.<br />
                <span style={{ color: "rgba(255,255,255,0.28)" }}>One standard.</span>
              </h2>
            </div>

            <style>{`
              @keyframes gentle-drip {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-6px); }
              }
              @keyframes gear-spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes flask-wiggle {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-8deg); }
                75% { transform: rotate(8deg); }
              }

              .group:hover .anim-drip {
                animation: gentle-drip 2s ease-in-out infinite;
              }
              .group:hover .anim-spin-slow {
                animation: gear-spin-slow 4s linear infinite;
              }
              .group:hover .anim-wiggle {
                animation: flask-wiggle 1.5s ease-in-out infinite;
              }
            `}</style>

            <div className="stagger-parent grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Droplets,
                  title: "Water Treatment",
                  desc: "Advanced filtration, RO polishing, and comprehensive sewage treatment plant execution.",
                  img: deck2,
                  animClass: "anim-drip",
                },
                {
                  icon: Settings,
                  title: "Mechanical Installations",
                  desc: "Full-scale MEP execution, complex HVAC, and chilled water system integrations.",
                  img: deck3,
                  animClass: "anim-spin-slow",
                },
                {
                  icon: FlaskConical,
                  title: "Chemical Supply",
                  desc: "Reliable supply chains for specialized and commodity water treatment chemicals.",
                  img: deck1,
                  animClass: "anim-wiggle",
                },
              ].map((s, idx) => (
                <div key={s.title} className={idx === 1 ? "md:pt-12" : ""}>
                  <div className="group relative rounded-[2rem] overflow-hidden flex flex-col items-center text-center p-10 md:p-14 transition-all duration-500 hover:-translate-y-2"
                    style={{ border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                    
                    {/* Image Background */}
                    <div className="absolute inset-0 z-0 bg-[var(--brand-navy)]">
                      <Image src={s.img} alt={s.title} fill className="object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-navy)]/10 to-[var(--brand-navy)]/95 pointer-events-none" />
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 w-16 h-16 rounded-full border border-white/40 flex items-center justify-center mb-8 bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.15] group-hover:border-white/70 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      <div className={s.animClass}>
                        <s.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="relative z-10">
                      <h3 className="text-xl md:text-2xl font-light text-white mb-4">{s.title}</h3>
                      <p className="text-sm text-white/50 font-light leading-relaxed max-w-[260px] mx-auto">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════
            4. OUR PROCESS — compact numbered list
        ═══════════════════════════════════ */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden" style={{ backgroundColor: "#f8f9fb" }}>
          {/* Asymmetrical Sweeping Curve Divider (Navy flowing into White) */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0" style={{ transform: "translateY(-1px)" }}>
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[60px] md:h-[160px]">
              <path fill="var(--brand-navy)" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
            </svg>
          </div>
          <div className="container mx-auto px-6 md:px-14 relative z-10">

            <div className="anim-up mb-8">
              <p className="text-[10px] uppercase tracking-[0.6em] font-bold mb-4"
                style={{ color: "rgba(var(--brand-navy-rgb),0.28)" }}>Our Process</p>
              <h2 className="text-[clamp(2rem,4vw,4rem)] font-light tracking-tight"
                style={{ color: "var(--brand-navy)" }}>
                How we work.
              </h2>
            </div>

            <style>{`
              @keyframes wave-flow {
                to {
                  stroke-dashoffset: -24;
                }
              }
              .wave-line-flow {
                animation: wave-flow 2.5s linear infinite;
              }
            `}</style>

            <div className="relative pt-12 pb-12">
              
              {/* Dynamic flowing SVG wave path (behind cards) */}
              <div className="hidden md:block absolute top-[50%] left-[8%] right-[8%] h-[120px] pointer-events-none z-0 overflow-visible" 
                   style={{ transform: "translateY(-50%)" }}>
                <svg viewBox="0 0 1000 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  {/* Outer Glass Pipe Casing */}
                  <path d="M 0 60 C 50 20, 75 10, 125 10 C 200 10, 300 110, 375 110 C 450 110, 550 10, 625 10 C 700 10, 800 110, 875 110 C 925 110, 950 100, 1000 60" 
                    stroke="rgba(var(--brand-navy-rgb), 0.04)" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                  />
                  {/* Inner Fluid Channel Border */}
                  <path d="M 0 60 C 50 20, 75 10, 125 10 C 200 10, 300 110, 375 110 C 450 110, 550 10, 625 10 C 700 10, 800 110, 875 110 C 925 110, 950 100, 1000 60" 
                    stroke="rgba(var(--brand-navy-rgb), 0.08)" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                  />
                  {/* Dynamic High-Visibility Flowing Circular Dotted Water Current */}
                  <path d="M 0 60 C 50 20, 75 10, 125 10 C 200 10, 300 110, 375 110 C 450 110, 550 10, 625 10 C 700 10, 800 110, 875 110 C 925 110, 950 100, 1000 60" 
                    stroke="url(#wave-path-grad)" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeDasharray="6 18"
                    className="wave-line-flow"
                  />
                  <defs>
                    <linearGradient id="wave-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(var(--brand-navy-rgb), 0.18)" />
                      <stop offset="50%" stopColor="rgba(var(--brand-navy-rgb), 0.68)" />
                      <stop offset="100%" stopColor="rgba(var(--brand-navy-rgb), 0.18)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 pt-8 pb-8">
                {[
                  { num: "01", title: "Design", desc: "Rigorous site surveys and water quality analysis precision-engineered to your environment." },
                  { num: "02", title: "Build", desc: "MEP specialists deliver fully integrated installations to international standards." },
                  { num: "03", title: "Operate", desc: "Continuous monitoring and management ensuring peak performance and compliance." },
                  { num: "04", title: "Maintain", desc: "End-to-end chemical supply and maintenance contracts for year-round efficiency." },
                ].map((step, i) => (
                  <div key={step.num} className="process-step">
                    <div className={`group p-8 rounded-[2rem] border bg-white transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(var(--brand-navy-rgb),0.05)] ${
                      i % 2 === 0 ? "md:-translate-y-6" : "md:translate-y-6"
                    }`}
                      style={{ borderColor: "rgba(var(--brand-navy-rgb),0.06)" }}>
                      <span className="block text-4xl font-black mb-5 tracking-tight"
                        style={{ color: "rgba(var(--brand-navy-rgb),0.07)" }}>
                        {step.num}
                      </span>
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-3"
                        style={{ color: "var(--brand-navy)" }}>
                        {step.title}
                      </h3>
                      <p className="text-xs font-light leading-relaxed text-slate-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image reveal strip */}
            <div className="img-reveal relative mt-14 rounded-3xl overflow-hidden" style={{ height: "clamp(260px,32vw,430px)" }}>
              <Image src={deck3} alt="Wolgan operations" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 z-10 gap-8">
                <p className="text-white text-2xl md:text-4xl font-light max-w-2xl leading-snug">
                  Delivering solutions that work —{" "}
                  <span className="text-white/60">from day one, and for years after.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="headerCta"
                    href="/api/download?file=NCR_Brochure.pdf"
                    download="NCR_Brochure.pdf"
                    className="group !inline-flex gap-2 items-center px-8 h-12 text-sm font-semibold rounded-full shadow-xl"
                  >
                    <span>NCR Brochure</span>
                    <div className="relative w-4 h-4 overflow-hidden mt-0.5 ml-1">
                      <ArrowUpRight className="absolute inset-0 transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
                      <ArrowUpRight className="absolute inset-0 transition-transform duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                  </Button>
                  <Button
                    variant="headerCta"
                    href="/api/download?file=Rydlyme_Brochure.pdf"
                    download="Rydlyme_Brochure.pdf"
                    className="group !inline-flex gap-2 items-center px-8 h-12 text-sm font-semibold rounded-full shadow-xl"
                  >
                    <span>Rydlyme Brochure</span>
                    <div className="relative w-4 h-4 overflow-hidden mt-0.5 ml-1">
                      <ArrowUpRight className="absolute inset-0 transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
                      <ArrowUpRight className="absolute inset-0 transition-transform duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════
            5. INDUSTRIES — icon card grid
        ═══════════════════════════════════ */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "#f8f9fb" }}>
          <div className="container mx-auto px-6 md:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-7xl mx-auto">
              
              {/* LEFT COLUMN: 3 Cards in a Rotated Triangular Cluster (2 left, 1 right) */}
              <div className="order-2 lg:order-1 lg:col-span-4 flex justify-center">
                <div className="grid grid-cols-2 gap-8 items-center w-full max-w-[460px]">
                  {/* Left sub-column: 2 cards stacked */}
                  <div className="flex flex-col gap-8 mt-0 lg:mt-12">
                    {/* Commercial */}
                    <div className="hanging-card group relative w-full flex flex-col items-center justify-center">
                      {/* Hanging thread from above (desktop only) */}
                      <div className="hidden lg:block absolute w-[1px] h-24 -top-24 left-1/2 -translate-x-1/2 bg-gradient-to-t from-[rgba(var(--brand-navy-rgb),0.12)] to-transparent pointer-events-none" />
                      {/* Anchoring pegs */}
                      <div className="hidden lg:block absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />
                      <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />

                      {/* Card Content Panel */}
                      <div className="card-panel w-full flex flex-col items-center justify-center p-5 rounded-[1.8rem] border bg-white text-center transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(var(--brand-navy-rgb),0.06)]"
                        style={{
                          borderColor: "rgba(var(--brand-navy-rgb), 0.07)",
                          boxShadow: "0 10px 25px rgba(var(--brand-navy-rgb),0.01)"
                        }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border bg-[rgba(var(--brand-navy-rgb),0.03)] border-[rgba(var(--brand-navy-rgb),0.05)] group-hover:scale-110 group-hover:bg-[var(--brand-navy)] group-hover:border-[var(--brand-navy)] transition-all duration-500">
                          <Building2 className="w-5 h-5 text-[var(--brand-navy)] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold tracking-wide text-[var(--brand-navy)] mb-0.5">
                          Commercial
                        </span>
                        <span className="text-[11px] text-slate-400 font-light leading-tight">
                          Offices & retail
                        </span>
                      </div>
                    </div>

                    {/* Hospitality */}
                    <div className="hanging-card group relative w-full flex flex-col items-center justify-center">
                      {/* Connecting thread to Commercial card above */}
                      <div className="absolute w-[1px] h-8 -top-8 left-1/2 -translate-x-1/2 bg-[rgba(var(--brand-navy-rgb),0.12)] pointer-events-none" />
                      {/* Anchoring peg */}
                      <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />

                      {/* Card Content Panel */}
                      <div className="card-panel w-full flex flex-col items-center justify-center p-5 rounded-[1.8rem] border bg-white text-center transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(var(--brand-navy-rgb),0.06)]"
                        style={{
                          borderColor: "rgba(var(--brand-navy-rgb), 0.07)",
                          boxShadow: "0 10px 25px rgba(var(--brand-navy-rgb),0.01)"
                        }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border bg-[rgba(var(--brand-navy-rgb),0.03)] border-[rgba(var(--brand-navy-rgb),0.05)] group-hover:scale-110 group-hover:bg-[var(--brand-navy)] group-hover:border-[var(--brand-navy)] transition-all duration-500">
                          <Hotel className="w-5 h-5 text-[var(--brand-navy)] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold tracking-wide text-[var(--brand-navy)] mb-0.5">
                          Hospitality
                        </span>
                        <span className="text-[11px] text-slate-400 font-light leading-tight">
                          Resorts & hotels
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right sub-column: 2 cards stacked */}
                  <div className="flex flex-col gap-8">
                    {/* Industrial */}
                    <div className="hanging-card group relative w-full flex flex-col items-center justify-center">
                      {/* Hanging thread from above (desktop only) */}
                      <div className="hidden lg:block absolute w-[1px] h-24 -top-24 left-1/2 -translate-x-1/2 bg-gradient-to-t from-[rgba(var(--brand-navy-rgb),0.12)] to-transparent pointer-events-none" />
                      {/* Anchoring pegs */}
                      <div className="hidden lg:block absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />
                      <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />

                      {/* Card Content Panel */}
                      <div className="card-panel w-full flex flex-col items-center justify-center p-5 rounded-[1.8rem] border bg-white text-center transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(var(--brand-navy-rgb),0.06)]"
                        style={{
                          borderColor: "rgba(var(--brand-navy-rgb), 0.07)",
                          boxShadow: "0 10px 25px rgba(var(--brand-navy-rgb),0.01)"
                        }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border bg-[rgba(var(--brand-navy-rgb),0.03)] border-[rgba(var(--brand-navy-rgb),0.05)] group-hover:scale-110 group-hover:bg-[var(--brand-navy)] group-hover:border-[var(--brand-navy)] transition-all duration-500">
                          <Factory className="w-5 h-5 text-[var(--brand-navy)] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold tracking-wide text-[var(--brand-navy)] mb-0.5">
                          Industrial
                        </span>
                        <span className="text-[11px] text-slate-400 font-light leading-tight">
                          Plants & heavy manufacturing
                        </span>
                      </div>
                    </div>

                    {/* Residential */}
                    <div className="hanging-card group relative w-full flex flex-col items-center justify-center">
                      {/* Connecting thread to Industrial card above */}
                      <div className="absolute w-[1px] h-8 -top-8 left-1/2 -translate-x-1/2 bg-[rgba(var(--brand-navy-rgb),0.12)] pointer-events-none" />
                      {/* Anchoring peg */}
                      <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />

                      {/* Card Content Panel */}
                      <div className="card-panel w-full flex flex-col items-center justify-center p-5 rounded-[1.8rem] border bg-white text-center transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(var(--brand-navy-rgb),0.06)]"
                        style={{
                          borderColor: "rgba(var(--brand-navy-rgb), 0.07)",
                          boxShadow: "0 10px 25px rgba(var(--brand-navy-rgb),0.01)"
                        }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border bg-[rgba(var(--brand-navy-rgb),0.03)] border-[rgba(var(--brand-navy-rgb),0.05)] group-hover:scale-110 group-hover:bg-[var(--brand-navy)] group-hover:border-[var(--brand-navy)] transition-all duration-500">
                          <Home className="w-5 h-5 text-[var(--brand-navy)] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold tracking-wide text-[var(--brand-navy)] mb-0.5">
                          Residential
                        </span>
                        <span className="text-[11px] text-slate-400 font-light leading-tight">
                          Towers & communities
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: Centered Header Text */}
              <div className="order-1 lg:order-2 lg:col-span-4 text-center px-4 flex flex-col items-center justify-center">
                <p className="anim-up text-[10px] uppercase tracking-[0.5em] font-bold mb-4"
                  style={{ color: "rgba(var(--brand-navy-rgb), 0.35)" }}>
                  Industries We Serve
                </p>
                <h2 className="anim-up text-[clamp(2.2rem,4vw,3.5rem)] font-light leading-tight tracking-tight mb-5"
                  style={{ color: "var(--brand-navy)" }}>
                  Across Sectors
                </h2>
                <p className="anim-up text-sm md:text-base font-light leading-relaxed max-w-[480px] mx-auto"
                  style={{ color: "rgba(var(--brand-navy-rgb), 0.55)" }}>
                  Trusted by leading organizations in critical industries demanding the highest standards of quality and reliability.
                </p>
              </div>

              {/* RIGHT COLUMN: 4 Cards (2 left, 2 right) */}
              <div className="order-3 lg:order-3 lg:col-span-4 flex justify-center">
                <div className="grid grid-cols-2 gap-8 items-center w-full max-w-[460px]">
                  {/* Left sub-column: 2 cards stacked */}
                  <div className="flex flex-col gap-8">
                    {/* Municipal */}
                    <div className="hanging-card group relative w-full flex flex-col items-center justify-center">
                      {/* Hanging thread from above (desktop only) */}
                      <div className="hidden lg:block absolute w-[1px] h-24 -top-24 left-1/2 -translate-x-1/2 bg-gradient-to-t from-[rgba(var(--brand-navy-rgb),0.12)] to-transparent pointer-events-none" />
                      {/* Anchoring pegs */}
                      <div className="hidden lg:block absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />
                      <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />

                      {/* Card Content Panel */}
                      <div className="card-panel w-full flex flex-col items-center justify-center p-5 rounded-[1.8rem] border bg-white text-center transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(var(--brand-navy-rgb),0.06)]"
                        style={{
                          borderColor: "rgba(var(--brand-navy-rgb), 0.07)",
                          boxShadow: "0 10px 25px rgba(var(--brand-navy-rgb),0.01)"
                        }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border bg-[rgba(var(--brand-navy-rgb),0.03)] border-[rgba(var(--brand-navy-rgb),0.05)] group-hover:scale-110 group-hover:bg-[var(--brand-navy)] group-hover:border-[var(--brand-navy)] transition-all duration-500">
                          <Landmark className="w-5 h-5 text-[var(--brand-navy)] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold tracking-wide text-[var(--brand-navy)] mb-0.5">
                          Municipal
                        </span>
                        <span className="text-[11px] text-slate-400 font-light leading-tight">
                          Civic infrastructure
                        </span>
                      </div>
                    </div>

                    {/* Food & Beverage */}
                    <div className="hanging-card group relative w-full flex flex-col items-center justify-center">
                      {/* Connecting thread to Municipal card above */}
                      <div className="absolute w-[1px] h-8 -top-8 left-1/2 -translate-x-1/2 bg-[rgba(var(--brand-navy-rgb),0.12)] pointer-events-none" />
                      {/* Anchoring peg */}
                      <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />

                      {/* Card Content Panel */}
                      <div className="card-panel w-full flex flex-col items-center justify-center p-5 rounded-[1.8rem] border bg-white text-center transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(var(--brand-navy-rgb),0.06)]"
                        style={{
                          borderColor: "rgba(var(--brand-navy-rgb), 0.07)",
                          boxShadow: "0 10px 25px rgba(var(--brand-navy-rgb),0.01)"
                        }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border bg-[rgba(var(--brand-navy-rgb),0.03)] border-[rgba(var(--brand-navy-rgb),0.05)] group-hover:scale-110 group-hover:bg-[var(--brand-navy)] group-hover:border-[var(--brand-navy)] transition-all duration-500">
                          <Utensils className="w-5 h-5 text-[var(--brand-navy)] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold tracking-wide text-[var(--brand-navy)] mb-0.5">
                          Food & Beverage
                        </span>
                        <span className="text-[11px] text-slate-400 font-light leading-tight">
                          Processing & production
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right sub-column: 2 cards stacked */}
                  <div className="flex flex-col gap-8 mt-0 lg:mt-12">
                    {/* Oil & Gas */}
                    <div className="hanging-card group relative w-full flex flex-col items-center justify-center">
                      {/* Hanging thread from above (desktop only) */}
                      <div className="hidden lg:block absolute w-[1px] h-24 -top-24 left-1/2 -translate-x-1/2 bg-gradient-to-t from-[rgba(var(--brand-navy-rgb),0.12)] to-transparent pointer-events-none" />
                      {/* Anchoring pegs */}
                      <div className="hidden lg:block absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />
                      <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />

                      {/* Card Content Panel */}
                      <div className="card-panel w-full flex flex-col items-center justify-center p-5 rounded-[1.8rem] border bg-white text-center transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(var(--brand-navy-rgb),0.06)]"
                        style={{
                          borderColor: "rgba(var(--brand-navy-rgb), 0.07)",
                          boxShadow: "0 10px 25px rgba(var(--brand-navy-rgb),0.01)"
                        }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border bg-[rgba(var(--brand-navy-rgb),0.03)] border-[rgba(var(--brand-navy-rgb),0.05)] group-hover:scale-110 group-hover:bg-[var(--brand-navy)] group-hover:border-[var(--brand-navy)] transition-all duration-500">
                          <Flame className="w-5 h-5 text-[var(--brand-navy)] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold tracking-wide text-[var(--brand-navy)] mb-0.5">
                          Oil & Gas
                        </span>
                        <span className="text-[11px] text-slate-400 font-light leading-tight">
                          Refineries & rigs
                        </span>
                      </div>
                    </div>

                    {/* District Cooling */}
                    <div className="hanging-card group relative w-full flex flex-col items-center justify-center">
                      {/* Connecting thread to Oil & Gas card above */}
                      <div className="absolute w-[1px] h-8 -top-8 left-1/2 -translate-x-1/2 bg-[rgba(var(--brand-navy-rgb),0.12)] pointer-events-none" />
                      {/* Anchoring peg */}
                      <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-navy)] opacity-60 z-10" />

                      {/* Card Content Panel */}
                      <div className="card-panel w-full flex flex-col items-center justify-center p-5 rounded-[1.8rem] border bg-white text-center transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(var(--brand-navy-rgb),0.06)]"
                        style={{
                          borderColor: "rgba(var(--brand-navy-rgb), 0.07)",
                          boxShadow: "0 10px 25px rgba(var(--brand-navy-rgb),0.01)"
                        }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border bg-[rgba(var(--brand-navy-rgb),0.03)] border-[rgba(var(--brand-navy-rgb),0.05)] group-hover:scale-110 group-hover:bg-[var(--brand-navy)] group-hover:border-[var(--brand-navy)] transition-all duration-500">
                          <Snowflake className="w-5 h-5 text-[var(--brand-navy)] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold tracking-wide text-[var(--brand-navy)] mb-0.5">
                          District Cooling
                        </span>
                        <span className="text-[11px] text-slate-400 font-light leading-tight">
                          Centralized plants
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. REGIONAL PRESENCE — kept
        ═══════════════════════════════════ */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden" style={{ backgroundColor: "var(--brand-navy)" }}>
          {/* Asymmetrical Sweeping Curve Divider (White flowing into Navy) */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0" style={{ transform: "translateY(-1px)" }}>
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[60px] md:h-[160px]">
              <path fill="#f8f9fb" d="M0,0 L1440,0 L1440,160 C1080,40 360,280 0,160 Z"></path>
            </svg>
          </div>
          <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl relative z-10">
            <div className="anim-up w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 border"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
              <Globe2 className="w-7 h-7 text-white/80" />
            </div>
            <p className="anim-up text-[10px] uppercase tracking-[0.5em] font-bold text-white/40 mb-6">Regional Presence</p>
            <h2 className="anim-up text-5xl md:text-7xl font-light tracking-tight text-white mb-10">
              Qatar <span className="text-white/20 mx-3">|</span> UAE{" "}
              <span className="text-white/20 mx-3">|</span> India
            </h2>
            <p className="anim-up text-base md:text-lg text-white/50 font-light leading-relaxed max-w-2xl mx-auto mt-6">
              Operating dynamic engineering hubs and specialized distribution networks across Qatar, UAE, and India to deliver industry-leading water treatment systems, MEP contracting services, and industrial chemical solutions.
            </p>

          </div>
        </section>

        {/* ═══════════════════════════════════
            7. CTA — kept
        ═══════════════════════════════════ */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden" style={{ backgroundColor: "#f8f9fb" }}>
          {/* Asymmetrical Sweeping Curve Divider (Navy flowing into White) */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0" style={{ transform: "translateY(-1px)" }}>
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[60px] md:h-[160px]">
              <path fill="var(--brand-navy)" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
            </svg>
          </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="cta-card relative rounded-[2.5rem] p-12 md:p-20 overflow-hidden"
              style={{ backgroundColor: "var(--brand-navy)" }}>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-light leading-[1.1] text-white mb-5">
                    Ready to discuss your project?
                  </h2>
                  <p className="text-white/50 text-lg font-light">
                    Become our preferred business partner across the contracting industry.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    variant="heroServicesCta"
                    href="/contact"
                    className="group flex gap-2 h-16 px-10 text-lg font-semibold rounded-full"
                  >
                    <span>Contact Team</span>
                    <div className="relative w-4 h-4 overflow-hidden mt-0.5 ml-1">
                      <ArrowUpRight className="absolute inset-0 transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
                      <ArrowUpRight className="absolute inset-0 transition-transform duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}

export function AboutPage() {
  return (
    <ResponsiveWrapper
      desktop={<DesktopAboutPage />}
      mobile={<MobileAboutPage />}
    />
  );
}

