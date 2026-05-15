import React from "react";

interface PortalOverlayProps {
  veilRef: React.RefObject<HTMLDivElement | null>;
  veilContentRef: React.RefObject<HTMLDivElement | null>;
  logoRef: React.RefObject<HTMLDivElement | null>;
}

export function PillOpening({
  veilRef,
  veilContentRef,
  logoRef,
}: PortalOverlayProps) {
  return (
    <>
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
    </>
  );
}
