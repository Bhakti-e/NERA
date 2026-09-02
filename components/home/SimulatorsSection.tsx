"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Monitor } from "lucide-react";
import type { Simulator } from "@/types";

const statusConfig = {
  available: { label: "Available", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  beta: { label: "Beta", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  "coming-soon": { label: "Coming Soon", color: "#9999aa", bg: "rgba(153,153,170,0.1)" },
};

function SimulatorCard({ sim, index }: { sim: Simulator; index: number }) {
  const status = statusConfig[sim.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl border border-black/6 overflow-hidden hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
    >
      {/* Thumbnail */}
      <div
        className="h-40 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(79,70,229,0.08), rgba(124,58,237,0.12))`,
        }}
      >
        <Monitor className="w-12 h-12" style={{ color: "rgba(79,70,229,0.3)" }} />
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-semibold text-base leading-snug"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
          >
            {sim.name}
          </h3>
          <span
            className="shrink-0 text-xs px-2 py-0.5 rounded-full border"
            style={{
              borderColor: "rgba(0,0,0,0.06)",
              color: "var(--nera-text-muted)",
            }}
          >
            {sim.category}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "var(--nera-text-secondary)" }}
        >
          {sim.shortDescription}
        </p>

        {/* Platform tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {sim.platform.map((p) => (
            <span
              key={p}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(79,70,229,0.07)",
                color: "var(--nera-accent-primary)",
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/simulators/${sim.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border border-black/8 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
            style={{ color: "var(--nera-text-secondary)" }}
          >
            Explore
            <ArrowRight className="w-3 h-3" />
          </Link>
          {sim.prototypeUrl ? (
            <a
              href={sim.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--nera-accent-primary)" }}
            >
              Try Prototype
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <Link
              href="/services?service=custom-simulator"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border transition-all"
              style={{
                borderColor: "rgba(79,70,229,0.2)",
                color: "var(--nera-accent-primary)",
              }}
            >
              Get Licence
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SimulatorsSection({ simulators }: { simulators: Simulator[] }) {
  return (
    <section
      id="simulators"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--nera-surface-page)" }}
    >
      <div className="max-w-7xl mx-auto">
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
              style={{ color: "var(--nera-accent-violet)" }}
            >
              NERA Simulators
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
            >
              Interactive Software
            </h2>
          </div>
          <Link
            href="/simulators"
            className="group flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: "var(--nera-accent-primary)" }}
          >
            View All Simulators
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulators.map((sim, i) => (
            <SimulatorCard key={sim.id} sim={sim} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
