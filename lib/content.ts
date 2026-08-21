import data from "../content.json";

export interface Visual {
  caption: string;
  image?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export type ProjectTier = "featured" | "selected" | "experiment";

export type ProjectStatus =
  | "production"
  | "building"
  | "planned"
  | "completed"
  | "academic";

export interface TechItem {
  name: string;
  role: string;
}

export interface CaseStudy {
  context: string;
  problem: string;
  approach: string;
  implementation: string;
  features?: { title: string; description: string }[];
  workflow?: { label: string; sub?: string }[];
  challenges: string[];
  result: string;
  lessons: string[];
}

export interface Project {
  slug: string;
  title: string;
  kind: string;
  year: string;
  tier?: ProjectTier;
  status?: ProjectStatus;
  summary: string;
  role: string;
  stack: string[];
  technologies?: TechItem[];
  caseStudy?: CaseStudy;
  challenge: string;
  solution: string;
  result: string;
  metrics: Metric[];
  link: string;
  live?: string;
  learnings: string[];
  visual?: Visual;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  location: string;
  timezone: string;
  email: string;
  status: string;
  socials: {
    github: string;
    linkedin: string;
    whatsapp: string;
    email: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
}

export interface ListeningPlaylist {
  title: string;
  url: string;
  embed: string;
}

export interface TodayStatus {
  greeting: string;
  intro: string;
  focus: string;
  focusItems: string[];
  techStack: string[];
  listeningTo: string;
  mood: string;
  listeningPlaylist: ListeningPlaylist;
}

export interface Journey {
  year: string;
  title: string;
  body: string;
}

export interface HowIWork {
  label: string;
  title: string;
  body: string;
}

export interface CurrentWork {
  title: string;
  percent: number;
  desc: string;
  tags: string[];
}

export interface Post {
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
}

export interface Plan {
  title: string;
  timeline: string;
  desc: string;
}

export interface TechStackCategory {
  category: string;
  technologies: string[];
}

export const techStackCategories: TechStackCategory[] = [
  {
    category: "Backend & Data Engine",
    technologies: ["PHP", "Laravel", "MySQL", "PostgreSQL", "Redis", "TypeScript"],
  },
  {
    category: "Frontend & Mobile",
    technologies: ["Flutter", "Dart", "TailwindCSS", "Alpine.js", "HTML5", "CSS3"],
  },
  {
    category: "Cloud, Infra & DevOps",
    technologies: ["Proxmox", "Docker", "Ansible", "MikroTik", "Linux Mint / Ubuntu", "Bash"],
  },
  {
    category: "Integrasi & API",
    technologies: ["REST API", "MikroTik API", "Telegram Bot API", "Webhooks"],
  },
];

export interface SiteContent {
  profile: Profile;
  navItems: NavItem[];
  todayStatus: TodayStatus;
  journey: Journey[];
  howIWork: HowIWork[];
  projects: Project[];
  currentWork: CurrentWork[];
  posts: Post[];
  plans: Plan[];
}

const content = data as unknown as SiteContent;

export const profile = content.profile;
export const navItems = content.navItems;
export const todayStatus = content.todayStatus;
export const journey = content.journey;
export const howIWork = content.howIWork;
export const projects = content.projects;

export function projectTier(p: Project): ProjectTier {
  return p.tier ?? "selected";
}

export function projectStatus(p: Project): ProjectStatus {
  return p.status ?? "completed";
}

export const featuredProjects = projects.filter(
  (p) => projectTier(p) === "featured"
);
export const selectedProjects = projects.filter(
  (p) => projectTier(p) === "selected"
);
export const experimentProjects = projects.filter(
  (p) => projectTier(p) === "experiment"
);
export const currentWork = content.currentWork;
export const posts = content.posts;
export const plans = content.plans;
