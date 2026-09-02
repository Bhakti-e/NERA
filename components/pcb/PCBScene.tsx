"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

/* ── Types ─────────────────────────────────────────────── */
interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  color: string;
}

const componentData: Record<string, ComponentInfo> = {
  mcu: {
    id: "mcu",
    name: "Microcontroller (ATmega328)",
    description: "The brain. Reads sensor data, runs your program logic, and sends signals to outputs.",
    color: "#06b6d4",
  },
  sensor: {
    id: "sensor",
    name: "Sensor Module",
    description: "Detects physical changes (temperature, light, pressure) and converts them to electrical signals.",
    color: "#7c3aed",
  },
  power: {
    id: "power",
    name: "Power Regulator (5V)",
    description: "Steps down and regulates voltage to a stable 5V, powering all components safely.",
    color: "#f59e0b",
  },
  led: {
    id: "led",
    name: "Output LED",
    description: "A visual output. The MCU sends HIGH signal → LED lights up.",
    color: "#10b981",
  },
  cap: {
    id: "cap",
    name: "Decoupling Capacitor",
    description: "Filters power supply noise, keeping the MCU voltage stable.",
    color: "#f43f5e",
  },
  resistor: {
    id: "resistor",
    name: "Current-Limiting Resistor",
    description: "Controls how much current flows through the LED — without it, the LED would burn out.",
    color: "#f59e0b",
  },
};

