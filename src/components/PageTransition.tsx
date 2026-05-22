"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const NUM_BLOCKS    = 10;
const STAGGER_MS    = 55;
const LIFT_DURATION = 700;
const DROP_DURATION = 600;
const LIFT_EASE     = "cubic-bezier(0.76, 0, 0.24, 1)";
const DROP_EASE     = "cubic-bezier(0.76, 0, 0.24, 1)";
const CLOSE_TOTAL   = DROP_DURATION + STAGGER_MS * (NUM_BLOCKS - 1) + 60; // 1155ms
const OPEN_TOTAL    = LIFT_DURATION + STAGGER_MS * (NUM_BLOCKS - 1) + 60; // 1255ms

/* ─────────────────────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────────────────────── */
type Phase = "idle" | "closing" | "opening" | "closed";

interface TransitionContextValue {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

/* ─────────────────────────────────────────────────────────────
   PROVIDER
───────────────────────────────────────────────────────────── */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "closing" | "opening">("idle");
  const [logoState, setLogoState] = useState<"hidden" | "dropping" | "visible" | "fading">("hidden");

  // Ref array for all block divs
  const blocksRef = useRef<(HTMLDivElement | null)[]>(
    Array(NUM_BLOCKS).fill(null)
  );

  /* ── Helpers ─────────────────────────────────── */

  /** Instantly position all blocks up or down (no transition) */
  const resetBlocks = useCallback((pos: "up" | "down") => {
    blocksRef.current.forEach((el) => {
      if (!el) return;
      el.style.transition = "none";
      el.style.transform  = pos === "up" ? "translateY(-105%)" : "translateY(0%)";
      // Force a style flush so the next transition frame starts from this state
      void el.offsetWidth;
    });
  }, []);

  /** Stagger-lift blocks left → right (off screen upward) */
  const liftBlocks = useCallback(() => {
    blocksRef.current.forEach((el, i) => {
      if (!el) return;
      el.style.transition = `transform ${LIFT_DURATION}ms ${LIFT_EASE} ${i * STAGGER_MS}ms`;
      el.style.transform  = "translateY(-105%)";
    });
  }, []);

  /** Stagger-drop blocks right → left (cover screen downward) */
  const dropBlocks = useCallback(() => {
    // Iterate in REVERSE for right-to-left stagger feel
    const reversed = [...blocksRef.current].reverse();
    reversed.forEach((el, i) => {
      if (!el) return;
      el.style.transition = `transform ${DROP_DURATION}ms ${DROP_EASE} ${i * STAGGER_MS}ms`;
      el.style.transform  = "translateY(0%)";
    });
  }, []);

  /* ── On mount: page-load open animation ─────── */
  useEffect(() => {
    const t = setTimeout(() => {
      liftBlocks();
      setTimeout(() => setPhase("idle"), OPEN_TOTAL);
    }, 50);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Navigate function ───────────────────────── */
  const navigate = useCallback(
    (href: string) => {
      // Guard: don't trigger if busy or already on target page
      if (phase !== "idle") return;
      if (href === pathname) return;

      setPhase("closing");
      setLogoState("hidden");

      // Blocks are already off-screen (up) at idle — reset without animation
      resetBlocks("up");

      // Double-rAF then drop
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dropBlocks();
          setLogoState("dropping");

          // After all blocks have landed, push route
          setTimeout(() => {
            router.push(href);

            // Wait 400ms so user can register the logo
            setTimeout(() => {
              // Start fading it out to the right
              setLogoState("fading");

              // Wait 600ms for logo to fully fade out
              setTimeout(() => {
                setPhase("opening");
                setLogoState("hidden"); // Reset logo state
                
                // Lift blocks
                liftBlocks();
                setTimeout(() => setPhase("idle"), OPEN_TOTAL);
              }, 600);
            }, 400);

          }, CLOSE_TOTAL);
        });
      });
    },
    [phase, pathname, resetBlocks, dropBlocks, liftBlocks, router]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      {/* Overlay — sits above all content */}
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        9999,
          pointerEvents: phase !== "idle" ? "all" : "none",
        }}
      >
        {/*
          CSS Grid — guarantees seamless columns with no sub-pixel gaps.
          Flexbox with many children causes rounding artefacts at block seams.
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
                // box-shadow in the same color fills any sub-pixel gap
                // between grid columns at fractional viewport widths.
                boxShadow:  "0 0 0 2px #FFFFFF",
                willChange: "transform",
                transform:  "translateY(0%)",
                transition: "none",
              }}
            />
          ))}
        </div>

        {/* Centered Logo for Page Transitions */}
        <div
          style={{
            position:   "absolute",
            top:        "50%",
            left:       "50%",
            transform:  logoState === "hidden" 
              ? "translate3d(-50%, -105vh, 0)" 
              : logoState === "fading" 
                ? "translate3d(-50%, calc(-50% - 40px), 0)" 
                : "translate3d(-50%, -50%, 0)",
            opacity:    logoState === "hidden" ? 0 : logoState === "fading" ? 0 : 1,
            transition: logoState === "dropping"
              ? "transform 600ms cubic-bezier(0.76, 0, 0.24, 1) 260ms, opacity 0.1s 260ms" 
              : logoState === "fading"
                ? "opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1), transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)"
                : "none",
            willChange: "opacity, transform",
            pointerEvents: "none",
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
    </TransitionContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOOK
───────────────────────────────────────────────────────────── */
export function usePageTransition(): TransitionContextValue {
  return useContext(TransitionContext);
}

/* ─────────────────────────────────────────────────────────────
   TRANSITION LINK
   Drop-in replacement for next/link <Link>
───────────────────────────────────────────────────────────── */
type TransitionLinkProps = ComponentPropsWithoutRef<typeof Link>;

export function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Allow modifier keys to open in new tab / default behaviour
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (onClick) onClick(e);
      navigate(href.toString());
    },
    [navigate, href, onClick]
  );

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
