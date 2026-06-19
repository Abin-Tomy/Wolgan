import type { Metadata } from "next";
import { ChemicalSuppliesPage } from "@/components/screens/ChemicalSuppliesPage";

export const metadata: Metadata = {
  title: "Chemical Supplies | Water Treatment Chemicals | Wolgan",
  description:
    "Wolgan supplies specialized water treatment chemicals including corrosion inhibitors, scale control, microbiological growth control, and commodity chemicals across Qatar, UAE, and India.",
  openGraph: {
    title: "Chemical Supplies | Wolgan",
    description:
      "Specialized water treatment chemicals and commodity chemical supply — corrosion inhibitors, scale control, biocides, and more.",
    url: "https://www.wolgan.co/services/chemical-supplies",
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chemicalSchema) }}
      />
      <ChemicalSuppliesPage />
    </>
  );
}

