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
};

export default function Page() {
  return <ClientsPage />;
}
