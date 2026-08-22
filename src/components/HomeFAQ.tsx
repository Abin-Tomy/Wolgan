"use client";

import { ServiceFAQ } from "@/components/ServiceFAQ";

const homeFAQItems = [
  {
    question: "Where does Wolgan provide its services?",
    answer: [
      "Wolgan provides water and wastewater treatment solutions across Qatar, the UAE, India, (and other Middle Eastern markets, subject to applicable regulations, project requirements, and client specifications.)",
    ],
  },
  {
    question: "What industries does Wolgan serve?",
    answer: [
      "Wolgan serves a wide range of sectors, including residential and domestic developments, municipal projects, industrial facilities, oil & gas, pharmaceutical, pulp & paper, hospitals, schools, and colleges.",
    ],
  },
  {
    question: "What water and wastewater treatment solutions does Wolgan provide?",
    answer: [
      "Wolgan provides solutions including STP, ETP, SWRO, BWRO, greywater treatment, demineralisation, deoiling systems, oily water treatment packages, and chemical water treatment programmes, tailored to specific project and client requirements.",
    ],
  },
  {
    question: "How can I request a quotation from Wolgan?",
    answer: [
      "To request a technical or commercial quotation, please contact info@wolgan.qa or info@wolgan.ae.",
      "Our team will review your requirements and provide a customized solution and proposal.",
    ],
  },
  {
    question: "Does Wolgan provide Operation & Maintenance (O&M) and Annual Maintenance Contracts (AMC)?",
    answer: [
      "Yes. Wolgan provides O&M, AMC, preventive maintenance, troubleshooting, and technical support for water and wastewater treatment systems. Service packages can be tailored to the plant type and client requirements.",
    ],
  },
  {
    question: "Does Wolgan provide design, supply, installation, and commissioning services?",
    answer: [
      "Yes. Wolgan can provide engineering, design, equipment supply, installation, commissioning, and technical support, depending on the project scope and client requirements.",
    ],
  },
  {
    question: "Can Wolgan upgrade or refurbish existing treatment plants?",
    answer: [
      "Yes. Wolgan can assess existing water and wastewater treatment systems and provide upgrading, refurbishment, optimisation, and replacement solutions based on plant condition, performance, capacity, and client requirements.",
    ],
  },
  {
    question: "Does Wolgan provide water treatment chemicals and chemical treatment programmes?",
    answer: [
      "Yes. Wolgan provides water treatment chemicals, chemical dosing solutions, and customized chemical treatment programmes for applications such as cooling water, chilled water, boiler water, and other industrial water treatment systems.",
    ],
  },
  {
    question: "How long does a typical water treatment project take?",
    answer: [
      "Project duration depends on the system capacity, treatment technology, equipment availability, design requirements, site conditions, and project scope. Wolgan provides project schedules based on the specific requirements of each project.",
    ],
  },
  {
    question: "What information is required to obtain a water treatment quotation?",
    answer: [
      "Typically, we require details such as required capacity, water or wastewater analysis, application, required treated-water quality, project specifications, site conditions, and relevant drawings, where available.",
    ],
  },
  {
    question: "What standards and requirements does Wolgan follow?",
    answer: [
      "Wolgan develops its solutions in accordance with applicable local regulations, relevant standards, project specifications, and client requirements, depending on the project location and application.",
    ],
  },
  {
    question: "How can I contact Wolgan for technical support or urgent service requirements?",
    answer: [
      "For technical enquiries, service requirements, or urgent support, please contact info@wolgan.qa or info@wolgan.ae. Our team will coordinate with you based on the nature and urgency of the requirement.",
      "You can also reach us directly — Qatar: +974 7125 1155 | UAE: +971 56 505 2820.",
    ],
  },
];

export function HomeFAQ() {
  const leftItems = homeFAQItems.slice(0, 6);
  const rightItems = homeFAQItems.slice(6);

  return (
    <section
      id="faq"
      className="relative py-20 lg:py-28 px-6 z-10 bg-[#0A1F3C]"
    >
      {/* Subtle top gradient for visual separation */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      <div className="container mx-auto relative">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl lg:text-4xl font-light text-white leading-tight">
              Wolgan <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]"> — Frequently Asked Questions</span>
            </h2>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <ServiceFAQ title="" items={leftItems} />
            <ServiceFAQ title="" items={rightItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
