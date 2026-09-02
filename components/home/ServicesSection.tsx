"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Cpu, CircuitBoard, Bot, Code2, BookOpen, GraduationCap, Users } from "lucide-react";

const services = [
  { label: "Website / Web App", icon: Globe, color: "#4f46e5", href: "/services" },
  { label: "Custom Simulator", icon: Cpu, color: "#7c3aed", href: "/services" },
  { label: "PCB Designing", icon: CircuitBoard, color: "#0891b2", href: "/services" },
  { label: "Robotics & Embedded", icon: Bot, color: "#d97706", href: "/services" },
  { label: "Custom Software", icon: Code2, color: "#4f46e5", href: "/services" },
  { label: "Research Support", icon: BookOpen, color: "#059669", href: "/services" },
  { label: "Student Projects", icon: GraduationCap, color: "#0891b2", href: "/services" },
  { label: "Mentorship", icon: Users, color: "#7c3aed", href: "/services" },
];

export default function ServicesSection() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "white" }}
    >
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(79,70,229,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--nera-accent-primary)", fontFamily: "var(--font-mono)" }}
            >
              What NERA Builds
            </p>
            <h2
              className="font-bold mb-5 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "var(--nera-text-primary)",
              }}
            >
              What do you want to build?
            </h2>
            <p
              className="text-base leading-relaxed mb-9"
              style={{ color: "var(--nera-text-secondary)", maxWidth: "38ch" }}
            >
              From a custom simulator to a robotics prototype — NERA takes your idea from conversation to working reality.
              No intermediaries, no bloated process.
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--nera-accent-primary)",
                boxShadow: "var(--shadow-indigo)",
              }}
            >
              Start a Project with NERA
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: service grid — ALL link to /services (same as before) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="grid grid-cols-2 gap-2.5">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.div
                    key={svc.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
                  >
                    <Link
                      href={svc.href}
                      className="flex items-center gap-3 p-3.5 rounded-xl border group transition-all duration-200"
                      style={{
                        borderColor: "rgba(0,0,0,0.055)",
                        background: "var(--nera-surface-page)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${svc.color}30`;
                        e.currentTarget.style.background = `${svc.color}06`;
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "var(--shadow-lifted)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(0,0,0,0.055)";
                        e.currentTarget.style.background = "var(--nera-surface-page)";
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: `${svc.color}10`,
                          border: `1px solid ${svc.color}20`,
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: svc.color }} />
                      </div>
                      <span
                        className="text-xs font-semibold leading-snug"
                        style={{ color: "var(--nera-text-primary)", fontFamily: "var(--font-display)" }}
                      >
                        {svc.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
