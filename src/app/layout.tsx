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

  title: "Water Treatment Company in Qatar, UAE & India | MEP & Chemical Supply | Wolgan",

  description:
    "Wolgan delivers industrial water treatment, MEP installations & chemical supplies across Qatar, UAE & India. RO, STP, AMC experts. Contact us today.",

  keywords: [
    "water treatment company near me",
    "industrial water treatment company",
    "best water treatment plant supplier",
    "water treatment chemical suppliers",
    "commodity chemical suppliers",
    "water treatment consultants",
    "water treatment AMC providers",
    "STP/ETP contractor near me",
    "RO plant installation near me",
    "water softener installation near me",
    "odour control chemical suppliers",
    "Water Treatment Qatar",
    "Water Treatment UAE",
    "Water Treatment India",
    "MEP Installation Qatar",
    "Chemical Supply UAE",
    "Wolgan",
  ],

  openGraph: {
    title: "Water Treatment Company in Qatar, UAE & India | MEP & Chemical Supply | Wolgan",

    description:
      "Wolgan delivers industrial water treatment, MEP installations & chemical supplies across Qatar, UAE & India. RO, STP, AMC experts.",

    url: "https://www.wolgan.co",

    siteName: "Wolgan",

    locale: "en_GB",

    alternateLocale: ["ar_QA", "ar_AE"],

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

    title: "Water Treatment Company in Qatar, UAE & India | MEP & Chemical Supply | Wolgan",

    description:
      "Industrial water treatment, MEP installations & chemical supplies across Qatar, UAE & India. RO, STP, AMC experts.",

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",

              name: "Wolgan",

              url: "https://www.wolgan.co",

              logo: "https://www.wolgan.co/images/Wolgan-logo.png",

              description:
                "Dedicated water treatment company delivering smart, reliable, and performance-driven systems across Qatar, UAE, and India.",

              foundingDate: "2020",

              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+974-444-298-18",
                  contactType: "customer service",
                  areaServed: "QA",
                },

                {
                  "@type": "ContactPoint",
                  telephone: "+971-42987226",
                  contactType: "customer service",
                  areaServed: "AE",
                },

                {
                  "@type": "ContactPoint",
                  telephone: "+91-9823807882",
                  contactType: "customer service",
                  areaServed: "IN",
                },
              ],
            }),
          }}
        />
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
