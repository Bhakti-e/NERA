import type { Metadata } from "next";
import PCBExplorerShell from "@/components/pcb/PCBExplorerShell";
import Link from "next/link";
import { ArrowRight, Box, CheckCircle2, Cpu, MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "PCB Lab | NERA",
  description: "Explore NERA PCB systems, inspect an interactive board, and enquire about custom PCB design and prototyping.",
};

const features = [
  { icon: Cpu, title: "Custom PCB Design", text: "Boards designed around your project, prototype or embedded-system requirements." },
  { icon: Box, title: "Prototype Ready", text: "Move from schematic and component planning toward a practical prototype." },
  { icon: ShieldCheck, title: "Engineering Support", text: "Get guidance for component selection, firmware integration and testing." },
];

const signalSteps = ["Power", "Sensor", "MCU", "Process", "Output"];

export default function PCBLabPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 pointer-events-none opacity-60" style={{ backgroundImage: "linear-gradient(rgba(79,70,229,.05) 1px, transparent 1px),linear-gradient(90deg,rgba(79,70,229,.05) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-24 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10 lg:pb-20 lg:pt-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" /> NERA PCB Lab
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">Build the board your idea needs.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">Explore our interactive PCB, understand how the circuit behaves, then talk to NERA about PCB design, embedded integration and prototype development.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services?service=pcb-designing" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5">Request PCB Design <ArrowRight className="h-4 w-4" /></Link>
              <a href="#interactive-pcb" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50">Explore Interactive PCB</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              {["Student projects", "R&D prototypes", "Custom embedded systems"].map((item) => <span key={item} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{item}</span>)}
            </div>
          </div>
          <div id="interactive-pcb" className="rounded-[28px] border border-slate-200 bg-slate-950 p-2 shadow-2xl shadow-slate-200 sm:p-3">
            <div className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-[.16em] text-cyan-300"><span>Interactive board viewer</span><span className="flex items-center gap-1.5 text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Live demo</span></div>
            <div className="overflow-hidden rounded-2xl"><PCBExplorerShell /></div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">PCB Services</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">From idea to working prototype.</h2></div>
            <p className="max-w-lg text-sm leading-6 text-slate-600">The interactive board above is a demonstration. NERA can design a PCB around the actual requirements of your project.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Icon className="h-5 w-5" /></div><h3 className="text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_.8fr] lg:px-10">
          <div className="rounded-3xl border border-slate-200 p-7 sm:p-9"><div className="flex items-center gap-2 text-sm font-bold text-indigo-600"><Zap className="h-4 w-4" /> How the demo board works</div><h2 className="mt-3 text-2xl font-black sm:text-3xl">Follow the signal through the PCB.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Rotate the board, zoom in and select components to inspect them. The demo visualizes the path from input power and sensing through processing to output.</p><div className="mt-7 flex flex-wrap items-center gap-2">{signalSteps.map((step, i) => <div key={step} className="flex items-center gap-2"><span className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700">{step}</span>{i < signalSteps.length - 1 && <span className="text-slate-300">→</span>}</div>)}</div></div>
          <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-9"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Need a real PCB?</p><h2 className="mt-3 text-2xl font-black">Tell us what you are building.</h2><p className="mt-3 text-sm leading-6 text-slate-300">Share your project requirement and NERA can discuss the PCB, embedded system or prototype you need.</p><Link href="/services?service=pcb-designing" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-50"><MessageCircle className="h-4 w-4" /> Start PCB Enquiry <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>
    </main>
  );
}
