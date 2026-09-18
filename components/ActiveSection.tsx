"use client";

import { MotionConfig, useInView } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { ArticleGroup } from "@/data/articles";
import { accentStyle, groupById, groups } from "@/data/groups";

export type ActiveSection = { group: ArticleGroup; article?: number } | null;

interface ActiveSectionContextValue {
  active: ActiveSection;
  setActive: (next: ActiveSection) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  active: null,
  setActive: () => {},
});

/**
 * Tracks which part/article is under the reading line and exposes its accent
 * colours as CSS custom properties, so fixed chrome (progress bar, nav,
 * indicator) can follow the reader through the document.
 */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [active, setActiveState] = useState<ActiveSection>(null);

  const setActive = useCallback((next: ActiveSection) => {
    setActiveState((prev) =>
      prev?.group === next?.group && prev?.article === next?.article ? prev : next,
    );
  }, []);

  const value = useMemo(() => ({ active, setActive }), [active, setActive]);
  const group = groupById(active?.group ?? groups[0].id);

  return (
    <MotionConfig reducedMotion="user">
      <ActiveSectionContext.Provider value={value}>
        <div style={accentStyle(group)} className="accent-transition">
          {children}
        </div>
      </ActiveSectionContext.Provider>
    </MotionConfig>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}

/**
 * Marks a section as active while it crosses a band just above the middle of
 * the viewport. Pass `null` for sections that have no accent of their own.
 */
export function useSectionActivation(
  ref: RefObject<Element | null>,
  group: ArticleGroup | null,
  article?: number,
) {
  const { setActive } = useActiveSection();
  const inView = useInView(ref, { margin: "-40% 0px -45% 0px" });

  useEffect(() => {
    if (inView) setActive(group ? { group, article } : null);
  }, [inView, group, article, setActive]);
}
