"use client";

/**
 * NERALogo — official NERA logo.
 *
 * Uses the PNG at /assets/images/nera-logo.png.
 * If the file hasn't been saved yet, falls back to a clean SVG text mark
 * so the header layout is NEVER broken by a missing image.
 *
 * To activate the real logo: save the official PNG to
 *   /public/assets/images/nera-logo.png
 * No code changes needed — it picks up automatically.
 *
 * Rule: the logo has a white background. Always place it on white/light.
 * For dark backgrounds, use <NERALogoOnDark />.
 */

import Link from "next/link";
import { useState } from "react";

interface Props {
  height?: number;
  href?: string;
  className?: string;
}

function LogoMark({ height = 44 }: { height: number }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // SVG text fallback — same visual weight as the logo, never breaks layout
    return (
      <span
        className="inline-flex items-center gap-1.5 shrink-0"
        style={{ height, minWidth: height }}
        aria-label="NERA"
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: height,
            height: height,
            borderRadius: "50%",
            border: "2px solid #1a1a2e",
            background: "#ffffff",
            flexShrink: 0,
          }}
        >
          <svg
            width={height * 0.55}
            height={height * 0.55}
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            {/* Circuit-trace N */}
            <path
              d="M5 27 L5 7 L19 25 L19 7"
              stroke="#b87333"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M19 7 L25 7 L25 18" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="25" cy="18" r="2" fill="#0891b2" />
          </svg>
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: height * 0.4,
            color: "#0d1117",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          NERA
        </span>
      </span>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/assets/images/nera-logo.png"
      alt="NERA"
      width={height}
      height={height}
      onError={() => setFailed(true)}
      style={{
        width: height,
        height: height,
        objectFit: "contain",
        display: "block",
        flexShrink: 0,
      }}
    />
  );
}

/** Standard — use on white / light backgrounds */
export default function NERALogo({ height = 44, href = "/", className = "" }: Props) {
  if (!href) {
    return <LogoMark height={height} />;
  }
  return (
    <Link
      href={href}
      className={`inline-flex items-center shrink-0 ${className}`}
      aria-label="NERA home"
      style={{ lineHeight: 0 }}
    >
      <LogoMark height={height} />
    </Link>
  );
}

/** For dark/navy backgrounds — wraps logo in white pill */
export function NERALogoOnDark({ height = 44, href = "/" }: { height?: number; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center shrink-0"
      aria-label="NERA home"
      style={{ lineHeight: 0 }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 10px",
          borderRadius: 12,
          background: "#ffffff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
          flexShrink: 0,
        }}
      >
        <LogoMark height={height} />
      </span>
    </Link>
  );
}
