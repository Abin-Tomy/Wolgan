# Wolgan Website

A high-fidelity, cinematic web experience for Wolgan — a dedicated water treatment company delivering smart, reliable solutions across Qatar, UAE, and India.

## 🚀 Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 & Vanilla CSS
- **Animations**: GSAP (GreenSock) with Lenis smooth scroll
- **Icons**: Lucide React
- **Hosting**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── about/page.tsx
│   ├── services/
│   │   ├── water-treatment/page.tsx
│   │   ├── mep-installations/page.tsx
│   │   └── chemical-supplies/page.tsx
│   ├── api/download/       # PDF download route
│   ├── layout.tsx          # Root layout + metadata + schema.org
│   ├── sitemap.ts          # Auto-generates /sitemap.xml
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── screens/            # Full page components (one per route)
│   ├── animations/         # Cinematic scroll/GSAP animation components
│   └── ui/                 # Design system primitives (Button, Typography, ArrowUpRight)
└── lib/
    ├── fonts.ts            # Next.js Google Font (Montserrat)
    ├── gsap.ts             # Shared GSAP + ScrollTrigger registration
    ├── lenis.ts            # Shared Lenis smooth scroll singleton
    └── utils.ts            # cn() class utility

public/
├── images/                 # All static images (flat)
├── brochures/              # Downloadable PDFs
└── videos/
```

## 🎨 Design System

- **Primary Color**: Brand Navy (`#0A1F3C`)
- **Accent Color**: Brand Gold (`#C5A059`)
- **Typography**: Montserrat (Google Fonts)
- **Atmosphere**: Deep blurs, glassmorphism, wave dividers, and fluid typography

## 🛠️ Development

```bash
npm install
npm run dev
```

## 🚢 Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.

---

*Developed with precision for Wolgan.*
