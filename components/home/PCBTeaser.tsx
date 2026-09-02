"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

/* ── Animated PCB board illustration ─────────────────── */
function PCBIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow underneath */}
      <div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(8,145,178,0.6) 0%, transparent 70%)" }}
      />

      <div
        className="relative rounded-3xl overflow-hidden border"
        style={{
          background: "linear-gradient(135deg, #0a1520 0%, #071018 50%, #091520 100%)",
          borderColor: "rgba(8,145,178,0.25)",
          boxShadow: "0 0 0 1px rgba(8,145,178,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <svg viewBox="0 0 360 340" className="w-full" xmlns="http://www.w3.org/2000/svg">
          {/* PCB substrate grid */}
          <defs>
            <pattern id="pcb-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0 L0 0 0 20" fill="none" stroke="rgba(8,145,178,0.06)" strokeWidth="0.5" />
            </pattern>
            {/* Signal glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <rect width="360" height="340" fill="url(#pcb-grid)" />

          {/* Board outline */}
          <rect x="20" y="16" width="320" height="308" rx="10"
            fill="rgba(6,30,20,0.8)" stroke="rgba(8,145,178,0.2)" strokeWidth="1" />

          {/* ── Copper traces ── */}
          {/* Main horizontal bus */}
          <path d="M 55 170 H 130" stroke="rgba(8,145,178,0.35)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 180 170 H 255" stroke="rgba(8,145,178,0.35)" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Vertical connections */}
          <path d="M 55 100 V 170" stroke="rgba(79,70,229,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 305 100 V 170" stroke="rgba(79,70,229,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 180 100 V 250" stroke="rgba(16,185,129,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Right bus */}
          <path d="M 255 170 H 295 V 220" stroke="rgba(8,145,178,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 55 170 V 240" stroke="rgba(217,119,6,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Extra traces */}
          <path d="M 130 130 H 80 V 100" stroke="rgba(8,145,178,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 180 130 H 240 V 100" stroke="rgba(79,70,229,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* ── Animated signal pulses ── */}
          {/* Pulse 1: power → sensor */}
          <circle r="3" fill="rgba(8,145,178,0.9)" filter="url(#glow)">
            <animateMotion dur="2.2s" repeatCount="indefinite" begin="0s">
              <mpath href="#trace1" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <path id="trace1" d="M 55 100 V 170 H 130" fill="none" />

          {/* Pulse 2: sensor → MCU */}
          <circle r="3" fill="rgba(124,58,237,0.9)" filter="url(#glow)">
            <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.6s">
              <mpath href="#trace2" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite" begin="0.6s" />
          </circle>
          <path id="trace2" d="M 130 170 H 180" fill="none" />

          {/* Pulse 3: MCU → output */}
          <circle r="3.5" fill="rgba(16,185,129,0.9)" filter="url(#glow)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="1.2s">
              <mpath href="#trace3" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="1.2s" />
          </circle>
          <path id="trace3" d="M 180 170 H 255 H 295 V 220" fill="none" />

          {/* ── Components ── */}
          {/* MCU — center */}
          <g>
            <rect x="138" y="138" width="44" height="44" rx="5"
              fill="rgba(6,20,30,0.9)" stroke="rgba(8,145,178,0.7)" strokeWidth="1.5" />
            <rect x="142" y="142" width="36" height="36" rx="3"
              fill="rgba(8,145,178,0.08)" />
            {/* MCU pins */}
            {[145,153,161,169].map((y) => (
              <rect key={y} x="134" y={y} width="4" height="2.5" rx="1" fill="rgba(8,145,178,0.5)" />
            ))}
            {[145,153,161,169].map((y) => (
              <rect key={y} x="182" y={y} width="4" height="2.5" rx="1" fill="rgba(8,145,178,0.5)" />
            ))}
            {[145,153,161].map((x) => (
              <rect key={x} x={x} y="134" width="2.5" height="4" rx="1" fill="rgba(8,145,178,0.5)" />
            ))}
            <text x="160" y="157" textAnchor="middle" fill="rgba(8,145,178,0.95)" fontSize="7" fontFamily="monospace" fontWeight="bold">MCU</text>
            <text x="160" y="167" textAnchor="middle" fill="rgba(8,145,178,0.5)" fontSize="5.5" fontFamily="monospace">ATmega</text>
            {/* Active glow */}
            <rect x="138" y="138" width="44" height="44" rx="5" fill="none" stroke="rgba(8,145,178,0.3)" strokeWidth="3">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
            </rect>
          </g>

          {/* Sensor — left */}
          <g>
            <rect x="32" y="153" width="34" height="22" rx="4"
              fill="rgba(6,20,30,0.9)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.5" />
            <text x="49" y="166" textAnchor="middle" fill="rgba(167,139,250,0.9)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">SENSOR</text>
            <circle cx="32" cy="164" r="2.5" fill="rgba(124,58,237,0.6)" />
          </g>

          {/* Power regulator — top-left */}
          <g>
            <rect x="35" y="82" width="38" height="26" rx="4"
              fill="rgba(6,20,30,0.9)" stroke="rgba(217,119,6,0.6)" strokeWidth="1.5" />
            <text x="54" y="93" textAnchor="middle" fill="rgba(251,191,36,0.9)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">5V VCC</text>
            <text x="54" y="103" textAnchor="middle" fill="rgba(217,119,6,0.5)" fontSize="5" fontFamily="monospace">REG</text>
            {/* Power indicator */}
            <circle cx="67" cy="85" r="2.5" fill="rgba(217,119,6,0.8)">
              <animate attributeName="fill" values="rgba(217,119,6,0.8);rgba(251,191,36,1);rgba(217,119,6,0.8)" dur="1.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* LED output — right */}
          <g>
            <circle cx="295" cy="220" r="14" fill="rgba(6,20,30,0.9)" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" />
            <circle cx="295" cy="220" r="8" fill="rgba(16,185,129,0.15)">
              <animate attributeName="fill" values="rgba(16,185,129,0.1);rgba(16,185,129,0.35);rgba(16,185,129,0.1)" dur="1.8s" repeatCount="indefinite" begin="1.2s" />
            </circle>
            <circle cx="295" cy="220" r="4" fill="rgba(16,185,129,0.6)">
              <animate attributeName="fill" values="rgba(16,185,129,0.5);rgba(52,211,153,1);rgba(16,185,129,0.5)" dur="1.8s" repeatCount="indefinite" begin="1.2s" />
            </circle>
            <text x="295" y="243" textAnchor="middle" fill="rgba(52,211,153,0.7)" fontSize="6" fontFamily="monospace">OUTPUT</text>
          </g>

          {/* Capacitors */}
          <rect x="160" y="260" width="10" height="18" rx="2" fill="rgba(225,29,72,0.2)" stroke="rgba(225,29,72,0.4)" strokeWidth="1" />
          <rect x="176" y="260" width="10" height="18" rx="2" fill="rgba(225,29,72,0.2)" stroke="rgba(225,29,72,0.4)" strokeWidth="1" />
          <text x="173" y="290" textAnchor="middle" fill="rgba(225,29,72,0.4)" fontSize="5" fontFamily="monospace">C1 C2</text>

          {/* Resistors */}
          <rect x="220" y="83" width="18" height="8" rx="2" fill="rgba(217,119,6,0.2)" stroke="rgba(217,119,6,0.4)" strokeWidth="1" />
          <rect x="244" y="83" width="18" height="8" rx="2" fill="rgba(217,119,6,0.2)" stroke="rgba(217,119,6,0.4)" strokeWidth="1" />
          <text x="229" y="76" textAnchor="middle" fill="rgba(217,119,6,0.4)" fontSize="5" fontFamily="monospace">R1   R2</text>

          {/* Corner mounting holes */}
          {([[32,28],[328,28],[32,316],[328,316]] as [number,number][]).map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="rgba(0,0,0,0.5)" stroke="rgba(8,145,178,0.3)" strokeWidth="1" />
              <circle cx={x} cy={y} r="2" fill="rgba(8,145,178,0.2)" />
            </g>
          ))}

          {/* Top label */}
          <text x="180" y="12" textAnchor="middle" fill="rgba(8,145,178,0.3)" fontSize="6" fontFamily="monospace">NERA-PCB-DEV-v1.0</text>
        </svg>
      </div>
    </div>
  );
}

