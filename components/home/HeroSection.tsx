"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

/* ── Animated circuit background ── */
function CircuitBg() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id="hgrid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0L0 0 0 48" fill="none" stroke="rgba(37,99,235,0.08)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hgrid)" />
      {/* Left corner traces */}
      <g stroke="rgba(37,99,235,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M 0 100 H 60 V 56 H 112" />
        <path d="M 0 160 H 32 V 130 H 80" />
        <circle cx="112" cy="56" r="3.5" fill="rgba(6,182,212,0.5)" />
        <circle cx="80" cy="130" r="2.5" fill="rgba(124,58,237,0.5)" />
      </g>
      {/* Right corner traces */}
      <g stroke="rgba(124,58,237,0.14)" strokeWidth="1.5" fill="none" strokeLinecap="round"
        style={{ transform: "scaleX(-1)", transformOrigin: "50%" }}>
        <path d="M 0 100 H 60 V 56 H 112" />
        <circle cx="112" cy="56" r="3.5" fill="rgba(124,58,237,0.4)" />
      </g>
      {/* Animated signal paths */}
      <path d="M -20 260 H 220 V 150 H 480 V 200 H 800"
        fill="none" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" strokeLinecap="round"
        className="sig" />
      <path d="M 1000 80 H 760 V 170 H 460 V 210 H 140"
        fill="none" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" strokeLinecap="round"
        className="sig sig-d1" />
      <path d="M 300 700 V 500 H 600 V 380 H 850"
        fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="1" strokeLinecap="round"
        className="sig sig-d2" />
    </svg>
  );
}

