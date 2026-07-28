import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { publishedAiUseCases } from "@/data/aiUseCaseRegistry";

export const metadata: Metadata = {
  title: "仕事で使うAIの実践ガイド",
  description:
    "会議メモ、メール返信、週報など、仕事で使うAIの手順・プロンプト・確認ポイントを、やりたいことから探せます。",
  alternates: {
    canonical: "/",
  },
};

const entranceCards = [
  {
    title: "会議メモを議事録にする",
    description: "決定事項、担当者、期限、未決事項まで整理する手順です。",
    href: "/ai-use-cases/meeting-notes-to-minutes",
    slug: "meeting-notes-to-minutes",
  },
  {
    title: "メール返信を安全に下書きする",
    description: "要件と未確認事項を分け、短い返信案を作ります。",
    href: "/ai-use-cases/write-email-reply",
    slug: "write-email-reply",
  },
  {
    title: "週報を短時間でまとめる",
    description: "成果、課題、次の予定、相談事項を抜けなく整理します。",
    href: "/ai-use-cases/make-weekly-report",
    slug: "make-weekly-report",
  },
];

const recommendedSlugs = [
  "meeting-notes-to-minutes",
  "write-email-reply",
  "make-weekly-report",
  "make-prompt-template",
  "make-checklist",
];

const recommendedGuides = recommendedSlugs
  .map((slug) => publishedAiUseCases.find((item) => item.slug === slug))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

export default function Home() {
  return (
    <main>
      <section className="border-b border-stone-200 bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
            Practical AI for work
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.05] text-stone-950 sm:text-6xl lg:text-7xl">
            仕事で使うAIを、やりたいことから探す。
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-stone-600">
            会議メモ、メール返信、週報、情報整理。AIに何を頼み、どこを人が確認するかを、手順・プロンプト・実例で紹介します。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaButton
              href="/ai-use-cases"
              eventName="article_cta_click"
              trackingId="home_hero"
            >
              AIでできることを見る
            </CtaButton>
            <CtaButton
              href="/free"
              variant="secondary"
              eventName="free_kit_click"
              trackingId="home_hero"
            >
              無料スターターキット
            </CtaButton>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Start with a problem"
          title="いま減らしたい作業から選ぶ。"
          description="ツール名ではなく、今日の仕事に近い入口から始められます。"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {entranceCards.map((item) => (
            <article
              key={item.slug}
              className="flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div>
                <h2 className="text-2xl font-semibold text-stone-950">{item.title}</h2>
                <p className="mt-4 leading-8 text-stone-600">{item.description}</p>
              </div>
              <CtaButton
                href={item.href}
                variant="secondary"
                className="mt-6"
                eventName="article_cta_click"
                trackingId="home_problem_entrance"
                contentSlug={item.slug}
              >
                手順を見る
              </CtaButton>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Recommended"
            title="最初に読む5本。"
            description="仕事で繰り返し発生しやすい作業から、公開中の実践ガイドを5本に絞りました。"
          />
          <CtaButton href="/ai-use-cases" variant="secondary">
            公開中の17件を見る
          </CtaButton>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {recommendedGuides.map((item) => (
            <article
              key={item.slug}
              className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-bold text-teal-700">
                {item.timeToTry}・{item.difficulty === "beginner" ? "はじめて" : "少し応用"}
              </p>
              <h2 className="mt-3 text-xl font-semibold leading-8 text-stone-950">
                {item.title}
              </h2>
              <p className="mt-3 leading-7 text-stone-600">{item.description}</p>
              <CtaButton
                href={`/ai-use-cases/${item.slug}`}
                variant="secondary"
                className="mt-5"
                eventName="article_cta_click"
                trackingId="home_recommended"
                contentSlug={item.slug}
              >
                手順とプロンプトを見る
              </CtaButton>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 rounded-[8px] border border-teal-200 bg-teal-50 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
              Free starter kit
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              AIノートを1週間だけ試す。
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-stone-700">
              基本テンプレート、コピペ用プロンプト10個、7日間ガイドをサイト内で無料公開しています。登録は不要です。
            </p>
          </div>
          <CtaButton
            href="/free"
            eventName="free_kit_click"
            trackingId="home_free_kit"
          >
            無料キットを使う
          </CtaButton>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
              Evidence reviews
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              使って確かめたレビューだけを公開する。
            </h2>
            <p className="mt-4 leading-8 text-stone-600">
              入力、出力、誤り、修正量、向く場面を記録し、証拠と人の確認が揃うまでツールレビューや広告リンクは公開しません。
            </p>
            <p className="mt-5 rounded-[8px] bg-white px-4 py-3 text-sm font-bold text-stone-600">
              現在、公開中のツールレビューとアフィリエイトリンクはありません。
            </p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
              Editorial policy
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              手順・検証・広告を分けて伝える。
            </h2>
            <ul className="mt-5 grid gap-3 text-stone-700">
              <li>事実、実測結果、仮説を区別します。</li>
              <li>広告を掲載する場合は、ページ上部とCTA付近で明示します。</li>
              <li>クリック数と広告主が確認した成約数を区別します。</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/about" variant="secondary">
                運営・検証方針
              </CtaButton>
              <CtaButton href="/legal" variant="secondary">
                法務・ポリシー
              </CtaButton>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
