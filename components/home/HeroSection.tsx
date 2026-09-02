"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ── NERA Probe — the scroll companion ───────────────── */
function NERAProbe({ reduced }: { reduced: boolean }) {
  return (
    <div
      className={reduced ? "" : "nera-probe-float"}
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 0 20px rgba(79,70,229,0.4))" }}
    >
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
        {/* Outer ring */}
        <circle cx="48" cy="48" r="44" stroke="rgba(79,70,229,0.2)" strokeWidth="1" strokeDasharray="4 4" />
        {/* Body */}
        <polygon points="48,14 68,26 68,50 48,62 28,50 28,26"
          fill="rgba(79,70,229,0.12)" stroke="rgba(79,70,229,0.6)" strokeWidth="1.5" />
        {/* Core */}
        <circle cx="48" cy="38" r="8" fill="rgba(79,70,229,0.3)" stroke="#4f46e5" strokeWidth="1.5" />
        <circle cx="48" cy="38" r="3.5" fill="#4f46e5" />
        {/* Arm left */}
        <line x1="28" y1="38" x2="20" y2="34" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="33" r="2.5" fill="rgba(6,182,212,0.5)" stroke="#06b6d4" strokeWidth="1" />
        {/* Arm right */}
        <line x1="68" y1="38" x2="76" y2="34" stroke="rgba(124,58,237,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="78" cy="33" r="2.5" fill="rgba(124,58,237,0.5)" stroke="#7c3aed" strokeWidth="1" />
        {/* Tail / thruster */}
        <rect x="44" y="62" width="8" height="14" rx="3" fill="rgba(245,158,11,0.3)" stroke="rgba(245,158,11,0.6)" strokeWidth="1" />
        <rect x="46" y="76" width="4" height="6" rx="2" fill="rgba(245,158,11,0.5)" />
        {/* Sensor dot */}
        <circle cx="48" cy="14" r="3" fill="rgba(6,182,212,0.8)">
          {!reduced && <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />}
        </circle>
        {/* Pulse ring */}
        <circle cx="48" cy="38" r="14" fill="none" stroke="rgba(79,70,229,0.3)" strokeWidth="1">
          {!reduced && <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />}
          {!reduced && <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />}
        </circle>
      </svg>
    </div>
  );
}

/* ── Animated engineering circuit lines ──────────────── */
function HeroCircuitLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0 L0 0 0 56" fill="none" stroke="rgba(79,70,229,0.07)" strokeWidth="0.5" />
        </pattern>
        {/* Signal paths */}
        <path id="sig1" d="M -20 200 H 150 V 120 H 400 V 180 H 600" />
        <path id="sig2" d="M 800 80 H 600 V 160 H 300 V 240 H 100" />
        <path id="sig3" d="M 200 600 V 420 H 500 V 340 H 700 V 420 H 900" />
      </defs>

      {/* Grid */}
      <rect width="100%" height="100%" fill="url(#hero-grid)" />

      {/* Corner decorative circuit traces */}
      <g stroke="rgba(79,70,229,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M 0 80 H 40 V 40 H 80" />
        <path d="M 0 120 H 20 V 100 H 60" />
        <circle cx="80" cy="40" r="3" fill="rgba(79,70,229,0.4)" />
        <circle cx="60" cy="100" r="2" fill="rgba(6,182,212,0.5)" />
      </g>
      <g stroke="rgba(6,182,212,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round"
        transform="translate(100vw, 0) scale(-1,1)">
        <path d="M 0 80 H 40 V 40 H 80" />
        <path d="M 0 120 H 20 V 100 H 60" />
        <circle cx="80" cy="40" r="3" fill="rgba(6,182,212,0.4)" />
      </g>

      {/* Animated signal lines */}
      <path
        d="M -20 200 H 150 V 120 H 400 V 180 H 700"
        fill="none" stroke="rgba(79,70,229,0.6)" strokeWidth="1.5" strokeLinecap="round"
        className="signal-path"
      />
      <path
        d="M 900 100 H 650 V 160 H 350 V 220 H 80"
        fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" strokeLinecap="round"
        className="signal-path signal-path-delay-1"
      />
      <path
        d="M 200 700 V 480 H 500 V 380 H 750"
        fill="none" stroke="rgba(124,58,237,0.4)" strokeWidth="1" strokeLinecap="round"
        className="signal-path signal-path-delay-2"
      />
    </svg>
  );
}

