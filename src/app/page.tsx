import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CinematicExperience } from "@/components/animations/CinematicExperience";
import { WolganVectorBridge } from "@/components/animations/WolganVectorBridge";
import { ClientsPartners } from "@/components/animations/ClientsPartners";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ResponsiveWrapper } from "@/components/ResponsiveWrapper";
import { MobileHome } from "@/components/mobile/MobileHome";
import { LaptopHome } from "@/components/screens/laptop/LaptopHome";

export default function Home() {
  return (
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
  );
}