import type { Metadata } from "next";
import { TeamPage } from "@/components/screens/TeamPage";

export const metadata: Metadata = {
  title: "Our Team | Wolgan Water Treatment Experts",
  description:
    "Meet the minds behind Wolgan. Our expert team of engineers and visionaries delivering smart water treatment solutions across Qatar, UAE, and India.",
  openGraph: {
    title: "Our Team | Wolgan",
    description:
      "Meet the minds behind Wolgan. Our expert team of engineers and visionaries delivering smart water treatment solutions.",
    url: "https://www.wolgan.co/team",
  },
  alternates: {
    canonical: "/team",
  },
};

export default function Page() {
  return <TeamPage />;
}
