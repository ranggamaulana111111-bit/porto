"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { navItems, projects } from "@/lib/content";

type CommandItem = {
  key: string;
  type: "section" | "cv" | "project";
  id: string;
  label: string;
  hint: string;
  href?: string;
};

const OPEN_EVENT = "porto:open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const items = useMemo<CommandItem[]>(() => {
    const sections: CommandItem[] = navItems.map((n) => ({
      key: `section-${n.id}`,
      type: "section",
      id: n.id,
      label: `Buka ${n.label}`,
      hint: "section",
      href: n.href,
    }));
    const cv: CommandItem = { key: "cv", type: "cv", id: "/cv", label: "Open CV", hint: "halaman" };
    const projectItems: CommandItem[] = projects.map((p) => ({
      key: `project-${p.slug}`,
      type: "project",
      id: p.slug,
      label: p.title,
      hint: p.kind,
    }));
    return [...sections, cv, ...projectItems];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q)
    );
  }, [items, query]);

  const onQueryChange = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, []);

  const goTo = useCallback(
    (id: string) => {
      if (document.getElementById(id)) {
        scrollToId(id);
      } else {
        router.push(`/#${id}`);
      }
    },
    [router, scrollToId]
  );

  const runItem = useCallback(
    (item: CommandItem) => {
      setOpen(false);
      if (item.type === "cv") {
        router.push(item.id);
      } else if (item.type === "section") {
        if (item.href) {
          router.push(item.href);
        } else {
          goTo(item.id);
        }
      } else {
        goTo("projects");
      }
    },
    [router, goTo]
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    const prev = restoreFocusRef.current;
    if (prev && typeof prev.focus === "function") prev.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) =>
          filtered.length ? (i - 1 + filtered.length) % filtered.length : 0
        );
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[activeIndex];
        if (item) runItem(item);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, activeIndex, close, runItem]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-fg/20 backdrop-blur-sm"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="mx-auto mt-24 w-[calc(100%-2rem)] max-w-md rounded-[var(--radius-clay-lg)] border border-border bg-bg-card shadow-[var(--shadow-card-hover)] sm:mt-32 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-list"
            aria-label="Cari section atau project"
            aria-activedescendant={
              filtered[activeIndex] ? `cmd-${filtered[activeIndex].key}` : undefined
            }
            placeholder="Ketik untuk mencari…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-fg-faint"
          />
          <kbd className="shrink-0 border border-border px-1.5 py-0.5 font-mono text-[10px] text-fg-faint">
            ESC
          </kbd>
        </div>

        <ul
          id="command-palette-list"
          ref={listRef}
          role="listbox"
          aria-label="Hasil pencarian"
          className="max-h-72 overflow-y-auto py-1"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-fg-muted">
              Tidak ada yang cocok dengan &ldquo;{query}&rdquo;.
            </li>
          )}

          {filtered.map((item, i) => (
            <li
              key={item.key}
              id={`cmd-${item.key}`}
              role="option"
              aria-selected={i === activeIndex}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => runItem(item)}
                className={`flex w-full items-baseline justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                  i === activeIndex
                    ? "bg-accent/10 text-accent"
                    : "text-fg-secondary"
                }`}
              >
                <span className="truncate text-sm">{item.label}</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                  {item.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2 font-mono text-[10px] text-fg-faint">
          <span>↑↓ navigasi</span>
          <span>↵ pilih</span>
          <span>⌘K buka/tutup</span>
        </div>
      </div>
    </div>
  );
}
