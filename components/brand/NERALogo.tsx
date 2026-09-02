/**
 * NERALogo component
 *
 * Usage:
 *   <NERALogo variant="full" />        — circular logo + NERA wordmark (white bg area)
 *   <NERALogo variant="mark" />        — just the circular mark
 *   <NERALogo variant="wordmark" />    — just the "NERA" text
 *
 * The real logo has a white background. Always place this on a white or
 * very-light surface. Never put variant="full" or variant="mark" on a dark bg.
 *
 * For dark backgrounds: use variant="wordmark" with light text styling,
 * or wrap variant="full" in a small white pill/badge container.
 *
 * When the real PNG logo is available, drop it at:
 *   /public/assets/images/nera-logo.png
 * and uncomment the <Image> version below.
 */

import Link from "next/link";
// import Image from "next/image";

interface Props {
  variant?: "full" | "mark" | "wordmark";
  size?: number;   // height in px for the mark area
  href?: string;
  className?: string;
}

export default function NERALogo({
  variant = "full",
  size = 44,
  href = "/",
  className = "",
}: Props) {
  const content = (
    <span
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      aria-label="NERA — New Embark Robotic Age"
    >
      {/* ── Circular mark — SVG recreation of the real logo ── */}
      {(variant === "full" || variant === "mark") && (
        <span
          className="inline-flex items-center justify-center rounded-full shrink-0"
          style={{
            width: size,
            height: size,
            background: "#ffffff",
            border: "2px solid #1a1a2e",
            boxShadow: "0 1px 8px rgba(0,0,0,0.12)",
          }}
        >
          <svg
            width={size * 0.72}
            height={size * 0.72}
            viewBox="0 0 52 52"
            fill="none"
            aria-hidden="true"
          >
            {/* ── Circuit N shape — copper traces radiating from letter N ── */}
            {/* Main N diagonal stroke */}
            <path
              d="M 10 40 L 10 12 L 28 36 L 28 12"
              stroke="url(#copper-grad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Circuit traces radiating from N */}
            {/* Top-left traces */}
            <path d="M 10 12 L 5 8 M 10 12 L 7 6 M 10 12 L 4 11 M 10 16 L 4 14 M 10 20 L 3 18"
              stroke="#b87333" strokeWidth="0.8" strokeLinecap="round" />
            {/* Small pads at trace ends */}
            <circle cx="5" cy="8" r="1.2" fill="#b87333" />
            <circle cx="7" cy="6" r="1.2" fill="#b87333" />
            <circle cx="4" cy="11" r="1.2" fill="#b87333" />
            <circle cx="4" cy="14" r="1.2" fill="#b87333" />
            <circle cx="3" cy="18" r="1.2" fill="#b87333" />

            {/* Top-right traces from N top */}
            <path d="M 28 12 L 33 8 M 28 12 L 35 10 M 28 12 L 34 14 M 28 16 L 36 14 M 28 20 L 37 19"
              stroke="#c8996e" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="33" cy="8" r="1.2" fill="#c8996e" />
            <circle cx="35" cy="10" r="1.2" fill="#c8996e" />
            <circle cx="34" cy="14" r="1.2" fill="#c8996e" />
            <circle cx="36" cy="14" r="1.2" fill="#c8996e" />
            <circle cx="37" cy="19" r="1.2" fill="#c8996e" />

            {/* Teal accent trace — signature feature of the logo */}
            <path d="M 32 10 L 36 10 L 36 28 L 34 28"
              stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="36" cy="10" r="2" fill="#14b8a6" />
            <circle cx="34" cy="28" r="2.5" fill="#0f766e" />

            {/* Bottom/right traces from lower N */}
            <path d="M 28 36 L 34 38 M 28 36 L 35 36 M 28 32 L 36 33 M 10 36 L 5 40 M 10 36 L 4 37"
              stroke="#a0785a" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="34" cy="38" r="1.2" fill="#a0785a" />
            <circle cx="35" cy="36" r="1.2" fill="#a0785a" />
            <circle cx="36" cy="33" r="1.2" fill="#a0785a" />
            <circle cx="5" cy="40" r="1.2" fill="#a0785a" />
            <circle cx="4" cy="37" r="1.2" fill="#a0785a" />

            <defs>
              <linearGradient id="copper-grad" x1="10" y1="12" x2="28" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#b87333" />
                <stop offset="50%" stopColor="#cd7f32" />
                <stop offset="100%" stopColor="#1e3a5f" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      )}

      {/* ── Wordmark ── */}
      {(variant === "full" || variant === "wordmark") && (
        <span className="flex flex-col leading-none">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: variant === "full" ? `${size * 0.38}px` : `${size * 0.5}px`,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 60%, #1e3a5f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
            }}
          >
            NERA
          </span>
          {variant === "full" && size >= 40 && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: `${size * 0.16}px`,
                color: "#4a5568",
                letterSpacing: "0.01em",
                marginTop: "2px",
              }}
            >
              New Embark Robotic Age
            </span>
          )}
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex" aria-label="Go to NERA homepage">
      {content}
    </Link>
  );
}

/**
 * Dark background variant — white pill wrapper containing the logo
 * Use this when the logo must appear on a dark section.
 */
export function NERALogoBadge({ size = 40, href = "/" }: { size?: number; href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5" aria-label="NERA home">
      <span
        className="inline-flex items-center justify-center rounded-full shrink-0"
        style={{
          width: size,
          height: size,
          background: "#ffffff",
          border: "1.5px solid rgba(255,255,255,0.9)",
          boxShadow: "0 0 0 2px rgba(79,70,229,0.2), 0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <path d="M 10 40 L 10 12 L 28 36 L 28 12" stroke="url(#cop2)" strokeWidth="4.5"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {["M 10 12 L 5 8","M 10 12 L 7 6","M 28 12 L 33 8","M 28 12 L 35 10"].map((d,i) => (
            <path key={i} d={d} stroke="#b87333" strokeWidth="0.9" strokeLinecap="round" />
          ))}
          <path d="M 32 10 L 36 10 L 36 28 L 34 28" stroke="#14b8a6" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="36" cy="10" r="2" fill="#14b8a6" />
          <circle cx="34" cy="28" r="2.5" fill="#0f766e" />
          <defs>
            <linearGradient id="cop2" x1="10" y1="12" x2="28" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#b87333" />
              <stop offset="100%" stopColor="#1e3a5f" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: `${size * 0.38}px`,
        color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em" }}>
        NERA
      </span>
    </Link>
  );
}
