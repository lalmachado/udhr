import { ActiveSectionProvider } from "@/components/ActiveSection";
import { ArticleIndicator } from "@/components/ArticleIndicator";
import { ArticleSection } from "@/components/ArticleSection";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { GroupIntro } from "@/components/GroupIntro";
import { Hero } from "@/components/Hero";
import { Preamble } from "@/components/Preamble";
import { ProgressBar } from "@/components/ProgressBar";
import { SideNav } from "@/components/SideNav";
import { articles } from "@/data/articles";
import { articlesInGroup, groupRange, groups } from "@/data/groups";

export default function Page() {
  return (
    <ActiveSectionProvider>
      <ProgressBar />
      <SideNav />
      <ArticleIndicator />

      <main id="main">
        <Hero />
        <Preamble />

        {groups.map((group, index) => {
          const [first, last] = groupRange(group.id);
          return (
            <section
              key={group.id}
              id={`part-${group.id}`}
              aria-labelledby={`part-${group.id}-title`}
              className="scroll-mt-4"
            >
              <GroupIntro group={group} index={index} first={first} last={last} />
              {articlesInGroup(group.id).map((article) => (
                <ArticleSection
                  key={article.number}
                  article={article}
                  group={group}
                  total={articles.length}
                />
              ))}
            </section>
          );
        })}

        <Closing />
      </main>

      <Footer />
    </ActiveSectionProvider>
  );
}
