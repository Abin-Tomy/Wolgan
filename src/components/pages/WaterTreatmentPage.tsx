"use client";
import React from "react";
import { Typography } from "@/components/ui/Typography";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";

const solutions = [
  "Wastewater Treatment (Design, Build, Operate & Maintain)",
  "Grey Water System",
  "RO Polishing Unit",
  "Containerized RO Polishing Unit",
  "Effluent/Sewage Treatment Plant",
  "Ultra-Filtration System",
  "Water Treatment System",
  "Condenser Water System",
  "Chilled Water System",
  "Boiler Water System",
  "Domestic Water System",
  "Water Treatment Equipment",
  "Automatic/Manual Chemical Dosing Controls",
  "Automatic/Manual Side Stream Filtration Units",
  "Cooling Tower Sweeper System",
];

export function WaterTreatmentPage() {
  return (
    <SmoothScroll>
      <main className="bg-[#0A1F3C] min-h-screen text-white pt-32 pb-20">
        <Header />
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Typography variant="tagline" className="text-[#ff7e33] mb-4">
              Our Expertise
            </Typography>
            <Typography variant="h1" className="text-white mb-8">
              Water Treatment Solutions
            </Typography>

            <div className="bg-white/5 p-10 rounded-3xl border border-white/10 mb-16">
              <Typography variant="h3" className="text-white mb-6">
                The Single Source for Complete Water Treatment Solutions & Supply of Chemicals
              </Typography>
              <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                <p>
                  Water treatment requires in-depth knowledge and skills to understand, rectify & even build specific systems that are customized to its surrounding operations. Any procedure that raises the quality of water to make it more suitable for a certain end user is referred to as water treatment.
                </p>
                <p>
                  This concept covers physical procedures that modify the characteristics of water by removing solutes or altering its pH, as well as procedures to remove undesired components like germs and other pollutants. Wolgan is a team of experienced and highly qualified individuals who provide excellent service for various commercial & residential sectors across Qatar.
                </p>
                <p>
                  The demand for safe and clean water is constantly increasing, both to meet human needs and to support industrial activities. Current water resources are unlikely to meet the escalating needs due to urbanization and economic growth. Wolgan thus employs cutting-edge methods of water treatment to produce water suitable for use.
                </p>
              </div>
            </div>

            <Typography variant="h2" className="text-white mb-10">Our Comprehensive Range</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solutions.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                  <div className="w-2 h-2 rounded-full bg-[#ff7e33]" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
