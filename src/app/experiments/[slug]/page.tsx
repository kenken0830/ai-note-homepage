import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import {
  getExperimentBySlug,
  publishedExperiments,
} from "@/data/experiments";
import type { ExperimentAgent } from "@/types/content";

const agentLabels: Record<ExperimentAgent, string> = {
  codex: "Codex(GPT)",
  "claude-sonnet": "Claude Sonnet",
  "claude-opus": "Claude Opus",
  "gpt-5": "GPT-5",
  "gpt-thinking": "GPT thinking",
  gemini: "Gemini",
  human: "筆者",
};

const agentTones: Record<ExperimentAgent, string> = {
  codex: "bg-emerald-50 text-emerald-800 border-emerald-200",
  "claude-sonnet": "bg-orange-50 text-orange-800 border-orange-200",
  "claude-opus": "bg-amber-50 text-amber-800 border-amber-200",
  "gpt-5": "bg-emerald-50 text-emerald-800 border-emerald-200",
  "gpt-thinking": "bg-teal-50 text-teal-800 border-teal-200",
  gemini: "bg-blue-50 text-blue-800 border-blue-200",
  human: "bg-stone-50 text-stone-800 border-stone-200",
};

type ExperimentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedExperiments.map((exp) => ({ slug: exp.slug }));
}

export async function generateMetadata({
  params,
}: ExperimentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperimentBySlug(slug);
  if (!exp) return {};
  return {
    title: exp.title,
    description: exp.description,
  };
}

