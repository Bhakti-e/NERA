# Requirements Document

## Introduction

NERA (New Embark Robotic Age) is a technology company operating across simulator software, robotics R&D, PCB design, embedded systems, website/web app development, custom software, student projects, and research guidance. This document defines the requirements for Module 1 of the NERA web platform — the public-facing website.

The platform must feel like an interactive futuristic technology lab, not a conventional corporate website. It must be premium, creative, and engaging for school students, college students, Gen Z/Alpha audiences, researchers, institutions, and companies. The architecture must be deliberately designed to expand into three long-term modules:

- **Module 1 (current scope):** Public NERA website
- **Module 2 (future):** My NERA — customer accounts, licences, subscriptions, downloads
- **Module 3 (future):** NERA Admin — dashboard for managing all platform content and operations

---

## Glossary

- **Platform:** The NERA web platform consisting of all three future modules.
- **Module 1:** The public-facing NERA website, the scope of this document.
- **My_NERA:** Future Module 2 — authenticated customer portal.
- **NERA_Admin:** Future Module 3 — private administrative dashboard.
- **Simulator_Catalogue:** The browsable, filterable listing of NERA simulator software products.
- **Simulator:** A specific software product built by NERA for education or research, with licence options.
- **PCB_Explorer:** The interactive 3D printed-circuit-board learning experience embedded in the website.
- **Service_Request_Form:** The dynamic, service-type-specific enquiry form that generates a WhatsApp message.
- **WhatsApp_Config:** The single configuration location storing the NERA WhatsApp contact number.
- **Design_System:** NERA's shared set of visual tokens, components, typography, colours, and animation primitives.
- **3D_Scene:** Any Three.js/React Three Fiber rendered interactive 3D environment on the platform.
- **Fallback_View:** A non-3D alternative UI rendered when the device cannot support a 3D_Scene.
- **Environment_Config:** The `.env` file and `.env.example` reference storing all secrets and configurable values.
- **CTA:** Call to action — a prominent button or link prompting user action.
- **Prototype:** A publicly accessible, limited-functionality preview of a Simulator.
- **Licence:** A paid entitlement granting access to the full version of a Simulator.
- **Lazy_Loading:** Technique of deferring the loading of code or assets until they are needed.
- **Dynamic_Import:** JavaScript code-splitting mechanism to load modules on demand.
- **EARS:** Easy Approach to Requirements Syntax — the pattern used for all acceptance criteria.

---

## Requirements

---

### Requirement 1: Design System and Visual Identity

**User Story:** As a visitor, I want the website to feel like a premium interactive technology lab, so that I immediately understand NERA's identity and trust the brand.

#### Acceptance Criteria

1. THE Design_System SHALL define a colour palette, typography scale, spacing scale, border radius tokens, shadow tokens, and animation duration tokens used consistently across all pages.
2. THE Design_System SHALL include a dark-first theme reflecting a technology-lab aesthetic, with optional light-mode support defined as a future extension point.
3. THE Design_System SHALL export all design tokens as CSS custom properties so that they can be consumed by Tailwind CSS utility classes and inline styles without duplication.
4. WHEN a new page or component is created, THE Design_System SHALL provide reusable React components for layout, typography, buttons, cards, inputs, and modals so that visual consistency is maintained without re-implementing styles.
5. THE Design_System SHALL include motion presets (entrance, hover, scroll-triggered reveal) using Framer Motion so that all animated elements share consistent easing curves and durations.
6. IF a user has enabled the operating-system "reduce motion" preference, THEN THE Design_System SHALL suppress or minimise all decorative animations while preserving functional transitions.
7. THE Platform SHALL be fully responsive, rendering correctly and usably on viewport widths from 320px (small phone) through 768px (tablet) to 1440px and above (desktop).

---

### Requirement 2: Site Architecture and Navigation

**User Story:** As a visitor, I want clear and intuitive navigation, so that I can find any section of the NERA website quickly.

#### Acceptance Criteria

