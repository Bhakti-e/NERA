"use client";

import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { NERALogoBadge } from "@/components/brand/NERALogo";

const footerLinks = {
  Platform: [
    { label: "Simulators", href: "/simulators" },
    { label: "PCB Lab",    href: "/pcb-lab" },
    { label: "Services",   href: "/services" },
    { label: "About",      href: "/about" },
  ],
  "What We Build": [
    { label: "Simulator Software",  href: "/services" },
    { label: "Robotics R&D",        href: "/services" },
    { label: "PCB Design",          href: "/services" },
    { label: "Embedded Systems",    href: "/services" },
    { label: "Custom Software",     href: "/services" },
    { label: "Research Support",    href: "/services" },
  ],
};

const techTags = [
  { label: "Electronics",  color: "#22d3ee" },
  { label: "Robotics",     color: "#fbbf24" },
  { label: "Simulation",   color: "#a78bfa" },
  { label: "Embedded",     color: "#22d3ee" },
  { label: "Research",     color: "#34d399" },
  { label: "Education",    color: "#818cf8" },
  { label: "PCB Design",   color: "#22d3ee" },
  { label: "Firmware",     color: "#fbbf24" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--nera-surface-deep)", color: "var(--nera-text-on-dark)" }}
    >
      {/* Fine grid */}
      <div className="absolute inset-0 nera-grid-bg-navy pointer-events-none" />

      {/* Top gradient border */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(124,58,237,0.4), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">

          {/* ── Brand column ── */}
          <div className="col-span-2 md:col-span-1">
            {/*
              Logo on dark bg: use NERALogoBadge — white circle pill containing
              the mark, so the logo's white background is preserved.
            */}
            <div className="mb-5">
              <NERALogoBadge size={44} href="/" />
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-[22ch]"
              style={{ color: "var(--nera-text-on-dark-muted)" }}>
              New Embark Robotic Age.<br />
              Where ideas become interactive technology.
            </p>

            {/* Contact */}
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://wa.me/919104703696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-colors group"
                  style={{ color: "var(--nera-text-on-dark-muted)" }}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                  </span>
                  <span className="group-hover:text-green-400 transition-colors">WhatsApp NERA</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@nera.tech"
                  className="flex items-center gap-2.5 text-sm transition-colors group"
                  style={{ color: "var(--nera-text-on-dark-muted)" }}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  </span>
                  <span className="group-hover:text-indigo-300 transition-colors">hello@nera.tech</span>
                </a>
              </li>
            </ul>
          </div>

          {/* ── Link columns ── */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "var(--nera-text-on-dark-muted)", fontFamily: "var(--font-mono)", opacity: 0.5 }}
              >
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "var(--nera-text-on-dark-muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Technology tags ── */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--nera-text-on-dark-muted)", fontFamily: "var(--font-mono)", opacity: 0.5 }}
            >
              Technology
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {techTags.map((tag) => (
                <span
                  key={tag.label}
                  className="text-xs px-2 py-0.5 rounded-md"
                  style={{
                    color: tag.color,
                    background: `${tag.color}12`,
                    border: `1px solid ${tag.color}22`,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.63rem",
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t text-xs"
          style={{ borderColor: "rgba(255,255,255,0.05)", color: "var(--nera-text-on-dark-muted)" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", opacity: 0.45 }}>
            © {new Date().getFullYear()} NERA — New Embark Robotic Age
          </span>
          <span style={{ opacity: 0.35 }}>
            Built for curious minds and engineering problems.
          </span>
        </div>
      </div>
    </footer>
  );
}
