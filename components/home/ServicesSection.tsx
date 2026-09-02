"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  "Website / Web App",
  "Custom Simulator",
  "PCB Designing",
  "Robotics & Embedded",
  "Custom Software",
  "Research Support",
  "Student Projects",
  "Mentorship",
];

export default function ServicesSection() {
  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--nera-surface-page)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--nera-accent-primary)" }}
            >
              What NERA Builds
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
            >
              Ready to build something?
            </h2>
            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: "var(--nera-text-secondary)" }}
            >
              Whether you need a custom simulator, a robotics prototype, a PCB design,
              or research guidance — NERA brings your idea from concept to working reality.
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-200"
              style={{ background: "var(--nera-accent-primary)" }}
            >
              Get NERA Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: service list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {services.map((service, i) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    href="/services"
                    className="flex items-center gap-3 p-4 rounded-xl border border-black/6 bg-white hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: "var(--nera-accent-primary)" }}
                    />
                    <span
                      className="text-sm font-medium group-hover:text-[var(--nera-accent-primary)] transition-colors"
                      style={{ color: "var(--nera-text-primary)" }}
                    >
                      {service}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
