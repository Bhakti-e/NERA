"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ── Sci-fi circuit lines on a light surface ───────── */
function HeroCircuits() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hero-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0L0 0 0 48" fill="none" stroke="rgba(37,99,235,0.04)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />

      {/* Corner circuit decorations */}
      <g stroke="rgba(37,99,235,0.14)" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M 0 96 H 48 V 48 H 96" />
        <path d="M 0 140 H 24 V 120 H 72" />
        <circle cx="96" cy="48" r="3" fill="rgba(37,99,235,0.3)" />
        <circle cx="72" cy="120" r="2" fill="rgba(124,58,237,0.4)" />
      </g>
      <g stroke="rgba(124,58,237,0.1)" strokeWidth="1.5" fill="none" strokeLinecap="round"
        style={{ transform: "scaleX(-1)", transformOrigin: "50%" }}>
        <path d="M 0 96 H 48 V 48 H 96" />
        <circle cx="96" cy="48" r="3" fill="rgba(124,58,237,0.3)" />
      </g>

      {/* Animated blue signal */}
      <path
        d="M -20 220 H 180 V 140 H 420 V 180 H 720"
        fill="none" stroke="rgba(37,99,235,0.45)" strokeWidth="1.5" strokeLinecap="round"
        className="signal-path"
      />
      {/* Animated purple signal */}
      <path
        d="M 900 80 H 680 V 160 H 400 V 200 H 120"
        fill="none" stroke="rgba(124,58,237,0.35)" strokeWidth="1.5" strokeLinecap="round"
        className="signal-path signal-path-delay-1"
      />
      {/* Animated cyan signal */}
      <path
        d="M 300 600 V 440 H 550 V 360 H 780"
        fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="1" strokeLinecap="round"
        className="signal-path signal-path-delay-2"
      />
    </svg>
  );
}

/* ── Domain orbit satellites ───────────────────────── */
const satellites = [
  { label: "PCB",    angle: 0,   color: "#0891b2", bg: "rgba(8,145,178,0.1)"  },
  { label: "R&D",    angle: 60,  color: "#d97706", bg: "rgba(217,119,6,0.1)"  },
  { label: "SIM",    angle: 120, color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
  { label: "CODE",   angle: 180, color: "#4f46e5", bg: "rgba(79,70,229,0.1)"  },
  { label: "EDU",    angle: 240, color: "#059669", bg: "rgba(5,150,105,0.1)"  },
  { label: "RES",    angle: 300, color: "#e11d48", bg: "rgba(225,29,72,0.1)"  },
];

function TechOrb({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-72 h-72">
      {/* Outer orbital ring */}
      <div
        className="absolute inset-0 rounded-full border border-dashed"
        style={{ borderColor: "rgba(79,70,229,0.15)" }}
      />
      {/* Inner glow ring */}
      <div
        className="absolute w-40 h-40 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)",
          border: "1px solid rgba(79,70,229,0.1)",
        }}
      />

      {/* Satellites */}
      {satellites.map((sat, i) => {
        const rad = (sat.angle * Math.PI) / 180;
        const r = 118;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <motion.div
            key={sat.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.08, type: "spring" }}
            className="absolute flex items-center justify-center w-11 h-11 rounded-xl"
            style={{
              left: `calc(50% + ${x}px - 22px)`,
              top: `calc(50% + ${y}px - 22px)`,
              background: sat.bg,
              border: `1.5px solid ${sat.color}30`,
            }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: sat.color, fontFamily: "var(--font-mono)", fontSize: "0.62rem" }}
            >
              {sat.label}
            </span>
          </motion.div>
        );
      })}

      {/* Centre orb */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className={`relative w-20 h-20 rounded-2xl flex items-center justify-center ${reduced ? "" : "nera-probe-float"}`}
        style={{
          background: "linear-gradient(135deg, #2563eb15, #7c3aed20)",
          border: "1.5px solid rgba(79,70,229,0.25)",
          boxShadow: "0 0 40px rgba(79,70,229,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Circuit N */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <path d="M 8 36 L 8 10 L 26 32 L 26 10"
            stroke="url(#hero-cop)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 26 10 L 34 10 L 34 24" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" />
          <circle cx="34" cy="24" r="2.5" fill="#0891b2">
            {!reduced && <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />}
          </circle>
          <defs>
            <linearGradient id="hero-cop" x1="8" y1="10" x2="26" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#b87333" />
              <stop offset="100%" stopColor="#1e3a5f" />
            </linearGradient>
          </defs>
        </svg>

        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-2xl border pulse-ring"
          style={{ borderColor: "rgba(79,70,229,0.2)" }}
        />
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--nera-surface-page)" }}
    >
      <HeroCircuits />

      {/* Very subtle radial tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,70,229,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: text ── */}
        <div className="text-center lg:text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-7"
          >
            <span
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                borderColor: "rgba(37,99,235,0.2)",
                background: "rgba(37,99,235,0.06)",
                color: "#1d4ed8",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full glow-pulse"
                style={{ background: "var(--nera-cyan)" }}
              />
              NEW EMBARK ROBOTIC AGE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-bold leading-[1.06] tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
              color: "var(--nera-text-primary)",
            }}
          >
            Where ideas become{" "}
            <span
              className="relative"
              style={{
                background: "var(--nera-cta-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              interactive
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="3"
                viewBox="0 0 200 3"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 1.5 Q50 0 100 1.5 Q150 3 200 1.5"
                  stroke="rgba(37,99,235,0.35)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>{" "}
            technology.
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mb-10"
            style={{
              color: "var(--nera-text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.14em",
            }}
          >
            Build&nbsp;·&nbsp;Simulate&nbsp;·&nbsp;Research&nbsp;·&nbsp;Experiment&nbsp;·&nbsp;Learn
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
          >
            <Link href="/#explore" className="nera-btn-primary">
              Explore NERA
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm border transition-all duration-200 hover:scale-105 hover:border-indigo-300 hover:text-indigo-600"
              style={{
                borderColor: "rgba(79,70,229,0.25)",
                color: "var(--nera-indigo)",
                background: "rgba(79,70,229,0.04)",
              }}
            >
              Start a Project
            </Link>
          </motion.div>

          {/* Domain chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-10"
          >
            {[
              { label: "Simulators",    color: "#7c3aed" },
              { label: "Robotics",      color: "#d97706" },
              { label: "PCB & Embedded",color: "#0891b2" },
              { label: "Research",      color: "#059669" },
              { label: "Software",      color: "#4f46e5" },
            ].map((d) => (
              <span
                key={d.label}
                className="px-2.5 py-1 rounded-full text-xs font-medium border"
                style={{
                  color: d.color,
                  borderColor: `${d.color}22`,
                  background: `${d.color}08`,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                }}
              >
                {d.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Tech orb ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="hidden lg:flex items-center justify-center"
        >
          <TechOrb reduced={reduced} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ color: "var(--nera-text-muted)" }}
      >
        <span
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.14em" }}
        >
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.7 }}
        >
          <ChevronDown className="w-4 h-4 opacity-40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
