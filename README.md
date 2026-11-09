# Ayush Singh — Cinematic Portfolio

An Awwwards-caliber, cinematic personal portfolio built from the ground up for **Ayush Singh** — B.Tech Computer Science Engineering (AI & ML) student at SRM Institute of Science and Technology.

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
├── index.html                  # Root HTML with typography and grain shaders
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Obsidian Kinetic color and font tokens
├── src/
│   ├── main.tsx                # React application entry point
│   ├── App.tsx                 # Root layout, Lenis setup & theme orchestrator
│   ├── index.css               # Film grain, glass-dossier & cursor styles
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed Chromium nav with live IST clock
│   │   ├── AmbientBackground.tsx # Dynamic project atmosphere glow engine
│   │   ├── CustomCursor.tsx    # Smooth lerp magnetic cursor with hover state
│   │   ├── HeroShader.tsx      # WebGL simplex noise contour canvas
│   │   └── CertificateModal.tsx# High-resolution credential preview modal
│   ├── sections/
│   │   ├── Hero.tsx            # Digital Artifact 01 & telemetry ribbon
│   │   ├── About.tsx           # Biometric HUD portrait & core passions
│   │   ├── Trajectory.tsx      # Luminescent education & research timeline
│   │   ├── Projects.tsx        # Pinned horizontal phone-like project gallery
│   │   ├── Archive.tsx         # Accreditations, honors & certificate filters
│   │   ├── Stack.tsx           # Apparatus hardware & software tiers
│   │   ├── Contact.tsx         # Direct dispatch, email copy & socials
│   │   └── Footer.tsx          # Real-time hardware telemetry diagnostics
│   └── data/
│       ├── projects.ts         # 7 Flagship projects (editable data system)
│       ├── education.ts        # SRM IST & Senior Secondary timeline data
│       ├── achievements.ts     # Certifications, competitions & IIT courses
│       └── skills.ts           # Apparatus hardware & software matrix
```

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
Open your browser at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
Generates an optimized, tree-shaken static bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎨 Editing Projects & Themes

All 7 flagship projects are organized inside **[`src/data/projects.ts`](file:///c:/Users/games/OneDrive/Documents/Website%20portfolio/stitch_ayush_singh_cinematic_portfolio_design(1)/src/data/projects.ts)**:

```typescript
export const projects: Project[] = [
  {
    id: "landwatch",
    num: "01",
    name: "LandWatch 4D",
    category: "GEOSPATIAL & SATELLITE INTELLIGENCE",
    description: "...",
    technologies: ["PyTorch", "WebGL 2.0", "FastAPI", "CUDA"],
    github: "https://github.com/gameszoom325-cell/landwatch",
    live: "https://landwatch-tau.vercel.app",
    image: "...",
    theme: {
      id: "satellite-earth",
      name: "Satellite Earth",
      accentColor: "#44e2cd",
      glowBurgundy: "rgba(92, 19, 34, 0.22)",
      glowAccent: "rgba(68, 226, 205, 0.09)",
      glowBottom: "rgba(16, 185, 129, 0.12)",
      // ...
    }
  },
  // ...
];
```

When a project enters the center viewport, the **Active Project Background System** smoothly morphs the ambient lighting, glow colors, status beacon, and button highlights across the entire portfolio.

---

## 🌐 Public Repositories Integrated

Directly mapped from **[GitHub @gameszoom325-cell](https://github.com/gameszoom325-cell)**:
1. **LandWatch 4D**: Geospatial Satellite Intelligence — [Live Demo](https://landwatch-tau.vercel.app)
2. **Busitech AI (Contract2Action)**: Enterprise Contract Intelligence — [Live Demo](https://busitech-dmop-nine.vercel.app/)
3. **ShiftSync AI**: Workforce & Campus Transparency Operating System — [Live Demo](https://shiftsnc.vercel.app)
4. **Smart Farmer Portal**: Agro-Intelligence & IoT Crop Diagnostics — [Live Demo](https://smartfarmerportal.vercel.app)
5. **CodeStream Compiler**: Cloud Multi-Language Sandbox Execution — [Live Demo](https://onlinecomplier-kappa.vercel.app)
6. **TutorSphere Edu-Portal**: High-Velocity Educational Matrix — [Live Demo](https://tutionportal-omega.vercel.app)
7. **Synapse Bio-Med AI**: Cognitive Radiological Diagnostics System
