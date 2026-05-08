import type { Metadata } from "next";
import Link from "next/link";
import { CtaButton } from "@/components/CtaButton";
import { ExternalLink } from "@/components/ExternalLink";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "運営者について",
  description:
    "AI Compass Journal を運営している人と、このサイトの方針・安全境界を紹介します。",
};

const principles = [
  {
    title: "noteは実験ログ、HPは完成版",
    body: "noteは毎日の実験・気づき・失敗を記録する場所、ホームページは再現できる手順・プロンプト・テンプレートを保存版として整理する場所として住み分けています。",
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
    body: "BOOTH・メルマガ・コミュニティ・有料商品が準備中のあいだは、本物の販売ページに見える表現を避けます。準備中は明示します。",
  },
  {
    title: "自動化は人間レビューを残す",
    body: "AIによる記事生成・自動公開・自動取り込みを実装していますが、`main` ブランチへの反映は必ず人間レビューを経たPR経由でのみ行います。",
  },
  {
    title: "安全境界をコードと運用の両方で守る",
    body: "API キー・認証情報・個人情報をリポジトリに含めない、note投稿・公開・下書き編集をホームページから実行しない、といった境界をスクリプトと workflow の両方で機構的に検出・拒否します。",
  },
];

const updatesByPlatform = [
  {
    name: "note",
    role: "毎日の実験ログ・有料記事・漫画",
    href: siteConfig.links.note,
    cadence: "毎日",
  },
  {
    name: "GitHub",
    role: "ホームページのソースコード(MIT 相当の OSS)",
    href: siteConfig.links.github,
    cadence: "随時",
  },
];

const focusAreas = [
  "AIで「やりたいこと」を、再現できる手順とプロンプトに変換する",
  "noteの実験ログを、HPの保存版に育てる運用を続ける",
  "漫画・動画・テンプレ・無料キット・商品をテーマで束ねるホームベースを作る",
  "完全自動化と人間レビューを両立させる仕組みを公開し続ける",
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
            毎日 note を書きながら、HP に保存版を積み上げる。
          </h2>
          <p className="mt-4 leading-8 text-stone-600">
            運営者は毎日 note で「実験ログ」「有料の判断基準」「漫画」を発信しながら、同じテーマを 5
            回以上書いた段階でホームページの完成版手順へ昇格させる運用を続けています。
            HP は note の保管庫ではなく、note を踏まえた再現できる手順とプロンプトの集まりとして育てます。
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
                <p className="mt-3 text-xs font-bold text-teal-700">
                  更新頻度: {p.cadence}
                </p>
              </div>
              <div className="mt-6 text-sm font-bold">
                {p.href && p.href !== "#" ? (
                  <ExternalLink
                    href={p.href}
                    source={p.name.toLowerCase()}
                    medium="about_operator_links"
                    className="text-teal-700 hover:text-teal-900"
                  >
                    {p.name} を見る
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
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            Principles
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950">
            運営方針と安全境界。
          </h2>
          <p className="mt-4 leading-8 text-stone-600">
            このサイトでは「自動化しすぎないこと」と「読者を欺かないこと」を両立させるため、
            6 つの方針をコードと運用の両方で守ります。
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
              Open source
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950">
              ソースコードと運用 docs を公開しています。
            </h2>
            <p className="mt-4 leading-8 text-stone-600">
              ホームページの実装・自動化スクリプト・運用ドキュメントは GitHub で公開しています。
              気になる仕組みがあれば、リポジトリの `docs/` を読むのが早いです。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <CtaButton href={siteConfig.links.github} variant="secondary">
              GitHub リポジトリを見る
            </CtaButton>
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
            問い合わせ・相談
          </h2>
          <p className="mt-4 leading-7 text-stone-600">
            個別の AI 活用相談・法人導入支援については
            <Link
              href="/consulting"
              className="mx-1 font-bold text-teal-700 hover:text-teal-900"
            >
              /consulting
            </Link>
            のページを参照してください。サイトに関する技術的な指摘や提案は GitHub リポジトリの Issue / PR からも受け付けています。
          </p>
        </div>
      </Section>
    </main>
  );
}
