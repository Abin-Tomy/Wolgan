"use client";
import { Typography } from "@/components/ui/Typography";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";

const services = [
  "Chilled Water System Installation",
  "Primary and Secondary Chilled Water System",
  "Energy Transfer Station and HEX Buildings",
  "Heating Ventilation and Air Conditioning Systems (HVAC)",
  "Plumbing Systems – Potable Water and Drainage",
];

import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { MobileMEPInstallationsPage } from "./mobile/MobileMEPInstallationsPage";
import { Footer } from "@/components/Footer";

function DesktopMEPInstallationsPage() {
  return (
    <SmoothScroll>
      <main className="bg-[#0A1F3C] min-h-screen text-white pt-32 pb-20">
        <Header />
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Typography variant="tagline" className="text-[#ff7e33] mb-4">
              Infrastructure & Services
            </Typography>
            <Typography variant="h1" className="text-white mb-12">
              MEP Installations
            </Typography>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
              <div className="lg:col-span-1">
                <Typography variant="h2" className="text-white mb-6">Our Services</Typography>
                <p className="text-white/60 leading-relaxed mb-8">
                  We provide high-precision mechanical, electrical, and plumbing execution for large-scale infrastructure projects across healthcare, hospitality, and commercial sectors.
                </p>
                <div className="h-1 w-20 bg-[#ff7e33]" />
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, i) => (
                  <div key={i} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ff7e33]/50 transition-all duration-300">
                    <div className="text-white/30 text-xs font-mono mb-4">0{i + 1}</div>
                    <Typography variant="h3" className="text-white group-hover:text-[#ff7e33] transition-colors duration-300">
                      {service}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#ff7e33] p-12 rounded-3xl text-white">
              <Typography variant="h2" className="mb-6">Ready to start a project?</Typography>
              <p className="text-xl opacity-90 mb-8 max-w-2xl">
                Our team of experts is ready to help you with your MEP installation and maintenance needs. Contact us today for a consultation.
              </p>
              <a 
                href="/#contact" 
                className="inline-block bg-white text-[#ff7e33] px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}

export function MEPInstallationsPage() {
  return (
    <ResponsiveWrapper
      desktop={<DesktopMEPInstallationsPage />}
      mobile={<MobileMEPInstallationsPage />}
    />
  );
}
