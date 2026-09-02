import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "NERA — New Embark Robotic Age. Who we are, what we build, and why.",
};

const domains = [
  { label: "Simulator Software",  accent: "#7c3aed", desc: "Interactive tools for electronics, robotics, logic, networking" },
  { label: "Robotics R&D",        accent: "#d97706", desc: "Microrobotics, biomimetic prototypes, embedded systems" },
  { label: "PCB Design",          accent: "#0891b2", desc: "Schematic capture, layout, manufacturing-ready deliverables" },
  { label: "Embedded Systems",    accent: "#0891b2", desc: "Firmware development, hardware integration" },
  { label: "Custom Software",     accent: "#4f46e5", desc: "Web apps, desktop tools, automation systems" },
  { label: "Research Support",    accent: "#059669", desc: "Guidance and publication-process support" },
  { label: "Student Projects",    accent: "#4f46e5", desc: "Final-year and academic project collaboration" },
  { label: "Mentorship",          accent: "#7c3aed", desc: "Live project mentoring and skill development" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--nera-surface-page)" }}>

      {/* Hero */}
      <div
        className="relative pt-28 pb-20 px-5 sm:px-8 overflow-hidden"
        style={{ background: "var(--nera-surface-mid)" }}
      >
        <div className="absolute inset-0 nera-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(79,70,229,0.4),transparent)" }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* NERA mark */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.3)" }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <polygon points="18,3 31,10.5 31,25.5 18,33 5,25.5 5,10.5"
                  fill="rgba(79,70,229,0.2)" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="18" y="22" textAnchor="middle" fontSize="11" fontWeight="800"
                  fontFamily="Space Grotesk,system-ui" fill="rgba(237,237,245,0.9)">N</text>
                <circle cx="18" cy="3" r="2" fill="#06b6d4" />
              </svg>
            </div>
          </div>

          <h1
            className="font-bold mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
              color: "var(--nera-text-on-dark)",
              lineHeight: 1.08,
            }}
          >
            NERA
          </h1>
          <p
            className="text-lg font-light mb-3"
            style={{ color: "rgba(192,177,255,0.85)" }}
          >
            New Embark Robotic Age
          </p>
          <p style={{ color: "var(--nera-text-on-dark-muted)" }}>
            Where ideas become interactive technology.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-16 space-y-16">

        {/* Mission */}
        <section>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--nera-accent-primary)", fontFamily: "var(--font-mono)" }}
          >
            What We Do
          </p>
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
          >
            Building technology that&nbsp;teaches itself.
          </h2>
          <div className="space-y-4 text-base leading-relaxed max-w-2xl"
            style={{ color: "var(--nera-text-secondary)" }}>
            <p>
              NERA is a technology company focused on making engineering and science
              genuinely interactive. We build simulators that let students explore
              electronics by touching them. We build robots that test ideas before
              hardware is fabricated. We help researchers navigate the process of
              turning experiments into published work.
            </p>
            <p>
              Our work spans school education to institutional research — but the
              philosophy stays the same: technology should be learnable by doing,
              not just by reading.
            </p>
          </div>
        </section>

        {/* Domains */}
        <section>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--nera-accent-primary)", fontFamily: "var(--font-mono)" }}
          >
            Technology Domains
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {domains.map((d) => (
              <div
                key={d.label}
                className="p-4 rounded-xl border bg-white"
                style={{
                  borderColor: "rgba(0,0,0,0.06)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mb-2"
                  style={{ background: d.accent }}
                />
                <div
                  className="font-semibold text-sm mb-1"
                  style={{ color: "var(--nera-text-primary)", fontFamily: "var(--font-display)" }}
                >
                  {d.label}
                </div>
                <div className="text-xs" style={{ color: "var(--nera-text-secondary)" }}>
                  {d.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="rounded-2xl border p-10 text-center"
          style={{ background: "white", borderColor: "rgba(0,0,0,0.06)", boxShadow: "var(--shadow-card)" }}
        >
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
          >
            Ready to work with NERA?
          </h2>
          <p className="mb-7 max-w-sm mx-auto text-sm" style={{ color: "var(--nera-text-secondary)" }}>
            Tell us what you want to build. One message and NERA is with you.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
            style={{ background: "var(--nera-accent-primary)", boxShadow: "var(--shadow-indigo)" }}
          >
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
