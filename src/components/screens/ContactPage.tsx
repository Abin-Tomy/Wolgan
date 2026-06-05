"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
// Mobile version of the contact page layout
import { MobileContactPage } from "./mobile/MobileContactPage";

function DesktopContactPage() {
  return (
    <SmoothScroll>
      <main className="bg-[#020610] min-h-screen overflow-hidden">
        <Header />
        {/* We render the fully functional desktop contact form directly */}
        <Contact />
        <Footer waveColor="#020610" />
      </main>
    </SmoothScroll>
  );
}

export function ContactPage() {
  return (
    <ResponsiveWrapper
      desktop={<DesktopContactPage />}
      mobile={<MobileContactPage />}
    />
  );
}
