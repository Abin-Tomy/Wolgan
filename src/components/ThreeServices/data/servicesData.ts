import placeholderImg from "@/assets/services-placeholder.png";

export interface ServiceItem {
    id: number;
    imageSrc: string;
    imageAlt: string;
    heading: string;
    description: string;
    /** Slight X offset so planes aren't perfectly stacked — mirrors the original */
    xOffset: number;
}

export const servicesData: ServiceItem[] = [
    {
        id: 1,
        imageSrc: placeholderImg.src,
        imageAlt: "Water Treatment",
        heading: "Water Treatment",
        description:
            "Advanced water treatment systems engineered for reliability and performance across industrial and commercial applications in Qatar, UAE, and India.",
        xOffset: -0.9,
    },
    {
        id: 2,
        imageSrc: placeholderImg.src,
        imageAlt: "MEP Installation & Services",
        heading: "MEP Installation & Services",
        description:
            "End-to-end mechanical, electrical, and plumbing installation and maintenance — delivered with precision by our certified engineering teams.",
        xOffset: 0.9,
    },
    {
        id: 3,
        imageSrc: placeholderImg.src,
        imageAlt: "Commodity Chemical Supplies",
        heading: "Commodity Chemical Supplies",
        description:
            "Reliable supply of high-grade treatment chemicals, sourced and delivered with full compliance to regional safety and quality standards.",
        xOffset: -0.9,
    },
    {
        id: 4,
        imageSrc: placeholderImg.src,
        imageAlt: "Electrical Installation & Maintenance",
        heading: "Electrical Installation & Maintenance Services",
        description:
            "Comprehensive electrical installation, testing, and ongoing maintenance services for facilities across the Gulf region.",
        xOffset: 0.9,
    },
];