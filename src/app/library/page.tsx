import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/Badge";
import { ExternalLink } from "@/components/ExternalLink";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { articles } from "@/data/articles";
import { notePosts } from "@/data/notePosts";

export const metadata: Metadata = {
  title: "記事ライブラリ",
  description:
    "note、Zenn、Medium、自サイト記事を横断して、source、tag、funnelStage、relatedProductIdsで管理する記事ハブです。",
};

export default function LibraryPage() {
  return (
    <main>
      <PageHero
        eyebrow="Library"
        title="媒体ではなく、目的から記事を探す。"
        description="note / Zenn / Medium / 自サイト記事を横断し、読者の段階と関連商品で案内します。"
        primaryCta={{ label: "無料キットを見る", href: "/free" }}
        secondaryCta={{ label: "商品一覧へ", href: "/products" }}
      />
      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          {["discover", "learn", "download", "nurture", "buy", "join", "consult"].map(
            (stage) => (
              <Badge key={stage} tone="stone">
                {stage}
              </Badge>
            ),
          )}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Section>
      <Section tone="soft">
        <div className="mb-8 max-w-3xl">
          <Badge tone="stone">note実験ログ</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-normal text-stone-950">
            自動投稿されたnoteから、HP化候補を受け取る。
          </h2>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            別プロジェクトで公開済みになったnoteのURL、タイトル、要約、タグ、HP化候補情報だけを受け取り、
            ホームページ側では整理と導線化だけを行います。
          </p>
        </div>
        {notePosts.length === 0 ? (
          <div className="rounded-[8px] border border-dashed border-stone-300 bg-white p-6 text-sm leading-7 text-stone-600">
            note自動投稿プロジェクトから公開済みnote URLを連携すると、ここに表示されます。
            このサイトからnote投稿、下書き編集、公開操作は行いません。
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {notePosts.map((post) => (
              <article
                key={post.id}
                className="flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>note</Badge>
                    <Badge tone={post.hpCandidate ? "dark" : "stone"}>
                      {post.hpCandidate ? "HP化候補" : "実験ログ"}
                    </Badge>
                  </div>
                  <time className="mt-4 block text-sm text-stone-500" dateTime={post.publishedAt}>
                    {new Intl.DateTimeFormat("ja-JP", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(post.publishedAt))}
                  </time>
                  <h3 className="mt-3 text-xl font-semibold leading-8 text-stone-950">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{post.summary}</p>
                  {post.hpCandidateReason ? (
                    <p className="mt-4 rounded-[8px] bg-teal-50 p-3 text-xs font-bold leading-6 text-teal-800">
                      HP化候補: {post.hpCandidateReason}
                    </p>
                  ) : null}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs font-bold text-teal-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 text-sm font-bold">
                  <ExternalLink
                    href={post.url}
                    source="note"
                    medium="library_note_experiment"
                    className="text-teal-700 hover:text-teal-900"
                  >
                    公開済みnoteを読む
                  </ExternalLink>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
