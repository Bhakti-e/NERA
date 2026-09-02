"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Cpu,
  CircuitBoard,
  Bot,
  Code2,
  BookOpen,
  GraduationCap,
  Users,
  HelpCircle,
} from "lucide-react";
import type { ServiceType } from "@/types";

const services = [
  {
    type: "website-webapp" as ServiceType,
    label: "Website / Web App",
    icon: Globe,
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.08)",
    description: "Landing pages, web apps, portals, dashboards",
  },
  {
    type: "custom-simulator" as ServiceType,
    label: "Custom Simulator",
    icon: Cpu,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    description: "Interactive educational or research simulation software",
  },
  {
    type: "pcb-designing" as ServiceType,
    label: "PCB Designing",
    icon: CircuitBoard,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    description: "Schematic capture, PCB layout, manufacturing files",
  },
  {
    type: "robotics-embedded" as ServiceType,
    label: "Robotics / Embedded",
    icon: Bot,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    description: "Robot prototypes, firmware, embedded systems",
  },
  {
    type: "custom-software" as ServiceType,
    label: "Custom Software",
    icon: Code2,
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    description: "Desktop tools, automation, API integrations",
  },
  {
    type: "research-publication" as ServiceType,
    label: "Research Support",
    icon: BookOpen,
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.08)",
    description: "Research guidance and publication-process support",
  },
  {
    type: "student-project" as ServiceType,
    label: "Student Project",
    icon: GraduationCap,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    description: "Final-year and academic project support",
  },
  {
    type: "mentorship" as ServiceType,
    label: "Live Mentorship",
    icon: Users,
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.08)",
    description: "1-on-1 mentoring, live project guidance",
  },
  {
    type: "other" as ServiceType,
    label: "Other",
    icon: HelpCircle,
    color: "#9999aa",
    bg: "rgba(153,153,170,0.08)",
    description: "Something else? Describe your idea",
  },
];

interface Props {
  selected: ServiceType | null;
  onSelect: (type: ServiceType) => void;
}

export default function ServiceSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h2
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
      >
        What can NERA build for you?
      </h2>
      <p className="text-sm mb-8" style={{ color: "var(--nera-text-secondary)" }}>
        Select a service category to get started.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          const isSelected = selected === svc.type;

          return (
            <motion.button
              key={svc.type}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(svc.type)}
              className="text-left p-4 rounded-xl border transition-all duration-200"
              style={{
                background: isSelected ? svc.bg : "white",
                borderColor: isSelected ? svc.color + "40" : "rgba(0,0,0,0.06)",
                boxShadow: isSelected
                  ? `0 0 0 2px ${svc.color}20`
                  : "0 2px 6px rgba(0,0,0,0.03)",
              }}
              aria-pressed={isSelected}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: svc.bg, border: `1px solid ${svc.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: svc.color }} />
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: isSelected ? svc.color : "var(--nera-text-primary)" }}
                  >
                    {svc.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--nera-text-muted)" }}>
                    {svc.description}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
