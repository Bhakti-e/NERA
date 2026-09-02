"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--nera-surface-mid)" }}
    >
      {/* Engineering background */}
      <div className="absolute inset-0 nera-grid-bg opacity-25 pointer-events-none" />

      {/* Indigo radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(79,70,229,0.12)" }}
      />

      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.3), transparent)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        {/* Probe reaches destination */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8 flex justify-center"
          aria-hidden="true"
        >
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(79,70,229,0.15)",
                border: "1px solid rgba(79,70,229,0.3)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5"
                  fill="rgba(79,70,229,0.2)" stroke="#4f46e5" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="5" fill="rgba(79,70,229,0.4)" />
                <circle cx="16" cy="16" r="2.5" fill="#4f46e5" />
                <circle cx="16" cy="3" r="1.5" fill="#06b6d4">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            {/* Pulse rings */}
            <div
              className="absolute inset-0 rounded-2xl border pulse-ring"
              style={{ borderColor: "rgba(79,70,229,0.3)" }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "rgba(167,163,255,0.7)", fontFamily: "var(--font-mono)" }}
        >
          New Embark Robotic Age
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-bold mb-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
            color: "var(--nera-text-on-dark)",
            lineHeight: 1.08,
          }}
        >
          Ready to embark?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-base mb-10"
          style={{ color: "var(--nera-text-on-dark-muted)", maxWidth: "44ch", margin: "0 auto 2.5rem" }}
        >
          Explore our simulators, open the PCB Lab, or tell us what you want to build.
          The next step is just a message away.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.26 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {/* Primary — same href */}
          <Link
            href="/#explore"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--nera-accent-primary)",
              boxShadow: "0 4px 24px rgba(79,70,229,0.3)",
            }}
          >
            Explore NERA
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary — same href */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: "rgba(255,255,255,0.14)",
              color: "rgba(237,237,245,0.85)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
