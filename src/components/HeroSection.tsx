import Image from "next/image";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative min-h-[88svh] overflow-hidden bg-white">
      <Image
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1800&q=85"
        alt="AIを活用した情報発信を想起させる光のネットワーク"
        className="hero-image object-cover"
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,247,0.98)_0%,rgba(248,250,247,0.9)_38%,rgba(248,250,247,0.34)_70%,rgba(248,250,247,0.12)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-10 border-b border-stone-900/10 bg-white/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#" className="text-lg font-bold text-stone-950">
            AI Compass Journal
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-stone-700 md:flex">
            <a className="transition hover:text-teal-700" href="#about">
              About
            </a>
            <a className="transition hover:text-teal-700" href="#topics">
              Topics
            </a>
            <a className="transition hover:text-teal-700" href="#articles">
              Articles
            </a>
            <a className="transition hover:text-teal-700" href="#contact">
              Contact
            </a>
          </div>
        </nav>
      </div>
      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl items-center px-5 pb-16 pt-28 sm:px-8">
        <div className="max-w-2xl">
          <p className="fade-up text-sm font-bold tracking-[0.2em] text-teal-700 uppercase">
            AI note creator official
          </p>
          <h1 className="fade-up mt-5 text-5xl font-semibold leading-[1.05] text-stone-950 sm:text-6xl lg:text-7xl">
            AI Compass Journal
          </h1>
          <p className="fade-up-delay mt-6 text-2xl font-medium leading-10 text-stone-900 sm:text-3xl">
            AIを、仕事と発信の実用知に変える。
          </p>
          <p className="fade-up-delay mt-5 max-w-xl text-base leading-8 text-stone-700 sm:text-lg">
            生成AI、ChatGPT活用、AI副業、最新ニュースを、note読者が今日から試せる粒度で届けています。
          </p>
          <div className="fade-up-delay mt-9 flex flex-col gap-3 sm:flex-row">
            {siteConfig.noteUrl ? (
              <a
                href={siteConfig.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-teal-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-800"
              >
                noteを読む
              </a>
            ) : (
              <a
                href="#articles"
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-teal-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-800"
              >
                記事を見る
              </a>
            )}
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-stone-300 bg-white/80 px-6 py-3 text-sm font-bold text-stone-950 backdrop-blur transition hover:border-teal-500 hover:text-teal-800"
            >
              問い合わせる
            </a>
          </div>
        </div>
      </div>
      <div className="float-line absolute bottom-10 right-8 hidden h-28 w-px bg-gradient-to-b from-transparent via-teal-600 to-transparent lg:block" />
    </section>
  );
}
