import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CinematicExperience } from "@/components/experience/CinematicExperience";
import { WolganVectorBridge } from "@/components/experience/WolganVectorBridge";
import { ClientsPartners } from "@/components/experience/ClientsPartners";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Header />
        <Hero />
        {/* CinematicExperience: pill → about → services arc → void + kinetic wheel */}
        <CinematicExperience />
        {/* VectorBridge: white bg, SVG line traces to expanding portal */}
        <WolganVectorBridge />
        {/* Clients and Partners */}
        <ClientsPartners />
        {/* Contact Section */}
        <Contact />
        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}