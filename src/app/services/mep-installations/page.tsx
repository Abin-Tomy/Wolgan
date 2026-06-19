import type { Metadata } from "next";
import { MEPInstallationsPage } from "@/components/screens/MEPInstallationsPage";

export const metadata: Metadata = {
  title: "MEP Installations | Mechanical, Electrical & Plumbing | Wolgan",
  description:
    "Wolgan delivers high-precision MEP installation services including chilled water systems, HVAC, plumbing, and energy transfer stations for healthcare, hospitality, and commercial sectors across Qatar and UAE.",
  openGraph: {
    title: "MEP Installations | Wolgan",
    description:
      "High-precision mechanical, electrical, and plumbing execution for large-scale infrastructure projects across Qatar and UAE.",
    url: "https://www.wolgan.co/services/mep-installations",
  },
  alternates: {
    canonical: "/services/mep-installations",
  },
};

const mepSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "MEP Installation Services",
  description:
    "High-precision mechanical, electrical, and plumbing (MEP) installation services for healthcare, hospitality, and commercial infrastructure across Qatar and UAE, including chilled water systems, HVAC, and energy transfer stations.",
  url: "https://www.wolgan.co/services/mep-installations",
  provider: {
    "@type": "LocalBusiness",
    name: "Wolgan",
    url: "https://www.wolgan.co",
    logo: "https://www.wolgan.co/images/Wolgan-logo.png",
    areaServed: [
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
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
    ],
  },
  serviceType: "MEP Installation",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "MEP Installation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Chilled Water Systems",
          description:
            "Design and installation of chilled water piping and distribution systems for large-scale commercial and hospitality projects.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "HVAC Systems",
          description:
            "Heating, ventilation, and air conditioning installation for healthcare and commercial facilities.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Plumbing Installations",
          description:
            "Full-scope plumbing works including hot and cold water supply, drainage, and sanitary systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Energy Transfer Stations",
          description:
            "Installation of energy transfer stations for district cooling and centralized energy distribution.",
        },
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mepSchema) }}
      />
      <MEPInstallationsPage />
    </>
  );
}

