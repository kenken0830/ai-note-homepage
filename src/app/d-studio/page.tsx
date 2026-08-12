import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  dStudioCapabilities,
  dStudioProductLines,
} from "@/data/dStudio";

export const metadata: Metadata = {
  title: "D-Studio 3D Assets",
  description:
    "Game-ready sci-fi and cyber 3D assets for Unity and real-time production, with optimized geometry, LODs, materials, colliders, and documentation.",
  alternates: { canonical: "/d-studio" },
  openGraph: {
    title: "D-Studio 3D Assets",
    description:
      "Game-ready sci-fi and cyber 3D assets for Unity and real-time production.",
    images: ["/d-studio/cqsa-cover.png"],
  },
};

export default function DStudioPage() {
  return (
    <main className="bg-[#070b12] text-white">
      <section className="relative isolate min-h-[calc(100svh-8rem)] overflow-hidden">
        <Image
          src="/d-studio/cqsa-cover.png"
          alt="Cyber Quantum Signal Amplifier sci-fi prop"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,16,0.96)_0%,rgba(4,8,16,0.74)_42%,rgba(4,8,16,0.18)_76%,rgba(4,8,16,0.58)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#070b12] to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100svh-8rem)] max-w-7xl items-end px-5 pb-20 pt-24 sm:px-8 sm:pb-24 lg:items-center lg:pb-16">
          <div className="max-w-3xl fade-up">
            <p className="text-xs font-bold tracking-[0.28em] text-cyan-300 uppercase sm:text-sm">
              Independent 3D asset label
            </p>
            <p className="mt-5 text-xl font-semibold tracking-wide text-white/88">
              D-Studio 3D Assets
            </p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
              Game-ready sci-fi and cyber 3D assets for Unity and real-time production.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Practical packages built around usable geometry, documented LODs,
              PBR materials, collision setup, prefabs, and clear buyer guidance.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/d-studio/support"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Open support guide
              </Link>
              <a
                href="#product-lines"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 bg-black/20 px-6 py-3 text-sm font-bold text-white transition hover:border-cyan-200 hover:text-cyan-100"
              >
                View product lines
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a101a] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-cyan-300 uppercase">
              Production standard
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Built for clear handoff, not just presentation.
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              Each product is described by the assets and checks actually included.
              Engine compatibility and limitations remain product-specific.
            </p>
          </div>
          <ul className="grid gap-x-10 border-t border-white/15 sm:grid-cols-2">
            {dStudioCapabilities.map((capability, index) => (
              <li
                key={capability}
                className="flex gap-4 border-b border-white/15 py-5 text-sm leading-7 text-slate-200"
              >
                <span className="font-mono text-cyan-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="product-lines" className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.24em] text-cyan-300 uppercase">
              Product lines
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
              Sci-fi assets with an explicit production state.
            </h2>
          </div>
          <div className="mt-12 border-t border-white/15">
            {dStudioProductLines.map((product) => (
              <article
                key={product.name}
                className="group grid gap-3 border-b border-white/15 py-7 transition hover:border-cyan-300/60 sm:grid-cols-[1.3fr_0.7fr_0.8fr] sm:items-center"
              >
                <h3 className="text-xl font-semibold transition group-hover:text-cyan-200 sm:text-2xl">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-400">{product.kind}</p>
                <p className="text-sm font-medium text-slate-200 sm:text-right">
                  {product.status}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d8fff8] px-5 py-18 text-slate-950 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs font-bold tracking-[0.24em] text-teal-800 uppercase">
            AI-assisted content
          </p>
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              AI use is disclosed. Production work is still performed and validated.
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-slate-700">
              When generative tools contribute to source geometry or textures, the
              product documentation identifies that use. Geometry cleanup, LOD and
              axis work, material setup, collision preparation, prefab construction,
              and package validation are performed as separate production steps.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/15 pt-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.24em] text-cyan-300 uppercase">
              Buyer support
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
              Start with the package details. Then send a reproducible report.
            </h2>
          </div>
          <Link
            href="/d-studio/support"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-100"
          >
            Read the support guide
          </Link>
        </div>
      </section>
    </main>
  );
}

