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
  },
  {
    title: "コピペ用プロンプト10個",
    description: "要約、言い換え、チェックリスト化、note見出し、商品化メモまで最初の10個を用意します。",
  },
  {
    title: "1週間導入ガイド",
    description: "Day 1からDay 7まで、情報整理から記事下書きまで小さく試す順番をまとめます。",
  },
  {
    title: "次に読むnote導線",
    description: "キットを使ったあとに読むnote記事、メルマガ、商品ページへ迷わず戻れる構成にします。",
  },
];

const distributionOptions = [
  "BOOTH無料配布ページは準備中です。",
  "メルマガ登録特典として配布する導線も未接続です。",
  "実ファイルのダウンロード機能は、配布先が決まり次第追加します。",
];

export default function FreePage() {
  const related = articles.filter((article) =>
    ["ai-note-order", "prompt-first-ten", "meeting-workflow"].includes(article.id),
  );

  return (
    <main>
      <PageHero
        eyebrow="Free Starter Kit"
        title="AIノートを1週間だけ試す、無料キットの準備ページ。"
        description="基本テンプレート、プロンプト10個、1週間導入ガイドを配布する前提で、内容と導線を先に整理しています。"
        primaryCta={{ label: "配布ページ準備中", href: "#distribution-status" }}
        secondaryCta={{ label: "メルマガ準備状況を見る", href: "/newsletter" }}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Inside"
            title="無料キットに入れるもの。"
            description="仕様は `docs/free-starter-kit-spec.md` に分離し、実ファイル作成後にBOOTHまたはメルマガ導線へ接続します。"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {kitItems.map((item) => (
              <div key={item.title} className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold text-stone-950">{item.title}</p>
                <p className="mt-3 leading-7 text-stone-600">{item.description}</p>
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
            配布ページはまだ準備中です。
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
