"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";

const SOCIAL_POSTS = [
  { id: 1, type: "LinkedIn", author: "Tanaji Dange", date: "2 days ago", content: "Proud to announce our team's successful commissioning of the new 50,000 CMD desalination plant. Engineering excellence in action. 💧🏗️", image: "/images/mep-installation.jpeg" },
  { id: 2, type: "Project Snapshot", author: "Wolgan Engineering", date: "1 week ago", content: "Final safety checks on the centralized chiller plant upgrade for our commercial tower project. Staying cool under pressure.", image: "/images/about-deck-3.jpg" }
];

const INSTA_POSTS = [
  { id: 1, image: "/images/about-deck-1.jpg" },
  { id: 2, image: "/images/mep-installation.jpeg" },
  { id: 3, image: "/images/water-treatment-service.jpg" }
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
            Industry Updates
          </span>
          <h1 className="mobile-hero-anim text-4xl font-light text-white leading-tight tracking-tight mb-6">
            Our Feed & <br/>
            <span className="font-semibold italic text-[#66B2E8]">Activity.</span>
          </h1>
          <p className="mobile-hero-anim text-sm text-white/70 leading-relaxed border-l-2 border-[#66B2E8] pl-4">
            Stay updated with our latest operations, engineering milestones, and professional network directly from LinkedIn and Instagram.
          </p>
        </div>
      </section>

      {/* Curve */}
      <div className="relative w-full overflow-hidden leading-none z-20 bg-[#f8f9fb] -translate-y-[1px]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px]">
          <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
        </svg>
      </div>

      {/* SOCIAL POSTS */}
      <section className="py-12 px-6 bg-[#f8f9fb]">
        <div className="mb-10 text-center mobile-fade-up">
          <h2 className="text-3xl font-light text-[#0A1F3C]">
            Live <span className="font-semibold italic opacity-80">Feeds</span>
          </h2>
        </div>
        
        {/* LinkedIn Feed */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6 mobile-fade-up">
            <svg className="w-6 h-6 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <h3 className="text-xl font-semibold text-[#0A1F3C]">LinkedIn</h3>
          </div>
          <div className="flex flex-row gap-4 overflow-x-auto pb-2 -mx-6 px-6">
            {SOCIAL_POSTS.map((post) => (
               <div key={post.id} className="mobile-fade-up bg-white rounded-2xl p-5 shadow-md border border-black/5 flex-shrink-0 w-[80vw] max-w-[320px] flex flex-col">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-[#0A1F3C]/10 flex items-center justify-center font-bold text-[#0A1F3C]">
                     {post.author.charAt(0)}
                   </div>
                   <div>
                     <h4 className="font-semibold text-[#0A1F3C] text-sm">{post.author}</h4>
                     <p className="text-[10px] text-black/40">{post.type} • {post.date}</p>
                   </div>
                 </div>
                 <p className="text-sm text-black/70 mb-4 flex-1">{post.content}</p>
                 <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden">
                   <Image src={post.image} alt="Social post" fill className="object-cover" />
                 </div>
               </div>
            ))}
          </div>
        </div>

        {/* Instagram Feed */}
        <div className="pb-10">
          <div className="flex items-center gap-2 mb-6 mobile-fade-up">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#0A1F3C]">Instagram</h3>
          </div>
          <div className="flex flex-row gap-4 overflow-x-auto pb-2 -mx-6 px-6">
            {INSTA_POSTS.map((post) => (
              <div key={post.id} className="mobile-fade-up bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col flex-shrink-0 w-[65vw] max-w-[240px]">
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 p-[2px]">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center border border-white">
                        <span className="text-[9px] font-bold text-gray-800">W</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-gray-900 leading-none">wolgan_engineering</span>
                    </div>
                  </div>
                </div>
                <div className="w-full aspect-square relative bg-gray-100">
                  <Image src={post.image} alt="Instagram Post" fill className="object-cover" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-800 hover:text-red-500 cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg className="w-5 h-5 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-1.5 bg-gray-200 rounded-full" />
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-1">
        <MobileFooter waveColor="#f8f9fb" />
      </div>
    </div>
  );
}
