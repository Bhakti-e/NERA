"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Simulator } from "@/types";

const statusConfig = {
  available: { label: "Available", color: "#059669", bg: "rgba(5,150,105,0.1)", dot: "#10b981" },
  beta: { label: "Beta", color: "#d97706", bg: "rgba(217,119,6,0.1)", dot: "#f59e0b" },
  "coming-soon": { label: "Coming Soon", color: "#6b7280", bg: "rgba(107,114,128,0.1)", dot: "#9ca3af" },
};

/* Per-category visual identity */
const categoryStyle: Record<string, { color: string; pattern: string }> = {
  Electronics: { color: "#0891b2", pattern: "circuit" },
  Robotics:    { color: "#d97706", pattern: "grid" },
  "Digital Logic": { color: "#7c3aed", pattern: "logic" },
  Networking:  { color: "#4f46e5", pattern: "network" },
};

function SimulatorPreviewArea({ category }: { category: string }) {
  const style = categoryStyle[category] ?? { color: "#4f46e5", pattern: "grid" };

  return (
    <div
      className="w-full h-44 flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${style.color}0a 0%, ${style.color}16 100%)`,
      }}
    >
      {/* Pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
        <defs>
          <pattern id={`pat-${category}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 L0 0 0 24" fill="none" stroke={style.color} strokeWidth="0.4" opacity="0.5" />
            <circle cx="0" cy="0" r="1.5" fill={style.color} opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pat-${category})`} />
      </svg>

      {/* Stylised abstract representation */}
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none" aria-hidden="true">
        {style.pattern === "circuit" && (
          <>
            <rect x="28" y="20" width="24" height="20" rx="3" fill={`${style.color}20`} stroke={style.color} strokeWidth="1.5" />
            <path d="M 4 30 H 28 M 52 30 H 76 M 40 0 V 20 M 40 40 V 60" stroke={`${style.color}80`} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="30" r="2.5" fill={style.color} />
            <circle cx="52" cy="30" r="2.5" fill={style.color} />
          </>
        )}
        {style.pattern === "logic" && (
          <>
            <rect x="22" y="18" width="28" height="24" rx="3" fill={`${style.color}15`} stroke={style.color} strokeWidth="1.5" />
            <line x1="4" y1="25" x2="22" y2="25" stroke={`${style.color}80`} strokeWidth="1.5" />
            <line x1="4" y1="35" x2="22" y2="35" stroke={`${style.color}80`} strokeWidth="1.5" />
            <line x1="50" y1="30" x2="76" y2="30" stroke={`${style.color}80`} strokeWidth="1.5" />
            <text x="36" y="33" textAnchor="middle" fill={style.color} fontSize="10" fontFamily="monospace" fontWeight="bold">&amp;</text>
          </>
        )}
        {(style.pattern === "grid" || style.pattern === "network") && (
          <>
            <circle cx="40" cy="30" r="10" fill={`${style.color}15`} stroke={style.color} strokeWidth="1.5" />
            {[0, 72, 144, 216, 288].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = 40 + Math.cos(rad) * 22;
              const y = 30 + Math.sin(rad) * 22;
              return (
                <g key={angle}>
                  <line x1="40" y1="30" x2={x} y2={y} stroke={`${style.color}50`} strokeWidth="1" />
                  <circle cx={x} cy={y} r="3" fill={`${style.color}30`} stroke={style.color} strokeWidth="1" />
                </g>
              );
            })}
          </>
        )}
      </svg>

      {/* Category label - floating */}
      <span
        className="absolute bottom-3 right-3 text-xs px-2 py-0.5 rounded-md font-medium"
        style={{
          color: style.color,
          background: `${style.color}12`,
          border: `1px solid ${style.color}25`,
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
        }}
      >
        {category}
      </span>
    </div>
  );
}

function SimulatorCard({ sim, index }: { sim: Simulator; index: number }) {
  const status = statusConfig[sim.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: "rgba(0,0,0,0.055)",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-lifted)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
    >
      {/* Preview */}
      <SimulatorPreviewArea category={sim.category} />

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Status + version */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: status.bg, color: status.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
            {status.label}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--nera-text-muted)", fontFamily: "var(--font-mono)" }}
          >
            v{sim.version}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-base mb-2 leading-snug"
          style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
        >
          {sim.name}
        </h3>

        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--nera-text-secondary)", lineHeight: 1.55 }}>
          {sim.shortDescription}
        </p>

        {/* Platform chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {sim.platform.map((p) => (
            <span
              key={p}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(79,70,229,0.06)",
                color: "var(--nera-accent-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Actions — SAME logic, improved presentation */}
        <div className="flex items-center gap-2 mt-auto">
          <Link
            href={`/simulators/${sim.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50/60 hover:text-indigo-600"
            style={{
              borderColor: "rgba(0,0,0,0.08)",
              color: "var(--nera-text-secondary)",
            }}
          >
            View Details
            <ArrowRight className="w-3 h-3" />
          </Link>

          {sim.prototypeUrl ? (
            <a
              href={sim.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "var(--nera-accent-primary)" }}
            >
              Try Prototype
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <Link
              href="/services?service=custom-simulator"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 hover:bg-indigo-50/60"
              style={{
                borderColor: "rgba(79,70,229,0.22)",
                color: "var(--nera-accent-primary)",
              }}
            >
              Get Licence
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function SimulatorsSection({ simulators }: { simulators: Simulator[] }) {
  return (
    <section id="simulators" className="py-28 relative overflow-hidden" style={{ background: "var(--nera-surface-tint)" }}>
      <div className="absolute inset-0 nera-grid-bg-light pointer-events-none opacity-70" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
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
              style={{ color: "var(--nera-purple)", fontFamily: "var(--font-mono)" }}
            >
              NERA Software
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)", lineHeight: 1.1 }}
            >
              Interactive Simulators
            </h2>
          </div>
          <Link
            href="/simulators"
            className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors shrink-0 hover:text-indigo-700"
            style={{ color: "var(--nera-accent-primary)" }}
          >
            View all simulators
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
