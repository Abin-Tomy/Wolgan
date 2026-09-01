"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { gsap } from "@/lib/gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MOBILE_FEATURED_POST = {
  slug: "industrial-water-treatment-system-guide",
  category: "Water Treatment",
  title: "Industrial Water Treatment: What Businesses Need to Know Before Choosing a System",
  date: "Aug 21, 2026",
  readTime: "8 min read",
  image: "/images/industrial_water_treatment_hero.jpg",
};

const MOBILE_LATEST_POSTS = [
  {
    slug: "ro-membrane-scaling-causes-prevention",
    category: "Water Treatment",
    title: "RO Membrane Scaling: Causes, Warning Signs and Prevention",
    date: "Aug 21, 2026",
    readTime: "7 min read",
    image: "/images/ro_membrane_skid_system.jpg",
  },
];

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

/* ── Overlay that blocks iframe touch so the parent can scroll ── */
function EmbedCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [interactive, setInteractive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activate = useCallback(() => {
    setInteractive(true);
    // Auto-revert after 8 s of inactivity so scroll works again
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setInteractive(false), 8000);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className={className} style={{ position: "relative" }}>
      {children}

      {/* Transparent overlay – captures swipe for horizontal scroll */}
      {!interactive && (
        <div
          onClick={activate}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "16px",
            background: "linear-gradient(to top, rgba(0,0,0,0.06) 0%, transparent 40%)",
            borderRadius: "inherit",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#0A1F3C",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(6px)",
              padding: "6px 14px",
              borderRadius: "999px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              letterSpacing: "0.02em",
            }}
          >
            Tap to interact
          </span>
        </div>
      )}
    </div>
  );
}


