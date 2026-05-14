"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { getLenis } from "@/lib/lenis";
import { Gallery } from "./experience/Gallery";
import { Scroll } from "./experience/Scroll";
import { servicesData } from "./data/servicesData";

/**
 * THREESERVICES
 *
 * The outer div is 500vh — this is the scroll space.
 * The inner section is sticky so it stays pinned while the page scrolls
 * through that 500vh.
 *
 * Scroll architecture (no Lenis stop/start):
 *   - Lenis scrolls the page freely at all times.
 *   - Each RAF frame we read Lenis's current scroll position.
 *   - We convert it to a 0→1 progress over the wrapper's scroll range.
 *   - Scroll.updateFromProgress(p) maps that to a camera Z target.
 *   - No wheel interception, no deadlocks.
 */

export function ThreeServicesAlt() {
    const wrapperRef  = useRef<HTMLDivElement>(null);
    const sectionRef  = useRef<HTMLElement>(null);
    const canvasRef   = useRef<HTMLCanvasElement>(null);
    const rafRef      = useRef<number>(0);

    const rendererRef    = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef       = useRef<THREE.Scene | null>(null);
    const cameraRef      = useRef<THREE.PerspectiveCamera | null>(null);
    const galleryRef     = useRef<Gallery | null>(null);
    const scrollRef      = useRef<Scroll | null>(null);
    const isInitialised  = useRef(false);

    // Cached wrapper geometry for progress computation (updated on resize)
    const wrapperTopRef         = useRef(0);
    const wrapperScrollRangeRef = useRef(1);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible,   setIsVisible]   = useState(false);

    // Refs for dynamic elements to avoid querySelectorAll in RAF
    const dynamicTextRefs = useRef<(HTMLElement | null)[]>([]);
    const dynamicHeadingRefs = useRef<(HTMLElement | null)[]>([]);

    // Reset refs on each render
    dynamicTextRefs.current = [];
    dynamicHeadingRefs.current = [];

    // ─── Measure wrapper position ─────────────────────────────────────────────
    const measureWrapper = useCallback(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        // getBoundingClientRect + scrollY = reliable document-level top
        const rect = wrapper.getBoundingClientRect();
        wrapperTopRef.current         = rect.top + window.scrollY;
        wrapperScrollRangeRef.current = Math.max(wrapper.offsetHeight - window.innerHeight, 1);
    }, []);

    // ─── Resize ───────────────────────────────────────────────────────────────
    const handleResize = useCallback(() => {
        const canvas   = canvasRef.current;
        const renderer = rendererRef.current;
        const camera   = cameraRef.current;
        const gallery  = galleryRef.current;
        if (!canvas || !renderer || !camera || !gallery) return;

        const w = canvas.clientWidth  || window.innerWidth;
        const h = canvas.clientHeight || window.innerHeight;
        if (w <= 0 || h <= 0) return;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        gallery.onResize();
        measureWrapper();
    }, [measureWrapper]);

    // ─── Animation loop ───────────────────────────────────────────────────────
    const animate = useCallback(() => {
        rafRef.current = requestAnimationFrame(animate);

        const renderer = rendererRef.current;
        const scene    = sceneRef.current;
        const camera   = cameraRef.current;
        const gallery  = galleryRef.current;
        const scroll   = scrollRef.current;
        if (!renderer || !scene || !camera || !gallery || !scroll) return;

        // Read window.scrollY directly — Lenis (native mode) updates this each frame
        const progress = (window.scrollY - wrapperTopRef.current) / wrapperScrollRangeRef.current;
        scroll.updateFromProgress(progress);
        scroll.update();

        gallery.update(camera, {
            velocity:    scroll.velocity,
            velocityMax: scroll.velocityMax,
            progress:    THREE.MathUtils.clamp(progress, 0, 1),
        });

        // ─── Background Mood Color Interpolation ───
        const mood = gallery.getMoodBlendData(camera.position.z);
        if (mood && sectionRef.current) {
            const colorA = new THREE.Color(mood.currentColor);
            const colorB = new THREE.Color(mood.nextColor);
            colorA.lerp(colorB, mood.blend);
            const hex = `#${colorA.getHexString()}`;
            sectionRef.current.style.backgroundColor = hex;

            // ─── Dynamic UI Color (Labels, Buttons) ───
            const activeMood = servicesData[mood.currentIndex];
            const nextMoodIdx = Math.min(mood.currentIndex + 1, servicesData.length - 1);
            const nextMood = servicesData[nextMoodIdx];

            const uiColorA = activeMood.textTone === "light" ? "#FFFFFF" : "#0A1F3C";
            const uiColorB = nextMood.textTone === "light" ? "#FFFFFF" : "#0A1F3C";
            const uiCol = new THREE.Color(uiColorA);
            uiCol.lerp(new THREE.Color(uiColorB), mood.blend);
            const uiHex = `#${uiCol.getHexString()}`;
            
            // Apply to labels and buttons
            dynamicTextRefs.current.forEach(el => {
                if (!el) return;
                el.style.color = uiHex;
                if (el.tagName === "SPAN" || el.classList.contains("border")) {
                    el.style.borderColor = `${uiHex}33`; 
                }
            });

            // Update h2 and p
            dynamicHeadingRefs.current.forEach(el => {
                if (!el) return;
                el.style.color = uiHex;
            });
        }

        renderer.render(scene, camera);
    }, []);

    // ─── Three.js init ────────────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || isInitialised.current) return;
        isInitialised.current = true;

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0.3, 6);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);

        sceneRef.current    = scene;
        cameraRef.current   = camera;
        rendererRef.current = renderer;

        const gallery = new Gallery();
        const scroll  = new Scroll(camera, gallery);

        gallery.onActiveIndexChange = (index) => setActiveIndex(index);
        galleryRef.current = gallery;
        scrollRef.current  = scroll;

        gallery.init(scene).then(() => {
            scroll.init();
            handleResize();
            // Re-measure after a brief delay so layout is fully settled
            setTimeout(measureWrapper, 200);
            animate();
        });

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", handleResize);
            gallery.dispose();
            scroll.dispose();
            renderer.dispose();
            isInitialised.current = false;
        };
    }, [animate, handleResize]);

    // ─── Custom Lenis Scroll Snapping ─────────────────────────────────────────
    // Removed JavaScript-based scroll snapping completely. 
    // This entirely eliminates the "stuck" feeling, allowing the user to seamlessly 
    // free-scroll through the section at their own natural pace.


    // ─── IntersectionObserver — "scroll to explore" hint only ────────────────
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(wrapper);
        measureWrapper();
        return () => observer.disconnect();
    }, [measureWrapper]);

    const service = servicesData[activeIndex];
    const isLeft  = activeIndex % 2 !== 0;

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div
            ref={wrapperRef}
            id="services"
            style={{ height: "500vh", position: "relative" }}
        >
            <section
                ref={sectionRef}
                className="sticky top-0 w-full overflow-hidden z-10"
                style={{ 
                    height: "100vh",
                    marginTop: "-1px",
                    border: "none",
                    outline: "none"
                }}
            >
                {/* Three.js canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: "block", border: "none", outline: "none" }}
                />

                {/* Section label + title — top centre */}
                <div className="absolute top-12 inset-x-0 flex flex-col items-center gap-3 z-10 pointer-events-none">
                    <span 
                        ref={(el) => { if (el) dynamicTextRefs.current.push(el); }}
                        className="dynamic-text px-3 py-1 border border-black/10 rounded-full text-[9px] uppercase tracking-[0.35em] text-black/40"
                    >
                        Our Services
                    </span>
                    <h1
                        ref={(el) => { if (el) dynamicTextRefs.current.push(el); }}
                        className="dynamic-text font-montserrat font-normal text-[#0A1F3C]/90 leading-tight text-center"
                        style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
                    >
                        Quality Servicing Opportunity
                    </h1>
                </div>

                {/* Fixed Service Content Overlay */}
                <div className="absolute inset-0 flex items-center pointer-events-none z-10">
                    <div
                        className="pointer-events-auto w-full md:w-[35%] px-8 md:px-12 flex flex-col gap-6"
                        style={{
                            marginTop: "4vh", 
                            marginLeft:  isLeft ? "clamp(1.5rem, 4vw, 3rem)" : "auto",
                            marginRight: isLeft ? "auto" : "clamp(1.5rem, 4vw, 3rem)",
                            transition:  "margin 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
                        }}
                    >
                        <p className="text-xs uppercase tracking-[0.3em] transition-opacity duration-500" style={{ color: "#C5A059", opacity: 0.8 }}>
                            {String(activeIndex + 1).padStart(2, "0")} / {String(servicesData.length).padStart(2, "0")}
                        </p>

                        <h2
                            key={`heading-${activeIndex}`}
                            ref={(el) => { if (el) dynamicHeadingRefs.current.push(el); }}
                            className="dynamic-heading text-3xl md:text-4xl lg:text-5xl font-montserrat font-normal leading-tight animate-fade-in"
                        >
                            {service.heading}
                        </h2>

                        <p
                            key={`desc-${activeIndex}`}
                            ref={(el) => { if (el) dynamicHeadingRefs.current.push(el); }}
                            className="dynamic-heading text-sm md:text-base leading-relaxed max-w-sm animate-fade-in"
                            style={{ opacity: 0.85 }}
                        >
                            {service.description}
                        </p>

                        <a
                            key={`link-${activeIndex}`}
                            ref={(el) => { if (el) dynamicTextRefs.current.push(el); }}
                            href={`#service-${service.id}`}
                            className="dynamic-text btn-fill-effect relative inline-flex w-fit items-center gap-3 px-8 py-3 rounded-full border border-[#0A1F3C]/20 text-[#0A1F3C] text-sm font-semibold tracking-wide overflow-hidden group pointer-events-auto transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-fade-in"
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Learn More</span>
                            <div className="relative w-3 h-3 overflow-hidden z-10">
                                <svg className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:translate-x-full group-hover:-translate-y-full group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                                <svg className="absolute inset-0 w-full h-full transition-all duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </a>

                        {isVisible && (
                            <p 
                                ref={(el) => { if (el) dynamicTextRefs.current.push(el); }}
                                className="dynamic-text text-[10px] uppercase tracking-[0.35em] mt-4 opacity-50" 
                                style={{ color: "#0A1F3C" }}
                            >
                                scroll to explore
                            </p>
                        )}
                    </div>
                </div>

            </section>
        </div>
    );
}