export interface Achievement {
  id: string;
  category: "cert" | "comp" | "course";
  organization: string;
  badge: string;
  badgeStyle: "gold" | "cyan" | "white" | "ruby";
  title: string;
  description: string;
  year: string;
  verifiedHash: string;
  previewImage?: string;
  credentialUrl?: string;
}

export const archiveMetrics = {
  certificates: "05+",
  courses: "IIT Madras Certified",
  competitions: "10+ Participated",
  projects: "07+ Flagships",
};

export const achievementsList: Achievement[] = [
  {
    id: "iit-madras-dl",
    category: "course",
    organization: "NPTEL / IIT MADRAS",
    badge: "ELITE + GOLD",
    badgeStyle: "gold",
    title: "Deep Learning Specialization",
    description:
      "Comprehensive mathematical rigor covering Backpropagation, Convolutional Neural Networks, Sequence Modeling, Autoencoders, and Generative Adversarial Networks. Ranked among the top 1% nationally.",
    year: "2024",
    verifiedHash: "NPTEL-DL-9428",
    previewImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    credentialUrl: "https://nptel.ac.in/",
  },
  {
    id: "hacksrm-24",
    category: "comp",
    organization: "HACKSRM '24",
    badge: "BEST AI PROTOTYPE",
    badgeStyle: "cyan",
    title: "HackSRM Annual National Hackathon",
    description:
      "Engineered an edge-based cognitive vision assistant within 36 straight hours. Awarded Best Prototype among 250+ collegiate teams for real-time inference latency and ergonomics.",
    year: "2024",
    verifiedHash: "SRM-HACK-881",
    previewImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
    credentialUrl: "https://srmist.edu.in",
  },
  {
    id: "sih-qualifier",
    category: "comp",
    organization: "MINISTRY OF EDUCATION",
    badge: "INTERNAL RANK 1",
    badgeStyle: "cyan",
    title: "Smart India Hackathon (SIH) Qualifier",
    description:
      "Led the internal university team designing a distributed anomaly detector for institutional energy smart grids, achieving first place out of 80+ university departmental teams.",
    year: "2024",
    verifiedHash: "GOV-SIH-041",
    previewImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    credentialUrl: "https://sih.gov.in",
  },
  {
    id: "stanford-ml",
    category: "course",
    organization: "DEEPLEARNING.AI / STANFORD",
    badge: "DISTINCTION",
    badgeStyle: "white",
    title: "Machine Learning Specialization",
    description:
      "Supervised, Unsupervised learning algorithms, Recommender systems, and Deep Reinforcement Learning foundations instructed by Andrew Ng. Achieved 100% aggregate assessment score.",
    year: "2024",
    verifiedHash: "COURSERA-ML-772",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    credentialUrl: "https://coursera.org",
  },
  {
    id: "aws-cloud-foundations",
    category: "cert",
    organization: "AMAZON WEB SERVICES",
    badge: "SCHOLAR",
    badgeStyle: "white",
    title: "AWS Cloud Foundations",
    description:
      "Elastic compute orchestration, S3 high-throughput pipelines, DynamoDB partitioning, and serverless compute triggers through AWS Lambda for distributed machine learning workflows.",
    year: "2024",
    verifiedHash: "AWS-CF-3091",
    previewImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    credentialUrl: "https://aws.amazon.com",
  },
  {
    id: "code-enigma",
    category: "comp",
    organization: "SRM CODE ENIGMA",
    badge: "GOLD MEDAL",
    badgeStyle: "gold",
    title: "Speed Algorithmic Contest",
    description:
      "Secured 1st place in high-pressure competitive programming solving graph traversal, bitmask dynamic programming, and binary search trees under strict execution time limits.",
    year: "2024",
    verifiedHash: "SRM-CE-GOLD",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    credentialUrl: "https://srmist.edu.in",
  },
  {
    id: "nvidia-dli",
    category: "cert",
    organization: "NVIDIA DEEP LEARNING INSTITUTE",
    badge: "CERTIFIED",
    badgeStyle: "cyan",
    title: "Fundamentals of Deep Learning",
    description:
      "Hands-on competency in GPU-accelerated neural networks, transfer learning, data augmentation, and automated hyperparameter optimization using TensorRT and PyTorch.",
    year: "2024",
    verifiedHash: "NV-DLI-1049",
    previewImage: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop",
    credentialUrl: "https://www.nvidia.com/en-us/training/",
  },
  {
    id: "gcp-cloud-genai",
    category: "cert",
    organization: "GOOGLE CLOUD",
    badge: "RECOGNITION",
    badgeStyle: "white",
    title: "Cloud Computing & Generative AI Pathways",
    description:
      "Architectural grounding in Google Cloud infrastructure, BigQuery data pipelines, Vertex AI foundation models, vector search, and multimodal agentic reasoning systems.",
    year: "2024",
    verifiedHash: "GCP-GAI-503",
    previewImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop",
    credentialUrl: "https://cloud.google.com",
  },
];
