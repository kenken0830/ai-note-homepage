import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { getMailHref, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "個別相談・導入支援",
  description:
    "個人向けAIノート設計、法人向けナレッジ管理、AI発信フロー、媒体導線設計、ホームページ改善の相談ページです。",
};

const menus = [
  "個人向けノート設計",
  "事業者向けナレッジ管理",
  "AI発信フロー構築",
  "note/Zenn/Medium/BOOTH導線設計",
  "ホームページ改善",
];

export default function ConsultingPage() {
  const mailHref = getMailHref(siteConfig.contactEmail);

  return (
    <main>
      <PageHero
        eyebrow="Consulting"
        title="AIノートと発信導線を、事業に合わせて設計する。"
        description="個人の発信から法人のナレッジ管理まで、媒体、商品、相談導線を1つの仕組みにまとめます。"
        primaryCta={{ label: "相談内容を見る", href: "#menus" }}
        secondaryCta={{ label: "商品一覧へ", href: "/products" }}
      />
      <Section id="menus">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Menu"
            title="相談できること。"
            description="具体的な制作前の壁打ち、既存ホームページの改善、AI発信フローの整備まで対応します。"
          />
          <div className="grid gap-4">
            {menus.map((menu) => (
              <div key={menu} className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-950">{menu}</h2>
                <p className="mt-2 leading-7 text-stone-600">
                  現状、目的、媒体、商品、読者の流れを整理し、次に作るべき導線へ落とし込みます。
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 rounded-[8px] bg-stone-950 p-6 text-white sm:p-8">
          <h2 className="text-3xl font-semibold">問い合わせplaceholder</h2>
          <p className="mt-4 max-w-2xl leading-8 text-stone-300">
            メールアドレスが設定されている場合はmailtoへ、未設定の場合はnote導線へつなぎます。
          </p>
          <div className="mt-7">
            <CtaButton href={mailHref ?? siteConfig.noteUrl} variant="light">
              相談する
            </CtaButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
