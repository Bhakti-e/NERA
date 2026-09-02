"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceSelector from "@/components/services/ServiceSelector";
import ServiceForm from "@/components/services/ServiceForm";
import type { ServiceType } from "@/types";
import { CheckCircle } from "lucide-react";

const processSteps = [
  { n: "01", label: "Choose a service", desc: "Pick the category that fits your need" },
  { n: "02", label: "Fill the brief", desc: "A short, relevant form — nothing more" },
  { n: "03", label: "We connect", desc: "NERA responds via WhatsApp to discuss" },
];

export default function ServicesPage() {
  const [selected, setSelected] = useState<ServiceType | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--nera-surface-page)" }}>

      {/* ── Page hero ─────────────────────────────────── */}
      <div
        className="relative pt-28 pb-20 px-5 sm:px-8 overflow-hidden"
        style={{ background: "var(--nera-surface-mid)" }}
      >
        {/* Grid */}
        <div className="absolute inset-0 nera-grid-bg opacity-25 pointer-events-none" />
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(79,70,229,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Top line */}
        <div
          className="absolute bottom-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(79,70,229,0.3), transparent)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              color: "rgba(167,163,255,0.7)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Let&apos;s Build Together
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-bold mb-5"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.25rem)",
              color: "var(--nera-text-on-dark)",
              lineHeight: 1.08,
            }}
          >
            Start a Project with NERA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--nera-text-on-dark-muted)" }}
          >
            No account. No forms sent into the void.
            Choose what you need, fill in the brief, and NERA connects with you directly.
          </motion.p>

          {/* Process steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0"
          >
            {processSteps.map((step, i) => (
              <div key={step.n} className="flex items-center gap-3 sm:gap-0">
                <div className="flex items-center gap-2.5 sm:px-5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      background: "rgba(79,70,229,0.2)",
                      border: "1px solid rgba(79,70,229,0.4)",
                      color: "rgba(167,163,255,0.9)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {step.n}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold" style={{ color: "var(--nera-text-on-dark)" }}>
                      {step.label}
                    </div>
                    <div className="text-xs" style={{ color: "var(--nera-text-on-dark-muted)" }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
                {i < processSteps.length - 1 && (
                  <div
                    className="hidden sm:block w-8 h-px"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ── Left sidebar (visible when form is open) ── */}
          <AnimatePresence>
            {selected && (
              <motion.aside
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:block"
              >
                <div
                  className="rounded-2xl border p-6 sticky top-24"
                  style={{
                    background: "white",
                    borderColor: "rgba(0,0,0,0.06)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-5"
                    style={{
                      color: "var(--nera-text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Why NERA
                  </p>

                  <ul className="space-y-4">
                    {[
                      { label: "Direct communication", desc: "No ticket system. We talk on WhatsApp." },
                      { label: "Right questions only", desc: "Forms are tailored to your service type." },
                      { label: "No account needed", desc: "Submit a brief without registering." },
                      { label: "Fast response", desc: "We aim to respond the same day." },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-2.5">
                        <CheckCircle
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: "var(--nera-accent-green)" }}
                        />
                        <div>
                          <div
                            className="text-xs font-semibold"
                            style={{ color: "var(--nera-text-primary)" }}
                          >
                            {item.label}
                          </div>
                          <div
                            className="text-xs mt-0.5"
                            style={{ color: "var(--nera-text-muted)" }}
                          >
                            {item.desc}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-6 pt-5 border-t"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <p
                      className="text-xs"
                      style={{ color: "var(--nera-text-muted)" }}
                    >
                      Prefer to reach out directly?
                    </p>
                    <a
                      href="https://wa.me/919104703696"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold mt-1 inline-block transition-colors hover:text-green-600"
                      style={{ color: "#16a34a" }}
                    >
                      Open WhatsApp →
                    </a>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ── Main form card ─────────────────────────── */}
          <div className={selected ? "lg:col-span-2" : "lg:col-span-3"}>
            <div
              className="rounded-2xl border"
              style={{
                background: "white",
                borderColor: "rgba(0,0,0,0.06)",
                boxShadow: "var(--shadow-lifted)",
              }}
            >
              <AnimatePresence mode="wait">
                {!selected ? (
                  <motion.div
                    key="selector"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="p-7 sm:p-10"
                  >
                    <ServiceSelector selected={selected} onSelect={setSelected} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                    className="p-7 sm:p-10"
                  >
                    <ServiceForm
                      serviceType={selected}
                      onBack={() => setSelected(null)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
