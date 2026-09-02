import type { Metadata } from "next";
import Link from "next/link";
import { simulators } from "@/data/simulators";
import { Monitor, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Simulators",
  description: "Browse NERA's interactive simulation software for electronics, robotics, logic, and networking.",
};

const statusConfig = {
  available: { label: "Available", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  beta: { label: "Beta", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  "coming-soon": { label: "Coming Soon", color: "#9999aa", bg: "rgba(153,153,170,0.1)" },
};

export default function SimulatorsPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--nera-surface-page)" }}>
      {/* Header */}
      <div className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: "var(--nera-surface-mid)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(167,163,255,0.8)" }}>
            NERA Simulators
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)" }}
          >
            Interactive Simulation Software
          </h1>
          <p className="text-lg" style={{ color: "var(--nera-text-on-dark-muted)" }}>
            Explore, learn and research through hands-on simulation experiences.
          </p>
        </div>
      </div>

      {/* Catalogue */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulators.map((sim) => {
            const status = statusConfig[sim.status];
            return (
              <div
                key={sim.id}
                className="group bg-white rounded-2xl border border-black/6 overflow-hidden hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                {/* Thumbnail */}
                <div
                  className="h-44 flex items-center justify-center relative"
                  style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.07), rgba(124,58,237,0.12))" }}
                >
                  <Monitor className="w-14 h-14" style={{ color: "rgba(79,70,229,0.25)" }} />
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: status.bg, color: status.color }}
                  >
                    {status.label}
                  </div>
                  {sim.isFeatured && (
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: "rgba(79,70,229,0.15)", color: "var(--nera-accent-primary)" }}
                    >
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2
                      className="font-bold text-base"
                      style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
                    >
                      {sim.name}
                    </h2>
                    <span
                      className="shrink-0 text-xs px-2 py-0.5 rounded-full border"
                      style={{ borderColor: "rgba(0,0,0,0.06)", color: "var(--nera-text-muted)" }}
                    >
                      {sim.category}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--nera-text-secondary)" }}>
                    {sim.shortDescription}
                  </p>

                  {/* Platform */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {sim.platform.map((p) => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded-md"
                        style={{ background: "rgba(79,70,229,0.07)", color: "var(--nera-accent-primary)" }}>
                        {p}
                      </span>
                    ))}
                    <span className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: "rgba(0,0,0,0.04)", color: "var(--nera-text-muted)" }}>
                      v{sim.version}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-1 mb-5">
                    {sim.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs" style={{ color: "var(--nera-text-secondary)" }}>
                        <span className="mt-1 w-1 h-1 rounded-full bg-[var(--nera-accent-primary)] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/simulators/${sim.slug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold border border-black/8 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
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
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all"
                        style={{ background: "var(--nera-accent-primary)" }}
                      >
                        Try Prototype
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href="/services?service=custom-simulator"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold border transition-all"
                        style={{ borderColor: "rgba(79,70,229,0.2)", color: "var(--nera-accent-primary)" }}
                      >
                        Get Licence
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-10 rounded-2xl border"
          style={{ background: "white", borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
          <h2 className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}>
            Need a custom simulator?
          </h2>
          <p className="mb-6" style={{ color: "var(--nera-text-secondary)" }}>
            NERA builds bespoke interactive simulation software for schools, colleges, and research institutions.
          </p>
          <Link
            href="/services?service=custom-simulator"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105"
            style={{ background: "var(--nera-accent-primary)" }}
          >
            Request a Custom Simulator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
