import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NERA — New Embark Robotic Age",
    template: "%s | NERA",
  },
  description:
    "NERA builds interactive simulators, robotics prototypes, PCB designs, custom software, and research tools. Where ideas become interactive technology.",
  keywords: [
    "NERA",
    "robotics",
    "simulators",
    "PCB design",
    "embedded systems",
    "research",
    "interactive learning",
  ],
  openGraph: {
    title: "NERA — New Embark Robotic Age",
    description: "Where ideas become interactive technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
