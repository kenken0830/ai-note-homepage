import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { promptCategories } from "@/data/prompts";

export const metadata: Metadata = {
  title: "AIノート用プロンプト集",
  description:
    "会議メモ、読書メモ、学習、note記事化、振り返り、企画、商品化に使えるAIノート用サンプルプロンプトを整理します。",
};

export default function PromptsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Prompts"
        title="AIノートを次の行動に変えるプロンプト集。"
        description="無料スターターキットのプロンプト10個と矛盾しないよう、用途別に最初の1〜2個だけを公開しています。"
        primaryCta={{ label: "無料キットの10個を見る", href: "/free-starter-kit/prompt-10-pack.md" }}
        secondaryCta={{ label: "無料キットへ", href: "/free" }}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Prompt Library"
            title="用途別に選ぶ。"
            description="プロンプトは長く増やしすぎず、まずは会議、読書、学習、記事化、振り返り、企画、商品化の入口を用意します。"
          />
          <div className="grid gap-6">
            {promptCategories.map((category) => (
              <section
                key={category.id}
                className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-stone-950">
                  {category.name}
                </h2>
                <p className="mt-3 leading-7 text-stone-600">{category.description}</p>
                <div className="mt-6 grid gap-4">
                  {category.examples.map((example) => (
                    <article key={example.id} className="rounded-[8px] bg-stone-50 p-5">
                      <h3 className="text-lg font-semibold text-stone-950">
                        {example.title}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-teal-700">
                        {example.useCase}
                      </p>
                      <p className="mt-4 rounded-[8px] border border-stone-200 bg-white p-4 font-mono text-sm leading-7 text-stone-700">
                        {example.prompt}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">
              プロンプトだけでなく、使う順番も決める。
            </h2>
            <p className="mt-3 max-w-2xl leading-8 text-stone-600">
              会議、読書、毎日note、商品化までの流れはワークフローに分けています。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/workflows">ワークフローへ</CtaButton>
            <CtaButton href="/guides" variant="secondary">
              ガイドへ戻る
            </CtaButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
