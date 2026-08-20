"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { fadeUp, fadeIn, slideLeft, slideRight, scaleIn } from "@/lib/motion";

type Variant = "up" | "fade" | "left" | "right" | "scale";

interface RevealProps {
  variant?: Variant;
  delay?: number;
  className?: string;
  children: ReactNode;
}

const variants = {
  up: fadeUp,
  fade: fadeIn,
  left: slideLeft,
  right: slideRight,
  scale: scaleIn,
};

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
      variants={variants[variant]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
