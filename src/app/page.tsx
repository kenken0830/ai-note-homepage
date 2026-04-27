import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { ConsultingCta } from "@/components/ConsultingCta";
import { CtaButton } from "@/components/CtaButton";
import { FunnelMap } from "@/components/FunnelMap";
import { NewsletterCta } from "@/components/NewsletterCta";
import { PlatformCard } from "@/components/PlatformCard";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredArticles } from "@/data/articles";
import { primaryPlatforms } from "@/data/platforms";
import { featuredProducts } from "@/data/products";
import { latestUpdates } from "@/data/updates";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AIノートの本店・導線ハブ",
  description:
    "AIノートを学ぶ、使う、作る、売るために、note、Zenn、Medium、BOOTH、GitHub、X、YouTube、メルマガ、相談を束ねるポータルです。",
};

const liveActions = [
  ["無料スターターキットを読む", "まずは/freeで全体を確認し、必要なMarkdownファイルを開けます。", "/free", "無料キットへ"],
  ["AIノート基本テンプレートを見る", "目的、入力、AIへの依頼、自分の判断を残す基本形です。", "/free-starter-kit/ai-note-basic-template.md", "テンプレートを開く"],
  ["プロンプト10個を見る", "要約、言い換え、チェックリスト化、note見出し案に使えます。", "/free-starter-kit/prompt-10-pack.md", "プロンプトを見る"],
  ["7日間導入ガイドを見る", "Day 1からDay 7まで、AIノートを小さく試す順番です。", "/free-starter-kit/seven-day-guide.md", "導入ガイドを見る"],
  ["商品一覧を見る", "公開中、近日公開、準備中の状態を分けて確認できます。", "/products", "商品一覧へ"],
  ["相談ページを見る", "個人向け、事業者向けの導線設計相談の内容を確認できます。", "/consulting", "相談ページへ"],
];

const launchStatuses = [
  ["無料キット", "公開中", "サイト内のMarkdownファイルとして読めます。"],
  ["BOOTH配布", "準備中", "BOOTH商品ページはまだ接続していません。"],
  ["メルマガ", "未接続", "登録フォームや配信はまだ動きません。"],
  ["有料商品", "準備中", "価格や販売場所は予定として掲載しています。"],
  ["legal", "正式版準備中", "現時点では正式な法務文書ではありません。"],
];

