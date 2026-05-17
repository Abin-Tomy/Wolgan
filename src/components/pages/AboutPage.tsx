"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Typography } from "@/components/ui/Typography";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { 
  Droplets, 
  Settings, 
  FlaskConical, 
  Globe2,
  ChevronRight,
  Eye,
  Target
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Modern Hero Reveal (fades & text slide)
      const tl = gsap.timeline();
      
      tl.fromTo(".reveal-text", {
        y: 100,
        opacity: 0,
        rotateX: -45,
        transformOrigin: "0% 0% -50px"
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
      })
      .fromTo(".reveal-fade", {
        opacity: 0,
        filter: "blur(10px)",
        y: 20
      }, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.6");

      // Parallax effect for Hero Image
      gsap.to(".hero-image", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Section Clip-Path Reveals
      gsap.utils.toArray(".clip-section").forEach((section: any) => {
        gsap.fromTo(section, {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
        }, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          }
        });
      });

      // Staggered Cards Reveal
      gsap.utils.toArray(".cards-grid").forEach((grid: any) => {
        const cards = grid.querySelectorAll(".modern-card");
        gsap.fromTo(cards, {
          y: 100,
          opacity: 0,
          scale: 0.9
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
          }
        });
      });

      // Horizontal Scroll Text
      gsap.to(".scroll-text", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-text-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="bg-[#040D1A] min-h-screen text-white selection:bg-white/20 selection:text-[#040D1A] overflow-hidden">
        <Header />
        
        {/* ── High-End Hero Section ── */}
        <section ref={heroRef} className="relative h-screen flex flex-col justify-end pb-24 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about/hero.png"
              alt="Water Treatment Facility"
              fill
              className="hero-image object-cover opacity-60 brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A] via-[#040D1A]/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#040D1A]/80 via-transparent to-transparent z-10" />
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="max-w-4xl" style={{ perspective: "1000px" }}>
                <div className="overflow-hidden mb-6">
                  <div className="reveal-text inline-flex items-center gap-4 px-5 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/80">About Wolgan</span>
                  </div>
                </div>
                
                <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.85] tracking-tighter mb-8">
                  <div className="overflow-hidden"><div className="reveal-text text-white/90">A Legacy Of</div></div>
                  <div className="overflow-hidden"><div className="reveal-text text-white">Excellence.</div></div>
                </h1>
              </div>

              <div className="max-w-sm pb-4 reveal-fade">
                <p className="text-lg text-white/70 leading-relaxed font-light mb-8">
                  An established and reputed Contracting Company in Qatar serving exceptional service across the Middle East.
                </p>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="rounded-full px-8 h-14 bg-white text-[#0A1F3C] hover:bg-white/90 font-semibold transition-all">
                    Discover Our Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section className="py-32 md:py-48 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-4 reveal-fade">
                <Typography variant="tagline" className="text-white/40 mb-4">Our Story</Typography>
                <Typography variant="h2" className="text-4xl md:text-5xl font-light leading-tight">
                  Entrepreneurial <br />
                  <span className="italic text-white/80">Leadership & Vision</span>
                </Typography>
              </div>
              
              <div className="lg:col-span-8 lg:pl-12 border-t border-white/10 pt-12">
                <div className="reveal-fade space-y-8 text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-4xl">
                  <p>
                    Wolgan is an established and reputed Contracting Company in Qatar that serves exceptional service in the area of Water Treatment, Mechanical Installations, Chemical Supply and more.
                  </p>
                  <p className="text-white/60 text-lg md:text-xl">
                    The Company has flourished through a combination of entrepreneurial leadership, courage and vision and has expanded its business activities. Wolgan continuously explores opportunities to establish joint ventures and strategic alliances in heterogeneous lines of specialization to provide advanced products and services for customers looking to produce energy efficiently, reliably, cost-effectively and with greater awareness of environmental responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="py-32 bg-[#0A1F3C] relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              
              {/* Mission */}
              <div className="reveal-fade group relative p-12 md:p-16 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.4em] font-bold text-white/50 mb-6">Our Mission</h3>
                <p className="text-3xl md:text-4xl font-light leading-snug text-white/90">
                  We are dedicated to providing <span className="text-white font-medium">High Quality Products and Services</span> through our highly qualified and fully trained workforce, as well as on a constant basis through our reliable supply chain and network of Business Partners.
                </p>
              </div>

              {/* Vision */}
              <div className="reveal-fade group relative p-12 md:p-16 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-100" />
                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.4em] font-bold text-white/50 mb-6">Our Vision</h3>
                <p className="text-3xl md:text-4xl font-light leading-snug text-white/90">
                  Wolgan aims to become one of the most <span className="text-white font-medium italic">successful and diversified</span> Companies in Qatar and the preferred Business Partner across the Contracting Industry.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── High-level Specializations ── */}
        <section className="py-32 md:py-48 bg-[#040D1A]">
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-24 text-center max-w-3xl mx-auto reveal-fade">
              <Typography variant="tagline" className="text-white/40 mb-4">Heterogeneous Lines of Specialization</Typography>
              <Typography variant="h2" className="text-5xl md:text-6xl font-light">Divisions of Expertise</Typography>
              <p className="mt-6 text-lg text-white/60 font-light">
                Delivering advanced products and services for customers looking to produce energy efficiently, reliably, and cost-effectively.
              </p>
            </div>

            <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Division 1 */}
              <div className="modern-card group p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 flex flex-col items-center text-center hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Droplets className="w-8 h-8 text-white/80" />
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Water Treatment</h3>
                <p className="text-white/50 font-light leading-relaxed">
                  Advanced filtration, RO polishing, and comprehensive sewage treatment plant execution.
                </p>
              </div>

              {/* Division 2 */}
              <div className="modern-card group p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 flex flex-col items-center text-center hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:rotate-45 transition-transform duration-500">
                  <Settings className="w-8 h-8 text-white/80" />
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Mechanical Installations</h3>
                <p className="text-white/50 font-light leading-relaxed">
                  Full-scale MEP execution, complex HVAC, and chilled water system integrations.
                </p>
              </div>

              {/* Division 3 */}
              <div className="modern-card group p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 flex flex-col items-center text-center hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:-translate-y-2 transition-transform duration-500">
                  <FlaskConical className="w-8 h-8 text-white/80" />
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Chemical Supply</h3>
                <p className="text-white/50 font-light leading-relaxed">
                  Reliable supply chains for specialized and commodity water treatment chemicals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Image Break ── */}
        <section className="clip-section relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/about/detail.png"
              alt="Engineering Precision"
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-[#0A1F3C]/60 mix-blend-multiply" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-light leading-tight text-white">
              Working with greater awareness of <span className="italic font-medium">Environmental Responsibility.</span>
            </h2>
          </div>
        </section>

        {/* ── Regional Presence ── */}
        <section className="py-32 bg-[#040D1A] border-b border-white/5">
          <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl reveal-fade">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10">
              <Globe2 className="w-8 h-8 text-white/80" />
            </div>
            <Typography variant="tagline" className="text-white/40 mb-6">Regional Presence</Typography>
            <Typography variant="h2" className="text-5xl md:text-7xl font-light tracking-tight mb-12">
              Qatar <span className="text-white/20 mx-4">|</span> UAE <span className="text-white/20 mx-4">|</span> India
            </Typography>
            <p className="text-xl text-white/50 font-light uppercase tracking-widest">
              Doha &nbsp; • &nbsp; Dubai &nbsp; • &nbsp; Pune
            </p>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-32">
          <div className="container mx-auto px-6 md:px-12">
            <div className="clip-section relative bg-[#0A1F3C] border border-white/10 rounded-[3rem] p-12 md:p-24 overflow-hidden group">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 group-hover:bg-white/[0.05] transition-colors duration-1000" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 text-center md:text-left">
                <div className="max-w-2xl">
                  <h2 className="text-5xl md:text-7xl font-light leading-[1.1] text-white mb-6">
                    Ready to discuss your project?
                  </h2>
                  <p className="text-white/60 text-xl font-light">
                    Become our preferred business partner across the contracting industry.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Button variant="outline" className="rounded-full px-10 h-20 text-xl font-semibold bg-white text-[#0A1F3C] hover:scale-105 transition-transform duration-300 flex items-center gap-4">
                    Contact Team
                    <div className="w-10 h-10 rounded-full bg-[#0A1F3C]/10 flex items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-[#0A1F3C]" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </SmoothScroll>
  );
}
