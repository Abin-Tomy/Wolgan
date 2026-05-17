"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// Declare global GSAP variable
declare const gsap: any;

export function Preloader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const preloaderTextRef = useRef<HTMLDivElement>(null);

  const isTransitioningRef = useRef(false);

  const getPaths = () =>
    [path1Ref.current, path2Ref.current].filter(Boolean) as SVGPathElement[];

  const setupPaths = () => {
    getPaths().forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
    });
  };

  // 1. leave() -> draws SVG strokes IN, covering the screen
  const leave = (): Promise<void> => {
    return new Promise((resolve) => {
      isTransitioningRef.current = true;
      const tween = gsap.timeline({ onComplete: resolve });
      getPaths().forEach((path) => {
        tween.to(
          path,
          {
            strokeDashoffset: 0,
            attr: { "stroke-width": 700 },
            duration: 1,
            ease: "power1.inOut",
          },
          0
        );
      });
    });
  };

  // 2. enter() -> wipes SVG strokes OUT, revealing content
  const enter = (): Promise<void> => {
    return new Promise((resolve) => {
      const tween = gsap.timeline({
        onComplete: () => {
          isTransitioningRef.current = false;
          resolve();
        },
      });
      getPaths().forEach((path) => {
        const length = path.getTotalLength();
        tween.to(
          path,
          {
            strokeDashoffset: -length,
            attr: { "stroke-width": 200 },
            duration: 1,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.set(path, { strokeDashoffset: length });
            },
          },
          0
        );
      });
    });
  };

  const [gsapLoaded, setGsapLoaded] = useState(false);

  // Expose leave and enter globally on window.Preloader
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).Preloader = { leave, enter };
    }
  }, [gsapLoaded]);

  // Initialize and run preloader sequence
  useEffect(() => {
    const runPreloader = async () => {
      setupPaths();
      
      // Rule 1: PRELOADER - strokes pre-set to fully drawn in instantly
      getPaths().forEach((path) => {
        gsap.set(path, { strokeDashoffset: 0, attr: { "stroke-width": 700 } });
      });

      // Fade in preloader text
      if (preloaderTextRef.current) {
        gsap.fromTo(
          preloaderTextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      }

      // Hold loader for 2.5 seconds
      await new Promise((r) => setTimeout(r, 2500));

      // Fade out preloader text
      if (preloaderTextRef.current) {
        await new Promise<void>((r) =>
          gsap.to(preloaderTextRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in",
            onComplete: r,
          })
        );
      }
      setShowPreloader(false);

      // Rule 1: Call enter() once to reveal the page
      await enter();
    };

    // Load GSAP from CDN
    if (document.getElementById("gsap-script")) {
      setGsapLoaded(true);
      runPreloader();
      return;
    }
    const script = document.createElement("script");
    script.id = "gsap-script";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => {
      setGsapLoaded(true);
      runPreloader();
    };
    document.head.appendChild(script);
  }, []);

  // Rule 2: EVERY page navigation link click: Call leave() -> swap content -> enter()
  useEffect(() => {
    const handleGlobalClick = async (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Skip same-page hash scrolling
      if (href.startsWith("#") || href.includes("#")) {
        return;
      }

      // Check if internal navigation link
      if (!href.startsWith("/") && !href.startsWith(window.location.origin)) {
        return;
      }

      if (target.getAttribute("target") === "_blank") {
        return;
      }

      const targetUrl = new URL(href, window.location.origin);
      if (targetUrl.pathname === pathname) {
        return;
      }

      e.preventDefault();

      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      // Draw strokes in
      await leave();

      // Navigate to the next page
      router.push(href);
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [router, pathname]);

  // Once pathname change is detected, trigger enter() to wipe strokes out
  useEffect(() => {
    if (isTransitioningRef.current) {
      enter();
    }
  }, [pathname, searchParams]);

  return (
    <>
      <style>{`
        .preloader-bg {
          position: fixed;
          inset: 0;
          background: #030A16; /* Ultra-deep luxury dark navy base */
          z-index: 9998;
          pointer-events: none;
          overflow: hidden;
        }

        .preloader-blur-1 {
          position: absolute;
          top: -20%;
          left: -20%;
          width: 75%;
          height: 75%;
          background: radial-gradient(circle, rgba(16, 53, 101, 0.75) 0%, rgba(10, 31, 60, 0) 70%);
          filter: blur(100px);
          animation: preloader-float-1 18s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .preloader-blur-2 {
          position: absolute;
          bottom: -20%;
          right: -20%;
          width: 85%;
          height: 85%;
          background: radial-gradient(circle, rgba(20, 68, 128, 0.7) 0%, rgba(10, 31, 60, 0) 70%);
          filter: blur(120px);
          animation: preloader-float-2 22s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .preloader-blur-3 {
          position: absolute;
          top: 30%;
          left: 10%;
          width: 55%;
          height: 55%;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.18) 0%, rgba(197, 160, 89, 0) 65%);
          filter: blur(90px);
          animation: preloader-float-3 24s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .preloader-blur-4 {
          position: absolute;
          top: -10%;
          right: 20%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, rgba(10, 31, 60, 0.6) 0%, rgba(3, 10, 22, 0) 70%);
          filter: blur(80px);
          animation: preloader-float-4 15s ease-in-out infinite alternate;
          pointer-events: none;
        }

        @keyframes preloader-float-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(80px, 120px) scale(1.15); }
        }

        @keyframes preloader-float-2 {
          0% { transform: translate(0px, 0px) scale(1.1); }
          100% { transform: translate(-120px, -80px) scale(0.9); }
        }

        @keyframes preloader-float-3 {
          0% { transform: translate(0px, 0px) scale(0.95) rotate(0deg); }
          100% { transform: translate(60px, -60px) scale(1.1) rotate(60deg); }
        }

        @keyframes preloader-float-4 {
          0% { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-70px, 90px) scale(1.1); }
        }

        .transition-svg {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.5);
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }

        .transition-svg svg {
          width: 100%;
          height: 100%;
        }

        .transition-svg path {
          stroke-dashoffset: 99999;
          stroke-dasharray: 99999;
        }

        .preloader-text {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10000;
          pointer-events: none;
          opacity: 0;
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(4rem, 12vw, 14rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
          text-transform: uppercase;
          color: #ffffff;
          mix-blend-mode: overlay;
        }
      `}</style>

      {/* Dynamic Brand-Navy & Gold blur background and Loader text visible on load */}
      {showPreloader && (
        <>
          <div className="preloader-bg">
            <div className="preloader-blur-1" />
            <div className="preloader-blur-2" />
            <div className="preloader-blur-3" />
            <div className="preloader-blur-4" />
          </div>
          <div className="preloader-text" ref={preloaderTextRef}>
            wolgan
          </div>
        </>
      )}

      {/* SVG Transition overlay */}
      <div className="transition-svg" aria-hidden="true">
        <svg
          viewBox="0 0 2453 2535"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            ref={path1Ref}
            d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
            stroke="#d8d9d7"
            strokeWidth="200"
            strokeLinecap="round"
          />
          <path
            ref={path2Ref}
            d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
            stroke="#0a1628"
            strokeWidth="200"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
