# Design Document — NERA Web Platform (Module 1)

## Overview

NERA's public web platform is a premium, interactive, technology-lab experience — not a generic corporate website. The design must project immediate credibility for institutional buyers and companies while simultaneously feeling like an interactive science museum for students and Gen Z/Alpha audiences.

### Design Philosophy

The site occupies the intersection of three reference points:

1. **Technology lab** — precision, crisp surfaces, structured grids, purposeful use of technical visual language (circuit traces, waveforms, schematics) as accents — not wallpaper
2. **Interactive science museum** — hands-on exploration, discovery-led navigation, 3D interaction, "what happens if I click this?" moments
3. **Modern engineering company** — clean hierarchy, data-driven content, professional tone, results-oriented CTAs

NERA is not a generic black/cyan AI startup. The dominant surfaces are light to neutral. Dark immersive environments are reserved for sections where darkness improves the experience — PCB Lab, Robotics R&D, Simulator experiences. The brand has visual range: the PCB section feels different from the Research section, which feels different from the Simulators catalogue — but all sections share the same typographic system and token-derived accents, so it reads as one brand.

### Scope (Module 1)

Module 1 covers the public-facing website only. The codebase is architected from day one to absorb two future modules without structural rewrites:

- **Module 2 — My NERA:** authenticated customer portal (licences, downloads, order tracking)
- **Module 3 — NERA Admin:** CMS-style dashboard (content, simulators, products, media, customers)

Future route groups for Module 2 and 3 exist as architectural boundaries only. No placeholder UIs, no empty dashboards, no fake login pages are shipped in Module 1.

### Key Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14+ App Router | Route groups isolate future modules; RSC reduces JS bundle; predictable file-system routing |
| Styling | Tailwind CSS + CSS custom properties | Utility-first speed; multi-context theming via `--nera-*` tokens; no runtime style overhead |
| Animation | Framer Motion | Best React integration; layout animations; `useReducedMotion` built-in; scroll-triggered sequences |
| 3D | Three.js + React Three Fiber + Drei | Only on PCB Lab page; dynamic-imported so zero cost on every other page |
| Data | Local TS/JSON files → API-replaceable service layer | Start fast; swap to database without touching UI |
| Deployment | Vercel | Zero-config Next.js; preview URLs; environment variable management |

---

## Architecture

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       Vercel Edge Network                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │               Next.js App Router (SSR/SSG)               │    │
│  │                                                           │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │    │
│  │  │  (public)/   │  │ (my-nera)/   │  │  (admin)/     │  │    │
│  │  │  Module 1    │  │  Module 2    │  │  Module 3     │  │    │
│  │  │  [ACTIVE]    │  │  [BOUNDARY]  │  │  [BOUNDARY]   │  │    │
│  │  └──────┬───────┘  └──────────────┘  └───────────────┘  │    │
│  │         │                                                  │    │
│  │  ┌──────▼──────────────────────────────────────────────┐  │    │
│  │  │              /lib / /services (data layer)           │  │    │
│  │  │   simulatorService  │  roboticsService  │  formUtil  │  │    │
│  │  └──────┬──────────────┴──────────────────┴────────────┘  │    │
│  │         │                                                  │    │
│  │  ┌──────▼──────────────────────────────────────────────┐  │    │
│  │  │      Data Sources (swappable via service layer)      │  │    │
│  │  │   Local JSON/TS files  │  Future: REST / PostgreSQL  │  │    │
│  │  └─────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Next.js App Router Directory Structure

