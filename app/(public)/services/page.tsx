"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceSelector from "@/components/services/ServiceSelector";
import ServiceForm from "@/components/services/ServiceForm";
import type { ServiceType } from "@/types";

export default function ServicesPage() {
  const [selected, setSelected] = useState<ServiceType | null>(null);

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--nera-surface-page)" }}>
      {/* Header */}
      <div
        className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ background: "var(--nera-surface-mid)" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(79,70,229,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "rgba(167,163,255,0.8)" }}
          >
            Let&apos;s Build Together
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)" }}
          >
            Get NERA Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg"
            style={{ color: "var(--nera-text-on-dark-muted)" }}
          >
            Select a service, fill in a few details, and we&apos;ll connect via WhatsApp.
            No account needed.
          </motion.p>
        </div>
      </div>

      {/* Form area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="rounded-2xl border p-6 sm:p-10"
          style={{
            background: "white",
            borderColor: "rgba(0,0,0,0.06)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
          }}
        >
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ServiceSelector selected={selected} onSelect={setSelected} />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ServiceForm serviceType={selected} onBack={() => setSelected(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