export default function HeroSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--nera-surface-mid)" }}
    >
      <HeroCircuitLines />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,70,229,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: text */}
        <div className="text-center lg:text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 mb-7"
          >
            <span
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                borderColor: "rgba(79,70,229,0.35)",
                background: "rgba(79,70,229,0.08)",
                color: "rgba(180,175,255,0.9)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--nera-accent-cyan-bright)" }}
              />
              NEW EMBARK ROBOTIC AGE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-bold leading-[1.08] tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 6vw, 4.25rem)",
              color: "var(--nera-text-on-dark)",
            }}
          >
            Where ideas become{" "}
            <span
              className="relative"
              style={{ color: "var(--nera-accent-cyan-bright)" }}
            >
              interactive
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="3" viewBox="0 0 200 3"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 1.5 Q50 0 100 1.5 Q150 3 200 1.5" stroke="rgba(6,182,212,0.5)" strokeWidth="2" fill="none" />
              </svg>
            </span>{" "}
            technology.
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="text-base sm:text-lg mb-10 tracking-wider"
            style={{
              color: "var(--nera-text-on-dark-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              letterSpacing: "0.12em",
            }}
          >
            Build&nbsp;·&nbsp;Simulate&nbsp;·&nbsp;Research&nbsp;·&nbsp;Experiment&nbsp;·&nbsp;Learn
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
          >
            {/* Primary */}
            <Link
              href="/#explore"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--nera-accent-primary)",
                boxShadow: "0 4px 20px rgba(79,70,229,0.35)",
              }}
            >
              Explore NERA
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Secondary */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(237,237,245,0.85)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              Start a Project
            </Link>
          </motion.div>

          {/* Domain indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-10"
          >
            {[
              { label: "Simulators", color: "rgba(124,58,237,0.7)" },
              { label: "Robotics", color: "rgba(217,119,6,0.7)" },
              { label: "PCB & Embedded", color: "rgba(8,145,178,0.7)" },
              { label: "Research", color: "rgba(5,150,105,0.7)" },
              { label: "Software", color: "rgba(79,70,229,0.7)" },
            ].map((d) => (
              <span
                key={d.label}
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  color: d.color,
                  border: `1px solid ${d.color.replace("0.7", "0.25")}`,
                  background: d.color.replace("0.7", "0.06"),
                  fontFamily: "var(--font-mono)",
                }}
              >
                {d.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: NERA probe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative">
            {/* Outer orbital ring */}
            <div
              className="absolute inset-0 -m-16 rounded-full border"
              style={{ borderColor: "rgba(79,70,229,0.1)", borderStyle: "dashed" }}
            />
            {/* Domain satellites */}
            {[
              { label: "PCB", angle: 0, color: "#0891b2" },
              { label: "R&D", angle: 60, color: "#d97706" },
              { label: "SIM", angle: 120, color: "#7c3aed" },
              { label: "CODE", angle: 180, color: "#4f46e5" },
              { label: "EDU", angle: 240, color: "#059669" },
              { label: "RES", angle: 300, color: "#e11d48" },
            ].map((sat) => {
              const rad = (sat.angle * Math.PI) / 180;
              const r = 120;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <motion.div
                  key={sat.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + sat.angle / 600 }}
                  className="absolute flex items-center justify-center w-10 h-10 rounded-xl -translate-x-5 -translate-y-5"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    background: `${sat.color}15`,
                    border: `1px solid ${sat.color}40`,
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: sat.color, fontFamily: "var(--font-mono)" }}
                  >
                    {sat.label}
                  </span>
                </motion.div>
              );
            })}

            {/* Center probe */}
            <NERAProbe reduced={reduced} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ color: "var(--nera-text-on-dark-muted)" }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}
        >
          Scroll to Explore
        </span>
        <motion.div
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown className="w-4 h-4 opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
