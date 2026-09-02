import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "NERA — New Embark Robotic Age. Who we are, what we build, and why we do it.",
};

const domains = [
  { label: "Simulator Software", desc: "Interactive educational and research simulation tools" },
  { label: "Robotics R&D", desc: "Microrobotics, biomimetic prototypes, and embedded systems" },
  { label: "PCB Design", desc: "Schematic capture, layout, and manufacturing-ready outputs" },
  { label: "Embedded Systems", desc: "Firmware development and hardware integration" },
  { label: "Custom Software", desc: "Web apps, desktop tools, and automation systems" },
  { label: "Research Support", desc: "Guidance and publication-process support" },
  { label: "Student Projects", desc: "Final-year and academic project collaboration" },
  { label: "Mentorship", desc: "Live project mentoring and skill development" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--nera-surface-page)" }}>
      {/* Hero */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ background: "var(--nera-surface-mid)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(79,70,229,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--nera-accent-primary)] flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)" }}>
              NERA
            </h1>
          </div>
          <p className="text-xl font-light mb-4" style={{ color: "rgba(167,163,255,0.9)" }}>
            New Embark Robotic Age
          </p>
          <p className="text-lg" style={{ color: "var(--nera-text-on-dark-muted)" }}>
            Where ideas become interactive technology.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--nera-accent-primary)" }}>
            What We Do
          </p>
          <h2 className="text-3xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}>
            Building the tools that make technology learnable.
          </h2>
          <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--nera-text-secondary)" }}>
            NERA is a technology company focused on making engineering and science genuinely
            interactive. We build simulators that let students explore electronics by touching them.
            We build robots that test ideas before hardware is fabricated. We help researchers
            navigate the process of turning experiments into published work.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--nera-text-secondary)" }}>
            Our clients include school students, final-year engineering students, research groups,
            educational institutions, and companies that need technology built to specification.
          </p>
        </div>

        {/* Domains */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--nera-accent-primary)" }}>
            Domains
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {domains.map((d) => (
              <div key={d.label} className="p-4 rounded-xl border bg-white"
                style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div className="font-semibold text-sm mb-1"
                  style={{ color: "var(--nera-text-primary)", fontFamily: "var(--font-display)" }}>
                  {d.label}
                </div>
                <div className="text-xs" style={{ color: "var(--nera-text-secondary)" }}>
                  {d.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-10 rounded-2xl border"
          style={{ background: "white", borderColor: "rgba(0,0,0,0.06)" }}>
          <h2 className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}>
            Ready to work with NERA?
          </h2>
          <p className="mb-6" style={{ color: "var(--nera-text-secondary)" }}>
            Tell us what you want to build. No account, no forms — just a WhatsApp message.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105"
            style={{ background: "var(--nera-accent-primary)" }}
          >
            Get NERA Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
