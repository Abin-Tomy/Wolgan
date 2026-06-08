"use client";
import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { ImageCollage } from "./ImageCollage";
import { PillOpening } from "./PillOpening";
import { AboutSection } from "./AboutSection";
import { ServiceArc } from "./ServiceArc";

const deck1 = "/images/about-deck-1.jpg";
const deck2 = "/images/about-deck-2.jpg";
const deck3 = "/images/about-deck-3.jpg";
const service1 = "/images/water-treatment.jpeg";
const service2 = "/images/mep-installation.jpeg";
const service3 = "/images/chemical-supply.jpeg";

const SERVICES_DATA = [
  {
    title: "Water Treatment",
    desc: "Water treatment requires in-depth knowledge and skills to understand, rectify & even build specific systems customized to surrounding operations. Our experienced team provides excellent service for various commercial & residential sectors across Qatar.",
    img: deck1,
    serviceImg: service1,
    href: "/services/water-treatment",
  },
  {
    title: "MEP Installations & Services",
    desc: "WOLGAN MEP Division is dedicated to providing MEP solutions for the most demanding commercial and industrial facilities. We are committed to providing clients with the best possible solutions from initial design and engineering through installation and maintenance.",
    img: deck2,
    serviceImg: service2,
    href: "/services/mep-installations",
  },
  {
    title: "Chemical Supplies",
    desc: "The demand for safe and clean water is constantly increasing, both to meet human needs and to support industrial activities. Current water resources are unlikely to meet the escalating needs due to urbanization and economic growth. Wolgan thus employs cutting-edge methods of water treatment to produce water suitable for use.",
    img: deck3,
    serviceImg: service3,
    href: "/services/chemical-supplies",
  },
];

