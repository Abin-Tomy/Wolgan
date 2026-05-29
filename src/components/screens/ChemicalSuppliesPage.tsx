"use client";
import { Typography } from "@/components/ui/Typography";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";

const waterTreatmentChemicals = [
  "Corrosion Inhibitors",
  "Deposit and Scale Control",
  "Microbiological Growth Control",
  "Flocculent & Coagulant",
  "Birm Media (Iron Removal)",
];

const commodityChemicals = [
  "Caustic Soda Solution 48-50%",
  "Sodium Meta Bi-sulphate",
  "Calcium Hypochlorite 65%",
  "Sodium Hypochlorite 12%",
  "Sulphuric Acid 98%",
  "Soda Ash Light",
];

import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { MobileChemicalSuppliesPage } from "./mobile/MobileChemicalSuppliesPage";
import { Footer } from "@/components/Footer";

function DesktopChemicalSuppliesPage() {
  return (
    <SmoothScroll>
      <main className="bg-[#0A1F3C] min-h-screen text-white pt-32 pb-20">
        <Header />
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Typography variant="tagline" className="text-[#ff7e33] mb-4">
              Quality & Supply
            </Typography>
            <Typography variant="h1" className="text-white mb-8">
              Chemical Supplies
            </Typography>

            <div className="prose prose-invert max-w-none mb-16">
              <Typography variant="h3" className="text-white mb-6">
                The Single Source for Complete Supply of Chemicals
              </Typography>
              <p className="text-lg text-white/70 leading-relaxed">
                The demand for safe and clean water is constantly increasing, both to meet human needs and to support industrial activities. Current water resources are unlikely to meet the escalating needs due to urbanization and economic growth. Wolgan thus employs cutting-edge methods of water treatment to produce water suitable for use. 
              </p>
              <p className="text-lg text-white/70 leading-relaxed mt-4">
                In the course of treating water, suspended particles, viruses, fungi, bacteria, algae, and minerals are all eliminated. Both chemical and physical approaches are used in the procedure where Water treatment chemicals utilized in the process. Wolgan provides Water Treatment Chemicals with Corrosion Inhibitors, Scale Control, Microbiological Growth Control, and antisclant to name a few of the processes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#ff7e33]/20 flex items-center justify-center border border-[#ff7e33]/30">
                    <div className="w-4 h-4 rounded-full bg-[#ff7e33]" />
                  </div>
                  <Typography variant="h2" className="text-white">Water Treatment Chemicals</Typography>
                </div>
                <div className="space-y-4">
                  {waterTreatmentChemicals.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <div className="w-4 h-4 rounded-full bg-white/40" />
                  </div>
                  <Typography variant="h2" className="text-white">Commodity Chemicals</Typography>
                </div>
                <div className="space-y-4">
                  {commodityChemicals.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}

export function ChemicalSuppliesPage() {
  return (
    <ResponsiveWrapper
      desktop={<DesktopChemicalSuppliesPage />}
      mobile={<MobileChemicalSuppliesPage />}
    />
  );
}
