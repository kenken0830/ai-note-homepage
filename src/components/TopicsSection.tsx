import { SectionHeading } from "@/components/SectionHeading";

const topics = [
  {
    title: "生成AI",
    text: "画像、文章、音声、動画など、表現を広げるAI活用の基本と応用。",
  },
  {
    title: "ChatGPT活用",
    text: "調査、要約、企画、壁打ちに使えるプロンプトと業務フロー。",
  },
  {
    title: "AI副業",
    text: "個人が小さく始めるサービス設計、案件化、発信の考え方。",
  },
  {
    title: "AIニュース解説",
    text: "新モデルや規約変更を、個人と仕事への影響から読み解く解説。",
  },
  {
    title: "仕事効率化",
    text: "日々の作業を短縮し、判断と創造に時間を戻すための使い方。",
  },
];

export function TopicsSection() {
  return (
    <section id="topics" className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Topics"
          title="読むだけで終わらない、試せるAIテーマ。"
          description="noteでは、AIを学びたい人、仕事に取り入れたい人、発信や副業に活かしたい人に向けてテーマ別に整理しています。"
        />
        <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
          {topics.map((topic, index) => (
            <div
              key={topic.title}
              className="grid gap-4 py-7 transition hover:bg-teal-50/60 sm:grid-cols-[120px_1fr_2fr] sm:items-center sm:px-4"
            >
              <span className="font-mono text-sm text-stone-400">
                0{index + 1}
              </span>
              <h3 className="text-2xl font-semibold text-stone-950">
                {topic.title}
              </h3>
              <p className="leading-8 text-stone-600">{topic.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
