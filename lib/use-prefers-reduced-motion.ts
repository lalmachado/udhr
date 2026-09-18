import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * Whether the visitor has asked for reduced motion.
 *
 * Unlike motion's `useReducedMotion`, this reports `false` during server
 * rendering and hydration, so markup matches on both sides, then updates to
 * the real value immediately after. Scroll-linked values switch to their
 * static equivalents at that point.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
