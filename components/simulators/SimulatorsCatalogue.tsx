"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { simulators } from "@/data/simulators";

const statusConfig = {
  available:     { label: "Available",    color: "#059669", bg: "rgba(5,150,105,0.1)",   dot: "#10b981" },
  beta:          { label: "Beta",         color: "#d97706", bg: "rgba(217,119,6,0.1)",   dot: "#f59e0b" },
  "coming-soon": { label: "Coming Soon",  color: "#6b7280", bg: "rgba(107,114,128,0.1)", dot: "#9ca3af" },
};

const categoryColor: Record<string, string> = {
  Electronics:     "#0891b2",
  Robotics:        "#d97706",
  "Digital Logic": "#7c3aed",
  Networking:      "#4f46e5",
};

export default function SimulatorsCatalogue() {
  return (
    <div className="min-h-screen" style={{ background: "var(--nera-surface-page)" }}>

      {/* Hero */}
      <div
        className="relative pt-28 pb-16 px-5 sm:px-8 overflow-hidden"
        style={{ background: "var(--nera-surface-mid)" }}
      >
        <div className="absolute inset-0 nera-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent)" }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(192,177,255,0.7)", fontFamily: "var(--font-mono)" }}>
            NERA Software
          </p>
          <h1
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.25rem)",
              color: "var(--nera-text-on-dark)",
              lineHeight: 1.08,
            }}
          >
            Interactive Simulators
          </h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: "var(--nera-text-on-dark-muted)" }}>
            Hands-on simulation software for electronics, robotics, digital logic, and networking.
          </p>
        </div>
      </div>

      {/* Catalogue */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {simulators.map((sim) => {
            const status = statusConfig[sim.status];
            const accent = categoryColor[sim.category] ?? "#4f46e5";
            return (
              <article
                key={sim.id}
                className="group flex flex-col bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: "rgba(0,0,0,0.055)", boxShadow: "var(--shadow-card)" }}
              >
                {/* Preview */}
                <div
                  className="h-40 relative flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg,${accent}08,${accent}15)` }}
                >
                  <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
                    <rect x="18" y="14" width="36" height="28" rx="4"
                      fill={`${accent}15`} stroke={accent} strokeWidth="1.5" />
                    <line x1="2" y1="28" x2="18" y2="28" stroke={`${accent}60`} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="54" y1="28" x2="70" y2="28" stroke={`${accent}60`} strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="36" cy="28" r="5" fill={`${accent}25`} stroke={accent} strokeWidth="1.5" />
                    <text x="36" y="31.5" textAnchor="middle" fill={accent}
                      fontSize="6" fontFamily="monospace" fontWeight="700">SIM</text>
                  </svg>
                  <span
                    className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: status.bg, color: status.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
                    {status.label}
                  </span>
                  {sim.isFeatured && (
                    <span
                      className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: "rgba(79,70,229,0.15)", color: "var(--nera-accent-primary)", border: "1px solid rgba(79,70,229,0.2)" }}
                    >
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-md"
                      style={{ color: accent, background: `${accent}10`, fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}
                    >
                      {sim.category}
                    </span>
                    <span className="text-xs" style={{ color: "var(--nera-text-muted)", fontFamily: "var(--font-mono)" }}>
                      v{sim.version}
                    </span>
                  </div>

                  <h2
                    className="font-bold text-base mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
                  >
                    {sim.name}
                  </h2>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--nera-text-secondary)" }}>
                    {sim.shortDescription}
                  </p>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {sim.platform.map((p) => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded-md"
                        style={{ background: "rgba(79,70,229,0.06)", color: "var(--nera-accent-primary)", fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}>
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="space-y-1 mb-5">
                    {sim.features.slice(0, 2).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs" style={{ color: "var(--nera-text-secondary)" }}>
                        <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Link href={`/simulators/${sim.slug}`}
                      className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-semibold border transition-all hover:border-indigo-300 hover:bg-indigo-50/60 hover:text-indigo-600"
                      style={{ borderColor: "rgba(0,0,0,0.08)", color: "var(--nera-text-secondary)" }}>
                      View Details <ArrowRight className="w-3 h-3" />
                    </Link>
                    {sim.prototypeUrl ? (
                      <a href={sim.prototypeUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: "var(--nera-accent-primary)" }}>
                        Try Prototype <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link href="/services?service=custom-simulator"
                        className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-semibold border transition-all hover:bg-indigo-50/60"
                        style={{ borderColor: "rgba(79,70,229,0.22)", color: "var(--nera-accent-primary)" }}>
                        Get Licence
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border p-10 text-center"
          style={{ background: "white", borderColor: "rgba(0,0,0,0.06)", boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}>
            Need a custom simulator?
          </h2>
          <p className="mb-7 max-w-md mx-auto text-sm" style={{ color: "var(--nera-text-secondary)" }}>
            NERA builds bespoke interactive simulation software for schools, colleges, and research
            institutions — tailored to your curriculum or research domain.
          </p>
          <Link href="/services?service=custom-simulator"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
            style={{ background: "var(--nera-accent-primary)", boxShadow: "var(--shadow-indigo)" }}>
            Request a Custom Simulator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
