"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import deck1 from "@/assets/images/about/about-deck-1.jpg";
import deck2 from "@/assets/images/about/about-deck-2.jpg";
import deck3 from "@/assets/images/about/about-deck-3.jpg";

// Sub-components (Siblings in the experience folder)
import { ImageCollage } from "./ImageCollage";
import { PillOpening } from "./PillOpening";
import { AboutSection } from "./AboutSection";
import { ServiceArc } from "./ServiceArc";

import service1 from "@/assets/images/work/water-treatment.jpeg";
import service2 from "@/assets/images/work/mep-installation.jpeg";
import service3 from "@/assets/images/work/chemical-supply.jpeg";

const SERVICES_DATA = [
  {
    title: "Water Treatment",
    desc: "The Single Source for Complete Water Treatment Solutions & Supply of Chemicals. We provide excellent service for various commercial & residential sectors.",
    img: deck1,
    serviceImg: service1,
    href: "/services/water-treatment",
  },
  {
    title: "MEP Installations",
    desc: "Expert execution of Chilled Water Systems, HVAC, and Plumbing Systems. Delivering high-precision mechanical infrastructure and building services.",
    img: deck2,
    serviceImg: service2,
    href: "/services/mep-installations",
  },
  {
    title: "Chemical Supplies",
    desc: "The Single Source for Complete Supply of Chemicals. We provide specialized water treatment chemicals and commodity chemicals for industrial needs.",
    img: deck3,
    serviceImg: service3,
    href: "/services/chemical-supplies",
  },
];

/**
 * CinematicExperience: The "Animation Engine"
 * Orchestrates the seamless scroll-driven transition from Portal -> About -> Services.
 * Visual components are extracted to siblings for maintenance,
 * but logic remains here to ensure perfect synchronization.
 */
