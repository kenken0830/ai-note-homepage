import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "はじめてのAIノート導入",
  description:
    "AIノートの読み方、使う順番、無料スターターキット、商品、メルマガへの入口をまとめた初心者向けページです。",
};

const readingOrder = [
  "AIノートで何を整理するかを決める",
  "無料スターターキットで1週間だけ試す",
  "完全ガイド、プロンプト、ワークフローから必要なテーマを読む",
  "テンプレートやプロンプト集で運用を固定する",
  "更新情報と相談ページで継続改善する",
];

const roleSplit = [
  ["note", "毎日の実験ログ", "試したAI活用、失敗、気づき、読者の反応を短く残します。"],
  ["ホームページ", "整理された完全版", "反応が良かった内容を、手順、プロンプト、ワークフローとして体系化します。"],
  ["/updates", "更新記録", "noteから昇格したテーマや、無料キットの改善を記録します。"],
];

export default function StartPage() {
  const starterProducts = products.filter((product) =>
    ["free-starter-kit", "booth-template-pack", "consulting-session"].includes(product.id),
  );

  return (
    <main>
      <PageHero
        eyebrow="Start"
        title="はじめてのAIノートは、読む順番から決める。"
        description="AIツールを増やす前に、情報を集め、試し、記録し、商品や発信に変えるための流れを作ります。"
        primaryCta={{ label: "無料キットを見る", href: "/free" }}
        secondaryCta={{ label: "商品一覧へ", href: "/products" }}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Reading Order"
            title="最初の5ステップ。"
            description="記事を読むだけで終わらせず、無料キット、ガイド、商品、相談まで自然に進める順番です。"
          />
          <ol className="grid gap-4">
            {readingOrder.map((item, index) => (
              <li key={item} className="grid grid-cols-[44px_1fr] gap-4 border-b border-stone-200 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="pt-2 font-semibold leading-7 text-stone-900">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <Section tone="soft">
        <div className="mb-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Content Roles"
            title="noteで試し、ホームページで体系化する。"
            description="毎日noteは実験ログ、ホームページは整理された完全版です。反応が良かった内容を週1で見直し、必要なものだけ昇格します。"
          />
          <div className="grid gap-4">
            {roleSplit.map(([label, title, description]) => (
              <div key={label} className="rounded-[8px] bg-white p-5 shadow-sm">
                <p className="text-sm font-bold tracking-[0.12em] text-teal-700 uppercase">
                  {label}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-stone-950">{title}</h2>
                <p className="mt-3 leading-7 text-stone-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Starter Shelf"
            title="入口に置く3つの導線。"
            description="無料キットで試し、必要なら商品や相談へ進めるようにしています。"
          />
          <CtaButton href="/newsletter" variant="secondary">
            メルマガを見る
          </CtaButton>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {starterProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaButton href="/free">無料キットを使う</CtaButton>
          <CtaButton href="/guides" variant="secondary">
            完全ガイドを見る
          </CtaButton>
          <CtaButton href="/products" variant="secondary">
            商品一覧を見る
          </CtaButton>
        </div>
      </Section>
    </main>
  );
}
