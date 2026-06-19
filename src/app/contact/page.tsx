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

export default function Page() {
  return <ContactPage />;
}
