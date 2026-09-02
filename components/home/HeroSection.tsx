"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* Lightweight circuit SVG background */
function CircuitBg() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id="g" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0L0 0 0 48" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      {/* Corner traces */}
      <g stroke="rgba(37,99,235,0.12)" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M0 80 H52 V40 H100" />
        <path d="M0 130 H28 V110 H76" />
        <circle cx="100" cy="40" r="3" fill="rgba(37,99,235,0.25)" />
        <circle cx="76" cy="110" r="2" fill="rgba(124,58,237,0.3)" />
      </g>
      <g stroke="rgba(124,58,237,0.1)" strokeWidth="1.5" fill="none" strokeLinecap="round"
        style={{ transform: "scaleX(-1)", transformOrigin: "50%" }}>
        <path d="M0 80 H52 V40 H100" />
        <circle cx="100" cy="40" r="3" fill="rgba(124,58,237,0.25)" />
      </g>
      {/* Animated signals */}
      <path d="M-20 240 H200 V140 H450 V190 H750"
        fill="none" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" strokeLinecap="round"
        className="sig" />
      <path d="M900 80 H700 V160 H420 V200 H120"
        fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" strokeLinecap="round"
        className="sig sig-d1" />
    </svg>
  );
}

/* Orbital ring visual */
function OrbitalRing({ reduced }: { reduced: boolean }) {
  const dots = [
    { label: "PCB",  a: 0,   c: "#0891b2" },
    { label: "R&D",  a: 60,  c: "#d97706" },
    { label: "SIM",  a: 120, c: "#7c3aed" },
    { label: "CODE", a: 180, c: "#4f46e5" },
    { label: "EDU",  a: 240, c: "#059669" },
    { label: "RES",  a: 300, c: "#e11d48" },
  ];
  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
      {/* Dashed ring */}
      <div className="absolute inset-0 rounded-full border border-dashed"
        style={{ borderColor: "rgba(79,70,229,0.15)" }} />
      {/* Satellites */}
      {dots.map((d) => {
        const r = (d.a * Math.PI) / 180;
        const R = 118;
        return (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + d.a / 800, type: "spring" }}
            className="absolute flex items-center justify-center w-10 h-10 rounded-xl text-xs font-bold"
            style={{
              left: `calc(50% + ${Math.cos(r) * R}px - 20px)`,
              top: `calc(50% + ${Math.sin(r) * R}px - 20px)`,
              color: d.c,
              background: `${d.c}12`,
              border: `1.5px solid ${d.c}28`,
              fontFamily: "var(--f-mono)",
              fontSize: "0.62rem",
            }}
          >
            {d.label}
          </motion.div>
        );
      })}
      {/* Centre */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
        className={`relative w-20 h-20 rounded-2xl flex items-center justify-center ${reduced ? "" : "float"}`}
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.15))",
          border: "1.5px solid rgba(79,70,229,0.2)",
          boxShadow: "0 0 40px rgba(79,70,229,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M7 34 L7 8 L24 30 L24 8"
            stroke="url(#hc)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 8 L32 8 L32 22" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="32" cy="22" r="2.5" fill="#0891b2">
            {!reduced && <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />}
          </circle>
          <defs>
            <linearGradient id="hc" x1="7" y1="8" x2="24" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#b87333" />
              <stop offset="100%" stopColor="#1e3a5f" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 rounded-2xl border pulse-ring"
          style={{ borderColor: "rgba(79,70,229,0.18)" }} />
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <CircuitBg />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,70,229,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-5 sm:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-7"
              style={{
                borderColor: "rgba(37,99,235,0.2)",
                background: "rgba(37,99,235,0.06)",
                color: "#1d4ed8",
                fontFamily: "var(--f-mono)",
                letterSpacing: "0.07em",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0891b2", animation: reduced ? "none" : "pulse-ring 2s ease-out infinite" }} />
              NEW EMBARK ROBOTIC AGE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-bold mb-5 leading-[1.06]"
              style={{
                fontFamily: "var(--f-display)",
                fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
                color: "#0d1117",
                letterSpacing: "-0.02em",
              }}
            >
              Where ideas become{" "}
              <span style={{
                background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                interactive
              </span>{" "}
              technology.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-9 text-base leading-relaxed max-w-lg"
              style={{ color: "#4b5563" }}
            >
              NERA builds simulators, robots, PCB systems, and software tools that
              make engineering tangible — for students, researchers, and builders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/#explore" className="btn-primary">
                Explore NERA <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-secondary">
                Start a Project
              </Link>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="hidden lg:flex justify-center"
          >
            <OrbitalRing reduced={reduced} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
