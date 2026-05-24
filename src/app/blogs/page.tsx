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
};

export default function Page() {
  return <BlogsPage />;
}
