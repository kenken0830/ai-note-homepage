import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { publishedExperiments } from "@/data/experiments";

export const metadata: Metadata = {
  title: "独自実験",
  description:
    "Claude / GPT / Gemini を実際に走らせて、再現可能なデータと複数エージェント合意の考察を集める検証ログ。",
};

export default function ExperimentsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Experiments"
        title="再現可能なデータで AI を検証する。"
        description="「やってみた」ではなく「N 回試した結果はこう」。Codex / Claude Code / Gemini をマルチエージェント合意で動かし、検証可能な実験ログを蓄積します。"
        primaryCta={{ label: "AIでできることへ戻る", href: "/ai-use-cases" }}
        secondaryCta={{ label: "更新情報を見る", href: "/updates" }}
      />

      <Section>
        <div className="mb-8 max-w-3xl">
          <Badge tone="stone">方針</Badge>
          <h2 className="mt-4 text-3xl font-bold text-stone-950">
            数字とコードで検証する、マルチエージェント合意の考察。
          </h2>
          <p className="mt-4 leading-7 text-stone-600">
            実験ごとに Claude(仮説検証視点)/ Codex(批判視点)/ 別エージェント(統合視点)を走らせ、
            複数の AI が合意した点だけを最終考察として残します。
            「ありふれた一般論」を排除し、データドリブンに次の判断を提示します。
          </p>
        </div>

        {publishedExperiments.length === 0 ? (
          <div className="rounded-[8px] border border-dashed border-stone-300 bg-white p-8 text-sm leading-7 text-stone-600">
            <p className="font-bold text-stone-950">最初の実験を準備中です。</p>
            <p className="mt-3">
              GitHub Actions の `run-experiment` ワークフローが起動すると、
              ここに最新の検証データが追加されます。実験設定は
              <code className="mx-1 rounded bg-stone-100 px-1.5 py-0.5 text-xs">
                scripts/experiments/[id].yml
              </code>
              に書きます。
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {publishedExperiments.map((exp) => (
              <article
                key={exp.id}
                className="flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="dark">実験</Badge>
                    <Badge tone="stone">{exp.subjects.length}対象比較</Badge>
                  </div>
                  <time
                    className="mt-4 block text-sm text-stone-500"
                    dateTime={exp.conductedAt}
                  >
                    {new Intl.DateTimeFormat("ja-JP", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(exp.conductedAt))}
                  </time>
                  <h3 className="mt-3 text-xl font-semibold leading-8 text-stone-950">
                    <Link
                      href={`/experiments/${exp.slug}`}
                      className="hover:text-teal-700"
                    >
                      {exp.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">
                    {exp.description}
                  </p>
                  <div className="mt-4 text-xs font-bold text-stone-500">
                    比較: {exp.subjects.join(" / ")}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
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
                  <Link
                    href={`/experiments/${exp.slug}`}
                    className="text-teal-700 hover:text-teal-900"
                  >
                    実験詳細を読む
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
