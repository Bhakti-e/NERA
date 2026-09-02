"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Cpu, Bot, CircuitBoard, Code2, FolderOpen, BookOpen, GraduationCap, ArrowRight,
} from "lucide-react";

const domains = [
  {
    id: "simulators", label: "Simulators", icon: Cpu, color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)",
    tag: "Interactive Software",
    description: "Simulation software for electronics, robotics, logic, and networking — built for students, educators, and researchers.",
    detail: "Each simulator is a hands-on environment, not a passive animation. Rotate, probe, modify, observe.",
    href: "/simulators",
  },
  {
    id: "robotics", label: "Robotics", icon: Bot, color: "#d97706",
    bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.2)",
    tag: "R&D Lab",
    description: "Microrobotics, biomimetic prototypes, and embedded systems. From concept to working hardware.",
    detail: "Mechanical design, firmware, gait algorithms, sensor fusion — NERA works across the full stack.",
    href: "/#robotics",
  },
  {
    id: "pcb", label: "PCB & Embedded", icon: CircuitBoard, color: "#0891b2",
    bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.2)",
    tag: "Electronics",
    description: "Custom PCB design, schematic capture, and firmware development for research and commercial builds.",
    detail: "Multi-layer boards, high-speed layouts, RF design, and manufacturing-ready deliverables.",
    href: "/pcb-lab",
  },
  {
    id: "software", label: "Software", icon: Code2, color: "#4f46e5",
    bg: "rgba(79,70,229,0.08)", border: "rgba(79,70,229,0.2)",
    tag: "Custom Development",
    description: "Websites, web apps, desktop tools, and backend systems for institutions, startups, and labs.",
    detail: "Full-stack development from architecture to deployment, tailored to the project's actual requirements.",
    href: "/services",
  },
  {
    id: "projects", label: "Projects", icon: FolderOpen, color: "#059669",
    bg: "rgba(5,150,105,0.08)", border: "rgba(5,150,105,0.2)",
    tag: "Academic & Live",
    description: "Student final-year projects, live project mentorship, and collaborative R&D builds.",
    detail: "NERA helps students and early engineers move from assignment to real working prototype.",
    href: "/services",
  },
  {
    id: "research", label: "Research", icon: BookOpen, color: "#e11d48",
    bg: "rgba(225,29,72,0.08)", border: "rgba(225,29,72,0.2)",
    tag: "Guidance & Publication",
    description: "Research guidance and publication-process support across engineering and computer science.",
    detail: "Methodology advice, paper structuring, journal selection, and submission process support.",
    href: "/services",
  },
  {
    id: "learning", label: "Learning", icon: GraduationCap, color: "#0891b2",
    bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.2)",
    tag: "Interactive Education",
    description: "PCB circuit exploration, logic gate simulators, and interactive experiences that make technology tangible.",
    detail: "Learning by doing. Not videos. Not PDFs. Actual interactive environments.",
    href: "/pcb-lab",
  },
];

