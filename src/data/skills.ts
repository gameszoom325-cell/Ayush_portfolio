export interface SkillTier {
  id: string;
  tierNumber: string;
  title: string;
  icon: string;
  skills: {
    name: string;
    tag: string;
    tagHighlight?: boolean;
  }[];
}

export const skillTiers: SkillTier[] = [
  {
    id: "frontend",
    tierNumber: "TIER 01 / FRONTEND",
    title: "Web & Interfaces",
    icon: "web",
    skills: [
      { name: "React 19 & Vite", tag: "PRIMARY", tagHighlight: true },
      { name: "Next.js", tag: "APP ROUTER", tagHighlight: true },
      { name: "TypeScript", tag: "TYPE SAFE" },
      { name: "Tailwind CSS v4", tag: "MODERN UI" },
    ],
  },
  {
    id: "backend",
    tierNumber: "TIER 02 / BACKEND",
    title: "Backend & Systems",
    icon: "terminal",
    skills: [
      { name: "Node.js & Express", tag: "RESTFUL APIS", tagHighlight: true },
      { name: "Python", tag: "AI & SCRIPTS" },
      { name: "C / C++", tag: "CORE CS" },
      { name: "JavaScript (ES6+)", tag: "ASYNC" },
    ],
  },
  {
    id: "ai-data",
    tierNumber: "TIER 03 / APPLIED AI",
    title: "AI & Spatial Tech",
    icon: "psychology",
    skills: [
      { name: "Applied Machine Learning", tag: "PREDICTIVE", tagHighlight: true },
      { name: "Computer Vision & OCR", tag: "INSPECTION" },
      { name: "Leaflet GIS & Cadastre", tag: "SPATIAL" },
      { name: "Voice AI & Audio UI", tag: "ACCESSIBILITY" },
    ],
  },
  {
    id: "database-tools",
    tierNumber: "TIER 04 / DATA & OPS",
    title: "Data & Deployment",
    icon: "dns",
    skills: [
      { name: "PostgreSQL & Prisma", tag: "RELATIONAL", tagHighlight: true },
      { name: "MongoDB", tag: "NO-SQL" },
      { name: "Git & GitHub CI", tag: "VERSION CONTROL" },
      { name: "Vercel & Docker", tag: "DEPLOYMENT" },
    ],
  },
];
