import type { Metadata } from "next";
import PCBExplorerShell from "@/components/pcb/PCBExplorerShell";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "PCB Lab",
  description: "Interactive 3D PCB experience — rotate, zoom, click components, watch signals flow. NERA builds simulators like this for schools and research.",
};

export default function PCBLabPage() {
  return (
    <div className="min-h-screen pt-16" style={{ background: "var(--nera-surface-deep)" }}>
      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-8 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--nera-accent-cyan)" }}
          >
            Interactive Technology Lab
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--nera-text-on-dark)",
            }}
          >
            PCB Lab
          </h1>
          <p className="max-w-lg mx-auto" style={{ color: "var(--nera-text-on-dark-muted)" }}>
            Rotate, zoom, click components to inspect them. Hit &ldquo;See How It Works&rdquo;
            to watch signals travel through the circuit.
          </p>
        </div>

        {/* 3D Viewer */}
        <div className="mb-8">
          <PCBExplorerShell />
        </div>

        {/* Signal flow explanation */}
        <div
          className="rounded-2xl border p-6 mb-10"
          style={{
            background: "rgba(6,182,212,0.04)",
            borderColor: "rgba(6,182,212,0.15)",
          }}
        >
          <h2
            className="text-lg font-semibold mb-4 text-center"
            style={{ color: "var(--nera-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            How Signals Flow
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Power", color: "#f59e0b" },
              { label: "→", color: "rgba(255,255,255,0.2)" },
              { label: "Sensor", color: "#7c3aed" },
              { label: "→", color: "rgba(255,255,255,0.2)" },
              { label: "Microcontroller", color: "#06b6d4" },
              { label: "→", color: "rgba(255,255,255,0.2)" },
              { label: "Processing", color: "#06b6d4" },
              { label: "→", color: "rgba(255,255,255,0.2)" },
              { label: "Output (LED)", color: "#10b981" },
            ].map((item, i) => (
              <span
                key={i}
                className={item.label === "→" ? "text-sm" : "px-3 py-1 rounded-full text-xs font-medium border"}
                style={
                  item.label === "→"
                    ? { color: "rgba(255,255,255,0.3)" }
                    : {
                        color: item.color,
                        borderColor: item.color + "30",
                        background: item.color + "10",
                      }
                }
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl border p-8 text-center"
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
          <p className="mb-6" style={{ color: "var(--nera-text-on-dark-muted)" }}>
            NERA builds interactive simulators for schools, colleges and research.
            Logic gates, networking, robotics — each as a hands-on experience.
          </p>
          <Link
            href="/services?service=custom-simulator"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
            style={{ background: "var(--nera-accent-primary)" }}
          >
            Build a Simulator With NERA
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
