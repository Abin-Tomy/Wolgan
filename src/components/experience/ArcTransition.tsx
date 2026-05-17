"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

/**
 * ArcTransition
 * ─────────────
 * Kinetic arc wheel that rises from the bottom as the user scrolls
 * past the services section. Uses gsap.ticker to read Lenis scroll
 * position every frame — avoids the lenis.on() null-instance issue.
 *
 * Desktop: SVG arc text (ASSESS · DESIGN · INSTALL · DELIVER) rotates
 *          from folded (180°) to flat as section enters viewport.
 * Mobile:  Simplified fade-in only.
 */
export function ArcTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kineticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wheel = kineticRef.current;
    if (!container || !wheel) return;

    const isMobile = window.innerWidth < 1024;

    // Start folded (rotated 180° below, invisible)
    if (!isMobile) {
      gsap.set(wheel, { rotation: 180, opacity: 0, transformOrigin: "50% 100%" });
    } else {
      gsap.set(wheel, { opacity: 0 });
    }

    const tick = () => {
      const scroll = getLenis()?.scroll ?? window.scrollY;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress: 0 = section top at 90% of viewport, 1 = section top at 10%
      const rawProgress = 1 - (rect.top - vh * 0.1) / (vh * 0.8);
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      if (!isMobile) {
        gsap.set(wheel, {
          rotation: 180 * (1 - progress),
          opacity: Math.min(progress * 2.5, 1),
          transformOrigin: "50% 100%",
        });
      } else {
        gsap.set(wheel, { opacity: Math.min(progress * 2.5, 1) });
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    /* overflow:visible so the arc wheel (which hangs -18vh below) isn't clipped */
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "55vh",
        backgroundColor: "#0A1F3C",
        overflow: "visible",
      }}
    >
      <div
        ref={kineticRef}
        style={{
          position: "absolute",
          bottom: "-18vh",
          left: 0,
          width: "100vw",
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      >
        {/* Desktop arc — text flows along a semi-circle path */}
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
            { text: "DESIGN",   offset: "14%" },
            { text: "●",        offset: "27%", isDot: true },
            { text: "BUILD",    offset: "38%" },
            { text: "●",        offset: "50%", isDot: true },
            { text: "OPERATE",  offset: "62%" },
            { text: "●",        offset: "74%", isDot: true },
            { text: "MAINTAIN", offset: "86%" },
          ].map((item, i) => (
            <text
              key={i}
              fill="#ffffff"
              fontFamily="var(--font-montserrat), sans-serif"
              fontWeight={800}
              fontSize={item.isDot ? "50" : "100"}
              dy={item.isDot ? "-18" : "0"}
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
        </svg>
      </div>
    </div>
  );
}
