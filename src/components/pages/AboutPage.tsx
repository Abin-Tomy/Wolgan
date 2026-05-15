"use client";
import React from "react";
import { Typography } from "@/components/ui/Typography";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";

export function AboutPage() {
  return (
    <SmoothScroll>
      <main className="bg-[#0A1F3C] min-h-screen text-white pt-32 pb-20">
        <Header />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Typography variant="tagline" className="text-[#ff7e33] mb-4">
              About Wolgan
            </Typography>
            <Typography variant="h1" className="text-white mb-12">
              Engineering Excellence <br />
              <span className="text-white/60">Since 2020</span>
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-white/80">
                  Wolgan is a team of experienced and highly qualified individuals who provide excellent service for various commercial & residential sectors across Qatar. 
                </p>
                <p className="text-lg leading-relaxed text-white/80">
                  Since our inception in 2020, we provide timely quality services & solutions to our clients. Our approach combines technical expertise with a deep commitment to sustainable engineering practices.
                </p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="text-5xl font-light text-[#ff7e33] mb-2">50+</div>
                  <div className="text-sm uppercase tracking-widest text-white/40">Successful Projects</div>
                </div>
                <div>
                  <div className="text-5xl font-light text-[#ff7e33] mb-2">2020</div>
                  <div className="text-sm uppercase tracking-widest text-white/40">Year Established</div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <Typography variant="h2" className="text-white">Our Vision</Typography>
              <p className="text-xl leading-relaxed text-white/70 italic border-l-4 border-[#ff7e33] pl-8">
                "To be the leading provider of sustainable water and engineering solutions in Qatar, driven by innovation, quality, and a commitment to environmental stewardship."
              </p>
            </div>
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
