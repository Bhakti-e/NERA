"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function PCBTeaser() {
  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: "var(--nera-surface-deep)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.5), transparent)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--nera-accent-cyan)" }}
            >
              Interactive Technology
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--nera-text-on-dark)",
              }}
            >
              Enter the{" "}
              <span style={{ color: "var(--nera-accent-cyan)" }}>PCB Lab</span>
            </h2>
            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: "var(--nera-text-on-dark-muted)" }}
            >
              Rotate, zoom, click components. Watch power and signals travel
              through real circuit traces. This is how electronics should be learned.
            </p>

            {/* Signal flow preview */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--nera-text-on-dark-muted)" }}>
                Signal Flow
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {["Power", "Sensor", "MCU", "Processing", "Output"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        background: "rgba(6,182,212,0.1)",
                        borderColor: "rgba(6,182,212,0.3)",
                        color: "var(--nera-accent-cyan)",
                      }}
                    >
                      {step}
                    </motion.span>
                    {i < 4 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.1 }}
                        style={{ color: "rgba(6,182,212,0.5)" }}
                        className="text-xs"
                      >
                        →
                      </motion.span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pcb-lab"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ background: "var(--nera-accent-cyan)", color: "#0d0d16" }}
              >
                <Zap className="w-4 h-4" />
                Open PCB Lab
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all hover:border-cyan-400"
                style={{
                  borderColor: "rgba(6,182,212,0.3)",
                  color: "var(--nera-text-on-dark-muted)",
                }}
              >
                Build a Simulator
              </Link>
            </div>
          </motion.div>

          {/* Right: visual PCB preview illustration */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div
              className="aspect-square max-w-sm mx-auto rounded-2xl border relative overflow-hidden"
              style={{
                background: "rgba(6,182,212,0.04)",
                borderColor: "rgba(6,182,212,0.2)",
              }}
            >
              {/* PCB SVG Illustration */}
              <svg
                viewBox="0 0 320 320"
                className="w-full h-full p-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Board */}
                <rect x="20" y="20" width="280" height="280" rx="8"
                  fill="rgba(6,182,212,0.05)" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />

                {/* Traces */}
                <path d="M60 160 H120 M120 160 V100 H180 M180 100 H220"
                  stroke="rgba(6,182,212,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M60 200 H100 V240 H200 M200 240 V200 H260"
                  stroke="rgba(79,70,229,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M160 160 V200"
                  stroke="rgba(16,185,129,0.5)" strokeWidth="2" fill="none" />

                {/* Components */}
                {/* MCU */}
                <rect x="130" y="130" width="60" height="60" rx="4"
                  fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" />
                <text x="160" y="158" textAnchor="middle" fill="rgba(6,182,212,0.9)"
                  fontSize="8" fontFamily="monospace">MCU</text>
                <text x="160" y="170" textAnchor="middle" fill="rgba(6,182,212,0.6)"
                  fontSize="6" fontFamily="monospace">ATmega</text>

                {/* Sensor */}
                <rect x="35" y="140" width="30" height="20" rx="3"
                  fill="rgba(79,70,229,0.15)" stroke="rgba(79,70,229,0.6)" strokeWidth="1.5" />
                <text x="50" y="153" textAnchor="middle" fill="rgba(167,163,255,0.9)"
                  fontSize="6" fontFamily="monospace">SEN</text>

                {/* Power */}
                <rect x="35" y="50" width="30" height="30" rx="3"
                  fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" />
                <text x="50" y="68" textAnchor="middle" fill="rgba(251,191,36,0.9)"
                  fontSize="6" fontFamily="monospace">VCC</text>

                {/* LED */}
                <circle cx="260" cy="160" r="12"
                  fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" />
                <text x="260" y="164" textAnchor="middle" fill="rgba(52,211,153,0.9)"
                  fontSize="6" fontFamily="monospace">LED</text>

                {/* Capacitors */}
                <rect x="110" y="240" width="12" height="20" rx="2"
                  fill="rgba(244,63,94,0.15)" stroke="rgba(244,63,94,0.4)" strokeWidth="1" />
                <rect x="128" y="240" width="12" height="20" rx="2"
                  fill="rgba(244,63,94,0.15)" stroke="rgba(244,63,94,0.4)" strokeWidth="1" />

                {/* Resistors */}
                <rect x="230" y="130" width="20" height="8" rx="2"
                  fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.4)" strokeWidth="1" />
                <rect x="230" y="148" width="20" height="8" rx="2"
                  fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.4)" strokeWidth="1" />

                {/* Animated pulse dots */}
                <circle cx="95" cy="160" r="3" fill="rgba(6,182,212,0.8)">
                  <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="240" r="3" fill="rgba(79,70,229,0.8)">
                  <animate attributeName="opacity" values="1;0.2;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </circle>

                {/* Corner pads */}
                {[[30,30],[290,30],[30,290],[290,290]].map(([x,y], i) => (
                  <circle key={i} cx={x} cy={y} r="4"
                    fill="rgba(6,182,212,0.3)" stroke="rgba(6,182,212,0.5)" strokeWidth="1" />
                ))}
              </svg>

              {/* Glow overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Caption */}
            <p
              className="text-center text-sm mt-4"
              style={{ color: "var(--nera-text-on-dark-muted)" }}
            >
              Imagine learning electronics like this.{" "}
              <Link
                href="/pcb-lab"
                className="underline transition-colors hover:text-cyan-300"
                style={{ color: "var(--nera-accent-cyan)" }}
              >
                Open the Lab →
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
