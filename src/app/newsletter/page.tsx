import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { NewsletterCta } from "@/components/NewsletterCta";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "メルマガ登録",
  description:
    "Kit、Substack、LINEなどへ将来接続するためのメルマガ導線ページです。現時点では未接続です。",
};

const sequence = [
  ["Day 0", "無料キット", "AIノート基本テンプレートと導入ガイドを届ける。"],
  ["Day 1", "AIノートの基本思想", "情報を集めるだけで終わらせない考え方を説明する。"],
  ["Day 3", "活用例", "仕事、発信、商品設計で使う具体例を紹介する。"],
  ["Day 5", "プロンプトカード紹介", "プロンプト集やカード型運用へつなぐ。"],
  ["Day 7", "有料テンプレ案内", "BOOTHテンプレートやnote有料記事を案内する。"],
  ["Day 14", "メンバーシップ・相談案内", "継続実践や個別相談へ進む選択肢を出す。"],
];

export default function NewsletterPage() {
  return (
    <main>
      <PageHero
        eyebrow="Newsletter"
        title="メルマガ登録フォームは未接続です。"
        description="Kit、Substack、LINEなどの登録先はまだ接続していません。今はステップ配信の設計と、将来差し替えるCTAの置き場所を確認できます。"
        primaryCta={{ label: "無料キットを見る", href: "/free" }}
        secondaryCta={{ label: "商品一覧へ", href: "/products" }}
      />
      <Section tone="soft">
        <div className="rounded-[8px] border border-dashed border-stone-300 bg-white p-6 sm:p-8">
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            Connection Status
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950">
            登録サービスはまだ接続していません。
          </h2>
          <p className="mt-4 leading-8 text-stone-600">
            このページは、将来Kit、Substack、LINE公式などへ接続するための構成確認用です。実際の登録フォーム、メール送信、ステップ配信はまだ動きません。
          </p>
        </div>
      </Section>
      <Section>
        <NewsletterCta />
      </Section>
      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Sequence"
            title="ステップ配信の例。"
            description="登録直後から14日後まで、無料から商品・相談へ進む流れを作ります。"
          />
          <div className="grid gap-4">
            {sequence.map(([day, title, text]) => (
              <div key={day} className="grid gap-3 rounded-[8px] bg-white p-5 shadow-sm sm:grid-cols-[90px_1fr]">
                <p className="font-mono text-sm font-bold text-teal-700">{day}</p>
                <div>
                  <h3 className="font-semibold text-stone-950">{title}</h3>
                  <p className="mt-2 leading-7 text-stone-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <CtaButton href="/consulting" variant="secondary">
            導線設計を相談する
          </CtaButton>
        </div>
      </Section>
    </main>
  );
}