export function MobileBlogsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mobile-hero-anim", { y: 20, opacity: 0, duration: 1, ease: "power2.out", stagger: 0.1 });

      gsap.utils.toArray(".mobile-fade-up").forEach((el) => {
        gsap.from(el as Element, { scrollTrigger: { trigger: el as Element, start: "top 85%" }, y: 30, opacity: 0, duration: 0.8, ease: "power2.out" });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-[#FDFCFB]" ref={containerRef}>
        <MobileHeader />

        {/* HERO SECTION */}
        <section className="relative w-full min-h-[60vh] flex flex-col justify-end pb-16 px-6 bg-[#0A1F3C]">
          <div className="absolute inset-0 z-0">
            <Image src="/images/about-deck-3.jpg" alt="" fill className="object-cover opacity-20" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/80 to-[#0A1F3C]/40" />
          </div>

          <div className="relative z-10 mt-24">
            <span className="mobile-hero-anim inline-block text-[#66B2E8] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 px-4 py-2 border border-[#66B2E8]/30 bg-[#66B2E8]/10 rounded-full">
              Industry Updates
            </span>
            <h1 className="mobile-hero-anim text-4xl font-light text-white leading-tight tracking-tight mb-6">
              Our Feed & <br />
              <span className="font-semibold italic text-[#66B2E8]">Activity.</span>
            </h1>
            <p className="mobile-hero-anim text-sm text-white/70 leading-relaxed border-l-2 border-[#66B2E8] pl-4">
              Stay updated with our latest operations, engineering milestones, and professional network directly from LinkedIn and Instagram.
            </p>
          </div>
        </section>

        {/* Curve */}
        <div className="relative w-full overflow-hidden leading-none z-20 bg-[#0A1F3C] -mt-[2px]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px] block">
            <path fill="#f8f9fb" d="M0,160 C360,40 1080,280 1440,160 L1440,320 L0,320 Z"></path>
          </svg>
        </div>

        {/* ── NEW: Featured Post ── */}
        <section className="bg-[#f8f9fb] pt-8 px-6 pb-6">
          <Link href={`/blogs/${MOBILE_FEATURED_POST.slug}`} className="group relative rounded-2xl overflow-hidden block w-full h-full shadow-lg shadow-black/10">
            <div className="relative w-full h-full min-h-[280px]">
              <Image
                src={MOBILE_FEATURED_POST.image}
                alt={MOBILE_FEATURED_POST.title}
                fill
                sizes="100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#C17A3A] inline-block" />
                  <span className="text-white/90 text-[10px] font-bold tracking-wide uppercase">{MOBILE_FEATURED_POST.category}</span>
                </span>
                <h2 className="text-white text-lg font-semibold leading-snug mb-2">
                  {MOBILE_FEATURED_POST.title}
                </h2>
                <p className="text-white/60 text-xs">{MOBILE_FEATURED_POST.date} &nbsp;•&nbsp; {MOBILE_FEATURED_POST.readTime}</p>
              </div>
            </div>
          </Link>
        </section>

        {/* ── NEW: Latest Posts ── */}
        <section className="bg-[#f8f9fb] px-6 pb-8">
          <h3 className="text-[#0A1F3C] text-base font-semibold mb-4">Latest post</h3>
          <div className="flex flex-col gap-3">
            {MOBILE_LATEST_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group flex items-start gap-3 p-2.5 rounded-xl bg-white shadow-sm shadow-black/5 border border-black/5"
              >
                <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0A1F3C] text-xs font-semibold leading-snug line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-black/40 text-[11px] mt-1">{post.date} &nbsp;•&nbsp; {post.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>


        {/* Divider */}
        <div className="bg-[#f8f9fb] px-6 pb-4">
          <div className="border-t border-black/10" />
        </div>
        <section className="relative z-30 py-12 px-6 bg-[#f8f9fb] -mt-[1px]">
          <div className="mb-10 text-center mobile-fade-up">
            <h2 className="text-3xl font-light text-[#0A1F3C]">
              Live <span className="font-semibold italic opacity-80">Feeds</span>
            </h2>
          </div>

          {/* LinkedIn Feed */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6 mobile-fade-up justify-center">
              <svg className="w-6 h-6 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <h3 className="text-xl font-semibold text-[#0A1F3C]">LinkedIn</h3>
            </div>

            <div className="flex flex-row gap-6 overflow-x-auto pb-6 -mx-6 px-6" style={{ WebkitOverflowScrolling: "touch" }}>
              {LINKEDIN_POSTS.map((post) => (
                <EmbedCard
                  key={post.id}
                  className="mobile-fade-up flex-shrink-0 w-[85vw] max-w-[400px] rounded-2xl overflow-hidden shadow-xl shadow-black/5 border border-black/5 bg-white"
                >
                  <iframe
                    src={post.src}
                    height="750"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    title="Embedded LinkedIn post"
                    style={{ display: "block", minHeight: "750px" }}
                  />
                </EmbedCard>
              ))}
            </div>
            <div className="flex justify-center mt-8 mobile-fade-up">
              <a
                href={LINKEDIN_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all active:scale-95 bg-[#0077b5]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                Follow on LinkedIn
              </a>
            </div>
          </div>

          {/* Instagram Feed */}
          <div className="pb-10">
            <div className="flex items-center gap-2 mb-6 mobile-fade-up justify-center">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1F3C]">Instagram</h3>
            </div>

            <div className="flex flex-row gap-6 overflow-x-auto pb-6 -mx-6 px-6" style={{ WebkitOverflowScrolling: "touch" }}>
              {INSTA_POSTS.map((post) => (
                <EmbedCard
                  key={post.id}
                  className="mobile-fade-up flex-shrink-0 w-[85vw] max-w-[340px] rounded-2xl overflow-hidden shadow-xl shadow-black/5 border border-black/5 bg-white"
                >
                  <iframe
                    src={`${post.permalink}embed/`}
                    height="680"
                    width="100%"
                    frameBorder="0"
                    scrolling="no"
                    title="Embedded Instagram post"
                    style={{ display: "block", minHeight: "680px", borderRadius: "12px" }}
                  />
                </EmbedCard>
              ))}
            </div>
            <div className="flex justify-center mt-8 mobile-fade-up">
              <a
                href={INSTA_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>

        <div className="relative z-20 -mt-1">
          <MobileFooter waveColor="#f8f9fb" />
        </div>
      </div>
    </>
  );
}
