"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center"
      style={{ background: "var(--nera-surface-mid)" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "var(--nera-accent-primary)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "rgba(167,163,255,0.8)" }}
        >
          New Embark Robotic Age
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--nera-text-on-dark)",
          }}
        >
          Ready to embark?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg mb-10"
          style={{ color: "var(--nera-text-on-dark-muted)" }}
        >
          Explore our simulators, open the PCB Lab, or tell us what you want to build.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/#explore"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
            style={{ background: "var(--nera-accent-primary)" }}
          >
            Explore NERA
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:scale-105"
            style={{
              borderColor: "rgba(255,255,255,0.2)",
              color: "var(--nera-text-on-dark)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            Get NERA Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
