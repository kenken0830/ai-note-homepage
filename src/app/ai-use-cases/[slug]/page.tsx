import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getAiUseCaseBySlug, publishedAiUseCases } from "@/data/aiUseCaseRegistry";

type AiUseCaseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publishedAiUseCases.map((useCase) => ({
    slug: useCase.slug,
  }));
}

export async function generateMetadata({
  params,
}: AiUseCaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getAiUseCaseBySlug(slug);

  if (!useCase) {
    return {};
  }

  return {
    title: useCase.title,
    description: useCase.description,
  };
}

export default async function AiUseCaseDetailPage({
  params,
}: AiUseCaseDetailPageProps) {
  const { slug } = await params;
  const useCase = getAiUseCaseBySlug(slug);

  if (!useCase) {
    notFound();
  }

  return (
    <main>
      <PageHero
        eyebrow={useCase.category}
        title={useCase.title}
        description={useCase.description}
        primaryCta={{ label: "プロンプトを確認する", href: "#prompt" }}
        secondaryCta={{ label: "一覧へ戻る", href: "/ai-use-cases" }}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[8px] bg-stone-100 p-5">
            <p className="text-sm font-bold text-stone-500">難易度</p>
            <p className="mt-2 text-xl font-semibold text-stone-950">
              {useCase.difficulty === "beginner" ? "はじめて" : "少し応用"}
            </p>
          </div>
          <div className="rounded-[8px] bg-stone-100 p-5">
            <p className="text-sm font-bold text-stone-500">試す時間</p>
            <p className="mt-2 text-xl font-semibold text-stone-950">{useCase.timeToTry}</p>
          </div>
          <div className="rounded-[8px] bg-stone-100 p-5">
            <p className="text-sm font-bold text-stone-500">タグ</p>
            <p className="mt-2 text-sm font-bold leading-7 text-teal-700">
              {useCase.tags.map((tag) => `#${tag}`).join(" ")}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
              How to Use
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              何ができるか、どんな場面で使うか。
            </h2>
            <p className="mt-4 leading-8 text-stone-600">{useCase.description}</p>
          </div>
          <ol className="grid gap-4">
            {useCase.steps.map((step, index) => (
              <li key={step} className="grid gap-4 rounded-[8px] bg-white p-5 shadow-sm sm:grid-cols-[44px_1fr]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="pt-2 leading-7 text-stone-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {(useCase.target || useCase.scene || useCase.preparation?.length) && (
        <Section>
          <div className="grid gap-6 lg:grid-cols-3">
            {useCase.target && (
              <div className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-950">どんな人向けか</h2>
                <p className="mt-3 leading-7 text-stone-600">{useCase.target}</p>
              </div>
            )}
            {useCase.scene && (
              <div className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-950">使う場面</h2>
                <p className="mt-3 leading-7 text-stone-600">{useCase.scene}</p>
              </div>
            )}
            {useCase.preparation?.length ? (
              <div className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-950">
                  AIに渡す前に準備するもの
                </h2>
                <ul className="mt-3 grid gap-2">
                  {useCase.preparation.map((item) => (
                    <li key={item} className="leading-7 text-stone-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      )}

      <Section id="prompt">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
              Prompt
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              コピペ用プロンプト。
            </h2>
            <p className="mt-4 leading-8 text-stone-600">
              そのまま使い、素材や条件だけ差し替えてください。事実確認と最終判断は自分で行います。
            </p>
          </div>
          <div className="rounded-[8px] border border-stone-200 bg-stone-50 p-5 font-mono text-sm leading-8 text-stone-800">
            {useCase.prompt}
          </div>
        </div>
      </Section>

      {(useCase.inputExample || useCase.outputExample || useCase.improvementPrompt) && (
        <Section tone="soft">
          <div className="grid gap-6 lg:grid-cols-3">
            {useCase.inputExample && (
              <div className="rounded-[8px] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-950">入力例</h2>
                <p className="mt-4 rounded-[8px] bg-stone-100 p-4 font-mono text-sm leading-7 text-stone-700">
                  {useCase.inputExample}
                </p>
              </div>
            )}
            {useCase.outputExample && (
              <div className="rounded-[8px] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-950">出力例</h2>
                <p className="mt-4 rounded-[8px] bg-stone-100 p-4 font-mono text-sm leading-7 text-stone-700">
                  {useCase.outputExample}
                </p>
              </div>
            )}
            {useCase.improvementPrompt && (
              <div className="rounded-[8px] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-950">
                  改善プロンプト
                </h2>
                <p className="mt-4 rounded-[8px] bg-stone-100 p-4 font-mono text-sm leading-7 text-stone-700">
                  {useCase.improvementPrompt}
                </p>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section tone="soft">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[8px] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-stone-950">
              出力を確認するポイント
            </h2>
            <ul className="mt-5 grid gap-3">
              {useCase.checkPoints.map((point) => (
                <li key={point} className="rounded-[8px] bg-stone-100 px-4 py-3 leading-7 text-stone-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[8px] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-stone-950">よくある失敗</h2>
            <ul className="mt-5 grid gap-3">
              {useCase.commonMistakes.map((mistake) => (
                <li key={mistake} className="rounded-[8px] bg-stone-100 px-4 py-3 leading-7 text-stone-700">
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">
              noteで書くなら、実験ログにする。
            </h2>
            <p className="mt-4 leading-8 text-stone-600">{useCase.noteAngle}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {useCase.relatedPages.map((page) => (
              <CtaButton key={page.href} href={page.href} variant="secondary">
                {page.label}
              </CtaButton>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
