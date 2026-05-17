import type { Metadata } from "next";
import { Suspense } from "react";
import { montserrat } from "@/lib/fonts";
import "@/styles/globals.css";
import { QuickActions } from "@/components/QuickActions";
import { Preloader } from "@/components/Preloader";

export const metadata: Metadata = {
  // Current domain is wolgan.qa, but wolgan.co is the future target production domain
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
  },

  twitter: {
    card: "summary_large_image",

    title: "Wolgan | Pure Performance Delivered",

    description:
      "Smart, reliable water treatment systems across Qatar, UAE, and India.",
  },

  robots: {
    index: true,
    follow: true,
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
        <Suspense fallback={null}>
          <Preloader />
        </Suspense>
        {children}
        <QuickActions />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",

              name: "Wolgan",

              url: "https://www.wolgan.co",

              logo: "https://www.wolgan.co/images/brand/logo.png",

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
