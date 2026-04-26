import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/Badge";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { articles } from "@/data/articles";

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
    </main>
  );
}
