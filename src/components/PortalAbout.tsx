"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import deck1 from "@/assets/about-deck-1.jpg";
import deck2 from "@/assets/about-deck-2.jpg";
import deck3 from "@/assets/about-deck-3.jpg";
import aboutWaterPlant from "@/assets/about-waterplant.webp";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const SERVICES_DATA = [
  {
    title: "Water Treatment",
    desc: "Specialized filtration, desalination, and purification systems tailored for industrial and commercial excellence.",
    img: deck1,
  },
  {
    title: "Mechanical Installation",
    desc: "Precision MEP execution and large-scale mechanical infrastructure for healthcare and hospitality sectors.",
    img: deck2,
  },
  {
    title: "Chemical Supply",
    desc: "A comprehensive range of specialized chemical solutions for cooling towers, boilers, and industrial processes.",
    img: deck3,
  },
  {
    title: "Electrical Maintenance",
    desc: "Complete electrical maintenance and installation services, ensuring efficiency and safety in water systems.",
    img: aboutWaterPlant,
  },
];

/**
 * Portal transition — 3-phase pinned scroll sequence:
 *  Phase 1 → Pill opens to reveal full-screen image
 *  Phase 2 → Text fades in over image (current end state)
 *  Phase 3 → Image shrinks into a left-side card; text slides to right; white BG revealed
 */
