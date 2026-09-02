"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const steps = [
  { label: "Power",   c: "#d97706" },
  { label: "Sensor",  c: "#7c3aed" },
  { label: "MCU",     c: "#0891b2" },
  { label: "Process", c: "#0891b2" },
  { label: "Output",  c: "#059669" },
];

export default function PCBTeaser() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--s-navy)" }}>
      <div className="absolute inset-0 bg-grid-navy pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(8,145,178,0.5),transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(79,70,229,0.4),transparent)" }} />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* PCB SVG preview */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="max-w-sm mx-auto rounded-2xl border overflow-hidden"
              style={{ background: "#071018", borderColor: "rgba(8,145,178,0.2)", boxShadow: "0 0 60px rgba(8,145,178,0.08)" }}>
              <svg viewBox="0 0 340 300" className="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="pb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(8,145,178,0.05)" strokeWidth="0.4" />
                  </pattern>
                  <filter id="gl"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <rect width="340" height="300" fill="url(#pb)" />
                <rect x="18" y="14" width="304" height="272" rx="8" fill="rgba(6,30,20,0.9)" stroke="rgba(8,145,178,0.18)" strokeWidth="1"/>
                {/* Traces */}
                <path d="M52 152 H122" stroke="rgba(8,145,178,0.4)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M178 152 H248" stroke="rgba(8,145,178,0.4)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M52 100 V152" stroke="rgba(79,70,229,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M290 100 V152" stroke="rgba(79,70,229,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M170 152 V230" stroke="rgba(16,185,129,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M248 152 H285 V205" stroke="rgba(8,145,178,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                {/* Signal pulses */}
                <circle r="3" fill="rgba(8,145,178,0.9)" filter="url(#gl)">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="0s">
                    <mpath href="#t1"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <path id="t1" d="M52 100 V152 H122" fill="none"/>
                <circle r="3" fill="rgba(16,185,129,0.9)" filter="url(#gl)">
                  <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.8s">
                    <mpath href="#t2"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite" begin="0.8s"/>
                </circle>
                <path id="t2" d="M178 152 H248 H285 V205" fill="none"/>
                {/* MCU */}
                <rect x="130" y="122" width="50" height="50" rx="5" fill="rgba(5,20,30,0.95)" stroke="rgba(8,145,178,0.7)" strokeWidth="1.5"/>
                {[134,142,150,158].map(y=><rect key={y} x="126" y={y} width="4" height="2" rx="1" fill="rgba(8,145,178,0.5)"/>)}
                {[134,142,150,158].map(y=><rect key={y} x="180" y={y} width="4" height="2" rx="1" fill="rgba(8,145,178,0.5)"/>)}
                <text x="155" y="146" textAnchor="middle" fill="rgba(8,145,178,0.95)" fontSize="7" fontFamily="monospace" fontWeight="bold">MCU</text>
                <text x="155" y="156" textAnchor="middle" fill="rgba(8,145,178,0.5)" fontSize="5.5" fontFamily="monospace">ATmega</text>
                <rect x="130" y="122" width="50" height="50" rx="5" fill="none" stroke="rgba(8,145,178,0.25)" strokeWidth="3">
                  <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite"/>
                </rect>
                {/* Sensor */}
                <rect x="28" y="136" width="32" height="20" rx="4" fill="rgba(5,15,30,0.9)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.5"/>
                <text x="44" y="149" textAnchor="middle" fill="rgba(167,139,250,0.9)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">SENSOR</text>
                {/* Power */}
                <rect x="30" y="78" width="38" height="28" rx="4" fill="rgba(5,15,30,0.9)" stroke="rgba(217,119,6,0.6)" strokeWidth="1.5"/>
                <text x="49" y="90" textAnchor="middle" fill="rgba(251,191,36,0.9)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">5V</text>
                <text x="49" y="100" textAnchor="middle" fill="rgba(217,119,6,0.5)" fontSize="5" fontFamily="monospace">VCC</text>
                <circle cx="62" cy="82" r="2.5" fill="rgba(217,119,6,0.8)">
                  <animate attributeName="fill" values="rgba(217,119,6,0.7);rgba(251,191,36,1);rgba(217,119,6,0.7)" dur="1.4s" repeatCount="indefinite"/>
                </circle>
                {/* LED */}
                <circle cx="285" cy="205" r="13" fill="rgba(5,20,10,0.9)" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5"/>
                <circle cx="285" cy="205" r="7" fill="rgba(16,185,129,0.1)">
                  <animate attributeName="fill" values="rgba(16,185,129,0.08);rgba(16,185,129,0.3);rgba(16,185,129,0.08)" dur="1.8s" repeatCount="indefinite" begin="0.8s"/>
                </circle>
                <circle cx="285" cy="205" r="3.5" fill="rgba(16,185,129,0.5)">
                  <animate attributeName="fill" values="rgba(16,185,129,0.4);rgba(52,211,153,1);rgba(16,185,129,0.4)" dur="1.8s" repeatCount="indefinite" begin="0.8s"/>
                </circle>
                <text x="285" y="227" textAnchor="middle" fill="rgba(52,211,153,0.6)" fontSize="6" fontFamily="monospace">OUT</text>
                {/* Corner pads */}
                {([[28,24],[312,24],[28,276],[312,276]] as [number,number][]).map(([x,y],i)=>(
                  <g key={i}><circle cx={x} cy={y} r="5" fill="rgba(0,0,0,0.5)" stroke="rgba(8,145,178,0.3)" strokeWidth="1"/><circle cx={x} cy={y} r="2" fill="rgba(8,145,178,0.2)"/></g>
                ))}
                <text x="170" y="11" textAnchor="middle" fill="rgba(8,145,178,0.25)" fontSize="5.5" fontFamily="monospace">NERA-PCB-DEV-v1</text>
              </svg>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--c-cyan-br)", fontFamily: "var(--f-mono)" }}>
              Interactive Technology
            </p>
            <h2 className="font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1.9rem,4vw,2.8rem)", color: "var(--t-dark)", letterSpacing: "-0.02em" }}>
              Enter the PCB Lab.<br />
              <span style={{ color: "var(--c-cyan-br)", opacity: 0.7, fontSize: "0.6em", fontWeight: 400 }}>
                See electronics think.
              </span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--t-dark-muted)" }}>
              Rotate a real circuit board. Click components to read what they do.
              Watch signals travel through actual traces. This is how NERA teaches electronics.
            </p>

            {/* Signal flow */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--t-dark-muted)", fontFamily: "var(--f-mono)", opacity: 0.5 }}>
                Signal path
              </p>
              <div className="flex items-center flex-wrap gap-1">
                {steps.map((s, i) => (
                  <span key={s.label} className="flex items-center gap-1">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold border"
                      style={{ color: s.c, borderColor: `${s.c}28`, background: `${s.c}10`, fontFamily: "var(--f-mono)", fontSize: "0.68rem" }}>
                      {s.label}
                    </span>
                    {i < steps.length - 1 && (
                      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/pcb-lab" className="btn-primary">
                <Zap className="w-4 h-4" /> Enter PCB Lab
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-ghost">
                Build a Simulator
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
