"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile, todayStatus } from "@/lib/content";
import { SpotifyPlayer } from "@/components/spotify-player";

export function Hero() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setLine((v) => (v + 1) % todayStatus.heroLines.length),
      reduce ? 5000 : 3800
    );
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <section id="home" className="px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="font-mono text-xs uppercase tracking-wider text-fg-muted"
          >
            {profile.location} · {profile.shortName}
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="mt-4 font-display text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-[3.25rem]"
          >
            Rangga Maulana
            <br />
            <span className="text-fg-secondary">Ramadhan Wiharto</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mt-5 text-base leading-relaxed text-fg-secondary max-w-xl"
          >
            {profile.roleShort}. Berada di {profile.location}.
          </motion.p>

          <div className="mt-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={line}
                initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                transition={reduce ? { duration: 1.2, ease: "easeInOut" } : { duration: 0.4, ease: "easeOut" }}
                className="font-mono text-sm text-fg-muted max-w-xl"
              >
                {todayStatus.heroLines[line]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 flex flex-col gap-4 md:flex-row md:items-start md:gap-5"
          >
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-accent px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-button)] border border-accent-strong/10 hover:bg-accent-strong transition-colors"
              >
                Lihat Project
              </a>
              <Link
                href="/cv"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-bg-card px-6 py-3 text-sm font-medium text-fg border border-border shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-card)] transition-all"
              >
                Lihat CV
              </Link>
            </div>
            <SpotifyPlayer className="w-full md:w-80" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}