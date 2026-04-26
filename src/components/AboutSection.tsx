import { SectionHeading } from "@/components/SectionHeading";

const strengths = ["実務目線のAI活用", "初心者にも伝わる整理", "副業・発信への応用"];

export function AboutSection() {
  return (
    <section id="about" className="bg-stone-50 px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="About"
          title="AIを身近な判断材料にするために発信しています。"
          description="新しいAIツールやニュースは増え続けています。大切なのは、話題性ではなく、自分の仕事や発信にどう取り入れるかを判断できることです。"
        />
        <div className="grid gap-6">
          <div className="border-l-4 border-teal-600 bg-white px-6 py-6 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-950">
              発信している理由
            </h3>
            <p className="mt-3 leading-8 text-stone-600">
              AIの進化を追うだけで終わらせず、個人の仕事、学び、収益化に落とし込む視点を届けるためにnoteで発信しています。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {strengths.map((strength) => (
              <div
                key={strength}
                className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-bold text-teal-700">得意テーマ</p>
                <p className="mt-3 font-semibold leading-7 text-stone-950">
                  {strength}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-stone-950 px-6 py-7 text-white">
            <p className="text-sm font-bold tracking-[0.16em] text-teal-200 uppercase">
              Value
            </p>
            <p className="mt-3 text-xl font-semibold leading-9">
              読者がAI情報を迷わず選び、試し、仕事の成果に変えるための実践的な整理を提供します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
