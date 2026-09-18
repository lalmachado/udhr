"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import { preamble } from "@/data/articles";
import { parsePreamble } from "@/lib/text";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useSectionActivation } from "./ActiveSection";
import { Reveal } from "./Reveal";

export function Preamble() {
  const ref = useRef<HTMLElement>(null);
  useSectionActivation(ref, null);
  const { whereas, lead, subject, proclamation } = useMemo(
    () => parsePreamble(preamble),
    [],
  );

  return (
    <section
      ref={ref}
      id="preamble"
      aria-labelledby="preamble-title"
      className="scroll-mt-4 bg-paper px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-6 border-t border-ink/15 pt-8 lg:grid-cols-12">
          <Reveal as="h2" id="preamble-title" className="label text-(--accent-ink) lg:col-span-3">
            Preamble
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="font-display text-lede text-ink-soft lg:col-span-8 lg:col-start-5"
          >
            The Declaration opens by saying why it had to exist: seven reasons,
            each beginning with the same word, and then a single resolve.
          </Reveal>
        </header>

        <ol className="mt-16 space-y-10 sm:mt-24 sm:space-y-14">
          {whereas.map((clause, index) => (
            <Recital key={index} index={index} text={clause} />
          ))}
        </ol>

        <div className="mt-24 grid gap-8 border-t border-ink/15 pt-12 sm:mt-32 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal as="p" className="font-display text-lede text-(--accent-ink) italic">
              {lead}
            </Reveal>
            <Reveal
              as="p"
              delay={0.08}
              className="mt-3 font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.02em] text-ink"
            >
              {subject}
            </Reveal>
          </div>
          <Reveal
            delay={0.16}
            className="border-l-4 border-(--accent) pl-6 sm:pl-8 lg:col-span-7 lg:col-start-6 lg:mt-4"
          >
            <p className="font-display text-reading text-ink">{proclamation}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** One "Whereas …" clause that brightens from faint to full as it reaches the reading line. */
function Recital({ index, text }: { index: number; text: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 48%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.16, 1]);
  const body = text.replace(/^Whereas\s+/, "");

  return (
    <motion.li
      ref={ref}
      style={{ opacity: reduce ? 1 : opacity }}
      className="grid gap-3 lg:grid-cols-12"
    >
      <span
        aria-hidden="true"
        className="label pt-2 text-ink-mute tabular-nums lg:col-span-1"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="font-display text-clause text-ink lg:col-span-10 lg:col-start-3">
        <em className="font-light text-(--accent-ink)">Whereas</em> {body}
      </p>
    </motion.li>
  );
}
