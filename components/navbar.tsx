"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, profile } from "@/lib/content";
import { openCommandPalette } from "@/components/command-palette";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navItems
      .filter((i) => !i.href)
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-6"
      >
        <nav
          className="flex w-full max-w-4xl items-center justify-between gap-2 rounded-[var(--radius-pill)] border bg-bg-card px-2 py-2 shadow-[var(--shadow-card)] transition-all duration-300"
        >
          <a href="#home" className="ml-2 font-display text-sm font-semibold tracking-tight text-fg sm:text-base">
            {profile.shortName}
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`relative rounded-[var(--radius-pill)] px-2.5 py-1.5 text-sm transition-colors ${
                      item.id === "workspace"
                        ? "bg-accent-soft text-accent-strong border border-accent/20 hover:bg-accent/10"
                        : "text-fg-muted hover:text-fg hover:bg-bg-inset"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`relative rounded-[var(--radius-pill)] px-2.5 py-1.5 text-sm transition-colors ${
                      active === item.id ? "bg-fg text-bg" : "text-fg-muted hover:text-fg hover:bg-bg-inset"
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Buka command palette (Ctrl K)"
              className="inline-flex min-h-11 items-center rounded-[var(--radius-pill)] border border-border bg-bg-inset px-3 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent/30 hover:text-accent-strong"
            >
              ⌘K
            </button>

            <a
              href="#contact"
              className="hidden rounded-[var(--radius-pill)] bg-accent px-3.5 py-1.5 text-sm font-medium text-white shadow-[var(--shadow-button)] hover:bg-accent-strong transition-colors lg:inline-flex"
            >
              Hubungi
            </a>

            <button
              aria-label="Buka menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card lg:hidden"
            >
              <span className="flex flex-col gap-1">
                <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block h-px w-4 bg-fg" />
                <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block h-px w-4 bg-fg" />
                <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="block h-px w-4 bg-fg" />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[72px] z-40 rounded-[var(--radius-clay-lg)] border border-border bg-bg-card p-3 shadow-[var(--shadow-card-hover)] lg:hidden"
            id="mobile-menu"
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2.5 text-sm font-medium text-accent-strong border border-accent/20"
                    >
                      {item.label} →
                    </Link>
                  ) : (
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? "true" : undefined}
                      className={`block rounded-[var(--radius-pill)] px-4 py-2.5 text-sm transition-colors ${
                        active === item.id ? "bg-fg text-bg" : "text-fg-secondary hover:bg-bg-inset hover:text-fg"
                      }`}
                    >
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
