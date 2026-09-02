import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Users, CircuitBoard, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Learning",
  description: "NERA interactive learning — PCB exploration, simulators, student mentorship, and hands-on technology education.",
};

const pathways = [
  {
    icon: CircuitBoard, c: "#0891b2",
    title: "PCB Lab",
    desc: "Rotate and explore a real circuit board. Click components. Watch signals travel through traces.",
    href: "/pcb-lab",
    cta: "Enter PCB Lab",
  },
  {
    icon: Cpu, c: "#7c3aed",
    title: "Simulator Software",
    desc: "Interactive simulation tools for electronics, digital logic, robotics, and networking.",
    href: "/simulators",
    cta: "Browse Simulators",
  },
  {
    icon: GraduationCap, c: "#059669",
    title: "Student Projects",
    desc: "Final-year and academic project support — from topic selection to working prototype.",
    href: "/services?service=student-project",
    cta: "Start a Project",
  },
  {
    icon: Users, c: "#4f46e5",
    title: "Live Mentorship",
    desc: "1-on-1 mentoring sessions to build skills, tackle real problems, and grow as an engineer.",
    href: "/services?service=mentorship",
    cta: "Book Consultation",
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f6fa" }}>
      {/* Hero */}
      <div className="relative pt-28 pb-16 px-5 sm:px-8 overflow-hidden" style={{ background: "#0e1628" }}>
        <div className="absolute inset-0 bg-grid-navy pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(8,145,178,0.4),transparent)" }} />
        <div className="relative z-10 max-w-[1320px] mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(34,211,238,0.75)", fontFamily: "var(--f-mono)" }}>NERA Learning</p>
          <h1 className="font-bold mb-4"
            style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.25rem)", color: "#e2e8f0", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Learn by Doing
          </h1>
          <p className="max-w-lg text-sm" style={{ color: "#64748b" }}>
            NERA builds interactive experiences that make technology tangible —
            for students, educators, and curious builders.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-5">
          {pathways.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title}
                className="group p-7 rounded-2xl border bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${p.c}10`, border: `1.5px solid ${p.c}20` }}>
                  <Icon className="w-6 h-6" style={{ color: p.c }} />
                </div>
                <h2 className="font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--f-display)", color: "#0d1117" }}>{p.title}</h2>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#374151" }}>{p.desc}</p>
                <Link href={p.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: p.c }}
                >
                  {p.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
