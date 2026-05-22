import type { Metadata } from "next";
import { MEPInstallationsPage } from "@/components/screens/MEPInstallationsPage";

export const metadata: Metadata = {
  title: "MEP Installations | Mechanical, Electrical & Plumbing | Wolgan",
  description:
    "Wolgan delivers high-precision MEP installation services including chilled water systems, HVAC, plumbing, and energy transfer stations for healthcare, hospitality, and commercial sectors across Qatar and UAE.",
  openGraph: {
    title: "MEP Installations | Wolgan",
    description:
      "High-precision mechanical, electrical, and plumbing execution for large-scale infrastructure projects across Qatar and UAE.",
    url: "https://www.wolgan.co/services/mep-installations",
  },
};

export default function Page() {
  return <MEPInstallationsPage />;
}
