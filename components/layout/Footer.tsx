"use client";

import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { NERALogoOnDark } from "@/components/brand/NERALogo";

const cols = {
  Platform: [
    { l: "Simulators",  h: "/simulators" },
    { l: "Robotics",    h: "/robotics" },
    { l: "PCB Lab",     h: "/pcb-lab" },
    { l: "Projects",    h: "/projects" },
    { l: "Research",    h: "/research" },
    { l: "Learning",    h: "/learn" },
    { l: "Services",    h: "/services" },
    { l: "About",       h: "/about" },
  ],
  "What We Build": [
    { l: "Simulator Software",  h: "/services" },
    { l: "Robotics R&D",        h: "/services" },
    { l: "PCB Design",          h: "/services" },
    { l: "Embedded Systems",    h: "/services" },
    { l: "Custom Software",     h: "/services" },
    { l: "Research Support",    h: "/services" },
  ],
};

const tags = [
  { l: "Electronics",  c: "#22d3ee" }, { l: "Robotics",   c: "#fbbf24" },
  { l: "Simulation",   c: "#a78bfa" }, { l: "Embedded",   c: "#22d3ee" },
  { l: "Research",     c: "#34d399" }, { l: "Education",  c: "#818cf8" },
  { l: "PCB Design",   c: "#22d3ee" }, { l: "Firmware",   c: "#fbbf24" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#090e1a", color: "#e2e8f0" }}>
      <div className="absolute inset-0 bg-grid-navy pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.5),rgba(124,58,237,0.4),transparent)" }} />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">

          {/* Brand — logo on dark uses white pill */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              {/* White pill so the logo's white background is preserved on dark footer */}
              <NERALogoOnDark height={44} href="/" />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-[22ch]" style={{ color: "#475569" }}>
              New Embark Robotic Age.<br />
              Where ideas become interactive technology.
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href="https://wa.me/919104703696" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm group transition-colors hover:text-green-400"
                  style={{ color: "#475569" }}>
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.15)" }}>
                    <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                  </span>
                  WhatsApp NERA
                </a>
              </li>
              <li>
                <a href="mailto:hello@nera.tech"
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-indigo-400"
                  style={{ color: "#475569" }}>
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  </span>
                  hello@nera.tech
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "#334155", fontFamily: "var(--f-mono)" }}>{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.l}>
                    <Link href={link.h} className="text-sm transition-colors hover:text-white"
                      style={{ color: "#475569" }}>{link.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Tech tags */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#334155", fontFamily: "var(--f-mono)" }}>Technology</h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t.l} className="text-xs px-2 py-0.5 rounded-md"
                  style={{ color: t.c, background: `${t.c}10`, border: `1px solid ${t.c}20`,
                    fontFamily: "var(--f-mono)", fontSize: "0.63rem" }}>
                  {t.l}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t text-xs"
          style={{ borderColor: "rgba(255,255,255,0.04)", color: "#334155" }}>
          <span style={{ fontFamily: "var(--f-mono)" }}>
            © {new Date().getFullYear()} NERA — New Embark Robotic Age
          </span>
          <span style={{ opacity: 0.5 }}>Built for curious minds and engineering problems.</span>
        </div>
      </div>
    </footer>
  );
}
