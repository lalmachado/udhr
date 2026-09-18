import type { CSSProperties } from "react";
import { articles, type ArticleGroup, type UDHRArticle } from "./articles";

/**
 * Presentation metadata for the five parts the articles are grouped into.
 * The grouping itself lives on each article in `./articles.ts`.
 */
export interface Group {
  id: ArticleGroup;
  /** Roman numeral used in the navigation and the part openers. */
  numeral: string;
  name: string;
  tagline: string;
  description: string;
  /** Vivid colour: full-bleed backgrounds, decorative numerals, the progress bar. */
  color: string;
  /** Darkened variant that passes WCAG AA as text on the paper background. */
  ink: string;
  /** Text colour that passes WCAG AA on top of `color`. */
  onColor: string;
}

const PAPER = "#f6f1e8";
const INK = "#141210";

export const groups: Group[] = [
  {
    id: "dignity",
    numeral: "I",
    name: "Dignity",
    tagline: "Born free and equal",
    description:
      "Two articles carry the weight of everything that follows. Every human being is born free and equal in dignity and rights, and every right in this Declaration belongs to everyone, with no exceptions and no conditions.",
    color: "#ea4636",
    ink: "#b8291e",
    onColor: INK,
  },
  {
    id: "safety",
    numeral: "II",
    name: "Safety",
    tagline: "Life, liberty and the law",
    description:
      "The rights that protect a person from harm and from arbitrary power: to live, to be free, to be safe from slavery and torture, and to stand equal before a fair and impartial law.",
    color: "#2447e0",
    ink: "#1f3ecc",
    onColor: PAPER,
  },
  {
    id: "liberty",
    numeral: "III",
    name: "Liberty",
    tagline: "Home, movement, belief and voice",
    description:
      "The freedoms of a person among others: privacy, the right to move and to seek refuge, a nationality, a family and property, and the freedom to think, believe and speak.",
    color: "#00a86b",
    ink: "#0a7a55",
    onColor: INK,
  },
  {
    id: "community",
    numeral: "IV",
    name: "Community",
    tagline: "Assembly, work, welfare and culture",
    description:
      "The rights we hold as members of a society: to gather and organise, to take part in government, to work and to rest, to live decently, to learn and to share in culture.",
    color: "#f5b400",
    ink: "#8a5600",
    onColor: INK,
  },
  {
    id: "foundations",
    numeral: "V",
    name: "Foundations",
    tagline: "The order these rights require",
    description:
      "The closing articles bind the whole together: an order in which rights can be realised, duties to the community, and a guarantee that nothing here may be used to destroy the rights of others.",
    color: "#6a38e8",
    ink: "#5a2bd0",
    onColor: PAPER,
  },
];

export function groupById(id: ArticleGroup): Group {
  const group = groups.find((g) => g.id === id);
  if (!group) throw new Error(`Unknown article group: ${id}`);
  return group;
}

export function articlesInGroup(id: ArticleGroup): UDHRArticle[] {
  return articles.filter((a) => a.group === id);
}

/** First and last article number in a group. */
export function groupRange(id: ArticleGroup): [number, number] {
  const list = articlesInGroup(id);
  return [list[0].number, list[list.length - 1].number];
}

/** CSS custom properties that scope a group's accent colours to a subtree. */
export function accentStyle(group: Group): CSSProperties {
  return {
    "--accent": group.color,
    "--accent-ink": group.ink,
    "--on-accent": group.onColor,
  } as CSSProperties;
}
