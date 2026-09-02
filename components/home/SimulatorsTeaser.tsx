"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Simulator } from "@/types";

const statusCfg = {
  available:     { label: "Available",   c: "#059669", bg: "rgba(5,150,105,0.1)",  dot: "#10b981" },
  beta:          { label: "Beta",        c: "#d97706", bg: "rgba(217,119,6,0.1)",  dot: "#f59e0b" },
  "coming-soon": { label: "Coming Soon", c: "#6b7280", bg: "rgba(107,114,128,0.1)",dot: "#9ca3af" },
};
const catColor: Record<string,string> = {
  Electronics: "#0891b2", Robotics: "#d97706", "Digital Logic": "#7c3aed", Networking: "#4f46e5",
};

export default function SimulatorsTeaser({ simulators }: { simulators: Simulator[] }) {
  return (
    <section className="py-24 relative" style={{ background: "var(--s-tint)" }}>
      <div className="absolute inset-0 bg-grid-light opacity-60 pointer-events-none" />
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--c-purple)", fontFamily: "var(--f-mono)" }}>NERA Software</p>
            <h2 className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: "var(--f-display)", color: "var(--t-primary)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Simulators
            </h2>
          </div>
          <Link href="/simulators" className="btn-secondary btn-secondary-sm shrink-0">
            View All Simulators <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {simulators.map((sim, i) => {
            const st = statusCfg[sim.status];
            const ac = catColor[sim.category] ?? "#4f46e5";
            return (
              <motion.article
                key={sim.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: "rgba(0,0,0,0.055)", boxShadow: "var(--sh-card)" }}
              >
                {/* Preview */}
                <div className="h-36 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg,${ac}08,${ac}16)` }}>
                  <svg width="64" height="48" viewBox="0 0 64 48" fill="none" aria-hidden="true">
                    <rect x="14" y="10" width="36" height="28" rx="3" fill={`${ac}14`} stroke={ac} strokeWidth="1.5"/>
                    <line x1="2" y1="24" x2="14" y2="24" stroke={`${ac}60`} strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="50" y1="24" x2="62" y2="24" stroke={`${ac}60`} strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="32" cy="24" r="4.5" fill={`${ac}22`} stroke={ac} strokeWidth="1.5"/>
                  </svg>
                  <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: st.bg, color: st.c }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.dot }}/>{st.label}
                  </span>
                </div>
                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  <span className="text-xs px-2 py-0.5 rounded-md self-start mb-2"
                    style={{ color: ac, background: `${ac}10`, fontFamily: "var(--f-mono)", fontSize: "0.63rem" }}>
                    {sim.category}
                  </span>
                  <h3 className="font-bold text-base mb-2 leading-snug"
                    style={{ fontFamily: "var(--f-display)", color: "var(--t-primary)" }}>{sim.name}</h3>
                  <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: "var(--t-secondary)" }}>
                    {sim.shortDescription}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/simulators/${sim.slug}`}
                      className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-semibold border transition-all hover:border-indigo-300 hover:bg-indigo-50"
                      style={{ borderColor: "rgba(0,0,0,0.08)", color: "var(--t-secondary)" }}>
                      View Simulator <ArrowRight className="w-3 h-3"/>
                    </Link>
                    {sim.prototypeUrl ? (
                      <a href={sim.prototypeUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-semibold text-white hover:opacity-90 transition-all"
                        style={{ background: "var(--c-indigo)" }}>
                        Try Prototype <ExternalLink className="w-3 h-3"/>
                      </a>
                    ) : (
                      <Link href="/services?service=custom-simulator"
                        className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-semibold border transition-all hover:bg-indigo-50"
                        style={{ borderColor: "rgba(79,70,229,0.2)", color: "var(--c-indigo)" }}>
                        Get Licence
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
