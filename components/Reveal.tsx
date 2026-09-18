"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { EASE } from "@/lib/motion";

type Tag = "div" | "p" | "li" | "span" | "h2" | "h3" | "dt" | "dd";

const tags = {
  div: motion.div,
  p: motion.p,
  li: motion.li,
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
  dt: motion.dt,
  dd: motion.dd,
};

interface RevealProps {
  as?: Tag;
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  /** Distance in px the element travels upward as it appears. */
  y?: number;
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
}

/**
 * Fades and lifts content into place the first time it scrolls into view.
 * Under `prefers-reduced-motion` the lift is skipped and only the fade remains
 * (handled by `MotionConfig reducedMotion="user"`). `data-reveal` lets a
 * no-JavaScript stylesheet force everything visible.
 */
export function Reveal({
  as = "div",
  children,
  className,
  id,
  style,
  delay = 0,
  y = 28,
  amount = 0.25,
}: RevealProps) {
  const Component = tags[as] as typeof motion.div;
  return (
    <Component
      id={id}
      data-reveal
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}
