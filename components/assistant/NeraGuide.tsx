"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { simulators } from "@/data/simulators";

const routeCopy: Record<string, { title: string; text: string }> = {
  "/": { title: "NERA AI online", text: "Hello. Welcome to NERA — New Embark Robotic Age. I can guide you through simulators, robotics, PCB systems, research and project services. Choose an area and I’ll stay with you as you explore." },
  "/simulators": { title: "Simulator room", text: "You are in the simulator room. These interactive tools are built to make electronics, robotics, logic and networking easier to understand by experimenting instead of only reading." },
  "/robotics": { title: "Robotics lab", text: "Welcome to the robotics lab. Here you can explore NERA prototypes, embedded experiments and research concepts as they develop." },
  "/pcb-lab": { title: "PCB lab", text: "This is the PCB lab. Inspect the board, follow signal paths, understand the circuit and request a custom PCB for your own project." },
  "/projects": { title: "Projects bay", text: "This area presents NERA project work, practical builds and student collaborations." },
  "/research": { title: "Research area", text: "This area covers research direction, methodology, technical implementation and responsible publication guidance." },
  "/learn": { title: "Learning zone", text: "This is the learning zone, designed to make engineering concepts easier to explore through practical and interactive experiences." },
  "/services": { title: "Project desk", text: "This is the project desk. Select what you want to build, share your requirement and NERA will continue through the existing service flow." },
  "/about": { title: "About NERA", text: "NERA brings robotics, software, simulation, embedded systems and research together as one interactive technology platform." },
};

function getRouteMessage(pathname: string) {
  if (pathname.startsWith("/simulators/")) {
    const slug = pathname.split("/").pop();
    const sim = simulators.find((item) => item.slug === slug);
    if (sim) return { title: sim.name, text: `This is ${sim.name}. ${sim.shortDescription} It is designed to make ${sim.category.toLowerCase()} concepts easier to test and understand through interaction.` };
  }
  return routeCopy[pathname] ?? routeCopy["/"];
}

const STORAGE_KEY = "nera-guide-explained-routes";

