import type { Metadata } from "next";
import { ChemicalSuppliesPage } from "@/components/screens/ChemicalSuppliesPage";

export const metadata: Metadata = {
  title: "Chemical Supplies | Water Treatment Chemicals | Wolgan",
  description:
    "Wolgan supplies water treatment chemicals — corrosion inhibitors, scale control, biocides & commodity chemicals across Qatar, UAE & India.",
  keywords: [
    "water treatment chemical suppliers",
    "commodity chemical suppliers",
    "odour control chemical suppliers",
    "antiscalant supplier Qatar",
    "corrosion inhibitor supplier",
    "scale control chemicals",
    "biocide water treatment",
    "sodium hypochlorite supplier",
    "calcium hypochlorite supplier",
    "chlorine treatment chemicals",
    "disinfection chemicals",
    "legionella control chemicals",
    "sulphate reducing bacteria treatment",
    "biofilm control",
    "MIC treatment chemicals",
    "water treatment chemicals UAE",
    "water treatment chemicals Qatar",
    "odour control",
    "coagulant flocculant supplier",
  ],
  openGraph: {
    title: "Chemical Supplies | Wolgan",
    description:
      "Specialized water treatment chemicals and commodity chemical supply — corrosion inhibitors, scale control, biocides, and more.",
    url: "https://www.wolgan.co/services/chemical-supplies",
    images: [
      {
        url: "/images/chemical-supplies-services.webp",
        width: 1200,
        height: 630,
        alt: "Wolgan Chemical Supplies — Water Treatment & Commodity Chemicals",
      },
    ],
  },
  alternates: {
    canonical: "/services/chemical-supplies",
  },
};

const chemicalSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Chemical Supplies",
  description:
    "Specialized water treatment chemical supply including corrosion inhibitors, scale control agents, microbiological growth control (biocides), and commodity chemicals for industrial and commercial systems across Qatar, UAE, and India.",
  url: "https://www.wolgan.co/services/chemical-supplies",
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
      {
        "@type": "ContactPoint",
        telephone: "+91-9823807882",
        contactType: "customer service",
        areaServed: "IN",
      },
    ],
  },
  serviceType: "Chemical Supply",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Water Treatment Chemicals",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corrosion Inhibitors",
          description:
            "Chemical treatment to prevent corrosion in water systems, cooling towers, and industrial pipework.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Scale Control Chemicals",
          description:
            "Anti-scale and descaling chemical agents for boilers, heat exchangers, and cooling systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Microbiological Growth Control (Biocides)",
          description:
            "Biocide and disinfection chemicals to control microbial contamination in water treatment and cooling systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commodity Chemicals",
          description:
            "Supply of general-purpose commodity chemicals for industrial and water treatment applications.",
        },
      },
    ],
  },
};

const chemicalBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolgan.co" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.wolgan.co/services/chemical-supplies" },
    { "@type": "ListItem", position: 3, name: "Chemical Supplies", item: "https://www.wolgan.co/services/chemical-supplies" },
  ],
};

const chemicalFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What water treatment chemicals does Wolgan supply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wolgan supplies a comprehensive range of water treatment chemicals including corrosion inhibitors, scale control agents (antiscalants), microbiological growth control (biocides), flocculants, coagulants, and pH adjusters. Commodity chemicals supplied include caustic soda solution, sodium hypochlorite 12%, calcium hypochlorite 65%, sulphuric acid 98%, sodium meta bi-sulphate, and soda ash light.",
      },
    },
    {
      "@type": "Question",
      name: "What is antiscalant used for in water treatment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Antiscalant is a chemical added to water systems — especially RO plants, cooling towers, and boilers — to prevent the formation of mineral scale on membranes, heat exchangers, and pipework. It works by sequestering calcium, magnesium, and other scale-forming ions. Wolgan supplies and doses antiscalant as part of water treatment chemical programmes.",
      },
    },
    {
      "@type": "Question",
      name: "What causes legionella in water systems and how is it controlled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Legionella bacteria thrive in warm stagnant water (20–45°C) in cooling towers, hot water systems, and spa pools. Control methods include maintaining water temperatures outside the growth range, regular disinfection using biocides (chlorine, bromine, or non-oxidising biocides), and periodic hyperchlorination. Wolgan supplies legionella control chemicals and provides water treatment programmes compliant with regional health guidelines.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a corrosion inhibitor and a biocide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A corrosion inhibitor is a chemical that forms a protective layer on metal surfaces to prevent oxidation and corrosion in water systems. A biocide is a chemical that kills or controls microorganisms such as bacteria, algae, and fungi. In cooling water and chilled water treatment programmes, both are typically used together to control MIC (microbiologically influenced corrosion), scaling, and fouling.",
      },
    },
    {
      "@type": "Question",
      name: "What is odour control in water and wastewater treatment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Odour in water and wastewater systems is typically caused by hydrogen sulphide (H2S) produced by sulphate reducing bacteria (SRB) in anaerobic conditions. Odour control chemicals — such as iron salts, oxidants, or bioaugmentation products — are dosed to neutralise odorous compounds. Wolgan supplies odour control chemicals and provides ongoing dosing programmes for STPs, pump stations, and drainage networks.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chemicalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chemicalBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chemicalFAQ) }}
      />
      <ChemicalSuppliesPage />
    </>
  );
}
