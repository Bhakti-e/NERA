"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Explore", href: "/#explore" },
  { label: "Simulators", href: "/simulators" },
  { label: "Robotics", href: "/#robotics" },
  { label: "PCB Lab", href: "/pcb-lab" },
  { label: "About", href: "/about" },
];

/* ── NERA logomark — engineering hexagon ── */
function NERALogo({ dark }: { dark: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="NERA home">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <polygon
          points="16,2 28,9 28,23 16,30 4,23 4,9"
          fill={dark ? "#4f46e5" : "#4f46e5"}
          opacity="0.15"
        />
        <polygon
          points="16,2 28,9 28,23 16,30 4,23 4,9"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="1.5"
        />
        <text
          x="16" y="20.5"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fontFamily="Space Grotesk, system-ui, sans-serif"
          fill={dark ? "#ededf5" : "#4f46e5"}
          letterSpacing="0.5"
        >
          N
        </text>
        <circle cx="16" cy="2" r="1.5" fill="#06b6d4" />
        <circle cx="28" cy="9" r="1.5" fill="#4f46e5" />
        <circle cx="28" cy="23" r="1.5" fill="#7c3aed" />
      </svg>
      <span
        className="text-lg font-bold tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: dark ? "var(--nera-text-on-dark)" : "var(--nera-text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        NERA
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = !scrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">

            <NERALogo dark={isDark} />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                  style={{
                    color: isDark
                      ? "rgba(237,237,245,0.72)"
                      : "var(--nera-text-secondary)",
                  }}
                >
                  <span className="relative z-10 group-hover:text-[var(--nera-accent-primary)] transition-colors">
                    {item.label}
                  </span>
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(79,70,229,0.05)" }}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--nera-accent-primary)",
                  boxShadow: "0 2px 12px rgba(79,70,229,0.3)",
                }}
              >
                Start a Project
              </Link>
            </div>

            {/* Mobile button */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{
                color: isDark ? "var(--nera-text-on-dark)" : "var(--nera-text-primary)",
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{
                background: "var(--nera-surface-mid)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <NERALogo dark={true} />
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg"
                  style={{ color: "var(--nera-text-on-dark-muted)", background: "rgba(255,255,255,0.06)" }}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white/8"
                      style={{ color: "rgba(237,237,245,0.8)" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <div className="px-4 pb-8">
                <Link
                  href="/services"
                  className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: "var(--nera-accent-primary)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Start a Project
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
