"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Send } from "lucide-react";
import { buildWhatsAppUrl, getServiceLabel } from "@/lib/whatsapp";
import type { ServiceType, ServiceFormData } from "@/types";

/* ─── Field definitions — UNCHANGED logic ─────────────── */
interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "email" | "tel";
  placeholder?: string;
  options?: string[];
}

const serviceFields: Record<ServiceType, FieldDef[]> = {
  "website-webapp": [
    { name: "projectType", label: "Project Type", type: "select", options: ["Landing Page", "Web App", "E-commerce", "Portfolio", "Dashboard", "Other"] },
    { name: "timeline", label: "Preferred Timeline", type: "select", options: ["ASAP", "1–2 weeks", "1 month", "2–3 months", "Flexible"] },
    { name: "budget", label: "Approximate Budget (₹)", type: "text", placeholder: "e.g. 15,000 – 30,000" },
  ],
  "custom-simulator": [
    { name: "subject", label: "Subject / Domain", type: "text", placeholder: "e.g. Electronics, Robotics, Physics" },
    { name: "audience", label: "Target Audience", type: "select", options: ["School Students", "College Students", "Research", "Industry", "Other"] },
    { name: "platform", label: "Target Platform", type: "select", options: ["Web Browser", "Windows Desktop", "Cross-Platform", "Not Sure"] },
    { name: "existingMaterials", label: "Existing materials?", type: "select", options: ["Yes – curriculum/notes", "Yes – diagrams/schematics", "No – starting fresh"] },
  ],
  "pcb-designing": [
    { name: "layers", label: "Board Layers", type: "select", options: ["2-layer", "4-layer", "6+ layers", "Not Sure"] },
    { name: "useCase", label: "Application / Use Case", type: "text", placeholder: "e.g. IoT sensor node, motor controller" },
    { name: "components", label: "Key Components", type: "text", placeholder: "e.g. ESP32, LiPo charging, IMU" },
  ],
  "robotics-embedded": [
    { name: "robotType", label: "Robot / System Type", type: "text", placeholder: "e.g. Quadruped, line follower, arm" },
    { name: "mcu", label: "Preferred Microcontroller", type: "select", options: ["Arduino", "STM32", "ESP32", "Raspberry Pi", "No Preference"] },
    { name: "useCase", label: "Purpose / Application", type: "text", placeholder: "e.g. Research prototype, competition, product" },
  ],
  "custom-software": [
    { name: "softwareType", label: "Software Type", type: "select", options: ["Desktop App", "CLI Tool", "API / Backend", "Data Processing", "Automation", "Other"] },
    { name: "targetPlatform", label: "Target Platform", type: "select", options: ["Windows", "macOS", "Linux", "Cross-Platform", "Web"] },
    { name: "integrations", label: "Key Integrations", type: "text", placeholder: "e.g. database, hardware, third-party APIs" },
  ],
  "research-publication": [
    { name: "field", label: "Research Field", type: "text", placeholder: "e.g. Robotics, Computer Vision, IoT" },
    { name: "stage", label: "Current Stage", type: "select", options: ["Topic selection", "Literature review", "Experiments / Data collection", "Writing paper", "Revision / Re-submission"] },
    { name: "guidanceType", label: "Guidance Needed", type: "select", options: ["Research direction", "Methodology", "Paper writing", "Publication process", "All of the above"] },
  ],
  "student-project": [
    { name: "domain", label: "Project Domain", type: "text", placeholder: "e.g. IoT, AI, Robotics, Web" },
    { name: "institution", label: "Institution / College", type: "text", placeholder: "Your college or university" },
    { name: "year", label: "Year / Semester", type: "select", options: ["3rd Year", "4th Year / Final Year", "PG / Masters", "Other"] },
    { name: "deadline", label: "Submission Deadline", type: "text", placeholder: "e.g. March 2025" },
  ],
  mentorship: [
    { name: "goal", label: "Mentorship Goal", type: "text", placeholder: "e.g. Learn embedded systems, build a portfolio" },
    { name: "currentLevel", label: "Current Skill Level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
    { name: "preferredSchedule", label: "Preferred Schedule", type: "select", options: ["Weekdays", "Weekends", "Flexible"] },
  ],
  other: [],
};

/* Submit button label — display only, logic unchanged */
const submitLabel: Partial<Record<ServiceType, string>> = {
  mentorship: "Book Consultation",
  "research-publication": "Book Consultation",
};

/* ─── Shared input styles ───────────────────────────────── */
const inputBase =
  "w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200";

function Field({
  label, error, required, children,
}: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--nera-text-secondary)" }}>
        {label}
        {required && <span className="ml-0.5" style={{ color: "#e11d48" }}> *</span>}
      </label>
      {children}
      {error && <p className="text-xs mt-1.5" style={{ color: "#e11d48" }}>{error}</p>}
    </div>
  );
}

interface Props {
  serviceType: ServiceType;
  onBack: () => void;
}

