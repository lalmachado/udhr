"use client";

import { AnimatePresence, motion } from "motion/react";
import { articles } from "@/data/articles";
import { groupById } from "@/data/groups";
import { EASE } from "@/lib/motion";
import { useActiveSection } from "./ActiveSection";

/**
 * Floating "Article n of 30" pill. Purely visual: screen readers already get
 * this information from the article headings, so it is hidden from them.
 */
export function ArticleIndicator() {
  const { active } = useActiveSection();
  const visible = active?.article !== undefined;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6"
    >
      <AnimatePresence>
        {visible && active && (
          <motion.div
            key="indicator"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-center gap-3 rounded-full bg-ink/90 px-4 py-2 text-paper shadow-lg backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-(--accent)" />
            <span className="label text-[10px] sm:text-[11px]">
              Article <span className="tabular-nums">{active.article}</span>
              <span className="text-paper/50"> / {articles.length}</span>
            </span>
            <span className="h-3 w-px bg-paper/25" />
            <span className="label text-[10px] text-paper/70 sm:text-[11px]">
              {groupById(active.group).name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
