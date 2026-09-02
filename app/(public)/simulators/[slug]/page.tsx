import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { simulators, getSimulatorBySlug } from "@/data/simulators";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sim = getSimulatorBySlug(slug);
  if (!sim) return { title: "Simulator Not Found" };
  return { title: sim.name, description: sim.shortDescription };
}

export function generateStaticParams() {
  return simulators.map((s) => ({ slug: s.slug }));
}

const statusConfig = {
  available:     { label: "Available",    color: "#059669", bg: "rgba(5,150,105,0.1)",  dot: "#10b981" },
  beta:          { label: "Beta",         color: "#d97706", bg: "rgba(217,119,6,0.1)",  dot: "#f59e0b" },
  "coming-soon": { label: "Coming Soon",  color: "#6b7280", bg: "rgba(107,114,128,0.1)",dot: "#9ca3af" },
};

const categoryColor: Record<string, string> = {
  Electronics:     "#0891b2",
  Robotics:        "#d97706",
  "Digital Logic": "#7c3aed",
  Networking:      "#4f46e5",
};

export default async function SimulatorDetailPage({ params }: Props) {
  const { slug } = await params;
  const sim = getSimulatorBySlug(slug);
  if (!sim) notFound();

  const status = statusConfig[sim.status];
  const accent = categoryColor[sim.category] ?? "#4f46e5";

  return (
    <div className="min-h-screen" style={{ background: "var(--nera-surface-tint)" }}>

      {/* Narrow page hero */}
      <div
        className="relative pt-20 pb-12 px-5 sm:px-8 overflow-hidden"
        style={{ background: "var(--nera-surface-navy)" }}
      >
        <div className="absolute inset-0 nera-grid-bg-navy pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/simulators"
            className="inline-flex items-center gap-2 text-xs font-medium mb-6 transition-colors"
            style={{ color: "var(--nera-text-on-dark-muted)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Simulators
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: status.bg, color: status.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
              {status.label}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                color: accent,
                background: `${accent}18`,
                border: `1px solid ${accent}30`,
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
              }}
            >
              {sim.category}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--nera-text-on-dark-muted)", fontFamily: "var(--font-mono)" }}
            >
              v{sim.version}
            </span>
          </div>

          <h1
            className="font-bold mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              color: "var(--nera-text-on-dark)",
              lineHeight: 1.1,
            }}
          >
            {sim.name}
          </h1>
          <p className="max-w-xl text-sm" style={{ color: "var(--nera-text-on-dark-muted)" }}>
            {sim.shortDescription}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── Main column ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* Preview area */}
            <div
              className="h-52 rounded-2xl flex items-center justify-center border relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${accent}08, ${accent}16)`,
                borderColor: `${accent}20`,
              }}
            >
              <svg width="80" height="64" viewBox="0 0 80 64" fill="none" aria-hidden="true">
                <rect x="20" y="16" width="40" height="32" rx="4"
                  fill={`${accent}15`} stroke={accent} strokeWidth="1.5" />
                <line x1="2" y1="32" x2="20" y2="32" stroke={`${accent}60`} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="60" y1="32" x2="78" y2="32" stroke={`${accent}60`} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="40" cy="32" r="6" fill={`${accent}25`} stroke={accent} strokeWidth="1.5" />
                <text x="40" y="35" textAnchor="middle" fill={accent} fontSize="6" fontFamily="monospace" fontWeight="700">SIM</text>
              </svg>
              <span
                className="absolute bottom-3 right-3 text-xs px-2 py-0.5 rounded-md"
                style={{ color: accent, background: `${accent}12`, fontFamily: "var(--font-mono)", fontSize: "0.62rem" }}
              >
                {sim.platform.join(" · ")}
              </span>
            </div>

            {/* Description */}
            <div
              className="rounded-2xl border p-6 bg-white"
              style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "var(--shadow-card)" }}
            >
              <h2
                className="text-base font-bold mb-3"
                style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
              >
                About this simulator
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--nera-text-secondary)" }}>
                {sim.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div
              className="rounded-2xl border p-6 bg-white"
              style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "var(--shadow-card)" }}
            >
              <h2
                className="text-base font-bold mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
              >
                Features
              </h2>
              <ul className="space-y-2.5">
                {sim.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "var(--nera-text-secondary)" }}>
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: accent }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {sim.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg border"
                  style={{
                    color: "var(--nera-text-muted)",
                    borderColor: "rgba(0,0,0,0.07)",
                    background: "white",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl border p-6 sticky top-24 bg-white"
              style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "var(--shadow-lifted)" }}
            >
              <h2
                className="text-base font-bold mb-5"
                style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
              >
                Get Access
              </h2>

              {sim.prototypeUrl && (
                <a
                  href={sim.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm mb-3 transition-all hover:opacity-90 text-white"
                  style={{ background: "#059669" }}
                >
                  Try Prototype
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <Link
                href="/services?service=custom-simulator"
                className="nera-btn-primary w-full justify-center py-3 mb-3"
              >
                Get Licence
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services?service=custom-simulator"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm border transition-all"
                style={{
                  borderColor: "rgba(79,70,229,0.2)",
                  color: "var(--nera-indigo)",
                  background: "rgba(79,70,229,0.04)",
                }}
              >
                Institutional Version
              </Link>

              <div
                className="mt-6 pt-5 border-t"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                <p className="text-xs mb-1" style={{ color: "var(--nera-text-muted)" }}>
                  Need customisation or volume pricing?
                </p>
                <Link
                  href="/services"
                  className="text-xs font-semibold underline underline-offset-2 transition-colors hover:text-indigo-700"
                  style={{ color: "var(--nera-indigo)" }}
                >
                  Contact NERA →
                </Link>
              </div>

              {/* Platform info */}
              <div className="mt-5 pt-5 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <p className="text-xs font-medium mb-2" style={{ color: "var(--nera-text-muted)" }}>
                  Available on
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sim.platform.map((p) => (
                    <span
                      key={p}
                      className="text-xs px-2 py-0.5 rounded-md border"
                      style={{
                        borderColor: "rgba(0,0,0,0.08)",
                        color: "var(--nera-text-secondary)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
