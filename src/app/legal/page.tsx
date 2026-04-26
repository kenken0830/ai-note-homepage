import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "法務・ポリシー入口",
  description:
    "特商法、利用規約、プライバシーポリシー、ライセンス方針の準備中ページです。販売開始前に正式版へ差し替えます。",
};

const legalItems = [
  ["特定商取引法に基づく表記", "販売開始前に、販売者情報、価格、支払い方法、返品条件を正式版へ差し替えます。"],
  ["利用規約", "テンプレート、プロンプト、記事、相談サービスの利用条件を正式版へ差し替えます。"],
  ["プライバシーポリシー", "メルマガ、問い合わせ、アクセス解析を導入する前に正式版へ差し替えます。"],
  ["ライセンス方針", "テンプレートやコードサンプルの再配布、商用利用、改変範囲を正式版へ差し替えます。"],
];

export default function LegalPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="販売開始前に正式版へ差し替える法務入口。"
        description="現時点では正式な法務文書ではありません。商品販売、メルマガ、フォーム連携を始める前に正式な文書へ更新してください。"
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
      </Section>
    </main>
  );
}
