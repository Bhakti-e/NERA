import type { Simulator } from "@/types";

export const simulators: Simulator[] = [
  {
    id: "1",
    slug: "circuit-sim-pro",
    name: "CircuitSim Pro",
    category: "Electronics",
    shortDescription:
      "Interactive circuit simulation for students and educators with real-time signal analysis.",
    fullDescription:
      "CircuitSim Pro provides a fully interactive electronics learning environment. Build circuits, analyze signals, and understand component behavior in real time.",
    thumbnail: "",
    platform: ["Web", "Windows"],
    version: "1.2.0",
    status: "beta",
    features: [
      "Real-time signal visualization",
      "Component library with 200+ parts",
      "Oscilloscope simulation",
      "Export to schematic",
    ],
    prototypeUrl: null,
    isFeatured: true,
    tags: ["electronics", "education", "signals"],
  },
  {
    id: "2",
    slug: "robo-dynamics",
    name: "RoboDynamics",
    category: "Robotics",
    shortDescription:
      "Physics-based robotics simulator for designing and testing robot behaviors before building.",
    fullDescription:
      "RoboDynamics lets you design, program, and simulate robotic systems in a physics-accurate environment before any hardware is built.",
    thumbnail: "",
    platform: ["Windows", "macOS", "Linux"],
    version: "0.9.1",
    status: "beta",
    features: [
      "Physics-accurate simulation",
      "Visual programming interface",
      "Sensor emulation",
      "Path planning tools",
    ],
    prototypeUrl: null,
    isFeatured: true,
    tags: ["robotics", "physics", "automation"],
  },
  {
    id: "3",
    slug: "logic-lab",
    name: "LogicLab",
    category: "Digital Logic",
    shortDescription:
      "Hands-on digital logic gate simulator — from basic AND/OR to full sequential circuits.",
    fullDescription:
      "LogicLab makes learning digital logic intuitive. Start with simple gates and progress to flip-flops, counters, and state machines.",
    thumbnail: "",
    platform: ["Web"],
    version: "2.0.0",
    status: "available",
    features: [
      "All standard logic gates",
      "Truth table generation",
      "Sequential circuit builder",
      "Timing diagram view",
    ],
    prototypeUrl: "https://nera.example/proto/logic-lab",
    isFeatured: true,
    tags: ["logic", "digital", "education"],
  },
  {
    id: "4",
    slug: "network-sim",
    name: "NetSim",
    category: "Networking",
    shortDescription:
      "Visualize and simulate network topologies, protocols, and data flow interactively.",
    fullDescription:
      "NetSim provides an interactive environment for understanding computer networks — from OSI layers to TCP/IP protocols.",
    thumbnail: "",
    platform: ["Web", "Windows"],
    version: "1.0.0",
    status: "coming-soon",
    features: [
      "Packet flow visualization",
      "Protocol simulation",
      "Network topology builder",
      "Latency and throughput analysis",
    ],
    prototypeUrl: null,
    isFeatured: false,
    tags: ["networking", "protocols", "visualization"],
  },
];

export function getSimulatorBySlug(slug: string): Simulator | undefined {
  return simulators.find((s) => s.slug === slug);
}

export function getFeaturedSimulators(): Simulator[] {
  return simulators.filter((s) => s.isFeatured).slice(0, 3);
}
