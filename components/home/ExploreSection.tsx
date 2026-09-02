"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Cpu,
  Bot,
  CircuitBoard,
  Code2,
  FolderOpen,
  BookOpen,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const domains = [
  {
    id: "simulators",
    label: "Simulators",
    icon: Cpu,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    description:
      "Interactive simulation software for electronics, robotics, logic, and networking — built for students, educators, and researchers.",
    href: "/simulators",
  },
  {
    id: "robotics",
    label: "Robotics",
    icon: Bot,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    description:
      "Microrobotics, biomimetic prototypes, and embedded systems R&D. From concept to working prototype.",
    href: "/#robotics",
  },
  {
    id: "pcb",
    label: "PCB & Embedded",
    icon: CircuitBoard,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    description:
      "Custom PCB design, schematic capture, and embedded firmware development for research and commercial applications.",
    href: "/pcb-lab",
  },
  {
    id: "software",
    label: "Software",
    icon: Code2,
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.08)",
    description:
      "Websites, web apps, desktop tools, and custom software for institutions, startups, and research groups.",
    href: "/services",
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderOpen,
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    description:
      "Student final-year projects, live project mentorship, and collaborative R&D builds.",
    href: "/services",
  },
  {
    id: "research",
    label: "Research",
    icon: BookOpen,
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.08)",
    description:
      "Research guidance and publication-process support across engineering, robotics, and computer science domains.",
    href: "/services",
  },
  {
    id: "learning",
    label: "Learning",
    icon: GraduationCap,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    description:
      "Interactive learning experiences — from PCB circuit exploration to logic gate simulations — that make technology tangible.",
    href: "/pcb-lab",
  },
];

export default function ExploreSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="explore"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--nera-surface-page)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--nera-accent-primary)" }}
          >
            What NERA Does
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--nera-text-primary)",
            }}
          >
            Explore NERA
          </h2>
          <p
            className="max-w-xl mx-auto text-lg"
            style={{ color: "var(--nera-text-secondary)" }}
          >
            Seven technology domains. One team. Built to make ideas real.
          </p>
        </motion.div>

        {/* Domain grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {domains.map((domain, i) => {
            const Icon = domain.icon;
            const isActive = active === domain.id;

            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <button
                  className="w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer group"
                  style={{
                    background: isActive ? domain.bg : "var(--nera-surface-card)",
                    borderColor: isActive
                      ? domain.color + "40"
                      : "rgba(0,0,0,0.06)",
                    boxShadow: isActive
                      ? `0 0 0 2px ${domain.color}20, 0 8px 24px rgba(0,0,0,0.08)`
                      : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onClick={() => setActive(isActive ? null : domain.id)}
                  aria-expanded={isActive}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all"
                    style={{
                      background: domain.bg,
                      border: `1px solid ${domain.color}25`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: domain.color }}
                    />
                  </div>

                  {/* Label */}
                  <div className="font-semibold text-sm mb-1 flex items-center justify-between"
                    style={{ color: "var(--nera-text-primary)", fontFamily: "var(--font-display)" }}>
                    {domain.label}
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      style={{ color: domain.color, opacity: isActive ? 1 : 0.5 }}
                    />
                  </div>

                  {/* Description (expandable) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-xs leading-relaxed mt-2 mb-3"
                          style={{ color: "var(--nera-text-secondary)" }}
                        >
                          {domain.description}
                        </p>
                        <Link
                          href={domain.href}
                          className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:underline"
                          style={{ color: domain.color }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Explore
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Short hint when collapsed */}
                  {!isActive && (
                    <p
                      className="text-xs line-clamp-1 mt-0.5"
                      style={{ color: "var(--nera-text-muted)" }}
                    >
                      {domain.description.split("—")[0].trim()}
                    </p>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