export function PortalAbout() {
  const rootRef = useRef<HTMLElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  // The wrapping div that holds the image and stays positioned
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);
  const img3Ref = useRef<HTMLDivElement | null>(null);
  const img4Ref = useRef<HTMLDivElement | null>(null);
  // The content that starts centred over the image then moves left
  const textRef = useRef<HTMLDivElement | null>(null);
  // The atmospheric paragraph that fades out to make room for details
  const introParaRef = useRef<HTMLParagraphElement | null>(null);
  // The detailed content that fades in later
  const detailRef = useRef<HTMLDivElement | null>(null);
  // The glassmorphic stat card
  const statCardRef = useRef<HTMLDivElement | null>(null);
  // Veil overlay text (top-left / bottom-right labels)
  const veilContentRef = useRef<HTMLDivElement | null>(null);
  // SVG Path references for morphing
  const path1Ref = useRef<SVGPathElement | null>(null);
  const path2Ref = useRef<SVGPathElement | null>(null);
  const path3Ref = useRef<SVGPathElement | null>(null);
  const path4Ref = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const veil = veilRef.current!;
      const obj = { hole: 0 };

      // Pre-sync GSAP's transform tracking with the inline CSS translate(-50%,-50%).
      // Without this, Phase 3 animates xPercent 0→-50 causing a visible snap.
      gsap.set(textRef.current, { xPercent: -50, yPercent: -50 });

      /* ── Extended timeline: 1200% for maximum smoothness ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1, // More responsive
          pin: true,
          anticipatePin: 1,
        },
      });

      /* ── Phase 1 (0 → 0.35): Pill opens ── */
      tl.to(
        obj,
        {
          hole: 160,
          ease: "power2.inOut",
          onUpdate: () => {
            veil.style.setProperty("--hole-w", `${12 + obj.hole}vmax`);
            veil.style.setProperty("--hole-h", `${22 + obj.hole * 1.8}vmax`);
          },
        },
        0,
      )
        .to(logoRef.current, { scale: 8, opacity: 0, ease: "power2.in" }, 0)
        .to(veilContentRef.current, { opacity: 0, scale: 0.95, ease: "power2.inOut" }, 0)

        /* ── Phase 2 (0.35 → 0.55): text fades in centred ── */
        .from(
          textRef.current,
          // Use yPercent instead of 'y' to keep everything in the transform matrix
          { opacity: 0, yPercent: 20, force3D: true, ease: "power2.out" },
          0.35,
        )

        /* ── Phase 3 (0.55 → 1.0): "Card Deck" Fan Unfolds ── */
        .to(
          imgWrapRef.current,
          {
            width: "22%",
            height: "60vh",
            left: "72%", // Pulled further from margin
            top: "58%",
            yPercent: -50,
            xPercent: 0,
            rotation: 0,
            borderRadius: "28px",
            border: "8px solid #ffffff",
            boxShadow: "0 0 0 1px rgba(10, 31, 60, 0.1)",
            ease: "power3.inOut",
          },
          0.55,
        )
        // Card 2
        .fromTo(
          img2Ref.current,
          { opacity: 0, scale: 0.8, rotation: 0 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            left: "66%", // Pulled further from margin
            top: "58%",
            yPercent: -50,
            width: "22%",
            height: "60vh",
            borderRadius: "28px",
            border: "8px solid #ffffff",
            boxShadow: "0 0 0 1px rgba(10, 31, 60, 0.1)",
            ease: "power3.out",
          },
          0.6,
        )
        // Card 3
        .fromTo(
          img3Ref.current,
          { opacity: 0, scale: 0.8, rotation: 0 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            left: "60%", // Pulled further from margin
            top: "58%",
            yPercent: -50,
            width: "22%",
            height: "60vh",
            borderRadius: "28px",
            border: "8px solid #ffffff",
            boxShadow: "0 0 0 1px rgba(10, 31, 60, 0.1)",
            ease: "power3.out",
          },
          0.65,
        )
        // Card 4
        .fromTo(
          img4Ref.current,
          { opacity: 0, scale: 0.8, rotation: 0 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            left: "54%", // Pulled further from margin
            top: "58%",
            yPercent: -50,
            width: "22%",
            height: "60vh",
            borderRadius: "28px",
            border: "8px solid #ffffff",
            boxShadow: "0 0 0 1px rgba(10, 31, 60, 0.1)",
            ease: "power3.out",
          },
          0.7,
        )
        // Glassmorphic Stat Card positioned at the bottom-left of the right container
        .fromTo(
          statCardRef.current,
          { opacity: 0, scale: 0.5, y: 50, rotation: 0 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            left: "55%", // Nudged tiny bit right
            top: "78%",
            ease: "back.out(1.7)",
          },
          0.8,
        )

        // SVG Path Morphs
        .to(path1Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.55)
        .to(path2Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.6)
        .to(path3Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.65)
        .to(path4Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.7)

        // Move text anchor to the LEFT (perfectly aligned with maximum breathing room)
        .to(
          textRef.current,
          {
            left: "6%",
            xPercent: 0,
            yPercent: -50,
            width: "40vw",
            color: "#0a1f3c",
            textAlign: "left",
            items: "flex-start",
            force3D: true,
            ease: "power3.inOut",
          },
          0.55,
        )

        /* ── Phase 4 (1.0 → 1.4): Parallax Float ── */
        .to(imgWrapRef.current, { yPercent: -54, rotation: 0, ease: "none" }, 1.0)
        .to(img2Ref.current, { yPercent: -54, rotation: 0, ease: "none" }, 1.0)
        .to(img3Ref.current, { yPercent: -54, rotation: 0, ease: "none" }, 1.0)
        .to(img4Ref.current, { yPercent: -54, rotation: 0, ease: "none" }, 1.0)
        .to(statCardRef.current, { y: -60, x: -10, rotation: 0, ease: "none" }, 1.0)
        
        .to(
          textRef.current,
          {
            top: "15%",
            yPercent: 0,
            scale: 0.8,
            transformOrigin: "left top",
            ease: "power3.inOut",
          },
          1.0,
        )
        .to(
          introParaRef.current,
          { opacity: 0, y: -20, pointerEvents: "none", ease: "power3.inOut" },
          1.0
        )
        .fromTo(
          detailRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
          },
          1.1,
        )

        /* ── Phase 5 (1.5 → 2.5): The Deep Portal Transition (TEMPORARILY DISABLED) ── */
        /*
        // 1. Fade the whole background to Deep Navy
        .to(rootRef.current, { backgroundColor: "#0A1F3C", duration: 1 }, 1.5)
        
        .to([textRef.current, detailRef.current, statCardRef.current], { 
          opacity: 0, 
          y: -100, 
          stagger: 0.1,
          ease: "expo.inOut" 
        }, 1.5)

        // Reveal "Our Services" Heading in White
        .fromTo(".services-main-title", 
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, ease: "expo.out", color: "#ffffff" },
          1.8
        )

        // Consolidate cards into a central vertical deck
        .to([imgWrapRef.current, img2Ref.current, img3Ref.current, img4Ref.current], {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          rotation: 0,
          width: "14vw",
          height: "22vw",
          borderRadius: "999px", // Solid pill shape
          border: "2px solid rgba(255,255,255,0.2)",
          stagger: { each: 0.05, from: "end" },
          ease: "expo.inOut",
        }, 1.8)

        // Phase 6 (2.5 → 10.0): The Biker Arc Cycle
        .addLabel("servicesStart", 2.5)

        // Fade in the Glowing Arc Line
        .to(".service-arc-path", { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" }, "servicesStart");

        const cardsArr = [imgWrapRef.current, img2Ref.current, img3Ref.current, img4Ref.current];
        
        // Deep Arc coordinates (Refined Scale)
        const arcPositions = [
          { x: -28, y: 30, scale: 0.4, opacity: 0.5 }, 
          { x: -15, y: 42, scale: 0.4, opacity: 0.8 }, 
          { x: 15, y: 42, scale: 0.4, opacity: 0.8 },  
          { x: 28, y: 30, scale: 0.4, opacity: 0.5 }   
        ];

        SERVICES_DATA.forEach((_, i) => {
          const startTime = 2.5 + i * 2.5;

          // 1. Activate Central Pill (Reduced Size)
          tl.to(cardsArr[i], {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            opacity: 1,
            zIndex: 500,
            width: "18vw",
            height: "28vw",
            borderRadius: "999px", // Hard-locked pill shape
            border: "2px solid #ff7e33", 
            ease: "expo.inOut",
            duration: 1.5
          }, startTime);

          // 2. Side Content Reveal
          tl.fromTo(`.service-side-left-${i}`, 
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 1 },
            startTime + 0.5
          );
          tl.fromTo(`.service-side-right-${i}`, 
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 1 },
            startTime + 0.5
          );
          tl.to(`.service-details-${i}`, { opacity: 1, duration: 1 }, startTime + 0.8);

          // 3. Move other cards to Deep Arc (Reduced Size)
          cardsArr.forEach((otherCard, j) => {
            if (i === j) return;
            
            let posIdx = j < i ? j : j - 1;
            const pos = arcPositions[posIdx];

            tl.to(otherCard, {
              left: `${50 + pos.x}%`,
              top: `${50 + pos.y}%`,
              scale: pos.scale,
              opacity: pos.opacity,
              zIndex: 100 - Math.abs(pos.x),
              width: "12vw",
              height: "12vw",
              borderRadius: "999px", // Locked circle/pill shape
              border: "1px solid rgba(255,255,255,0.3)",
              ease: "expo.inOut",
              duration: 1.5
            }, startTime);
          });

          // 4. Exit text before next service
          if (i < SERVICES_DATA.length - 1) {
            tl.to([`.service-side-left-${i}`, `.service-side-right-${i}`, `.service-details-${i}`], {
              opacity: 0,
              y: -30,
              duration: 0.8
            }, startTime + 2.2);
          }
        });
        */
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden font-montserrat font-normal"
      style={{ backgroundColor: "#ffffff" }}
    >

      {/* ── Collage SVG Definitions ── */}
      <svg className="absolute w-0 h-0 overflow-hidden">
        <defs>
          <clipPath id="clipShard1" clipPathUnits="objectBoundingBox">
            <path ref={path1Ref} d="M 0 0 L 1 0 L 1 1 L 0 1 Z" />
          </clipPath>
          <clipPath id="clipShard2" clipPathUnits="objectBoundingBox">
            <path ref={path2Ref} d="M 0 0 L 1 0 L 1 1 L 0 1 Z" />
          </clipPath>
          <clipPath id="clipShard3" clipPathUnits="objectBoundingBox">
            <path ref={path3Ref} d="M 0 0 L 1 0 L 1 1 L 0 1 Z" />
          </clipPath>
          <clipPath id="clipShard4" clipPathUnits="objectBoundingBox">
            <path ref={path4Ref} d="M 0 0 L 1 0 L 1 1 L 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={imgWrapRef}
        className="absolute overflow-hidden border-white/5"
        style={{
          inset: 0,
          width: "100%",
          height: "100%",
          clipPath: "url(#clipShard1)",
          zIndex: 10,
          outline: "1px solid rgba(10, 31, 60, 0.08)",
        }}
      >
        <Image src={deck1} alt={SERVICES_DATA[0].title} className="h-full w-full object-cover" fill sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div
        ref={img2Ref}
        className="absolute overflow-hidden opacity-0 bg-white"
        style={{ clipPath: "url(#clipShard2)", zIndex: 9, outline: "1px solid rgba(10, 31, 60, 0.08)" }}
      >
        <Image src={deck2} alt={SERVICES_DATA[1].title} className="h-full w-full object-cover" fill sizes="30vw" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div
        ref={img3Ref}
        className="absolute overflow-hidden opacity-0 bg-white"
        style={{ clipPath: "url(#clipShard3)", zIndex: 8, outline: "1px solid rgba(10, 31, 60, 0.08)" }}
      >
        <Image src={deck3} alt={SERVICES_DATA[2].title} className="h-full w-full object-cover" fill sizes="20vw" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div
        ref={img4Ref}
        className="absolute overflow-hidden opacity-0 bg-white"
        style={{ clipPath: "url(#clipShard4)", zIndex: 7, outline: "1px solid rgba(10, 31, 60, 0.08)" }}
      >
        <Image src={aboutWaterPlant} alt={SERVICES_DATA[3].title} className="h-full w-full object-cover" fill sizes="20vw" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ── Services Section Overlay (TEMPORARILY DISABLED) ── */}
      {/*
      <div className="absolute inset-0 pointer-events-none z-[100]">
        <div className="services-main-title absolute top-12 left-1/2 -translate-x-1/2 text-center opacity-0">
          <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-white opacity-30 mb-2">Our Solutions</p>
          <h2 className="font-montserrat font-normal text-4xl text-white">Our Services</h2>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 service-arc-path" viewBox="0 0 100 100">
           <path 
             d="M 20 70 Q 50 100 80 70" 
             fill="none" 
             stroke="#ff7e33" 
             strokeWidth="0.2" 
             strokeDasharray="100 100"
             strokeDashoffset="100"
             opacity="0.6"
           />
        </svg>

        {SERVICES_DATA.map((service, i) => (
          <div key={i} className="absolute inset-0">
            <div className={`service-side-left-${i} absolute left-[8%] top-[50%] -translate-y-1/2 w-[22vw] opacity-0 text-white`}>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-8 h-[1px] bg-[#ff7e33]" />
                 <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white opacity-40">Precision</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-montserrat font-normal text-white leading-tight mb-8">
                {service.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed opacity-70">
                {service.desc.split('. ')[0]}.
              </p>
            </div>

            <div className={`service-side-right-${i} absolute right-[8%] top-[50%] -translate-y-1/2 w-[22vw] opacity-0 text-right text-white`}>
              <div className="mb-6 flex justify-end">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                   <span className="text-white font-montserrat font-normal text-2xl">0{i+1}</span>
                </div>
              </div>
              <p className="text-sm md:text-base leading-relaxed opacity-70">
                {service.desc.split('. ')[1] || service.desc}
              </p>
            </div>

          </div>
        ))}
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20">
           <p className="text-[9px] uppercase tracking-[1em] text-white font-bold">Wolgan Standards</p>
        </div>
      </div>
      */}

      {/* ── Content: starts centred, slides LEFT ── */}
      <div
        ref={textRef}
        className="flex flex-col items-center lg:items-start px-6"
        style={{
          color: "#ffffff",
          zIndex: 10,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          textAlign: "center"
        }}
      >
        <div className="flex items-center gap-4 mb-6 group">
          <div className="w-10 h-[1px] bg-[var(--brand-gold)] transition-all duration-700 group-hover:w-16" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-inherit opacity-70">
            About Wolgan
          </span>
        </div>
        <h2
          className="font-normal leading-[0.95] tracking-tight text-center lg:text-left"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          <span className="block whitespace-nowrap">Built For a Better</span>
          <span className="block whitespace-nowrap" style={{ opacity: 0.95 }}>Tomorrow</span>
        </h2>
        <p
          ref={introParaRef}
          className="mt-8 max-w-xl text-sm leading-relaxed opacity-80 md:text-base"
        >
          Founded in 2020, Wolgan is a dedicated water treatment company operating
          in Qatar and the UAE, delivering smart and reliable solutions across commercial,
          institutional, and industrial sectors.
        </p>
      </div>

      {/* ── Glassmorphic Stat Card ── */}
      <div
        ref={statCardRef}
        className="absolute z-[15] p-6 rounded-3xl opacity-0 overflow-hidden group"
        style={{
          width: "180px",
          height: "180px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "rgba(248, 250, 252, 0.8)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(10, 31, 60, 0.15)",
          boxShadow: "0 25px 50px -12px rgba(10, 31, 60, 0.15)",
          transform: "translateX(-50%)",
        }}
      >
        <div className="relative z-10">
          <span className="block text-4xl font-normal text-[var(--brand-gold)] mb-1">
            100+
          </span>
          <span className="block text-[10px] uppercase tracking-widest text-[#0a1f3c] font-bold leading-tight">
            Projects <br /> Across GCC
          </span>
        </div>
        {/* Subtle animated shine */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
      </div>

      {/* ── Detail Content: Fades in Phase 4 ── */}
      <div
        ref={detailRef}
        className="absolute flex flex-col items-start px-6 opacity-0"
        style={{
          width: "40vw",
          color: "#2d3748",
          zIndex: 5,
          left: "6%",
          top: "46%", // Nudged slightly up
          transform: "none",
        }}
      >
        <p className="text-sm md:text-[15px] leading-relaxed opacity-80 mb-10 max-w-[520px]">
          Founded in 2020, Wolgan is a dedicated water treatment company operating in Qatar and the UAE,
          delivering smart and reliable solutions across commercial, institutional, and industrial sectors.
          We specialize in water treatment services, MEP execution, and specialized chemical solutions.
        </p>

        <div className="mb-10 w-full">
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-6 font-bold">
            Core Expertise
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 w-full max-w-[560px]">
            {[
              "Water Treatment",
              "Mechanical Installation",
              "Chemical Supply",
              "Electrical Maintenance"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-[13px] font-semibold text-[#0a1f3c] group">
                <div className="w-6 h-6 rounded-full bg-[var(--brand-gold)]/10 flex items-center justify-center transition-colors group-hover:bg-[var(--brand-gold)]/20">
                  <svg className="w-3 h-3 text-[var(--brand-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2">
          <Button variant="primaryBrand" className="shadow-md hover:shadow-lg transition-all duration-300">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Explore Our Story</span>
            <div className="relative w-3.5 h-3.5 overflow-hidden z-10 ml-2">
              <svg
                className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full text-[var(--brand-deep)] group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              <svg
                className="absolute inset-0 w-full h-full transition-transform duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </Button>
        </div>
      </div>

      {/* ── Pill veil (with box-shadow spreading) ── */}
      <div
        ref={veilRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={
          {
            "--hole-w": "12vmax",
            "--hole-h": "22vmax",
            width: "var(--hole-w)",
            height: "var(--hole-h)",
            borderRadius: "9999px",
            boxShadow: "0 0 0 200vmax #0A1F3C",
          } as React.CSSProperties
        }
      />

      {/* ── Corner labels & Decorations on white veil ── */}
      <div
        ref={veilContentRef}
        className="pointer-events-none absolute inset-0 z-20 px-12 py-16"
      >
        {/* Pill Border (Outside) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={
            {
              "--hole-w": "12vmax",
              "--hole-h": "22vmax",
              width: "calc(var(--hole-w) + 2vmax)",
              height: "calc(var(--hole-h) + 2vmax)",
              borderRadius: "9999px",
              border: "1vmax solid rgba(255, 255, 255, 0.3)",
              opacity: 1,
              zIndex: 1,
            } as React.CSSProperties
          }
        />

        {/* Wave Lines: Corner to Pill */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Bottom-Left to Pill */}
          <path
            d="M 0 100 C 10 70, 25 110, 44 61"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.3"
            opacity="0.4"
          />
          {/* Top-Right to Pill */}
          <path
            d="M 100 0 C 90 30, 75 -10, 56 39"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.3"
            opacity="0.4"
          />
        </svg>

        {/* Left of Pill: Heritage */}
        <div className="absolute top-1/2 right-[calc(50%+12vmax)] -translate-y-[120%] text-right max-w-[500px]">
          <p className="text-[11px] uppercase tracking-[0.3em] opacity-70 mb-3 text-white">
            Focus
          </p>
          <h4 className="font-normal text-3xl text-white leading-tight">
            Cost-effective systems,
            <br />
            performance, compliance.
          </h4>
        </div>

        {/* Right of Pill: Reach */}
        <div className="absolute top-1/2 left-[calc(50%+12vmax)] translate-y-[20%] text-left max-w-[500px]">
          <p className="text-[11px] uppercase tracking-[0.3em] opacity-70 mb-3 text-white">
            Presence — Global
          </p>
          <h4 className="font-normal text-3xl text-white leading-tight">
            Smart water solutions,
            <br />
            driven by innovation.
          </h4>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
          <span className="text-[8px] uppercase tracking-[0.5em] text-white whitespace-nowrap opacity-60">
            Scroll to reveal
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>

        {/* Subtle decorative crosshairs or markers */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col gap-4 opacity-40">
          <div className="w-[1px] h-20 bg-white" />
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-4 items-end opacity-40">
          <div className="w-1 h-1 rounded-full bg-white" />
          <div className="w-[1px] h-20 bg-white" />
        </div>
      </div>

      {/* ── Empty logo ref (placeholder for scale-away anim) ── */}
      <div
        ref={logoRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      />
    </section>
  );
}
