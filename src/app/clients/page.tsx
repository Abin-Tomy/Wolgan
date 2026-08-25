import type { Metadata } from "next";
import { ClientsPage } from "@/components/screens/ClientsPage";

export const metadata: Metadata = {
  title: "Our Clients | Wolgan Water Treatment Experts",
  description:
    "Explore our network of strategic partners and top-tier clients across Qatar and the UAE.",
  openGraph: {
    title: "Our Clients | Wolgan",
    description:
      "Explore our network of strategic partners and top-tier clients across Qatar and the UAE.",
    url: "https://www.wolgan.co/clients",
  },
  alternates: {
    canonical: "/clients",
  },
};

const clientsBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.wolgan.co/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Our Clients",
      item: "https://www.wolgan.co/clients",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clientsBreadcrumb) }} />
      <ClientsPage />
    </>
  );
}
