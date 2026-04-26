import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/config/site";
import type { Article } from "@/data/articles";

type FeaturedArticlesProps = {
  articles: Article[];
};

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <section id="articles" className="bg-stone-50 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Articles"
            title="まず読んでほしいnote記事。"
            description="プロフィール代わりに、発信の軸が伝わる人気記事をピックアップしています。"
          />
          {siteConfig.noteUrl ? (
            <a
              href={siteConfig.noteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-fit items-center justify-center rounded-[8px] border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-stone-950 transition hover:border-teal-500 hover:text-teal-800"
            >
              note一覧へ
            </a>
          ) : null}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
