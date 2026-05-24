"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";

const FEATURED_POSTS = [
  {
    id: 1,
    title: "The Future of Sustainable Water Treatment Facilities",
    category: "SUSTAINABILITY",
    date: "October 12, 2024",
    excerpt: "Exploring next-generation technologies that are drastically reducing the energy footprint of large-scale RO plants across the Middle East.",
    image: "/images/water-treatment-service.jpg",
  },
  {
    id: 2,
    title: "Optimizing MEP Systems",
    category: "HVAC SYSTEMS",
    date: "September 28, 2024",
    excerpt: "How strategic HVAC designs are adapting to unprecedented temperature highs.",
    image: "/images/MEP-installation-service.webp",
  },
  {
    id: 3,
    title: "Breakthrough in Industrial Descaling",
    category: "CHEMICAL SUPPLY",
    date: "September 15, 2024",
    excerpt: "A deep dive into the new biodegradable descaling solutions.",
    image: "/images/chemical-supplies-services.webp",
  },
  {
    id: 4,
    title: "Integrating AI in Water Quality",
    category: "INDUSTRIAL AUTOMATION",
    date: "August 30, 2024",
    excerpt: "Real-time sensory data combined with machine learning is predicting contamination events.",
    image: "/images/about-waterplant.webp",
  },
  {
    id: 5,
    title: "Safety Protocols for Hazardous Transport",
    category: "COMPANY NEWS",
    date: "August 12, 2024",
    excerpt: "Reviewing the updated regional guidelines and our internal commitment to zero-incident operations.",
    image: "/images/about-deck-1.jpg",
  },
];

const CATEGORIES = [
  "All",
  "Water Treatment",
  "HVAC Systems",
  "Chemical Supply",
  "Industrial Automation",
  "Sustainability",
  "Company News",
  "Case Studies"
];

const LATEST_ARTICLES = [
  {
    id: 6,
    title: "Advancements in Reverse Osmosis Membranes",
    category: "Water Treatment",
    date: "July 22, 2024",
    excerpt: "New nanomaterials are increasing pure water yield while decreasing pressure requirements by 15%.",
    image: "/images/about-deck-2.jpg",
  },
  {
    id: 7,
    title: "The Role of IoT in Smart Pumping Stations",
    category: "Industrial Automation",
    date: "July 10, 2024",
    excerpt: "How connected sensors are enabling predictive maintenance and preventing catastrophic failures.",
    image: "/images/about-waterplant.webp",
  },
  {
    id: 8,
    title: "Chilled Water Systems for High-Rise Structures",
    category: "HVAC Systems",
    date: "June 28, 2024",
    excerpt: "Balancing thermal load distribution effectively across 50+ story commercial developments.",
    image: "/images/mep-installation.jpeg",
  },
  {
    id: 9,
    title: "Safe Handling of Industrial Reagents",
    category: "Chemical Supply",
    date: "June 15, 2024",
    excerpt: "Updated protocols for the transport and storage of highly reactive chemical agents.",
    image: "/images/chemical-supplies-services.webp",
  },
  {
    id: 10,
    title: "Solar-Powered Desalination Pilot",
    category: "Sustainability",
    date: "May 30, 2024",
    excerpt: "Our newest pilot plant operates entirely off-grid using advanced photovoltaic arrays.",
    image: "/images/about-deck-1.jpg",
  },
  {
    id: 11,
    title: "Expansion into the African Market",
    category: "Company News",
    date: "May 12, 2024",
    excerpt: "Wolgan secures a $50M contract to upgrade municipal water infrastructure in Kenya.",
    image: "/images/about-deck-3.jpg",
  },
  {
    id: 12,
    title: "Case Study: Retrofitting a 1980s Facility",
    category: "Case Studies",
    date: "April 20, 2024",
    excerpt: "How we modernized an aging water treatment plant without interrupting daily supply.",
    image: "/images/water-treatment-service.jpg",
  },
];

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

