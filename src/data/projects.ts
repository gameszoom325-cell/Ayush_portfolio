export interface ProjectTheme {
  id: string;
  name: string;
  atmosphere: string;
  accentColor: string;
  accentSecondary: string;
  glowBurgundy: string;
  glowAccent: string;
  glowBottom: string;
  badgeBg: string;
  badgeBorder: string;
}

export interface Project {
  id: string;
  num: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  image: string;
  hudTelemetry?: {
    status: string;
    subtext: string;
    metrics: string;
  };
  theme: ProjectTheme;
}

export const projects: Project[] = [
  {
    id: "landwatch",
    num: "01",
    name: "LandWatch 4D",
    category: "GEOSPATIAL & SATELLITE INTELLIGENCE",
    description:
      "Real-time orbital satellite vision platform running neural change detection algorithms across alpine glaciers and hydrological reservoirs. Built with custom WebGL shader pipelines to stream multi-spectral thermal rasters with 14ms client-side latency.",
    technologies: ["PyTorch", "WebGL 2.0", "FastAPI", "GeoTIFF", "CUDA", "Tailwind CSS"],
    github: "https://github.com/gameszoom325-cell/landwatch",
    live: "https://landwatch-tau.vercel.app",
    image:
      "https://lh3.googleusercontent.com/aida/ALJJyrAB7BC1HxIgxK4eKxhWNDlBHKqV4JcsTIibh71lmEj3DIb0UjquelOMTcY-bHJAi6JtBl81w3qF5o4fDYBtrJlwT4TiSh6A64QeBj7DqNnUgnk3IuKQ3GAQCfpfUPj1-a2FNG4UWcCiKLhVT8f0IDByNQuM22e446acJfxHo1dUcu2gOgYE7jVQYKvb_VJ00bsdwd-HKbWgPGekScoMfarp85sC3pA-KvmjzGnXbMHW",
    hudTelemetry: {
      status: "TERRA-SAT 4D • LIVE ORBIT",
      subtext: "ALT: 785 KM",
      metrics: "LAT: 45.5° N | LON: 7.1° E • RES: 0.18M / PX",
    },
    theme: {
      id: "satellite-earth",
      name: "Satellite Earth",
      atmosphere: "Dark satellite & environmental telemetry",
      accentColor: "#44e2cd",
      accentSecondary: "#10b981",
      glowBurgundy: "rgba(92, 19, 34, 0.22)",
      glowAccent: "rgba(68, 226, 205, 0.09)",
      glowBottom: "rgba(16, 185, 129, 0.12)",
      badgeBg: "rgba(68, 226, 205, 0.1)",
      badgeBorder: "rgba(68, 226, 205, 0.3)",
    },
  },
  {
    id: "busitech",
    num: "02",
    name: "Busitech AI (Contract2Action)",
    category: "ENTERPRISE CONTRACT INTELLIGENCE",
    description:
      "Autonomous enterprise contract intelligence platform automating obligation tracking, human-in-the-loop approvals, and multi-clause risk analysis. Features live clause parsing, entity extraction, and audit log generation.",
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Lucide", "Recharts", "Express Node.js"],
    github: "https://github.com/gameszoom325-cell/busitech",
    live: "https://busitech-dmop-nine.vercel.app/",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIszN2TLrD6OU2qUojyvlMhy1S9YicbGXUJOJtANes6F8kYGOFBmgYYd5BEdZvJrp-_WP80qozqZdqu0ylnbV8OVpbBWHvpq_x9l0Fm2B3WSterESRw3yNZsBslhcQFf5Am4HrNf_wtzV_wOrtUAuqo3azvKkNNWIVmuwTJUkLEZp2V8B7AHvlnqCaAiD4lAv3gl7qAVNkOtUHD2k2w_OKkmRaaXyvqqkeTkeg-0cB",
    hudTelemetry: {
      status: "CONTRACT INTELLIGENCE • ACTIVE MATRIX",
      subtext: "LATENCY: 320μs",
      metrics: "OBLIGATION ACCURACY: 99.2% • REAL-TIME AUDIT",
    },
    theme: {
      id: "business-amber",
      name: "Business Charcoal & Amber",
      atmosphere: "Premium enterprise technology with warm amber highlights",
      accentColor: "#f59e0b",
      accentSecondary: "#d97706",
      glowBurgundy: "rgba(60, 20, 10, 0.28)",
      glowAccent: "rgba(245, 158, 11, 0.08)",
      glowBottom: "rgba(217, 119, 6, 0.12)",
      badgeBg: "rgba(245, 158, 11, 0.1)",
      badgeBorder: "rgba(245, 158, 11, 0.3)",
    },
  },
  {
    id: "shiftsync",
    num: "03",
    name: "ShiftSync AI",
    category: "WORKFORCE & CAMPUS TRANSPARENCY",
    description:
      "Unified workforce and campus transparency operating system engineered for construction crews, college admins, and student operations. Balances shift telemetry, verified attendance, and automated wage disputes.",
    technologies: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS", "Prisma", "PWA"],
    github: "https://github.com/gameszoom325-cell/Shiftsnc",
    live: "https://shiftsnc.vercel.app",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnVQ5hd15dRlXjNcfdEUKgNqXsBmHCEdRjiVljVgz7ATvgMJHmfAqJMG6ahnGEnrIC0TLLxu2WQV2CJ1jeZ9-ce9vx30dxBUmGQaoHQ0Fo7E6QxlC0WfBaHmt-jCq1uG3eMEImf4QMhd1lTQY9MjMcllN4pE83bu3J1ExEX4d9ML8qsssxEDABU_AXk6K49FnZHc-J2_SE96CiNHllGtxZF8E3hJQ3IFCTYxqcmvA5",
    hudTelemetry: {
      status: "CAMPUS & SHIFT MESH • SYNCHRONIZED",
      subtext: "NODES: ACTIVE",
      metrics: "TRANSPARENCY AUDIT: 100% IMMUTABLE",
    },
    theme: {
      id: "cyber-indigo",
      name: "Indigo Systems",
      atmosphere: "High-integrity distributed campus network",
      accentColor: "#6366f1",
      accentSecondary: "#818cf8",
      glowBurgundy: "rgba(76, 29, 149, 0.25)",
      glowAccent: "rgba(99, 102, 241, 0.1)",
      glowBottom: "rgba(67, 56, 202, 0.15)",
      badgeBg: "rgba(99, 102, 241, 0.1)",
      badgeBorder: "rgba(99, 102, 241, 0.3)",
    },
  },
  {
    id: "smartfarmer",
    num: "04",
    name: "Smart Farmer Portal",
    category: "AGRO-INTELLIGENCE & IOT SYSTEMS",
    description:
      "Comprehensive precision agriculture portal delivering crop anomaly prediction, soil moisture telemetry, and seasonal yield forecasting. Features localized vernacular voice support and disease classification from leaf imagery.",
    technologies: ["HTML5", "JavaScript", "Python", "Computer Vision", "Weather API", "TensorFlow"],
    github: "https://github.com/gameszoom325-cell/smartfarmerportal",
    live: "https://smartfarmerportal.vercel.app",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrhicff1MTcaXTERxGNctxW2IZg1k0wlXC05w8xGafdynpZu5-8nqFXk9CcCWgFqW5wO6mTJrxifo6LQsSp0TYM3XDjxcJSeROC1AHcIHkrRrlXtGo7vSE4mvF2Fb-VEvzjIVTpfJxGMLJH84vrBcW79Ukb40BhuDj1euMDRFLdLnda9lJJPcf7w5F7GyySd_r2vs-kTSRmx6ifmd25f-LLAggxIvCRGUvp6KA2r1F",
    hudTelemetry: {
      status: "AGRI-SENSOR NETWORK • STREAMING",
      subtext: "MOISTURE: OPTIMAL",
      metrics: "DISEASE INFERENCE: 97.8% ACCURACY",
    },
    theme: {
      id: "deep-forest",
      name: "Deep Forest & Natural Tones",
      atmosphere: "Natural flora and ecological computing aesthetic",
      accentColor: "#22c55e",
      accentSecondary: "#15803d",
      glowBurgundy: "rgba(6, 78, 59, 0.3)",
      glowAccent: "rgba(34, 197, 94, 0.08)",
      glowBottom: "rgba(21, 128, 61, 0.15)",
      badgeBg: "rgba(34, 197, 94, 0.1)",
      badgeBorder: "rgba(34, 197, 94, 0.3)",
    },
  },
  {
    id: "onlinecompiler",
    num: "05",
    name: "CodeStream Cloud Compiler",
    category: "DEVELOPER TOOLS & SANDBOX EXECUTION",
    description:
      "Ultra-responsive browser-based multi-language code compilation and interactive debugging platform. Built with isolated Docker micro-sandboxes, instant standard input/output streaming, and syntax telemetry.",
    technologies: ["TypeScript", "React", "Node.js", "Docker Sandbox", "Monaco Editor", "Tailwind CSS"],
    github: "https://github.com/gameszoom325-cell/onlinecomplier",
    live: "https://onlinecomplier-kappa.vercel.app",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9jZT3j9sJpXv4q7Kpx4TJq5Ba3lCGphGL9bnqcwsagYXf3DQoW4wHzoCFOPN6B8h4gcJtDKJ1-r7aNwiJQLmU4qER-ANbclVSMO9UacZbOjmUlnojPaicRJE6V42bGqFzwknPaPIoXN29oLAJIxYVNyHp7ZmMQjXqIoB_bTi4dC7mpt6B5AdnYQkhJRmaInqU11sgM7EzInJglY0Tc-XX9nNN7yod8Qbcu2aP7fV3",
    hudTelemetry: {
      status: "EXECUTION ENGINE • ZERO-DELAY",
      subtext: "ISOLATION: SECURE DOCKER",
      metrics: "RTT: 18MS • SUPPORT: C++, PYTHON, TS, JAVA",
    },
    theme: {
      id: "crimson-compiler",
      name: "Crimson Forge",
      atmosphere: "High-speed compiler matrix with deep ruby luminescence",
      accentColor: "#f43f5e",
      accentSecondary: "#be123c",
      glowBurgundy: "rgba(136, 19, 55, 0.3)",
      glowAccent: "rgba(244, 63, 94, 0.09)",
      glowBottom: "rgba(190, 18, 60, 0.18)",
      badgeBg: "rgba(244, 63, 94, 0.1)",
      badgeBorder: "rgba(244, 63, 94, 0.3)",
    },
  },
  {
    id: "tuitionportal",
    num: "06",
    name: "TutorSphere Edu-Portal",
    category: "EDTECH PLATFORMS & SCHEDULING",
    description:
      "High-velocity educational portal bridging students and specialized tutors. Features interactive slot management, lecture note distribution, real-time query resolution, and role-based access controls.",
    technologies: ["TypeScript", "Next.js", "Node.js", "Tailwind CSS", "MongoDB", "Express"],
    github: "https://github.com/gameszoom325-cell/Edu-Std-Teach.Portal",
    live: "https://tutionportal-omega.vercel.app",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpk0cnuLWtSrZqm-aWMgHvxA07oyNyTAvw0qSQe7uy1DfdZyYnpF4LW0snYEgyp5NBbZiA5vOn96MY1-ERmMbfsUvvC_iJ1pY_DhK8C1qDynB-JvGkj6pnCZTF_tKPfoOxx8G5SHssqM5PLOVR_cxqdU2seHqXMIgoRP6RSrGMCbWRGJBRhwUUChK33w7lADC3eyqR8TcKGZxYGkUS72FzSy37CjliVNsNJntQe_Uy",
    hudTelemetry: {
      status: "EDUCATION MATRIX • CONNECTED",
      subtext: "STUDENTS & EDUCATORS: ACTIVE",
      metrics: "SESSION RELIABILITY: 99.9% UPTIME",
    },
    theme: {
      id: "titanium-luxury",
      name: "Titanium Luxury",
      atmosphere: "Polished platinum & obsidian minimalist aesthetic",
      accentColor: "#e2e8f0",
      accentSecondary: "#94a3b8",
      glowBurgundy: "rgba(50, 50, 60, 0.25)",
      glowAccent: "rgba(255, 255, 255, 0.08)",
      glowBottom: "rgba(148, 163, 184, 0.12)",
      badgeBg: "rgba(255, 255, 255, 0.08)",
      badgeBorder: "rgba(255, 255, 255, 0.2)",
    },
  },
  {
    id: "synapsebiomed",
    num: "07",
    name: "Synapse Bio-Med AI",
    category: "COGNITIVE HEALTHCARE COMPUTATION",
    description:
      "Deep volumetric neural segmentation suite for radiological scans. Employs 3D U-Net architectures with Grad-CAM visual interpretability to deliver clinician-in-the-loop diagnostic assistance with 98.4% validation accuracy.",
    technologies: ["PyTorch", "MONAI", "OpenCV", "FastAPI", "Docker", "CUDA"],
    github: "https://github.com/gameszoom325-cell",
    live: "https://github.com/gameszoom325-cell",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGGwkxHSR4XSfLonmVjYmSmus3WEGcuruu1pQ-4ZfC71DKYkZxnHNOQsomhtjK7XA4pb-qR0qUmr3Re7UkXXYUee-kza3kRgFJ5tP_Ia8NS1gnQaz7gVt9Tmpcv33RYWAjpuwCeOtx7YVYfpbXuBn04evRQ5Xngks0zvFq5qHX-NM16kWjKxhDO9Dhq885zYI1gMMxq9WxUX5BDPUUoIBxWmI5zrc2AJWDM_Qhp5Tu",
    hudTelemetry: {
      status: "NEURAL SCANNER • 3D U-NET",
      subtext: "SLICE RES: 512x512",
      metrics: "VALIDATION DICE: 0.984 • LATENCY: 24MS",
    },
    theme: {
      id: "medical-cobalt",
      name: "Scientific Cobalt",
      atmosphere: "Precision scientific and clinical diagnostics theme",
      accentColor: "#0ea5e9",
      accentSecondary: "#0284c7",
      glowBurgundy: "rgba(15, 23, 42, 0.35)",
      glowAccent: "rgba(14, 165, 233, 0.1)",
      glowBottom: "rgba(2, 132, 199, 0.18)",
      badgeBg: "rgba(14, 165, 233, 0.1)",
      badgeBorder: "rgba(14, 165, 233, 0.3)",
    },
  },
];