```
myweb/
├── app/
│   ├── (public)/                        # Module 1 — public site
│   │   ├── layout.tsx                   # Public layout: header + footer
│   │   ├── page.tsx                     # Homepage
│   │   ├── explore/
│   │   │   └── page.tsx
│   │   ├── simulators/
│   │   │   ├── page.tsx                 # Simulator catalogue
│   │   │   └── [slug]/
│   │   │       └── page.tsx             # Simulator detail
│   │   ├── robotics/
│   │   │   └── page.tsx
│   │   ├── pcb-lab/
│   │   │   └── page.tsx                 # Full PCB interactive experience
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── not-found.tsx
│   ├── (my-nera)/                       # Module 2 boundary — no pages yet
│   │   └── .gitkeep
│   ├── (admin)/                         # Module 3 boundary — no pages yet
│   │   └── .gitkeep
│   ├── api/                             # API routes (future: auth, payments)
│   │   └── .gitkeep
│   ├── globals.css                      # CSS custom properties + Tailwind base
│   └── layout.tsx                       # Root layout (fonts, metadata defaults)
│
├── components/
│   ├── design-system/                   # Atomic, token-driven primitives
│   │   ├── tokens.css                   # --nera-* CSS custom properties
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Typography.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── motion/
│   │       ├── FadeIn.tsx               # Scroll-triggered entrance
│   │       ├── StaggerChildren.tsx
│   │       └── HoverScale.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ExploreAreas.tsx             # Spatial desktop + swipe mobile
│   │   ├── PCBLabTeaser.tsx             # Interactive teaser inline on homepage
│   │   ├── FeaturedSimulators.tsx
│   │   ├── RoboticsTeaser.tsx
│   │   ├── ServicesHighlight.tsx
│   │   ├── ProjectsShowcase.tsx
│   │   ├── ResearchLearning.tsx
│   │   └── FinalCTA.tsx
│   ├── explore/
│   │   ├── ExploreOrbit.tsx             # Desktop: spatial/orbital interaction
│   │   └── ExploreGrid.tsx              # Mobile/tablet: touch-friendly grid
│   ├── simulators/
│   │   ├── SimulatorCard.tsx
│   │   ├── SimulatorGrid.tsx
│   │   ├── SimulatorFilters.tsx
│   │   └── SimulatorDetail.tsx
│   ├── robotics/
│   │   ├── ProjectCard.tsx
│   │   └── CategorySection.tsx
│   ├── pcb-lab/
│   │   ├── PCBExplorerShell.tsx         # Shell: WebGL check + fallback logic
│   │   ├── PCBScene.tsx                 # Dynamic-imported R3F scene (ssr:false)
│   │   ├── PCBFallback.tsx              # 2D SVG labelled diagram
│   │   ├── ComponentTooltip.tsx
│   │   ├── SignalAnimation.tsx
│   │   └── PCBLabCTA.tsx
│   └── services/
│       ├── ServiceSelector.tsx
│       ├── ServiceRequestForm.tsx
│       ├── fields/
│       │   ├── WebsiteFields.tsx
│       │   ├── SimulatorFields.tsx
│       │   ├── PCBFields.tsx
│       │   ├── RoboticsFields.tsx
│       │   ├── SoftwareFields.tsx
│       │   ├── ResearchFields.tsx
│       │   ├── StudentProjectFields.tsx
│       │   ├── MentorshipFields.tsx
│       │   └── OtherFields.tsx
│       └── WhatsAppConfirmation.tsx
│
├── lib/
│   ├── services/
│   │   ├── simulatorService.ts
│   │   ├── roboticsService.ts
│   │   └── projectService.ts
│   ├── utils/
│   │   ├── whatsapp.ts                  # Single source of truth for WhatsApp
│   │   ├── webgl.ts                     # WebGL capability detection
│   │   ├── featureFlags.ts
│   │   └── metadata.ts                  # Shared Open Graph helpers
│   └── config.ts                        # Reads env vars; never exposes secrets
│
├── data/
│   ├── simulators.ts
│   ├── roboticsProjects.ts
│   └── serviceCategories.ts
│
├── types/
│   ├── simulator.ts
│   ├── roboticsProject.ts
│   ├── service.ts
│   ├── user.ts                          # Interface stub for Module 2
│   └── index.ts
│
├── public/
│   ├── assets/
│   │   ├── images/
│   │   ├── models/                      # GLB/GLTF files
│   │   └── icons/
│   └── fonts/
│
├── .env.example
├── .gitignore
├── vercel.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

### Route Group Isolation

```
app/
  (public)/   ← active Module 1, public layout (Header + Footer)
  (my-nera)/  ← Module 2 boundary; empty; NextAuth middleware added here later
  (admin)/    ← Module 3 boundary; empty; role-check middleware added here later
