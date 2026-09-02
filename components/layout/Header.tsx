"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import NERALogo from "@/components/brand/NERALogo";

const navItems = [
  { label: "Explore",    href: "/#explore" },
  { label: "Simulators", href: "/simulators" },
  { label: "Robotics",   href: "/robotics" },
  { label: "PCB Lab",    href: "/pcb-lab" },
  { label: "Projects",   href: "/projects" },
  { label: "About",      href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
        }}
      >
        <div
          className="mx-auto px-5 sm:px-8"
          style={{ maxWidth: 1320 }}
        >
          {/* Single flex row — 64 px tall, no wrap, no overflow */}
          <div
            className="flex items-center justify-between"
            style={{ height: 64 }}
          >
            {/* ── Logo (constrained width so it never overflows) ── */}
            <div style={{ flexShrink: 0, lineHeight: 0 }}>
              <NERALogo height={42} href="/" />
            </div>

            {/* ── Desktop nav ── */}
            <nav
              className="hidden md:flex items-center"
              style={{ gap: 2 }}
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap"
                  style={{ color: "#374151" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#2563eb";
                    (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#374151";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:block" style={{ flexShrink: 0 }}>
              <Link
                href="/services"
                className="btn-primary btn-primary-sm"
                style={{ whiteSpace: "nowrap" }}
              >
                Start a Project
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden flex items-center justify-center rounded-lg transition-colors"
              style={{
                width: 40,
                height: 40,
                color: "#374151",
                background: "rgba(0,0,0,0.04)",
                flexShrink: 0,
              }}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile slide-in drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col md:hidden"
              style={{
                width: 280,
                background: "#0e1628",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Drawer top — white bg for logo */}
              <div
                className="flex items-center justify-between px-5 shrink-0"
                style={{
                  height: 64,
                  background: "#ffffff",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <NERALogo height={40} href="/" />
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-lg"
                  style={{ width: 32, height: 32, color: "#374151", background: "rgba(0,0,0,0.05)" }}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-4 py-5 overflow-y-auto" aria-label="Mobile navigation">
                <ul className="space-y-0.5">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                        style={{ color: "rgba(226,232,240,0.85)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom CTA */}
              <div className="px-4 pb-8 shrink-0">
                <Link
                  href="/services"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => setOpen(false)}
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
