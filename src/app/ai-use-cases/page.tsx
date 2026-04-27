import Link from "next/link";
import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { aiUseCaseCategories, aiUseCases } from "@/data/aiUseCases";

export const metadata: Metadata = {
  title: "AIでできること",
  description:
    "書く、調べる、整える、学ぶ、考える、作る、伝える、自動化する。やりたいこと別にAI活用の手順、プロンプト、テンプレートを探せる実践辞典です。",
};

const difficultyLabel = {
  beginner: "はじめて",
  intermediate: "少し応用",
};

export default function AiUseCasesPage() {
  return (
    <main>
      <PageHero
        eyebrow="AI Use Cases"
        title="やりたいことから探す、AI活用の実践辞典。"
        description="会議メモ、読書、note記事、調査、企画、学習、日々の整理。やりたいことを選ぶだけで、AIで進める手順・プロンプト・テンプレートが見つかります。"
        primaryCta={{ label: "公開中の手順を見る", href: "#published" }}
        secondaryCta={{ label: "無料キットへ", href: "/free" }}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Categories"
            title="まず、やりたいことを選ぶ。"
            description="AIニュースやツール名からではなく、仕事・学習・発信・生活で進めたい作業から探せる入口です。"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {aiUseCaseCategories.map((category) => {
              const count = aiUseCases.filter((item) => item.category === category).length;

              return (
                <a
                  key={category}
                  href={`#${category}`}
                  className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm transition hover:border-teal-400 hover:text-teal-800"
                >
                  <p className="text-2xl font-semibold text-stone-950">{category}</p>
                  <p className="mt-2 text-sm font-semibold text-stone-500">
                    {count}件のユースケース
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </Section>

      <Section id="published" tone="soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Dictionary"
            title="ユースケース一覧。"
            description="公開中のものは詳細ページで手順まで読めます。準備中のものは、今後noteの反応を見ながら完成版へ昇格します。"
          />
          <CtaButton href="/updates" variant="secondary">
            更新情報を見る
          </CtaButton>
        </div>
        <div className="mt-12 grid gap-12">
          {aiUseCaseCategories.map((category) => {
            const categoryItems = aiUseCases.filter((item) => item.category === category);

            return (
              <section key={category} id={category} className="scroll-mt-28">
                <h2 className="text-3xl font-semibold text-stone-950">{category}</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {categoryItems.map((item) => (
                    <article
                      key={item.id}
                      className="flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
                    >
                      <div>
                        <div className="flex flex-wrap gap-2 text-xs font-bold">
                          <span className="rounded-[8px] bg-teal-50 px-3 py-2 text-teal-700">
                            {difficultyLabel[item.difficulty]}
                          </span>
                          <span className="rounded-[8px] bg-stone-100 px-3 py-2 text-stone-600">
                            {item.timeToTry}
                          </span>
                          <span className="rounded-[8px] bg-stone-100 px-3 py-2 text-stone-600">
                            {item.status === "published" ? "公開中" : "詳細準備中"}
                          </span>
                        </div>
                        <h3 className="mt-5 text-xl font-semibold leading-8 text-stone-950">
                          {item.title}
                        </h3>
                        <p className="mt-3 leading-7 text-stone-600">{item.description}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-xs font-bold text-teal-700">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6">
                        {item.status === "published" ? (
                          <Link
                            href={`/ai-use-cases/${item.slug}`}
                            className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-stone-300 px-4 py-2 text-sm font-bold text-stone-950 transition hover:border-teal-500 hover:text-teal-800"
                          >
                            手順を見る
                          </Link>
                        ) : (
                          <span className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-stone-100 px-4 py-2 text-sm font-bold text-stone-500">
                            詳細準備中
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">
              AIノートは、この辞典を育てるための入口です。
            </h2>
            <p className="mt-3 max-w-2xl leading-8 text-stone-600">
              毎日noteで試した内容を、手順・プロンプト・確認ポイントまで整理して、再現できる完成版として追加していきます。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/guides">考え方を見る</CtaButton>
            <CtaButton href="/prompts" variant="secondary">
              プロンプトを見る
            </CtaButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
