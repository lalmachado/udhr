"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { accentStyle, groups, type Group } from "@/data/groups";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useSectionActivation } from "./ActiveSection";
import { Reveal } from "./Reveal";

interface GroupIntroProps {
  group: Group;
  index: number;
  first: number;
  last: number;
}

/** Full-bleed opener for one of the five parts. */
export function GroupIntro({ group, index, first, last }: GroupIntroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  useSectionActivation(ref, group.id);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const numeralY = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);

  return (
    <div
      ref={ref}
      style={accentStyle(group)}
      className="relative flex min-h-[72svh] flex-col justify-end overflow-hidden bg-(--accent) px-5 py-20 text-(--on-accent) sm:px-8 sm:py-28"
    >
      <motion.span
        aria-hidden="true"
        style={{ y: reduce ? 0 : numeralY }}
        className="text-outline pointer-events-none absolute top-4 -right-2 font-display text-[clamp(11rem,42vw,36rem)] leading-none font-light opacity-35 select-none sm:right-6"
      >
        {group.numeral}
      </motion.span>

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal as="p" className="label opacity-80">
          Part {group.numeral} of {groups[groups.length - 1].numeral}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          Articles {first}–{last}
        </Reveal>
        <Reveal
          as="h2"
          id={`part-${group.id}-title`}
          delay={0.06}
          className="mt-6 font-display text-part font-medium"
        >
          {group.name}
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-4 font-display text-lede font-light italic opacity-90">
          {group.tagline}
        </Reveal>
        <Reveal
          as="p"
          delay={0.18}
          className="mt-8 max-w-2xl font-sans text-base leading-relaxed opacity-90 sm:text-lg"
        >
          {group.description}
        </Reveal>
      </div>

      {index === 0 && (
        <span className="sr-only">The articles of the Declaration begin here.</span>
      )}
    </div>
  );
}