export default function ExploreSection() {
  const [active, setActive] = useState<string | null>(null);
  const activeDomain = domains.find((d) => d.id === active);

  return (
    <section
      id="explore"
      className="py-28 relative overflow-hidden"
      style={{ background: "var(--nera-surface-page)" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 nera-grid-bg opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--nera-accent-primary)", fontFamily: "var(--font-mono)" }}
          >
            Technology Domains
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)", lineHeight: 1.1 }}
            >
              What NERA builds.
            </h2>
            <p className="max-w-xs text-sm" style={{ color: "var(--nera-text-muted)" }}>
              Seven domains. One team. Click any area to explore.
            </p>
          </div>
        </motion.div>

        {/* Desktop: 2-column map layout */}
        <div className="hidden lg:grid grid-cols-3 gap-3">
          {/* Left column: 4 domains */}
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {domains.slice(0, 4).map((domain, i) => (
              <DomainTile key={domain.id} domain={domain} index={i} active={active} setActive={setActive} />
            ))}
          </div>
          {/* Right column: detail panel + 3 smaller */}
          <div className="flex flex-col gap-3">
            {/* Detail panel */}
            <div
              className="flex-1 rounded-2xl border p-6 flex flex-col justify-between min-h-48 transition-all duration-300"
              style={{
                background: activeDomain ? `${activeDomain.color}08` : "rgba(0,0,0,0.02)",
                borderColor: activeDomain ? `${activeDomain.color}30` : "rgba(0,0,0,0.06)",
              }}
            >
              <AnimatePresence mode="wait">
                {activeDomain ? (
                  <motion.div
                    key={activeDomain.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${activeDomain.color}15`, border: `1px solid ${activeDomain.color}30` }}
                      >
                        <activeDomain.icon className="w-3.5 h-3.5" style={{ color: activeDomain.color }} />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: activeDomain.color, fontFamily: "var(--font-mono)" }}>
                        {activeDomain.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}>
                      {activeDomain.label}
                    </h3>
                    <p className="text-sm leading-relaxed mb-3 flex-1" style={{ color: "var(--nera-text-secondary)" }}>
                      {activeDomain.detail}
                    </p>
                    <Link
                      href={activeDomain.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors group"
                      style={{ color: activeDomain.color }}
                    >
                      Explore {activeDomain.label}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-4"
                  >
                    <div className="w-10 h-10 rounded-full border border-dashed mb-3 flex items-center justify-center"
                      style={{ borderColor: "rgba(0,0,0,0.12)" }}>
                      <ArrowRight className="w-4 h-4" style={{ color: "var(--nera-text-muted)" }} />
                    </div>
                    <p className="text-xs" style={{ color: "var(--nera-text-muted)" }}>
                      Hover or click a domain to learn more
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Bottom 3 small tiles */}
            {domains.slice(4).map((domain, i) => (
              <DomainTile key={domain.id} domain={domain} index={i + 4} active={active} setActive={setActive} compact />
            ))}
          </div>
        </div>

        {/* Mobile: stacked tiles */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
          {domains.map((domain, i) => (
            <DomainTile key={domain.id} domain={domain} index={i} active={active} setActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DomainTile({
  domain, index, active, setActive, compact = false,
}: {
  domain: typeof domains[0];
  index: number;
  active: string | null;
  setActive: (id: string | null) => void;
  compact?: boolean;
}) {
  const Icon = domain.icon;
  const isActive = active === domain.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <button
        className="w-full text-left rounded-2xl border transition-all duration-250 group"
        style={{
          background: isActive ? domain.bg : "var(--nera-surface-card)",
          borderColor: isActive ? domain.border : "rgba(0,0,0,0.055)",
          boxShadow: isActive ? `0 0 0 2px ${domain.color}18, var(--shadow-lifted)` : "var(--shadow-card)",
          padding: compact ? "12px 14px" : "18px 20px",
        }}
        onClick={() => setActive(isActive ? null : domain.id)}
        onMouseEnter={() => setActive(domain.id)}
        onMouseLeave={() => setActive(null)}
        aria-expanded={isActive}
      >
        <div className={compact ? "flex items-center gap-2.5" : ""}>
          {/* Icon */}
          <div
            className={`flex items-center justify-center rounded-xl transition-all ${compact ? "w-7 h-7 shrink-0" : "w-10 h-10 mb-3"}`}
            style={{ background: domain.bg, border: `1px solid ${domain.border}` }}
          >
            <Icon className={compact ? "w-3.5 h-3.5" : "w-5 h-5"} style={{ color: domain.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className={`font-semibold flex items-center justify-between gap-2 ${compact ? "text-sm" : "text-sm mb-1"}`}
              style={{ color: "var(--nera-text-primary)", fontFamily: "var(--font-display)" }}>
              <span>{domain.label}</span>
              <ArrowRight
                className="w-3.5 h-3.5 shrink-0 transition-all"
                style={{
                  color: domain.color,
                  opacity: isActive ? 1 : 0.3,
                  transform: isActive ? "translateX(2px)" : "none",
                }}
              />
            </div>
            {!compact && (
              <p className="text-xs leading-relaxed" style={{ color: "var(--nera-text-muted)" }}>
                {domain.tag}
              </p>
            )}
          </div>
        </div>

        {/* Mobile expand */}
        <AnimatePresence>
          {isActive && !compact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden lg:hidden"
            >
              <p className="text-xs leading-relaxed mt-3 mb-2" style={{ color: "var(--nera-text-secondary)" }}>
                {domain.description}
              </p>
              <Link
                href={domain.href}
                className="inline-flex items-center gap-1 text-xs font-semibold"
                style={{ color: domain.color }}
                onClick={(e) => e.stopPropagation()}
              >
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
