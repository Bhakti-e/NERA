import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Cpu, Activity, Layers } from "lucide-react";
import { roboticsProjects } from "@/data/roboticsProjects";

export const metadata: Metadata = {
  title: "Robotics R&D",
  description: "NERA Robotics Lab — microrobotics, biomimetic prototypes, embedded systems, and robotic R&D.",
};

const statusCfg = {
  research:  { label: "Research",  c: "#7c3aed", bg: "rgba(124,58,237,0.12)" },
  prototype: { label: "Prototype", c: "#0891b2", bg: "rgba(8,145,178,0.12)"  },
  active:    { label: "Active",    c: "#059669", bg: "rgba(5,150,105,0.12)"  },
  completed: { label: "Completed", c: "#6b7280", bg: "rgba(107,114,128,0.12)"},
};
const catIcons: Record<string, React.ElementType> = {
  Microrobotics: Cpu, "Biomimetic Robotics": Bot,
  "Embedded Systems": Activity, "Robotic Prototypes": Layers,
};

export default function RoboticsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f6fa" }}>
      {/* Hero */}
      <div className="relative pt-28 pb-16 px-5 sm:px-8 overflow-hidden" style={{ background: "#0e1628" }}>
        <div className="absolute inset-0 bg-grid-navy pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(217,119,6,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(217,119,6,0.4),transparent)" }} />
        <div className="relative z-10 max-w-[1320px] mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(251,191,36,0.75)", fontFamily: "var(--f-mono)" }}>NERA R&amp;D Lab</p>
          <h1 className="font-bold mb-4"
            style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.25rem)", color: "#e2e8f0", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Robotics &amp; Research
          </h1>
          <p className="max-w-xl text-sm" style={{ color: "#64748b" }}>
            Microrobotics, biomimetic prototypes, embedded systems, and robotic R&amp;D.
            Real photographs and detailed records will be published as builds progress.
          </p>
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roboticsProjects.map((proj) => {
            const st = statusCfg[proj.status];
            const Icon = catIcons[proj.category] ?? Bot;
            return (
              <article key={proj.id}
                className="flex flex-col rounded-2xl border bg-white overflow-hidden"
                style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)" }}>
                {/* Visual placeholder */}
                <div className="h-36 flex items-center justify-center relative"
                  style={{ background: "linear-gradient(135deg, rgba(217,119,6,0.06), rgba(217,119,6,0.12))" }}>
                  <Icon className="w-10 h-10" style={{ color: "rgba(217,119,6,0.3)" }} />
                  <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: st.bg, color: st.c }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.c }} />{st.label}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, ${st.c}60, transparent)` }} />
                </div>
                <div className="flex-1 p-5">
                  <p className="text-xs mb-2"
                    style={{ color: "rgba(217,119,6,0.8)", fontFamily: "var(--f-mono)", fontSize: "0.62rem" }}>
                    {proj.category}
                  </p>
                  <h2 className="font-bold text-sm mb-2 leading-snug"
                    style={{ fontFamily: "var(--f-display)", color: "#0d1117" }}>{proj.name}</h2>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "#374151" }}>{proj.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md"
                        style={{ background: "rgba(217,119,6,0.08)", color: "rgba(217,119,6,0.8)",
                          fontFamily: "var(--f-mono)", fontSize: "0.6rem", border: "1px solid rgba(217,119,6,0.15)" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border p-10 text-center bg-white"
          style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h2 className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--f-display)", color: "#0d1117" }}>
            Collaborate with NERA
          </h2>
          <p className="mb-7 max-w-md mx-auto text-sm" style={{ color: "#374151" }}>
            Interested in robotics R&amp;D, embedded development, or prototype builds?
            Tell us what you want to create.
          </p>
          <Link href="/services?service=robotics-embedded"
            className="btn-primary inline-flex">
            Start a Robotics Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
