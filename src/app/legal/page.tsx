import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "法務・ポリシー入口",
  description:
    "利用規約、プライバシー、広告表示など、正式化が必要な方針の現在地を示す準備中ページです。",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: false },
};

const legalItems = [
  ["特定商取引法に基づく表記", "販売開始前に、販売者情報、価格、支払い方法、返品条件を正式版へ差し替えます。"],
  ["利用規約", "テンプレート、プロンプト、有料記事の利用条件を正式版へ差し替えます。"],
  ["プライバシーポリシー", "Vercel Web Analyticsを利用しています。取得項目、保持、問い合わせ方法を含む正式文書は、人間の法務・運営レビュー後に確定します。"],
  ["ライセンス方針", "テンプレートやコードサンプルの再配布、商用利用、改変範囲を正式版へ差し替えます。"],
];

export default function LegalPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="正式化が必要な法務・広告・プライバシー方針。"
        description="現時点では正式な法務文書ではありません。アクセス解析は利用中です。商品販売、広告リンク、メルマガ、フォーム連携は、人間が必要な文書を承認するまで開始しません。"
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {legalItems.map(([title, text]) => (
            <article key={title} className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-stone-950">{title}</h2>
              <p className="mt-4 leading-7 text-stone-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaButton href="/products" variant="secondary">
            商品一覧へ戻る
          </CtaButton>
          <CtaButton href="/free" variant="secondary">
            無料キットを見る
          </CtaButton>
        </div>
      </Section>
    </main>
  );
}
