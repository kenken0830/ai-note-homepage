import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "個別相談・導入支援は停止中",
  description: "個別相談と法人導入支援は現在停止しています。",
  robots: { index: false, follow: false },
};

export default function ConsultingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Consulting"
        title="個別相談・導入支援は現在停止しています。"
        description="顧客対応を伴わない、無料キット、有料note、BOOTHの買い切り商品に運営資源を集中しています。"
        primaryCta={{ label: "商品一覧へ", href: "/products" }}
        secondaryCta={{ label: "無料キットを見る", href: "/free" }}
      />
      <Section>
        <div className="mx-auto max-w-3xl border-l-4 border-teal-700 bg-stone-50 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-stone-950">現在の販売方針</h2>
          <p className="mt-4 leading-8 text-stone-600">
            記事から必要なテンプレートを選び、販売ページで購入し、同梱手順だけで使い始められる商品を順次追加します。
          </p>
        </div>
      </Section>
    </main>
  );
}
