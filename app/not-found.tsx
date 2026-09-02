import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--nera-surface-mid)" }}
    >
      <div className="text-center">
        <p
          className="text-8xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)", color: "rgba(79,70,229,0.3)" }}
        >
          404
        </p>
        <h1
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-on-dark)" }}
        >
          Page not found
        </h1>
        <p className="mb-8" style={{ color: "var(--nera-text-on-dark-muted)" }}>
          This page doesn&apos;t exist. Let&apos;s get you back to NERA.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
          style={{ background: "var(--nera-accent-primary)" }}
        >
          Back to NERA
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
