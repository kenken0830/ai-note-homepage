import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { updates } from "@/data/updates";

export const metadata: Metadata = {
  title: "更新情報",
  description:
    "AI Compass Journalの公開状態、無料スターターキット、商品導線、SEO基本設定などの更新情報をまとめます。",
};

export default function UpdatesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Updates"
        title="AI Compass Journalの更新情報。"
        description="外部サービス接続前でも、今このサイトで使えるもの、準備中のもの、改善した導線を静的に記録します。"
        primaryCta={{ label: "無料キットを見る", href: "/free" }}
        secondaryCta={{ label: "商品一覧へ", href: "/products" }}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeading
            eyebrow="Changelog"
            title="公開後の変更履歴。"
            description="日付、カテゴリ、関連ページを分けて管理し、サイトが更新されていることを読者にも運営者にも分かる形にします。"
          />
          <div className="grid gap-5">
            {updates.map((item) => (
              <article
                key={item.id}
                className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="rounded-[8px] bg-stone-100 px-3 py-2 text-sm font-bold text-stone-600">
                    {item.category}
                  </p>
                  <time className="text-sm text-stone-500" dateTime={item.date}>
                    {item.date}
                  </time>
                </div>
                <h2 className="mt-4 text-2xl font-semibold leading-9 text-stone-950">
                  {item.title}
                </h2>
                <p className="mt-3 leading-8 text-stone-600">{item.description}</p>
                <CtaButton href={item.href} variant="secondary" className="mt-6">
                  関連ページを見る
                </CtaButton>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="soft">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">
              次に使うなら、無料キットから。
            </h2>
            <p className="mt-3 max-w-2xl leading-8 text-stone-600">
              更新情報を確認したら、/freeでテンプレートとプロンプトを開き、/productsで準備中の商品予定を確認できます。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/free">無料キットへ</CtaButton>
            <CtaButton href="/products" variant="secondary">
              商品予定を見る
            </CtaButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
