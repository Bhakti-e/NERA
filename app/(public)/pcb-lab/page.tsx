import type { Metadata } from "next";
import PCBExplorerShell from "@/components/pcb/PCBExplorerShell";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "PCB Lab",
  description:
    "Interactive 3D PCB — rotate, zoom, click components, watch signals flow. NERA builds simulators like this for schools and research.",
};

const signalSteps = [
  { label: "Power",   color: "#d97706" },
  { label: "Sensor",  color: "#7c3aed" },
  { label: "MCU",     color: "#0891b2" },
  { label: "Process", color: "#0891b2" },
  { label: "Output",  color: "#059669" },
];

export default function PCBLabPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "var(--nera-surface-navy)" }}
    >
      {/* Background grid */}
      <div className="fixed inset-0 nera-grid-bg-cyan opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 pb-16">

        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--nera-accent-cyan-bright)", fontFamily: "var(--font-mono)" }}
          >
            Interactive Technology Lab
          </p>
          <h1
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              color: "var(--nera-text-on-dark)",
              lineHeight: 1.1,
            }}
          >
            PCB Lab
          </h1>
          <p className="max-w-md mx-auto text-sm" style={{ color: "var(--nera-text-on-dark-muted)" }}>
            Drag to rotate · Scroll to zoom · Click a component to inspect it.
            Hit <strong style={{ color: "var(--nera-accent-cyan-bright)" }}>See How It Works</strong> to watch signals travel.
          </p>
        </div>

        {/* 3D Viewer */}
        <div
          className="rounded-2xl overflow-hidden mb-10 border"
          style={{ borderColor: "rgba(8,145,178,0.15)", boxShadow: "0 0 60px rgba(8,145,178,0.08)" }}
        >
          <PCBExplorerShell />
        </div>

        {/* Signal flow */}
        <div
          className="rounded-2xl border p-6 mb-10"
          style={{
            background: "rgba(8,145,178,0.04)",
            borderColor: "rgba(8,145,178,0.12)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest text-center mb-5"
            style={{ color: "var(--nera-text-on-dark-muted)", fontFamily: "var(--font-mono)", opacity: 0.6 }}
          >
            Signal Path
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {signalSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1.5">
                <span
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                  style={{
                    color: step.color,
                    borderColor: `${step.color}30`,
                    background: `${step.color}10`,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {step.label}
                </span>
                {i < signalSteps.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl border p-8 sm:p-10 text-center"
          style={{
            background: "rgba(79,70,229,0.06)",
            borderColor: "rgba(79,70,229,0.15)",
          }}
        >
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)" }}
          >
            Imagine learning electronics like this.
          </h2>
          <p className="text-sm mb-7 max-w-md mx-auto" style={{ color: "var(--nera-text-on-dark-muted)" }}>
            NERA builds interactive simulators for schools, colleges and research — logic gates,
            networking, robotics, and more, each as a hands-on experience.
          </p>
          <Link
            href="/services?service=custom-simulator"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
            style={{ background: "var(--nera-accent-primary)", boxShadow: "var(--shadow-indigo)" }}
          >
            Build a Simulator With NERA
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
