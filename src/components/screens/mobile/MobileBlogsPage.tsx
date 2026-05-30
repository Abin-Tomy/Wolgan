"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";

const FEATURED_POSTS = [
  { id: 1, title: "The Future of Sustainable Water Treatment Facilities", category: "SUSTAINABILITY", date: "October 12, 2024", image: "/images/water-treatment-service.jpg" },
  { id: 2, title: "Optimizing MEP Systems", category: "HVAC SYSTEMS", date: "September 28, 2024", image: "/images/MEP-installation-service.webp" },
  { id: 3, title: "Breakthrough in Industrial Descaling", category: "CHEMICAL SUPPLY", date: "September 15, 2024", image: "/images/chemical-supplies-services.webp" },
];

const LATEST_ARTICLES = [
  { id: 6, title: "Advancements in Reverse Osmosis Membranes", category: "Water Treatment", date: "July 22, 2024", image: "/images/about-deck-2.jpg" },
  { id: 7, title: "The Role of IoT in Smart Pumping Stations", category: "Industrial Automation", date: "July 10, 2024", image: "/images/about-waterplant.webp" },
  { id: 8, title: "Chilled Water Systems for High-Rise Structures", category: "HVAC Systems", date: "June 28, 2024", image: "/images/mep-installation.jpeg" },
];

const SOCIAL_POSTS = [
  { id: 1, type: "LinkedIn", author: "Tanaji Dange", date: "2 days ago", content: "Proud to announce our team's successful commissioning of the new 50,000 CMD desalination plant. Engineering excellence in action. 💧🏗️", image: "/images/mep-installation.jpeg" },
  { id: 2, type: "Project Snapshot", author: "Wolgan Engineering", date: "1 week ago", content: "Final safety checks on the centralized chiller plant upgrade for our commercial tower project. Staying cool under pressure.", image: "/images/about-deck-3.jpg" }
];

export function MobileBlogsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mobile-hero-anim", { y: 20, opacity: 0, duration: 1, ease: "power2.out", stagger: 0.1 });
      
      gsap.utils.toArray(".mobile-fade-up").forEach((el: any) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%" }, y: 30, opacity: 0, duration: 0.8, ease: "power2.out" });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-[#FDFCFB]" ref={containerRef}>
      <MobileHeader />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end pb-16 px-6 bg-[#0A1F3C]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/about-deck-3.jpg" alt="Background" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/40" />
        </div>

        <div className="relative z-10 mt-24">
          <span className="mobile-hero-anim inline-block text-[#66B2E8] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 px-4 py-2 border border-[#66B2E8]/30 bg-[#66B2E8]/10 rounded-full">
            Knowledge Hub
          </span>
          <h1 className="mobile-hero-anim text-4xl font-light text-white leading-tight tracking-tight mb-6">
            Insights & <br/>
            <span className="font-semibold italic text-[#66B2E8]">Updates.</span>
          </h1>
          <p className="mobile-hero-anim text-sm text-white/70 leading-relaxed border-l-2 border-[#66B2E8] pl-4">
            Industry trends, engineering breakthroughs, technical expertise, and company developments shaping the future of industrial infrastructure.
          </p>
        </div>
      </section>

      {/* Curve */}
      <div className="relative w-full overflow-hidden leading-none z-20 bg-[#FDFCFB] -translate-y-[1px]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px]">
          <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
        </svg>
      </div>

      {/* FEATURED INSIGHTS */}
      <section className="py-12 px-6">
        <div className="mb-10 text-center mobile-fade-up">
          <h2 className="text-3xl font-light text-[#0A1F3C]">
            Featured <span className="font-semibold italic opacity-80">Insights</span>
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {FEATURED_POSTS.map((post) => (
            <div key={post.id} className="mobile-fade-up relative w-full h-[320px] rounded-2xl overflow-hidden group">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] to-transparent opacity-90" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className="text-[9px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full w-fit mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-medium leading-tight mb-3">{post.title}</h3>
                <span className="text-xs text-white/60">{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="py-12 px-6 bg-[#0A1F3C]/5 border-y border-black/5">
        <div className="mb-10 text-center mobile-fade-up">
          <h2 className="text-3xl font-light text-[#0A1F3C]">
            Latest <span className="font-semibold italic opacity-80">Articles</span>
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {LATEST_ARTICLES.map((post) => (
            <div key={post.id} className="mobile-fade-up bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4 border border-black/5">
              <div className="w-full h-40 relative rounded-xl overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#0A1F3C]/60">{post.category}</span>
                  <span className="text-[10px] text-black/40">{post.date}</span>
                </div>
                <h3 className="text-lg font-medium text-[#0A1F3C] leading-snug">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center mobile-fade-up">
           <Button variant="outline" className="w-full justify-center h-12 rounded-full border border-black/10 text-[#0A1F3C]">View All Articles</Button>
        </div>
      </section>

      {/* SOCIAL POSTS */}
      <section className="py-16 px-6">
        <div className="mb-10 text-center mobile-fade-up">
          <h2 className="text-3xl font-light text-[#0A1F3C]">
            Industry <span className="font-semibold italic opacity-80">Activity</span>
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {SOCIAL_POSTS.map((post) => (
             <div key={post.id} className="mobile-fade-up bg-white rounded-2xl p-6 shadow-md border border-black/5">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-[#0A1F3C]/10 flex items-center justify-center font-bold text-[#0A1F3C]">
                   {post.author.charAt(0)}
                 </div>
                 <div>
                   <h4 className="font-semibold text-[#0A1F3C] text-sm">{post.author}</h4>
                   <p className="text-[10px] text-black/40">{post.type} • {post.date}</p>
                 </div>
               </div>
               <p className="text-sm text-black/70 mb-4">{post.content}</p>
               <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden">
                 <Image src={post.image} alt="Social post" fill className="object-cover" />
               </div>
             </div>
          ))}
        </div>
      </section>

      <div className="relative z-20 -mt-1">
        <MobileFooter waveColor="#f8f9fb" />
      </div>
    </div>
  );
}
