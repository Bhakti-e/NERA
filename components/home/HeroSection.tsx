"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--nera-surface-mid)" }}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,70,229,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,70,229,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--nera-accent-cyan)" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ background: "var(--nera-accent-violet)" }} />

      {/* Circuit trace decoration */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M20 100 H80 M80 100 V60 H140 M140 60 H180"
              stroke="#4f46e5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M20 140 H60 V180 H120 M120 180 V140 H180"
              stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="80" cy="100" r="3" fill="#4f46e5" />
            <circle cx="140" cy="60" r="3" fill="#06b6d4" />
            <circle cx="120" cy="180" r="3" fill="#4f46e5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-8"
          style={{
            borderColor: "rgba(79,70,229,0.4)",
            background: "rgba(79,70,229,0.1)",
            color: "rgba(167,163,255,0.9)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--nera-accent-cyan)] animate-pulse" />
          New Embark Robotic Age
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--nera-text-on-dark)",
          }}
        >
          Where ideas become{" "}
          <span
            className="relative inline-block"
            style={{ color: "var(--nera-accent-primary)" }}
          >
            interactive
            <span
              className="absolute bottom-1 left-0 right-0 h-0.5 rounded"
              style={{ background: "var(--nera-accent-cyan)" }}
            />
          </span>{" "}
          technology.
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl mb-10 tracking-wide"
          style={{ color: "var(--nera-text-on-dark-muted)" }}
        >
          Build&nbsp;·&nbsp;Simulate&nbsp;·&nbsp;Research&nbsp;·&nbsp;Experiment&nbsp;·&nbsp;Learn
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/#explore"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
            style={{ background: "var(--nera-accent-primary)" }}
          >
            Explore NERA
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:scale-105"
            style={{
              borderColor: "rgba(255,255,255,0.2)",
              color: "var(--nera-text-on-dark)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            Get NERA Services
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: "7+", label: "Technology Domains" },
            { value: "R&D", label: "Robotics Lab" },
            { value: "∞", label: "Learning Possibilities" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--nera-accent-cyan)",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: "var(--nera-text-on-dark-muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--nera-text-on-dark-muted)" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
