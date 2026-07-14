import type { RefObject } from "react";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";

interface PortalIntroProps {
  textRef: RefObject<HTMLDivElement | null>;
  introParaRef: RefObject<HTMLParagraphElement | null>;
  statCardRef: RefObject<HTMLDivElement | null>;
  detailRef: RefObject<HTMLDivElement | null>;
}

export function AboutSection({
  textRef,
  introParaRef,
  statCardRef,
  detailRef,
}: PortalIntroProps) {
  return (
    <>
      {/* ── Content: starts centred, slides LEFT ── */}
      <div
        ref={textRef}
        className="flex flex-col items-center px-6"
        style={{
          color: "#ffffff",
          zIndex: 10,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          textAlign: "center",
        }}
      >
        <div className="flex items-center gap-4 mb-6 group">
          <div className="w-10 h-[1px] bg-white/50 transition-all duration-700 group-hover:w-16" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-inherit opacity-70">
            About Wolgan
          </span>
        </div>
        <Typography variant="h1" className="text-center drop-shadow-2xl" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
          <span className="block whitespace-nowrap">Built For a Better</span>
          <span className="block whitespace-nowrap" style={{ opacity: 0.95 }}>
            Tomorrow
          </span>
        </Typography>
        <p
          ref={introParaRef}
          className="mt-8 max-w-xl text-sm leading-relaxed opacity-80 md:text-base whitespace-nowrap text-center"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
        >
          Technical Excellence in Water & Infrastructure Engineering.
        </p>
      </div>

      {/* ── Glassmorphic Stat Card ── */}
      <div
        ref={statCardRef}
        className="absolute z-[15] p-6 rounded-3xl opacity-0 overflow-hidden group"
        style={{
          width: "140px",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "rgba(248, 250, 252, 0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(10, 31, 60, 0.15)",
          boxShadow: "0 25px 50px -12px rgba(10, 31, 60, 0.15)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative z-10">
          <span className="block text-3xl font-normal text-[var(--brand-gold)] mb-1">
            100+
          </span>
          <span className="block text-[10px] uppercase tracking-widest text-[#0a1f3c] font-bold leading-tight">
            Projects <br /> Across GCC
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
          top: "41%",
          transform: "none",
        }}
      >
        <p className="text-[15px] md:text-base leading-relaxed opacity-80 mb-10 max-w-[520px]">
          Founded in 2020, Wolgan is a dedicated water treatment company
          operating in the Middle East, delivering smart and reliable
          solutions across commercial, institutional, and industrial sectors.
          We specialize in water treatment services, MEP execution, and
          specialized chemical solutions.
        </p>

        <div className="mb-10 w-full">
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-6 font-bold">
            Core Expertise
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 w-full max-w-[560px]">
            {[
              "Water Treatment",
              "MEP Installations",
              "Chemical Supplies",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 text-[13px] font-semibold text-[#0a1f3c] group"
              >
                <div className="w-6 h-6 rounded-full bg-[var(--brand-gold)]/10 flex items-center justify-center transition-colors group-hover:bg-[var(--brand-gold)]/20">
                  <svg
                    className="w-3 h-3 text-[var(--brand-gold)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            variant="primaryBrand"
            className="shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2.5 w-auto"
            href="/about"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Explore Our Story
            </span>
            <div className="relative w-3.5 h-3.5 overflow-hidden z-10 ml-2">
              <svg
                className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full text-[var(--brand-deep)] group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
              <svg
                className="absolute inset-0 w-full h-full transition-transform duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </div>
          </Button>

          <Button
            variant="primaryBrand"
            className="shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2.5 w-auto"
            href="/api/download?file=Wolgan - Profile.pdf"
            download="Wolgan - Profile.pdf"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Company Profile
            </span>
            <div className="relative w-3.5 h-3.5 overflow-hidden z-10 ml-2">
              <svg
                className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:translate-y-full text-[var(--brand-deep)] group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <svg
                className="absolute inset-0 w-full h-full transition-transform duration-300 -translate-y-full group-hover:translate-y-0 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}

