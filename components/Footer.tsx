import { articles } from "@/data/articles";
import { groupById } from "@/data/groups";

/** Full index of the thirty articles, plus attribution. Server-rendered. */
export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink px-5 py-16 text-paper sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <nav aria-labelledby="index-title">
          <h2 id="index-title" className="label text-paper/60">
            Index of articles
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.number}>
                <a
                  href={`#article-${article.number}`}
                  className="group flex items-baseline gap-3 rounded-sm py-1.5 font-sans text-sm text-paper/75 transition-colors hover:text-paper"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full"
                    style={{ backgroundColor: groupById(article.group).color }}
                  />
                  <span className="w-6 shrink-0 font-display text-base text-paper tabular-nums">
                    {article.number}
                  </span>
                  <span className="underline-offset-4 group-hover:underline">
                    {article.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-16 grid gap-6 border-t border-paper/10 pt-8 text-xs leading-relaxed text-paper/50 sm:grid-cols-2 sm:gap-12">
          <p>
            The text of the Universal Declaration of Human Rights is reproduced
            from the United Nations, which makes it freely available. The
            groupings, titles and introductions on this page are editorial and
            are not part of the Declaration. This is an independent presentation
            and is not affiliated with the United Nations.
          </p>
          <p>
            Built with Next.js, Tailwind CSS and Motion. Animations respect your
            system&rsquo;s reduced-motion setting, and every part of the page can
            be reached with a keyboard.
          </p>
        </div>
      </div>
    </footer>
  );
}
