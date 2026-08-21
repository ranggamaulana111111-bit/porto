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

export interface TechEntry {
  name: string;
  role: string;
  projects: string[];
}

export interface TechStackCategory {
  category: string;
  technologies: TechEntry[];
}

const CATEGORY_OF: Record<string, string> = {
  "Laravel 12": "CORE",
  "Laravel 11": "CORE",
  "Blade": "CORE",
  "Next.js 16": "CORE",
  "React 19": "CORE",
  "TypeScript": "CORE",
  "Tailwind CSS": "CORE",
  "Tailwind CSS v4": "CORE",
  "Zustand": "CORE",
  "TanStack Query": "CORE",
  "Dart": "CORE",
  "MySQL": "DATABASE",
  "SQLite": "DATABASE",
  "MikroTik API": "NETWORKING",
  "OLT multi-brand": "NETWORKING",
  "Leaflet": "NETWORKING",
  "Proxmox VE": "INFRASTRUCTURE",
  "Docker": "INFRASTRUCTURE",
  "Nginx": "INFRASTRUCTURE",
  "Cloudflare Tunnel": "INFRASTRUCTURE",
  "Linux": "INFRASTRUCTURE",
  "Ansible": "INFRASTRUCTURE",
  "Terraform": "INFRASTRUCTURE",
  "Midtrans": "INTEGRATION",
  "WhatsApp API": "INTEGRATION",
  "Telegram Bot API": "INTEGRATION",
  "Spatie Permission": "INTEGRATION",
  "DomPDF": "INTEGRATION",
  "QR Code": "INTEGRATION",
  "Chart.js": "INTEGRATION",
  "Recharts": "INTEGRATION",
  "Flutter": "MOBILE",
  "MkDocs": "TOOLS",
  "Playwright": "TOOLS",
  "Git": "TOOLS",
  "GitHub": "TOOLS",
  "VS Code": "TOOLS",
  "Figma": "TOOLS",
  "Postman": "TOOLS",
};

const OWN_STACK: { name: string; role: string }[] = [
  { name: "Next.js 16", role: "App framework" },
  { name: "React 19", role: "UI library" },
  { name: "TypeScript", role: "Language" },
  { name: "Tailwind CSS v4", role: "UI styling" },
];

const TOOL_STACK: { name: string; role: string }[] = [
  { name: "Git", role: "Version control" },
  { name: "GitHub", role: "Remote & CI" },
  { name: "VS Code", role: "Editor" },
  { name: "Figma", role: "UI design" },
  { name: "Postman", role: "API testing" },
];

function buildTechStack(): TechStackCategory[] {
  const map = new Map<string, TechEntry>();

  const add = (name: string, role: string, project: string) => {
    const key = name.toLowerCase();
    const existing = map.get(key);
    if (existing) {
      if (!existing.projects.includes(project)) existing.projects.push(project);
    } else {
      map.set(key, { name, role, projects: [project] });
    }
  };

  for (const p of content.projects) {
    for (const t of p.technologies ?? []) add(t.name, t.role, p.title);
  }
  for (const t of OWN_STACK) add(t.name, t.role, "Portfolio");
  for (const t of TOOL_STACK) add(t.name, t.role, "Workflow");

  const byCat = new Map<string, TechEntry[]>();
  for (const entry of map.values()) {
    const cat = CATEGORY_OF[entry.name] ?? "CORE";
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat)!.push(entry);
  }

  const ORDER = [
    "CORE",
    "INFRASTRUCTURE",
    "NETWORKING",
    "DATABASE",
    "INTEGRATION",
    "MOBILE",
    "TOOLS",
  ];

  return ORDER.filter((c) => byCat.has(c)).map((c) => ({
    category: c,
    technologies: byCat.get(c)!.sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

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

export const techStackCategories = buildTechStack();

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