export function CinematicExperience() {
  const rootRef         = useRef<HTMLElement | null>(null);
  const veilRef         = useRef<HTMLDivElement | null>(null);
  const logoRef         = useRef<HTMLDivElement | null>(null);
  const imgWrapRef      = useRef<HTMLDivElement | null>(null);
  const img2Ref         = useRef<HTMLDivElement | null>(null);
  const img3Ref         = useRef<HTMLDivElement | null>(null);
  const textRef         = useRef<HTMLDivElement | null>(null);
  const introParaRef    = useRef<HTMLParagraphElement | null>(null);
  const detailRef       = useRef<HTMLDivElement | null>(null);
  const statCardRef     = useRef<HTMLDivElement | null>(null);
  const veilContentRef  = useRef<HTMLDivElement | null>(null);
  const path1Ref        = useRef<SVGPathElement | null>(null);
  const path2Ref        = useRef<SVGPathElement | null>(null);
  const path3Ref        = useRef<SVGPathElement | null>(null);
  // Phase 7: kinetic arc wheel (rendered via portal so position:fixed works)
  const kineticRef      = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const veil = veilRef.current!;
      const obj = { hole: 0 };

      gsap.set(textRef.current, { xPercent: -50, yPercent: -50 });
      // Arc wheel starts hidden, rotated 180° (folded below viewport)
      gsap.set(kineticRef.current, {
        opacity: 0,
        rotation: 180,
        transformOrigin: "50% 100%",
      });
      gsap.set([
        ".kinetic-desc-tag",
        ".kinetic-desc-line1",
        ".kinetic-desc-line2",
        ".kinetic-desc-countries"
      ], { opacity: 0, y: 25 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=1400%",   // extended to accommodate Phase 7
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

        /* ── Phase 2 (0.25 → 0.45): About text ── */
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
        .to(path1Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.45)
        .to(path2Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.65)
        .to(path3Ref.current, { attr: { d: "M 0 0 L 1 0 L 1 1 L 0 1 Z" }, ease: "power2.inOut" }, 0.85)
        .to(textRef.current, {
            left: "8%", xPercent: 0, yPercent: -50, width: "40vw",
            color: "#0a1f3c", textAlign: "left", force3D: true,
            scale: 0.85, transformOrigin: "left center",
            ease: "power3.inOut",
          }, 0.45)

        /* ── Phase 4 (1.5 → 2.0): Parallax & Detail ── */
        .to([imgWrapRef.current, img2Ref.current, img3Ref.current], { yPercent: -54, ease: "none" }, 1.5)
        .to(statCardRef.current, { y: -30, x: -10, ease: "none" }, 1.5)
        .to(textRef.current, { top: "15%", left: "8%", yPercent: 0, scale: 0.7, transformOrigin: "left top", ease: "power3.inOut" }, 1.5)
        .to(introParaRef.current, { opacity: 0, y: -20, pointerEvents: "none", ease: "power3.inOut" }, 1.5)
        .fromTo(detailRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: "power3.out" }, 1.6)

        /* ── Phase 5 (2.0 → 3.5): Deep Portal ── */
        .to(rootRef.current, { backgroundColor: "#0A1F3C", duration: 1 }, 2.0)
        .to([textRef.current, detailRef.current, statCardRef.current], { opacity: 0, y: -100, stagger: 0.1, ease: "expo.inOut" }, 2.0)
        .fromTo(".services-main-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: "expo.out", color: "#ffffff" }, 2.3)
        .to([".about-img-0", ".about-img-1", ".about-img-2"], { opacity: 0, duration: 1.5, ease: "power2.inOut" }, 2.3)
        .to([".service-img-0", ".service-img-1", ".service-img-2"], { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 2.3)
        .to([imgWrapRef.current, img2Ref.current, img3Ref.current], {
          left: "50%", top: "58%", xPercent: -50, yPercent: -50,
          width: "11vw", height: "18vw", borderRadius: "999px",
          border: "2px solid rgba(255,255,255,0.2)",
          stagger: { each: 0.05, from: "end" },
          ease: "expo.inOut",
        }, 2.3)

        /* ── Phase 6 (3.5 → 11.0): Arc Cycle ── */
        .to(".service-arc-path", { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" }, 3.5);

      const cardsArr = [imgWrapRef.current, img2Ref.current, img3Ref.current];
      const arcPos = [
        { x: -20, y: 42, scale: 0.4, opacity: 0.6 },
        { x: 20,  y: 42, scale: 0.4, opacity: 0.6 },
      ];

      SERVICES_DATA.forEach((_, i) => {
        const start = 3.5 + i * 2.5;

        tl.to(cardsArr[i], {
          left: "50%", top: "58%", xPercent: -50, yPercent: -50, scale: 1, opacity: 1,
          zIndex: 50, width: "15vw", height: "24vw", borderRadius: "999px",
          border: "2px solid rgba(255, 255, 255, 0.8)", ease: "expo.inOut", duration: 1.5
        }, start);

        tl.fromTo(`.service-side-left-${i}`,  { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 }, start + 0.5);
        tl.fromTo(`.service-side-right-${i}`, { x:  40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 }, start + 0.5);

        cardsArr.forEach((otherCard, j) => {
          if (i === j) return;
          const pos = arcPos[j < i ? j : j - 1];
          tl.to(otherCard, {
            left: `${50 + pos.x}%`, top: `${50 + pos.y}%`, scale: pos.scale, opacity: pos.opacity,
            zIndex: 40 - Math.abs(pos.x), width: "12vw", height: "12vw", borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.3)", ease: "expo.inOut", duration: 1.5
          }, start);
        });

        if (i < SERVICES_DATA.length - 1) {
          tl.to([`.service-side-left-${i}`, `.service-side-right-${i}`], { autoAlpha: 0, y: -30, duration: 0.8 }, start + 2.2);
        }
      });

      /* ── Phase 7 (11.0 → 13.5): Void Effect + Kinetic Wheel ── */
      const voidStart = 11.0;

      // Exit last service text
      tl.to([".service-side-left-2", ".service-side-right-2"], {
        autoAlpha: 0, y: -30, duration: 0.8, ease: "expo.inOut",
      }, voidStart);

      // All 3 cards zoom back in Z (void / wormhole effect)
      tl.to(cardsArr, {
        scale: 0,
        opacity: 0,
        yPercent: 0,
        stagger: { each: 0.08, from: "center" },
        duration: 1.8,
        ease: "expo.inOut",
      }, voidStart);

      // Services title & arc fade out
      tl.to(".services-main-title", { opacity: 0, y: -40, duration: 1, ease: "expo.inOut" }, voidStart);
      tl.to(".service-arc-path",    { opacity: 0, duration: 0.8, ease: "power2.inOut" }, voidStart);

      // Kinetic wheel rises: rotation 180° → 0° around bottom pivot
      tl.to(kineticRef.current, {
        opacity: 1,
        rotation: 0,
        transformOrigin: "50% 100%",
        duration: 2,
        ease: "power2.out",
      }, voidStart + 0.5);

      // Fade in and translate each description line sequentially for an elite staggered text reveal
      tl.to([
        ".kinetic-desc-tag",
        ".kinetic-desc-line1",
        ".kinetic-desc-line2",
        ".kinetic-desc-countries"
      ], {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.22,
        ease: "power3.out",
      }, voidStart + 2.2);

      // Pad the timeline so the next section doesn't slide over immediately, letting the text be read
      tl.to({}, { duration: 2.2 });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative h-screen w-full font-montserrat font-normal"
      style={{ backgroundColor: "var(--background)", zIndex: 1 }}
    >
      {/* Inner wrapper keeps the animations contained without clipping the arc wheel */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
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
      </div>

      {/* Kinetic arc wheel — absolute to the bottom of the section */}
      <div
        ref={kineticRef}
        style={{
          position: "absolute",
          bottom: "-12vh",
          left: 0,
          width: "100%",
          pointerEvents: "none",
          zIndex: 5,
          willChange: "transform, opacity",
        }}
      >
        <svg
          viewBox="0 0 3000 1500"
          style={{ width: "100%", height: "auto", overflow: "visible", display: "block" }}
        >
          <defs>
            <path
              id="wolgan-arc-path"
              d="M 400,1500 A 1100,1100 0 0,1 2600,1500"
            />
          </defs>
          {[
            { text: "DESIGN",   offset: "13.5%" },
            { text: "●",        offset: "25.5%", dot: true },
            { text: "BUILD",    offset: "37.5%" },
            { text: "●",        offset: "49.5%", dot: true },
            { text: "OPERATE",  offset: "61.5%" },
            { text: "●",        offset: "73.5%", dot: true },
            { text: "MAINTAIN", offset: "85.5%" },
          ].map((item, i) => (
            <text
              key={i}
              fill="#ffffff"
              fontFamily="var(--font-montserrat), sans-serif"
              fontWeight={800}
              fontSize={item.dot ? "50" : "100"}
              dy={item.dot ? "-18" : "0"}
            >
              <textPath
                href="#wolgan-arc-path"
                startOffset={item.offset}
                textAnchor="middle"
              >
                {item.text}
              </textPath>
            </text>
          ))}

          {/* Description and brand details perfectly centered inside the arc wheel */}
          <g className="kinetic-desc" transform="translate(1500, 950)" textAnchor="middle">
            <text
              className="kinetic-desc-tag"
              fill="rgba(255, 255, 255, 0.35)"
              fontFamily="var(--font-montserrat), sans-serif"
              fontWeight={700}
              fontSize="22"
              letterSpacing="0.5em"
              y="-100"
            >
              LEADERS IN ENGINEERING
            </text>
            <text
              className="kinetic-desc-line1"
              fill="#A5B8CC"
              fontFamily="var(--font-montserrat), sans-serif"
              fontWeight={300}
              fontSize="38"
              letterSpacing="0.02em"
              y="-10"
            >
              Delivering end-to-end pure performance across water treatment,
            </text>
            <text
              className="kinetic-desc-line2"
              fill="#A5B8CC"
              fontFamily="var(--font-montserrat), sans-serif"
              fontWeight={300}
              fontSize="38"
              letterSpacing="0.02em"
              y="45"
            >
              mechanical installations, and specialized chemical supplies.
            </text>
            <text
              className="kinetic-desc-countries"
              fill="#66B2E8"
              fontFamily="var(--font-montserrat), sans-serif"
              fontWeight={800}
              fontSize="22"
              letterSpacing="0.3em"
              y="120"
            >
              MIDDLE EAST ● INDIA
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
