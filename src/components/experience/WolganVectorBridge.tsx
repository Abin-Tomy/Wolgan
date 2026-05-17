"use client";
import { useEffect, useRef, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

/* ── Custom ease (matches reference VectorBridge) ── */
function easeCustom(t: number): number {
  const p1x = 0.76, p1y = 0, p2x = 0.24, p2y = 1;
  const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
  const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
  let s = t;
  for (let i = 0; i < 8; i++) {
    const ex = ((ax * s + bx) * s + cx) * s - t;
    const dx = (3 * ax * s + 2 * bx) * s + cx;
    if (Math.abs(dx) < 1e-7) break;
    s -= ex / dx;
  }
  return ((ay * s + by) * s + cy) * s;
}

/* ── Portal inner content ── */
function PortalContent() {
  return (
    <section style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "0 clamp(2rem, 8vw, 10rem)",
      backgroundColor: "#ffffff",
    }}>
      <div style={{ maxWidth: "64rem", width: "100%" }}>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.3em",
          textTransform: "uppercase", color: "rgba(0,0,0,0.4)",
          marginBottom: "1.5rem",
          fontFamily: "var(--font-montserrat), sans-serif",
        }}>Our Approach</p>

        <h2 style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontWeight: 900, textTransform: "uppercase",
          lineHeight: 0.9, letterSpacing: "-0.03em",
          fontSize: "clamp(2.5rem, 7vw, 7rem)",
          color: "#0A1F3C", marginBottom: "3rem",
        }}>
          Engineering<br />
          <span style={{ color: "rgba(10,31,60,0.25)" }}>Excellence</span><br />
          Delivered.
        </h2>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2.5rem", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "2.5rem",
        }}>
          {[
            { num: "01", title: "Assess", body: "Rigorous site surveys and water quality analysis ensure every solution is precision-engineered to your specific environment." },
            { num: "02", title: "Design & Install", body: "From HVAC to water treatment systems, our MEP specialists deliver fully integrated installations to international standards." },
            { num: "03", title: "Maintain & Supply", body: "End-to-end chemical supply and maintenance contracts keep your systems performing at peak efficiency year-round." },
          ].map(p => (
            <div key={p.num}>
              <span style={{ display: "block", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 900, fontSize: "0.7rem", letterSpacing: "0.25em", color: "rgba(0,0,0,0.25)", marginBottom: "0.75rem" }}>{p.num}</span>
              <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 900, fontSize: "1.1rem", textTransform: "uppercase", color: "#0A1F3C", marginBottom: "0.75rem" }}>{p.title}</h3>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(0,0,0,0.5)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main Component ── */
export function WolganVectorBridge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgContRef = useRef<HTMLDivElement>(null);
  const bridgeRef  = useRef<SVGPathElement | null>(null);
  const portalRef  = useRef<HTMLDivElement | null>(null);
  const innerRef   = useRef<HTMLDivElement | null>(null);

  const sectionTopRef = useRef(0);
  const totalLenRef   = useRef(0);
  const measuredRef   = useRef(false);

  const RECT_W = 340;
  const RECT_H = 220;

  const measure = useCallback(() => {
    if (sectionRef.current) {
      sectionTopRef.current = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    }

    const mobile = window.innerWidth < 1024;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Build SVG path: desktop curves from arc terminus, mobile is straight line
    let d = "";
    if (!mobile) {
      const scX    = vw / 3000;
      const AX     = 1500 + 1100 * Math.cos((196 * Math.PI) / 180);
      const startX = AX * scX;
      const endX   = vw / 2 - RECT_W / 2;
      const endY   = vh / 2;
      const R_px   = 1100 * scX;
      d = `M ${startX},0 A ${R_px},${R_px} 0 0,0 ${endX},${endY}`;
    } else {
      d = `M ${vw / 2},-10 L ${vw / 2},${vh / 2 - RECT_H / 2}`;
    }

    const path = bridgeRef.current;
    if (path) {
      path.setAttribute("d", d);
      try {
        const len = path.getTotalLength();
        if (len > 0) {
          totalLenRef.current = len;
          path.style.strokeDasharray  = `${len}`;
          path.style.strokeDashoffset = `${len}`;
        }
      } catch (_) {}
    }

    // Give the section enough height: viewport × 1.2 (expansion runway) + viewport (content) + viewport (slide-over)
    if (sectionRef.current) {
      const h = vh * 1.2 + vh + vh;
      sectionRef.current.style.minHeight = `${h}px`;
    }

    measuredRef.current = true;
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => { measure(); setTimeout(measure, 200); });
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* ── Per-frame driver: read Lenis scroll via gsap.ticker ── */
  useEffect(() => {
    const tick = () => {
      if (!measuredRef.current) return;

      // getLenis() is always non-null here because:
      // - SmoothScroll (parent) useEffect runs before children in React
      // - gsap.ticker fires on next animation frame, by which time Lenis is created
      const scroll = getLenis()?.scroll ?? window.scrollY;
      const path    = bridgeRef.current;
      const box     = portalRef.current;
      const inner   = innerRef.current;
      const svgCont = svgContRef.current;
      const totalLen = totalLenRef.current;

      if (!box || !inner) return;

      const vh  = window.innerHeight;
      const vw  = window.innerWidth;
      const loc = scroll - sectionTopRef.current; // local scroll within this section

      /* 1. Draw the SVG bridge line progressively */
      if (path && svgCont && totalLen > 0) {
        const drawP = Math.min(Math.max((loc + vh) / vh, 0), 1);
        path.style.strokeDashoffset = `${(totalLen - drawP * totalLen).toFixed(1)}`;
      }

      /* 2. Show/hide portal */
      if (loc < -vh * 0.35) {
        box.style.visibility = "hidden";
        box.style.opacity    = "0";
        return;
      }
      box.style.visibility = "visible";
      box.style.opacity    = "1";

      /* 3. Portal position + scale */
      const expansionRunway = vh * 1.2;
      const expP = Math.min(Math.max(loc / expansionRunway, 0), 1);

      if (loc <= 0) {
        // Not yet expanding: sit at viewport center
        box.style.position    = "absolute";
        box.style.top         = "50vh";
        box.style.transform   = "translate3d(0,0,0) scale(1)";
        inner.style.transform = "scale(1)";
        box.style.overflow    = "hidden";
        if (svgCont) { svgCont.style.position = "absolute"; svgCont.style.top = "0"; }
      } else if (expP < 1) {
        // Expanding: fix to viewport
        box.style.position  = "fixed";
        box.style.top       = "50%";
        box.style.overflow  = "hidden";
        if (svgCont) { svgCont.style.position = "fixed"; svgCont.style.top = "0"; }

        const e      = easeCustom(expP);
        const scaleX = 1 + e * (vw / RECT_W - 1);
        const scaleY = 1 + e * (vh / RECT_H - 1);
        box.style.transform   = `translate3d(0,0,0) scale(${scaleX.toFixed(4)},${scaleY.toFixed(4)})`;
        inner.style.transform = `scale(${(1 / scaleX).toFixed(4)},${(1 / scaleY).toFixed(4)})`;

        const bO = Math.max(0, 1 - e / 0.5);
        box.style.borderWidth = bO < 0.01 ? "0px" : "2px";
        box.style.borderColor = `rgba(0,0,0,${bO.toFixed(3)})`;
      } else if (loc < expansionRunway + vh) {
        // Fully expanded, but we keep it fixed for 100vh so the next section can slide over it!
        box.style.position  = "fixed";
        box.style.top       = "50%";
        box.style.overflow  = "visible";
        box.style.transform   = `translate3d(0,0,0) scale(${(vw / RECT_W).toFixed(4)},${(vh / RECT_H).toFixed(4)})`;
        inner.style.transform = `scale(${(RECT_W / vw).toFixed(4)},${(RECT_H / vh).toFixed(4)})`;
        box.style.borderWidth = "0px";
        // SVG line should scroll up out of view
        if (svgCont) { svgCont.style.position = "fixed"; svgCont.style.top = `${-(loc - expansionRunway)}px`; }
      } else {
        // Slide-over complete: release it to absolute so it scrolls naturally off-screen (though covered)
        const slideOverRunway = vh;
        box.style.position    = "absolute";
        box.style.top         = `${expansionRunway + slideOverRunway + vh / 2}px`;
        box.style.transform   = `translate3d(0,0,0) scale(${(vw / RECT_W).toFixed(4)},${(vh / RECT_H).toFixed(4)})`;
        inner.style.transform = `scale(${(RECT_W / vw).toFixed(4)},${(RECT_H / vh).toFixed(4)})`;
        box.style.overflow    = "visible";
        box.style.borderWidth = "0px";
        if (svgCont) { svgCont.style.position = "absolute"; svgCont.style.top = `${expansionRunway}px`; }
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    /* White background — this section follows the dark navy CinematicExperience */
    <div ref={sectionRef} style={{ position: "relative", backgroundColor: "#ffffff", minHeight: "320vh", zIndex: 10, marginTop: "-100vh" }}>

      {/* SVG bridge line — draws from top of section to portal centre */}
      <div ref={svgContRef} style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100vh",
        pointerEvents: "none", zIndex: 10,
        willChange: "top, position",
      }}>
        <svg width="100%" height="100%" style={{ overflow: "visible" }}>
          <path
            ref={bridgeRef}
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            style={{ strokeWidth: "3px", strokeDasharray: "99999", strokeDashoffset: "99999" }}
          />
        </svg>
      </div>

      {/* Portal rectangle — starts small, expands to fill viewport */}
      <div ref={portalRef} style={{
        position: "absolute",
        top: "50vh",
        left: "50%",
        width:  `${RECT_W}px`,
        height: `${RECT_H}px`,
        marginLeft: `-${RECT_W / 2}px`,
        marginTop:  `-${RECT_H / 2}px`,
        background: "#ffffff",
        border: "2px solid #000000",
        visibility: "hidden",
        opacity: 0,
        zIndex: 50,
        overflow: "hidden",
        transformOrigin: "center center",
      }}>
        {/* Inner div counter-scales so content stays readable during portal expansion */}
        <div ref={innerRef} style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "100vw", height: "100vh",
          marginLeft: "-50vw", marginTop: "-50vh",
          transformOrigin: "center center",
        }}>
          <PortalContent />
        </div>
      </div>
    </div>
  );
}
