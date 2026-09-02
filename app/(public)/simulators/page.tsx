import type { Metadata } from "next";
import SimulatorsCatalogue from "@/components/simulators/SimulatorsCatalogue";

export const metadata: Metadata = {
  title: "Simulators",
  description:
    "Browse NERA's interactive simulation software for electronics, robotics, logic, and networking.",
};

export default function SimulatorsPage() {
  return <SimulatorsCatalogue />;
}
