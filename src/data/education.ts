export interface EducationItem {
  id: string;
  institution: string;
  subheading: string;
  degree: string;
  timeline: string;
  location: string;
  status: string;
  statusType: "active" | "completed";
  cgpaOrScore?: string;
  highlights: string[];
  description: string;
  logoPlaceholder: string; // short badge / monogram or svg
  logoBg: string;
}

export const educationHistory: EducationItem[] = [
  {
    id: "srm-ist",
    institution: "SRM Institute of Science and Technology",
    subheading: "Kattankulathur, Chennai, Tamil Nadu",
    degree: "B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)",
    timeline: "2024 — 2028 (Present • 1st Year)",
    location: "CHENNAI, INDIA",
    status: "ACTIVE COHORT",
    statusType: "active",
    cgpaOrScore: "CGPA: 9.60 / 10.0",
    highlights: [
      "CGPA: 9.60 / 10.0",
      "Core Member: Artificial Intelligence & Machine Learning Society",
      "Symposium Hackathon Finalist & Algorithmic Problem Solver",
      "Research Focus: Tensor Algebra, High-Dimensional Latent Spaces & Edge Compute"
    ],
    description:
      "Undergraduate study specializing in Artificial Intelligence and Machine Learning. Coursework and research delve into linear algebra for neural networks, distributed systems, high-dimensional vector representations, and low-latency computer vision pipelines.",
    logoPlaceholder: "SRM",
    logoBg: "from-[#44e2cd]/20 to-[#003731]/30",
  },
  {
    id: "senior-secondary",
    institution: "Senior Secondary School",
    subheading: "Higher Secondary Certificate (PCM + Computer Science)",
    degree: "Senior Secondary Science & Mathematics",
    timeline: "2022 — 2024",
    location: "INDIA",
    status: "COMPLETED",
    statusType: "completed",
    cgpaOrScore: "Top 1% Academic Distinction",
    highlights: [
      "Informatics Olympiad State Round Qualifier",
      "Top 1% Academic Distinction",
      "Procedural 2D/3D graphics experiments in C++ with OpenGL",
      "Excellence in Pure Mathematics & Physics"
    ],
    description:
      "Rigorous preparation in Physics, Chemistry, and Advanced Mathematics alongside foundational computer science. Developed early algorithmic intuition, object-oriented software engineering principles, and procedural graphics engines.",
    logoPlaceholder: "SCH",
    logoBg: "from-white/10 to-white/5",
  },
];
