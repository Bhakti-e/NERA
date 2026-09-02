/**
 * NERALogo — uses the official NERA logo PNG.
 *
 * The real logo file must be saved at:
 *   /public/assets/images/nera-logo.png
 *
 * The logo has a white background. ALWAYS place it on a white or
 * very-light surface. Never put it directly on a dark background.
 *
 * For dark sections, use <NERALogoOnDark /> which wraps the logo
 * in a white pill so the background is preserved.
 */

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /** Height of the logo image in px. Width scales automatically. */
  height?: number;
  href?: string;
  className?: string;
}

/** Standard logo — use on white / light backgrounds */
export default function NERALogo({ height = 48, href = "/", className = "" }: LogoProps) {
  const img = (
    <Image
      src="/assets/images/nera-logo.png"
      alt="NERA — New Embark Robotic Age"
      height={height}
      width={height}          /* logo is roughly square */
      className={className}
      priority
      style={{ objectFit: "contain" }}
    />
  );

  if (!href) return img;
  return (
    <Link href={href} className="inline-flex items-center shrink-0" aria-label="NERA home">
      {img}
    </Link>
  );
}

/** Use when the logo must appear over a dark/navy background.
 *  Wraps the logo in a white rounded pill so its white bg blends in. */
export function NERALogoOnDark({ height = 44, href = "/" }: { height?: number; href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center shrink-0" aria-label="NERA home">
      <span
        className="inline-flex items-center justify-center rounded-xl px-2 py-1"
        style={{ background: "#ffffff", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}
      >
        <Image
          src="/assets/images/nera-logo.png"
          alt="NERA — New Embark Robotic Age"
          height={height}
          width={height}
          priority
          style={{ objectFit: "contain" }}
        />
      </span>
    </Link>
  );
}