1. THE Platform SHALL organise all public pages under a top-level navigation structure covering: Home, Explore, Simulators, Robotics, Services, and About.
2. THE Platform SHALL implement navigation using a sticky header that remains visible during scroll, with a mobile-responsive hamburger menu for viewports below 768px.
3. WHEN a user scrolls past the hero section of the homepage, THE Platform SHALL update the header to a condensed, opaque state so that navigation remains legible against page content.
4. THE Platform SHALL use Next.js App Router with a clear directory structure that separates public routes, future authenticated routes (My_NERA), and future admin routes (NERA_Admin) without requiring a full rewrite to add them.
5. THE Platform SHALL define route groups in the Next.js App Router so that public pages, future My_NERA pages, and future NERA_Admin pages each have their own layout wrapper.
6. IF a user navigates to a route that does not exist, THEN THE Platform SHALL display a branded 404 page with a CTA to return to the homepage.
7. THE Platform SHALL include structured page metadata (title, description, Open Graph tags) on every public page so that search engines and social platforms display accurate previews.

---

### Requirement 3: Homepage

**User Story:** As a first-time visitor, I want an engaging, visually rich homepage, so that I immediately understand what NERA does and feel compelled to explore further.

#### Acceptance Criteria

1. THE Platform SHALL render a full-viewport hero section at the top of the homepage containing the headline "NERA — Where ideas become interactive technology", the tagline "Build • Simulate • Research • Experiment • Learn", and two primary CTAs: "Explore NERA" and "Get NERA Services".
2. THE Platform SHALL render an Explore Areas section below the hero that visually represents the seven domains: Simulators, Robotics, PCB & Embedded, Software, Projects, Research, and Learning — using an interactive, non-grid creative layout (such as an orbital, radial, or layered card arrangement).
3. WHEN a user hovers over or taps an Explore Area card, THE Platform SHALL animate the card with a visual highlight and display a brief description of that domain without navigating away.
4. THE Platform SHALL render a Featured Simulators preview section showing up to three Simulators from the catalogue with their name, a short description, and a "View Simulator" link.
5. THE Platform SHALL render a Services highlight section summarising NERA's service categories with a single prominent "Get NERA Services" CTA.
6. THE Platform SHALL render a Robotics teaser section with imagery or animation that conveys NERA's R&D work without fabricating products that do not exist.
7. THE Platform SHALL render an Interactive Learning teaser that previews the PCB_Explorer experience and links to the full PCB learning page.
8. THE Platform SHALL render a footer containing NERA's contact information, social links (if available), and navigation links to all major sections.
9. WHEN a user clicks "Explore NERA", THE Platform SHALL scroll smoothly to the Explore Areas section or navigate to a dedicated Explore page.
10. WHEN a user clicks "Get NERA Services", THE Platform SHALL navigate to the Services page.

---

### Requirement 4: Explore Experience

**User Story:** As a visitor, I want to explore NERA's domains in a visually engaging way, so that I can discover what NERA works on without reading a wall of text.

#### Acceptance Criteria

1. THE Platform SHALL provide an Explore page or section where each of the seven NERA domains is presented with a title, visual element, short description, and a link to its dedicated section.
2. WHEN a user selects a domain from the Explore view, THE Platform SHALL reveal expanded content for that domain using an animated transition.
3. THE Platform SHALL present domain content using a creative layout that avoids standard grid-of-cards patterns, using techniques such as horizontal scroll panels, staggered reveals, or layered z-axis depth.
4. WHILE a 3D_Scene is loading in the Explore view, THE Platform SHALL display a skeleton or placeholder so that the layout does not shift.

---

### Requirement 5: Interactive PCB Learning Experience (PCB Explorer)

**User Story:** As a student or curious visitor, I want to interact with a 3D PCB model, so that I can understand how electronic circuits work in an engaging, hands-on way.

#### Acceptance Criteria

