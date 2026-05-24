"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/* ─────────────────────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────────────────────── */
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
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { contextSafe } = useGSAP({ scope: wrapperRef });

  const navigate = contextSafe((href: string) => {
    if (isTransitioning) return;
    if (href === pathname) return;

    setIsTransitioning(true);

    const tl = gsap.timeline();
    
    // 1. Shrink mask to 1
    tl.fromTo(".page-transition-mask", 
      { scale: 6 },
      {
        scale: 1,
        duration: 0.8,
        ease: "power3.inOut"
      }
    );
    
    // 2. Fade in background behind the hole to "close" it completely
    tl.to(".page-transition-bg", {
      opacity: 1,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(href);
      }
    }, "-=0.2");
    
    // 3. Wait a little bit for the route to render
    tl.to({}, { duration: 0.3 });

    // 4. Fade out background, revealing new page through the hole
    tl.to(".page-transition-bg", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut"
    });

    // 5. Enlarge mask to reveal full new page
    tl.to(".page-transition-mask", {
      scale: 6,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        setIsTransitioning(false);
      }
    }, "-=0.1");
  });

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      <div 
        ref={wrapperRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: isTransitioning ? "all" : "none",
          display: isTransitioning ? "block" : "none",
        }}
      >
        {/* Solid background that fades in/out behind the hole */}
        <div
            className="page-transition-bg"
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "var(--brand-navy)",
              zIndex: 1,
              opacity: 0,
            }}
        />

        {/* Mask with the logo hole */}
        <div
            className="page-transition-mask"
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "var(--brand-navy)",
              maskImage: `linear-gradient(white, white), url("/preloader-bg.svg")`,
              maskPosition: "center, center",
              maskRepeat: "no-repeat, no-repeat",
              maskSize: "100%, 40%",
              maskComposite: "subtract",
              WebkitMaskImage: `linear-gradient(white, white), url("/preloader-bg.svg")`,
              WebkitMaskPosition: "center, center",
              WebkitMaskRepeat: "no-repeat, no-repeat",
              WebkitMaskSize: "100%, 40%",
              WebkitMaskComposite: "destination-out",
              willChange: "transform",
              transformOrigin: "center center",
              zIndex: 2,
              transform: "scale(6)",
            }}
        />
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