export default function NeraGuide() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const message = useMemo(() => getRouteMessage(pathname), [pathname]);
  const timeoutRef = useRef<number | null>(null);

  const speak = (force = false) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { setSpeechSupported(false); return; }
    if (muted && !force) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`${message.title}. ${message.text}`);
    u.rate = .93; u.pitch = .88; u.volume = .92;
    u.onstart = () => { setSpeaking(true); setExpanded(true); };
    u.onend = () => { setSpeaking(false); timeoutRef.current = window.setTimeout(() => setExpanded(false), 2200); };
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const explained: string[] = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    const seen = explained.includes(pathname);
    window.speechSynthesis?.cancel(); setSpeaking(false);
    if (!seen) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...explained, pathname]));
      setExpanded(true);
      timeoutRef.current = window.setTimeout(() => speak(), pathname === "/" ? 650 : 420);
    } else setExpanded(false);
    return () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); window.speechSynthesis?.cancel(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] sm:bottom-7 sm:right-7">
      <div className="relative flex items-end gap-3">
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity: 0, x: 16, scale: .96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 10, scale: .97 }} className="pointer-events-auto mb-4 w-[min(76vw,340px)]">
              <div className="relative overflow-hidden rounded-[22px] border px-4 py-3.5" style={{ background: "radial-gradient(circle at 100% 100%,rgba(37,99,235,.14),transparent 44%),linear-gradient(145deg,rgba(3,10,20,.82),rgba(8,18,34,.68))", borderColor: "rgba(103,232,249,.24)", boxShadow: "0 18px 60px rgba(0,0,0,.42),0 0 42px rgba(34,211,238,.06)", backdropFilter: "blur(18px)" }}>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5"><span className={`absolute inline-flex h-full w-full rounded-full bg-cyan-300 ${speaking ? "animate-ping" : "opacity-30"}`} /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" /></span>
                    <div><div className="text-[9px] font-bold uppercase tracking-[.24em] text-cyan-300">NERA INTELLIGENCE</div><div className="text-sm font-semibold text-white">{message.title}</div></div>
                  </div>
                  <button onClick={() => setExpanded(false)} className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Hide NERA AI"><X size={13}/></button>
                </div>
                <div className="mb-2 flex h-5 items-center gap-1" aria-hidden="true">{[8,14,6,18,10,15,7,17,9,13,6,16,8,12].map((h,i)=><motion.span key={i} className="w-[3px] rounded-full bg-gradient-to-t from-violet-500 to-cyan-300" animate={{ height: speaking ? [4,h,5] : 4, opacity: speaking ? [0.5,1,.6] : .35 }} transition={{ duration:.55,repeat:speaking?Infinity:0,delay:i*.035 }}/>)}</div>
                <p className="text-[13px] leading-5 text-slate-300">{message.text}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => { setExpanded(true); speak(true); }} className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1.5 text-[11px] font-semibold text-cyan-100 transition hover:bg-cyan-300/10"><Volume2 size={12}/> Explain again</button>
                  <button onClick={() => { setMuted(v=>!v); window.speechSynthesis?.cancel(); setSpeaking(false); }} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-[11px] text-slate-400 transition hover:bg-white/10 hover:text-slate-200">{muted?<VolumeX size={12}/>:<Volume2 size={12}/>} {muted?"Unmute":"Mute"}</button>
                </div>
                {!speechSupported && <p className="mt-2 text-[10px] text-amber-400">Voice is unavailable in this browser.</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setExpanded(v=>!v)} className="pointer-events-auto relative grid h-[78px] w-[78px] place-items-center rounded-full" aria-label="NERA AI assistant">
          <motion.span className="absolute inset-0 rounded-full border border-cyan-300/30" animate={{ rotate:360 }} transition={{ duration:14,repeat:Infinity,ease:"linear" }} />
          <motion.span className="absolute inset-[6px] rounded-full border border-dashed border-violet-400/45" animate={{ rotate:-360 }} transition={{ duration:9,repeat:Infinity,ease:"linear" }} />
          <motion.span className="absolute inset-[12px] rounded-full border border-cyan-300/20" animate={{ rotate:360 }} transition={{ duration:7,repeat:Infinity,ease:"linear" }} />
          {[0,90,180,270].map((r)=><motion.span key={r} className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" style={{ transform:`rotate(${r}deg) translateY(-35px)` }} animate={{ opacity:[.35,1,.35] }} transition={{ duration:1.6,repeat:Infinity,delay:r/360 }}/>) }
          <motion.span className="absolute inset-[18px] rounded-full" style={{ background:"radial-gradient(circle at 36% 30%,#ecfeff 0%,#67e8f9 8%,#2563eb 34%,#6d28d9 62%,#050b16 82%)", boxShadow:speaking?"0 0 30px rgba(103,232,249,.9),0 0 62px rgba(37,99,235,.5),inset 0 0 16px rgba(255,255,255,.35)":"0 0 22px rgba(34,211,238,.4),0 0 42px rgba(124,58,237,.24),inset 0 0 14px rgba(255,255,255,.22)" }} animate={speaking?{scale:[1,1.12,.98,1.08,1]}:{scale:[1,1.035,1]}} transition={{ duration:speaking?1:3,repeat:Infinity }} />
          <span className="absolute inset-[29px] rounded-full border border-white/45 bg-white/5" />
          <motion.span className="absolute h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_#67e8f9]" animate={{ opacity:[.45,1,.45] }} transition={{ duration:.7,repeat:Infinity }} />
          {speaking && <><motion.span className="absolute inset-[-8px] rounded-full border border-cyan-300/20" animate={{ scale:[1,1.2],opacity:[.8,0] }} transition={{ duration:1.2,repeat:Infinity }}/><motion.span className="absolute inset-[-16px] rounded-full border border-violet-400/15" animate={{ scale:[1,1.3],opacity:[.5,0] }} transition={{ duration:1.5,repeat:Infinity,delay:.2 }}/></>}
        </button>
      </div>
    </div>
  );
}
