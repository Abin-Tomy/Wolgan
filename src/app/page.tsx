import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PortalAbout } from "@/components/PortalAbout";
import { ThreeServicesAlt } from "@/components/ThreeServicesAlt/ThreeServicesAlt";
// import { ThreeServices } from "@/components/ThreeServices/ThreeServices";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Header />
        <Hero />
        <PortalAbout />
        <ThreeServicesAlt />
        {/* <ThreeServices /> */}
      </main>
    </SmoothScroll>
  );
}