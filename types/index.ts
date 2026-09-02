export interface Simulator {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  platform: string[];
  version: string;
  status: "available" | "beta" | "coming-soon";
  features: string[];
  prototypeUrl: string | null;
  isFeatured: boolean;
  tags: string[];
}

export interface RoboticsProject {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "research" | "prototype" | "active" | "completed";
  images: string[];
  tags: string[];
}

export type ServiceType =
  | "website-webapp"
  | "custom-simulator"
  | "pcb-designing"
  | "robotics-embedded"
  | "custom-software"
  | "research-publication"
  | "student-project"
  | "mentorship"
  | "other";

export interface ServiceFormData {
  serviceType: ServiceType;
  name: string;
  contact: string;
  description: string;
  [key: string]: string | boolean | string[];
}

export interface NavItem {
  label: string;
  href: string;
}
