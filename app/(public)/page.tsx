import HeroSection from "@/components/home/HeroSection";
import ExploreSection from "@/components/home/ExploreSection";
import PCBTeaser from "@/components/home/PCBTeaser";
import SimulatorsSection from "@/components/home/SimulatorsSection";
import RoboticsSection from "@/components/home/RoboticsSection";
import ServicesSection from "@/components/home/ServicesSection";
import FinalCTA from "@/components/home/FinalCTA";
import { getFeaturedSimulators } from "@/data/simulators";
import { roboticsProjects } from "@/data/roboticsProjects";

export default function HomePage() {
  const featured = getFeaturedSimulators();

  return (
    <>
      <HeroSection />
      <ExploreSection />
      <PCBTeaser />
      <SimulatorsSection simulators={featured} />
      <RoboticsSection projects={roboticsProjects} />
      <ServicesSection />
      <FinalCTA />
    </>
  );
}
