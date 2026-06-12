"use client";
import { useEffect, useRef, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, Zap, Star } from "lucide-react";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

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
  const cards = [
    { title: "Quality Materials", desc: "Sourcing only the finest, internationally certified materials.", icon: ShieldCheck },
    { title: "24/7 Service", desc: "Round-the-clock support ensuring your systems never halt.", icon: Clock },
    { title: "Quick Estimates", desc: "Accurate, transparent, and rapid project cost estimation.", icon: Zap },
    { title: "Professional Touch", desc: "Expert engineers bringing decades of experience to every job.", icon: Star },
  ];

  return (
    <section style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "0 clamp(2rem, 8vw, 10rem)",
      background: "radial-gradient(ellipse at center, #e0f2fe 0%, #f0f9ff 50%, #ffffff 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Decorative Wave SVG — Fades out on the right so it doesn't clash with text */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-60"
        style={{
          maskImage: "linear-gradient(to right, black 30%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.15) 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 30%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.15) 90%, transparent 100%)"
        }}
      >
        <svg viewBox="0 0 1200 800" className="w-full h-full min-w-[1200px] absolute" preserveAspectRatio="xMidYMid slice">
          <path 
            className="why-wave-path"
            d="M -100,500 C 200,700 400,100 600,400 C 800,700 1000,200 1300,400" 
            fill="none" 
            stroke="#0A1F3C" 
            strokeWidth="1.5" 
            strokeDasharray="3500"
            strokeDashoffset="3500"
            strokeLinecap="round"
          />
          <path 
            className="why-wave-path-2"
            d="M -100,520 C 180,720 380,120 580,420 C 780,720 980,220 1280,420" 
            fill="none" 
            stroke="#66B2E8" 
            strokeWidth="1" 
            strokeDasharray="3500"
            strokeDashoffset="3500"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row items-center w-full max-w-[72rem] gap-12 lg:gap-20 relative z-10">
        
        {/* Left Side: Animated Cards Deck — all start visible, fly up on scroll */}
        <div className="relative w-full lg:w-1/2 h-[420px] flex justify-center items-center" style={{ overflow: "visible" }}>
          {cards.map((card, i) => {
            /* 
             * Original beautiful fanned stack (centered, pure rotation) - flipped horizontally, reduced slightly
             */
            const deckRots = [4, 1, -3, -7];
            return (
              <div 
                key={i} 
                className={`why-card-${i} absolute w-[290px] md:w-[340px] aspect-square bg-white rounded-3xl p-9 flex flex-col items-center justify-center text-center shadow-[0_20px_60px_rgba(0,0,0,0.10)] border border-blue-50`}
                style={{
                  zIndex: 4 - i,
                  transform: `rotate(${deckRots[i]}deg)`,
                  opacity: 1,
                  willChange: "transform, opacity",
                }}
              >
                <div className="w-16 h-16 rounded-full bg-[#f0f9ff] flex items-center justify-center mb-5 text-[#0A1F3C]">
                  <card.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#0A1F3C] mb-3">{card.title}</h3>
                <p className="text-sm md:text-base text-slate-600 font-light leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Text & Button */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 group">
            <div className="w-10 h-[1px] bg-[var(--brand-navy)] transition-all duration-700 group-hover:w-16 opacity-40" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold" style={{ color: "rgba(10,31,60,0.4)" }}>
              Why Choose Us
            </span>
          </div>
          <h2 className="text-[clamp(2.2rem,3.5vw,3.5rem)] font-light leading-tight tracking-tight mb-8"
              style={{ color: "#0A1F3C" }}>
            Building on <br className="hidden lg:block" />
            <span style={{ color: "rgba(10,31,60,0.28)" }}>Reliability</span> & Expertise.
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
            We provide precision-engineered solutions tailored to your operational needs. Our commitment to international standards and long-term performance makes us the preferred contracting partner.
          </p>

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

    // Section height: expansion runway + pinned content + 3×vh card fly-out runway + slide-over
    if (sectionRef.current) {
      const h = vh * 1.2 + vh * 3 + vh;
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
    let cards: HTMLElement[] = [];

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
      } else if (loc < expansionRunway + vh * 3) {
        // Fully expanded — PINNED for 3×vh so cards can fly out one-by-one
        box.style.position  = "fixed";
        box.style.top       = "50%";
        box.style.overflow  = "visible";
        box.style.transform   = `translate3d(0,0,0) scale(${(vw / RECT_W).toFixed(4)},${(vh / RECT_H).toFixed(4)})`;
        inner.style.transform = `scale(${(RECT_W / vw).toFixed(4)},${(RECT_H / vh).toFixed(4)})`;
        box.style.borderWidth = "0px";
        // SVG line scrolls up out of view
        if (svgCont) { svgCont.style.position = "fixed"; svgCont.style.top = `${-(loc - expansionRunway)}px`; }
      } else {
        // Slide-over complete: release to absolute so it scrolls naturally off-screen
        const pinnedRunway = vh * 3;
        box.style.position    = "absolute";
        box.style.top         = `${expansionRunway + pinnedRunway + vh / 2}px`;
        box.style.transform   = `translate3d(0,0,0) scale(${(vw / RECT_W).toFixed(4)},${(vh / RECT_H).toFixed(4)})`;
        inner.style.transform = `scale(${(RECT_W / vw).toFixed(4)},${(RECT_H / vh).toFixed(4)})`;
        box.style.overflow    = "visible";
        box.style.borderWidth = "0px";
        if (svgCont) { svgCont.style.position = "absolute"; svgCont.style.top = `${expansionRunway}px`; }
      }

      /* 4. Cards fly OUT upward one-by-one as user scrolls through pinned phase */
      // Query fresh nodes every tick to prevent disconnected DOM nodes from Hot Reloading
      const cardNodes = [
        sectionRef.current?.querySelector(".why-card-0") as HTMLElement,
        sectionRef.current?.querySelector(".why-card-1") as HTMLElement,
        sectionRef.current?.querySelector(".why-card-2") as HTMLElement,
        sectionRef.current?.querySelector(".why-card-3") as HTMLElement,
      ];

      /* flyProgress: 0 → 1 over the 3×vh pinned window */
      const flyProgress = Math.max(0, Math.min(1, (loc - expansionRunway) / (vh * 3)));

      /* Deck resting positions */
      const deckRots = [4, 1, -3, -7];

      cardNodes.forEach((card, i) => {
        if (!card) return;
        /* card 0 exits first (front), card 3 exits last (back) */
        const start = i * 0.22;
        const end   = start + 0.25;
        const raw   = Math.max(0, Math.min(1, (flyProgress - start) / (end - start)));
        const e     = easeCustom(raw);

        const restR = deckRots[i];
        /* fly up: translateY up to -120vh, slight counter-rotate as it leaves */
        card.style.transform = `translateY(${e * -120}vh) rotate(${restR + e * -15}deg)`;
        card.style.opacity   = `${Math.max(0, 1 - e * 1.5)}`;
      });

      /* 5. Trace background wave lines */
      const wavePath = document.querySelector(".why-wave-path") as SVGPathElement;
      const wavePath2 = document.querySelector(".why-wave-path-2") as SVGPathElement;
      
      if (wavePath && wavePath2) {
        // Trace slower during the pinned fly-out phase
        const traceAmt = Math.max(0, Math.min(1, flyProgress * 0.8));
        const offset = 3500 - (traceAmt * 3500);
        wavePath.style.strokeDashoffset = `${offset}`;
        wavePath2.style.strokeDashoffset = `${offset}`;
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

