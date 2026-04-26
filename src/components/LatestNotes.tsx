import { siteConfig } from "@/config/site";
import type { Article } from "@/data/articles";

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
            Latest Notes
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950 sm:text-4xl">
            最新記事を追いやすい一覧に。
          </h2>
          <p className="mt-4 leading-8 text-stone-600">
            現在は仮データで表示しています。RSS連携時は、このコンポーネントに渡す配列を差し替えるだけで更新できます。
          </p>
        </div>
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {notes.map((note) => (
            <LatestNoteItem key={note.title} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestNoteItem({ note }: { note: Article }) {
  const href = note.href ?? siteConfig.noteUrl;

  return (
    <article className="group grid gap-3 py-6 transition hover:bg-stone-50 sm:grid-cols-[90px_1fr_auto] sm:items-center sm:px-4">
      <time className="font-mono text-sm text-stone-500" dateTime={note.publishedAt}>
        {dateFormatter.format(new Date(note.publishedAt))}
      </time>
      <div>
        <p className="text-sm font-bold text-teal-700">{note.category}</p>
        <h3 className="mt-1 text-lg font-semibold leading-7 text-stone-950 group-hover:text-teal-800">
          {note.title}
        </h3>
      </div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-teal-700 transition hover:text-teal-900 sm:justify-self-end"
        >
          noteで読む
        </a>
      ) : (
        <span className="text-sm font-bold text-stone-400 sm:justify-self-end">
          リンク設定待ち
        </span>
      )}
    </article>
  );
}
