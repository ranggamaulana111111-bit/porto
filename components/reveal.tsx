"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { fadeUp, fadeIn } from "@/lib/motion";

type Variant = "up" | "fade";

interface RevealProps {
  variant?: Variant;
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({
  variant = "up",
  delay = 0,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variant === "up" ? fadeUp : fadeIn}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
