import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CinematicExperience } from "@/components/experience/CinematicExperience";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Header />
        <Hero />
        <CinematicExperience />
      </main>
    </SmoothScroll>
  );
}