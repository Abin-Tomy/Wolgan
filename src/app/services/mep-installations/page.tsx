import type { Metadata } from "next";
import { MEPInstallationsPage } from "@/components/screens/MEPInstallationsPage";

export const metadata: Metadata = {
  title: "MEP Installations | Mechanical, Electrical & Plumbing | Wolgan",
  description:
    "Wolgan delivers high-precision MEP installation services — chilled water, HVAC, plumbing & energy transfer stations across Qatar & UAE.",
  keywords: [
    "MEP installation Qatar",
    "MEP installation UAE",
    "mechanical electrical plumbing contractor",
    "chilled water system installation",
    "chilled water flushing",
    "chemical flushing",
    "passivation",
    "district cooling plant",
    "energy transfer station",
    "HVAC installation",
    "plumbing contractor Qatar",
    "desalination plant installation",
    "pumping station installation",
    "operation and maintenance MEP",
    "water treatment plant installation",
    "sulphate reducing bacteria",
    "copper silver ionization plant",
  ],
  openGraph: {
    title: "MEP Installations | Wolgan",
    description:
      "High-precision mechanical, electrical, and plumbing execution for large-scale infrastructure projects across Qatar and UAE.",
    url: "https://www.wolgan.co/services/mep-installations",
    images: [
      {
        url: "/images/MEP-installation-service.webp",
        width: 1200,
        height: 630,
        alt: "Wolgan MEP Installations — Chilled Water, HVAC & Energy Transfer Stations",
      },
    ],
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

const mepBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolgan.co" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.wolgan.co/services/mep-installations" },
    { "@type": "ListItem", position: 3, name: "MEP Installations", item: "https://www.wolgan.co/services/mep-installations" },
  ],
};

const mepFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does MEP installation include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MEP installation covers mechanical, electrical, and plumbing systems for buildings and infrastructure. Wolgan's MEP scope includes chilled water system installation, HVAC systems, plumbing (hot and cold water, drainage, sanitary), energy transfer stations (ETS), district cooling connections, firefighting systems, and process piping. We serve commercial, hospitality, healthcare, and industrial projects across Qatar and UAE.",
      },
    },
    {
      "@type": "Question",
      name: "What is chilled water flushing and why is it necessary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chilled water flushing is the process of circulating clean water through a new or refurbished pipework system to remove debris, welding residue, and mill scale before the system goes live. It prevents blockages, valve damage, and corrosion. Wolgan performs chilled water flushing, chemical flushing, and passivation as part of MEP commissioning services.",
      },
    },
    {
      "@type": "Question",
      name: "What is passivation in MEP piping systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Passivation is a chemical treatment applied to metal pipework after flushing to form a protective oxide layer on the internal surface. This layer inhibits corrosion and extends the life of chilled water and heating systems. Wolgan carries out passivation as a standard step in MEP commissioning and new system handover.",
      },
    },
    {
      "@type": "Question",
      name: "What is a district cooling plant and how is it installed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A district cooling plant produces and distributes chilled water from a central plant to multiple buildings through insulated underground pipes. Installation involves the chilled water network, pumping stations, energy transfer stations (ETS), and mechanical plant room equipment. Wolgan has extensive experience in district cooling infrastructure installation across Qatar.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mepSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mepBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mepFAQ) }}
      />
      <MEPInstallationsPage />
    </>
  );
}