```

Module 2 and 3 directories exist only as clean boundaries. No routes, no layouts, no stubs are visible to end users. Adding Module 2 means populating `(my-nera)/` with its own `layout.tsx` and pages — zero changes to `(public)/`.

---

## Visual Identity and Design System

### Theming Strategy

The token system supports three named surface contexts. Sections declare which context they use; the token layer handles the rest.

| Context | Usage | Background |
|---|---|---|
| `light` | General pages, simulators catalogue, about, forms | Off-white / warm neutral |
| `mid` | Hero, navigation, cards on light pages | Soft grey / slate |
| `immersive` | PCB Lab, Robotics R&D, deep-dive experiences | Near-black with technical accents |

This is not a user-facing light/dark mode toggle. It is a per-section layout decision baked into the design. No toggle UI is shipped in Module 1.

### Design System Tokens

```css
/* components/design-system/tokens.css */
:root {

  /* ── Surface tokens ─────────────────────────────────────── */
  --nera-surface-page:      #f5f4f2;   /* Primary page background — warm off-white */
  --nera-surface-card:      #ffffff;   /* Card surface */
  --nera-surface-raised:    #efefed;   /* Slightly raised elements */
  --nera-surface-mid:       #1e1e28;   /* Mid-tone panels (hero, nav, etc.) */
  --nera-surface-deep:      #0d0d14;   /* Immersive / PCB Lab / Robotics */
  --nera-surface-deep-alt:  #13131c;   /* Alternating deep panel */

  /* ── Accent colours — domain-associated ─────────────────── */
  /* These are used selectively; not all used on every page    */
  --nera-accent-cyan:       #00c8e8;   /* PCB / Electronics / Embedded */
  --nera-accent-violet:     #7c3aed;   /* Simulators / Software */
  --nera-accent-green:      #10b981;   /* Research / Learning / Active signals */
  --nera-accent-amber:      #f59e0b;   /* Robotics / Prototypes */
  --nera-accent-rose:       #f43f5e;   /* Alerts / Highlights */
  --nera-accent-indigo:     #4f46e5;   /* Projects / General CTA */

  /* Primary interactive accent (used for buttons, links, focus) */
  --nera-accent-primary:    #4f46e5;   /* Indigo — readable on light + dark */

  /* ── Text ───────────────────────────────────────────────── */
  --nera-text-on-light-primary:   #111118;
  --nera-text-on-light-secondary: #555566;
  --nera-text-on-light-muted:     #9999aa;
  --nera-text-on-dark-primary:    #f0f0f8;
  --nera-text-on-dark-secondary:  #9999b0;
  --nera-text-on-dark-muted:      #555566;

  /* ── Typography ─────────────────────────────────────────── */
  --nera-font-display: 'Space Grotesk', sans-serif;   /* Headlines, brand name */
  --nera-font-body:    'Inter', sans-serif;            /* All body copy */
  --nera-font-mono:    'JetBrains Mono', monospace;   /* Code, specs, tech labels */

  /* ── Borders ─────────────────────────────────────────────── */
  --nera-border-light:       rgba(0, 0, 0, 0.08);
  --nera-border-dark:        rgba(255, 255, 255, 0.08);
  --nera-border-accent:      rgba(79, 70, 229, 0.3);
  --nera-border-glow-cyan:   rgba(0, 200, 232, 0.35);

  /* ── Spacing (4px base) ──────────────────────────────────── */
  --nera-space-1:  0.25rem;
  --nera-space-2:  0.5rem;
  --nera-space-4:  1rem;
  --nera-space-8:  2rem;
  --nera-space-16: 4rem;

  /* ── Border radius ───────────────────────────────────────── */
  --nera-radius-sm: 4px;
  --nera-radius-md: 8px;
  --nera-radius-lg: 16px;
  --nera-radius-xl: 24px;

  /* ── Shadows ─────────────────────────────────────────────── */
  --nera-shadow-card:      0 2px 16px rgba(0, 0, 0, 0.08);
  --nera-shadow-elevated:  0 8px 40px rgba(0, 0, 0, 0.14);
  --nera-shadow-glow-cyan: 0 0 32px rgba(0, 200, 232, 0.18);
  --nera-shadow-glow-indigo: 0 0 32px rgba(79, 70, 229, 0.2);

  /* ── Animation ───────────────────────────────────────────── */
  --nera-duration-fast:   150ms;
  --nera-duration-normal: 300ms;
  --nera-duration-slow:   600ms;
  --nera-duration-scene:  1200ms;
  --nera-ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
  --nera-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Domain Colour Associations

Sections and cards use their domain accent for subtle highlight treatment (icon tints, border accents, signal colours). This gives each area a recognisable visual identity while sharing the same structural tokens.

| Domain | Accent token | Primary use |
|---|---|---|
| PCB & Embedded | `--nera-accent-cyan` | Signal animations, component highlights |
| Simulators / Software | `--nera-accent-violet` | Cards, status badges |
| Research / Learning | `--nera-accent-green` | Section headings, tags |
| Robotics | `--nera-accent-amber` | Project cards, R&D highlights |
| Projects | `--nera-accent-indigo` | CTA buttons, category chips |
| Alerts / Highlights | `--nera-accent-rose` | Badges, featured markers |

---

## Components and Interfaces

### Header Component

```typescript
// components/layout/Header.tsx
interface HeaderProps {
  variant?: 'light' | 'dark'; // inferred from page context; default 'light'
}
// State: isScrolled — switches header background from transparent to surface
// State: isMobileMenuOpen
// Renders: Logo | Nav links | "Get NERA Services" CTA | MobileMenuTrigger
// Behaviour: IntersectionObserver on hero bottom edge triggers scroll state
// Keyboard: All nav items focusable; mobile menu triggered by Enter/Space
```

### Navigation Structure

```
Home        →  /
Explore     →  /explore
Simulators  →  /simulators
Robotics    →  /robotics
Services    →  /services
About       →  /about
```

---

## Homepage — Narrative Journey

The homepage is not a stack of independent section components. It is a sequential narrative that tells the NERA story. Each section leads naturally into the next. Layout variety — full-bleed, constrained, split, asymmetric — prevents visual monotony without requiring different component patterns.

### Section Sequence and Context

```
1. HeroSection             [surface: mid-dark]
   Full-viewport opening.
   Background: animated SVG circuit traces (CSS keyframes, no JS overhead).
   Optional: lightweight R3F particle field, dynamic-imported, skipped on low-end.
   Headline: "NERA — Where ideas become interactive technology."
   Sub-headline: "Build · Simulate · Research · Experiment · Learn"
   CTAs: [Explore NERA] [Get NERA Services]
   Scroll indicator animates downward.

2. ExploreAreas            [surface: light]
   Transition: hero fades out into a clean light surface.
   Desktop (≥1024px): spatial layout — 7 domain nodes arranged around a
     central NERA mark. Nodes expand on hover/focus with a description panel.
     Interaction is spatial but not a literal orbit; nodes are positioned on a
     subtle arc or asymmetric grid so they read well at a glance.
   Tablet (640–1023px): 2-row responsive grid of domain tiles with icons
     and short labels. Tap to reveal description.
   Mobile (<640px): vertical stacked list of domain tiles with expand/collapse.
   All nodes are keyboard reachable (Tab order, Enter/Space to expand).
   Domains: Simulators · Robotics · PCB & Embedded · Software · Projects ·
            Research · Learning

3. PCBLabTeaser            [surface: immersive]
   Full-bleed dark section — the first immersive moment in the scroll journey.
   Contains a reduced version of the PCB interactive experience:
     - Rotatable, zoomable PCB model (same R3F scene as PCB Lab page,
       pre-configured to a simplified view)
     - One clickable component with tooltip (demonstrates the capability)
     - "See How It Works" button triggers a single signal animation sequence
   Below the experience:
     "Imagine learning electronics like this."
     "NERA builds interactive simulators for schools, colleges and research."
     [Build a Simulator With NERA] CTA
   Performance: same dynamic import + WebGL check + SVG fallback as PCB Lab.
   This section does NOT duplicate the full PCB Lab page; it is a teaser.

4. FeaturedSimulators      [surface: light]
   Transition back to light surface.
   Horizontal scroll strip (desktop) / vertical list (mobile) of up to 3
   SimulatorCard components sourced from simulatorService.getFeatured().
   Cards show: thumbnail, name, short description, platform tags, status badge.
   [View All Simulators →] link to /simulators.

5. RoboticsTeaser          [surface: mid-dark]
   R&D lab aesthetic — structured grid of real project images with technical
   overlay labels (category, status). If no real images exist, show a
   typographic placeholder grid with domain info.
   [Explore Robotics →] link to /robotics.

6. ServicesHighlight       [surface: light]
   Not a card grid. Uses a large typographic treatment listing service areas.
   Single prominent [Get NERA Services] CTA that opens the services flow.

7. ProjectsShowcase        [surface: light / slight tint]
   Selected NERA projects in an asymmetric masonry-style layout.
   Each project shows: image (if available), name, domain tag, brief summary.

8. ResearchLearning        [surface: light]
   Two-column layout: Research guidance description + Learning tools description.
   Minimal, editorial feel. No fake content.

9. FinalCTA                [surface: mid-dark]
   Full-bleed closing section.
   Short statement + two buttons: [Explore NERA] [Get NERA Services].
   Footer follows directly.
```

### Surface Transitions

Section backgrounds alternate deliberately to create visual rhythm:

```
Hero (dark) → Explore (light) → PCB Teaser (immersive) → Simulators (light)
→ Robotics (mid-dark) → Services (light) → Projects (light) → Research (light)
→ Final CTA (mid-dark) → Footer (deep)
```

---

## PCB Lab — Interactive Experience

### PCB Lab Page (`/pcb-lab`)

The PCB Lab is the most technically complex page. It lives at its own route so it can be loaded independently and linked to from multiple places (homepage teaser, explore section, navigation).

### Component Architecture

```
PCBExplorerShell                    (capability router, no 3D imports)
  ├─ supportsWebGL() → true
  │   └─ dynamic import PCBScene    (ssr:false, Suspense fallback: PCBLoadingSkeleton)
  │       ├─ Canvas (R3F)
  │       │   ├─ PCBMesh            (GLTF model, clickable Mesh groups)
  │       │   ├─ SignalAnimation    (tube/line geometries, animated along path)
  │       │   ├─ OrbitControls      (Drei — rotate, zoom, pan)
  │       │   ├─ Environment        (Drei — HDRI lighting)
  │       │   └─ Html               (Drei — tooltip anchor points)
  │       ├─ ComponentTooltip       (HTML overlay: component name + explanation)
  │       └─ PCBLabControls         (Reset / Free Explore / See How It Works)
  └─ supportsWebGL() → false
      └─ PCBFallback               (SVG labelled diagram + static descriptions)

PCBExplorerShell also wraps PCBScene in an ErrorBoundary.
Any runtime Three.js error renders PCBFallback instead of a blank screen.
```

### PCB Lab Controls (Module 1 scope)

| Control | Interaction |
|---|---|
| Rotate | Click-drag (mouse) / one-finger drag (touch) via OrbitControls |
| Zoom | Scroll wheel (mouse) / pinch (touch) |
| Click component | Highlights mesh, opens ComponentTooltip |
| Reset | Returns camera to default position, clears selection |
| Free Explore | Dismisses any active UI overlays; full exploration mode |
| See How It Works | Triggers SignalAnimation sequence: sensor → MCU → output |

The "deep zoom micro-world" experience is architecturally planned (camera animation path prepared in `PCBScene`) but is not implemented in Module 1. The entry point is stubbed as a disabled button that reads "Coming Soon" to avoid shipping incomplete experiences.

### SVG Fallback

`PCBFallback` renders a clean 2D schematic-style SVG with labelled components. Clicking a component shows the same tooltip content as the 3D version. This is a first-class experience, not an apology page.

---

## Service Request Flow

### Service Selector

9 service categories displayed as interactive tiles (icon + label + one-line description). Keyboard accessible. Selecting a tile slides in the corresponding form.

### Service Form Architecture

```
ServicesPage
  └─ ServiceSelector (9 tiles, keyboard navigable)
      └─ On selection → ServiceRequestForm(serviceType)
          ├─ CommonFields (name, contact — email or phone, brief description)
          ├─ DynamicFields — switch(serviceType):
          │   ├─ WebsiteFields       (type: site/app, rough scope, timeline)
          │   ├─ SimulatorFields     (subject, platform, audience, existing materials)
          │   ├─ PCBFields           (board layers, components, use case, file formats)
          │   ├─ RoboticsFields      (robot type, microcontroller preference, use case)
          │   ├─ SoftwareFields      (type, platform, integrations, rough scope)
          │   ├─ ResearchFields      (field, topic, stage, guidance type)
          │   │     Note: copy states "research guidance and publication-process
          │   │     support" — never promises publication outcomes
          │   ├─ StudentProjectFields (domain, institution, year, deadline)
          │   ├─ MentorshipFields    (goal, current level, preferred schedule)
          │   └─ OtherFields         (open description)
          └─ On submit → whatsapp.buildMessage(data) → open wa.me link
                      → WhatsAppConfirmation overlay shown
```

### WhatsApp Utility

`lib/utils/whatsapp.ts` is the single file that knows the WhatsApp number. All other code calls this module.

```typescript
// lib/utils/whatsapp.ts

// The NERA business WhatsApp number.
// This is a public contact number — NEXT_PUBLIC_* is acceptable here.
// Rule: future secrets (DB credentials, payment keys, private API keys)
// MUST use server-side env vars without the NEXT_PUBLIC_ prefix.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919104703696';

export function buildWhatsAppUrl(formData: ServiceFormData): string {
  const message = formatServiceMessage(formData);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatServiceMessage(data: ServiceFormData): string {
  // Returns a structured, human-readable WhatsApp message:
  //
  // *NERA Service Enquiry*
  // Service: [label]
  // Name: [name]
  // Contact: [email or phone]
  // [service-specific fields]
  // Details: [description]
}
```

### Environment Variable Rule (documented here, enforced in code review)

`NEXT_PUBLIC_*` variables are embedded in the browser bundle. They are safe only for values that are intentionally public — like a business contact number or a feature flag.

**MUST use `NEXT_PUBLIC_*` only for:** WhatsApp number, feature flags, public analytics IDs.

**MUST NOT use `NEXT_PUBLIC_*` for:** database credentials, payment secret keys, private API tokens, admin credentials, JWT secrets. These live in server-side env vars without the prefix and are never imported into client components.

---

## Data Models

All TypeScript interfaces live in `/types/`. Data is sourced from `/data/` local files via service functions in `/lib/services/`. The service layer interface is stable — swapping to a database requires only updating service implementations.

### Simulator

```typescript
// types/simulator.ts
export interface SimulatorLicenceOption {
  id: string;
  name: string;               // e.g. "Student", "Institutional"
  price: number | null;       // null = contact for pricing
  currency: string;           // "INR"
  features: string[];
  requiresLogin: boolean;     // flag for Module 2 gating
}

export interface Simulator {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  screenshots: string[];
  platform: ('Windows' | 'macOS' | 'Linux' | 'Web')[];
  version: string;
  status: 'available' | 'beta' | 'coming-soon';
  category: string;
  features: string[];
  prototypeUrl: string | null;
  licenceOptions: SimulatorLicenceOption[];
  subscriptionPrice: number | null;
  tags: string[];
  isFeatured: boolean;
}
```

### RoboticsProject

```typescript
// types/roboticsProject.ts
export interface RoboticsProject {
  id: string;
  name: string;
  category:
    | 'Microrobotics'
    | 'Biomimetic Robotics'
    | 'Robotic Prototypes'
    | 'Embedded Systems'
    | string;
  description: string;
  status: 'research' | 'prototype' | 'active' | 'completed';
  images: string[];           // only real supplied images; empty array is valid
  tags: string[];
}
```

### ServiceCategory

```typescript
// types/service.ts
export type ServiceType =
  | 'website-webapp'
  | 'custom-simulator'
  | 'pcb-designing'
  | 'robotics-embedded'
  | 'custom-software'
  | 'research-publication'
  | 'student-project'
  | 'mentorship'
  | 'other';

export interface ServiceFormData {
  serviceType: ServiceType;
  name: string;
  contact: string;
  description: string;
  [key: string]: string | boolean | string[];
}
```

### User (Module 2 type stub — not implemented)

```typescript
// types/user.ts
// Defined now so Module 2 can import this type without a structural change.
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  licences: string[];
  orders: string[];
}
```

### Future Database Schema (boundary documentation — not implemented in Module 1)

```
Users             id, email, passwordHash, name, role, createdAt
Simulators        id, slug, name, ...
Licences          id, userId, simulatorId, type, issuedAt, expiresAt
Subscriptions     id, userId, plan, startDate, renewalDate, status
Orders            id, userId, items[], total, status, createdAt
AdminContent      id, type, payload (JSON), updatedBy, updatedAt
```

### Feature Flags

```typescript
// lib/utils/featureFlags.ts
export const flags = {
  myNera:    process.env.NEXT_PUBLIC_FEATURE_MY_NERA    === 'true',
  neraAdmin: process.env.NEXT_PUBLIC_FEATURE_NERA_ADMIN === 'true',
  store:     process.env.NEXT_PUBLIC_FEATURE_STORE       === 'true',
} as const;
// All flags default to false — no future module UI leaks into Module 1
```

### Environment Configuration

```bash
# .env.example

# ── NERA Contact (public — acceptable for NEXT_PUBLIC_*) ──────────────────
NEXT_PUBLIC_WHATSAPP_NUMBER=919104703696

# ── Feature Flags (public) ────────────────────────────────────────────────
NEXT_PUBLIC_FEATURE_MY_NERA=false
NEXT_PUBLIC_FEATURE_NERA_ADMIN=false
NEXT_PUBLIC_FEATURE_STORE=false

# ── Future: Database — server-side only, NEVER use NEXT_PUBLIC_ ──────────
# DATABASE_URL=postgresql://user:password@host:5432/nera_db

# ── Future: Authentication — server-side only ────────────────────────────
# NEXTAUTH_SECRET=
# NEXTAUTH_URL=https://yourdomain.com

# ── Future: Payments — server-side only ──────────────────────────────────
# RAZORPAY_KEY_ID=
# RAZORPAY_KEY_SECRET=
# STRIPE_SECRET_KEY=

# ── Future: Cloud Storage — server-side only ─────────────────────────────
# AWS_S3_BUCKET=
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
```

---

## Correctness Properties

### Property 1: WhatsApp URL structure

For any valid `ServiceFormData`, `buildWhatsAppUrl` SHALL return a string starting with `https://wa.me/919104703696` containing a non-empty URL-encoded `text` parameter.

### Property 2: Service message completeness

For any `ServiceFormData`, `formatServiceMessage` SHALL produce output containing the submitter's name, contact value, service type label, and description.

### Property 3: Simulator data-driven rendering

For any array returned by `simulatorService.getAll()`, `SimulatorGrid` SHALL render exactly one `SimulatorCard` per entry, or the empty-state element when the array is empty.

### Property 4: Form validation gates WhatsApp

When any required field (name, contact, description) is empty or whitespace-only, form validation SHALL surface field errors and SHALL NOT call `buildWhatsAppUrl`.

### Property 5: WebGL fallback

When `supportsWebGL()` returns `false`, `PCBExplorerShell` SHALL render `PCBFallback` and SHALL NOT import or render `PCBScene`.

### Property 6: Feature flag isolation

When `flags.myNera === false`, no rendered public-page output SHALL reference `/my-nera/*` routes or authenticated-only features.

---

## Error Handling

### WebGL Failure

```typescript
// lib/utils/webgl.ts
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}
```

Any exception during capability detection returns `false`, which routes to `PCBFallback`. No error reaches the page.

### 3D Runtime Error

`PCBExplorerShell` wraps the dynamic-imported `PCBScene` in a React Error Boundary. Runtime Three.js errors (e.g. out-of-memory) render `PCBFallback` with an explanatory message.

### Data Errors

Service functions return a typed result:

```typescript
type ServiceResult<T> = { data: T; error: null } | { data: null; error: string };
```

Components render a branded error state on `error !== null`. Raw stack traces never reach the UI.

### Form Validation

`react-hook-form` + `zod` per service type. Errors are inline, linked via `aria-describedby`. Form does not navigate on error.

### 404 Page

`app/(public)/not-found.tsx` renders a branded page with a CTA back to home. No stack traces.

---

## Testing Strategy

Module 1 uses the smallest useful testing stack. Tests cover real risk — not every component.

### Test Stack

| Layer | Tool | Scope |
|---|---|---|
| Unit tests | Vitest | Pure utility functions, data transforms |
| Component tests | Vitest + React Testing Library | Key UI interactions, form logic, fallback rendering |
| E2E (optional, CI) | Playwright | Homepage load, form submission to WA link |

`fast-check` is not included. The properties listed above are tested as standard unit tests with carefully chosen representative inputs and boundary cases. Property-based testing adds concrete value when the input space is too large to enumerate; for this module's pure functions the input space is well-bounded and explicit tests are clearer.

### Unit Tests (Vitest)

`lib/utils/whatsapp.ts`
- `buildWhatsAppUrl` returns correct wa.me URL format
- `buildWhatsAppUrl` URL-encodes special characters in the message
- `formatServiceMessage` includes name, contact, service type, description for every service type
- `formatServiceMessage` handles empty optional fields without crashing

`lib/utils/webgl.ts`
- Returns `false` when `window.WebGLRenderingContext` is undefined (mocked)
- Returns `false` when `getContext` throws (mocked)

`lib/services/simulatorService.ts`
- `getAll()` returns typed array
- `getFeatured()` returns only items where `isFeatured === true`
- `getBySlug()` returns correct item or null

### Component Tests (React Testing Library)

- `ServiceSelector` renders all 9 category tiles; selecting one calls callback with correct type
- `ServiceRequestForm` shows inline errors when required fields are empty on submit
- `ServiceRequestForm` does not call `buildWhatsAppUrl` when validation fails
- `SimulatorCard` renders name, description, and status badge from props
- `SimulatorGrid` renders empty state when passed an empty array
- `PCBExplorerShell` renders `PCBFallback` when `supportsWebGL` is mocked to return false
- `Header` renders mobile menu trigger on small viewports

### What is NOT tested in Module 1

- Database queries (none exist)
- Authentication (none exists)
- Payment flows (none exist)
- 3D scene geometry correctness (visual, not logic)

---

## Performance Strategy

| Concern | Approach |
|---|---|
| 3D on non-3D pages | `PCBScene` and all R3F/Three.js imports are behind `dynamic(..., { ssr: false })` — zero bundle cost on other pages |
| 3D model size | GLB files optimised to ≤ 2 MB via `gltf-pipeline` before commit |
| Homepage 3D teaser | Same dynamic import as PCB Lab; skipped entirely on low-end devices via WebGL check |
| Images | `next/image` with `sizes` and `priority` on above-fold images |
| Fonts | Google Fonts via `next/font` — no layout shift, subset to used characters |
| Animations | `useReducedMotion` hook from Framer Motion respected; animations disabled when user prefers reduced motion |
| Mobile fallback | All 3D sections have a first-class non-3D alternative — not an error state |
| Lighthouse target | ≥ 70 Performance on mobile for non-3D pages; FCP ≤ 2.5 s on homepage |