const signalSteps = [
  { label: "Power", color: "#d97706" },
  { label: "Sensor", color: "#7c3aed" },
  { label: "MCU", color: "#0891b2" },
  { label: "Process", color: "#0891b2" },
  { label: "Output", color: "#10b981" },
];

export default function PCBTeaser() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--nera-surface-deep)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 nera-grid-bg-cyan opacity-50 pointer-events-none" />

      {/* Top/bottom separator lines */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(8,145,178,0.4) 50%, transparent 100%)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(79,70,229,0.4) 50%, transparent 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — PCB illustration */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="order-2 lg:order-1"
          >
            <PCBIllustration />
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--nera-accent-cyan-bright)", fontFamily: "var(--font-mono)" }}
            >
              Interactive Technology
            </p>

            <h2
              className="font-bold leading-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nera-text-on-dark)",
              }}
            >
              Enter the{" "}
              <span style={{ color: "var(--nera-accent-cyan-bright)" }}>PCB Lab.</span>
              <br />
              <span className="opacity-60 text-2xl">See electronics think.</span>
            </h2>

            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--nera-text-on-dark-muted)" }}>
              Rotate a real circuit board. Click a component and read what it does.
              Hit &ldquo;See How It Works&rdquo; and watch signals travel through actual traces.
              This is how electronics should be learned.
            </p>

            {/* Signal flow */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--nera-text-on-dark-muted)", fontFamily: "var(--font-mono)", opacity: 0.6 }}>
                Signal path
              </p>
              <div className="flex items-center gap-0">
                {signalSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.12 }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border"
                      style={{
                        color: step.color,
                        borderColor: `${step.color}30`,
                        background: `${step.color}10`,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                      }}
                    >
                      {step.label}
                    </motion.div>
                    {i < signalSteps.length - 1 && (
                      <svg width="20" height="12" viewBox="0 0 20 12" className="shrink-0 mx-0.5" aria-hidden="true">
                        <path d="M 2 6 H 14 L 10 2 M 14 6 L 10 10" stroke="rgba(8,145,178,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs — SAME hrefs, redesigned buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/pcb-lab"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--nera-accent-cyan-bright)",
                  color: "#071018",
                  boxShadow: "0 4px 20px rgba(6,182,212,0.3)",
                }}
              >
                <Zap className="w-4 h-4" />
                Enter PCB Lab
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-200 hover:border-cyan-500/40"
                style={{
                  borderColor: "rgba(8,145,178,0.2)",
                  color: "var(--nera-text-on-dark-muted)",
                  background: "rgba(8,145,178,0.04)",
                }}
              >
                Build a Simulator
              </Link>
            </div>

            {/* Footer note */}
            <p className="mt-6 text-xs" style={{ color: "var(--nera-text-on-dark-muted)", opacity: 0.5 }}>
              Imagine learning electronics like this —<br />
              NERA builds interactive simulators for schools, colleges and research.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
