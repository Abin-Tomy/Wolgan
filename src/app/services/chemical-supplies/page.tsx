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
};

export default function Page() {
  return <ChemicalSuppliesPage />;
}
