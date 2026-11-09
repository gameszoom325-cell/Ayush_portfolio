export interface Achievement {
  id: string;
  category: "hackathon" | "project" | "milestone";
  organization: string;
  badge: string;
  title: string;
  description: string;
  year: string;
  previewImage: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const archiveMetrics = {
  hackathons: "03 Hackathons",
  platforms: "06 Live Platforms",
  status: "B.Tech CSE AI/ML",
  institution: "SRM IST Chennai",
};

export const achievementsList: Achievement[] = [
  {
    id: "sih-landwatch",
    category: "hackathon",
    organization: "SMART INDIA HACKATHON 2026",
    badge: "SIH 2026 • CHENNAI",
    title: "LandWatch AI — Land Acquisition Monitoring",
    description:
      "Engineered a predictive land acquisition intelligence platform for government and statutory officers to identify high-risk land delays early, explore cadastral GIS survey parcels, and take prompt action.",
    year: "2026",
    previewImage: "/projects/landwatch.jpeg",
    liveUrl: "https://landwatch-tau.vercel.app",
    githubUrl: "https://github.com/gameszoom325-cell/landwatch",
  },
  {
    id: "genie-x-contract2action",
    category: "hackathon",
    organization: "GENIE X HUB HACKATHON",
    badge: "PROJECT ECLIPSE • SRMIST VDP",
    title: "Contract2Action AI — Contract Governance",
    description:
      "Built an enterprise contract intelligence and obligation execution gateway that converts contract obligations into tracked business tasks with human-in-the-loop approvals and audit trails.",
    year: "2026",
    previewImage: "/projects/contract2action.jpeg",
    liveUrl: "https://busitech-dmop-nine.vercel.app/",
    githubUrl: "https://github.com/gameszoom325-cell/busitech",
  },
  {
    id: "sih-smartfarmer",
    category: "hackathon",
    organization: "SMART INDIA HACKATHON (SIH #26032)",
    badge: "POWERED BY eNAM",
    title: "Smart Farmer Portal — APMC Mandi Scheduling",
    description:
      "Direct grain booking and zero-waiting APMC Mandi dock scheduling gateway. Built with an illiterate-friendly voice and icon-driven interface, instant gate token generation, and real-time yard sync.",
    year: "2026",
    previewImage: "/projects/smartfarmer.jpeg",
    liveUrl: "https://smartfarmerportal.vercel.app",
    githubUrl: "https://github.com/gameszoom325-cell/smartfarmerportal",
  },
  {
    id: "shiftsync-platform",
    category: "project",
    organization: "CAMPUS & WORKFORCE SYSTEMS",
    badge: "FULL-STACK PLATFORM",
    title: "ShiftSync AI — Workforce & Campus Transparency",
    description:
      "Unified workforce and campus transparency web platform providing role-based portals for academic institutions and construction sites with attendance verification and skill passports.",
    year: "2026",
    previewImage: "/projects/shiftsync.jpeg",
    liveUrl: "https://shiftsnc.vercel.app",
    githubUrl: "https://github.com/gameszoom325-cell/Shiftsnc",
  },
  {
    id: "edutrack-portal",
    category: "project",
    organization: "EDTECH INFRASTRUCTURE",
    badge: "ACADEMIC ERP",
    title: "EduTrack Tuition Portal — Academic Session 2026–27",
    description:
      "Class-wise study repository and student ERP for Classes 6 to 12. Facilitates role-based logins for students and teachers to access class notes, handouts, attendance records, and monthly fee ledgers.",
    year: "2026",
    previewImage: "/projects/edutrack.jpeg",
    liveUrl: "https://tutionportal-omega.vercel.app",
    githubUrl: "https://github.com/gameszoom325-cell/Edu-Std-Teach.Portal",
  },
  {
    id: "campuscash-copilot",
    category: "project",
    organization: "FINANCIAL AI COPILOT",
    badge: "STUDENT FINANCE AI",
    title: "CampusCash AI Copilot — Expense & Budget Manager",
    description:
      "Autonomous student expense tracking copilot with bill scanning (AI), voice logging, spending pattern detection, budget health scores, and predictive month-end balance analytics.",
    year: "2026",
    previewImage: "/projects/campuscash.jpeg",
    liveUrl: "https://github.com/gameszoom325-cell/Expense-Manager",
    githubUrl: "https://github.com/gameszoom325-cell/Expense-Manager",
  },
];
