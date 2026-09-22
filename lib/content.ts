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
  roleShort: string;
  location: string;
  timezone: string;
  email: string;
  status: string;
  snapshot: { label: string; value: string }[];
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
  href?: string;
}

export interface ListeningPlaylist {
  title: string;
  url: string;
  embed: string;
}

export interface NowFragment {
  label: string;
  text: string;
  type?: "listen";
}

export interface TodayStatus {
  intro: string;
  heroLines: string[];
  fragments: NowFragment[];
  focus: string;
  focusItems: string[];
  techStack: string[];
  listeningTo: string;
  mood: string;
  listeningPlaylist: ListeningPlaylist;
}

export interface OutsideEntry {
  caption: string;
  image?: string;
  date?: string;
}

export interface About {
  title: string;
  body: string[];
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
  versions: (string | null)[];
}

export interface TechStackCategory {
  category: string;
  technologies: TechEntry[];
}

const CATEGORY_OF: Record<string, string> = {
  "Laravel": "CORE",
  "Blade": "CORE",
  "Next.js 16": "CORE",
  "React 19": "CORE",
  "TypeScript": "CORE",
  "Tailwind CSS": "CORE",
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

  const add = (rawName: string, role: string, project: string) => {
    const match = rawName.match(/^(.*?)(?:\s+(v?\d[\w.]*))?$/);
    const base = (match?.[1] ?? rawName).trim();
    const version = match?.[2] ? match[2].replace(/^v/, "") : null;
    const key = base.toLowerCase();
    const existing = map.get(key);
    if (existing) {
      if (!existing.projects.includes(project)) {
        existing.projects.push(project);
        existing.versions.push(version);
      }
    } else {
      map.set(key, { name: base, role, projects: [project], versions: [version] });
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

function buildTechStackByProject(): TechProjectGroup[] {
  const groups = new Map<string, TechEntry[]>();

  for (const p of content.projects) {
    if (!p.technologies) continue;
    const key = p.title;
    if (!groups.has(key)) groups.set(key, []);
    for (const t of p.technologies) {
      const match = t.name.match(/^(.*?)(?:\s+(v?\d[\w.]*))?$/);
      const base = (match?.[1] ?? t.name).trim();
      const version = match?.[2] ? match[2].replace(/^v/, "") : null;
      groups.get(key)!.push({ name: base, role: t.role, projects: [p.title], versions: [version] });
    }
  }

  const result: TechProjectGroup[] = [];
  for (const p of content.projects) {
    const techs = groups.get(p.title);
    if (techs && techs.length > 0) {
      result.push({ project: p.title, slug: p.slug, technologies: techs });
    }
  }

  const portfolioTechs: TechEntry[] = [];
  for (const t of OWN_STACK) {
    const match = t.name.match(/^(.*?)(?:\s+(v?\d[\w.]*))?$/);
    const base = (match?.[1] ?? t.name).trim();
    const version = match?.[2] ? match[2].replace(/^v/, "") : null;
    portfolioTechs.push({ name: base, role: t.role, projects: ["Portfolio"], versions: [version] });
  }
  if (portfolioTechs.length > 0) {
    result.push({ project: "Portfolio", technologies: portfolioTechs });
  }

  return result;
}

export interface SiteContent {
  profile: Profile;
  navItems: NavItem[];
  todayStatus: TodayStatus;
  about: About;
  journey: Journey[];
  howIWork: HowIWork[];
  projects: Project[];
  currentWork: CurrentWork[];
  posts: Post[];
  plans: Plan[];
  outside: OutsideEntry[];
}

const content = data as unknown as SiteContent;

export interface TechProjectGroup {
  project: string;
  slug?: string;
  technologies: TechEntry[];
}

export const techStackCategories = buildTechStack();
export const techStackByProject = buildTechStackByProject();

export const profile: Profile = {
  ...content.profile,
  role:
    content.profile.role ??
    "Mahasiswa Universitas Pamulang Kampus Serang, Program Studi Sistem Informasi",
  roleShort: content.profile.roleShort ?? "Mahasiswa Sistem Informasi",
};

const ABOUT_FALLBACK: About = {
  title: "Tentang Saya",
  body: [
    "Mahasiswa Sistem Informasi di Universitas Pamulang, Kampus Serang. Ketertarikan utama saya di pengembangan software, dengan minat yang terus tumbuh di networking dan infrastructure.",
    "Saya lebih banyak memahami teknologi dengan membangun langsung, dari aplikasi web, pengelolaan database dan API, konfigurasi jaringan, sampai menjalankan aplikasi di server dan homelab.",
    "Tidak semua hal sudah saya kuasai, beberapa masih dalam eksplorasi. Yang saya kejar bukan hafal semua tools, tapi paham bagaimana sebuah sistem berjalan menyeluruh, dan setiap project jadi tempat untuk menguji pemahaman itu.",
  ],
};

const FALLBACK_NAV: NavItem[] = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "Tentang" },
  { id: "projects", label: "Project" },
  { id: "experience", label: "Perjalanan" },
  { id: "skills", label: "Stack" },
  { id: "workspace", label: "Workspace", href: "/workspace" },
  { id: "messages", label: "Pesan", href: "/messages" },
  { id: "contact", label: "Kontak" },
];

const _rawNav = (content.navItems as unknown as NavItem[]) ?? [];
const _hasNewIds = _rawNav.some((n) => ["home", "about", "projects", "experience", "skills", "contact", "workspace", "messages"].includes(n.id));
const RAW_NAV_ITEMS: NavItem[] = _hasNewIds ? _rawNav : FALLBACK_NAV;

const NAV_ROUTE_FALLBACK: Record<string, string> = {
  stack: "/stack",
  workspace: "/workspace",
  messages: "/messages",
};

export const navItems: NavItem[] = RAW_NAV_ITEMS.map((n) => ({
  ...n,
  href: n.href ?? NAV_ROUTE_FALLBACK[n.id],
}));

export const about: About = {
  title: content.about?.title ?? ABOUT_FALLBACK.title,
  body: content.about?.body?.length ? content.about.body : ABOUT_FALLBACK.body,
};
export const todayStatus: TodayStatus = {
  ...content.todayStatus,
};
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
export const outside: OutsideEntry[] = content.outside ?? [];
export const plans = content.plans;
