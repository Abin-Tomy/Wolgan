"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface CurtainContextValue {
  curtainRef: React.RefObject<HTMLDivElement | null>;
  /** Slide curtain away to the left. Pass duration to control speed. */
  open: (opts?: { duration?: number }) => Promise<void>;
  /** Slide curtain in from the right (covers page). */
  close: () => Promise<void>;
  isReady: boolean;
}

/* ─────────────────────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────────────────────── */
const CurtainContext = createContext<CurtainContextValue>({
  curtainRef: { current: null },
  open: () => Promise.resolve(),
  close: () => Promise.resolve(),
  isReady: false,
});

/* ─────────────────────────────────────────────────────────────
   PROVIDER
───────────────────────────────────────────────────────────── */
export function CurtainProvider({ children }: { children: ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const [isReady] = useState(false);

  /**
   * open — slides the curtain panel off to the LEFT.
   * The logo (inside the curtain) naturally exits with it.
   * No opacity needed — it's off-screen when translateX is -100%.
   */
  const open = useCallback((opts?: { duration?: number }): Promise<void> => {
    const duration = opts?.duration ?? 1.3;

    return new Promise((resolve) => {
      const curtain = curtainRef.current;
      if (!curtain) { resolve(); return; }

      gsap.to(curtain, {
        x: "-100%",
        duration,
        ease: "expo.inOut",
        onComplete: resolve,
      });
    });
  }, []);

  /**
   * close — slides the curtain panel in from the RIGHT.
   * Logo enters with it centered inside.
   * After this resolves the curtain fully covers the screen.
   */
  const close = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const curtain = curtainRef.current;
      if (!curtain) { resolve(); return; }

      const tl = gsap.timeline({ onComplete: resolve });

      // Start position: curtain is off-screen to the right
      tl.set(curtain, { x: "100%" });

      // Slide in to cover the screen
      tl.to(curtain, {
        x: "0%",
        duration: 1.1,
        ease: "expo.inOut",
      });
    });
  }, []);

  return (
    <CurtainContext.Provider value={{ curtainRef, open, close, isReady }}>
      {/*
        ── Curtain panel ──
        Uses translateX (not scaleX) so the logo child is
        never squished — it just rides along centered inside.

        Initial state: x: 0 (fully covering screen for preloader).
        overflow: hidden clips the logo when curtain is off-screen.
      */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          pointerEvents: "none",
          backgroundColor: "#0f1632",
          transform: "translateX(0)",
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        <Image
          src="/images/Wolgan-logo.png"
          alt="Wolgan"
          aria-hidden={true}
          width={260}
          height={106}
          sizes="260px"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(160px, 20vw, 260px)",
            height: "auto",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      {children}
    </CurtainContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOOK
───────────────────────────────────────────────────────────── */
export function useCurtain(): CurtainContextValue {
  return useContext(CurtainContext);
}
