"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

let sessionShown = false;

export function RouteLoader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (reduced) return false;
    if (sessionShown) return false;
    sessionShown = true;
    return true;
  });

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
      onAnimationComplete={() => setShow(false)}
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-bg"
    >
      <div className="flex flex-col items-center gap-5 px-6">
        <span className="font-display text-2xl font-bold tracking-tight text-fg">
          rangga<span className="text-accent">.</span>mrw
        </span>
        <div className="h-px w-40 overflow-hidden bg-border">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
