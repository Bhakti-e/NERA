"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { simulators } from "@/data/simulators";

const routeCopy: Record<string, { title: string; text: string }> = {
  "/": {
    title: "NERA Guide online",
    text: "Hello. Welcome to NERA — New Embark Robotic Age. I can guide you through our simulators, robotics work, PCB lab, research and project services. Choose a section and I’ll stay with you as you explore.",
  },
  "/simulators": {
    title: "Simulator room",
    text: "You are now in the simulator room. These prototypes help people understand technical systems by interacting with them instead of only reading about them.",
  },
  "/robotics": {
    title: "Robotics lab",
    text: "Welcome to the robotics lab. This area is for NERA robotics prototypes, embedded experiments and R and D concepts.",
  },
  "/pcb-lab": {
    title: "PCB lab",
    text: "This is the PCB lab. Explore how electronic components connect, how signals travel through traces and how a board behaves as a system.",
  },
  "/projects": {
    title: "Projects bay",
    text: "This area highlights project work and practical builds. Use it to understand what NERA is experimenting with and developing.",
  },
  "/research": {
    title: "Research area",
    text: "You are in the research area. NERA supports research methodology, technical implementation, resource discovery and responsible publication guidance.",
  },
  "/learn": {
    title: "Learning zone",
    text: "This is the learning zone for students and curious builders. The goal is to make difficult engineering ideas easier to explore interactively.",
  },
  "/services": {
    title: "Project desk",
    text: "This is the project desk. Select what you want to build, enter your requirement and the existing NERA service flow will handle the rest.",
  },
  "/about": {
    title: "About NERA",
    text: "NERA combines robotics, software, simulation, embedded systems and research into one interactive technology platform.",
  },
};

function getRouteMessage(pathname: string) {
  if (pathname.startsWith("/simulators/")) {
    const slug = pathname.split("/").pop();
    const sim = simulators.find((item) => item.slug === slug);
    if (sim) {
      return {
        title: sim.name,
        text: `This is ${sim.name}. ${sim.shortDescription} It was designed to make ${sim.category.toLowerCase()} concepts easier to test and understand through interaction.`,
      };
    }
  }
  return routeCopy[pathname] ?? routeCopy["/"];
}

export default function NeraGuide() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const lastSpoken = useRef("");
  const message = useMemo(() => getRouteMessage(pathname), [pathname]);

  useEffect(() => {
    setOpen(true);
    if (typeof window === "undefined" || !("speechSynthesis" in window) || muted) return;
    const phrase = `${message.title}. ${message.text}`;
    if (lastSpoken.current === phrase) return;
    lastSpoken.current = phrase;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.rate = 0.92;
    utterance.pitch = 0.9;
    utterance.volume = 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.setTimeout(() => window.speechSynthesis.speak(utterance), 350);
    return () => window.speechSynthesis.cancel();
  }, [message, muted]);

  const replay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${message.title}. ${message.text}`);
    utterance.rate = 0.92;
    utterance.pitch = 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed z-[60] right-4 bottom-4 sm:right-6 sm:bottom-6 pointer-events-none">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.aside
            key={pathname}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            className="pointer-events-auto w-[min(92vw,390px)] overflow-hidden rounded-2xl border"
            style={{
              background: "linear-gradient(145deg, rgba(7,11,20,.96), rgba(12,20,38,.94))",
              borderColor: "rgba(34,211,238,.28)",
              boxShadow: "0 0 0 1px rgba(124,58,237,.1), 0 24px 70px rgba(0,0,0,.45), 0 0 40px rgba(6,182,212,.13)",
              backdropFilter: "blur(18px)",
            }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,.07)" }}>
              <div className="relative w-11 h-11 shrink-0 rounded-full grid place-items-center border" style={{ borderColor: "rgba(34,211,238,.35)", background: "rgba(6,182,212,.08)" }}>
                <div className="absolute inset-1 rounded-full border border-dashed animate-[spin_10s_linear_infinite]" style={{ borderColor: "rgba(124,58,237,.38)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: speaking ? "#22d3ee" : "#7c3aed", boxShadow: speaking ? "0 0 20px #22d3ee" : "0 0 14px #7c3aed" }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-[.18em] uppercase" style={{ color: "#67e8f9", fontFamily: "var(--f-mono)" }}>NERA GUIDE</span>
                  {speaking && <span className="text-[10px]" style={{ color: "#a78bfa" }}>speaking</span>}
                </div>
                <h3 className="text-sm font-semibold truncate" style={{ color: "#f8fafc" }}>{message.title}</h3>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 grid place-items-center rounded-lg" style={{ color: "#94a3b8", background: "rgba(255,255,255,.04)" }} aria-label="Close NERA guide">
                <X size={15} />
              </button>
            </div>

            <div className="px-4 py-4">
              <div className="flex gap-1.5 h-5 items-end mb-3" aria-hidden="true">
                {[7, 12, 18, 10, 16, 8, 14, 19, 11, 15, 9, 17].map((height, i) => (
                  <motion.span key={i} className="w-1 rounded-full" style={{ background: i % 2 ? "#7c3aed" : "#22d3ee" }} animate={{ height: speaking ? [4, height, 5] : 4 }} transition={{ duration: .65, repeat: speaking ? Infinity : 0, delay: i * .04 }} />
                ))}
              </div>
              <p className="text-sm leading-6" style={{ color: "#b8c7df" }}>{message.text}</p>
              <div className="flex items-center gap-2 mt-4">
                <button onClick={replay} className="pointer-events-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border" style={{ color: "#dbeafe", borderColor: "rgba(37,99,235,.35)", background: "rgba(37,99,235,.1)" }}>
                  <Volume2 size={14} /> Replay
                </button>
                <button onClick={() => { setMuted((v) => !v); window.speechSynthesis?.cancel(); setSpeaking(false); }} className="pointer-events-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs border" style={{ color: "#94a3b8", borderColor: "rgba(255,255,255,.1)", background: "rgba(255,255,255,.035)" }}>
                  {muted ? <VolumeX size={14} /> : <Volume2 size={14} />} {muted ? "Unmute" : "Mute"}
                </button>
              </div>
            </div>
          </motion.aside>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }}
            onClick={() => setOpen(true)}
            className="pointer-events-auto w-14 h-14 rounded-full grid place-items-center border"
            style={{ background: "#08101f", borderColor: "rgba(34,211,238,.4)", color: "#67e8f9", boxShadow: "0 0 26px rgba(6,182,212,.2)" }}
            aria-label="Open NERA guide"
          >
            <Volume2 size={21} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
