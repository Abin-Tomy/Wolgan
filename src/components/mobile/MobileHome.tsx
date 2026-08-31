"use client";

import { MobileHeader } from "./MobileHeader";
import { MobileHero } from "./MobileHero";
import { MobileAbout } from "./MobileAbout";
import { MobileCinematic } from "./MobileCinematic";
import { MobileClientsPartners } from "./MobileClientsPartners";
import { MobileWhyChooseUs } from "./MobileWhyChooseUs";
import { HomeFAQ } from "@/components/HomeFAQ";
import { MobileContact } from "./MobileContact";
import { MobileFooter } from "./MobileFooter";

export function MobileHome() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <MobileHeader />
      <MobileHero />
      <MobileAbout />
      <MobileCinematic />
      <MobileWhyChooseUs />
      <MobileClientsPartners />
      <MobileContact />
      <HomeFAQ />
      <div className="relative z-20 -mt-1">
        <MobileFooter waveColor="#0A1F3C" waveStroke="rgba(255,255,255,0.05)" />
      </div>
    </div>
  );
}
