"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supportsWebGL } from "@/lib/webgl";
import PCBFallback from "./PCBFallback";

const PCBSceneDynamic = dynamic(() => import("./PCBScene"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center rounded-2xl"
      style={{ background: "#0d1117" }}
    >
      <div className="text-center">
        <div
          className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-3"
          style={{
            borderColor: "rgba(6,182,212,0.5)",
            borderTopColor: "transparent",
          }}
        />
        <p className="text-xs" style={{ color: "rgba(6,182,212,0.6)" }}>
          Loading PCB Lab...
        </p>
      </div>
    </div>
  ),
});

class ErrorBoundaryWrapper extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function PCBExplorerShell() {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setWebglOk(supportsWebGL());
  }, []);

  if (webglOk === null) {
    return (
      <div
        className="w-full aspect-[4/3] sm:aspect-video rounded-2xl flex items-center justify-center"
        style={{ background: "#0d1117" }}
      >
        <div
          className="w-6 h-6 border-2 rounded-full animate-spin"
          style={{
            borderColor: "rgba(6,182,212,0.4)",
            borderTopColor: "transparent",
          }}
        />
      </div>
    );
  }

  if (!webglOk || hasError) {
    return <PCBFallback />;
  }

  return (
    <div className="w-full aspect-[4/3] sm:aspect-video relative">
      <ErrorBoundaryWrapper onError={() => setHasError(true)}>
        <PCBSceneDynamic />
      </ErrorBoundaryWrapper>
    </div>
  );
}