export default function ServiceForm({ serviceType, onBack }: Props) {
  /* ── All state & logic UNCHANGED ── */
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const label = getServiceLabel(serviceType);
  const extraFields = serviceFields[serviceType] ?? [];

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!values.name?.trim()) errs.name = "Name is required";
    if (!values.contact?.trim()) errs.contact = "Contact is required";
    if (!values.description?.trim()) errs.description = "Please describe your requirement";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const formData: ServiceFormData = {
      serviceType,
      name: values.name ?? "",
      contact: values.contact ?? "",
      description: values.description ?? "",
      ...values,
    };
    const url = buildWhatsAppUrl(formData);
    setSubmitted(true);
    setTimeout(() => window.open(url, "_blank"), 600);
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-16"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: "rgba(5,150,105,0.1)", border: "1px solid rgba(5,150,105,0.2)" }}
        >
          <CheckCircle className="w-7 h-7" style={{ color: "#059669" }} />
        </div>
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
        >
          Enquiry Prepared
        </h3>
        <p className="text-sm max-w-xs mb-7" style={{ color: "var(--nera-text-secondary)" }}>
          WhatsApp is opening with your structured message. NERA will be in touch.
        </p>
        <button
          onClick={() => { setSubmitted(false); setValues({}); onBack(); }}
          className="text-sm font-semibold underline underline-offset-2 transition-colors hover:text-indigo-700"
          style={{ color: "var(--nera-accent-primary)" }}
        >
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  const btnLabel = submitLabel[serviceType] ?? "Submit Requirement";
  const fieldStyle = { borderColor: "rgba(0,0,0,0.1)", background: "white", color: "var(--nera-text-primary)" };
  const fieldFocusRing = { outline: "2px solid rgba(79,70,229,0.35)", outlineOffset: "1px" };

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28 }}
    >
      {/* Back link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium mb-6 transition-colors hover:text-indigo-600"
        style={{ color: "var(--nera-text-muted)" }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Change service
      </button>

      {/* Selected service badge */}
      <div
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl mb-8 text-sm font-semibold"
        style={{
          background: "rgba(79,70,229,0.07)",
          border: "1px solid rgba(79,70,229,0.15)",
          color: "var(--nera-accent-primary)",
        }}
      >
        {label}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <Field label="Your Name" required error={errors.name}>
          <input
            type="text"
            value={values.name ?? ""}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Full name"
            className={inputBase}
            style={{ ...fieldStyle, borderColor: errors.name ? "#e11d48" : "rgba(0,0,0,0.1)" }}
            onFocus={(e) => Object.assign(e.target.style, fieldFocusRing)}
            onBlur={(e) => { e.target.style.outline = "none"; }}
            aria-describedby={errors.name ? "name-err" : undefined}
            id="name-err"
          />
        </Field>

        {/* Contact */}
        <Field label="Contact — Email or Phone" required error={errors.contact}>
          <input
            type="text"
            value={values.contact ?? ""}
            onChange={(e) => set("contact", e.target.value)}
            placeholder="email@example.com  or  +91 XXXXXXXXXX"
            className={inputBase}
            style={{ ...fieldStyle, borderColor: errors.contact ? "#e11d48" : "rgba(0,0,0,0.1)" }}
            onFocus={(e) => Object.assign(e.target.style, fieldFocusRing)}
            onBlur={(e) => { e.target.style.outline = "none"; }}
          />
        </Field>

        {/* Dynamic fields — logic UNCHANGED */}
        {extraFields.map((field) => (
          <Field key={field.name} label={field.label}>
            {field.type === "select" ? (
              <select
                value={values[field.name] ?? ""}
                onChange={(e) => set(field.name, e.target.value)}
                className={inputBase}
                style={fieldStyle}
                onFocus={(e) => Object.assign(e.target.style, fieldFocusRing)}
                onBlur={(e) => { e.target.style.outline = "none"; }}
              >
                <option value="">Select…</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={values[field.name] ?? ""}
                onChange={(e) => set(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={inputBase}
                style={fieldStyle}
                onFocus={(e) => Object.assign(e.target.style, fieldFocusRing)}
                onBlur={(e) => { e.target.style.outline = "none"; }}
              />
            )}
          </Field>
        ))}

        {/* Research disclaimer — logic UNCHANGED */}
        {serviceType === "research-publication" && (
          <div
            className="text-xs p-3.5 rounded-xl"
            style={{
              background: "rgba(225,29,72,0.04)",
              border: "1px solid rgba(225,29,72,0.12)",
              color: "var(--nera-text-secondary)",
            }}
          >
            NERA provides research guidance and publication-process support.
            We do not guarantee publication outcomes.
          </div>
        )}

        {/* Description */}
        <Field label="Describe Your Requirement" required error={errors.description}>
          <textarea
            value={values.description ?? ""}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Tell NERA what you want to build or achieve…"
            rows={4}
            className={inputBase}
            style={{
              ...fieldStyle,
              borderColor: errors.description ? "#e11d48" : "rgba(0,0,0,0.1)",
              resize: "vertical",
              minHeight: "100px",
            }}
            onFocus={(e) => Object.assign(e.target.style, fieldFocusRing)}
            onBlur={(e) => { e.target.style.outline = "none"; }}
          />
        </Field>

        {/* Submit — same WhatsApp logic, new label */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg mt-2"
          style={{
            background: "var(--nera-accent-primary)",
            boxShadow: "var(--shadow-indigo)",
          }}
        >
          <Send className="w-4 h-4" />
          {btnLabel}
        </button>

        <p className="text-xs text-center" style={{ color: "var(--nera-text-muted)" }}>
          No account needed · Your message opens in WhatsApp
        </p>
      </form>
    </motion.div>
  );
}
