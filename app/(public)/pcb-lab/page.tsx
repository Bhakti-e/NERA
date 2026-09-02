import type { Metadata } from "next";
import PCBExplorerShell from "@/components/pcb/PCBExplorerShell";
import Link from "next/link";
import { ArrowRight, Box, CheckCircle2, CircuitBoard, Cpu, MessageCircle, PackageCheck, ShieldCheck, Sparkles, Wrench, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "PCB Lab | NERA",
  description: "Explore NERA PCB systems, inspect an interactive board, and enquire about custom PCB design and prototyping.",
};

const services = [
  { icon: CircuitBoard, title: "Custom PCB Design", text: "Schematic-to-board design shaped around your project requirements." },
  { icon: Cpu, title: "Embedded Integration", text: "Component planning, MCU integration and firmware-ready board architecture." },
  { icon: PackageCheck, title: "Prototype Support", text: "Support moving from design files toward a practical working prototype." },
  { icon: ShieldCheck, title: "Design Review", text: "Review connectivity, component choices and board-level implementation before fabrication." },
];

const signalSteps = ["Power", "Sensor", "MCU", "Process", "Output"];

export default function PCBLabPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 pointer-events-none opacity-60 bg-grid-light" />
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-24 sm:px-8 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:px-10 lg:pb-20 lg:pt-28">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-indigo-700"><Sparkles className="h-3.5 w-3.5" /> NERA PCB Store + Lab</div>
            <h1 className="text-4xl font-black leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">Design it. Test it. Build the board.</h1>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">Explore our interactive PCB demo, understand how the circuit behaves, then request a real custom board for your project, prototype or embedded system.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services?service=pcb-designing" className="btn-primary">Request PCB Quote <ArrowRight className="h-4 w-4" /></Link>
              <a href="#interactive-pcb" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50">Explore Interactive PCB</a>
            </div>
            <div className="mt-7 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
              {["Student projects", "R&D prototypes", "Embedded systems"].map((item) => <span key={item} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{item}</span>)}
            </div>
          </div>

          <div id="interactive-pcb" className="rounded-[30px] border border-slate-200 bg-slate-950 p-3 shadow-[0_26px_80px_rgba(15,23,42,.18)]">
            <div className="flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300"><span>Interactive board viewer</span><span className="flex items-center gap-2 text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Live Demo</span></div>
            <div className="overflow-hidden rounded-2xl border border-cyan-950/70"><PCBExplorerShell /></div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">PCB Engineering</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">What you can order from NERA.</h2></div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">No fake catalogue pricing. Share the requirement first, then the PCB scope can be discussed based on complexity, components and prototype needs.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map(({ icon: Icon, title, text }) => (
              <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-indigo-600 ring-1 ring-indigo-100"><Icon className="h-5 w-5" /></div>
                <h3 className="text-lg font-extrabold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:px-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-600"><Zap className="h-4 w-4" /> Interactive demo</div>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">Follow the signal through the PCB.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Rotate the board, zoom in and select components to inspect them. The demo visualizes the path from input power and sensing through processing to output.</p>
            <div className="mt-7 flex flex-wrap items-center gap-2">{signalSteps.map((step, i) => <div key={step} className="flex items-center gap-2"><span className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700">{step}</span>{i < signalSteps.length - 1 && <span className="text-slate-300">→</span>}</div>)}</div>
            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex items-center gap-2 text-sm font-bold text-slate-900"><Wrench className="h-4 w-4 text-cyan-600" /> This viewer is a demo, not a fixed product.</div><p className="mt-2 text-sm leading-6 text-slate-600">Your real PCB can use a completely different layout, MCU, sensors, connectors and form factor depending on what you are building.</p></div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-9">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" /><div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="relative"><p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Custom PCB Order</p><h2 className="mt-3 text-3xl font-black">Tell us what you need the board to do.</h2><p className="mt-4 text-sm leading-6 text-slate-300">Share the project purpose, controller, sensors, power requirements, dimensions and anything else you already know. NERA can continue from there.</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">{["Requirement review", "PCB design discussion", "Prototype planning"].map((x)=><div key={x} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" />{x}</div>)}</div>
              <Link href="/services?service=pcb-designing" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"><MessageCircle className="h-4 w-4" /> Request PCB Quote <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
