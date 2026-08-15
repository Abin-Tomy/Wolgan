import type { Metadata } from "next";
import { WaterTreatmentPage } from "@/components/screens/WaterTreatmentPage";

export const metadata: Metadata = {
  title: "Water Treatment Solutions | Wolgan Qatar & UAE",
  description:
    "Wolgan provides water treatment solutions — RO polishing, STP, grey water systems & industrial water management across Qatar, UAE & India.",
  keywords: [
    "water treatment company near me",
    "RO plant installation near me",
    "STP/ETP contractor near me",
    "industrial water treatment company",
    "water treatment AMC providers",
    "wastewater treatment",
    "effluent treatment",
    "reverse osmosis",
    "sewage treatment plant",
    "grey water treatment",
    "multimedia filter",
    "dosing system",
    "manual dosing system",
    "chlorination",
    "disinfection",
    "chlorine treatment",
    "legionella control",
    "scaling",
    "biofilm",
    "MIC microbiologically influenced corrosion",
    "corrosion inhibitors",
    "water analysis Qatar",
    "operation and maintenance water treatment",
    "water treatment Qatar",
    "water treatment UAE",
    "water treatment India",
  ],
  openGraph: {
    title: "Water Treatment Solutions | Wolgan",
    description:
      "Comprehensive water treatment — RO polishing, sewage treatment plants, grey water systems, and industrial water management.",
    url: "https://www.wolgan.co/services/water-treatment",
    images: [
      {
        url: "/images/water-treatment-service.jpg",
        width: 1200,
        height: 630,
        alt: "Wolgan Water Treatment Solutions — RO, STP & Industrial Systems",
      },
    ],
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

const waterTreatmentBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolgan.co" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.wolgan.co/services/water-treatment" },
    { "@type": "ListItem", position: 3, name: "Water Treatment", item: "https://www.wolgan.co/services/water-treatment" },
  ],
};

const waterTreatmentFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is reverse osmosis (RO) and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reverse osmosis (RO) is a water purification process that uses a semi-permeable membrane to remove dissolved salts, bacteria, and other contaminants. Water is forced under pressure through the membrane, leaving impurities behind. Wolgan designs and installs RO polishing units for industrial and commercial applications across Qatar, UAE, and India.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a water treatment plant cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cost of a water treatment plant depends on capacity, treatment type, and site conditions. A basic RO system may start from AED 50,000, while full sewage treatment plants (STP) or effluent treatment plants (ETP) for large facilities can range significantly higher. Contact Wolgan for a customised quotation.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in a water treatment AMC (Annual Maintenance Contract)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A water treatment AMC from Wolgan includes scheduled inspections, chemical dosing adjustments, filter media replacement, equipment servicing, water quality testing, and emergency callout support. AMC plans are tailored for cooling towers, RO plants, STPs, chilled water systems, and boiler systems.",
      },
    },
    {
      "@type": "Question",
      name: "What is a sewage treatment plant (STP) and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A sewage treatment plant (STP) processes wastewater from buildings to remove solids, organic matter, and pathogens before discharge or reuse. The treatment involves primary screening, biological treatment (aeration), secondary clarification, and disinfection (chlorination or UV). Wolgan designs, installs, and operates STPs for hotels, hospitals, and industrial sites.",
      },
    },
    {
      "@type": "Question",
      name: "What is grey water treatment and can grey water be reused?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grey water is wastewater from sinks, showers, and laundry — excluding toilet waste. After treatment through filtration and disinfection, grey water can be safely reused for irrigation, toilet flushing, and cooling tower make-up. Wolgan installs grey water recycling systems to reduce freshwater consumption and meet sustainability targets.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(waterTreatmentSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(waterTreatmentBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(waterTreatmentFAQ) }}
      />
      <WaterTreatmentPage />
    </>
  );
}
