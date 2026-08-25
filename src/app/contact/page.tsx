import type { Metadata } from "next";
// Main screen wrapper component for the contact page
import { ContactPage } from "@/components/screens/ContactPage";

export const metadata: Metadata = {
  title: "Contact Wolgan | Regional Offices & Project Inquiries",
  description:
    "Get in touch with Wolgan's engineering and operations teams in Qatar and the UAE. Submit your inquiry for water treatment solutions, MEP installations, and chemical supplies.",
  openGraph: {
    title: "Contact Wolgan | Regional Offices & Inquiries",
    description:
      "Connect with Wolgan's regional offices in Dubai and Doha. Submit your inquiries for customized water treatment, MEP, and chemical systems.",
    url: "https://www.wolgan.co/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Wolgan",
  url: "https://www.wolgan.co/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Wolgan",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+974 7125 1155",
        areaServed: "QA",
        contactType: "customer service",
      },
      {
        "@type": "ContactPoint",
        telephone: "+971 56 505 2820",
        areaServed: "AE",
        contactType: "customer service",
      },
    ],
  },
};

const contactBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolgan.co" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.wolgan.co/contact" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumb) }} />
      <ContactPage />
    </>
  );
}
