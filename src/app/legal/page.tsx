import type { Metadata } from "next";
import Link from "next/link";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "法務・ポリシー入口",
  description:
    "利用規約、プライバシー、広告表示など、正式化が必要な方針の現在地を示す準備中ページです。",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: false },
};

const legalItems = [
  ["特定商取引法に基づく表記", "販売開始前に、販売者情報、価格、支払い方法、返品条件を正式版へ差し替えます。"],
  ["利用規約", "テンプレート、プロンプト、有料記事の利用条件を正式版へ差し替えます。"],
  ["プライバシーポリシー", "2026年11月20日に制定しました。全文は、このページの下(日本語・English)にあります。"],
  ["ライセンス方針", "テンプレートやコードサンプルの再配布、商用利用、改変範囲を正式版へ差し替えます。"],
];

type PolicySection = {
  heading: string;
  intro?: string;
  items?: string[];
  contact?: boolean;
};

type Policy = {
  lang: "ja" | "en";
  title: string;
  lead: string;
  sections: PolicySection[];
  contactBefore: string;
  contactAfter: string;
  effective: string;
};

const policies: Policy[] = [
  {
    lang: "ja",
    title: "プライバシーポリシー",
    lead: "AI Compass Journal(https://www.ai-compass-journal.com 、以下「このサイト」)の運営者は、このサイトと、運営者が自分の SNS アカウントに投稿するための道具で扱う情報について、次のとおり定めます。",
    sections: [
      {
        heading: "1. このサイトで集める情報",
        items: [
          "アクセス解析: このサイトは Vercel Web Analytics を使っています。見たページ・参照元・おおよその地域・OS・ブラウザ・端末の種類などを、集計した数として集めます。個人を特定する情報や、別のサイトをまたいで人を追う情報は集めません。第三者のクッキーは使いません。訪問の区別は一時的な値で行い、24時間で消えます。",
          "短いリンク(/go/): 短いリンクが開かれた時は、日付・リンクの名前・回数だけを記録します。クッキー、IP アドレス、端末の情報は残しません。",
          "入力の書式: 会員登録・メールマガジンの登録・問い合わせの書式は、今はありません。",
        ],
      },
      {
        heading: "2. SNS への投稿の道具で扱う情報",
        intro: "運営者は、Threads・Instagram・Pinterest・Bluesky などの公式の API を、運営者が持つアカウントに、運営者が作った物を投稿するためだけに使います。",
        items: [
          "ほかの利用者のアカウント・投稿・個人の情報に触れたり、集めたり、残したりしません。",
          "API の接続の鍵は、運営者のパソコンの中に暗号化してしまいます。第三者に渡しません。",
          "得た情報を売ったり、広告に使ったりしません。",
          "投稿には、AI を使った事を、各サイトの公式の表示の欄と本文で示します。",
        ],
      },
      {
        heading: "3. 外のサイト",
        items: [
          "このサイトから移る先(note・BOOTH・Fab・YouTube・Substack・各 SNS など)は、それぞれのサイトの決まりに従います。",
          "商品の購入と支払いは、各ストアの中で行われます。このサイトは支払いの情報を受け取りません。",
        ],
      },
      {
        heading: "4. 情報の削除",
        items: [
          "このサイトと投稿の道具は、利用者の個人の情報を残していません。",
          "それでも削除や確認を求める場合は、下の問い合わせからご連絡ください。確かめて、お返事します。",
        ],
      },
      { heading: "5. 問い合わせ", contact: true },
      {
        heading: "6. 変更",
        intro: "このポリシーを変える時は、このページで知らせ、下の日付を改めます。",
      },
    ],
    contactBefore: "このサイトの問い合わせのページ(",
    contactAfter: ")からご連絡ください。",
    effective: "制定: 2026年11月20日",
  },
  {
    lang: "en",
    title: "Privacy Policy (English)",
    lead: 'The operator of AI Compass Journal (https://www.ai-compass-journal.com, "this site") handles information as follows, both on this site and in the tool the operator uses to post to the operator\'s own social media accounts.',
    sections: [
      {
        heading: "1. Information collected on this site",
        items: [
          "Analytics: This site uses Vercel Web Analytics. It collects page views, referrer, approximate region, operating system, browser and device type, as aggregated counts only. It does not collect personal identifiers or anything that tracks people across sites. No third-party cookies are used. Visitors are distinguished by a temporary value that is discarded after 24 hours.",
          "Short links (/go/): when a short link is opened, only the date, the link name and the count are recorded. No cookies, IP addresses or device information are stored.",
          "Forms: there are currently no sign-up, newsletter or contact forms on this site.",
        ],
      },
      {
        heading: "2. Information handled by the posting tool",
        intro: "The operator uses the official APIs of Threads, Instagram, Pinterest, Bluesky and similar services only to publish the operator's own content to accounts the operator owns.",
        items: [
          "The tool does not access, collect or store other users' accounts, posts or personal information.",
          "API access keys are stored encrypted on the operator's own computer and are never shared with third parties.",
          "No data is sold or used for advertising.",
          "Each post discloses AI use through the platform's official field and in the post text.",
        ],
      },
      {
        heading: "3. External sites",
        items: [
          "Linked sites (note, BOOTH, Fab, YouTube, Substack, social networks and others) are governed by their own policies.",
          "Purchases and payments take place inside each store. This site does not receive payment information.",
        ],
      },
      {
        heading: "4. Data deletion",
        items: [
          "This site and the posting tool do not store users' personal information.",
          "If you still wish to request deletion or confirmation, please use the contact below. We will check and reply.",
        ],
      },
      { heading: "5. Contact", contact: true },
      {
        heading: "6. Changes",
        intro: "Any change will be announced on this page with an updated date.",
      },
    ],
    contactBefore: "Please contact us through this site's contact page (",
    contactAfter: ").",
    effective: "Effective: November 20, 2026",
  },
];

