import Link from "next/link";
import { Badge } from "@/components/Badge";
import { ExternalLink } from "@/components/ExternalLink";
import type { Article } from "@/types/content";

type ArticleCardProps = {
  article: Article;
};

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function ArticleCard({ article }: ArticleCardProps) {
  const isInternal = article.sourceUrl.startsWith("/");

  return (
    <article className="flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{article.source}</Badge>
          <Badge tone="stone">{article.funnelStage}</Badge>
        </div>
        <time className="mt-4 block text-sm text-stone-500" dateTime={article.publishedAt}>
          {dateFormatter.format(new Date(article.publishedAt))}
        </time>
        <h3 className="mt-3 text-xl font-semibold leading-8 text-stone-950">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-stone-600">{article.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs font-bold text-teal-700">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 text-sm font-bold">
        {isInternal ? (
          <Link href={article.sourceUrl} className="text-teal-700 hover:text-teal-900">
            記事導線を見る
          </Link>
        ) : (
          <ExternalLink
            href={article.sourceUrl}
            source={article.source}
            medium="article_card"
            className="text-teal-700 hover:text-teal-900"
          >
            元記事を見る
          </ExternalLink>
        )}
      </div>
    </article>
  );
}
