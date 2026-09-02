import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "NERA student projects, final-year builds, and live mentorship collaborations.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f6fa" }}>
      {/* Hero */}
      <div className="relative pt-28 pb-16 px-5 sm:px-8 overflow-hidden" style={{ background: "#0e1628" }}>
        <div className="absolute inset-0 bg-grid-navy pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(5,150,105,0.4),transparent)" }} />
        <div className="relative z-10 max-w-[1320px] mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(52,211,153,0.75)", fontFamily: "var(--f-mono)" }}>NERA Projects</p>
          <h1 className="font-bold mb-4"
            style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.25rem)", color: "#e2e8f0", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Student &amp; Live Projects
          </h1>
          <p className="max-w-lg text-sm" style={{ color: "#64748b" }}>
            Final-year engineering builds, live mentorship collaborations,
            and real projects completed with NERA support.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-16">
        {/* Coming soon placeholder */}
        <div className="rounded-2xl border bg-white p-16 text-center"
          style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.15)" }}>
            <FolderOpen className="w-7 h-7" style={{ color: "#059669" }} />
          </div>
          <h2 className="text-xl font-bold mb-3"
            style={{ fontFamily: "var(--f-display)", color: "#0d1117" }}>
            Projects Gallery — Coming Soon
          </h2>
          <p className="max-w-sm mx-auto text-sm mb-8" style={{ color: "#374151" }}>
            NERA project records will be published here as builds are completed and documented.
            Want to start a project with NERA?
          </p>
          <Link href="/services?service=student-project" className="btn-primary inline-flex">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
