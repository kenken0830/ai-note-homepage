import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { workflows } from "@/data/workflows";

export const metadata: Metadata = {
  title: "AIノート活用ワークフロー",
  description:
    "会議メモ、読書メモ、毎日note、アイデアメモ、週次レビューを成果物へ変えるAIノート活用ワークフローを整理します。",
};

export default function WorkflowsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Workflows"
        title="AIノートを、成果物へ変える流れ。"
        description="メモを残すだけで終わらせず、議事録、学習ノート、ホームページ記事、商品案、改善計画へ変える手順をまとめます。"
        primaryCta={{ label: "プロンプトを見る", href: "/prompts" }}
        secondaryCta={{ label: "無料キットへ", href: "/free" }}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Workflow Library"
            title="5つの基本ワークフロー。"
            description="毎日noteの投稿素材も、ホームページの長期資産も、同じAIノートから作ります。"
          />
          <div className="grid gap-5">
            {workflows.map((workflow) => (
              <article
                key={workflow.id}
                className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold leading-9 text-stone-950">
                  {workflow.title}
                </h2>
                <p className="mt-3 leading-8 text-stone-600">{workflow.description}</p>
                <ol className="mt-6 grid gap-3">
                  {workflow.steps.map((step, index) => (
                    <li key={step} className="grid gap-3 rounded-[8px] bg-stone-50 p-4 sm:grid-cols-[36px_1fr]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="leading-7 text-stone-700">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 rounded-[8px] bg-stone-100 px-4 py-3 text-sm font-bold text-stone-700">
                  出力: {workflow.output}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">
              毎日noteで試し、反応が良い流れを育てる。
            </h2>
            <p className="mt-3 max-w-2xl leading-8 text-stone-600">
              ワークフローは固定せず、noteで試した内容を週1で見直し、/updatesに改善として残します。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/updates">更新情報へ</CtaButton>
            <CtaButton href="/guides" variant="secondary">
              完全ガイドへ
            </CtaButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