/* ── Signal pulse animation ─────────────────────────────── */
function SignalPulse({
  points,
  color,
  running,
}: {
  points: [number, number, number][];
  color: string;
  running: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(0);

  const curve = new THREE.CatmullRomCurve3(
    points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
  );

  useFrame((_, delta) => {
    if (!running || !ref.current) return;
    progress.current = (progress.current + delta * 0.6) % 1;
    const pos = curve.getPoint(progress.current);
    ref.current.position.copy(pos);
  });

  if (!running) return null;
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
}

/* ── PCB Component Box ──────────────────────────────────── */
function PCBComponent({
  id,
  position,
  size,
  color,
  onSelect,
  isSelected,
  isCircle,
}: {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  onSelect: (id: string) => void;
  isSelected: boolean;
  isCircle?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      if (isSelected) {
        meshRef.current.scale.setScalar(
          1 + Math.sin(Date.now() * 0.004) * 0.04
        );
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelect(id);
    },
    [id, onSelect]
  );

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      castShadow
    >
      {isCircle ? (
        <cylinderGeometry args={[size[0], size[0], size[1], 32]} />
      ) : (
        <boxGeometry args={size} />
      )}
      <meshStandardMaterial
        color={color}
        emissive={isSelected ? color : "#000000"}
        emissiveIntensity={isSelected ? 0.4 : 0}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
}

/* ── PCB Trace ──────────────────────────────────────────── */
function PCBTrace({
  points,
  color = "#1a4a3a",
}: {
  points: [number, number, number][];
  color?: string;
}) {
  const curve = new THREE.CatmullRomCurve3(
    points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
  );
  return (
    <mesh>
      <tubeGeometry args={[curve, 20, 0.015, 8, false]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} />
    </mesh>
  );
}

/* ── Main Scene ─────────────────────────────────────────── */
function PCBSceneInner({
  onSelect,
  selected,
  signalRunning,
}: {
  onSelect: (id: string) => void;
  selected: string | null;
  signalRunning: boolean;
}) {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={0.8} castShadow />
      <pointLight position={[0, 3, 0]} color="#06b6d4" intensity={0.3} />

      {/* PCB Board */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <boxGeometry args={[2.4, 0.1, 2.0]} />
        <meshStandardMaterial color="#1a3a2a" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Traces */}
      <PCBTrace points={[[-0.8, 0, 0.1], [0, 0, 0.1]]} color="#2a6a4a" />
      <PCBTrace points={[[0, 0, 0.1], [0.8, 0, 0.1]]} color="#2a6a4a" />
      <PCBTrace points={[[-0.8, 0, 0.1], [-0.8, 0, -0.5]]} color="#3a5a2a" />
      <PCBTrace points={[[0, 0, 0.1], [0, 0, 0.6]]} color="#2a6a4a" />

      {/* MCU */}
      <PCBComponent
        id="mcu"
        position={[0, 0.05, 0]}
        size={[0.4, 0.08, 0.4]}
        color="#1a4a8a"
        onSelect={onSelect}
        isSelected={selected === "mcu"}
      />

      {/* Sensor */}
      <PCBComponent
        id="sensor"
        position={[-0.9, 0.04, 0.1]}
        size={[0.22, 0.06, 0.14]}
        color="#4a1a8a"
        onSelect={onSelect}
        isSelected={selected === "sensor"}
      />

      {/* Power */}
      <PCBComponent
        id="power"
        position={[-0.8, 0.05, -0.5]}
        size={[0.25, 0.08, 0.2]}
        color="#7a5a0a"
        onSelect={onSelect}
        isSelected={selected === "power"}
      />

      {/* LED */}
      <PCBComponent
        id="led"
        position={[0.9, 0.05, 0]}
        size={[0.08, 0.15, 1]}
        color="#0a4a2a"
        onSelect={onSelect}
        isSelected={selected === "led"}
        isCircle
      />

      {/* Capacitor */}
      <PCBComponent
        id="cap"
        position={[0, 0.06, 0.6]}
        size={[0.06, 0.1, 1]}
        color="#6a0a1a"
        onSelect={onSelect}
        isSelected={selected === "cap"}
        isCircle
      />

      {/* Resistors */}
      <PCBComponent
        id="resistor"
        position={[0.55, 0.04, 0]}
        size={[0.15, 0.05, 0.06]}
        color="#7a4a0a"
        onSelect={onSelect}
        isSelected={selected === "resistor"}
      />

      {/* Signal pulses */}
      <SignalPulse
        points={[[-0.9, 0.1, 0.1], [-0.4, 0.1, 0.05], [0, 0.1, 0]]}
        color="#7c3aed"
        running={signalRunning}
      />
      <SignalPulse
        points={[[0, 0.1, 0], [0.45, 0.1, 0], [0.9, 0.1, 0]]}
        color="#10b981"
        running={signalRunning}
      />

      <OrbitControls
        enablePan={false}
        minDistance={1.5}
        maxDistance={6}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}

/* ── Exported Shell ──────────────────────────────────────── */
export default function PCBScene() {
  const [selected, setSelected] = useState<string | null>(null);
  const [signalRunning, setSignalRunning] = useState(false);

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  const info = selected ? componentData[selected] : null;

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 2.5, 3.5], fov: 45 }}
        shadows
        className="rounded-2xl"
        style={{ background: "#0d1117" }}
        onClick={() => setSelected(null)}
      >
        <PCBSceneInner
          onSelect={handleSelect}
          selected={selected}
          signalRunning={signalRunning}
        />
      </Canvas>

      {/* Component tooltip */}
      <AnimatePresence>
        {info && (
          <motion.div
            key={info.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs p-4 rounded-xl border pointer-events-none"
            style={{
              background: "#0d1117ee",
              borderColor: `${info.color}40`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="font-semibold text-sm mb-1" style={{ color: info.color, fontFamily: "var(--font-display)" }}>
              {info.name}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(240,240,248,0.7)" }}>
              {info.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 px-4">
        <button
          onClick={() => setSignalRunning((v) => !v)}
          className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
          style={{
            background: signalRunning ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${signalRunning ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.15)"}`,
            color: signalRunning ? "#10b981" : "rgba(240,240,248,0.7)",
          }}
        >
          {signalRunning ? "⏹ Stop Signal" : "▶ See How It Works"}
        </button>
        <button
          onClick={() => setSelected(null)}
          className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(240,240,248,0.7)",
          }}
        >
          Reset
        </button>
      </div>

      {/* Hint */}
      {!selected && (
        <div
          className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none"
        >
          <span
            className="px-3 py-1.5 rounded-full text-xs"
            style={{
              background: "rgba(0,0,0,0.5)",
              color: "rgba(240,240,248,0.5)",
              backdropFilter: "blur(4px)",
            }}
          >
            Drag to rotate · Scroll to zoom · Click component to inspect
          </span>
        </div>
      )}
    </div>
  );
}
