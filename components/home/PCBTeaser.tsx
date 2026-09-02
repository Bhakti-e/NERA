"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

const steps = [
  { label: "Power", c: "#d97706" },
  { label: "Sensor", c: "#7c3aed" },
  { label: "MCU", c: "#0891b2" },
  { label: "Process", c: "#2563eb" },
  { label: "Output", c: "#059669" },
];

export default function PCBTeaser() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 text-slate-950">
      <div className="absolute inset-0 bg-grid-light pointer-events-none opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1320px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:px-10">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-3 shadow-[0_24px_70px_rgba(15,23,42,.16)]">
            <div className="mb-2 flex items-center justify-between px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300">
              <span>NERA PCB Viewer</span>
              <span className="flex items-center gap-2 text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Live</span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-cyan-900/40 bg-[#061019]">
              <svg viewBox="0 0 340 300" className="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="pb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0L0 0 0 20" fill="none" stroke="rgba(8,145,178,0.06)" strokeWidth="0.4" /></pattern><filter id="gl"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                <rect width="340" height="300" fill="url(#pb)" /><rect x="18" y="14" width="304" height="272" rx="8" fill="rgba(6,30,20,.92)" stroke="rgba(8,145,178,.22)" />
                <path d="M52 152 H122M178 152 H248M52 100 V152M290 100 V152M170 152 V230M248 152 H285 V205" stroke="rgba(34,211,238,.34)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle r="3" fill="#22d3ee" filter="url(#gl)"><animateMotion dur="2s" repeatCount="indefinite"><mpath href="#t1"/></animateMotion></circle><path id="t1" d="M52 100 V152 H122" fill="none"/>
                <rect x="130" y="122" width="50" height="50" rx="5" fill="#071923" stroke="#22d3ee" strokeOpacity=".75"/><text x="155" y="146" textAnchor="middle" fill="#67e8f9" fontSize="7" fontFamily="monospace" fontWeight="bold">MCU</text><text x="155" y="156" textAnchor="middle" fill="#38bdf8" fontSize="5.5" fontFamily="monospace">ATmega</text>
                <rect x="28" y="136" width="32" height="20" rx="4" fill="#0b1020" stroke="#8b5cf6"/><text x="44" y="149" textAnchor="middle" fill="#c4b5fd" fontSize="6.5" fontFamily="monospace" fontWeight="bold">SENSOR</text>
                <rect x="30" y="78" width="38" height="28" rx="4" fill="#15120b" stroke="#f59e0b"/><text x="49" y="90" textAnchor="middle" fill="#fbbf24" fontSize="6.5" fontFamily="monospace" fontWeight="bold">5V</text><text x="49" y="100" textAnchor="middle" fill="#d97706" fontSize="5" fontFamily="monospace">VCC</text>
                <circle cx="285" cy="205" r="13" fill="#06150f" stroke="#10b981"/><circle cx="285" cy="205" r="5" fill="#10b981"><animate attributeName="opacity" values=".3;1;.3" dur="1.4s" repeatCount="indefinite"/></circle><text x="285" y="227" textAnchor="middle" fill="#34d399" fontSize="6" fontFamily="monospace">OUT</text>
                <text x="170" y="11" textAnchor="middle" fill="rgba(34,211,238,.35)" fontSize="5.5" fontFamily="monospace">NERA-PCB-DEV-v1</text>
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .12 }}>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-cyan-700">Interactive PCB Lab</p>
          <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Explore the board. Understand the signal. Build the real thing.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Use the interactive board to see how power, sensing, processing and output connect. If you need a real PCB for your project, NERA can design it around your requirements.</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {steps.map((s, i) => <div key={s.label} className="flex items-center gap-2"><span className="rounded-lg border px-3 py-2 text-xs font-bold" style={{ color: s.c, borderColor: `${s.c}30`, background: `${s.c}0c` }}>{s.label}</span>{i < steps.length - 1 && <span className="text-slate-300">→</span>}</div>)}
          </div>

          <div className="mt-7 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
            {["Interactive demo", "Custom PCB design", "Prototype support"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{item}</span>)}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pcb-lab" className="btn-primary"><Zap className="h-4 w-4" /> Enter PCB Lab <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/services?service=pcb-designing" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50">Request PCB Design</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
