"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Cpu, Bot, Layers } from "lucide-react";
import type { RoboticsProject } from "@/types";

const statusConfig = {
  research:  { label: "Research",  color: "#7c3aed", bg: "rgba(124,58,237,0.12)", bar: "#7c3aed" },
  prototype: { label: "Prototype", color: "#0891b2", bg: "rgba(8,145,178,0.12)",  bar: "#0891b2" },
  active:    { label: "Active",    color: "#059669", bg: "rgba(5,150,105,0.12)",  bar: "#059669" },
  completed: { label: "Completed", color: "#6b7280", bg: "rgba(107,114,128,0.12)", bar: "#9ca3af" },
};

const categoryIcons: Record<string, React.ElementType> = {
  Microrobotics:       Cpu,
  "Biomimetic Robotics": Bot,
  "Embedded Systems":  Activity,
  "Robotic Prototypes": Layers,
};

export default function RoboticsSection({ projects }: { projects: RoboticsProject[] }) {
  return (
    <section
      id="robotics"
      className="py-28 relative overflow-hidden"
      style={{ background: "var(--nera-surface-navy)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 nera-grid-bg-navy pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14"
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--nera-accent-amber)", fontFamily: "var(--font-mono)" }}
            >
              NERA R&amp;D Lab
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)", lineHeight: 1.1 }}
            >
              Robotics &amp; Prototypes
            </h2>
          </div>
          <Link
            href="/services?service=robotics-embedded"
            className="group inline-flex items-center gap-2 text-sm font-semibold shrink-0 transition-colors"
            style={{ color: "var(--nera-accent-amber)" }}
          >
            Start a robotics project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Projects — bento-style layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, i) => {
            const status = statusConfig[project.status];
            const Icon = categoryIcons[project.category] ?? Bot;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="group relative rounded-2xl border flex flex-col overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(217,119,6,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                {/* Top accent bar */}
                <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${status.bar}60, transparent)` }} />

                {/* Image placeholder — will hold real photos */}
                <div
                  className="h-32 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, rgba(217,119,6,0.05) 0%, rgba(217,119,6,0.10) 100%)`,
                  }}
                >
                  <Icon className="w-10 h-10" style={{ color: "rgba(217,119,6,0.3)" }} />
                  <div
                    className="absolute bottom-2 right-2 w-6 h-6 rounded flex items-center justify-center"
                    style={{ background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.2)" }}
                  >
                    <Icon className="w-3 h-3" style={{ color: "var(--nera-accent-amber)" }} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col">
                  {/* Status pill */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold self-start mb-3"
                    style={{ background: status.bg, color: status.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
                    {status.label}
                  </div>

                  <h3
                    className="font-bold text-sm mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)" }}
                  >
                    {project.name}
                  </h3>

                  <p
                    className="text-xs leading-relaxed flex-1 mb-3"
                    style={{ color: "var(--nera-text-on-dark-muted)", lineHeight: 1.6 }}
                  >
                    {project.description}
                  </p>

                  {/* Category + tags */}
                  <div className="flex flex-wrap gap-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(217,119,6,0.08)",
                        color: "rgba(217,119,6,0.8)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.63rem",
                        border: "1px solid rgba(217,119,6,0.15)",
                      }}
                    >
                      {project.category}
                    </span>
                    {project.tags.slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "var(--nera-text-on-dark-muted)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.63rem",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-sm" style={{ color: "var(--nera-text-on-dark-muted)" }}>
            Real photographs and detailed project records will be published as builds progress.
          </p>
          <Link
            href="/services"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: "rgba(217,119,6,0.15)",
              border: "1px solid rgba(217,119,6,0.3)",
              color: "var(--nera-accent-amber)",
            }}
          >
            Collaborate with NERA
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
