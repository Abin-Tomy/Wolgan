"use client";

import { useEffect } from "react";
import { useCurtain } from "@/components/curtain/CurtainContext";

export function Preloader() {
  const { open } = useCurtain();

  useEffect(() => {
    // Hold for 1.4s (logo visible, curtain covering screen),
    // then slide away slowly and smoothly (1.5s duration).
    const timer = setTimeout(() => {
      open({ duration: 1.5 });
    }, 1400);

    return () => clearTimeout(timer);
  }, [open]);

  // Renders nothing — curtain DOM lives inside CurtainProvider
  return null;
}
