import { getMailHref, siteConfig } from "@/config/site";

export function ContactSection() {
  const mailHref = getMailHref(siteConfig.contactEmail);

  return (
    <section id="contact" className="bg-stone-950 px-5 py-24 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-teal-200 uppercase">
            Contact
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            AI活用の相談、取材、仕事依頼はこちらから。
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-stone-300">
            記事執筆、AI活用の壁打ち、講座や登壇、メディア取材など、内容が固まっていない段階でもご相談ください。
          </p>
          {mailHref ? (
            <a
              href={mailHref}
              className="mt-9 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-teal-300 px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-teal-200"
            >
              メールで問い合わせる
            </a>
          ) : siteConfig.noteUrl ? (
            <a
              href={siteConfig.noteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-teal-300 px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-teal-200"
            >
              noteから問い合わせる
            </a>
          ) : (
            <div className="mt-9 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-teal-300 px-6 py-3 text-sm font-bold text-stone-950">
              問い合わせ先を設定してください
            </div>
          )}
        </div>
        <div className="rounded-[8px] border border-white/15 bg-white/[0.08] p-6 backdrop-blur">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-stone-200">
                お名前
              </span>
              <div className="min-h-12 rounded-[8px] border border-white/15 bg-white/10 px-4 py-3 text-stone-400">
                山田 太郎
              </div>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-stone-200">
                相談内容
              </span>
              <div className="min-h-28 rounded-[8px] border border-white/15 bg-white/10 px-4 py-3 leading-7 text-stone-400">
                仕事依頼、取材、講座相談、AI導入の壁打ちなど
              </div>
            </label>
            <div className="rounded-[8px] bg-white px-4 py-4 text-sm leading-7 text-stone-700">
              フォーム機能を追加する場合は、このUIをServer Actionやフォームサービスに接続できます。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
