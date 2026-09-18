"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { UDHRArticle } from "@/data/articles";
import { accentStyle, type Group } from "@/data/groups";
import { splitClauses } from "@/lib/text";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useSectionActivation } from "./ActiveSection";
import { Reveal } from "./Reveal";

interface ArticleSectionProps {
  article: UDHRArticle;
  group: Group;
  total: number;
}

export function ArticleSection({ article, group, total }: ArticleSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  useSectionActivation(ref, group.id, article.number);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 60%"],
  });
  const numeralY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  const clauses = splitClauses(article.text);
  const titleId = `article-${article.number}-title`;

  return (
    <article
      ref={ref}
      id={`article-${article.number}`}
      aria-labelledby={titleId}
      style={accentStyle(group)}
      className="relative scroll-mt-4 border-t border-ink/10 bg-paper px-5 py-20 sm:px-8 sm:py-28 lg:flex lg:min-h-[60svh] lg:items-center"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Number, title */}
        <div className="lg:col-span-5">
          <p className="label text-ink-mute">
            <span className="text-(--accent-ink)">Article {article.number}</span>
            <span className="text-ink-mute/70"> of {total}</span>
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {group.name}
          </p>
          <motion.div
            aria-hidden="true"
            style={{ y: reduce ? 0 : numeralY }}
            className="mt-6 font-display text-numeral font-medium text-(--accent) select-none"
          >
            {article.number}
          </motion.div>
          <Reveal as="h3" id={titleId} className="mt-4 font-display text-title font-medium text-ink">
            {article.title}
          </Reveal>
        </div>

        {/* Text */}
        <div className="relative lg:col-span-6 lg:col-start-7 lg:pt-12">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-ink/10">
            <motion.div
              style={{ scaleY: reduce ? 1 : scrollYProgress }}
              className="h-full w-full origin-top bg-(--accent)"
            />
          </div>
          <div className="pl-6 sm:pl-8">
            {clauses.length === 1 ? (
              <Reveal as="p" delay={0.05} className="font-display text-reading text-ink">
                {clauses[0]}
              </Reveal>
            ) : (
              <ol className="space-y-7">
                {clauses.map((clause, index) => (
                  <Reveal
                    key={index}
                    as="li"
                    delay={0.05 + index * 0.07}
                    className="grid grid-cols-[2rem_1fr] gap-3 sm:grid-cols-[2.5rem_1fr]"
                  >
                    <span
                      aria-hidden="true"
                      className="label pt-2 text-(--accent-ink) tabular-nums"
                    >
                      {index + 1}.
                    </span>
                    <p className="font-display text-reading text-ink">{clause}</p>
                  </Reveal>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
