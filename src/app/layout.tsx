import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"), //change after new domain is ready

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

    url: "https://example.com", //change after new domain is ready

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
      <body className="min-h-full flex flex-col">{children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",

              name: "Wolgan",

              url: "https://example.com",

              logo: "https://example.com/logo.png",

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
