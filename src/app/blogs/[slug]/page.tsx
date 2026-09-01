import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar, User, ChevronRight } from "lucide-react";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: BlogPostProps): Promise<Metadata> {
  const params = await props.params;

  if (params.slug === "industrial-water-treatment-system-guide") {
    return {
      title: "Industrial Water Treatment Systems: A Practical Guide",
      description: "Learn what businesses should consider when selecting an industrial water treatment system, from water quality and capacity to treatment technology and maintenance.",
      alternates: {
        canonical: `/blogs/${params.slug}`,
      },
      openGraph: {
        title: "Industrial Water Treatment Systems: A Practical Guide",
        description: "Learn what businesses should consider when selecting an industrial water treatment system, from water quality and capacity to treatment technology and maintenance.",
        url: `https://www.wolgan.co/blogs/${params.slug}`,
        images: [
          {
            url: "/images/wolgan-logo-circular_1024x1024.jpg",
            width: 1024,
            height: 1024,
            alt: "Wolgan Logo",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Industrial Water Treatment Systems: A Practical Guide",
        description: "Learn what businesses should consider when selecting an industrial water treatment system.",
        images: ["/images/wolgan-logo-circular_1024x1024.jpg"],
      },
    };
  }

  if (params.slug === "ro-membrane-scaling-causes-prevention") {
    return {
      title: "RO Membrane Scaling: Causes, Signs & Prevention",
      description: "Understand the common causes of RO membrane scaling, the warning signs to monitor and practical approaches to reducing scaling risk.",
      alternates: {
        canonical: `/blogs/${params.slug}`,
      },
      openGraph: {
        title: "RO Membrane Scaling: Causes, Signs & Prevention",
        description: "Understand the common causes of RO membrane scaling, the warning signs to monitor and practical approaches to reducing scaling risk.",
        url: `https://www.wolgan.co/blogs/${params.slug}`,
        images: [
          {
            url: "/images/wolgan-logo-circular_1024x1024.jpg",
            width: 1024,
            height: 1024,
            alt: "Wolgan Logo",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "RO Membrane Scaling: Causes, Signs & Prevention",
        description: "Understand the common causes of RO membrane scaling and how to prevent it.",
        images: ["/images/wolgan-logo-circular_1024x1024.jpg"],
      },
    };
  }

  return {
    title: `Blog Post: ${params.slug} | Wolgan`,
    description: `Read our latest insights on ${params.slug} at Wolgan Water Treatment.`,
    alternates: {
      canonical: `/blogs/${params.slug}`,
    },
  };
}

export default async function BlogPost(props: BlogPostProps) {
  const params = await props.params;
  const { slug } = params;

  if (slug === "industrial-water-treatment-system-guide") {
    // Structured Data for BlogPosting
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.wolgan.co/blogs/${slug}`
      },
      "headline": "Industrial Water Treatment: What Businesses Need to Know Before Choosing a System",
      "image": [
        "https://www.wolgan.co/images/industrial_water_treatment_hero.jpg"
      ],
      "datePublished": "2026-08-21T08:00:00+00:00",
      "dateModified": "2026-08-21T08:00:00+00:00",
      "author": {
        "@type": "Organization",
        "name": "Wolgan Engineering Team",
        "url": "https://www.wolgan.co"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Wolgan",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.wolgan.co/images/Wolgan-logo.png"
        }
      }
    };

    // Structured Data for Breadcrumbs
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.wolgan.co/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blogs",
          "item": "https://www.wolgan.co/blogs"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Industrial Water Treatment System Guide"
        }
      ]
    };

    return (
      <main className="min-h-screen bg-[#F8F9FB] pt-28 pb-24 text-gray-800 font-sans selection:bg-[#66B2E8]/30">
        
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />

        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0A1F3C] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blogs" className="hover:text-[#0A1F3C] transition-colors">Blogs</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium truncate">
              Industrial Water Treatment System Guide
            </span>
          </nav>

          <article className="bg-white rounded-3xl p-8 md:p-12 lg:p-14 shadow-sm border border-gray-100">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-[#0A1F3C] mb-8 leading-tight tracking-tight">
              Industrial Water Treatment: What Businesses Need to Know Before Choosing a System
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-10 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base">Wolgan Engineering Team</p>
                  <p className="text-sm text-gray-500">Water Treatment Experts</p>
                </div>
              </div>
              <div className="flex items-center gap-6 md:ml-auto mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-base font-medium">Aug 21, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-base font-medium">8 min read</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <figure className="mb-12 relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-gray-100">
              <Image
                src="/images/industrial_water_treatment_hero.jpg"
                alt="Industrial Water Treatment Facility"
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
                className="object-cover"
              />
            </figure>

            {/* Content Area with Tighter Typography */}
            <div className="max-w-3xl mx-auto">
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-8 border-l-4 border-[#66B2E8] pl-6 py-1">
                Industrial water quality can affect equipment, processes and operations, as well as the quality required for the intended application. Choosing a suitable water treatment system should therefore begin with understanding the water source, the required treatment outcome and how the treated water will be used.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                The right treatment approach depends on several factors, including feed water quality, required treated-water quality, flow rate, operating conditions, site requirements and the intended application. There is no single treatment system that is suitable for every facility.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">What Is Industrial Water Treatment?</h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Industrial water treatment refers to processes used to improve or control water quality for specific industrial, commercial or institutional applications. Depending on the application, treatment may involve:
              </p>
              
              <ul className="list-disc pl-8 mb-6 space-y-2 text-lg text-gray-700 marker:text-[#66B2E8]">
                <li className="pl-2">Filtration</li>
                <li className="pl-2">Reverse osmosis</li>
                <li className="pl-2">Demineralisation</li>
                <li className="pl-2">Sewage treatment</li>
                <li className="pl-2">Effluent treatment</li>
                <li className="pl-2">Greywater treatment</li>
                <li className="pl-2">Chemical dosing</li>
                <li className="pl-2">Oily-water treatment</li>
                <li className="pl-2">Other specialised treatment processes</li>
              </ul>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                The appropriate combination depends on the characteristics of the incoming water and the quality required from the treated water.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">Why Water Analysis Should Come First</h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                One of the most important steps in selecting a treatment system is understanding the water that needs to be treated. A water analysis can provide information about parameters that may affect treatment design, such as:
              </p>
              
              <ul className="list-disc pl-8 mb-6 space-y-2 text-lg text-gray-700 marker:text-[#66B2E8]">
                <li className="pl-2">Total dissolved solids</li>
                <li className="pl-2">pH</li>
                <li className="pl-2">Hardness</li>
                <li className="pl-2">Conductivity</li>
                <li className="pl-2">Suspended solids</li>
                <li className="pl-2">Organic loading</li>
                <li className="pl-2">Specific contaminants</li>
                <li className="pl-2">Temperature</li>
                <li className="pl-2">Other application-specific parameters</li>
              </ul>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                The relevant parameters depend on whether the system is treating potable water, process water, wastewater, cooling water, boiler water or another application. Without sufficient information about the feed water, it can be difficult to determine which treatment stages are actually required.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">Capacity Is Another Important Consideration</h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Treatment systems need to be designed around the required flow and operating pattern.
              </p>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">How Much Water Is Required?</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                A system supplying a small commercial application will have different requirements from one serving a large industrial facility. Peak demand can also differ from average demand, so storage capacity and operating patterns may need to be considered during design.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Is Demand Continuous or Intermittent?</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                The way a facility uses water can influence the treatment-system design. A facility operating continuously may have different requirements from one with intermittent or highly variable demand. Understanding when and how much water is needed helps define the required capacity and operating approach.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">What Quality Is Required?</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                The required treated-water quality depends on how the water will ultimately be used. Water intended for a particular industrial process may have very different requirements from water used for general utility purposes. Defining the end use early in the design process helps determine which treatment processes may be appropriate.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">Common Industrial Water Treatment Technologies</h2>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Filtration</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Filtration can be used to reduce suspended particles and other materials, depending on the selected media and system configuration. The appropriate filtration method depends on the characteristics of the feed water and the treatment objective.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Reverse Osmosis</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Reverse osmosis uses a semi-permeable membrane to separate many dissolved substances from water. RO performance depends on factors such as feed-water characteristics, operating pressure, temperature, membrane selection and pretreatment. Because feed-water conditions vary between sites, RO systems need to be considered in the context of the specific water source and treatment requirements.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Sewage and Wastewater Treatment</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Wastewater treatment systems are designed around the characteristics of the wastewater and the required treated-effluent quality. A treatment system may include several physical, biological or chemical stages depending on the application. The appropriate process configuration should be determined from the wastewater characteristics, treatment objectives and applicable project requirements.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Chemical Treatment</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Chemical treatment programmes can be used for applications such as cooling water, chilled-water and boiler-water systems. The appropriate treatment programme depends on the water chemistry, equipment and operating conditions. Chemical selection and dosing should be based on the requirements of the particular system rather than a standard approach for every application.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">Why Pretreatment Matters</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Pretreatment is often an important part of an industrial water treatment system. Depending on the feed water, pretreatment may be used to reduce suspended solids, hardness, chlorine or other factors that could affect downstream equipment.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                For membrane-based systems, appropriate pretreatment can be particularly important for managing fouling and scaling risks. The exact pretreatment arrangement should be determined from the water analysis and system requirements rather than selected as a standard package for every application.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">Operation and Maintenance Should Be Considered During Design</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                A water treatment system is not simply an installation that can be left unattended after commissioning. Depending on the system, operators may need to monitor:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-lg text-gray-700 marker:text-[#66B2E8]">
                <li className="pl-2">Water quality</li>
                <li className="pl-2">Pressure and Flow</li>
                <li className="pl-2">Chemical dosing</li>
                <li className="pl-2">Filter condition</li>
                <li className="pl-2">Membrane performance</li>
                <li className="pl-2">Equipment condition</li>
                <li className="pl-2">Cleaning requirements</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Maintenance requirements vary considerably between different treatment systems. A practical design should therefore consider not only the initial installation, but also how the system will be operated, monitored and maintained over time. This can include defining routine inspections, monitoring requirements, cleaning procedures and servicing responsibilities before the system is commissioned.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">What Information Should You Prepare Before Requesting a Quotation?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                If you are planning an industrial water treatment project, the following information can help define the requirement:
              </p>
              <ol className="list-decimal pl-8 mb-6 space-y-2 text-lg text-gray-700 marker:text-[#66B2E8] marker:font-bold">
                <li className="pl-2">Feed-water analysis</li>
                <li className="pl-2">Required treatment capacity</li>
                <li className="pl-2">Intended application of the treated water</li>
                <li className="pl-2">Required treated-water quality</li>
                <li className="pl-2">Existing treatment equipment</li>
                <li className="pl-2">Available site information</li>
                <li className="pl-2">Process requirements</li>
                <li className="pl-2">Relevant drawings or specifications</li>
                <li className="pl-2">Operating schedule</li>
                <li className="pl-2">Applicable project requirements</li>
              </ol>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                The more clearly the application is defined, the easier it becomes to evaluate suitable treatment options. If a water analysis is available, it should be included with the project information. Existing equipment details and relevant drawings can also help when assessing an upgrade or replacement project.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">Choosing a Water Treatment System</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Choosing a treatment system should be based on the actual requirements of the facility rather than on a particular technology alone. A proper evaluation may consider:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-lg text-gray-700 marker:text-[#66B2E8]">
                <li className="pl-2"><strong className="text-gray-900">Water quality</strong> — What is present in the incoming water?</li>
                <li className="pl-2"><strong className="text-gray-900">Treatment objective</strong> — What quality needs to be achieved?</li>
                <li className="pl-2"><strong className="text-gray-900">Capacity</strong> — How much water needs to be treated?</li>
                <li className="pl-2"><strong className="text-gray-900">Operating conditions</strong> — How will the system be used?</li>
                <li className="pl-2"><strong className="text-gray-900">Pretreatment</strong> — What protection does the downstream equipment require?</li>
                <li className="pl-2"><strong className="text-gray-900">Maintenance</strong> — What monitoring, cleaning and servicing will be required?</li>
                <li className="pl-2"><strong className="text-gray-900">Site requirements</strong> — What space, utilities and installation conditions are available?</li>
              </ul>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">Final Thoughts</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Industrial water treatment is an engineering requirement that needs to be considered in the context of the facility, its water source and its intended application.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                Water quality, treatment capacity, application, treatment objectives, pretreatment, operation and maintenance can all influence the appropriate solution. For organisations planning a new system or reviewing an existing one, a site-specific assessment and water-quality evaluation can provide a useful starting point before selecting equipment or treatment processes.
              </p>
              
            </div>
          </article>
        </div>
      </main>
    );
  }

  if (slug === "ro-membrane-scaling-causes-prevention") {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.wolgan.co/blogs/${slug}`
      },
      "headline": "RO Membrane Scaling: Causes, Warning Signs and Prevention",
      "image": ["https://www.wolgan.co/images/ro_membrane_skid_system.jpg"],
      "datePublished": "2026-08-21T08:00:00+00:00",
      "dateModified": "2026-08-21T08:00:00+00:00",
      "author": {
        "@type": "Organization",
        "name": "Wolgan Engineering Team",
        "url": "https://www.wolgan.co"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Wolgan",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.wolgan.co/images/Wolgan-logo.png"
        }
      }
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wolgan.co/" },
        { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "https://www.wolgan.co/blogs" },
        { "@type": "ListItem", "position": 3, "name": "RO Membrane Scaling: Causes, Signs & Prevention" }
      ]
    };

    return (
      <main className="min-h-screen bg-[#F8F9FB] pt-28 pb-24 text-gray-800 font-sans selection:bg-[#66B2E8]/30">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        <div className="container mx-auto px-6 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0A1F3C] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blogs" className="hover:text-[#0A1F3C] transition-colors">Blogs</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium truncate">RO Membrane Scaling</span>
          </nav>

          <article className="bg-white rounded-3xl p-8 md:p-12 lg:p-14 shadow-sm border border-gray-100">
            <h1 className="text-3xl md:text-5xl font-bold text-[#0A1F3C] mb-8 leading-tight tracking-tight">
              RO Membrane Scaling: Causes, Warning Signs and Prevention
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-10 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base">Wolgan Engineering Team</p>
                  <p className="text-sm text-gray-500">Water Treatment Experts</p>
                </div>
              </div>
              <div className="flex items-center gap-6 md:ml-auto mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-base font-medium">Aug 21, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-base font-medium">7 min read</span>
                </div>
              </div>
            </div>

            <figure className="mb-12 relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-gray-100">
              <Image
                src="/images/ro_membrane_skid_system.jpg"
                alt="Reverse Osmosis Membrane System"
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
                className="object-cover"
              />
            </figure>

            <div className="max-w-3xl mx-auto">

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-8 border-l-4 border-[#66B2E8] pl-6 py-1">
                Reverse osmosis (RO) is widely used to reduce dissolved substances in water. However, RO membranes require suitable operating conditions and appropriate pretreatment to maintain performance. One common challenge is <strong className="text-gray-800">membrane scaling</strong>.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Scaling occurs when dissolved substances become concentrated near the membrane surface and precipitate or form deposits. If scaling is not controlled, it can affect membrane performance and increase maintenance requirements.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">What Is RO Membrane Scaling?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                During reverse osmosis, water passes through the membrane while many dissolved substances are retained. As water passes through the system, the concentration of certain dissolved substances increases in the concentrate stream and near the membrane surface.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                If the concentration of a sparingly soluble substance exceeds its solubility limit, deposits can form. These deposits are commonly referred to as scale. The exact type of scale depends on the water chemistry and operating conditions.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">What Causes Scaling?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">Several factors can contribute to scaling.</p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">1. High Hardness</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Calcium and magnesium are common components of water hardness. Under appropriate chemical and operating conditions, certain calcium-containing compounds can form deposits.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">2. High Dissolved Solids</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Higher concentrations of dissolved substances can increase the potential for precipitation as water recovery increases.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">3. Excessive Recovery</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                RO recovery represents the proportion of feed water converted into permeate. Increasing recovery can increase the concentration of dissolved substances in the concentrate. Higher recovery is not automatically a problem, but it needs to be compatible with the feed-water chemistry and system design.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">4. Inadequate Pretreatment</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                If pretreatment does not sufficiently control the factors contributing to scaling, the RO membrane may be exposed to a greater scaling risk.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">5. Changes in Water Chemistry</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Feed-water conditions can change over time. Seasonal changes, source-water changes or changes in upstream processes can alter the chemistry entering the RO system. This is one reason periodic monitoring can be important.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">What Are the Warning Signs?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                A change in RO performance does not automatically prove that scaling is the cause. However, certain changes may justify further investigation. These can include:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-lg text-gray-700 marker:text-[#66B2E8]">
                <li className="pl-2">Reduced permeate flow</li>
                <li className="pl-2">Increased pressure requirements</li>
                <li className="pl-2">Changes in salt rejection</li>
                <li className="pl-2">Increased differential pressure</li>
                <li className="pl-2">Increasing frequency of cleaning</li>
                <li className="pl-2">Changes in normal operating conditions</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                The correct diagnosis should consider operating data and water chemistry rather than assuming that every performance problem is caused by scale.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">How Can Scaling Risk Be Reduced?</h2>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Analyse the Feed Water</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Water analysis provides information needed to understand the chemical conditions entering the RO system. Important parameters depend on the water source and system.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Review System Recovery</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Recovery should be evaluated against the water chemistry and membrane-system design. Higher recovery is not necessarily better if it creates unacceptable concentration conditions.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Use Appropriate Pretreatment</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Pretreatment can help control substances that contribute to membrane fouling or scaling. The correct configuration depends on the feed water.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Consider Antiscalant Treatment</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Antiscalants are chemicals designed to reduce the tendency of certain scale-forming substances to precipitate under appropriate conditions. However, antiscalant selection and dosing should be based on the specific water chemistry and system conditions. More chemical does not automatically mean better performance.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F3C] mt-8 mb-3">Monitor System Performance</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Maintaining baseline operating data can make it easier to identify changes over time. Useful information may include:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-lg text-gray-700 marker:text-[#66B2E8]">
                <li className="pl-2">Feed pressure</li>
                <li className="pl-2">Concentrate pressure</li>
                <li className="pl-2">Permeate flow</li>
                <li className="pl-2">Feed conductivity</li>
                <li className="pl-2">Permeate conductivity</li>
                <li className="pl-2">Recovery</li>
                <li className="pl-2">Temperature</li>
                <li className="pl-2">Differential pressure</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Comparing current performance with established baseline conditions can help identify trends.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">What Happens If Scaling Is Ignored?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Persistent scaling can affect membrane performance and may increase cleaning requirements. In severe cases, deposits may become more difficult to remove. The appropriate response depends on the type and severity of the deposit.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Cleaning should therefore be based on the membrane manufacturer&apos;s recommendations and the characteristics of the deposit rather than using a generic chemical programme.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">Scaling Isn&apos;t the Same as Fouling</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                These terms are sometimes used interchangeably, but they are not identical.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                <strong className="text-gray-900">Scaling</strong> generally refers to precipitation and deposition of sparingly soluble inorganic substances.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                <strong className="text-gray-900">Fouling</strong> is a broader term that can include deposits caused by organic matter, biological material, colloids and other substances.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                Correctly identifying the problem matters because the appropriate treatment approach can differ.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1F3C] mt-10 mb-4 tracking-tight">Final Thoughts</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                RO membrane scaling is generally easier to manage when it is considered during system design and monitored during operation. Water analysis, appropriate pretreatment, sensible recovery, suitable chemical treatment and operating-data monitoring can all contribute to better control.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                When an RO system begins showing performance changes, the first step should be diagnosis rather than immediately increasing chemical dosing.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                Wolgan works with water treatment systems and chemical treatment programmes according to application and project requirements.
              </p>

            </div>
          </article>
        </div>
      </main>
    );
  }

  notFound();
}
