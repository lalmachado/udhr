"use client";

import type { ArticleGroup } from "@/data/articles";
import { groups } from "@/data/groups";
import { useActiveSection } from "./ActiveSection";

interface Item {
  href: string;
  label: string;
  mark: string;
  group?: ArticleGroup;
  color?: string;
}

const items: Item[] = [
  { href: "#top", label: "Top", mark: "↑" },
  { href: "#preamble", label: "Preamble", mark: "P" },
  ...groups.map((g) => ({
    href: `#part-${g.id}`,
    label: g.name,
    mark: g.numeral,
    group: g.id,
    color: g.color,
  })),
];

/** Desktop-only jump navigation between the parts of the Declaration. */
export function SideNav() {
  const { active } = useActiveSection();

  return (
    <nav
      aria-label="Parts of the Declaration"
      className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ol className="flex flex-col gap-1 rounded-full bg-paper/85 p-1.5 shadow-sm ring-1 ring-ink/10 backdrop-blur-md">
        {items.map((item) => {
          const current = item.group !== undefined && active?.group === item.group;
          return (
            <li key={item.href} className="relative">
              <a
                href={item.href}
                aria-current={current ? "true" : undefined}
                className="group flex h-8 w-8 items-center justify-center rounded-full font-sans text-[11px] font-medium tracking-wide text-ink-mute transition-colors hover:text-ink aria-[current=true]:text-(--on-accent)"
                style={current ? { backgroundColor: item.color, color: undefined } : undefined}
              >
                <span aria-hidden="true">{item.mark}</span>
                <span className="sr-only">{item.label}</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 rounded-md bg-ink px-2.5 py-1 font-sans text-xs font-medium whitespace-nowrap text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