/* ── NERA Tech Core — the scroll guide object ── */
function TechCore({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative" style={{ width: 320, height: 320 }} aria-hidden="true">
      {/* Outer spinning ring */}
      <div
        className="absolute inset-0 rounded-full border border-dashed"
        style={{
          borderColor: "rgba(37,99,235,0.12)",
          animation: reduced ? "none" : "spin-slow 30s linear infinite",
        }}
      />
      {/* Mid ring */}
      <div
        className="absolute rounded-full border border-dashed"
        style={{
          inset: 28,
          borderColor: "rgba(124,58,237,0.15)",
          animation: reduced ? "none" : "spin-slow 20s linear infinite reverse",
        }}
      />

      {/* Domain satellites */}
      {[
        { label: "PCB",  angle: 0,   color: "#06b6d4", r: 130 },
        { label: "R&D",  angle: 51,  color: "#d97706", r: 130 },
        { label: "SIM",  angle: 103, color: "#7c3aed", r: 130 },
        { label: "CODE", angle: 154, color: "#4f46e5", r: 130 },
        { label: "EDU",  angle: 205, color: "#10b981", r: 130 },
        { label: "RES",  angle: 257, color: "#f43f5e", r: 130 },
        { label: "MECH", angle: 308, color: "#d97706", r: 130 },
      ].map((sat, i) => {
        const rad = (sat.angle * Math.PI) / 180;
        return (
          <motion.div
            key={sat.label}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 200 }}
            className="absolute flex items-center justify-center rounded-xl"
            style={{
              width: 44,
              height: 44,
              left: `calc(50% + ${Math.cos(rad) * sat.r}px - 22px)`,
              top: `calc(50% + ${Math.sin(rad) * sat.r}px - 22px)`,
              background: `${sat.color}14`,
              border: `1.5px solid ${sat.color}35`,
              boxShadow: `0 0 16px ${sat.color}20`,
              color: sat.color,
              fontFamily: "var(--f-mono)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {sat.label}
          </motion.div>
        );
      })}

      {/* Connection lines from centre to satellites */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[0, 51, 103, 154, 205, 257, 308].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const R = 107;
          const cx = 160 + Math.cos(rad) * R;
          const cy = 160 + Math.sin(rad) * R;
          const colors = ["#06b6d4","#d97706","#7c3aed","#4f46e5","#10b981","#f43f5e","#d97706"];
          return (
            <line key={i} x1="160" y1="160" x2={cx} y2={cy}
              stroke={colors[i]} strokeWidth="0.8" strokeOpacity="0.2" />
          );
        })}
      </svg>

      {/* Centre core */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 160 }}
        className={`absolute flex items-center justify-center rounded-2xl ${reduced ? "" : "float"}`}
        style={{
          width: 88,
          height: 88,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(124,58,237,0.2) 100%)",
          border: "1.5px solid rgba(37,99,235,0.3)",
          boxShadow: "0 0 48px rgba(37,99,235,0.2), 0 0 24px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Circuit N mark */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <path d="M 8 38 L 8 8 L 28 34 L 28 8"
            stroke="url(#nc)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 28 8 L 36 8 L 36 24"
            stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="24" r="3" fill="#06b6d4">
            {!reduced && <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />}
          </circle>
          <defs>
            <linearGradient id="nc" x1="8" y1="8" x2="28" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#b87333" />
              <stop offset="100%" stopColor="#1e3a5f" />
            </linearGradient>
          </defs>
        </svg>
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-2xl border pulse-ring"
          style={{ borderColor: "rgba(37,99,235,0.25)" }} />
        <div className="absolute inset-0 rounded-2xl border pulse-ring"
          style={{ borderColor: "rgba(124,58,237,0.2)", animationDelay: "0.8s" }} />
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const coreY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const coreOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <CircuitBg />

      {/* Radial glow behind content */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% 40%, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />

      {/* Ambient bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(37,99,235,0.04), transparent)" }} />

      <div className="relative z-10 w-full nera-wrap pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Text ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8"
              style={{
                borderColor: "rgba(37,99,235,0.3)",
                background: "rgba(37,99,235,0.08)",
                color: "rgba(147,197,253,0.9)",
                fontFamily: "var(--f-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full glow-breathe"
                style={{ background: "#06b6d4", boxShadow: "0 0 6px #06b6d4" }} />
              NEW EMBARK ROBOTIC AGE
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-bold mb-5 leading-[1.04]"
              style={{
                fontFamily: "var(--f-display)",
                fontSize: "clamp(2.4rem, 5.2vw, 4rem)",
                color: "var(--tx)",
                letterSpacing: "-0.025em",
              }}
            >
              Where ideas become{" "}
              <span className="text-gradient">interactive</span>
              {" "}technology.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10 leading-relaxed"
              style={{ color: "var(--tx-2)", fontSize: "1.05rem", maxWidth: "46ch" }}
            >
              NERA engineers simulators, robotics prototypes, PCB systems, and
              interactive software that make technology learnable — for students,
              researchers, and builders.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/#explore" className="btn-primary">
                Explore NERA <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-secondary">
                Start a Project
              </Link>
            </motion.div>

            {/* Domain chips */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2 mt-10"
            >
              {[
                { l: "Simulators",     c: "#7c3aed" },
                { l: "Robotics",       c: "#d97706" },
                { l: "PCB & Embedded", c: "#06b6d4" },
                { l: "Research",       c: "#10b981" },
                { l: "Software",       c: "#4f46e5" },
              ].map((d) => (
                <span key={d.l} className="px-2.5 py-1 rounded-full text-xs border"
                  style={{
                    color: d.c,
                    borderColor: `${d.c}28`,
                    background: `${d.c}0e`,
                    fontFamily: "var(--f-mono)",
                    fontSize: "0.68rem",
                  }}>
                  {d.l}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Visual (scroll-guided) ── */}
          <motion.div
            style={{ y: coreY, opacity: coreOpacity }}
            className="hidden lg:flex justify-center items-center"
          >
            <TechCore reduced={reduced} />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--tx-3)" }}
      >
        <span style={{ fontFamily: "var(--f-mono)", fontSize: "0.6rem", letterSpacing: "0.15em" }}>
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: "rgba(37,99,235,0.7)" }} />
        </motion.div>
      </motion.div>

      {/* Bottom sep */}
      <div className="absolute bottom-0 left-0 right-0 sep-line" />
    </section>
  );
}
