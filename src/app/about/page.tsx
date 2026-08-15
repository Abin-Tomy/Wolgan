import type { Metadata } from "next";
import { AboutPage } from "@/components/screens/AboutPage";

export const metadata: Metadata = {
  title: "About Wolgan | Water Treatment Experts in Qatar, UAE & India",
  description:
    "Founded in 2020, Wolgan is an established contracting company delivering smart water treatment, MEP installation, and chemical supply solutions across Qatar, UAE, and India.",
  openGraph: {
    title: "About Wolgan | Water Treatment Experts",
    description:
      "Founded in 2020, Wolgan delivers smart, reliable water treatment and MEP solutions across Qatar, UAE, and India.",
    url: "https://www.wolgan.co/about",
  },
  alternates: {
    canonical: "/about",
  },
};

const aboutBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolgan.co" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.wolgan.co/about" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumb) }} />
      <AboutPage />
    </>
  );
}
