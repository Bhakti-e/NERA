import type { ServiceFormData, ServiceType } from "@/types";

// ─── Single source of truth for the NERA WhatsApp number ───────────────────
// This is a public business contact number — NEXT_PUBLIC_ is acceptable here.
// NEVER use NEXT_PUBLIC_ for database credentials, payment keys, or secrets.
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919104703696";

export function buildWhatsAppUrl(data: ServiceFormData): string {
  const message = formatServiceMessage(data);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getServiceLabel(type: ServiceType): string {
  const labels: Record<ServiceType, string> = {
    "website-webapp": "Website / Web App",
    "custom-simulator": "Custom Simulator",
    "pcb-designing": "PCB Designing",
    "robotics-embedded": "Robotics / Embedded Development",
    "custom-software": "Custom Software",
    "research-publication": "Research & Publication Support",
    "student-project": "Student / Final-Year Project",
    mentorship: "Live Project / Mentorship",
    other: "Other",
  };
  return labels[type];
}

function formatServiceMessage(data: ServiceFormData): string {
  const serviceLabel = getServiceLabel(data.serviceType as ServiceType);

  const baseLines = [
    `*NERA Service Enquiry*`,
    ``,
    `*Service:* ${serviceLabel}`,
    `*Name:* ${data.name}`,
    `*Contact:* ${data.contact}`,
  ];

  // Service-specific fields
  const extraLines: string[] = [];

  switch (data.serviceType) {
    case "website-webapp":
      if (data.projectType) extraLines.push(`*Type:* ${data.projectType}`);
      if (data.timeline) extraLines.push(`*Timeline:* ${data.timeline}`);
      break;
    case "custom-simulator":
      if (data.subject) extraLines.push(`*Subject Area:* ${data.subject}`);
      if (data.audience) extraLines.push(`*Target Audience:* ${data.audience}`);
      if (data.platform) extraLines.push(`*Platform:* ${data.platform}`);
      break;
    case "pcb-designing":
      if (data.layers) extraLines.push(`*Board Layers:* ${data.layers}`);
      if (data.useCase) extraLines.push(`*Use Case:* ${data.useCase}`);
      break;
    case "robotics-embedded":
      if (data.robotType) extraLines.push(`*Robot Type:* ${data.robotType}`);
      if (data.mcu) extraLines.push(`*Microcontroller:* ${data.mcu}`);
      break;
    case "custom-software":
      if (data.softwareType)
        extraLines.push(`*Software Type:* ${data.softwareType}`);
      if (data.targetPlatform)
        extraLines.push(`*Platform:* ${data.targetPlatform}`);
      break;
    case "research-publication":
      if (data.field) extraLines.push(`*Research Field:* ${data.field}`);
      if (data.stage) extraLines.push(`*Current Stage:* ${data.stage}`);
      if (data.guidanceType)
        extraLines.push(`*Guidance Needed:* ${data.guidanceType}`);
      break;
    case "student-project":
      if (data.domain) extraLines.push(`*Domain:* ${data.domain}`);
      if (data.institution)
        extraLines.push(`*Institution:* ${data.institution}`);
      if (data.deadline) extraLines.push(`*Deadline:* ${data.deadline}`);
      break;
    case "mentorship":
      if (data.goal) extraLines.push(`*Goal:* ${data.goal}`);
      if (data.currentLevel)
        extraLines.push(`*Current Level:* ${data.currentLevel}`);
      break;
  }

  const descLine = data.description
    ? [``, `*Details:* ${data.description}`]
    : [];

  return [...baseLines, ...extraLines, ...descLine].join("\n");
}
