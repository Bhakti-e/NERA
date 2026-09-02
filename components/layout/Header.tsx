"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navItems = [
  { label: "Explore", href: "/#explore" },
  { label: "Simulators", href: "/simulators" },
  { label: "Robotics", href: "/#robotics" },
  { label: "PCB Lab", href: "/pcb-lab" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClasses = scrolled
    ? "bg-white/95 backdrop-blur-md border-b border-black/8 shadow-sm"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--nera-accent-primary)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight transition-colors"
              style={{
                fontFamily: "var(--font-display)",
                color: scrolled
                  ? "var(--nera-text-primary)"
                  : "var(--nera-text-on-dark)",
              }}
            >
              NERA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-[var(--nera-accent-primary)]"
                style={{
                  color: scrolled
                    ? "var(--nera-text-secondary)"
                    : "rgba(240,240,248,0.8)",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/services"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--nera-accent-primary)] text-white hover:bg-indigo-700 transition-colors"
            >
              Get NERA Services
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{
              color: scrolled
                ? "var(--nera-text-primary)"
                : "var(--nera-text-on-dark)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-black/8 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--nera-text-secondary)] hover:bg-indigo-50 hover:text-[var(--nera-accent-primary)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-black/8">
                <Link
                  href="/services"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold bg-[var(--nera-accent-primary)] text-white text-center hover:bg-indigo-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Get NERA Services
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
