"use client";

import React from "react";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { Contact } from "@/components/Contact";

export function MobileContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-[#020610]">
      <MobileHeader />
      {/* Render the fully functional contact component with full validation and Turnstile */}
      <Contact />
      <div className="relative z-20 -mt-1">
        <MobileFooter waveColor="#020610" />
      </div>
    </div>
  );
}
