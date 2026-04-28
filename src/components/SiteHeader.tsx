import Link from "next/link";
import { headerNavigation } from "@/data/navigation";
import { CtaButton } from "@/components/CtaButton";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="whitespace-nowrap text-lg font-bold text-stone-950">
            AI Compass Journal
          </Link>
          <div className="lg:hidden">
            <CtaButton href="/free" variant="primary" className="min-h-10 px-4 py-2">
              無料キット
            </CtaButton>
          </div>
        </div>
        <nav
          aria-label="Primary navigation"
          className="-mx-5 flex gap-5 overflow-x-auto px-5 pb-1 text-sm font-semibold text-stone-700 lg:mx-0 lg:flex-wrap lg:justify-center lg:gap-x-5 lg:gap-y-2 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {headerNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 transition hover:text-teal-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden shrink-0 lg:block">
          <CtaButton href="/free" variant="primary">
            無料キット
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
