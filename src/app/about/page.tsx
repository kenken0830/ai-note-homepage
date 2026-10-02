import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { ExternalLink } from "@/components/ExternalLink";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "運営者について",
  description:
    "AI Compass Journal を運営している人と、このサイトの方針・安全境界を紹介します。",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "noteは実験ログ、HPは完成版",
    body: "noteは調査や実験・気づき・失敗を記録する場所、ホームページは再現できる手順・プロンプト・テンプレートを保存版として整理する場所として住み分けています。",
  },
  {
    title: "未確認情報を断定しない",
    body: "AIで生成した数値・統計・実績はそのまま掲載しません。出典がない情報は「確認が必要」と明記し、判断は読者に委ねます。",
  },
  {
    title: "note本文を丸ごと転載しない",
    body: "ホームページではnoteの公開URLとタイトル・要約・タグだけを受け取り、有料部分や本文全体の転載は行いません。詳しくはnote側で読んでもらう設計です。",
  },
  {
    title: "外部サービスを稼働中に見せない",
    body: "BOOTH・メルマガ・有料商品が準備中のあいだは、本物の販売ページに見える表現を避けます。準備中は明示します。",
  },
  {
    title: "自動化は人間レビューを残す",
    body: "AIを使った記事作成でも、公開前に人間が内容と根拠を確認し、承認したものだけを反映します。",
  },
  {
    title: "読者の情報と公開範囲を守る",
    body: "認証情報や個人情報を公開内容に含めず、未公開・準備中の情報も利用可能なものとして案内しません。",
  },
];

const updatesByPlatform = [
  {
    name: "note「D × MirAI｜AI一人会社をつくる」",
    role: "調査や実験の記録・有料記事・漫画",
    href: siteConfig.links.note,
  },
];

const focusAreas = [
  "AIで「やりたいこと」を、再現できる手順とプロンプトに変換する",
  "noteの実験ログを、HPの保存版に育てる運用を続ける",
  "漫画・動画・テンプレ・無料キット・商品をテーマで束ねるホームベースを作る",
  "実際に検証した手順と判断基準を、読者が再利用できる形で残す",
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="運営者と方針について。"
        description="AI Compass Journal を運営している人と、このサイトを動かしているコンセプト・安全境界を整理しています。"
        primaryCta={{ label: "AIでできることを見る", href: "/ai-use-cases" }}
        secondaryCta={{ label: "無料キットを試す", href: "/free" }}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
              Mission
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              AIで「やりたいこと」から、最適な手順に辿り着くホームベース。
            </h2>
            <p className="mt-4 leading-8 text-stone-600">
              {siteConfig.ogDescription}
            </p>
          </div>
          <ul className="grid gap-3">
            {focusAreas.map((line) => (
              <li
                key={line}
                className="rounded-[8px] border border-stone-200 bg-white p-5 leading-7 text-stone-700 shadow-sm"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="soft">
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            Operator
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950">
            運営・執筆：{siteConfig.operatorName}
          </h2>
          <p className="mt-4 leading-8 text-stone-600">
            AI Compass Journal は、仕事や発信でAIを使うための手順、プロンプト、確認ポイントをまとめた実践ガイドです。
            noteでは調査や実験の記録を発信し、このサイトでは読者が試し直せる手順を整理しています。
          </p>
          <p className="mt-4 leading-8 text-stone-600">
            手順の説明例と、実際に試した検証結果を区別します。ツールを評価する記事には、
            確認日、利用条件、入力素材、結果、手直しした箇所、検証の限界を記載します。
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {updatesByPlatform.map((p) => (
            <article
              key={p.name}
              className="flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div>
                <h3 className="text-xl font-semibold text-stone-950">{p.name}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{p.role}</p>
              </div>
              <div className="mt-6 text-sm font-bold">
                {p.href && p.href !== "#" ? (
                  <ExternalLink
                    href={p.href}
                    source="note"
                    medium="about_operator_links"
                    className="text-teal-700 hover:text-teal-900"
                  >
                    {"note"} を見る
                  </ExternalLink>
                ) : (
                  <span className="text-xs font-bold text-stone-500">
                    準備中(リンクなし)
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-stone-950">
            記事・権利・プライバシーに関するお問い合わせ
          </h2>
          <p className="mt-4 leading-8 text-stone-600">
            記事の誤り、掲載内容の権利、プライバシーに関するご連絡は、noteの
            「クリエイターへのお問い合わせ」からお送りください。
            対象ページのURLと、確認してほしい箇所をお知らせください。
            個別相談や法人導入支援の窓口ではありません。
          </p>
          <p className="mt-4">
            <a
              href={siteConfig.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-teal-700 underline underline-offset-4 hover:text-teal-900"
            >
              noteのクリエイターへのお問い合わせ（外部ページ）
            </a>
          </p>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            送信先はnoteの外部ページです。パスワード、本人確認書類、決済情報などの機密情報は送らないでください。
          </p>
        </div>
      </Section>

      <Section>
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            Principles
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950">
            運営方針と安全境界。
          </h2>
          <p className="mt-4 leading-8 text-stone-600">
            このサイトでは「自動化しすぎないこと」と「読者を欺かないこと」を両立させるため、
            6 つの方針を公開内容と運営の両方で守ります。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {principles.map((p) => (
            <article
              key={p.title}
              className="flex h-full flex-col rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-stone-950">{p.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
              Explore
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              公開済みの手順と更新情報から探せます。
            </h2>
            <p className="mt-4 leading-8 text-stone-600">
              やりたいこと別の実践手順、公開済みの検証ログ、サイトの更新内容を、
              それぞれの一覧から確認できます。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <CtaButton href="/library" variant="secondary">
              記事ライブラリへ
            </CtaButton>
            <CtaButton href="/ai-use-cases" variant="secondary">
              AIでできること一覧へ
            </CtaButton>
            <CtaButton href="/updates" variant="secondary">
              更新情報を見る
            </CtaButton>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-stone-950">
            セルフサービスで完結する商品設計
          </h2>
          <p className="mt-4 leading-7 text-stone-600">
            現在は個別相談や法人導入支援を受け付けていません。無料キット、有料note、BOOTHの買い切り商品を中心に、手順とテンプレートを自分で使える形に整えています。実際に利用できる商品は、公開済みの配布・販売ページで案内します。
          </p>
        </div>
      </Section>
    </main>
  );
}
