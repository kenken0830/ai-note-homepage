import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { NewsletterCta } from "@/components/NewsletterCta";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "メルマガ登録",
  description:
    "無料キットから有料テンプレート、メンバーシップ、相談までを案内するステップ配信の登録導線ページです。",
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
        title="無料キットのあとに、自然に学び続ける導線。"
        description="Kit、Substack、LINEなどはまだ未接続です。公開前に差し替える前提で、登録CTAとステップ配信の設計を先に置きます。"
        primaryCta={{ label: "無料キットを見る", href: "/free" }}
        secondaryCta={{ label: "商品一覧へ", href: "/products" }}
      />
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
