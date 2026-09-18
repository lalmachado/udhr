"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/** Thin reading-progress bar pinned to the top edge, coloured by the active part. */
export function ProgressBar() {
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.3,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
    >
      <motion.div
        className="h-full w-full origin-left bg-(--accent)"
        style={{ scaleX: reduce ? scrollYProgress : smoothed }}
      />
    </div>
  );
}
