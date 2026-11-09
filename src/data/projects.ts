export interface ProjectTheme {
  id: string;
  name: string;
  atmosphere: string;
  accentColor: string;
  accentSecondary: string;
  glowBurgundy: string;
  glowAccent: string;
  glowBottom: string;
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
  badge?: string;
  theme: ProjectTheme;
}

export const projects: Project[] = [
  {
    id: "landwatch",
    num: "01",
    name: "LandWatch AI",
    category: "PREDICTIVE GIS & STATUTORY INTELLIGENCE",
    description:
      "Predictive land acquisition intelligence platform helping statutory officers spot risky land cases early, examine interactive cadastral survey parcels, and take prompt statutory action to prevent infrastructure delays.",
    technologies: ["React", "Leaflet GIS", "PostGIS", "Python", "Tailwind CSS"],
    github: "https://github.com/gameszoom325-cell/landwatch",
    live: "https://landwatch-tau.vercel.app",
    image: "/projects/landwatch.jpeg",
    badge: "SIH 2026 • CHENNAI LAND ACQUISITION",
    theme: {
      id: "landwatch-theme",
      name: "Cadastral Green & Slate",
      atmosphere: "Satellite GIS & Cadastral Intelligence",
      accentColor: "#2dd4bf",
      accentSecondary: "#0f766e",
      glowBurgundy: "rgba(15, 118, 110, 0.25)",
      glowAccent: "rgba(45, 212, 191, 0.08)",
      glowBottom: "rgba(13, 148, 136, 0.12)",
    },
  },
  {
    id: "contract2action",
    num: "02",
    name: "Contract2Action AI (Busitech)",
    category: "ENTERPRISE CONTRACT GOVERNANCE",
    description:
      "Enterprise contract execution and human governance gateway. Turns contract obligations into approved, tracked business tasks with automated clause parsing, human-in-the-loop approvals, and cryptographic audit trails.",
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Lucide", "Recharts", "Express"],
    github: "https://github.com/gameszoom325-cell/busitech",
    live: "https://busitech-dmop-nine.vercel.app/",
    image: "/projects/contract2action.jpeg",
    badge: "GENIE X HUB HACKATHON • PROJECT ECLIPSE",
    theme: {
      id: "contract-theme",
      name: "Enterprise Amber & Charcoal",
      atmosphere: "Human Governance & Contract Intelligence",
      accentColor: "#f59e0b",
      accentSecondary: "#b45309",
      glowBurgundy: "rgba(180, 83, 9, 0.25)",
      glowAccent: "rgba(245, 158, 11, 0.08)",
      glowBottom: "rgba(217, 119, 6, 0.12)",
    },
  },
  {
    id: "smartfarmer",
    num: "03",
    name: "Smart Farmer Portal",
    category: "APMC DIRECT PROCUREMENT & MANDI SCHEDULING",
    description:
      "Direct grain booking and zero-waiting APMC Mandi dock scheduling gateway. Built with an illiterate-friendly voice and icon-driven interface, instant gate token generation, and real-time mandi yard sync.",
    technologies: ["React", "JavaScript", "Voice UI", "eNAM API", "Tailwind CSS"],
    github: "https://github.com/gameszoom325-cell/smartfarmerportal",
    live: "https://smartfarmerportal.vercel.app",
    image: "/projects/smartfarmer.jpeg",
    badge: "POWERED BY eNAM • SIH #26032",
    theme: {
      id: "farmer-theme",
      name: "Agri Emerald & Earth",
      atmosphere: "Voice-First Agricultural Procurement",
      accentColor: "#10b981",
      accentSecondary: "#047857",
      glowBurgundy: "rgba(4, 120, 87, 0.25)",
      glowAccent: "rgba(16, 185, 129, 0.08)",
      glowBottom: "rgba(5, 150, 105, 0.12)",
    },
  },
  {
    id: "shiftsync",
    num: "04",
    name: "ShiftSync AI",
    category: "WORKFORCE & CAMPUS TRANSPARENCY",
    description:
      "Role-based institutional and worksite transparency portal. Connects academic institutions and construction sites for verified attendance tracking, student skill passports, shift auditing, and safety reporting.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Node.js"],
    github: "https://github.com/gameszoom325-cell/Shiftsnc",
    live: "https://shiftsnc.vercel.app",
    image: "/projects/shiftsync.jpeg",
    badge: "ROLE-BASED GOVERNANCE PLATFORM",
    theme: {
      id: "shiftsync-theme",
      name: "High-Integrity Indigo",
      atmosphere: "Distributed Institutional Transparency",
      accentColor: "#6366f1",
      accentSecondary: "#4338ca",
      glowBurgundy: "rgba(67, 56, 202, 0.25)",
      glowAccent: "rgba(99, 102, 241, 0.09)",
      glowBottom: "rgba(79, 70, 229, 0.14)",
    },
  },
  {
    id: "edutrack",
    num: "05",
    name: "EduTrack Tuition Portal",
    category: "ACADEMIC NOTES & FEE MANAGEMENT ERP",
    description:
      "Class-wise study repository and student ERP for Classes 6 to 12. Facilitates protected role-based logins for students and teachers to access class notes, handouts, attendance records, and fee ledgers.",
    technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Role-Based Auth", "Express"],
    github: "https://github.com/gameszoom325-cell/Edu-Std-Teach.Portal",
    live: "https://tutionportal-omega.vercel.app",
    image: "/projects/edutrack.jpeg",
    badge: "CLASS 6-12 STUDY REPOSITORY & ERP",
    theme: {
      id: "edutrack-theme",
      name: "Titanium & Clean Blue",
      atmosphere: "Educational Infrastructure & ERP",
      accentColor: "#38bdf8",
      accentSecondary: "#0284c7",
      glowBurgundy: "rgba(2, 132, 199, 0.25)",
      glowAccent: "rgba(56, 189, 248, 0.08)",
      glowBottom: "rgba(14, 165, 233, 0.12)",
    },
  },
  {
    id: "campuscash",
    num: "06",
    name: "CampusCash AI Copilot",
    category: "INTELLIGENT EXPENSE & BUDGET MANAGER",
    description:
      "Autonomous student expense tracking copilot with bill scanning, voice logging, spending pattern detection, budget health scores, and predictive month-end balance analytics.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Voice AI", "Interactive Charts", "Budget Telemetry"],
    github: "https://github.com/gameszoom325-cell/Expense-Manager",
    live: "https://github.com/gameszoom325-cell/Expense-Manager",
    image: "/projects/campuscash.jpeg",
    badge: "STUDENT EXPENSE & AI BUDGET MANAGER",
    theme: {
      id: "campuscash-theme",
      name: "Midnight Violet & Cyber Pink",
      atmosphere: "Smart Autonomous Expense Intelligence",
      accentColor: "#a855f7",
      accentSecondary: "#7e22ce",
      glowBurgundy: "rgba(126, 34, 206, 0.28)",
      glowAccent: "rgba(168, 85, 247, 0.09)",
      glowBottom: "rgba(147, 51, 234, 0.15)",
    },
  },
];