1. THE PCB_Explorer SHALL render an interactive 3D PCB model using Three.js and React Three Fiber, allowing the user to rotate and zoom the model with mouse drag, touch swipe, and pinch gestures.
2. WHEN a user clicks or taps a labelled component on the PCB model, THE PCB_Explorer SHALL display a tooltip or side panel with the component's name, function, and a plain-language description of its role in the circuit.
3. WHEN a user activates "See How It Works", THE PCB_Explorer SHALL run an animated signal-flow visualisation showing the path: Sensor → signal line → Microcontroller → output line → LED/Motor, with animated pulses travelling along the PCB traces.
4. THE PCB_Explorer SHALL provide a "Deep Dive" mode where the camera smoothly zooms into a section of the PCB so that traces appear as pathways and components appear as structures, creating an immersive miniature-world effect.
5. IF a user's device does not support WebGL or the device performance score is below an acceptable threshold, THEN THE PCB_Explorer SHALL render the Fallback_View consisting of a labelled 2D diagram with static descriptions in place of the 3D model.
6. THE PCB_Explorer SHALL conclude with a CTA section containing the message "Imagine learning electronics like this. NERA builds interactive simulators for schools, colleges and research." and a button labelled "Build a Simulator With NERA" linking to the Services page.
7. THE PCB_Explorer SHALL be implemented as a lazily loaded module so that the Three.js and React Three Fiber libraries are not bundled into pages that do not use them.
8. THE PCB_Explorer SHALL be designed as the first in a series of future interactive learning experiences (logic gates, networking, robotics, sensors, cybersecurity), with a shared component architecture that allows new experiences to be added by creating new scene modules.

---

### Requirement 6: Robotics Section

**User Story:** As a researcher or enthusiast, I want to see NERA's robotics work, so that I can assess NERA's expertise and understand the type of projects they undertake.

#### Acceptance Criteria

1. THE Platform SHALL present the Robotics section with an R&D-lab aesthetic using visual design, layout, and typography — not as a photo gallery.
2. THE Platform SHALL only display robotics content (images, descriptions, project status) for projects and prototypes that NERA actually has; THE Platform SHALL never render fabricated product listings, fake 3D models, or placeholder commercial items presented as real.
3. WHEN only photographs are available for a robotics project, THE Platform SHALL display those photographs with rich contextual descriptions rather than attempting to generate 3D representations.
4. THE Platform SHALL categorise robotics content by type (e.g., Microrobotics, Biomimetic Robotics, Robotic Prototypes) with each category rendered as a distinct section.
5. WHEN a user views a robotics project, THE Platform SHALL display the project name, category, description, development status, and any available images.

---

### Requirement 7: Simulator Catalogue

**User Story:** As a student, educator, or institutional buyer, I want to browse NERA's simulator software, so that I can find a simulator relevant to my field and understand my options for accessing it.

#### Acceptance Criteria

1. THE Simulator_Catalogue SHALL render a browsable, filterable listing of all available Simulators, each displayed as a card with: name, thumbnail image, short description, platform compatibility, version, and development status.
2. WHEN a user clicks a Simulator card, THE Platform SHALL navigate to a dedicated Simulator detail page displaying the full description, feature list, screenshots or preview media, version history, licence options, and pricing.
3. THE Simulator detail page SHALL display a "Try Prototype" button if a publicly accessible Prototype exists for that Simulator.
4. THE Simulator detail page SHALL display a "Get Licence" button and an "Institutional Version" button, with each button's behaviour defined as: "Get Licence" initiates a licence enquiry (and in future, redirects to the authenticated purchase flow in My_NERA); "Institutional Version" opens the Service_Request_Form pre-filled with the Simulator name.
5. THE Platform SHALL retrieve Simulator data from a data source (initially a local JSON/TypeScript data file, replaceable with an API without changing UI components) so that adding or updating Simulators does not require editing React components.
6. WHEN a Simulator's pricing is displayed, THE Platform SHALL read the price from the data source or Environment_Config and SHALL NOT hard-code price values in any React component or JSX template.
7. WHEN no Simulators are available in the data source, THE Simulator_Catalogue SHALL display an empty-state message rather than a broken layout.
8. THE Simulator_Catalogue architecture SHALL support pagination or infinite scroll for future growth beyond the initial set of Simulators.

