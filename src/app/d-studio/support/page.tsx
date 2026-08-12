import type { Metadata } from "next";
import Link from "next/link";
import {
  dStudioProductLines,
  dStudioSupportChecklist,
  dStudioSupportEmail,
  dStudioSupportScope,
} from "@/data/dStudio";

export const metadata: Metadata = {
  title: "D-Studio 3D Assets Support",
  description:
    "Support guidance for D-Studio 3D Assets packages, including the information needed to reproduce a Unity package issue.",
  alternates: { canonical: "/d-studio/support" },
};

export default function DStudioSupportPage() {
  const supportHref = `mailto:${dStudioSupportEmail}?subject=${encodeURIComponent("D-Studio 3D Assets support request")}`;

  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="border-b border-slate-800 bg-[#09101c] px-5 py-18 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/d-studio"
            className="text-sm font-bold text-cyan-300 transition hover:text-cyan-100"
          >
            ← D-Studio 3D Assets
          </Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.24em] text-cyan-300 uppercase">
                Buyer support
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-6xl">
                D-Studio 3D Assets Support
              </h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Support guidance for Unity Asset Store buyers and documented D-Studio
              packages. Start by identifying the exact package and environment.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-teal-700 uppercase">
              Support scope
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              What package support covers
            </h2>
          </div>
          <ul className="border-t border-slate-300">
            {dStudioSupportScope.map((item) => (
              <li key={item} className="border-b border-slate-300 py-5 leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.22em] text-teal-700 uppercase">
              Before contacting support
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Include enough detail to reproduce the issue.
            </h2>
          </div>
          <ol className="mt-10 grid border-t border-slate-300 md:grid-cols-2">
            {dStudioSupportChecklist.map((item, index) => (
              <li
                key={item}
                className="flex gap-4 border-b border-slate-300 py-5 md:odd:border-r md:odd:pr-8 md:even:pl-8"
              >
                <span className="font-mono text-sm text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-medium text-slate-800">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-teal-700 uppercase">
              Package details
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              Confirm the version and environment first.
            </h2>
          </div>
          <div className="space-y-6 leading-8 text-slate-700">
            <p>
              Read the package README and known-limitations section before changing
              import settings. Confirm the package version from its included
              documentation, then record the Unity version and active render pipeline.
            </p>
            <p>
              Compatibility is product-specific. A package tested with one Unity or
              render-pipeline version is not presented as validated for every engine
              configuration.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#09101c] px-5 py-16 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-cyan-300 uppercase">
                Supported product lines
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Identify the exact product in your request.
              </h2>
            </div>
            <ul className="border-t border-white/15">
              {dStudioProductLines.map((product) => (
                <li key={product.name} className="border-b border-white/15 py-5">
                  <p className="font-semibold">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{product.kind}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-teal-700 uppercase">
              License and contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              License terms remain separate from technical support.
            </h2>
          </div>
          <div>
            <p className="leading-8 text-slate-700">
              Assets purchased through the Unity Asset Store are licensed under the
              Standard Unity Asset Store EULA. This page does not add refund terms,
              response-time guarantees, or additional buyer restrictions.
            </p>
            <a
              href={supportHref}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-teal-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
            >
              Email D-Studio support at {dStudioSupportEmail}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