export function CinematicExperience() {
  const rootRef = useRef<HTMLElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);
  const img3Ref = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const introParaRef = useRef<HTMLParagraphElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const statCardRef = useRef<HTMLDivElement | null>(null);
  const veilContentRef = useRef<HTMLDivElement | null>(null);
  const path1Ref = useRef<SVGPathElement | null>(null);
  const path2Ref = useRef<SVGPathElement | null>(null);
  const path3Ref = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const veil = veilRef.current!;
      const obj = { hole: 0 };

      // Initial Setup
      gsap.set(textRef.current, { xPercent: -50, yPercent: -50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=1200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* ── Phase 1 (0 → 0.35): Pill opens ── */
      tl.to(obj, {
          hole: 160,
          ease: "power2.inOut",
          onUpdate: () => {
            veil.style.setProperty("--hole-w", `${12 + obj.hole}vmax`);
            veil.style.setProperty("--hole-h", `${22 + obj.hole * 1.8}vmax`);
          },
        }, 0)
        .to(logoRef.current, { scale: 8, opacity: 0, ease: "power2.in" }, 0)
        .to(veilContentRef.current, { opacity: 0, scale: 0.95, ease: "power2.inOut" }, 0)

        /* ── Phase 2 (0.25 → 0.45): About text fades in ── */
        .from(textRef.current, { opacity: 0, yPercent: 20, force3D: true, ease: "power2.out" }, 0.25)

        /* ── Phase 3 (0.45 → 1.5): Card Deck Unfolds ── */
        .to(imgWrapRef.current, {
            width: "22%", height: "60vh", left: "72%", top: "58%",
            yPercent: -50, xPercent: 0, rotation: 0, borderRadius: "28px",
            border: "8px solid #ffffff", boxShadow: "0 0 0 1px rgba(10, 31, 60, 0.1)",
            ease: "power3.inOut",
          }, 0.45)
        .fromTo(img2Ref.current, { opacity: 0, scale: 0.8 }, {
            opacity: 1, scale: 1, left: "66%", top: "58%", yPercent: -50,
            width: "22%", height: "60vh", borderRadius: "28px",
            border: "8px solid #ffffff", boxShadow: "0 0 0 1px rgba(10, 31, 60, 0.1)",
            ease: "power3.out",
          }, 0.65)
        .fromTo(img3Ref.current, { opacity: 0, scale: 0.8 }, {
            opacity: 1, scale: 1, left: "60%", top: "58%", yPercent: -50,
            width: "22%", height: "60vh", borderRadius: "28px",
            border: "8px solid #ffffff", boxShadow: "0 0 0 1px rgba(10, 31, 60, 0.1)",
            ease: "power3.out",
          }, 0.85)
        .fromTo(statCardRef.current, { opacity: 0, scale: 0.5, y: 50 }, {
            opacity: 1, scale: 1, y: 0, left: "58%", top: "84%", ease: "back.out(1.7)",
          }, 0.8)

        // SVG Morphs
        .to(path1Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.45)
        .to(path2Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.65)
        .to(path3Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.85)

        // Move text to left
        .to(textRef.current, {
            left: "10%", xPercent: 0, yPercent: -50, width: "40vw",
            color: "#0a1f3c", textAlign: "left", force3D: true, 
            scale: 0.85, transformOrigin: "left center",
            ease: "power3.inOut",
          }, 0.45)

        /* ── Phase 4 (1.5 → 2.0): Parallax & Detail Reveal ── */
        .to([imgWrapRef.current, img2Ref.current, img3Ref.current], { yPercent: -54, ease: "none" }, 1.5)
        .to(statCardRef.current, { y: -30, x: -10, ease: "none" }, 1.5)
        .to(textRef.current, { top: "15%", left: "10%", yPercent: 0, scale: 0.7, transformOrigin: "left top", ease: "power3.inOut" }, 1.5)
        .to(introParaRef.current, { opacity: 0, y: -20, pointerEvents: "none", ease: "power3.inOut" }, 1.5)
        .fromTo(detailRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: "power3.out" }, 1.6)

        /* ── Phase 5 (2.0 → 3.5): Deep Portal Transition ── */
        .to(rootRef.current, { backgroundColor: "#0A1F3C", duration: 1 }, 2.0)
        .to([textRef.current, detailRef.current, statCardRef.current], { opacity: 0, y: -100, stagger: 0.1, ease: "expo.inOut" }, 2.0)
        .fromTo(".services-main-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: "expo.out", color: "#ffffff" }, 2.3)

        // Cross-fade to Service Images
        .to([".about-img-0", ".about-img-1", ".about-img-2"], { opacity: 0, duration: 1.5, ease: "power2.inOut" }, 2.3)
        .to([".service-img-0", ".service-img-1", ".service-img-2"], { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 2.3)

        // Morph cards into central vertical deck
        .to([imgWrapRef.current, img2Ref.current, img3Ref.current], {
          left: "50%", top: "58%", xPercent: -50, yPercent: -50,
          width: "11vw", height: "18vw", borderRadius: "999px",
          border: "2px solid rgba(255,255,255,0.2)",
          stagger: { each: 0.05, from: "end" },
          ease: "expo.inOut",
        }, 2.3)

        /* ── Phase 6 (3.5 → 13.5): The Arc Cycle ── */
        .to(".service-arc-path", { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" }, 3.5);

        const cardsArr = [imgWrapRef.current, img2Ref.current, img3Ref.current];
        const arcPos = [
          { x: -20, y: 42, scale: 0.4, opacity: 0.6 }, 
          { x: 20, y: 42, scale: 0.4, opacity: 0.6 },  
        ];

        SERVICES_DATA.forEach((_, i) => {
          const start = 3.5 + i * 2.5;

          // 1. Activate Central Pill
          tl.to(cardsArr[i], {
            left: "50%", top: "58%", xPercent: -50, yPercent: -50, scale: 1, opacity: 1,
            zIndex: 50, width: "15vw", height: "24vw", borderRadius: "999px",
            border: "2px solid rgba(255, 255, 255, 0.8)", ease: "expo.inOut", duration: 1.5
          }, start);

          // 2. Side Content
          tl.fromTo(`.service-side-left-${i}`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, start + 0.5);
          tl.fromTo(`.service-side-right-${i}`, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, start + 0.5);

          // 3. Move other cards to Arc
          cardsArr.forEach((otherCard, j) => {
            if (i === j) return;
            const pos = arcPos[j < i ? j : j - 1];
            tl.to(otherCard, {
              left: `${50 + pos.x}%`, top: `${50 + pos.y}%`, scale: pos.scale, opacity: pos.opacity,
              zIndex: 40 - Math.abs(pos.x), width: "12vw", height: "12vw", borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.3)", ease: "expo.inOut", duration: 1.5
            }, start);
          });

          // 4. Exit text
          if (i < SERVICES_DATA.length - 1) {
            tl.to([`.service-side-left-${i}`, `.service-side-right-${i}`], { opacity: 0, y: -30, duration: 0.8 }, start + 2.2);
          }
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative h-screen w-full overflow-hidden font-montserrat font-normal"
      style={{ backgroundColor: "var(--background)" }}
    >
      <ImageCollage
        imgWrapRef={imgWrapRef} img2Ref={img2Ref} img3Ref={img3Ref}
        path1Ref={path1Ref} path2Ref={path2Ref} path3Ref={path3Ref}
        images={[deck1, deck2, deck3]}
        serviceImages={SERVICES_DATA.map(s => s.serviceImg)}
      />

      <ServiceArc services={SERVICES_DATA} />

      <AboutSection
        textRef={textRef} introParaRef={introParaRef}
        statCardRef={statCardRef} detailRef={detailRef}
      />

      <PillOpening
        veilRef={veilRef} veilContentRef={veilContentRef} logoRef={logoRef}
      />
    </section>
  );
}
