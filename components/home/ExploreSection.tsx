"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Bot, CircuitBoard, Code2, FolderOpen, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const areas = [
  { id: "simulators", label: "Simulators",     icon: Cpu,          color: "#7c3aed", href: "/simulators", desc: "Interactive simulation software for electronics, robotics, logic, and more" },
  { id: "robotics",   label: "Robotics",        icon: Bot,          color: "#d97706", href: "/robotics",   desc: "Microrobotics, biomimetic prototypes, embedded systems R&D" },
  { id: "pcb",        label: "PCB & Embedded",  icon: CircuitBoard, color: "#0891b2", href: "/pcb-lab",    desc: "Custom PCB design, schematic capture, and firmware development" },
  { id: "software",   label: "Software",        icon: Code2,        color: "#4f46e5", href: "/services",   desc: "Web apps, desktop tools, and custom software systems" },
  { id: "projects",   label: "Projects",        icon: FolderOpen,   color: "#059669", href: "/projects",   desc: "Student final-year projects, live builds, and R&D collaborations" },
  { id: "research",   label: "Research",        icon: BookOpen,     color: "#e11d48", href: "/research",   desc: "Research guidance and publication-process support" },
  { id: "learning",   label: "Learning",        icon: GraduationCap,color: "#0891b2", href: "/learn",      desc: "Mentorship, interactive experiences, and hands-on technology education" },
];

export default function ExploreSection() {
  return (
    <section
      id="explore"
      className="py-24 relative"
      style={{ background: "#ffffff" }}
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--c-blue)", fontFamily: "var(--f-mono)" }}>
            Technology Domains
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: "var(--f-display)", color: "var(--t-primary)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Explore NERA
            </h2>
            <p className="text-sm max-w-xs" style={{ color: "var(--t-muted)" }}>
              Seven domains. Click any area to enter.
            </p>
          </div>
        </motion.div>

        {/* Area grid — click → dedicated page, same tab */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={area.href}
                  className="group flex flex-col p-5 rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    borderColor: "rgba(0,0,0,0.06)",
                    boxShadow: "var(--sh-card)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${area.color}12`, border: `1.5px solid ${area.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: area.color }} />
                  </div>
                  <div
                    className="font-semibold text-sm mb-1.5 flex items-center justify-between"
                    style={{ fontFamily: "var(--f-display)", color: "var(--t-primary)" }}
                  >
                    {area.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5"
                      style={{ color: area.color }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--t-muted)" }}>
                    {area.desc}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
