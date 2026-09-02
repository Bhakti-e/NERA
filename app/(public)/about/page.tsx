import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NERALogo from "@/components/brand/NERALogo";

export const metadata: Metadata = {
  title: "About",
  description: "NERA — New Embark Robotic Age. Who we are, what we build, and why.",
};

const domains = [
  { label: "Simulator Software",  accent: "#7c3aed", desc: "Interactive tools for electronics, robotics, logic, networking" },
  { label: "Robotics R&D",        accent: "#d97706", desc: "Microrobotics, biomimetic prototypes, embedded systems" },
  { label: "PCB Design",          accent: "#0891b2", desc: "Schematic capture, layout, manufacturing-ready deliverables" },
  { label: "Embedded Systems",    accent: "#0891b2", desc: "Firmware development and hardware integration" },
  { label: "Custom Software",     accent: "#4f46e5", desc: "Web apps, desktop tools, automation systems" },
  { label: "Research Support",    accent: "#059669", desc: "Research guidance and publication-process support" },
  { label: "Student Projects",    accent: "#4f46e5", desc: "Final-year and academic project collaboration" },
  { label: "Mentorship",          accent: "#7c3aed", desc: "Live project mentoring and skill development" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--nera-surface-tint)" }}>

      {/* Hero — navy with white logo badge */}
      <div
        className="relative pt-28 pb-20 px-5 sm:px-8 overflow-hidden text-center"
        style={{ background: "var(--nera-surface-navy)" }}
      >
        <div className="absolute inset-0 nera-grid-bg-navy pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.4),transparent)" }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/*
            Logo on dark: white pill wrapping the mark so the white bg is preserved,
            plus the wordmark in light text.
          */}
          <div className="flex justify-center mb-8">
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: "white",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              }}
            >
              <NERALogo variant="full" size={48} href="/" />
            </div>
          </div>

          <h1
            className="font-bold mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--nera-text-on-dark)",
              lineHeight: 1.08,
            }}
          >
            About NERA
          </h1>
          <p style={{ color: "var(--nera-text-on-dark-muted)" }}>
            Where ideas become interactive technology.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-16 space-y-12">

        {/* Mission */}
        <section
          className="rounded-2xl border p-8 bg-white"
          style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "var(--shadow-card)" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--nera-blue)", fontFamily: "var(--font-mono)" }}
          >
            What We Do
          </p>
          <h2
            className="text-2xl font-bold mb-5"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
          >
            Building technology that teaches itself.
          </h2>
          <div className="space-y-4 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--nera-text-secondary)" }}>
            <p>
              NERA is a technology company focused on making engineering and science genuinely
              interactive. We build simulators that let students explore electronics by touching
              them. We build robots that test ideas before hardware is fabricated. We help
              researchers navigate the process of turning experiments into published work.
            </p>
            <p>
              Our work spans school education to institutional research — but the philosophy
              stays the same: technology should be learnable by doing, not just by reading.
            </p>
          </div>
        </section>

        {/* Domains */}
        <section>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--nera-blue)", fontFamily: "var(--font-mono)" }}
          >
            Technology Domains
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {domains.map((d) => (
              <div
                key={d.label}
                className="p-4 rounded-xl border bg-white transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(0,0,0,0.06)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.accent }} />
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "var(--nera-text-primary)", fontFamily: "var(--font-display)" }}
                  >
                    {d.label}
                  </span>
                </div>
                <p className="text-xs ml-4.5" style={{ color: "var(--nera-text-secondary)" }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="rounded-2xl border p-10 text-center bg-white"
          style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "var(--shadow-card)" }}
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
          <Link href="/services" className="nera-btn-primary">
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
