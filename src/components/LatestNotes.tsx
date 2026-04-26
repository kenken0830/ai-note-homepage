import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import type { Article } from "@/types/content";

type LatestNotesProps = {
  notes: Article[];
};

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  month: "short",
  day: "numeric",
});

export function LatestNotes({ notes }: LatestNotesProps) {
  return (
    <section className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
            Latest / Library
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950 sm:text-4xl">
            媒体をまたいで記事を探せる入口。
          </h2>
          <p className="mt-4 leading-8 text-stone-600">
            現在は静的データで表示しています。RSSやCMS連携時は、この記事配列を差し替えるだけで更新できます。
          </p>
        </div>
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {notes.map((note) => (
            <LatestNoteItem key={note.id} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestNoteItem({ note }: { note: Article }) {
  const isInternal = note.sourceUrl.startsWith("/");

  return (
    <article className="group grid gap-3 py-6 transition hover:bg-stone-50 sm:grid-cols-[90px_1fr_auto] sm:items-center sm:px-4">
      <time className="font-mono text-sm text-stone-500" dateTime={note.publishedAt}>
        {dateFormatter.format(new Date(note.publishedAt))}
      </time>
      <div>
        <p className="text-sm font-bold text-teal-700">{note.source}</p>
        <h3 className="mt-1 text-lg font-semibold leading-7 text-stone-950 group-hover:text-teal-800">
          {note.title}
        </h3>
      </div>
      {isInternal ? (
        <Link
          href={note.sourceUrl}
          className="text-sm font-bold text-teal-700 transition hover:text-teal-900 sm:justify-self-end"
        >
          導線を見る
        </Link>
      ) : (
        <ExternalLink
          href={note.sourceUrl}
          source={note.source}
          medium="latest_list"
          className="text-sm font-bold text-teal-700 transition hover:text-teal-900 sm:justify-self-end"
        >
          元記事へ
        </ExternalLink>
      )}
    </article>
  );
}