export default async function ExperimentDetailPage({
  params,
}: ExperimentPageProps) {
  const { slug } = await params;
  const exp = getExperimentBySlug(slug);
  if (!exp) notFound();

  return (
    <main>
      <PageHero
        eyebrow="Experiment"
        title={exp.title}
        description={exp.description}
        primaryCta={{ label: "実験データを見る", href: "#data" }}
        secondaryCta={{ label: "実験一覧へ", href: "/experiments" }}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[8px] bg-stone-100 p-5">
            <p className="text-sm font-bold text-stone-500">実施日</p>
            <p className="mt-2 text-xl font-semibold text-stone-950">
              {new Intl.DateTimeFormat("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(exp.conductedAt))}
            </p>
          </div>
          <div className="rounded-[8px] bg-stone-100 p-5">
            <p className="text-sm font-bold text-stone-500">試行回数</p>
            <p className="mt-2 text-xl font-semibold text-stone-950">
              各 {exp.trialCount} 回 × {exp.subjects.length} 対象
            </p>
          </div>
          <div className="rounded-[8px] bg-stone-100 p-5">
            <p className="text-sm font-bold text-stone-500">タグ</p>
            <p className="mt-2 text-sm font-bold leading-7 text-teal-700">
              {exp.tags.map((t) => `#${t}`).join(" ")}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
              Hypothesis
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              仮説
            </h2>
            <p className="mt-4 leading-8 text-stone-600">{exp.hypothesis}</p>
          </div>
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
              Method
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              方法
            </h2>
            <p className="mt-4 leading-8 text-stone-600">{exp.method}</p>
            <ul className="mt-4 grid gap-2 text-sm text-stone-600">
              {exp.subjects.map((s) => (
                <li key={s} className="rounded-[8px] bg-stone-100 px-4 py-2">
                  対象: <span className="font-bold">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="data">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            Data
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950">
            測定値・データ。
          </h2>
          <p className="mt-4 leading-7 text-stone-600">
            実験で実測したデータです。値は再現可能で、各試行のログから集計しています。
          </p>
        </div>
        <div className="overflow-x-auto rounded-[8px] border border-stone-200">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-stone-500">
                  項目
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-stone-500">
                  値
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-stone-500">
                  単位
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {exp.dataPoints.map((dp, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 text-sm text-stone-900">
                    {dp.label}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-stone-950">
                    {dp.value}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-500">
                    {dp.unit ?? ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {exp.failureCases.length > 0 ? (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-stone-950">
              失敗ケース
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {exp.failureCases.map((fc, idx) => (
                <div
                  key={idx}
                  className="rounded-[8px] border border-rose-200 bg-rose-50 p-5"
                >
                  <p className="text-sm font-bold text-rose-900">
                    {fc.description}
                    {fc.occurrences !== undefined ? (
                      <span className="ml-2 rounded bg-rose-100 px-2 py-0.5 text-xs">
                        {fc.occurrences} 件
                      </span>
                    ) : null}
                  </p>
                  {fc.example ? (
                    <p className="mt-2 rounded-[8px] bg-white p-3 font-mono text-xs leading-6 text-stone-700">
                      {fc.example}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Section>

      <Section tone="soft">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            Multi-agent considerations
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950">
            複数エージェントによる考察。
          </h2>
          <p className="mt-4 leading-7 text-stone-600">
            異なる LLM に独立に考察させ、視点ごとの差分を提示します。
            最終的な「統合考察」は、複数エージェントの合意点だけを残しています。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {exp.agentConsiderations.map((ac, idx) => (
            <article
              key={idx}
              className={`rounded-[8px] border p-5 shadow-sm ${agentTones[ac.agent]}`}
            >
              <p className="text-xs font-bold uppercase tracking-wider">
                {agentLabels[ac.agent]}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{ac.perspective}</h3>
              <p className="mt-3 text-sm leading-7">{ac.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[8px] bg-white p-8 shadow-sm">
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            統合考察
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-stone-950">
            複数エージェントが合意した点。
          </h3>
          <p className="mt-4 leading-8 text-stone-700">
            {exp.integratedConsideration}
          </p>
        </div>
      </Section>

      {exp.nextSteps.length > 0 ? (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
                Next steps
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-stone-950">
                次に試すこと。
              </h2>
              <p className="mt-4 leading-8 text-stone-600">
                この実験を踏まえて、来週以降に試したい仮説です。
              </p>
            </div>
            <ul className="grid gap-3">
              {exp.nextSteps.map((step) => (
                <li
                  key={step}
                  className="rounded-[8px] border border-stone-200 bg-white p-5 leading-7 text-stone-700 shadow-sm"
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {exp.reproductionSteps.length > 0 ? (
        <Section tone="soft">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
                Reproduction
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-stone-950">
                再現手順。
              </h2>
              <p className="mt-4 leading-8 text-stone-600">
                同じ条件であなたが手元で再現できる手順です。データに納得できなければ、ぜひ自分で試してみてください。
              </p>
            </div>
            <ol className="grid gap-3">
              {exp.reproductionSteps.map((step, idx) => (
                <li
                  key={step}
                  className="rounded-[8px] bg-white p-5 leading-7 text-stone-700 shadow-sm"
                >
                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">
              関連ページ。
            </h2>
            <p className="mt-4 leading-8 text-stone-600">
              この実験は再現可能な手順としてホームページのユースケース集にも紐づいています。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {exp.relatedUseCaseSlug ? (
              <CtaButton
                href={`/ai-use-cases/${exp.relatedUseCaseSlug}`}
                variant="secondary"
              >
                関連 AI ユースケースへ
              </CtaButton>
            ) : null}
            <CtaButton href="/experiments" variant="secondary">
              他の実験を見る
            </CtaButton>
            <CtaButton href="/library" variant="secondary">
              note・漫画・動画を横断
            </CtaButton>
            <CtaButton href="/about" variant="secondary">
              運営者と方針について
            </CtaButton>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            Disclaimer
          </p>
          <p className="mt-3 leading-7 text-stone-600">
            この実験はマルチエージェントが合意した範囲でのみ結論を提示しています。
            個別の意見・批判視点はそれぞれのエージェントブロックに残しているので、
            読者が自分で判断できるように開示しています。
            実験設定は GitHub の
            <Link
              href="https://github.com/kenken0830/ai-note-homepage"
              className="mx-1 font-bold text-teal-700 hover:text-teal-900"
            >
              リポジトリ
            </Link>
            で公開しています。
          </p>
        </div>
      </Section>
    </main>
  );
}
