import React from "react";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@/components/ui/icons/ArrowUpRight";

interface ServiceItem {
  title: string;
  desc: string;
  img: any;
  href: string;
}

interface PortalServicesProps {
  services: ServiceItem[];
}

function ServiceContentBlock({ index, service }: { index: number; service: ServiceItem }) {
  return (
    <div className="absolute inset-0">
      {/* Left: Heading and Numbering */}
      <div className={`service-side-left-${index} absolute left-[8%] top-[50%] -translate-y-1/2 w-[24vw] opacity-0 text-white`}>
        <div className="flex items-center gap-4 mb-6">
          <Typography variant="h3" className="text-white/40 font-light tracking-tighter">
            0{index + 1}
          </Typography>
          <div className="w-8 h-[1px] bg-white opacity-20" />
        </div>
        <Typography variant="h2" className="text-white">
          {service.title}
        </Typography>
      </div>

      {/* Right: Descriptive texts and Button */}
      <div className={`service-side-right-${index} absolute right-[8%] top-[58%] -translate-y-1/2 w-[24vw] opacity-0 text-left text-white`}>
        <p className="text-sm md:text-base leading-relaxed opacity-70 mb-10">
          {service.desc}
        </p>

        <Button 
          variant="headerCta" 
          href={service.href}
          className="flex pointer-events-auto"
        >
          View Details
          <ArrowUpRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </div>
  );
}

export function ServiceArc({ services }: PortalServicesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[30]">
      <div className="services-main-title absolute top-24 left-1/2 -translate-x-1/2 text-center opacity-0 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-white opacity-20" />
          <Typography variant="tagline" className="text-white opacity-40">
            Our Services
          </Typography>
          <div className="w-8 h-[1px] bg-white opacity-20" />
        </div>
        <Typography variant="h2" className="text-white leading-tight">
          Advanced Technical <span className="italic font-light opacity-80 text-white">Solutions</span>
        </Typography>
      </div>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 service-arc-path"
        viewBox="0 0 100 100"
      >
        <path
          d="M 20 70 Q 50 100 80 70"
          fill="none"
          stroke="#ff7e33"
          strokeWidth="0.2"
          strokeDasharray="100 100"
          strokeDashoffset="100"
          opacity="0.6"
        />
      </svg>

      {services.map((service, i) => (
        <ServiceContentBlock key={i} index={i} service={service} />
      ))}

    </div>
  );
}
