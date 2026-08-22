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
      name: "What is reverse osmosis and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reverse Osmosis (RO) is a membrane-based water treatment process used to remove dissolved salts, minerals, microorganisms, and other contaminants from water. Feed water is passed through a semi-permeable membrane under pressure, producing purified water while the rejected contaminants are discharged through the concentrate stream. Wolgan provides RO system design, supply, installation, commissioning, and maintenance for commercial and industrial applications.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a water treatment plant cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cost of a water treatment plant depends on the capacity, treatment technology, water quality, equipment specifications, and site requirements. Each project therefore requires a customized technical and commercial evaluation. Wolgan provides tailored solutions and quotations based on the client's specific requirements and project conditions. For detailed technical and commercial proposals, please contact — Qatar: info@wolgan.qa or UAE: info@wolgan.ae.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in a water treatment Annual Maintenance Contract?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Water Treatment Annual Maintenance Contract (AMC) typically includes scheduled inspections, preventive maintenance, equipment servicing, chemical dosing optimization, water quality monitoring, troubleshooting, and emergency support, depending on the agreed scope. Wolgan provides customized AMC and O&M services for RO plants, STPs, filtration systems, cooling water, chilled water, and boiler water treatment systems.",
      },
    },
    {
      "@type": "Question",
      name: "What is a sewage treatment plant and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Sewage Treatment Plant (STP) treats domestic wastewater by removing solids, organic matter, and harmful microorganisms before discharge or reuse. Depending on the project requirements, the treatment process may include screening, biological treatment, clarification or membrane separation, filtration, and disinfection. Wolgan provides STP design, supply, installation, commissioning, and O&M services for commercial, residential, hospitality, healthcare, and industrial facilities.",
      },
    },
    {
      "@type": "Question",
      name: "What is grey water treatment and can grey water be reused?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greywater is wastewater generated from sources such as showers, wash basins, and laundry, excluding toilet wastewater. After suitable treatment and disinfection, treated greywater can be reused for approved non-potable applications, such as irrigation and toilet flushing, subject to applicable water-quality requirements. Wolgan provides greywater treatment and recycling solutions to help clients reduce freshwater consumption and increase water reuse.",
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
