"use client";

import { motion } from "framer-motion";
import {
  Globe, Cpu, CircuitBoard, Bot, Code2,
  BookOpen, GraduationCap, Users, HelpCircle,
} from "lucide-react";
import type { ServiceType } from "@/types";

const services = [
  {
    type: "website-webapp" as ServiceType,
    label: "Website / Web App",
    icon: Globe,
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.08)",
    border: "rgba(79,70,229,0.2)",
    description: "Landing pages, web apps, portals, dashboards",
  },
  {
    type: "custom-simulator" as ServiceType,
    label: "Custom Simulator",
    icon: Cpu,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.2)",
    description: "Interactive educational or research simulation software",
  },
  {
    type: "pcb-designing" as ServiceType,
    label: "PCB Designing",
    icon: CircuitBoard,
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
    border: "rgba(8,145,178,0.2)",
    description: "Schematic capture, PCB layout, manufacturing files",
  },
  {
    type: "robotics-embedded" as ServiceType,
    label: "Robotics / Embedded",
    icon: Bot,
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.2)",
    description: "Robot prototypes, firmware, embedded systems",
  },
  {
    type: "custom-software" as ServiceType,
    label: "Custom Software",
    icon: Code2,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.2)",
    description: "Desktop tools, automation, API integrations",
  },
  {
    type: "research-publication" as ServiceType,
    label: "Research Support",
    icon: BookOpen,
    color: "#e11d48",
    bg: "rgba(225,29,72,0.08)",
    border: "rgba(225,29,72,0.2)",
    description: "Research guidance and publication-process support",
  },
  {
    type: "student-project" as ServiceType,
    label: "Student Project",
    icon: GraduationCap,
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
    border: "rgba(8,145,178,0.2)",
    description: "Final-year and academic project support",
  },
  {
    type: "mentorship" as ServiceType,
    label: "Live Mentorship",
    icon: Users,
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.08)",
    border: "rgba(79,70,229,0.2)",
    description: "1-on-1 mentoring, live project guidance",
  },
  {
    type: "other" as ServiceType,
    label: "Other",
    icon: HelpCircle,
    color: "#6b7280",
    bg: "rgba(107,114,128,0.06)",
    border: "rgba(107,114,128,0.15)",
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
        className="font-bold mb-1.5"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.6rem",
          color: "var(--nera-text-primary)",
        }}
      >
        What do you want to build?
      </h2>
      <p className="text-sm mb-8" style={{ color: "var(--nera-text-secondary)" }}>
        Choose a service — we&apos;ll ask the right questions from there.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          const isSelected = selected === svc.type;

          return (
            <motion.button
              key={svc.type}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              onClick={() => onSelect(svc.type)}
              className="text-left rounded-xl border transition-all duration-200 group"
              style={{
                padding: "14px 16px",
                background: isSelected ? svc.bg : "var(--nera-surface-page)",
                borderColor: isSelected ? svc.border : "rgba(0,0,0,0.07)",
                boxShadow: isSelected ? `0 0 0 2px ${svc.color}18, 0 4px 20px rgba(0,0,0,0.06)` : "none",
              }}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all"
                  style={{
                    background: isSelected ? svc.bg : "rgba(0,0,0,0.04)",
                    border: `1px solid ${isSelected ? svc.color + "30" : "transparent"}`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: isSelected ? svc.color : "var(--nera-text-muted)" }} />
                </div>

                <div className="min-w-0">
                  <div
                    className="font-semibold text-sm leading-tight"
                    style={{
                      color: isSelected ? svc.color : "var(--nera-text-primary)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {svc.label}
                  </div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: "var(--nera-text-muted)" }}>
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
