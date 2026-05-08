import { ImageResponse } from "next/og";
import { getAiUseCaseBySlug } from "@/data/aiUseCaseRegistry";

export const alt = "AI Compass Journal — AI 活用の実践辞典";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const categoryAccents: Record<string, string> = {
  書く: "#0d9488",
  調べる: "#7c3aed",
  整える: "#ea580c",
  学ぶ: "#0891b2",
  考える: "#c2410c",
  作る: "#16a34a",
  伝える: "#db2777",
  自動化する: "#1d4ed8",
};

export default async function OgImage({ params }: RouteProps) {
  const { slug } = await params;
  const useCase = getAiUseCaseBySlug(slug);

  const title = useCase?.title ?? "AI Compass Journal";
  const description =
    useCase?.description ?? "やりたいことから探す、AI 活用の実践辞典。";
  const category = useCase?.category ?? "AI 活用辞典";
  const difficulty = useCase?.difficulty
    ? useCase.difficulty === "beginner"
      ? "はじめて"
      : "少し応用"
    : "";
  const time = useCase?.timeToTry ?? "";
  const accent = categoryAccents[category] ?? "#0d9488";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 72px 64px 72px",
          background: "linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#0c0a09",
              letterSpacing: "-0.02em",
            }}
          >
            AI Compass Journal
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: accent,
              padding: "8px 18px",
              border: `2px solid ${accent}`,
              borderRadius: 999,
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            fontSize: 66,
            fontWeight: 800,
            color: "#0c0a09",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 32,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#57534e",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: "auto",
            paddingTop: 32,
            borderTop: "2px solid #e7e5e4",
          }}
        >
          {difficulty ? (
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#0c0a09",
                padding: "10px 20px",
                background: "#fafaf9",
                border: "1px solid #d6d3d1",
                borderRadius: 8,
              }}
            >
              難易度: {difficulty}
            </div>
          ) : null}
          {time ? (
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#0c0a09",
                padding: "10px 20px",
                background: "#fafaf9",
                border: "1px solid #d6d3d1",
                borderRadius: 8,
              }}
            >
              試す時間: {time}
            </div>
          ) : null}
          <div
            style={{
              marginLeft: "auto",
              fontSize: 20,
              fontWeight: 600,
              color: "#78716c",
            }}
          >
            ai-compass-journal.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
