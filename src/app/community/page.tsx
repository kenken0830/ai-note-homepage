import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "コミュニティは停止中",
  description: "継続的な顧客対応を伴うコミュニティ運営は現在停止しています。",
  robots: { index: false, follow: false },
};

export default function CommunityPage() {
  return (
    <main>
      <PageHero
        eyebrow="Community"
        title="コミュニティ運営は現在停止しています。"
        description="継続的な質問対応ではなく、1回の購入で完結する有料noteとBOOTH商品を優先します。"
        primaryCta={{ label: "商品一覧へ", href: "/products" }}
        secondaryCta={{ label: "無料キットを見る", href: "/free" }}
      />
      <Section>
        <div className="mx-auto max-w-3xl border-l-4 border-teal-700 bg-stone-50 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-stone-950">現在の提供形態</h2>
          <p className="mt-4 leading-8 text-stone-600">
            無料キットで試し、必要なテーマだけ有料noteまたはBOOTHの買い切り商品で深掘りできる形へ統一しています。
          </p>
        </div>
      </Section>
    </main>
  );
}
