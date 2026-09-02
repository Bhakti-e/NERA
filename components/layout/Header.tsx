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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "#ffffff",
          borderBottom: scrolled ? "1px solid rgba(37,99,235,0.1)" : "1px solid rgba(0,0,0,0.07)",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
        }}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo — real PNG on white header */}
            <NERALogo height={44} href="/" />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                  style={{ color: "#374151" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#2563eb";
                    (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.05)";
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

            {/* CTA */}
            <div className="hidden md:block">
              <Link href="/services" className="btn-primary btn-primary-sm">
                Start a Project
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{ color: "#374151", background: "rgba(0,0,0,0.04)" }}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col md:hidden"
              style={{ background: "#0e1628", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Drawer header — white so logo looks correct */}
              <div
                className="flex items-center justify-between px-5 h-16 shrink-0"
                style={{ background: "#ffffff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
              >
                <NERALogo height={40} href="/" />
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg"
                  style={{ color: "#374151", background: "rgba(0,0,0,0.05)" }}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-5 space-y-1" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.div key={item.href} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
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
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="px-4 pb-8 shrink-0">
                <Link href="/services" className="btn-primary w-full" onClick={() => setOpen(false)}>
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
