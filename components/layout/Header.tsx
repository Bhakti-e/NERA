"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import NERALogo, { NERALogoBadge } from "@/components/brand/NERALogo";

const navItems = [
  { label: "Explore",    href: "/#explore" },
  { label: "Simulators", href: "/simulators" },
  { label: "Robotics",   href: "/#robotics" },
  { label: "PCB Lab",    href: "/pcb-lab" },
  { label: "About",      href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Main header — always white ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "#ffffff",
          borderBottom: scrolled
            ? "1px solid rgba(37,99,235,0.1)"
            : "1px solid rgba(0,0,0,0.06)",
          boxShadow: scrolled
            ? "0 2px 24px rgba(37,99,235,0.08)"
            : "0 1px 0 rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">

            {/* Logo — on white header, use the full logo */}
            <NERALogo variant="full" size={40} href="/" />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                  style={{ color: "#374151" }}
                >
                  <span
                    className="relative z-10 transition-colors"
                    style={{ color: "#374151" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--nera-blue)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#374151"; }}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/services"
                className="nera-btn-primary"
              >
                Start a Project
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "#374151", background: "rgba(37,99,235,0.06)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile slide-in drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{
                background: "var(--nera-surface-navy)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Drawer top — white area for logo */}
              <div
                className="flex items-center justify-between px-5 h-16 shrink-0"
                style={{
                  background: "#ffffff",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <NERALogo variant="full" size={36} href="/" />
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg"
                  style={{ color: "#374151", background: "rgba(0,0,0,0.05)" }}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all"
                      style={{ color: "rgba(232,234,240,0.85)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(232,234,240,0.85)";
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA at bottom */}
              <div className="px-4 pb-8 shrink-0">
                <Link
                  href="/services"
                  className="nera-btn-primary justify-center w-full"
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
