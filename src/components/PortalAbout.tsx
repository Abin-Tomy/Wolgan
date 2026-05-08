"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import valleyWebp from "@/assets/about-waterplant.webp";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
  // The content that starts centred over the image then moves right
  const textRef = useRef<HTMLDivElement | null>(null);
  // The atmospheric paragraph that fades out to make room for details
  const introParaRef = useRef<HTMLParagraphElement | null>(null);
  // The detailed content that fades in later
  const detailRef = useRef<HTMLDivElement | null>(null);
  // Veil overlay text (top-left / bottom-right labels)
  const veilContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const veil = veilRef.current!;
      const obj = { hole: 0 };

      /* ── Extended timeline: 500% of scroll height ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1.2,
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
          { opacity: 0, y: 60, ease: "power2.out" },
          0.35,
        )

        /* ── Phase 3 (0.55 → 1.0): Image card shrinks left, text moves right ── */
        .to(
          imgWrapRef.current,
          {
            width: "33%",
            height: "70vh",
            left: "5%",
            top: "55%",
            yPercent: -50,
            xPercent: 0,
            borderRadius: "20px",
            ease: "power3.inOut",
          },
          0.55,
        )
        // Move text anchor from center (50%) to right column (74%) cleanly via left
        .to(
          textRef.current,
          {
            left: "74%",
            xPercent: -50,
            width: "44vw",
            color: "#0a1f3c",
            ease: "power3.inOut",
          },
          0.55,
        )

        /* ── Phase 4 (1.0 → 1.4): text moves up as heading, details fade in ── */
        .to(
          textRef.current,
          {
            top: "15%",
            yPercent: 0,
            scale: 0.65,
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
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
          },
          1.1,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >

      {/* ── Full-screen image (becomes a card) ── */}
      <div
        ref={imgWrapRef}
        className="absolute overflow-hidden"
        style={{
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: 0,
        }}
      >
        <Image
          src={valleyWebp}
          alt="Wolgan Valley at dawn — sandstone cliffs and eucalyptus mist"
          className="h-full w-full object-cover"
          fill
          sizes="100vw"
          placeholder="blur"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(24,18,12,0.20) 0%, rgba(24,18,12,0.55) 100%)",
          }}
        />
      </div>

      {/* ── Content: starts centred over image, slides right ── */}
      <div
        ref={textRef}
        className="flex flex-col items-center justify-center px-6"
        style={{
          color: "#ffffff",
          zIndex: 5,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          textAlign: "center"
        }}
      >
        <div className="mb-8">
          <span className="px-5 py-2 border border-[var(--brand-deep)]/20 rounded-full text-[10px] uppercase tracking-[0.4em] opacity-80 inline-block">
            About Wolgan
          </span>
        </div>
        <h2
          className="font-serif italic leading-[0.95] tracking-tight"
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

      {/* ── Detail Content: Fades in Phase 4 ── */}
      <div
        ref={detailRef}
        className="absolute flex flex-col items-start px-6 opacity-0"
        style={{
          width: "44vw",
          color: "#2d3748",
          zIndex: 5,
          left: "74%",
          top: "40%",
          transform: "translateX(-50%)",
        }}
      >
        <p className="text-sm md:text-base leading-relaxed opacity-90 mb-4">
          Founded in 2020, Wolgan is a dedicated water treatment company operating
          in Qatar and the UAE, delivering smart and reliable solutions across commercial,
          institutional, and industrial sectors. We specialize in water treatment services,
          MEP execution, and the supply of specialized chemical solutions designed to
          optimize performance, extend equipment life, and ensure compliance with local
          and international standards.
        </p>
        <p className="text-sm md:text-base leading-relaxed opacity-90 mb-6">
          Serving industries including healthcare, facilities management, construction,
          hospitality, and large-scale developments, our experienced team delivers practical,
          cost-effective solutions—combining technical expertise with responsive service
          to ensure efficient, sustainable, and reliable water systems.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mb-6 w-full">
          {[
            "Water Treatment",
            "Mechanical Installation",
            "Chemical Supply",
            "Electrical Installation & Maintenance Services"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-medium text-[var(--brand-deep)]">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-[var(--brand-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 7l5 5-5 5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <Button variant="primaryBrand">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Read More</span>
          <div className="relative w-3.5 h-3.5 overflow-hidden z-10">
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
          <p className="text-[11px] uppercase tracking-[0.3em] opacity-70 mb-3 font-sans not-italic text-white">
            Focus
          </p>
          <h4 className="font-serif italic text-3xl text-white leading-tight">
            Cost-effective systems,
            <br />
            performance, compliance.
          </h4>
        </div>

        {/* Right of Pill: Reach */}
        <div className="absolute top-1/2 left-[calc(50%+12vmax)] translate-y-[20%] text-left max-w-[500px]">
          <p className="text-[11px] uppercase tracking-[0.3em] opacity-70 mb-3 font-sans not-italic text-white">
            Presence — Global
          </p>
          <h4 className="font-serif italic text-3xl text-white leading-tight">
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
