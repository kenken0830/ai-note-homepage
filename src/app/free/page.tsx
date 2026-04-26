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
  {
    title: "AIノート基本テンプレート",
    description: "目的、入力、AIへの依頼、要点、自分の判断、次に使う形を1枚で残します。",
    href: "/free-starter-kit/ai-note-basic-template.md",
  },
  {
    title: "コピペ用プロンプト10個",
    description: "要約、言い換え、チェックリスト化、note見出し、商品化メモまで最初の10個を用意します。",
    href: "/free-starter-kit/prompt-10-pack.md",
  },
  {
    title: "1週間導入ガイド",
    description: "Day 1からDay 7まで、情報整理から記事下書きまで小さく試す順番をまとめます。",
    href: "/free-starter-kit/seven-day-guide.md",
  },
  {
    title: "次に読むnote導線",
    description: "キットを使ったあとに読むnote記事、メルマガ、商品ページへ迷わず戻れる構成にします。",
    href: "/free-starter-kit/read-next.md",
  },
];

const distributionOptions = [
  "サイト内配布版としてMarkdownファイルを公開済みです。",
  "BOOTH無料配布ページは準備中です。",
  "メルマガ登録特典として配布する導線は未接続です。",
];

export default function FreePage() {
  const related = articles.filter((article) =>
    ["ai-note-order", "prompt-first-ten", "meeting-workflow"].includes(article.id),
  );

  return (
    <main>
      <PageHero
        eyebrow="Free Starter Kit"
        title="AIノートを1週間だけ試す、無料スターターキット。"
        description="基本テンプレート、プロンプト10個、1週間導入ガイドをMarkdownファイルとして公開しています。BOOTHやメルマガ配布は、外部サービス接続後に差し替えます。"
        primaryCta={{ label: "基本テンプレートを開く", href: "/free-starter-kit/ai-note-basic-template.md" }}
        secondaryCta={{ label: "メルマガ準備状況を見る", href: "/newsletter" }}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Inside"
            title="無料キットに入れるもの。"
            description="仕様は `docs/free-starter-kit-spec.md` に分離し、配布ファイルは `public/free-starter-kit` で管理します。"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {kitItems.map((item) => (
              <div key={item.title} className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold text-stone-950">{item.title}</p>
                <p className="mt-3 leading-7 text-stone-600">{item.description}</p>
                <a
                  href={item.href}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[8px] border border-stone-300 px-4 py-2 text-sm font-bold text-stone-950 transition hover:border-teal-500 hover:text-teal-800"
                >
                  ファイルを開く
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section id="distribution-status" tone="soft">
        <div className="rounded-[8px] border border-dashed border-stone-300 bg-white p-6 sm:p-8">
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            Distribution Status
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950">
            サイト内配布版は公開済みです。
          </h2>
          <div className="mt-6 grid gap-3">
            {distributionOptions.map((option) => (
              <p key={option} className="rounded-[8px] bg-stone-100 px-4 py-3 font-semibold text-stone-600">
                {option}
              </p>
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
