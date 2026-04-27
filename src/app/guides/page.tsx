import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { guideSections } from "@/data/guides";

export const metadata: Metadata = {
  title: "AIノート完全ガイド",
  description:
    "AIノートとは何か、普通のメモとの違い、AIに渡しやすいメモの取り方、要約・TODO化・記事化・学習ノート化の流れを整理します。",
};

const noteRoles = [
  ["note", "毎日の実験ログ", "試したこと、失敗、気づき、読者の反応を見るための短い記録を出します。"],
  ["ホームページ", "整理された完全版", "反応が良かった内容を、手順、注意点、無料キット導線つきで体系化します。"],
  ["/updates", "昇格と改善の記録", "noteから昇格したテーマや、無料キット改善を更新情報として残します。"],
];

export default function GuidesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Guides"
        title="AIノート完全ガイド。"
        description="毎日のメモを、AIに渡しやすく、あとで記事・TODO・学習ノート・商品案に変えられる資産へ育てます。"
        primaryCta={{ label: "無料キットを見る", href: "/free" }}
        secondaryCta={{ label: "更新情報を見る", href: "/updates" }}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeading
            eyebrow="Foundations"
            title="AIノートの基本。"
            description="noteで日々試し、ホームページでは長く使える完全版として整理します。"
          />
          <div className="grid gap-5">
            {guideSections.map((section) => (
              <article
                key={section.id}
                className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold leading-9 text-stone-950">
                  {section.title}
                </h2>
                <p className="mt-3 leading-8 text-stone-600">{section.description}</p>
                <ul className="mt-5 grid gap-3">
                  {section.points.map((point) => (
                    <li key={point} className="rounded-[8px] bg-stone-100 px-4 py-3 text-sm font-semibold leading-6 text-stone-700">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Role Design"
            title="noteとホームページの役割分担。"
            description="noteは毎日の実験場所、ホームページは整理された長期資産です。反応が良かった内容だけを昇格させます。"
          />
          <div className="grid gap-4">
            {noteRoles.map(([label, title, description]) => (
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
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">
              最初は無料キットで1週間だけ試す。
            </h2>
            <p className="mt-3 max-w-2xl leading-8 text-stone-600">
              基本テンプレート、プロンプト10個、7日間導入ガイドを使うと、このガイドの内容をすぐに試せます。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/free">無料キットへ</CtaButton>
            <CtaButton href="/workflows" variant="secondary">
              ワークフローを見る
            </CtaButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
