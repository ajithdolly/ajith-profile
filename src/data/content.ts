export const identity = {
  name: 'Ajith Dollichan',
  title: 'AI Software Developer · SAP AI Core · LLM Workflows',
  tagline: 'Building LLM workflows and agentic RAG at SAP SE. 3+ years across enterprise AI, FinTech, and cloud-native platforms.',
  badge: 'TOP 0.35%',
  location: 'Mannheim, Germany',
  statusLine: 'OPEN TO OPPORTUNITIES • MSc GLOBAL SOFTWARE DEV',
  email: 'ajithdollichan@gmail.com',
  phone: '+49 15510229943',
  linkedin: 'https://www.linkedin.com/in/ajith-dollichan-developer/',
  github: 'https://github.com/ajithdolly/',
  profilePage: 'https://ajithdolly.github.io/ajith-profile/',
}

export interface Skill {
  title: string
  tag: string
  desc: string
  skills: string[]
}

export const skills: Skill[] = [
  {
    title: 'Applied AI / LLM',
    tag: 'INTELLIGENCE',
    desc: 'Building agentic RAG pipelines, LLM orchestration, and AI workflow automation using SAP AI Core and SAP AI Launchpad at enterprise scale.',
    skills: ['Agentic RAG', 'LLM Orchestration', 'SAP AI Core', 'SAP AI Launchpad', 'Prompt Engineering', 'Vector Search', 'Embeddings', 'HANA Vector Engine'],
  },
  {
    title: 'Frontend Engineering',
    tag: 'UI / INTERACTION',
    desc: 'Building fast, accessible React applications with TypeScript — from micro-frontends for banking platforms to AI-integrated dashboards.',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS', 'MUI', 'Bootstrap'],
  },
  {
    title: 'Backend & Databases',
    tag: 'ARCHITECTURE',
    desc: 'High-throughput Java/Spring Boot microservices supporting 100K+ daily transactions, paired with relational and vector databases for AI workloads.',
    skills: ['Java', 'Spring Boot', 'Python', 'PostgreSQL', 'MongoDB', 'MySQL', 'SAP S/4 HANA'],
  },
  {
    title: 'Cloud & DevOps',
    tag: 'INFRASTRUCTURE',
    desc: 'Deploying and operating production-grade applications on cloud platforms using Docker, GitHub Actions, and CI/CD pipelines.',
    skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'SAP AI Core', 'SAP BTP', 'Git'],
  },
  {
    title: 'Algorithmic Problem Solving',
    tag: 'PROBLEM SOLVING',
    desc: 'Strong computer science foundations with top university ranking — optimizing algorithms and data structures for real-world performance requirements.',
    skills: ['Data Structures', 'Algorithms', 'Mathematics', 'DSA'],
  },
  {
    title: 'Tools & Ecosystem',
    tag: 'PRODUCTIVITY',
    desc: 'Fluent across the full modern engineering stack — from SAP Joule and AI coding assistants to enterprise tooling and API development.',
    skills: ['SAP Joule', 'GitHub Copilot', 'Claude', 'IntelliJ', 'VS Code', 'Postman', 'ABAP', 'Git'],
  },
]

export interface Project {
  title: string
  category: string
  description: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: 'Agentic RAG Pipeline — SAP Note Generation',
    category: 'Applied AI',
    description:
      'Multi-step agentic RAG pipeline for automated SAP Note generation at SAP SE. Orchestrates multiple LLM calls to intelligently decide chunking strategy, optimize vector database search, and validate outputs — reducing hallucination in enterprise AI workflows.',
    tags: ['Agentic AI', 'RAG', 'SAP AI Core', 'LLM Orchestration', 'Vector Search'],
  },
  {
    title: 'IBM BPM Migration — Arab Bank',
    category: 'Digital Banking',
    description:
      'Migrated legacy IBM BPM workflows to React micro-frontends and Spring Boot microservices for Acabes International (Arab Bank). Supported 100,000+ daily transactions with 99.9% uptime, specializing in FinTech payment processing and automated document generation.',
    tags: ['React', 'Spring Boot', 'Microservices', 'FinTech', 'Payments', 'CI/CD'],
  },
  {
    title: 'EyeX — Accessible Mouse Control',
    category: 'Machine Learning',
    description:
      'Webcam-controlled virtual mouse for users with physical disabilities. Implemented using Python, OpenCV, and MediaPipe — a completely hardware-free accessibility solution supporting full mouse functionality with smooth, responsive cross-platform control.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'Accessibility', 'Machine Learning'],
  },
]

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    company: 'SAP SE',
    role: 'Working Student — AI Integration & FBE Coordination',
    period: 'Dec 2025 – Present',
    location: 'Walldorf, Germany',
    bullets: [
      'Designed and implemented Business AI solutions integrating backend APIs with LLM services via SAP AI Core and SAP AI Launchpad.',
      'Built a multi-step agentic RAG pipeline for automated SAP Note generation, reducing hallucination through intelligent chunking and vector search optimization.',
      'Delivered process automation tooling integrating AI services with Jira to automatically score EPIC quality.',
      'Applied prompt engineering and context handling to iteratively improve LLM output quality across use cases.',
    ],
  },
  {
    company: 'Acabes International (Arab Bank)',
    role: 'Fullstack Developer',
    period: 'Jul 2023 – Mar 2025',
    location: 'Kochi, India',
    bullets: [
      'Designed and developed cloud-based microservices using Java and Spring Boot, supporting 100,000+ transactions/day with 99.9% uptime.',
      'Built responsive UIs using React JS, MUI, Bootstrap, enhancing cross-platform accessibility.',
      'Implemented CI/CD practices using Git, GitHub Actions, and Docker, streamlining deployment.',
      'Awarded Best Developer in the DBPM team; Performance Cash Award January 2025.',
    ],
  },
]

export const awards = [
  'University rank holder — top 0.35% of entire cohort',
  'RAG With HANA Vector Engine ',
  'Fine tuning LLMs for enterprise workflows',
  'Performance Cash Award — January 2025',
  'The Complete Web Development Bootcamp — Udemy',
  'Frontend Developer Certification — LinkedIn',
]
