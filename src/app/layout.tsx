import type { Metadata } from "next";
import { montserrat } from "@/lib/fonts";
import "./globals.css";
import { QuickActions } from "@/components/QuickActions";
import { Preloader } from "@/components/Preloader";
import { PageTransitionProvider } from "@/components/PageTransition";
import { CurtainProvider } from "@/components/curtain/CurtainContext";

export const metadata: Metadata = {
  // Production domain — update this when going live on a different domain
  metadataBase: new URL("https://www.wolgan.co"),

  title: "Wolgan | Pure Performance Delivered",

  description:
    "Wolgan delivers smart, reliable, and performance-driven water treatment systems across Qatar, UAE, and India.",

  keywords: [
    "Water Treatment Qatar",
    "MEP Installation",
    "Chemical Supply",
    "Industrial Water Solutions",
    "Water Treatment UAE",
    "Water Treatment India",
    "Wolgan",
  ],

  openGraph: {
    title: "Wolgan | Pure Performance Delivered",

    description:
      "Delivering smart, reliable, and performance-driven water treatment systems across Qatar, UAE, and India.",

    url: "https://www.wolgan.co",

    siteName: "Wolgan",

    locale: "en_US",

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

    title: "Wolgan | Pure Performance Delivered",

    description:
      "Smart, reliable water treatment systems across Qatar, UAE, and India.",

    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "pKXiU3YLQxEcFLjsYMxgjlLOuVudwUKaqdC4I4I3xjQ",
  },
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
      </body>
    </html>
  );
}
