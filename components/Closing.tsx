"use client";

import { useRef } from "react";
import { articles } from "@/data/articles";
import { groups } from "@/data/groups";
import { useSectionActivation } from "./ActiveSection";
import { Reveal } from "./Reveal";

const facts: { value: string; label: string }[] = [
  { value: String(articles.length), label: "articles" },
  { value: "48", label: "votes in favour" },
  { value: "0", label: "against" },
  { value: "500+", label: "languages" },
];

export function Closing() {
  const ref = useRef<HTMLElement>(null);
  // Keep the last part's accent through the closing instead of resetting it.
  useSectionActivation(ref, groups[groups.length - 1].id);

  return (
    <section
      ref={ref}
      id="closing"
      aria-labelledby="closing-title"
      className="bg-ink px-5 py-24 text-paper sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal as="p" className="label text-paper/60">
          Adopted and proclaimed
        </Reveal>
        <Reveal as="h2" id="closing-title" delay={0.06} className="mt-6 font-display text-part font-medium">
          10 December 1948
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-8 max-w-2xl font-display text-lede text-paper/85">
          General Assembly resolution 217 A (III), adopted in Paris by forty-eight
          votes to none, with eight abstentions. Since 1950 the date has been
          observed every year as Human Rights Day.
        </Reveal>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-paper/15 pt-10 sm:grid-cols-4">
          {facts.map((fact, index) => (
            <div key={fact.label}>
              <Reveal as="dd" delay={0.05 * index} className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-medium tabular-nums">
                {fact.value}
              </Reveal>
              <Reveal as="dt" delay={0.05 * index + 0.05} className="label mt-3 text-paper/60">
                {fact.label}
              </Reveal>
            </div>
          ))}
        </dl>

        <Reveal delay={0.1} className="mt-16 flex flex-wrap gap-4">
          <a
            href="https://www.un.org/en/about-us/universal-declaration-of-human-rights"
            className="btn btn-solid"
            rel="noopener"
          >
            Read the official text at un.org
            <span aria-hidden="true">↗</span>
          </a>
          <a href="#top" className="btn btn-ghost">
            Back to the top
          </a>
        </Reveal>
      </div>
    </section>
  );
}
