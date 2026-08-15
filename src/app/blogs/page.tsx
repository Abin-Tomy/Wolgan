import type { Metadata } from "next";
import { BlogsPage } from "@/components/screens/BlogsPage";

export const metadata: Metadata = {
  title: "Insights & Updates | Wolgan Water Treatment Experts",
  description:
    "Read the latest industry insights, updates, and innovations in water treatment, MEP installations, and chemical supplies from the Wolgan team.",
  openGraph: {
    title: "Insights & Updates | Wolgan",
    description:
      "Read the latest industry insights, updates, and innovations in water treatment, MEP installations, and chemical supplies.",
    url: "https://www.wolgan.co/blogs",
  },
  alternates: {
    canonical: "/blogs",
  },
};

const blogsBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolgan.co" },
    { "@type": "ListItem", position: 2, name: "Insights & Updates", item: "https://www.wolgan.co/blogs" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsBreadcrumb) }} />
      <BlogsPage />
    </>
  );
}
