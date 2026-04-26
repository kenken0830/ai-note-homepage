import Link from "next/link";
import { footerNavigation } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-stone-950 px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xl font-bold">AI Compass Journal</p>
          <p className="mt-3 max-w-lg leading-7 text-stone-300">
            note、Zenn、Medium、BOOTH、GitHub、X、YouTube、メルマガ、コミュニティ、相談を束ねるAIノートの本店です。
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm font-semibold text-stone-300 sm:grid-cols-3">
          {footerNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-teal-200">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
