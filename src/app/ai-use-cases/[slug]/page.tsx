import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { CtaButton } from "@/components/CtaButton";
import { ExternalLink } from "@/components/ExternalLink";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getAiUseCaseBySlug, publishedAiUseCases } from "@/data/aiUseCaseRegistry";
import { getContentAssetsByTopicSlug } from "@/data/contentAssets";
import type { ContentAsset, ContentAssetType } from "@/types/content";

const contentAssetTypeLabels: Record<ContentAssetType, string> = {
  note: "note",
  manga: "漫画",
  video: "動画",
  template: "テンプレ",
  kit: "無料キット",
  product: "商品",
  workflow: "ワークフロー",
  prompt: "プロンプト",
};

const statusOrder: Record<ContentAsset["status"], number> = {
  published: 0,
  planned: 1,
  draft: 2,
};

const priorityOrder: Record<ContentAsset["priority"], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function compareContentAsset(a: ContentAsset, b: ContentAsset) {
  const s = statusOrder[a.status] - statusOrder[b.status];
  if (s !== 0) return s;
  const p = priorityOrder[a.priority] - priorityOrder[b.priority];
  if (p !== 0) return p;
  if (a.publishedAt && b.publishedAt) {
    return b.publishedAt.localeCompare(a.publishedAt);
  }
  if (a.publishedAt) return -1;
  if (b.publishedAt) return 1;
  return 0;
}

function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}

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

  const relatedAssets = [...getContentAssetsByTopicSlug(slug)].sort(
    compareContentAsset,
  );

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

      {relatedAssets.length > 0 && (
        <Section tone="soft">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
              Related
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              このテーマに紐づくコンテンツ。
            </h2>
            <p className="mt-4 leading-8 text-stone-600">
              note・漫画・動画・テンプレート・ワークフロー・プロンプトを横断します。
              公開済みのものだけリンク化し、準備中・下書きは「準備中」として非リンク表示します。
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedAssets.map((asset) => {
              const isPublished = asset.status === "published";
              const showAsLink = isPublished && Boolean(asset.url);
              const external =
                showAsLink && asset.url ? isExternalUrl(asset.url) : false;
              return (
                <article
                  key={asset.id}
                  className="flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{contentAssetTypeLabels[asset.type]}</Badge>
                      <Badge tone={isPublished ? "dark" : "stone"}>
                        {isPublished
                          ? "公開済み"
                          : asset.status === "planned"
                            ? "準備中"
                            : "下書き"}
                      </Badge>
                    </div>
                    {asset.publishedAt ? (
                      <time
                        className="mt-4 block text-sm text-stone-500"
                        dateTime={asset.publishedAt}
                      >
                        {new Intl.DateTimeFormat("ja-JP", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(new Date(asset.publishedAt))}
                      </time>
                    ) : null}
                    <h3 className="mt-3 text-xl font-semibold leading-8 text-stone-950">
                      {asset.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {asset.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {asset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold text-teal-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 text-sm font-bold">
                    {showAsLink && asset.url ? (
                      external ? (
                        <ExternalLink
                          href={asset.url}
                          source={asset.source}
                          medium={`use_case_related_${asset.type}`}
                          className="text-teal-700 hover:text-teal-900"
                        >
                          公開コンテンツを開く
                        </ExternalLink>
                      ) : (
                        <Link
                          href={asset.url}
                          className="text-teal-700 hover:text-teal-900"
                        >
                          サイト内ページへ
                        </Link>
                      )
                    ) : (
                      <span
                        className="rounded-[8px] bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-500"
                        aria-label="準備中のコンテンツです"
                      >
                        準備中(リンクなし)
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>
      )}

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
