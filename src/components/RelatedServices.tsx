"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedServicesProps {
  currentService: "water" | "mep" | "chemical";
}

const services = {
  water: {
    title: "Water Treatment",
    href: "/services/water-treatment",
    description: "RO polishing, STP, and industrial water management.",
  },
  mep: {
    title: "MEP Installations",
    href: "/services/mep-installations",
    description: "High-precision mechanical, electrical, and plumbing execution.",
  },
  chemical: {
    title: "Chemical Supplies",
    href: "/services/chemical-supplies",
    description: "Specialized water treatment and commodity chemicals.",
  },
};

export function RelatedServices({ currentService }: RelatedServicesProps) {
  const related = Object.entries(services)
    .filter(([key]) => key !== currentService)
    .map(([, service]) => service);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl lg:text-3xl font-light text-white mb-8 leading-tight">
        Explore <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]">Other Services</span>
      </h2>
      
      <div className="flex flex-row gap-4">
        {related.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            aria-label={service.title === "Chemical Supplies" ? "Explore Chemical Supplies" : undefined}
            className="group w-full min-h-[220px] p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#66B2E8]/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-medium text-white mb-3 group-hover:text-[#66B2E8] transition-colors">{service.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#66B2E8] text-sm font-semibold opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-transform">
              {service.title === "Chemical Supplies" ? "Explore Chemical Supplies" : "Learn more"} <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
