"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Cpu, Bot } from "lucide-react";
import type { RoboticsProject } from "@/types";

const statusColors = {
  research: { label: "Research", color: "#7c3aed", bg: "rgba(124,58,237,0.12)" },
  prototype: { label: "Prototype", color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
  active: { label: "Active", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  completed: { label: "Completed", color: "#9999aa", bg: "rgba(153,153,170,0.12)" },
};

const categoryIcons: Record<string, React.ElementType> = {
  Microrobotics: Cpu,
  "Biomimetic Robotics": Bot,
  "Embedded Systems": Activity,
  "Robotic Prototypes": Bot,
};

export default function RoboticsSection({ projects }: { projects: RoboticsProject[] }) {
  return (
    <section
      id="robotics"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: "var(--nera-surface-mid)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(245,158,11,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(124,58,237,0.8) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--nera-accent-amber)" }}
            >
              NERA R&D Lab
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)" }}
            >
              Robotics & Research
            </h2>
          </div>
          <Link
            href="/services?service=robotics-embedded"
            className="group flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: "var(--nera-accent-amber)" }}
          >
            Work With Us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, i) => {
            const status = statusColors[project.status];
            const Icon = categoryIcons[project.category] ?? Bot;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border p-5 group hover:border-amber-400/30 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                {/* Category icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--nera-accent-amber)" }} />
                </div>

                {/* Status */}
                <div
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-3"
                  style={{ background: status.bg, color: status.color }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: status.color }}
                  />
                  {status.label}
                </div>

                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)" }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-3 line-clamp-3"
                  style={{ color: "var(--nera-text-on-dark-muted)" }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(245,158,11,0.08)",
                        color: "rgba(245,158,11,0.7)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p
            className="text-sm mb-4"
            style={{ color: "var(--nera-text-on-dark-muted)" }}
          >
            Interested in robotics R&D collaboration or prototype development?
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            style={{
              background: "var(--nera-accent-amber)",
              color: "#0d0d16",
            }}
          >
            Discuss a Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
