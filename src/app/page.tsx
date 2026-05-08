import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PortalAbout } from "@/components/PortalAbout";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Header />
        <Hero />
        <PortalAbout />
      </main>
    </SmoothScroll>
  );
}