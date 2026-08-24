import { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CinematicExperience } from "@/components/animations/CinematicExperience";
import { WolganVectorBridge } from "@/components/animations/WolganVectorBridge";
import { ClientsPartners } from "@/components/animations/ClientsPartners";
import { HomeFAQ } from "@/components/HomeFAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { MobileHome } from "@/components/mobile/MobileHome";
import { LaptopHome } from "@/components/screens/laptop/LaptopHome";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};
const homeBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolgan.co" },
  ],
};

const homeFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where does Wolgan provide its services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wolgan provides water and wastewater treatment solutions across Qatar, the UAE, India, (and other Middle Eastern markets, subject to applicable regulations, project requirements, and client specifications.)",
      },
    },
    {
      "@type": "Question",
      name: "What industries does Wolgan serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wolgan serves a wide range of sectors, including residential and domestic developments, municipal projects, industrial facilities, oil & gas, pharmaceutical, pulp & paper, hospitals, schools, and colleges.",
      },
    },
    {
      "@type": "Question",
      name: "What water and wastewater treatment solutions does Wolgan provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wolgan provides solutions including STP, ETP, SWRO, BWRO, greywater treatment, demineralisation, deoiling systems, oily water treatment packages, and chemical water treatment programmes, tailored to specific project and client requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How can I request a quotation from Wolgan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To request a technical or commercial quotation, please contact info@wolgan.qa or info@wolgan.ae. Our team will review your requirements and provide a customized solution and proposal.",
      },
    },
    {
      "@type": "Question",
      name: "Does Wolgan provide Operation & Maintenance (O&M) and Annual Maintenance Contracts (AMC)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Wolgan provides O&M, AMC, preventive maintenance, troubleshooting, and technical support for water and wastewater treatment systems. Service packages can be tailored to the plant type and client requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Does Wolgan provide design, supply, installation, and commissioning services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Wolgan can provide engineering, design, equipment supply, installation, commissioning, and technical support, depending on the project scope and client requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Can Wolgan upgrade or refurbish existing treatment plants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Wolgan can assess existing water and wastewater treatment systems and provide upgrading, refurbishment, optimisation, and replacement solutions based on plant condition, performance, capacity, and client requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Does Wolgan provide water treatment chemicals and chemical treatment programmes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Wolgan provides water treatment chemicals, chemical dosing solutions, and customized chemical treatment programmes for applications such as cooling water, chilled water, boiler water, and other industrial water treatment systems.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical water treatment project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project duration depends on the system capacity, treatment technology, equipment availability, design requirements, site conditions, and project scope. Wolgan provides project schedules based on the specific requirements of each project.",
      },
    },
    {
      "@type": "Question",
      name: "What information is required to obtain a water treatment quotation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically, we require details such as required capacity, water or wastewater analysis, application, required treated-water quality, project specifications, site conditions, and relevant drawings, where available.",
      },
    },
    {
      "@type": "Question",
      name: "What standards and requirements does Wolgan follow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wolgan develops its solutions in accordance with applicable local regulations, relevant standards, project specifications, and client requirements, depending on the project location and application.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Wolgan for technical support or urgent service requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For technical enquiries, service requirements, or urgent support, please contact info@wolgan.qa or info@wolgan.ae. Our team will coordinate with you based on the nature and urgency of the requirement. You can also reach us directly — Qatar: +974 7125 1155 | UAE: +971 56 505 2820.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFAQ) }} />
      <SmoothScroll>
      <ResponsiveWrapper
        desktop={
          <main>
            <Header />
            <Hero />
            {/* CinematicExperience: pill -> about -> services arc -> void + kinetic wheel */}
            <CinematicExperience />
            {/* VectorBridge: white bg, SVG line traces to expanding portal */}
            <WolganVectorBridge />
            {/* Clients and Partners */}
            <ClientsPartners />
            {/* FAQ Section */}
            <HomeFAQ />
            {/* Contact Section */}
            <Contact />
            {/* Footer */}
            <div className="relative z-20 -mt-1">
              <Footer waveColor="#020610" />
            </div>
          </main>
        }
        laptop={<LaptopHome />}
        mobile={<MobileHome />}
      />
    </SmoothScroll>
    </>
  );
}