import { CtaButton } from "@/components/CtaButton";

export function ConsultingCta() {
  return (
    <div className="grid gap-6 border-y border-stone-200 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
          Consulting
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-stone-950">
          発信、商品、相談導線を1つの設計図にする。
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-stone-600">
          個人向けAIノート設計、事業者向けナレッジ管理、note/Zenn/Medium/BOOTH導線設計まで相談できます。
        </p>
      </div>
      <CtaButton href="/consulting" variant="dark">
        相談メニューを見る
      </CtaButton>
    </div>
  );
}
