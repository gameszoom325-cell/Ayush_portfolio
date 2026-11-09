export interface EducationItem {
  id: string;
  institution: string;
  subheading: string;
  degree: string;
  timeline: string;
  location: string;
  status: string;
  statusType: "active" | "completed";
  highlights: string[];
  description: string;
  logoPlaceholder: string;
  logoBg: string;
}

export const educationHistory: EducationItem[] = [
  {
    id: "srm-ist",
    institution: "SRM Institute of Science and Technology",
    subheading: "Kattankulathur, Chennai, Tamil Nadu",
    degree: "B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)",
    timeline: "2024 — 2028 (Present)",
    location: "CHENNAI, INDIA",
    status: "CURRENTLY ENROLLED",
    statusType: "active",
    highlights: [
      "B.Tech CSE with AI & ML Specialization",
      "Active Hackathon Participant (Smart India Hackathon, Genie X Hub)",
      "Full-Stack Web Development, Algorithm Design & Applied AI",
      "Building Production Platforms with React, Next.js, and Python"
    ],
    description:
      "Undergraduate study specializing in Artificial Intelligence and Machine Learning. Coursework and practical building focus on software engineering principles, web system design, database management, and machine learning implementations.",
    logoPlaceholder: "SRM",
    logoBg: "from-[#2dd4bf]/20 to-[#0f766e]/30",
  },
  {
    id: "senior-secondary",
    institution: "Senior Secondary School",
    subheading: "Higher Secondary Certificate (PCM + Computer Science)",
    degree: "Senior Secondary Education (Science & Mathematics)",
    timeline: "2022 — 2024",
    location: "INDIA",
    status: "COMPLETED",
    statusType: "completed",
    highlights: [
      "Physics, Chemistry, Pure Mathematics & Computer Science Track",
      "Strong Foundations in Logic, Problem Solving & Object-Oriented Programming",
      "Early Software & Algorithm Exploration"
    ],
    description:
      "Completed secondary education with rigorous coursework in Mathematics, Physics, Chemistry, and Computer Science. Cultivated foundational analytical thinking, problem-solving skills, and passion for software engineering.",
    logoPlaceholder: "SCH",
    logoBg: "from-white/10 to-white/5",
  },
];
