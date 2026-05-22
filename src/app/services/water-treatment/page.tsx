import type { Metadata } from "next";
import { WaterTreatmentPage } from "@/components/screens/WaterTreatmentPage";

export const metadata: Metadata = {
  title: "Water Treatment Solutions | Wolgan Qatar & UAE",
  description:
    "Wolgan provides comprehensive water treatment solutions including RO polishing, sewage treatment plants, grey water systems, and industrial water management across Qatar, UAE, and India.",
  openGraph: {
    title: "Water Treatment Solutions | Wolgan",
    description:
      "Comprehensive water treatment — RO polishing, sewage treatment plants, grey water systems, and industrial water management.",
    url: "https://www.wolgan.co/services/water-treatment",
  },
};

export default function Page() {
  return <WaterTreatmentPage />;
}