---

### Requirement 8: Get NERA Services — Service Request Flow

**User Story:** As a potential client, I want to submit a service enquiry easily, so that I can quickly contact NERA about the specific service I need without creating an account.

#### Acceptance Criteria

1. THE Platform SHALL provide a Services page accessible via the "Get NERA Services" CTA and the main navigation, listing the following service categories: Website/Web App, Custom Simulator, PCB Designing, Robotics/Embedded Development, Custom Software, Research & Publication Support, Student/Final-Year Project, Live Project/Mentorship, and Other.
2. WHEN a user selects a service category, THE Service_Request_Form SHALL render fields dynamically relevant to that service type rather than a single generic form for all services.
3. THE Service_Request_Form SHALL include at minimum the following fields across all service types: name, contact (email or phone), and a description of the requirement.
4. WHEN a user selects "Research & Publication Support", THE Service_Request_Form SHALL describe the service as "research guidance and publication-process support" and SHALL NOT include any language that promises or implies guaranteed publication outcomes.
5. WHEN a user submits a completed Service_Request_Form, THE Platform SHALL construct a structured, human-readable WhatsApp message from the form data and open WhatsApp using the `wa.me` deep-link protocol directed to the NERA WhatsApp number.
6. THE WhatsApp_Config SHALL store the NERA WhatsApp contact number (+91 9104703696) in exactly one location (an Environment_Config variable) so that updating the number requires changing only that one value.
7. THE Platform SHALL not require the user to create an account or log in to submit a service enquiry.
8. IF a user submits the Service_Request_Form with missing required fields, THEN THE Platform SHALL display inline validation messages identifying the incomplete fields without navigating away from the form.
9. WHEN the WhatsApp deep link is triggered, THE Platform SHALL display a confirmation message informing the user that their enquiry has been prepared and that WhatsApp will open.

---

### Requirement 9: Performance and Loading Strategy

**User Story:** As a visitor on any device, I want the website to load quickly and remain responsive, so that I am not frustrated by slow performance even when visiting interactive 3D sections.

#### Acceptance Criteria

1. THE Platform SHALL use Next.js Dynamic Imports with `next/dynamic` and `ssr: false` for all 3D_Scene components so that Three.js and React Three Fiber are never bundled into the initial page load of pages that do not render 3D content.
2. THE Platform SHALL use Lazy_Loading for all images using the Next.js `<Image>` component with appropriate `width`, `height`, and `priority` attributes so that images outside the initial viewport are not downloaded until needed.
3. THE Platform SHALL achieve a Lighthouse Performance score of 70 or above on mobile for non-3D pages so that the core website experience is not degraded by the presence of 3D features.
4. WHEN a 3D_Scene is loading, THE Platform SHALL display a loading indicator or skeleton within the 3D_Scene container so that the surrounding page layout does not shift.
5. THE Platform SHALL optimise all 3D assets (GLTF/GLB models, textures) to the minimum fidelity required for the intended visual experience, with compressed textures and polygon counts appropriate for web delivery.
6. IF a device fails the WebGL capability check, THEN THE Platform SHALL render the Fallback_View for that section without throwing a JavaScript error that would crash the page.

---

### Requirement 10: Security and Configuration

**User Story:** As the NERA platform operator, I want all secrets and configurable values managed safely, so that no sensitive data is exposed in the browser or source code.

#### Acceptance Criteria

1. THE Platform SHALL store all secrets, API keys, database credentials, payment keys, and configurable contact values exclusively in server-side Environment_Config variables, never in client-side JavaScript bundles.
2. THE Platform SHALL include a `.env.example` file listing every required environment variable with placeholder values and a comment describing each variable's purpose, so that new developers can configure the environment without accessing production secrets.
3. THE Platform SHALL never trust frontend-submitted values for price, licence entitlement, payment status, or admin access; these values SHALL be validated server-side in future API routes.
4. THE WhatsApp_Config number SHALL be stored as an environment variable (`NEXT_PUBLIC_WHATSAPP_NUMBER`) and read from that variable in exactly one utility function so that all Service_Request_Form instances reference the same source.
5. THE Platform SHALL add `.env` and `.env.local` to `.gitignore` so that secrets are never committed to version control.
6. IF an environment variable required at runtime is missing, THEN THE Platform SHALL log a descriptive warning at startup (not in the browser console) and degrade gracefully rather than throwing an unhandled exception.

