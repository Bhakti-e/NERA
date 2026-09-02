"use client";

import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Simulators", href: "/simulators" },
    { label: "PCB Lab", href: "/pcb-lab" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ],
  "What We Build": [
    { label: "Simulator Software", href: "/services" },
    { label: "Robotics R&D", href: "/services" },
    { label: "PCB Design", href: "/services" },
    { label: "Embedded Systems", href: "/services" },
    { label: "Custom Software", href: "/services" },
    { label: "Research Support", href: "/services" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--nera-surface-deep)", color: "var(--nera-text-on-dark)" }}
    >
      {/* Top line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.4), rgba(8,145,178,0.3), transparent)" }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 nera-grid-bg opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logomark */}
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <polygon points="16,2 28,9 28,23 16,30 4,23 4,9"
                  fill="rgba(79,70,229,0.15)" stroke="rgba(79,70,229,0.6)" strokeWidth="1.5" />
                <text x="16" y="20.5" textAnchor="middle" fontSize="9" fontWeight="700"
                  fontFamily="Space Grotesk, system-ui" fill="rgba(237,237,245,0.9)" letterSpacing="0.5">
                  N
                </text>
                <circle cx="16" cy="2" r="1.5" fill="#06b6d4" />
                <circle cx="28" cy="9" r="1.5" fill="#4f46e5" />
              </svg>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                NERA
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-[22ch]"
              style={{ color: "var(--nera-text-on-dark-muted)" }}>
              New Embark Robotic Age.<br />
              Where ideas become interactive technology.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="https://wa.me/919104703696"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm group transition-colors"
                style={{ color: "var(--nera-text-on-dark-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#4ade80"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--nera-text-on-dark-muted)"; }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                  <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                </div>
                WhatsApp NERA
              </a>
              <a
                href="mailto:hello@nera.tech"
                className="flex items-center gap-2.5 text-sm transition-colors"
                style={{ color: "var(--nera-text-on-dark-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--nera-text-on-dark)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--nera-text-on-dark-muted)"; }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(79,70,229,0.1)", border: "1px solid rgba(79,70,229,0.2)" }}>
                  <Mail className="w-3.5 h-3.5" style={{ color: "var(--nera-accent-primary)" }} />
                </div>
                hello@nera.tech
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "var(--nera-text-on-dark-muted)", fontFamily: "var(--font-mono)", opacity: 0.6 }}
              >
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "var(--nera-text-on-dark-muted)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--nera-text-on-dark)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--nera-text-on-dark-muted)"; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Domain tags column */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--nera-text-on-dark-muted)", fontFamily: "var(--font-mono)", opacity: 0.6 }}
            >
              Technology
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "Electronics", color: "#0891b2" },
                { label: "Robotics", color: "#d97706" },
                { label: "Simulation", color: "#7c3aed" },
                { label: "Embedded", color: "#0891b2" },
                { label: "Research", color: "#059669" },
                { label: "Education", color: "#4f46e5" },
                { label: "PCB Design", color: "#0891b2" },
                { label: "Firmware", color: "#d97706" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className="text-xs px-2 py-0.5 rounded-md"
                  style={{
                    color: tag.color,
                    background: `${tag.color}10`,
                    border: `1px solid ${tag.color}20`,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
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
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t text-xs"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            color: "var(--nera-text-on-dark-muted)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", opacity: 0.5 }}>
            © {new Date().getFullYear()} NERA — New Embark Robotic Age
          </span>
          <span style={{ opacity: 0.4 }}>
            Built for curious minds and engineering problems.
          </span>
        </div>
      </div>
    </footer>
  );
}
