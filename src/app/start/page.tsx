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
  "note / Zenn / Mediumの記事から必要なテーマを読む",
  "テンプレートやプロンプト集で運用を固定する",
  "メルマガ、コミュニティ、相談で継続改善する",
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
        secondaryCta={{ label: "記事ライブラリへ", href: "/library" }}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Reading Order"
            title="最初の5ステップ。"
            description="記事を読むだけで終わらせず、無料キット、商品、メルマガまで自然に進める順番です。"
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
      </Section>
    </main>
  );
}
