import type { RoboticsProject } from "@/types";

export const roboticsProjects: RoboticsProject[] = [
  {
    id: "1",
    name: "Micro Hexapod",
    category: "Microrobotics",
    description:
      "A six-legged micro-robot prototype exploring biomimetic locomotion patterns at sub-10cm scale.",
    status: "prototype",
    images: [],
    tags: ["microrobotics", "biomimetic", "locomotion"],
  },
  {
    id: "2",
    name: "Quadruped Research Platform",
    category: "Biomimetic Robotics",
    description:
      "Research platform for studying quadrupedal gait dynamics and terrain adaptation algorithms.",
    status: "research",
    images: [],
    tags: ["quadruped", "gait", "terrain-adaptation"],
  },
  {
    id: "3",
    name: "Autonomous Navigation Module",
    category: "Embedded Systems",
    description:
      "Custom embedded navigation system using sensor fusion (IMU + ToF + optical flow) for indoor positioning.",
    status: "active",
    images: [],
    tags: ["navigation", "sensor-fusion", "embedded"],
  },
  {
    id: "4",
    name: "Soft Gripper Prototype",
    category: "Robotic Prototypes",
    description:
      "Pneumatically actuated soft gripper for delicate object manipulation research.",
    status: "prototype",
    images: [],
    tags: ["soft-robotics", "gripper", "pneumatic"],
  },
];
