"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Bot, CircuitBoard, Code2, FolderOpen, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const areas = [
  { id: "simulators", label: "Simulators",    icon: Cpu,           color: "#7c3aed", href: "/simulators", desc: "Interactive simulation software for electronics, robotics, logic, and networking.", tag: "Software" },
  { id: "robotics",   label: "Robotics",       icon: Bot,           color: "#d97706", href: "/robotics",   desc: "Microrobotics, biomimetic prototypes, and embedded systems R&D.", tag: "R&D Lab" },
  { id: "pcb",        label: "PCB & Embedded", icon: CircuitBoard,  color: "#06b6d4", href: "/pcb-lab",    desc: "Custom PCB design, schematic capture, and firmware development.", tag: "Electronics" },
  { id: "software",   label: "Software",       icon: Code2,         color: "#4f46e5", href: "/services",   desc: "Web apps, desktop tools, and custom software systems.", tag: "Development" },
  { id: "projects",   label: "Projects",       icon: FolderOpen,    color: "#10b981", href: "/projects",   desc: "Student final-year projects, live builds, and R&D collaborations.", tag: "Academic" },
  { id: "research",   label: "Research",       icon: BookOpen,      color: "#f43f5e", href: "/research",   desc: "Research guidance and publication-process support.", tag: "Academic" },
  { id: "learning",   label: "Learning",       icon: GraduationCap, color: "#06b6d4", href: "/learn",      desc: "Mentorship, interactive experiences, and hands-on technology education.", tag: "Education" },
];

export default function ExploreSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="explore" className="py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Top connector from hero */}
      <div className="absolute top-0 left-0 right-0 sep-line" />

      <div className="relative z-10 nera-wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--cyan)", fontFamily: "var(--f-mono)" }}>
            Technology Domains
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-bold"
              style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2rem,4.5vw,3rem)", color: "var(--tx)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Explore NERA
            </h2>
            <p className="text-sm max-w-xs" style={{ color: "var(--tx-3)" }}>
              Seven domains. Click any area to enter.
            </p>
          </div>
        </motion.div>

        {/* Node map — desktop 2-col, mobile stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {areas.map((area, i) => {
            const Icon = area.icon;
            const isHovered = hovered === area.id;

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={area.href}
                  className="group flex flex-col p-5 rounded-2xl border transition-all duration-250 relative overflow-hidden"
                  style={{
                    background: isHovered ? `${area.color}10` : "var(--bg-3)",
                    borderColor: isHovered ? `${area.color}40` : "var(--border)",
                    boxShadow: isHovered ? `0 0 32px ${area.color}18, var(--sh-card)` : "var(--sh-card)",
                    minHeight: 160,
                  }}
                  onMouseEnter={() => setHovered(area.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Glow spot on hover */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
                    style={{
                      background: area.color,
                      opacity: isHovered ? 0.08 : 0,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-200"
                    style={{
                      background: isHovered ? `${area.color}20` : `${area.color}10`,
                      border: `1.5px solid ${area.color}${isHovered ? "45" : "25"}`,
                      boxShadow: isHovered ? `0 0 16px ${area.color}30` : "none",
                    }}
                  >
                    <Icon
                      className="w-5 h-5 transition-transform duration-200"
                      style={{
                        color: area.color,
                        transform: isHovered ? "scale(1.15)" : "scale(1)",
                      }}
                    />
                  </div>

                  {/* Tag */}
                  <span className="text-xs mb-1"
                    style={{ color: area.color, fontFamily: "var(--f-mono)", fontSize: "0.6rem", opacity: 0.8 }}>
                    {area.tag}
                  </span>

                  {/* Label */}
                  <div className="font-semibold text-sm mb-2 flex items-center justify-between"
                    style={{ fontFamily: "var(--f-display)", color: "var(--tx)" }}>
                    {area.label}
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-all duration-200"
                      style={{
                        color: area.color,
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateX(2px)" : "translateX(-4px)",
                      }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--tx-3)" }}>
                    {area.desc}
                  </p>

                  {/* Bottom circuit line on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                        style={{ background: `linear-gradient(90deg, ${area.color}, transparent)` }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 sep-line" />
    </section>
  );
}
