"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { gsap } from "@/lib/gsap";

const SOCIAL_POSTS = [
  {
    id: 1,
    type: "LinkedIn",
    author: "Tanaji Dange",
    date: "2 days ago",
    content: "Proud to announce our team's successful commissioning of the new 50,000 CMD desalination plant. Engineering excellence in action. 💧🏗️",
    image: "/images/mep-installation.jpeg",
  },
  {
    id: 2,
    type: "Project Snapshot",
    author: "Wolgan Engineering",
    date: "1 week ago",
    content: "Final safety checks on the centralized chiller plant upgrade for our commercial tower project. Staying cool under pressure.",
    image: "/images/about-deck-3.jpg",
  }
];

const INSTA_POSTS = [
  {
    id: 1,
    image: "/images/about-deck-1.jpg",
  },
  {
    id: 2,
    image: "/images/mep-installation.jpeg",
  },
  {
    id: 3,
    image: "/images/water-treatment-service.jpg",
  }
];

import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { MobileBlogsPage } from "./mobile/MobileBlogsPage";

function DesktopBlogsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Social Posts
      if (socialRef.current) {
        const cards = socialRef.current.querySelectorAll('.social-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 85%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <main className="bg-[#FDFCFB] min-h-screen overflow-hidden selection:bg-[#0A1F3C] selection:text-white">
        <Header />
        
        {/* --- HERO SECTION --- */}
        <section ref={heroRef} className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0A1F3C]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about-deck-3.jpg"
              alt="Wolgan Blogs Background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to bottom, rgba(10,31,60,0.4) 0%, rgba(10,31,60,0.85) 70%, #0A1F3C 100%)",
            }} />
          </div>

          <div className="container mx-auto px-6 md:px-14 relative z-10 flex flex-col md:flex-row items-end justify-between gap-12 pt-20">
            <div className="max-w-4xl">
              <span className="inline-block text-[#66B2E8] text-sm font-semibold tracking-widest uppercase mb-8 px-5 py-2.5 border border-[#66B2E8]/20 bg-white/5 rounded-full backdrop-blur-sm">
                Industry Updates
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-light text-white leading-[1.1] tracking-tight">
                Our Feed & <br/>
                <span className="font-semibold italic text-[#66B2E8]">Activity.</span>
              </h1>
            </div>
            
            <div className="max-w-md pb-4 flex flex-col items-start gap-8">
              <p className="text-xl text-white/70 leading-relaxed border-l-4 border-white/20 pl-8">
                Stay updated with our latest operations, engineering milestones, and professional network directly from LinkedIn and Instagram.
              </p>
            </div>
          </div>
        </section>

        {/* Asymmetrical Sweeping Curve Divider */}
        <div className="relative w-full overflow-hidden leading-none z-0 bg-[#f8f9fb] -mt-[2px]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px] md:h-[120px]">
            <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
          </svg>
        </div>

        {/* --- INDUSTRY HIGHLIGHTS / SOCIAL PROOF --- */}
        <section className="py-24 bg-[#f8f9fb]">
          <div className="container mx-auto px-6 md:px-14">
            <div className="max-w-7xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-[#0A1F3C] mb-4 text-center">
                Live <span className="font-semibold italic opacity-80">Feeds</span>
              </h2>
            </div>

            <div ref={socialRef} className="flex flex-col gap-16 max-w-7xl mx-auto">
              
              {/* LinkedIn Section — horizontal row of cards */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <svg className="w-8 h-8 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <h3 className="text-2xl font-semibold text-[#0A1F3C]">LinkedIn Feed</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {SOCIAL_POSTS.map((post) => (
                    <div key={post.id} className="social-card bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-black/5 border border-black/5 flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#0A1F3C]/10 flex items-center justify-center font-bold text-[#0A1F3C]">
                            {post.author.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#0A1F3C]">{post.author}</h4>
                            <p className="text-xs text-black/40">{post.type} • {post.date}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-black/70 mb-6 text-sm leading-relaxed flex-1">
                        {post.content}
                      </p>
                      <div className="w-full aspect-[2/1] relative rounded-lg overflow-hidden border border-black/5">
                        <Image src={post.image} alt="Social post image" fill className="object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instagram Section — horizontal row of cards */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#0A1F3C]">Instagram Feed</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {INSTA_POSTS.map((post) => (
                    <div key={post.id} className="social-card bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 p-[2px]">
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center border border-white">
                              <span className="text-[10px] font-bold text-gray-800">W</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-900 leading-none">wolgan_engineering</span>
                          </div>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="w-full aspect-square relative bg-gray-100">
                        <Image src={post.image} alt="Instagram Post" fill className="object-cover" />
                      </div>

                      {/* Footer / Actions */}
                      <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-gray-800 hover:text-red-500 cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <svg className="w-6 h-6 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-1">
                          <div className="w-8 h-2 bg-gray-200 rounded-full" />
                          <div className="w-16 h-2 bg-gray-200 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}

export function BlogsPage() {
  return (
    <ResponsiveWrapper
      desktop={<DesktopBlogsPage />}
      mobile={<MobileBlogsPage />}
    />
  );
}
