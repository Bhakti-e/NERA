import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { simulators, getSimulatorBySlug } from "@/data/simulators";
import { ArrowLeft, Monitor, ArrowRight } from "lucide-react";

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
  available: { label: "Available", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  beta: { label: "Beta", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  "coming-soon": { label: "Coming Soon", color: "#9999aa", bg: "rgba(153,153,170,0.1)" },
};

export default async function SimulatorDetailPage({ params }: Props) {
  const { slug } = await params;
  const sim = getSimulatorBySlug(slug);
  if (!sim) notFound();

  const status = statusConfig[sim.status];

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--nera-surface-page)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          href="/simulators"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[var(--nera-accent-primary)]"
          style={{ color: "var(--nera-text-secondary)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          All Simulators
        </Link>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Main */}
          <div className="lg:col-span-3">
            {/* Thumbnail */}
            <div
              className="h-56 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.08), rgba(124,58,237,0.14))", border: "1px solid rgba(79,70,229,0.1)" }}
            >
              <Monitor className="w-16 h-16" style={{ color: "rgba(79,70,229,0.25)" }} />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: status.bg, color: status.color }}
              >
                {status.label}
              </span>
              <span className="text-xs" style={{ color: "var(--nera-text-muted)" }}>
                v{sim.version}
              </span>
              <span className="text-xs" style={{ color: "var(--nera-text-muted)" }}>
                {sim.category}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
            >
              {sim.name}
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--nera-text-secondary)" }}>
              {sim.fullDescription}
            </p>

            {/* Features */}
            <h2 className="text-lg font-semibold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}>
              Features
            </h2>
            <ul className="space-y-2 mb-8">
              {sim.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "var(--nera-text-secondary)" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--nera-accent-primary)] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Platform */}
            <div>
              <h2 className="text-lg font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}>
                Platform
              </h2>
              <div className="flex flex-wrap gap-2">
                {sim.platform.map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-lg text-sm border"
                    style={{ borderColor: "rgba(0,0,0,0.08)", color: "var(--nera-text-secondary)" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl border p-6 sticky top-24"
              style={{ background: "white", borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
            >
              <h2 className="text-lg font-semibold mb-5"
                style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}>
                Access
              </h2>

              {sim.prototypeUrl && (
                <a
                  href={sim.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm mb-3 transition-all hover:opacity-90"
                  style={{ background: "var(--nera-accent-green)", color: "white" }}
                >
                  Try Prototype
                </a>
              )}

              <Link
                href="/services?service=custom-simulator"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm mb-3 text-white transition-all hover:scale-105"
                style={{ background: "var(--nera-accent-primary)" }}
              >
                Get Licence
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services?service=custom-simulator"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm border transition-all hover:border-indigo-300"
                style={{ borderColor: "rgba(79,70,229,0.2)", color: "var(--nera-accent-primary)" }}
              >
                Institutional Version
              </Link>

              <div className="mt-6 pt-5 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <p className="text-xs" style={{ color: "var(--nera-text-muted)" }}>
                  Need customisation or volume pricing?{" "}
                  <Link
                    href="/services"
                    className="underline hover:text-[var(--nera-accent-primary)]"
                    style={{ color: "var(--nera-text-secondary)" }}
                  >
                    Contact NERA
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
