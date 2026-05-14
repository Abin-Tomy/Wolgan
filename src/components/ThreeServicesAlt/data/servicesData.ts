import waterTreatmentImg from "@/assets/water-treatment-service.jpg";
import mepImg from "@/assets/MEP-installation-service.webp";
import chemicalImg from "@/assets/chemical-supplies-services.webp";
import electricalImg from "@/assets/electrical-installation-service.webp";

export interface ServiceItem {
    id: number;
    imageSrc: string;
    imageAlt: string;
    heading: string;
    description: string;
    /** Slight X offset so planes aren't perfectly stacked — mirrors the original */
    xOffset: number;
    /** Background mood color for this section */
    moodColor: string;
    /** Atmospheric blob colors */
    blob1Color: string;
    blob2Color: string;
    /** Text color adjustment if needed (default to navy) */
    titleColor: string;
    /** Whether this section prefers light or dark text on top of the background */
    textTone: "light" | "dark";
}

export const servicesData: ServiceItem[] = [
    {
        id: 1,
        imageSrc: waterTreatmentImg.src,
        imageAlt: "Water Treatment",
        heading: "Water Treatment",
        description:
            "Advanced water treatment systems engineered for reliability and performance across industrial and commercial applications in Qatar, UAE, and India.",
        xOffset: -0.9,
        moodColor: "#EBF5F8", // Arctic Blue (First - Perfect)
        blob1Color: "#B9D7E8", 
        blob2Color: "#D1EAF0", 
        titleColor: "#FFFFFF", 
        textTone: "dark",
    },
    {
        id: 2,
        imageSrc: mepImg.src,
        imageAlt: "MEP Installation & Services",
        heading: "MEP Installation & Services",
        description:
            "End-to-end mechanical, electrical, and plumbing installation and maintenance — delivered with precision by our certified engineering teams.",
        xOffset: 0.9,
        moodColor: "#FFE5D0", // Saturated Peach
        blob1Color: "#FFC599", 
        blob2Color: "#FFB380", 
        titleColor: "#FFFFFF", 
        textTone: "dark",
    },
    {
        id: 3,
        imageSrc: chemicalImg.src,
        imageAlt: "Commodity Chemical Supplies",
        heading: "Commodity Chemical Supplies",
        description:
            "Reliable supply of high-grade treatment chemicals, sourced and delivered with full compliance to regional safety and quality standards.",
        xOffset: -0.9,
        moodColor: "#D0F0FF", // More visible Sky Blue
        blob1Color: "#4FC3F7", 
        blob2Color: "#81D4FA", 
        titleColor: "#FFFFFF", 
        textTone: "dark",
    },
    {
        id: 4,
        imageSrc: electricalImg.src,
        imageAlt: "Electrical Installation & Maintenance",
        heading: "Electrical Installation & Maintenance Services",
        description:
            "Comprehensive electrical installation, testing, and ongoing maintenance services for facilities across the Gulf region.",
        xOffset: 0.9,
        moodColor: "#FFF9C4", // More visible Yellowish
        blob1Color: "#FDD835", 
        blob2Color: "#FFF176", 
        titleColor: "#FFFFFF", 
        textTone: "dark",
    },
];