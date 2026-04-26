import { siteConfig } from "@/config/site";
import type { Article } from "@/data/articles";

type ArticleCardProps = {
  article: Article;
};

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function ArticleCard({ article }: ArticleCardProps) {
  const href = article.href ?? siteConfig.noteUrl;
  const cardContent = (
    <>
      <div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-teal-50 px-3 py-1 font-semibold text-teal-800">
            {article.category}
          </span>
          <time className="text-stone-500" dateTime={article.publishedAt}>
            {dateFormatter.format(new Date(article.publishedAt))}
          </time>
        </div>
        <h3 className="mt-5 text-xl font-semibold leading-8 text-stone-950 transition group-hover:text-teal-800">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          {article.description}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-700">
        {href ? "noteで読む" : "リンク設定待ち"}
        <span className="transition group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </span>
    </>
  );

  const className =
    "group flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10";

  if (!href) {
    return <article className={className}>{cardContent}</article>;
  }

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {cardContent}
    </a>
  );
}
