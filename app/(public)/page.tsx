import HeroSection from "@/components/home/HeroSection";
import ExploreSection from "@/components/home/ExploreSection";
import PCBTeaser from "@/components/home/PCBTeaser";
import SimulatorsTeaser from "@/components/home/SimulatorsTeaser";
import RoboticsTeaser from "@/components/home/RoboticsTeaser";
import ServicesCTA from "@/components/home/ServicesCTA";
import FinalCTA from "@/components/home/FinalCTA";
import { getFeaturedSimulators } from "@/data/simulators";

export default function HomePage() {
  const featured = getFeaturedSimulators().slice(0, 3);
  return (
    <>
      <HeroSection />
      <ExploreSection />
      <PCBTeaser />
      <SimulatorsTeaser simulators={featured} />
      <RoboticsTeaser />
      <ServicesCTA />
      <FinalCTA />
    </>
  );
}
