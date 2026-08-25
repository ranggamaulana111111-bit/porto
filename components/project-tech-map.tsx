import type { TechItem } from "@/lib/content";

export function ProjectTechMap({ items }: { items: TechItem[] }) {
  if (!items?.length) return null;

  return (
    <ul className="grid gap-x-6 gap-y-1 sm:gap-x-10 sm:grid-cols-2">
      {items.map((t) => (
        <li
          key={t.name}
          className="flex items-baseline justify-between gap-2 border-b border-border-subtle py-1.5 sm:gap-3"
        >
          <span className="font-mono text-xs text-fg">{t.name}</span>
          <span className="text-right text-[11px] text-fg-muted sm:text-xs">{t.role}</span>
        </li>
      ))}
    </ul>
  );
}
