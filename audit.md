# Wolgan Website Audit Report

**Date:** May 14, 2026  
**Auditor:** Senior Software Engineer / Technical Architect  
**Status:** Comprehensive Analysis Complete

---

## 1. Project Structure & Code Quality

### 1.1 Dead Code & Redundant Components
*   **Massive Commented Blocks**: `PortalAbout.tsx` contains approximately 150 lines of commented-out transition logic (Phase 5/6) and overlay code. This increases file noise and maintenance overhead.
*   **Unused Components**: `ThreeServices.tsx` is completely disabled in `page.tsx`. If `ThreeServicesAlt` is the chosen direction, the legacy component should be archived or moved to a `deprecated` folder.
*   **Placeholder Directories**: `src/components/pages` is currently empty.
*   **Unused Assets**: `about-waterplant-1.webp` (369KB) exists in assets but is never imported or used.

### 1.2 Import & Dependency Management
*   **Redundant GSAP Registration**: `gsap.registerPlugin(ScrollTrigger)` is called in `lib/gsap.ts`, `SmoothScroll.tsx`, and potentially other locations. It should be centralized in the `lib` file to avoid re-registration.
*   **Mixed Module Styles**: Some components use relative paths while others use the `@/` alias. Consistency is needed for better IDE indexing and refactoring.

---

## 2. Performance & Asset Optimization

### 2.1 Critical LCP (Largest Contentful Paint) Issues
*   **Hero Video**: The 1.1MB `hero-video.mp4` is loaded via a standard `<video>` tag. For a performance-critical landing page, this should be preloaded or delivered via a high-performance CDN to ensure the first frame renders instantly.
*   **Heavy Image Assets**: 
    *   `electrical-installation-service.webp`: **1.2MB**
    *   `MEP-installation-service.webp`: **1.0MB**
    *   `about-deck-1.jpg` / `deck2` / `deck3`: Totaling ~1.1MB.
    *   **Recommendation**: These should be compressed to <200KB each or served via Next.js `Image` component with appropriate `sizes` and `quality` props (some are currently missing optimized `sizes`).

### 2.2 Font Delivery
*   **CSS @import Anti-pattern**: Montserrat and other fonts are loaded via `@import` in `globals.css`. This blocks the main thread during CSS parsing and can cause FOUT (Flash of Unstyled Text).
*   **Redundant Font Loading**: `layout.tsx` is still loading `Geist` and `Geist Mono` via `next/font/google` despite the design moving to Montserrat. These unused fonts are still being downloaded by the browser.

---

## 3. Frontend Implementation & Best Practices

### 3.1 Design System Consistency
*   **Color Space Fragmentation**: The design system uses `oklch` for most variables in `globals.css`, but `--brand-gold` and several colors in Three.js/GSAP components use Hex. 
*   **Class Overrides**: There are several instances of `!important` or inline styles being used to override Tailwind utility classes, specifically in `ThreeServicesAlt.tsx`.

### 3.2 Accessibility (a11y)
*   **Interactive Elements**: Several `<a>` and `<Button>` tags lack descriptive `aria-label` attributes where the text is dynamic or icon-only.
*   **Color Contrast**: The glassmorphic stat card (`PortalAbout.tsx`) uses a white-tinted background on a white section. While shadows help, accessibility for low-vision users may still be a concern.

---

## 4. Animation & Interactivity (GSAP / Three.js)

### 4.1 Performance Bottlenecks (RAF)
*   **DOM Queries in Loop**: `ThreeServicesAlt.tsx` performs `querySelectorAll(".dynamic-text")` and `querySelectorAll(".dynamic-heading")` inside every frame of the `requestAnimationFrame` loop. 
    *   **Risk**: This triggers layout recalculations and can cause significant "jank" or jitters, especially on mid-range mobile devices.
    *   **Fix**: These elements should be captured in a `useRef` array or accessed via specific class references outside the loop.

### 4.2 GSAP Lifecycle Management
*   **ScrollTrigger Cleanup**: While `ctx.revert()` is used, ensured that all `ScrollTrigger.create` calls are correctly scoped to the context to prevent memory leaks during hot-module reloading (HMR) or navigation.

### 4.3 Three.js Optimization
*   **Texture Management**: In `Gallery.ts`, all textures are loaded via `textureLoader.loadAsync` without a centralized loading manager.
*   **Geometry Reuse**: Every plane in the gallery is a new `Mesh`. While the geometry is shared, ensure materials are disposed of correctly (currently handled in `dispose()`, which is good).

---

## 5. SEO & Metadata

### 5.1 Structured Data
*   **Placeholder URLs**: The JSON-LD in `layout.tsx` still contains `https://example.com` and `https://example.com/logo.png`. 
*   **Missing Alt Text**: Ensure all dynamic images in the Three.js gallery have accessible descriptions reflected in the DOM for screen readers.

---

## 6. Summary of Action Items (Non-Design Impacting)

| Priority | Issue | Category | Recommendation |
| :--- | :--- | :--- | :--- |
| **Critical** | DOM Queries in RAF | Performance | Replace `querySelectorAll` with `useRef` arrays in `ThreeServicesAlt`. |
| **High** | Large Asset Sizes | Performance | Compress `.webp` assets to <200KB; optimize Hero video. |
| **High** | Font Loading | Performance | Move Montserrat to `next/font/google` in `layout.tsx`; remove Geist. |
| **Medium** | Dead Code Cleanup | Maintenance | Remove commented-out blocks in `PortalAbout.tsx`. |
| **Medium** | Redundant Scripts | Performance | Centralize `ScrollTrigger` registration. |
| **Low** | SEO Placeholders | Marketing | Update JSON-LD with final domain and assets. |

---
**End of Audit Report**
