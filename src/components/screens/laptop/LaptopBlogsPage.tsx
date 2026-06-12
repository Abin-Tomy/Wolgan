"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { gsap } from "@/lib/gsap";

const LINKEDIN_POSTS = [
  { id: 1, src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7392124039206703106?collapsed=1" },
  { id: 2, src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7350821036344455168?collapsed=1" },
];

const LINKEDIN_PROFILE = "https://www.linkedin.com/company/wolgan-qatar/";

const INSTA_POSTS = [
  { id: 1, permalink: "https://www.instagram.com/p/DJeb6WYBn6e/" },
  { id: 2, permalink: "https://www.instagram.com/p/DSCLwxPEoC2/" },
  { id: 3, permalink: "https://www.instagram.com/p/DReKZ1eEhjM/" },
];

const INSTA_PROFILE = "https://www.instagram.com/wolgan.qa/";

export function LaptopBlogsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (socialRef.current) {
        const cards = socialRef.current.querySelectorAll(".social-card");
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const processInstagramEmbeds = () => {
    if (typeof window !== "undefined" && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  };

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processInstagramEmbeds}
      />

      <main className="bg-[#FDFCFB] min-h-screen overflow-hidden selection:bg-[#0A1F3C] selection:text-white">
        <Header />

        {/* --- HERO SECTION FOR LAPTOP --- */}
        <section
          ref={heroRef}
          className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0A1F3C] pb-12"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about-deck-3.jpg"
              alt="Wolgan Blogs Background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(10,31,60,0.4) 0%, rgba(10,31,60,0.85) 70%, #0A1F3C 100%)",
              }}
            />
          </div>

          <div className="container mx-auto px-8 relative z-10 flex flex-col md:flex-row items-end justify-between gap-8 pt-16">
            <div className="max-w-2xl">
              <span className="inline-block text-[#66B2E8] text-xs font-semibold tracking-widest uppercase mb-6 px-4 py-2 border border-[#66B2E8]/20 bg-white/5 rounded-full backdrop-blur-sm">
                Industry Updates
              </span>
              {/* Reduced font size for laptop */}
              <h1 className="text-5xl lg:text-[4rem] font-light text-white leading-[1.1] tracking-tight">
                Our Feed &{" "}
                <br />
                <span className="font-semibold italic text-[#66B2E8]">
                  Activity.
                </span>
              </h1>
            </div>

            <div className="max-w-sm pb-2 flex flex-col items-start gap-6">
              <p className="text-lg text-white/70 leading-relaxed border-l-4 border-white/20 pl-6">
                Stay updated with our latest operations, engineering milestones,
                and professional network directly from LinkedIn and Instagram.
              </p>
            </div>
          </div>
        </section>

        {/* Asymmetrical Sweeping Curve Divider */}
        <div className="relative w-full overflow-hidden leading-none z-5 bg-[#f8f9fb] -mt-[2px] border-t-[2px] border-[#0A1F3C]">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="w-full h-[60px] md:h-[80px]"
          >
            <path
              fill="#0A1F3C"
              d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"
            />
          </svg>
        </div>

        {/* --- LIVE FEEDS --- */}
        <section className="py-16 bg-[#f8f9fb]">
          <div className="container mx-auto px-8">

            <div ref={socialRef} className="flex flex-col gap-12 max-w-5xl mx-auto">

              {/* LinkedIn Section */}
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-light text-[#0A1F3C] mb-2">
                    Our Latest on{" "}
                    <span className="font-semibold italic text-[#0077b5]">LinkedIn</span>
                  </h3>
                  <p className="text-sm text-black/50 max-w-lg mx-auto">
                    Stay connected with our engineering updates, industry insights, and company milestones.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {LINKEDIN_POSTS.map((post) => (
                    <div key={post.id} className="social-card w-full rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-black/5">
                      <iframe
                        src={post.src}
                        height="550"
                        width="100%"
                        frameBorder="0"
                        allowFullScreen
                        title="Embedded LinkedIn post"
                        style={{ display: "block", minHeight: "400px" }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-6">
                  <a
                    href={LINKEDIN_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 bg-[#0077b5] hover:bg-[#005f91]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    View Our LinkedIn Profile
                  </a>
                </div>
              </div>


              {/* Instagram Section */}
              <div className="pt-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-light text-[#0A1F3C] mb-2">
                    Follow Us on{" "}
                    <span className="font-semibold italic" style={{ background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Instagram</span>
                  </h3>
                  <p className="text-sm text-black/50 max-w-lg mx-auto">
                    Behind the scenes moments, project highlights, and our team in action.
                  </p>
                </div>

                {/* Grid adjusted for laptop screen width to avoid congestion */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
                  {INSTA_POSTS.map((post) => (
                    <div key={post.id} className="social-card flex justify-center">
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={`${post.permalink}?utm_source=ig_embed&utm_campaign=loading`}
                        data-instgrm-version="14"
                        style={{
                          background: "#FFF",
                          border: 0,
                          borderRadius: "12px",
                          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.08)",
                          margin: "0",
                          maxWidth: "100%",
                          minWidth: "260px",
                          padding: 0,
                          width: "100%",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-6">
                  <a
                    href={INSTA_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    View Our Instagram Profile
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
