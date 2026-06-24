"use client";

import React, { useState, useEffect } from "react";

interface ResponsiveWrapperProps {
  desktop: React.ReactNode;
  laptop?: React.ReactNode;
  tablet?: React.ReactNode;
  mobile: React.ReactNode;
}

export function ResponsiveWrapper({ desktop, laptop, tablet, mobile }: ResponsiveWrapperProps) {
  const [viewport, setViewport] = useState<"desktop" | "laptop" | "tablet" | "mobile" | "ssr">("ssr");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = (width: number) => {
      if (width >= 1280) {
        setViewport("desktop");
      } else if (width >= 1024) {
        setViewport("laptop");
      } else if (tablet && width >= 768) {
        setViewport("tablet");
      } else {
        setViewport("mobile");
      }
    };

    // Initial check
    handleResize(document.documentElement.clientWidth || window.innerWidth);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use clientWidth to ignore scrollbars, giving true available width
        const width = entry.target.clientWidth;
        
        // Debounce slightly to prevent thrashing during fast resizes
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          handleResize(width);
        }, 50);
      }
    });

    observer.observe(document.documentElement);
    
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [tablet]);

  // During SSR and initial hydration, we render all of them with CSS hiding
  // to prevent layout shifts before React can measure the window.
  if (viewport === "ssr") {
    return (
      <>
        <div className="hidden xl:block w-full h-full">{desktop}</div>
        <div className="hidden lg:block xl:hidden w-full h-full">{laptop ? laptop : desktop}</div>
        {tablet ? (
          <div className="hidden md:block lg:hidden w-full h-full">{tablet}</div>
        ) : null}
        <div className={`block ${tablet ? 'md:hidden' : 'lg:hidden'} w-full h-full`}>
          {mobile}
        </div>
      </>
    );
  }

  // After hydration, we completely unmount the hidden views.
  // This ensures that complex GSAP ScrollTriggers attached to hidden views are destroyed.
  // We keep the w-full h-full wrapper divs because the child components may depend on them.
  if (viewport === "desktop") {
    return <div className="w-full h-full block">{desktop}</div>;
  }
  if (viewport === "laptop") {
    return <div className="w-full h-full block">{laptop ? laptop : desktop}</div>;
  }
  if (viewport === "tablet") {
    return <div className="w-full h-full block">{tablet}</div>;
  }
  return <div className="w-full h-full block">{mobile}</div>;
}