export function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [socialTab, setSocialTab] = useState("LinkedIn");
  
  const heroRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.7,
      behavior: 'smooth'
    });
  };

  const handleCarouselScroll = () => {
    if (!latestRef.current) return;
    
    const container = latestRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = container.children;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      // Calculate distance from center of card to center of viewport (container left)
      // Actually, checking distance from left edge is simpler for snapping
      const distance = Math.abs(card.offsetLeft - scrollLeft - container.offsetLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    const activeCard = LATEST_ARTICLES[closestIndex];
    if (activeCard && activeCategory !== activeCard.category) {
      setActiveCategory(activeCard.category);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!latestRef.current) return;
    const container = latestRef.current;
    const cardWidth = (container.children[0] as HTMLElement).offsetWidth + 32; // + gap
    
    container.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    if (!latestRef.current) return;
    
    if (cat === "All") {
      latestRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    
    const index = LATEST_ARTICLES.findIndex(post => post.category === cat);
    if (index !== -1) {
      const card = latestRef.current.children[index] as HTMLElement;
      const scrollPosition = card.offsetLeft - latestRef.current.offsetLeft;
      latestRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Featured Grid
      if (featuredRef.current) {
        const cards = featuredRef.current.querySelectorAll('.featured-card');
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Animate Category Pills
      if (categoriesRef.current) {
        gsap.fromTo(
          categoriesRef.current.children,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 90%",
            }
          }
        );
      }

      // Animate Latest Articles
      if (latestRef.current) {
        const cards = latestRef.current.querySelectorAll('.latest-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: latestRef.current,
              start: "top 85%",
            }
          }
        );
      }

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
              <span className="inline-block text-[#E5D5C5] text-sm font-semibold tracking-widest uppercase mb-8 px-5 py-2.5 border border-[#E5D5C5]/20 bg-white/5 rounded-full backdrop-blur-sm">
                Knowledge Hub
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-light text-white leading-[1.1] tracking-tight">
                Insights & <br/>
                <span className="font-semibold italic text-[#E5D5C5]">Updates.</span>
              </h1>
            </div>
            
            <div className="max-w-md pb-4 flex flex-col items-start gap-8">
              <p className="text-xl text-white/70 leading-relaxed border-l-4 border-white/20 pl-8">
                Industry trends, engineering breakthroughs, technical expertise, and company developments shaping the future of industrial infrastructure.
              </p>
              
              <Button 
                variant="headerCta"
                onClick={scrollToContent}
                className="md:ml-8"
              >
                Explore Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Asymmetrical Sweeping Curve Divider */}
        <div className="relative w-full overflow-hidden leading-none z-0 bg-[#FDFCFB] -mt-[2px]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[40px] md:h-[120px]">
            <path fill="#0A1F3C" d="M0,0 L1440,0 L1440,160 C1080,280 360,40 0,160 Z"></path>
          </svg>
        </div>

        {/* --- FEATURED INSIGHTS (BENTO GRID) --- */}
        <section className="pt-16 pb-20 container mx-auto px-6 md:px-14">
          
          <div className="max-w-7xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-[#0A1F3C] mb-4">
              Featured <span className="font-semibold italic opacity-80">Insights</span>
            </h2>
            <p className="text-lg text-black/60 leading-relaxed border-l-2 border-[#0A1F3C]/20 pl-6 max-w-2xl">
              Curated technical articles, industry perspectives, and operational innovations shaping the future.
            </p>
          </div>

          <div 
            ref={featuredRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 md:auto-rows-[220px] lg:auto-rows-[260px] max-w-7xl mx-auto"
          >
            {FEATURED_POSTS.map((post, index) => {
              let spanClass = "col-span-1 row-span-1 min-h-[300px] md:min-h-0";
              if (index === 0) spanClass = "md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-0";
              else if (index === 1) spanClass = "col-span-1 row-span-1 min-h-[250px] md:min-h-0";
              else if (index === 2) spanClass = "col-span-1 row-span-1 min-h-[250px] md:min-h-0";
              else if (index === 3) spanClass = "md:col-span-1 md:row-span-2 min-h-[350px] md:min-h-0";
              else if (index === 4) spanClass = "md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-0";

              return (
                <div 
                  key={post.id} 
                  className={`featured-card group cursor-pointer relative overflow-hidden rounded-2xl flex flex-col bg-[#0A1F3C] ${spanClass}`}
                >
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C] via-[#0A1F3C]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                    <div className="mb-auto flex items-center justify-between">
                      <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/90 bg-[#0A1F3C]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                        {post.category}
                      </span>
                    </div>

                    <div className="mt-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h2 className={`font-light text-white leading-tight mb-3 group-hover:text-white/80 transition-colors duration-300 ${
                        index === 0 || index === 4 ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
                      }`}>
                        {post.title}
                      </h2>
                      
                      <p className={`text-white/70 leading-relaxed font-light ${
                        index === 0 || index === 4 || index === 3 ? "line-clamp-2 mb-6 text-sm lg:text-base" : "line-clamp-2 mb-4 text-xs"
                      }`}>
                        {post.excerpt}
                      </p>

                      <div className="inline-flex items-center gap-2 text-white font-semibold tracking-wide text-[11px] uppercase opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        Read Article
                        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- LATEST ARTICLES GRID (CAROUSEL) --- */}
        <section className="py-16 md:py-24 container mx-auto px-6 md:px-14">
          <div className="max-w-7xl mx-auto mb-16 flex flex-col xl:flex-row xl:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-6 mb-4">
                <h2 className="text-3xl md:text-4xl font-light text-[#0A1F3C]">
                  Latest <span className="font-semibold italic opacity-80">Articles</span>
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => scrollCarousel('left')} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#0A1F3C] hover:bg-[#0A1F3C] hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={() => scrollCarousel('right')} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#0A1F3C] hover:bg-[#0A1F3C] hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
              <p className="text-lg text-black/60 leading-relaxed">
                Technical knowledge, market updates, and engineering expertise from our team.
              </p>
            </div>

            <div 
              ref={categoriesRef}
              className="flex flex-wrap gap-2 sm:gap-3 xl:justify-end max-w-2xl"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                    activeCategory === cat 
                      ? "bg-[#0A1F3C] border-[#0A1F3C] text-white shadow-md" 
                      : "bg-transparent border-black/10 text-black/60 hover:border-[#0A1F3C]/30 hover:text-[#0A1F3C]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div 
            ref={latestRef} 
            onScroll={handleCarouselScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-8 max-w-7xl mx-auto pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>
            
            {LATEST_ARTICLES.map((post) => (
              <div key={post.id} className="latest-card group cursor-pointer flex flex-col flex-shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.33px)] snap-start">
                <div className="w-full overflow-hidden rounded-xl relative aspect-[4/3] mb-6 border border-black/5">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#0A1F3C]/60">
                      {post.category}
                    </span>
                    <span className="text-[13px] font-medium text-black/40">
                      {post.date}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-light text-[#0A1F3C] leading-snug mb-3 group-hover:text-[#0A1F3C]/70 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-black/60 leading-relaxed text-sm mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-black/5 flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0A1F3C] tracking-widest uppercase">Read Article</span>
                    <svg className="w-4 h-4 text-[#0A1F3C] transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- INDUSTRY HIGHLIGHTS / SOCIAL PROOF --- */}
        <section className="py-24 bg-[#0A1F3C]/5 border-t border-black/5">
          <div className="container mx-auto px-6 md:px-14">
            <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-[#0A1F3C] mb-4">
                  Industry <span className="font-semibold italic opacity-80">Activity</span>
                </h2>
                <p className="text-lg text-black/60 leading-relaxed max-w-xl">
                  Live updates from our operations, engineering milestones, and professional network.
                </p>
              </div>
              <div className="flex-shrink-0 relative flex items-center bg-black/5 p-1 rounded-full">
                {/* Sliding Indicator */}
                <div 
                  className="absolute inset-y-1 rounded-full bg-[#0A1F3C] shadow-md transition-all duration-300 ease-out"
                  style={{
                    left: socialTab === 'LinkedIn' ? '4px' : 'calc(50% + 2px)',
                    width: 'calc(50% - 6px)',
                  }}
                />
                <button 
                  onClick={() => setSocialTab("LinkedIn")}
                  className={`relative z-10 w-28 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${socialTab === 'LinkedIn' ? 'text-white' : 'text-black/50 hover:text-black'}`}
                >
                  LinkedIn
                </button>
                <button 
                  onClick={() => setSocialTab("Instagram")}
                  className={`relative z-10 w-28 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${socialTab === 'Instagram' ? 'text-white' : 'text-black/50 hover:text-black'}`}
                >
                  Insta
                </button>
              </div>
            </div>

            {socialTab === 'LinkedIn' ? (
              <div ref={socialRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                {SOCIAL_POSTS.map((post) => (
                  <div key={post.id} className="social-card bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-black/5 border border-black/5">
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
                      {post.type === "LinkedIn" && (
                        <svg className="w-6 h-6 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      )}
                    </div>
                    <p className="text-black/70 mb-6 text-sm leading-relaxed">
                      {post.content}
                    </p>
                    <div className="w-full aspect-[2/1] relative rounded-lg overflow-hidden border border-black/5">
                      <Image src={post.image} alt="Social post image" fill className="object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div ref={socialRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
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
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
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
                          <svg className="w-6 h-6 text-gray-800 cursor-pointer transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} style={{marginTop: '-2px'}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </div>
                        <svg className="w-6 h-6 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </div>
                      
                      <div className="flex gap-2 mt-1">
                        <div className="w-8 h-2 bg-gray-200 rounded-full" />
                        <div className="w-16 h-2 bg-gray-200 rounded-full" />
                      </div>
                      <div className="flex gap-2 mt-0.5">
                        <div className="w-24 h-2 bg-gray-200 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
