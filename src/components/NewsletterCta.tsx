import { CtaButton } from "@/components/CtaButton";

export function NewsletterCta() {
  return (
    <div className="grid gap-8 rounded-[8px] bg-stone-950 p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
      <div>
        <p className="text-sm font-bold tracking-[0.16em] text-teal-200 uppercase">
          Newsletter
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          無料キットのあとも、迷わずAIノートを育てる。
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-stone-300">
          Kit、Substack、LINEなどはまだ未接続です。今は登録導線の見本として設置し、公開前にフォームサービスへ差し替えます。
        </p>
      </div>
      <div className="rounded-[8px] bg-white p-4 text-stone-950">
        <div className="grid gap-3">
          <div className="min-h-12 rounded-[8px] border border-stone-200 px-4 py-3 text-stone-500">
            メールアドレス入力欄の配置予定地
          </div>
          <CtaButton href="/newsletter" variant="primary" className="w-full">
            フォーム接続は準備中
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
