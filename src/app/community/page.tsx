import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "コミュニティ",
  description:
    "noteメンバーシップ、Discord、LINE公式を将来つなぐAI Compass Journalのコミュニティ構想ページです。",
};

const communityRoutes = [
  ["noteメンバーシップ", "有料記事、限定ログ、月次テーマを届ける場所。"],
  ["Discord", "質問、作業報告、テンプレ改善を共有する場所。"],
  ["LINE公式", "更新通知、無料キット案内、相談導線を届ける場所。"],
];

export default function CommunityPage() {
  return (
    <main>
      <PageHero
        eyebrow="Community"
        title="AIノートを継続実践する場所を準備中です。"
        description="現時点では準備中ですが、noteメンバーシップ、Discord、LINE公式を役割別に接続できる構成にしています。"
        primaryCta={{ label: "メルマガで待つ", href: "/newsletter" }}
        secondaryCta={{ label: "相談を見る", href: "/consulting" }}
      />
      <Section>
        <SectionHeading
          eyebrow="Future Routes"
          title="準備している3つの入口。"
          description="販売開始前でもページ構成は完成させ、公開後にURLを差し替えます。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {communityRoutes.map(([title, text]) => (
            <article key={title} className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-stone-950">{title}</h2>
              <p className="mt-4 leading-7 text-stone-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <CtaButton href="/free">無料キットから始める</CtaButton>
        </div>
      </Section>
    </main>
  );
}
