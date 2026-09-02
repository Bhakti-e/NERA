"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Cpu, CircuitBoard, Bot, Code2, BookOpen } from "lucide-react";

const services = [
  { icon: Globe,        label: "Website / Web App",    c: "#4f46e5" },
  { icon: Cpu,          label: "Custom Simulator",     c: "#7c3aed" },
  { icon: CircuitBoard, label: "PCB Designing",        c: "#0891b2" },
  { icon: Bot,          label: "Robotics / Embedded",  c: "#d97706" },
  { icon: Code2,        label: "Custom Software",      c: "#059669" },
  { icon: BookOpen,     label: "Research Support",     c: "#e11d48" },
];

export default function ServicesCTA() {
  return (
    <section className="py-24 relative" style={{ background: "#ffffff" }}>
      <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--c-blue)", fontFamily: "var(--f-mono)" }}>What NERA Builds</p>
            <h2 className="font-bold mb-5 leading-tight"
              style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2rem,4vw,2.8rem)", color: "var(--t-primary)", letterSpacing: "-0.02em" }}>
              Have an idea?<br />Let&apos;s build it.
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-sm" style={{ color: "var(--t-secondary)" }}>
              Tell NERA what you need. Select a service, fill a short brief,
              and we connect directly — no account required.
            </p>
            <Link href="/services" className="btn-primary">
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.12 }}>
            <div className="grid grid-cols-2 gap-2.5">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.label}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.05 }}>
                    <Link href="/services"
                      className="flex items-center gap-3 p-3.5 rounded-xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${s.c}10`, border: `1px solid ${s.c}20` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: s.c }} />
                      </div>
                      <span className="text-xs font-semibold leading-tight group-hover:text-blue-600 transition-colors"
                        style={{ color: "var(--t-primary)", fontFamily: "var(--f-display)" }}>
                        {s.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
