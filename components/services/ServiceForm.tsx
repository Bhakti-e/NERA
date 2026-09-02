"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { buildWhatsAppUrl, getServiceLabel } from "@/lib/whatsapp";
import type { ServiceType, ServiceFormData } from "@/types";

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "email" | "tel";
  placeholder?: string;
  options?: string[];
  required?: boolean;
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
    { name: "existingMaterials", label: "Do you have existing materials?", type: "select", options: ["Yes – curriculum/notes", "Yes – diagrams/schematics", "No – starting fresh"] },
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

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2";
const inputStyle = {
  borderColor: "rgba(0,0,0,0.1)",
  background: "white",
  color: "var(--nera-text-primary)",
};

interface Props {
  serviceType: ServiceType;
  onBack: () => void;
}

export default function ServiceForm({ serviceType, onBack }: Props) {
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
    const newErrors: Record<string, string> = {};
    if (!values.name?.trim()) newErrors.name = "Name is required";
    if (!values.contact?.trim()) newErrors.contact = "Contact is required";
    if (!values.description?.trim()) newErrors.description = "Please describe your requirement";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

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

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(16,185,129,0.1)" }}
        >
          <CheckCircle className="w-8 h-8" style={{ color: "#10b981" }} />
        </div>
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)", color: "var(--nera-text-primary)" }}
        >
          Enquiry Prepared
        </h3>
        <p className="text-sm mb-6" style={{ color: "var(--nera-text-secondary)" }}>
          WhatsApp is opening with your structured message. NERA will get back to you shortly.
        </p>
        <button
          onClick={() => { setSubmitted(false); setValues({}); onBack(); }}
          className="text-sm font-medium transition-colors hover:underline"
          style={{ color: "var(--nera-accent-primary)" }}
        >
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm mb-6 transition-colors hover:text-[var(--nera-accent-primary)]"
        style={{ color: "var(--nera-text-secondary)" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Change service
      </button>

      <div className="mb-6 p-3 rounded-xl" style={{ background: "rgba(79,70,229,0.06)", border: "1px solid rgba(79,70,229,0.12)" }}>
        <span className="text-sm font-semibold" style={{ color: "var(--nera-accent-primary)" }}>
          {label}
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Common fields */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--nera-text-secondary)" }}>
            Your Name <span style={{ color: "#f43f5e" }}>*</span>
          </label>
          <input
            type="text"
            value={values.name ?? ""}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Full name"
            className={inputClass}
            style={{ ...inputStyle, borderColor: errors.name ? "#f43f5e" : "rgba(0,0,0,0.1)" }}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="text-xs mt-1" style={{ color: "#f43f5e" }}>{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--nera-text-secondary)" }}>
            Contact (Email or Phone) <span style={{ color: "#f43f5e" }}>*</span>
          </label>
          <input
            type="text"
            value={values.contact ?? ""}
            onChange={(e) => set("contact", e.target.value)}
            placeholder="email@example.com or +91 XXXXXXXXXX"
            className={inputClass}
            style={{ ...inputStyle, borderColor: errors.contact ? "#f43f5e" : "rgba(0,0,0,0.1)" }}
            aria-describedby={errors.contact ? "contact-error" : undefined}
          />
          {errors.contact && <p id="contact-error" className="text-xs mt-1" style={{ color: "#f43f5e" }}>{errors.contact}</p>}
        </div>

        {/* Dynamic fields */}
        {extraFields.map((field) => (
          <div key={field.name}>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--nera-text-secondary)" }}>
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                value={values[field.name] ?? ""}
                onChange={(e) => set(field.name, e.target.value)}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                value={values[field.name] ?? ""}
                onChange={(e) => set(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className={inputClass}
                style={inputStyle}
              />
            ) : (
              <input
                type={field.type}
                value={values[field.name] ?? ""}
                onChange={(e) => set(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={inputClass}
                style={inputStyle}
              />
            )}
          </div>
        ))}

        {/* Research disclaimer */}
        {serviceType === "research-publication" && (
          <p className="text-xs p-3 rounded-lg" style={{ background: "rgba(244,63,94,0.05)", color: "var(--nera-text-secondary)", border: "1px solid rgba(244,63,94,0.12)" }}>
            NERA provides research guidance and publication-process support. We do not guarantee publication outcomes.
          </p>
        )}

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--nera-text-secondary)" }}>
            Describe Your Requirement <span style={{ color: "#f43f5e" }}>*</span>
          </label>
          <textarea
            value={values.description ?? ""}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Tell NERA what you want to build or achieve..."
            rows={4}
            className={inputClass}
            style={{ ...inputStyle, borderColor: errors.description ? "#f43f5e" : "rgba(0,0,0,0.1)", resize: "vertical" }}
            aria-describedby={errors.description ? "desc-error" : undefined}
          />
          {errors.description && <p id="desc-error" className="text-xs mt-1" style={{ color: "#f43f5e" }}>{errors.description}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
          style={{ background: "#25d366" }}
        >
          <MessageCircle className="w-5 h-5" />
          Send via WhatsApp
        </button>

        <p className="text-xs text-center" style={{ color: "var(--nera-text-muted)" }}>
          No account needed. WhatsApp will open with your message pre-filled.
        </p>
      </form>
    </motion.div>
  );
}
