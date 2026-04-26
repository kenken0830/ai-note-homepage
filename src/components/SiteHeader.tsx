import Link from "next/link";
import { primaryNavigation } from "@/data/navigation";
import { CtaButton } from "@/components/CtaButton";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold text-stone-950">
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
          className="-mx-5 flex gap-5 overflow-x-auto px-5 pb-1 text-sm font-semibold text-stone-700 lg:mx-0 lg:px-0 lg:pb-0"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 transition hover:text-teal-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <CtaButton href="/free" variant="primary">
            無料キット
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
