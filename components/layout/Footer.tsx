import Link from "next/link";
import { Zap, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="text-[var(--nera-text-on-dark)]"
      style={{ background: "var(--nera-surface-deep)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--nera-accent-primary)] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                NERA
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--nera-text-on-dark-muted)" }}
            >
              New Embark Robotic Age. Where ideas become interactive technology.
            </p>
          </div>

          {/* What We Do */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: "var(--nera-text-on-dark-muted)" }}
            >
              What We Do
            </h3>
            <ul className="space-y-2">
              {[
                "Simulator Software",
                "Robotics R&D",
                "PCB Design",
                "Embedded Systems",
                "Custom Software",
                "Research Support",
              ].map((item) => (
                <li key={item}>
                  <span
                    className="text-sm"
                    style={{ color: "var(--nera-text-on-dark-muted)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: "var(--nera-text-on-dark-muted)" }}
            >
              Platform
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Simulators", href: "/simulators" },
                { label: "PCB Lab", href: "/pcb-lab" },
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "var(--nera-text-on-dark-muted)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: "var(--nera-text-on-dark-muted)" }}
            >
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/919104703696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-green-400"
                  style={{ color: "var(--nera-text-on-dark-muted)" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@nera.tech"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                  style={{ color: "var(--nera-text-on-dark-muted)" }}
                >
                  <Mail className="w-4 h-4" />
                  hello@nera.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            color: "var(--nera-text-on-dark-muted)",
          }}
        >
          <span>© {new Date().getFullYear()} NERA — New Embark Robotic Age</span>
          <span>Built with passion for interactive technology</span>
        </div>
      </div>
    </footer>
  );
}
