import type { Metadata } from "next";
import { WaterTreatmentPage } from "@/components/screens/WaterTreatmentPage";

export const metadata: Metadata = {
  title: "Water Treatment Solutions | Wolgan Qatar & UAE",
  description:
    "Wolgan provides comprehensive water treatment solutions including RO polishing, sewage treatment plants, grey water systems, and industrial water management across Qatar, UAE, and India.",
  openGraph: {
    title: "Water Treatment Solutions | Wolgan",
    description:
      "Comprehensive water treatment — RO polishing, sewage treatment plants, grey water systems, and industrial water management.",
    url: "https://www.wolgan.co/services/water-treatment",
  },
  alternates: {
    canonical: "/services/water-treatment",
  },
};

const waterTreatmentSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Water Treatment Solutions",
  description:
    "Comprehensive water treatment services including RO polishing, sewage treatment plants (STP), grey water recycling systems, and industrial water management across Qatar, UAE, and India.",
  url: "https://www.wolgan.co/services/water-treatment",
  provider: {
    "@type": "LocalBusiness",
    name: "Wolgan",
    url: "https://www.wolgan.co",
    logo: "https://www.wolgan.co/images/Wolgan-logo.png",
    areaServed: [
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "India" },
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
  serviceType: "Water Treatment",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Water Treatment Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "RO Polishing Systems",
          description:
            "Reverse osmosis water polishing for industrial and commercial applications.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sewage Treatment Plants (STP)",
          description:
            "Design and installation of sewage treatment plants for large-scale facilities.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Grey Water Recycling Systems",
          description:
            "Grey water collection, treatment, and recycling systems for sustainable water management.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Industrial Water Management",
          description:
            "End-to-end industrial water management including cooling towers, boiler feed water, and process water treatment.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(waterTreatmentSchema) }}
      />
      <WaterTreatmentPage />
    </>
  );
}
