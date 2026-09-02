"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Cpu, Activity } from "lucide-react";

const items = [
  { label: "Micro Hexapod",       cat: "Microrobotics",       status: "Prototype", icon: Cpu,      c: "#0891b2" },
  { label: "Quadruped Platform",  cat: "Biomimetic Robotics", status: "Research",  icon: Bot,      c: "#7c3aed" },
  { label: "Navigation Module",   cat: "Embedded Systems",    status: "Active",    icon: Activity, c: "#059669" },
  { label: "Soft Gripper",        cat: "Robotic Prototypes",  status: "Prototype", icon: Bot,      c: "#d97706" },
];

export default function RoboticsTeaser() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--s-navy)" }}>
      <div className="absolute inset-0 bg-grid-navy pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 15% 50%, rgba(217,119,6,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--c-amber)", fontFamily: "var(--f-mono)" }}>NERA R&amp;D Lab</p>
            <h2 className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: "var(--f-display)", color: "var(--t-dark)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Robotics &amp; Research
            </h2>
          </div>
          <Link href="/robotics" className="btn-ghost btn-secondary-sm shrink-0">
            Explore Robotics Lab <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl border flex flex-col overflow-hidden transition-all duration-200 hover:border-amber-500/20"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="h-28 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${item.c}08, ${item.c}14)` }}>
                  <Icon className="w-10 h-10" style={{ color: `${item.c}50` }} />
                  <span className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded-md"
                    style={{ color: item.c, background: `${item.c}12`, border: `1px solid ${item.c}20`, fontFamily: "var(--f-mono)", fontSize: "0.6rem" }}>
                    {item.status}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs mb-1" style={{ color: "var(--t-dark-muted)", fontFamily: "var(--f-mono)", fontSize: "0.62rem" }}>{item.cat}</p>
                  <h3 className="font-semibold text-sm" style={{ fontFamily: "var(--f-display)", color: "var(--t-dark)" }}>{item.label}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-xs text-center"
          style={{ color: "var(--t-dark-muted)", opacity: 0.5 }}
        >
          Real photographs and detailed records will be published as builds progress.
        </motion.p>
      </div>
    </section>
  );
}
