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
    id: "core",
    tierNumber: "TIER 01 / CORE",
    title: "Systems & Core",
    icon: "terminal",
    skills: [
      { name: "C / C++20", tag: "HIGH PERF", tagHighlight: true },
      { name: "Python", tag: "RESEARCH & ML" },
      { name: "Rust", tag: "EDGE RUNTIME" },
      { name: "Java", tag: "ENTERPRISE OOP" },
    ],
  },
  {
    id: "cognitive",
    tierNumber: "TIER 02 / COGNITIVE",
    title: "AI & Data Math",
    icon: "psychology",
    skills: [
      { name: "PyTorch", tag: "PRIMARY NATIVE", tagHighlight: true },
      { name: "Hugging Face", tag: "TRANSFORMERS" },
      { name: "OpenCV & MONAI", tag: "VISION" },
      { name: "Scikit-Learn", tag: "STATS & SVM" },
    ],
  },
  {
    id: "spatial",
    tierNumber: "TIER 03 / SPATIAL",
    title: "Web & Spatial",
    icon: "token",
    skills: [
      { name: "TypeScript / React", tag: "NEXT.JS 15", tagHighlight: true },
      { name: "WebGL / Three.js", tag: "SHADERS" },
      { name: "Tailwind CSS", tag: "ENGINEERED UI" },
      { name: "HTML5 Semantic", tag: "ACCESSIBLE" },
    ],
  },
  {
    id: "infra",
    tierNumber: "TIER 04 / INFRA",
    title: "Cloud & Ops",
    icon: "dns",
    skills: [
      { name: "Docker / Linux", tag: "ROOT / POSIX", tagHighlight: true },
      { name: "Git & GitHub CI", tag: "AUTOMATION" },
      { name: "Supabase / Mongo", tag: "DATA LAYERS" },
      { name: "Figma UI/UX", tag: "DESIGN SYSTEMS" },
    ],
  },
];