function PrivacyPolicy({ policy }: { policy: Policy }) {
  return (
    <article lang={policy.lang} className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-stone-950">{policy.title}</h2>
      <p className="mt-4 leading-7 text-stone-700">{policy.lead}</p>
      {policy.sections.map((section) => (
        <section key={section.heading} className="mt-8">
          <h3 className="text-lg font-semibold text-stone-950">{section.heading}</h3>
          {section.intro ? <p className="mt-3 leading-7 text-stone-700">{section.intro}</p> : null}
          {section.items ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-stone-700">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.contact ? (
            <p className="mt-3 leading-7 text-stone-700">
              {policy.contactBefore}
              <Link href="/d-studio/support" className="font-semibold text-stone-950 underline underline-offset-4">
                /d-studio/support
              </Link>
              {policy.contactAfter}
            </p>
          ) : null}
        </section>
      ))}
      <p className="mt-8 text-sm text-stone-500">{policy.effective}</p>
    </article>
  );
}

export default function LegalPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="正式化が必要な法務・広告・プライバシー方針。"
        description="現時点では正式な法務文書ではありません。アクセス解析は利用中です。商品販売、広告リンク、メルマガ、フォーム連携は、人間が必要な文書を承認するまで開始しません。"
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {legalItems.map(([title, text]) => (
            <article key={title} className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-stone-950">{title}</h2>
              <p className="mt-4 leading-7 text-stone-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaButton href="/products" variant="secondary">
            商品一覧へ戻る
          </CtaButton>
          <CtaButton href="/free" variant="secondary">
            無料キットを見る
          </CtaButton>
        </div>
      </Section>
      <Section id="privacy" tone="soft">
        <div className="grid gap-6">
          {policies.map((policy) => (
            <PrivacyPolicy key={policy.lang} policy={policy} />
          ))}
        </div>
      </Section>
    </main>
  );
}
