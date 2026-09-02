import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Users, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Research",
  description: "NERA research guidance and publication-process support for engineering and computer science.",
};

const offerings = [
  {
    icon: Lightbulb, c: "#7c3aed",
    title: "Research Direction",
    desc: "Help choosing a focused, feasible research topic aligned with your domain and academic level.",
  },
  {
    icon: FileText, c: "#0891b2",
    title: "Methodology Guidance",
    desc: "Support designing your research methodology, experiment setup, and data collection approach.",
  },
  {
    icon: BookOpen, c: "#059669",
    title: "Paper Writing",
    desc: "Guidance on structuring your research paper — abstract, introduction, methodology, results, conclusion.",
  },
  {
    icon: Users, c: "#4f46e5",
    title: "Publication Process",
    desc: "Journal/conference selection, submission preparation, and revision support. We do not guarantee acceptance.",
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f6fa" }}>
      {/* Hero */}
      <div className="relative pt-28 pb-16 px-5 sm:px-8 overflow-hidden" style={{ background: "#0e1628" }}>
        <div className="absolute inset-0 bg-grid-navy pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent)" }} />
        <div className="relative z-10 max-w-[1320px] mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(167,139,250,0.75)", fontFamily: "var(--f-mono)" }}>NERA Research</p>
          <h1 className="font-bold mb-4"
            style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.25rem)", color: "#e2e8f0", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Research &amp; Publication Support
          </h1>
          <p className="max-w-lg text-sm" style={{ color: "#64748b" }}>
            NERA provides research guidance and publication-process support across
            engineering, robotics, and computer science. We do not guarantee publication outcomes.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-16 space-y-12">
        {/* Offerings */}
        <div className="grid sm:grid-cols-2 gap-5">
          {offerings.map((o) => {
            const Icon = o.icon;
            return (
              <div key={o.title}
                className="p-6 rounded-2xl border bg-white transition-all hover:-translate-y-0.5"
                style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${o.c}10`, border: `1.5px solid ${o.c}20` }}>
                  <Icon className="w-5 h-5" style={{ color: o.c }} />
                </div>
                <h3 className="font-bold text-base mb-2"
                  style={{ fontFamily: "var(--f-display)", color: "#0d1117" }}>{o.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{o.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl border p-5 text-sm"
          style={{ background: "rgba(225,29,72,0.04)", borderColor: "rgba(225,29,72,0.12)", color: "#374151" }}>
          <strong style={{ color: "#e11d48" }}>Important: </strong>
          NERA provides research guidance and publication-process support only.
          We do not guarantee publication acceptance by any journal or conference.
        </div>

        {/* CTA */}
        <div className="rounded-2xl border p-10 text-center bg-white"
          style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h2 className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--f-display)", color: "#0d1117" }}>Need research guidance?</h2>
          <p className="mb-7 max-w-sm mx-auto text-sm" style={{ color: "#374151" }}>
            Tell NERA about your research area and what stage you&apos;re at.
            We&apos;ll help from there.
          </p>
          <Link href="/services?service=research-publication" className="btn-primary inline-flex">
            Request Research Support <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
