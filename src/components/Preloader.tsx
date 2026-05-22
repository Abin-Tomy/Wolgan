"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const NUM_BLOCKS  = 10;
const SESSION_KEY = "wolgan_preloader_shown";

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
export function Preloader() {
  // `visible` starts true on both server and client — no SSR mismatch.
  // The sessionStorage check happens only inside useEffect (client-only).
  const [visible, setVisible]         = useState(true);
  const [logoVisible, setLogoVisible] = useState(true); // Logo is visible immediately

  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Note: sessionStorage check removed for development so the preloader
    // runs on every refresh. Add it back before production if needed.

    // 1500ms: fade out the logo right before the blocks lift
    const logoFadeOutTimer = setTimeout(() => setLogoVisible(false), 1500);

    // 2200ms: stagger-lift the blocks (Wait until logo fade-out is completely finished (600ms + buffer) to avoid stutter)
    const liftTimer = setTimeout(() => {
      blocksRef.current.forEach((b, i) => {
        if (!b) return;
        b.style.transition = `transform 700ms cubic-bezier(0.76,0,0.24,1) ${i * 55}ms`;
        b.style.transform  = "translateY(-105%)";
      });
      // Unmount after the last block finishes lifting
      setTimeout(() => setVisible(false), 700 + 55 * 9 + 100);
    }, 2200);

    return () => {
      clearTimeout(logoFadeOutTimer);
      clearTimeout(liftTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        10000,
        pointerEvents: "none",
      }}
    >
      {/*
        CSS Grid guarantees seamless columns — flexbox causes sub-pixel gaps.
        Blocks are rendered inside a grid child so the logo overlay
        (absolute) can still sit centred on the outer wrapper.
      */}
      <div
        style={{
          position:            "absolute",
          inset:               0,
          display:             "grid",
          gridTemplateColumns: `repeat(${NUM_BLOCKS}, 1fr)`,
        }}
      >
        {Array.from({ length: NUM_BLOCKS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { blocksRef.current[i] = el; }}
            style={{
              background: "#FFFFFF",
              // box-shadow in the same color extends 2px in all directions,
              // filling any sub-pixel gap between grid columns caused by
              // fractional 1fr widths at non-round viewport sizes.
              boxShadow:  "0 0 0 2px #FFFFFF",
              willChange: "transform",
              transform:  "translateY(0%)",
              transition: "none",
            }}
          />
        ))}
      </div>

      {/* Centered logo — above the block grid */}
      <div
        style={{
          position:   "absolute",
          top:        "50%",
          left:       "50%",
          transform:  logoVisible ? "translate3d(-50%, -50%, 0)" : "translate3d(-50%, calc(-50% - 40px), 0)",
          opacity:    logoVisible ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1), transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "opacity, transform",
          zIndex:     10001,
        }}
      >
        <img
          src="/images/wolgan-logo-navy.png"
          alt="Wolgan"
          style={{ width: "180px", height: "auto", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
