import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 relative overflow-hidden"
      style={{ background: "var(--nera-surface-navy)" }}
    >
      <div className="absolute inset-0 nera-grid-bg-navy opacity-60 pointer-events-none" />

      <div className="relative z-10 text-center max-w-md">
        {/* Big number */}
        <div
          className="font-bold mb-2 select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(6rem, 20vw, 10rem)",
            color: "rgba(79,70,229,0.15)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
          aria-hidden="true"
        >
          404
        </div>

        <h1
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)" }}
        >
          Page not found
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--nera-text-on-dark-muted)" }}>
          This page doesn&apos;t exist. Let&apos;s get you back to NERA.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
          style={{ background: "var(--nera-accent-primary)", boxShadow: "var(--shadow-indigo)" }}
        >
          Back to NERA
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
