import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "無料スターターキット",
  description:
    "AIノート基本テンプレート、プロンプト10個、1週間導入ガイド、関連記事をまとめた無料スターターキットのLPです。",
};

const kitItems = [
  "AIノート基本テンプレート",
  "最初に使うプロンプト10個",
  "1週間導入ガイド",
  "note / Zenn / Mediumの読み順ガイド",
];

export default function FreePage() {
  const related = articles.filter((article) =>
    ["ai-note-order", "prompt-first-ten", "meeting-workflow"].includes(article.id),
  );

  return (
    <main>
      <PageHero
        eyebrow="Free Starter Kit"
        title="AIノートを1週間だけ試す無料キット。"
        description="まずは無料で、情報収集、要約、記録、記事化の流れを体験できる入口を用意します。"
        primaryCta={{ label: "メルマガ登録で受け取る", href: "/newsletter" }}
        secondaryCta={{ label: "BOOTH無料配布予定", href: "/products" }}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Inside"
            title="無料キットの内容。"
            description="外部配布サービスは未接続です。BOOTH無料配布かメルマガ登録に後から差し替えます。"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {kitItems.map((item) => (
              <div key={item} className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold text-stone-950">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Related Articles"
            title="キットと一緒に読む記事。"
            description="無料DLだけで終わらないように、使い方の記事へつなぎます。"
          />
          <CtaButton href="/library" variant="secondary">
            記事ライブラリへ
          </CtaButton>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {related.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Section>
    </main>
  );
}
