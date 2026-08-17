"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { todayStatus, profile } from "@/lib/content";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: profile.timezone,
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono tabular-nums">{time}</span>;
}

function LiveDate() {
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: profile.timezone,
      }).format(new Date()),
    []
  );

  return <span>{date}</span>;
}

export function HariIni() {
  return (
    <section id="hari-ini" className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
          }}
        >
          {/* metadata line */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.8 } },
            }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-muted"
          >
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-online animate-pulse" />
              Online
            </span>
            <span className="text-fg-faint">·</span>
            <LiveDate />
            <span className="text-fg-faint">·</span>
            <LiveClock />
            <span className="text-fg-faint">·</span>
            <span>{profile.location}</span>
          </motion.div>

          {/* greeting */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-10 font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {todayStatus.greeting}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-4 text-base leading-relaxed text-fg-secondary max-w-xl"
          >
            {todayStatus.intro}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <a
              href="#project"
              className="group inline-flex items-center gap-2 font-mono text-sm text-fg transition-colors hover:text-accent"
            >
              <span className="text-fg-faint group-hover:text-accent">[</span>
              lihat project
              <span className="text-fg-faint group-hover:text-accent">]</span>
            </a>
            <a
              href="#berbincang"
              className="group inline-flex items-center gap-2 font-mono text-sm text-fg-muted transition-colors hover:text-accent"
            >
              <span className="text-fg-faint group-hover:text-accent">[</span>
              ngobrol dengan saya
              <span className="text-fg-faint group-hover:text-accent">]</span>
            </a>
          </motion.div>

          {/* focus section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-14"
          >
            <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-4">
              {todayStatus.focus}
            </p>
            <div className="space-y-2">
              {todayStatus.focusItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                      ["bg-accent", "bg-green", "bg-teal", "bg-amber", "bg-coral", "bg-sky"][i % 6]
                    }`}
                  />
                  <span className="text-sm text-fg-secondary">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* bottom row: git + music + mood */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.8 } },
            }}
            className="mt-14 grid gap-8 sm:grid-cols-3"
          >
            {/* git */}
            <div>
              <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-3">
                Commit terakhir
              </p>
              <div className="space-y-2.5">
                {todayStatus.gitCommits.map((c, i) => (
                  <div key={i} className="text-sm">
                    <span className="text-fg-muted">{c.repo}/</span>
                    <span className="text-fg">{c.message}</span>
                    <span className="block text-xs text-fg-muted mt-0.5">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* music */}
            <div>
              <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-3">
                Mendengarkan
              </p>
              <p className="text-sm text-fg-secondary">
                {todayStatus.listeningTo}
              </p>
            </div>

            {/* mood */}
            <div>
              <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-3">
                Suasana hari ini
              </p>
              <p className="text-sm text-fg-secondary">
                {todayStatus.mood}
              </p>
            </div>
          </motion.div>

          {/* divider */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 1 } },
            }}
            className="mt-20 border-t border-border"
          />
        </motion.div>
      </div>
    </section>
  );
}
