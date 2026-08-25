import type { Metadata } from "next";
import { Suspense } from "react";
import { montserrat } from "@/lib/fonts";
import "./globals.css";
import { QuickActions } from "@/components/QuickActions";
import { Preloader } from "@/components/Preloader";
import { PageTransitionProvider } from "@/components/PageTransition";
import { CurtainProvider } from "@/components/curtain/CurtainContext";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  // Production domain — update this when going live on a different domain
  metadataBase: new URL("https://www.wolgan.co"),

  title: "Water Treatment & Chemical Supplies in UAE & Qatar | Wolgan",

  description:
    "Wolgan provides industrial water treatment solutions and chemical supplies across the UAE and Qatar. Experts in RO, STP, and AMC. Contact us today.",

  openGraph: {
    title: "Water Treatment & Chemical Supplies in UAE & Qatar | Wolgan",

    description:
      "Wolgan provides industrial water treatment solutions and chemical supplies across the UAE and Qatar. Experts in RO, STP, and AMC. Contact us today.",

    url: "https://www.wolgan.co",

    siteName: "Wolgan",

    locale: "en_GB",

    type: "website",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wolgan — Pure Performance Delivered",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Water Treatment & Chemical Supplies in UAE & Qatar | Wolgan",

    description:
      "Wolgan provides industrial water treatment solutions and chemical supplies across the UAE and Qatar. Experts in RO, STP, and AMC. Contact us today.",

    images: ["/images/og-image.jpg"],
  },


  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "lQVbEx3u_rSxXG0YhHATGRAxSz2tGNWjcJK1ah367jU",
  },
};

export const viewport: import("next").Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {/* CurtainProvider is outermost — it owns the shared curtain DOM element */}
        <CurtainProvider>
          {/* PageTransitionProvider reads the curtain via useCurtain() */}
          <PageTransitionProvider>
            <Preloader />
            {children}
            <QuickActions />
          </PageTransitionProvider>
        </CurtainProvider>

        {/* Google Analytics — ID read from NEXT_PUBLIC_GA_MEASUREMENT_ID.
             Wrapped in Suspense because GoogleAnalytics uses useSearchParams()
             which requires a Suspense boundary in the App Router. */}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {/* Cloudflare Turnstile — loaded async so it doesn't block rendering */}
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      </body>
    </html>
  );
}