const firstSteps = [
  { label: "/start を読む", href: "/start" },
  { label: "/free で無料キットを使う", href: "/free" },
  { label: "/products で今後の商品予定を見る", href: "/products" },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.18),transparent_34%),linear-gradient(135deg,rgba(15,118,110,0.1),transparent_50%)] lg:block" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold tracking-[0.18em] text-teal-700 uppercase">
              AI note portal
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-stone-950 sm:text-6xl lg:text-7xl">
              AI Compass Journal
            </h1>
            <p className="mt-6 max-w-3xl text-2xl font-medium leading-10 text-stone-900 sm:text-3xl">
              AIノートを、学ぶ・使う・作る・売るための本店。
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              note、Zenn、Medium、BOOTH、GitHub、X、YouTube、メルマガ、コミュニティ、相談を束ね、読者が次に進む導線を迷わない形に整理します。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/free">無料スターターキットを見る</CtaButton>
              <CtaButton href="/products" variant="secondary">
                商品一覧を見る
              </CtaButton>
              <CtaButton href="/start" variant="secondary">
                はじめての方へ
              </CtaButton>
            </div>
          </div>
          <div className="grid gap-4 rounded-[8px] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            {[
              "noteや更新情報から発見",
              "ホームページで全体像を確認",
              "無料キットを使う",
              "更新情報で改善を追う",
              "商品予定を確認する",
              "相談ページを見る",
            ].map((item, index) => (
              <div key={item} className="grid grid-cols-[44px_1fr] items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-teal-700 shadow-sm">
                  {index + 1}
                </span>
                <p className="font-semibold text-stone-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="live" tone="soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Available Now"
            title="今このサイトだけで使えるもの。"
            description="外部サービス未接続でも、無料キット、テンプレート、プロンプト、導入ガイドはこのサイト内で読めます。"
          />
          <CtaButton href="/updates" variant="secondary">
            更新情報を見る
          </CtaButton>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {liveActions.map(([title, description, href, cta]) => (
            <article key={href} className="flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-xl font-semibold leading-8 text-stone-950">{title}</h2>
                <p className="mt-3 leading-7 text-stone-600">{description}</p>
              </div>
              <a
                href={href}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[8px] border border-stone-300 px-4 py-2 text-sm font-bold text-stone-950 transition hover:border-teal-500 hover:text-teal-800"
              >
                {cta}
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading
            eyebrow="Current Status"
            title="現在の公開状態。"
            description="未接続のサービスを稼働中に見せず、今使えるものと準備中のものを分けています。"
          />
          <div className="grid gap-4">
            {launchStatuses.map(([name, status, description]) => (
              <div key={name} className="grid gap-3 rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm sm:grid-cols-[140px_120px_1fr] sm:items-center">
                <p className="font-semibold text-stone-950">{name}</p>
                <p className="rounded-[8px] bg-stone-100 px-3 py-2 text-center text-sm font-bold text-stone-600">
                  {status}
                </p>
                <p className="leading-7 text-stone-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="First Visit"
            title="はじめて来た人の3ステップ。"
            description="読む順番を決め、無料キットを使い、今後の商品予定を確認するだけで一通り回れます。"
          />
          <ol className="grid gap-4">
            {firstSteps.map((step, index) => (
              <li key={step.href} className="grid gap-4 rounded-[8px] bg-white p-5 shadow-sm sm:grid-cols-[48px_1fr_auto] sm:items-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="font-semibold text-stone-950">{step.label}</p>
                <CtaButton href={step.href} variant="secondary">
                  開く
                </CtaButton>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="platforms" tone="soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Platform Hub"
            title="媒体ごとの役割を分け、本店に戻す。"
            description="各媒体は別々に伸ばしつつ、最終的には無料DL、商品、メルマガ、コミュニティ、相談へつなぐ設計にします。"
          />
          <CtaButton href="/media" variant="secondary">
            媒体設計を見る
          </CtaButton>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {primaryPlatforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </Section>

      <Section id="funnel">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Funnel Map"
            title="発見から相談まで、次の一手が見える導線。"
            description="読者の流れは、媒体で出会い、本店で理解し、無料キット、メルマガ、商品、コミュニティ、相談へ進む形に整理します。"
          />
          <FunnelMap />
        </div>
      </Section>

      <Section id="products" tone="soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Products"
            title="無料から相談まで、段階別の商品棚。"
            description="無料キット、テンプレート、プロンプト集、技術者向けキット、相談メニューを同じ商品データで管理します。"
          />
          <CtaButton href="/products" variant="secondary">
            商品一覧へ
          </CtaButton>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section id="library">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Latest / Library Preview"
            title="note、Zenn、Medium、自サイト記事を横断する。"
            description="媒体ではなく、読者の段階、タグ、関連商品から記事を探せるライブラリへ誘導します。"
          />
          <CtaButton href="/library" variant="secondary">
            記事ライブラリへ
          </CtaButton>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Updates"
            title="サイトの更新情報。"
            description="外部サービス接続前でも、サイト内の公開状態と改善内容を静的に残します。"
          />
          <CtaButton href="/updates" variant="secondary">
            更新情報一覧へ
          </CtaButton>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {latestUpdates.map((item) => (
            <article key={item.id} className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-teal-700">{item.category}</p>
              <time className="mt-3 block text-sm text-stone-500" dateTime={item.date}>
                {item.date}
              </time>
              <h2 className="mt-3 text-xl font-semibold leading-8 text-stone-950">
                {item.title}
              </h2>
              <p className="mt-3 leading-7 text-stone-600">{item.description}</p>
              <CtaButton href={item.href} variant="secondary" className="mt-6">
                関連ページへ
              </CtaButton>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <NewsletterCta />
      </Section>

      <Section>
        <ConsultingCta />
      </Section>

      <Section tone="dark">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-teal-200 uppercase">
              Final CTA
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">
              まずは読む順番を決め、無料キットで試す。
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-stone-300">
              {siteConfig.name}は、複数媒体をただ並べる場所ではなく、読者を次の行動へ案内する本店です。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/start" variant="light">
              はじめての方へ
            </CtaButton>
            <CtaButton href="/free" variant="light">
              無料キット
            </CtaButton>
            <CtaButton href="/products" variant="light">
              商品を見る
            </CtaButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
