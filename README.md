# Ayush Singh — Personal Portfolio

An Awwwards-caliber, cinematic personal developer portfolio built for **Ayush Singh** — B.Tech Computer Science Engineering (AI & ML) student at **SRM Institute of Science and Technology, Chennai**.

> **Single Source of Truth:** Faithfully engineered from the Stitch design system with custom GSAP ScrollTrigger horizontal pinning, dynamic project atmosphere transitions, WebGL simplex noise shaders, and Lenis smooth momentum scrolling.

---

## ⚡ Tech Stack & Architecture

- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS with custom Obsidian Kinetic design tokens
- **Kinetic Physics & Motion:** GSAP 3.15, GSAP ScrollTrigger
- **Smooth Scrolling:** Lenis Smooth Scroll Engine
- **Typography:** Plus Jakarta Sans (Headlines), Inter (Body Narrative), Space Grotesk (Telemetry / Monospace)
- **Shader:** Native WebGL Simplex Noise Topological Contour Canvas

---

## 📁 Directory Structure

```text
├── index.html                   # Root HTML with typography and grain shaders
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Obsidian Kinetic color and font tokens
├── public/
│   ├── favicon.svg              # Minimal AS obsidian monogram
│   └── projects/                # Official project visual assets
│       ├── landwatch.jpeg       # LandWatch AI screenshot
│       ├── contract2action.jpeg # Contract2Action AI screenshot
│       ├── smartfarmer.jpeg     # Smart Farmer Portal screenshot
│       ├── campuscash.jpeg      # CampusCash AI Copilot screenshot
│       ├── edutrack.jpeg        # EduTrack Tuition Portal screenshot
│       └── shiftsync.jpeg       # ShiftSync AI screenshot
├── src/
│   ├── main.tsx                 # React application entry point
│   ├── App.tsx                  # Root layout, Lenis setup & theme orchestrator
│   ├── index.css                # Film grain, glass-dossier & cursor styles
│   ├── components/
│   │   ├── Navbar.tsx           # Fixed Chromium nav with live IST clock & AS branding
│   │   ├── AmbientBackground.tsx# Dynamic project atmosphere glow engine
│   │   ├── CustomCursor.tsx     # Smooth lerp magnetic cursor with hover state
│   │   ├── HeroShader.tsx       # WebGL simplex noise contour canvas
│   │   └── CertificateModal.tsx # Project record and preview modal
│   ├── sections/
│   │   ├── Hero.tsx             # Digital Artifact & verified profile highlights
│   │   ├── About.tsx            # Genuine student profile, philosophy & passions
│   │   ├── Trajectory.tsx       # SRM IST education timeline
│   │   ├── Projects.tsx         # Pinned horizontal phone-like project gallery
│   │   ├── Archive.tsx          # Hackathons (SIH, Genie X Hub) & platform records
│   │   ├── Stack.tsx            # Real-world frontend, backend, AI & data stack
│   │   ├── Contact.tsx          # Direct dispatch, email copy & socials
│   │   └── Footer.tsx           # Real-time hardware telemetry diagnostics
│   └── data/
│       ├── projects.ts          # 6 Real verified projects (editable data system)
│       ├── education.ts         # SRM IST & Senior Secondary timeline data
│       ├── achievements.ts      # Hackathons & platforms archive
│       └── skills.ts            # Frontend, backend, AI & DevOps matrix
```

---

## 🌐 Real Verified Projects Integrated

Directly mapped from **[GitHub @gameszoom325-cell](https://github.com/gameszoom325-cell)**:

1. **LandWatch AI**: Predictive Land Acquisition Intelligence Platform (SIH 2026) — [Live Demo](https://landwatch-tau.vercel.app) • [GitHub](https://github.com/gameszoom325-cell/landwatch)
2. **Contract2Action AI (Busitech)**: Enterprise Contract Execution & Human Governance Gateway (Genie X Hub Hackathon) — [Live Demo](https://busitech-dmop-nine.vercel.app/) • [GitHub](https://github.com/gameszoom325-cell/busitech)
3. **Smart Farmer Portal**: Direct Grain Booking & Mandi Scheduling Gateway (Powered by eNAM • SIH #26032) — [Live Demo](https://smartfarmerportal.vercel.app) • [GitHub](https://github.com/gameszoom325-cell/smartfarmerportal)
4. **ShiftSync AI**: Workforce & Campus Transparency Operating System — [Live Demo](https://shiftsnc.vercel.app) • [GitHub](https://github.com/gameszoom325-cell/Shiftsnc)
5. **EduTrack Tuition Portal**: Class 6 to 12 Notes, Handouts & Fee Ledger ERP — [Live Demo](https://tutionportal-omega.vercel.app) • [GitHub](https://github.com/gameszoom325-cell/Edu-Std-Teach.Portal)
6. **CampusCash AI Copilot**: Autonomous Student Expense Tracking & AI Budget Manager — [GitHub](https://github.com/gameszoom325-cell/Expense-Manager)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
Generates an optimized static bundle in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```