---

### Requirement 11: Deployment and Hosting Readiness

**User Story:** As the NERA platform operator, I want the platform deployable to Vercel with a public HTTPS URL, so that stakeholders can preview the live site before a domain is connected.

#### Acceptance Criteria

1. THE Platform SHALL produce a successful Next.js production build (`next build`) with zero errors so that it can be deployed to Vercel or any Node.js-compatible hosting platform.
2. THE Platform SHALL not reference `localhost`, local file system paths, or machine-specific paths anywhere in the codebase so that all environments use relative or environment-variable-driven URLs.
3. THE Platform SHALL be deployable to Vercel via Git integration with no manual build configuration beyond setting environment variables in the Vercel dashboard.
4. THE Platform SHALL include a `vercel.json` configuration file if any custom routing, redirects, or headers are required for correct operation.
5. WHEN deployed, THE Platform SHALL serve all pages over HTTPS and include appropriate security headers (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options).

---

### Requirement 12: Expandable Architecture for Future Modules

**User Story:** As the NERA platform operator, I want the codebase structured to support My NERA and NERA Admin as future modules, so that adding authentication, licensing, and admin features does not require rewriting the existing public website.

#### Acceptance Criteria

1. THE Platform SHALL use Next.js App Router route groups so that `/app/(public)/`, `/app/(my-nera)/`, and `/app/(admin)/` are distinct layout zones, each capable of having its own authentication middleware without affecting other zones.
2. THE Platform SHALL define a shared database schema design (as a documented data model, not yet implemented) that covers: Users, Simulators, Licences, Subscriptions, Orders, and AdminRoles — so that Module 2 and Module 3 can be built on top of the existing data model.
3. THE Platform SHALL separate all data-fetching logic into service functions (in a `/lib/` or `/services/` directory) rather than embedding fetch calls directly in React components, so that data sources can be swapped from local files to API/database without changing UI code.
4. THE Platform SHALL implement a feature-flag mechanism (an environment variable or config object) so that UI elements for My_NERA and NERA_Admin can be toggled on as those modules are developed.
5. THE Simulator_Catalogue data model SHALL include fields for: `licenceOptions`, `subscriptionPrice`, `requiresLogin`, and `prototypeUrl` so that the future payment and licence flow can be added to the existing catalogue without schema migration.
6. THE Platform SHALL use TypeScript interfaces or types for all data models (Simulator, Service, RoboticsProject, etc.) defined in a `/types/` directory, so that Module 2 and Module 3 developers have a clear contract for the existing data shapes.

---

### Requirement 13: Accessibility

**User Story:** As a user with accessibility needs, I want the platform to be usable with keyboard navigation and screen readers, so that NERA's content is accessible to everyone.

#### Acceptance Criteria

1. THE Platform SHALL meet WCAG 2.1 Level AA criteria for all non-3D page content, including sufficient colour contrast, labelled form fields, and focus-visible keyboard indicators.
2. THE Platform SHALL provide `aria-label` attributes on all interactive elements that do not contain visible text (icon buttons, close buttons, 3D canvas controls).
3. WHEN a 3D_Scene is present, THE Platform SHALL provide an accessible text alternative (descriptive paragraph or labelled diagram) adjacent to the 3D_Scene container so that screen reader users can access the same information.
4. THE Platform SHALL ensure that all form fields in the Service_Request_Form have associated `<label>` elements and that error messages are programmatically associated with their fields using `aria-describedby`.
5. THE Platform SHALL ensure that keyboard users can navigate all interactive elements in logical tab order without trapping focus in any component except modal dialogs, which SHALL implement a focus trap.
