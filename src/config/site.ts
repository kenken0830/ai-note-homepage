const canonicalSiteUrl = "https://www.ai-compass-journal.com";
const fallbackSiteUrl = canonicalSiteUrl;
const defaultNoteUrl = "https://note.com/life_to_ai";
const defaultGitHubUrl = "https://github.com/kenken0830/ai-note-homepage";

function normalizePublicEnv(value: string | null | undefined, fallback: string): string;
function normalizePublicEnv(value: string | null | undefined): string | undefined;
function normalizePublicEnv(value: string | null | undefined, fallback?: string) {
  const normalized = value?.trim();
  return normalized ? normalized : fallback;
}

function normalizeSiteUrl(value: string | null | undefined) {
  const candidate = normalizePublicEnv(value, fallbackSiteUrl);

  try {
    const parsed = new URL(candidate);
    if (
      parsed.hostname === "ai-compass-journal.com" ||
      parsed.hostname === "www.ai-compass-journal.com"
    ) {
      return canonicalSiteUrl;
    }
    return parsed.origin;
  } catch {
    return fallbackSiteUrl;
  }
}

function normalizeNoteUrl(value: string | null | undefined) {
  const candidate = normalizePublicEnv(value, defaultNoteUrl);

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" && parsed.hostname === "note.com"
      ? parsed.toString().replace(/\/$/, "")
      : defaultNoteUrl;
  } catch {
    return defaultNoteUrl;
  }
}

export const siteConfig = {
  name: "AI Compass Journal",
  title: "AI Compass Journal | 仕事で使うAI実践ガイド",
  description:
    "会議メモ、メール返信、週報など、仕事で使うAIの手順・プロンプト・確認ポイントを実践形式で紹介します。",
  ogDescription:
    "やりたい仕事から、AIで進める手順と無料スターターキットを探せる実践ガイドです。",
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  fallbackSiteUrl,
  noteUrl: normalizeNoteUrl(process.env.NEXT_PUBLIC_NOTE_URL),
  contactEmail: normalizePublicEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  links: {
    note: normalizeNoteUrl(process.env.NEXT_PUBLIC_NOTE_URL),
    zenn: normalizePublicEnv(process.env.NEXT_PUBLIC_ZENN_URL, "#"),
    medium: normalizePublicEnv(process.env.NEXT_PUBLIC_MEDIUM_URL, "#"),
    booth: normalizePublicEnv(process.env.NEXT_PUBLIC_BOOTH_URL, "#"),
    github: normalizePublicEnv(process.env.NEXT_PUBLIC_GITHUB_URL, defaultGitHubUrl),
    x: normalizePublicEnv(process.env.NEXT_PUBLIC_X_URL, "#"),
    youtube: normalizePublicEnv(process.env.NEXT_PUBLIC_YOUTUBE_URL, "#"),
    newsletter: normalizePublicEnv(process.env.NEXT_PUBLIC_NEWSLETTER_URL, "#"),
    community: normalizePublicEnv(process.env.NEXT_PUBLIC_COMMUNITY_URL, "#"),
  },
};

export function getMailHref(email: string | undefined) {
  if (!email) {
    return undefined;
  }

  const subject = encodeURIComponent("AI Compass Journalへの問い合わせ");
  return `mailto:${email}?subject=${subject}`;
}
