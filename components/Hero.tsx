"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef } from "react";
import { articles } from "@/data/articles";
import { groupById, groups } from "@/data/groups";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useSectionActivation } from "./ActiveSection";

const TITLE: { text: string; accent?: boolean; br?: boolean }[] = [
  { text: "Universal", br: true },
  { text: "Declaration", br: true },
  { text: "of" },
  { text: "Human", accent: true },
  { text: "Rights", accent: true },
];

const longest = Math.max(...articles.map((a) => a.text.length));

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  useSectionActivation(ref, null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -140]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <header
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink text-paper"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0">
        <span
          className="aurora"
          style={{
            left: "-12%",
            top: "-22%",
            width: "62vw",
            height: "62vw",
            background: `radial-gradient(closest-side, ${groups[1].color}, transparent)`,
          }}
        />
        <span
          className="aurora"
          style={{
            right: "-18%",
            top: "8%",
            width: "56vw",
            height: "56vw",
            background: `radial-gradient(closest-side, ${groups[4].color}, transparent)`,
            animationDelay: "-9s",
            animationDirection: "alternate-reverse",
          }}
        />
        <span
          className="aurora"
          style={{
            left: "18%",
            bottom: "-34%",
            width: "72vw",
            height: "72vw",
            background: `radial-gradient(closest-side, ${groups[0].color}, transparent)`,
            animationDelay: "-15s",
          }}
        />
        <div className="grain" />
      </div>

      {/* Masthead */}
      <div className="label relative z-10 flex items-center justify-between px-5 pt-6 text-paper/70 sm:px-8">
        <span>United Nations · General Assembly</span>
        <span className="hidden sm:inline">Resolution 217 A (III)</span>
      </div>

      {/* Title */}
      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="relative z-10 flex flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-12"
      >
        <h1 className="font-display text-hero font-medium text-paper">
          {TITLE.map((word, index) => (
            <Fragment key={word.text}>
              <span className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
                <motion.span
                  data-reveal
                  className={`inline-block ${word.accent ? "font-light text-(--accent) italic" : ""}`}
                  initial={{ y: "125%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.15 + index * 0.09 }}
                >
                  {word.text}
                </motion.span>
              </span>
              {word.br ? <br /> : " "}
            </Fragment>
          ))}
        </h1>

        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.75 }}
          className="mt-8 grid max-w-4xl gap-5 sm:mt-10 sm:grid-cols-[auto_1fr] sm:gap-10"
        >
          <p className="label pt-2 text-paper/70">
            Paris
            <br />
            10 December 1948
          </p>
          <p className="max-w-2xl font-display text-lede text-paper/85">
            Thirty articles that set out, for the first time, the rights every
            person on earth is entitled to. Adopted by the General Assembly of the
            United Nations, and since translated into more than five hundred
            languages.
          </p>
        </motion.div>
      </motion.div>

      {/* Index strip: one bar per article, coloured by part, sized by length. */}
      <div className="relative z-10 px-5 pb-6 sm:px-8 sm:pb-8">
        <div aria-hidden="true" className="flex h-14 items-end gap-[3px] sm:h-20 sm:gap-1">
          {articles.map((article, index) => {
            const height = 18 + 82 * Math.sqrt(article.text.length / longest);
            return (
              <motion.span
                key={article.number}
                className="flex-1 origin-bottom rounded-t-[2px]"
                style={{ height: `${height}%`, backgroundColor: groupById(article.group).color }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.6 + index * 0.03 }}
              />
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="label text-paper/55">
            Thirty articles in five parts · bar height follows the length of each article
          </p>
          <p className="label flex items-center gap-3 text-paper/70">
            <span
              aria-hidden="true"
              className="relative block h-8 w-px overflow-hidden bg-paper/20"
            >
              <span className="absolute inset-0 animate-[cue_2.4s_ease-in-out_infinite] bg-paper" />
            </span>
            Scroll to read
          </p>
        </div>
      </div>
    </header>
  );
}
