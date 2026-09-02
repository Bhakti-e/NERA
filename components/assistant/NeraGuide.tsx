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

const STORAGE_KEY = "nera-guide-explained-routes";

export default function NeraGuide() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [hasExplained, setHasExplained] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const message = useMemo(() => getRouteMessage(pathname), [pathname]);
  const timeoutRef = useRef<number | null>(null);

  const speak = (force = false) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSpeechSupported(false);
      return;
    }
    if (muted && !force) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${message.title}. ${message.text}`);
    utterance.rate = 0.93;
    utterance.pitch = 0.9;
    utterance.volume = 0.9;
    utterance.onstart = () => {
      setSpeaking(true);
      setExpanded(true);
    };
    utterance.onend = () => {
      setSpeaking(false);
      timeoutRef.current = window.setTimeout(() => setExpanded(false), 2600);
    };
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const explained: string[] = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    const alreadyExplained = explained.includes(pathname);
    setHasExplained(alreadyExplained);

    if (!alreadyExplained) {
      const updated = [...explained, pathname];
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setHasExplained(false);
      setExpanded(true);

      timeoutRef.current = window.setTimeout(() => {
        speak();
      }, pathname === "/" ? 700 : 450);
    } else {
      setExpanded(false);
      window.speechSynthesis?.cancel();
      setSpeaking(false);
    }

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      window.speechSynthesis?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const replay = () => {
    setExpanded(true);
    speak(true);
  };

  return (
    <div className="fixed z-[60] right-4 bottom-4 sm:right-7 sm:bottom-7 pointer-events-none">
      <div className="relative flex items-end justify-end gap-3">
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, x: 18, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, y: 6, scale: 0.97 }}
              className="pointer-events-auto mb-3 w-[min(76vw,320px)]"
            >
              <div
                className="relative overflow-hidden rounded-2xl border px-4 py-3"
                style={{
                  background: "linear-gradient(145deg, rgba(5,12,24,.82), rgba(8,21,38,.72))",
                  borderColor: "rgba(34,211,238,.24)",
                  boxShadow: "0 14px 50px rgba(0,0,0,.38), inset 0 0 32px rgba(34,211,238,.035)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(#22d3ee, #7c3aed, transparent)" }} />
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div>
                    <div className="text-[9px] tracking-[.2em] uppercase" style={{ color: "#67e8f9", fontFamily: "var(--f-mono)" }}>
                      {speaking ? "VOICE LINK ACTIVE" : hasExplained ? "GUIDE READY" : "NERA GUIDE"}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: "#f8fafc" }}>{message.title}</div>
                  </div>
                  <button onClick={() => setExpanded(false)} className="w-7 h-7 grid place-items-center rounded-lg" style={{ color: "#94a3b8", background: "rgba(255,255,255,.035)" }} aria-label="Hide guide message">
                    <X size={14} />
                  </button>
                </div>
                <p className="text-[13px] leading-5" style={{ color: "#b8c7df" }}>{message.text}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={replay} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] border" style={{ color: "#dbeafe", borderColor: "rgba(34,211,238,.24)", background: "rgba(34,211,238,.06)" }}>
                    <Volume2 size={13} /> Explain again
                  </button>
                  <button onClick={() => { setMuted((v) => !v); window.speechSynthesis?.cancel(); setSpeaking(false); }} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px]" style={{ color: "#94a3b8", background: "rgba(255,255,255,.035)" }}>
                    {muted ? <VolumeX size={13} /> : <Volume2 size={13} />} {muted ? "Unmute" : "Mute"}
                  </button>
                </div>
                {!speechSupported && <div className="mt-2 text-[10px]" style={{ color: "#f59e0b" }}>Voice is unavailable in this browser.</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="pointer-events-auto relative w-[72px] h-[72px] rounded-full grid place-items-center"
          aria-label="NERA AI guide"
          style={{ filter: "drop-shadow(0 14px 28px rgba(0,0,0,.45))" }}
        >
          <motion.span
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: "rgba(34,211,238,.34)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-[7px] rounded-full border border-dashed"
            style={{ borderColor: "rgba(124,58,237,.5)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-[14px] rounded-full"
            style={{
              background: "radial-gradient(circle at 38% 32%, #67e8f9 0%, #2563eb 26%, #512da8 54%, #08111f 76%)",
              boxShadow: speaking
                ? "0 0 28px rgba(34,211,238,.95), 0 0 56px rgba(37,99,235,.58), inset 0 0 18px rgba(255,255,255,.28)"
                : "0 0 18px rgba(34,211,238,.45), 0 0 36px rgba(124,58,237,.26), inset 0 0 16px rgba(255,255,255,.18)",
            }}
            animate={speaking ? { scale: [1, 1.1, .97, 1.06, 1] } : { scale: [1, 1.025, 1] }}
            transition={{ duration: speaking ? 1.1 : 3.2, repeat: Infinity }}
          />
          <span className="absolute inset-[23px] rounded-full border" style={{ borderColor: "rgba(255,255,255,.46)" }} />
          <motion.span
            className="absolute w-2 h-2 rounded-full"
            style={{ background: "#e0fbff", boxShadow: "0 0 14px #67e8f9" }}
            animate={speaking ? { opacity: [0.35, 1, 0.45, 1] } : { opacity: [0.45, .8, .45] }}
            transition={{ duration: .7, repeat: Infinity }}
          />
          {speaking && (
            <>
              <motion.span className="absolute inset-[-7px] rounded-full border" style={{ borderColor: "rgba(34,211,238,.22)" }} animate={{ scale: [1, 1.22], opacity: [.7, 0] }} transition={{ duration: 1.25, repeat: Infinity }} />
              <motion.span className="absolute inset-[-15px] rounded-full border" style={{ borderColor: "rgba(124,58,237,.16)" }} animate={{ scale: [1, 1.3], opacity: [.45, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: .25 }} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
