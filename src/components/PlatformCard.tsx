import Link from "next/link";
import { Badge } from "@/components/Badge";
import { ExternalLink } from "@/components/ExternalLink";
import type { Platform } from "@/types/content";

type PlatformCardProps = {
  platform: Platform;
};

export function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <article className="grid gap-5 rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-semibold text-stone-950">{platform.name}</h3>
          <Badge>{platform.role}</Badge>
        </div>
        <p className="mt-4 leading-7 text-stone-600">{platform.description}</p>
      </div>
      <div className="grid gap-3 text-sm text-stone-600">
        <p>
          <span className="font-bold text-stone-950">更新:</span> {platform.cadence}
        </p>
        <p>
          <span className="font-bold text-stone-950">内容:</span>{" "}
          {platform.contentTypes.join(" / ")}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm font-bold">
        <Link href={platform.homepagePath} className="text-teal-700 hover:text-teal-900">
          本店内で見る
        </Link>
        <ExternalLink
          href={platform.url}
          source={platform.id}
          medium="platform_card"
          className="text-stone-600 hover:text-stone-950"
        >
          {platform.primaryCta}
        </ExternalLink>
      </div>
    </article>
  );
}
