"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-28 relative overflow-hidden text-center" style={{ background: "var(--s-navy)" }}>
      <div className="absolute inset-0 bg-grid-navy pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(37,99,235,0.1)" }}
      />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(79,70,229,0.4),transparent)" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "rgba(148,163,184,0.7)", fontFamily: "var(--f-mono)" }}>
          New Embark Robotic Age
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-bold mb-5"
          style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.5rem)", color: "var(--t-dark)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          Ready to embark?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.18 }}
          className="text-base mb-10 max-w-lg mx-auto" style={{ color: "var(--t-dark-muted)" }}>
          Explore our simulators, open the PCB Lab, or tell us what you want to build.
          The next step is just a message away.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.26 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/#explore" className="btn-primary">
            Explore NERA <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/services" className="btn-ghost">
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
