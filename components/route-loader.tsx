"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const MIN_DURATION = 2000;

const statusLines = [
  "menyiapkan ruang kerja…",
  "memuat proyek…",
  "menghidupkan server…",
  "hampir selesai…",
];

function LoaderOverlay() {
  const [opacity, setOpacity] = useState(1);
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const start = Date.now();
    let raf = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / MIN_DURATION) * 100);
      setProgress(pct);
      setLine(Math.min(statusLines.length - 1, Math.floor((pct / 100) * statusLines.length)));
      if (elapsed < MIN_DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setOpacity(0);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ pointerEvents: opacity === 0 ? "none" : "auto" }}
      className="fixed inset-0 z-[100] grid place-items-center bg-bg"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-8 px-6">
        {/* monogram pulse */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <span className="font-display text-5xl font-bold tracking-tight text-fg">
            rangga<span className="text-accent">.</span>mrw
          </span>
          <motion.span
            className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-accent to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "center" }}
          />
        </motion.div>

        {/* progress bar */}
        <div className="w-56">
          <div className="h-px w-full bg-border">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-fg-faint">
            <span>{statusLines[line]}</span>
            <span className="tabular-nums">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-fg-faint"
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function RouteLoader() {
  const pathname = usePathname();

  return <LoaderOverlay key={pathname} />;
}
