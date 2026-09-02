"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const components = [
  { id: "mcu", label: "MCU", x: 130, y: 130, w: 60, h: 60, color: "#06b6d4", name: "Microcontroller (ATmega328)", desc: "The brain of the circuit. Receives sensor data, executes program logic, and sends output signals to connected devices." },
  { id: "sensor", label: "SENSOR", x: 30, y: 145, w: 40, h: 20, color: "#7c3aed", name: "Sensor (e.g. Temperature)", desc: "Detects physical changes in the environment (temperature, light, motion) and converts them to electrical signals." },
  { id: "power", label: "VCC", x: 30, y: 50, w: 40, h: 30, color: "#f59e0b", name: "Power Supply (5V VCC)", desc: "Supplies regulated 5V power to all components on the board." },
  { id: "led", label: "LED", x: 248, y: 148, r: 16, color: "#10b981", name: "Output LED", desc: "Visual output indicator — lights up when the MCU sends a HIGH signal." },
  { id: "cap1", label: "C1", x: 110, y: 240, w: 14, h: 22, color: "#f43f5e", name: "Decoupling Capacitor (100nF)", desc: "Filters noise from the power supply, ensuring stable voltage to the MCU." },
  { id: "res1", label: "R1", x: 232, y: 130, w: 22, h: 10, color: "#f59e0b", name: "Current-Limiting Resistor (330Ω)", desc: "Limits current to the LED, preventing damage." },
];

export default function PCBFallback() {
  const [active, setActive] = useState<string | null>(null);
  const activeComp = components.find((c) => c.id === active);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="rounded-2xl border p-4 relative"
        style={{ background: "rgba(6,182,212,0.03)", borderColor: "rgba(6,182,212,0.15)" }}
      >
        <p className="text-xs text-center mb-3" style={{ color: "rgba(6,182,212,0.6)" }}>
          2D Schematic View — Click any component to learn more
        </p>

        <svg
          viewBox="0 0 320 300"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="PCB schematic diagram"
        >
          {/* Board */}
          <rect x="10" y="10" width="300" height="280" rx="8"
            fill="rgba(6,182,212,0.04)" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />

          {/* Traces */}
          <path d="M70 155 H120" stroke="rgba(6,182,212,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M50 65 V155" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4,3" />
          <path d="M190 160 H248" stroke="rgba(16,185,129,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M160 190 V240" stroke="rgba(244,63,94,0.3)" strokeWidth="1.5" fill="none" />
          <path d="M232 135 H190" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" fill="none" />

          {/* MCU */}
          <rect
            x={130} y={130} width={60} height={60} rx={5}
            fill={active === "mcu" ? "rgba(6,182,212,0.2)" : "rgba(6,182,212,0.1)"}
            stroke={active === "mcu" ? "#06b6d4" : "rgba(6,182,212,0.4)"}
            strokeWidth={active === "mcu" ? 2 : 1.5}
            className="cursor-pointer"
            onClick={() => setActive(active === "mcu" ? null : "mcu")}
          />
          <text x="160" y="157" textAnchor="middle" fill="rgba(6,182,212,0.9)" fontSize="8" fontFamily="monospace" className="pointer-events-none">MCU</text>
          <text x="160" y="169" textAnchor="middle" fill="rgba(6,182,212,0.5)" fontSize="6" fontFamily="monospace" className="pointer-events-none">ATmega</text>

          {/* Sensor */}
          <rect
            x={30} y={145} width={40} height={20} rx={3}
            fill={active === "sensor" ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.1)"}
            stroke={active === "sensor" ? "#7c3aed" : "rgba(124,58,237,0.4)"}
            strokeWidth={active === "sensor" ? 2 : 1.5}
            className="cursor-pointer"
            onClick={() => setActive(active === "sensor" ? null : "sensor")}
          />
          <text x="50" y="158" textAnchor="middle" fill="rgba(167,139,250,0.9)" fontSize="6" fontFamily="monospace" className="pointer-events-none">SENSOR</text>

          {/* Power */}
          <rect
            x={30} y={50} width={40} height={30} rx={3}
            fill={active === "power" ? "rgba(245,158,11,0.2)" : "rgba(245,158,11,0.1)"}
            stroke={active === "power" ? "#f59e0b" : "rgba(245,158,11,0.4)"}
            strokeWidth={active === "power" ? 2 : 1.5}
            className="cursor-pointer"
            onClick={() => setActive(active === "power" ? null : "power")}
          />
          <text x="50" y="68" textAnchor="middle" fill="rgba(251,191,36,0.9)" fontSize="7" fontFamily="monospace" className="pointer-events-none">VCC</text>

          {/* LED */}
          <circle
            cx={248} cy={160} r={16}
            fill={active === "led" ? "rgba(16,185,129,0.25)" : "rgba(16,185,129,0.1)"}
            stroke={active === "led" ? "#10b981" : "rgba(16,185,129,0.4)"}
            strokeWidth={active === "led" ? 2 : 1.5}
            className="cursor-pointer"
            onClick={() => setActive(active === "led" ? null : "led")}
          />
          <text x="248" y="164" textAnchor="middle" fill="rgba(52,211,153,0.9)" fontSize="7" fontFamily="monospace" className="pointer-events-none">LED</text>

          {/* Capacitor */}
          <rect
            x={110} y={240} width={14} height={22} rx={2}
            fill={active === "cap1" ? "rgba(244,63,94,0.2)" : "rgba(244,63,94,0.1)"}
            stroke={active === "cap1" ? "#f43f5e" : "rgba(244,63,94,0.3)"}
            strokeWidth={active === "cap1" ? 2 : 1}
            className="cursor-pointer"
            onClick={() => setActive(active === "cap1" ? null : "cap1")}
          />
          <text x="117" y="253" textAnchor="middle" fill="rgba(251,113,133,0.9)" fontSize="5" fontFamily="monospace" className="pointer-events-none">C1</text>

          {/* Resistor */}
          <rect
            x={232} y={130} width={22} height={10} rx={2}
            fill={active === "res1" ? "rgba(245,158,11,0.2)" : "rgba(245,158,11,0.1)"}
            stroke={active === "res1" ? "#f59e0b" : "rgba(245,158,11,0.3)"}
            strokeWidth={active === "res1" ? 2 : 1}
            className="cursor-pointer"
            onClick={() => setActive(active === "res1" ? null : "res1")}
          />
          <text x="243" y="138" textAnchor="middle" fill="rgba(251,191,36,0.9)" fontSize="5" fontFamily="monospace" className="pointer-events-none">R1</text>

          {/* Corner mounting holes */}
          {([[20,20],[300,20],[20,280],[300,280]] as [number,number][]).map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r={4} fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
          ))}
        </svg>

        {/* Info panel */}
        <AnimatePresence>
          {activeComp && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="mt-3 p-3 rounded-xl border"
              style={{
                background: `${activeComp.color}10`,
                borderColor: `${activeComp.color}30`,
              }}
            >
              <div className="font-semibold text-sm mb-1" style={{ color: activeComp.color, fontFamily: "var(--font-display)" }}>
                {activeComp.name}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--nera-text-on-dark-muted)" }}>
                {activeComp.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-xs mt-3" style={{ color: "rgba(6,182,212,0.5)" }}>
        3D view not available on this device. Showing schematic view.
      </p>
    </div>
  );
}
