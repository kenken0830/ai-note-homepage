const fallbackSiteUrl = "https://ai-note-homepage.vercel.app";
const defaultNoteUrl = "https://note.com/life_to_ai";
const defaultGitHubUrl = "https://github.com/kenken0830/ai-note-homepage";

function normalizePublicEnv(value: string | null | undefined, fallback: string): string;
function normalizePublicEnv(value: string | null | undefined): string | undefined;
function normalizePublicEnv(value: string | null | undefined, fallback?: string) {
  const normalized = value?.trim();
  return normalized ? normalized : fallback;
}

export const siteConfig = {
  name: "AI Compass Journal",
  title: "AI Compass Journal | AIノートの本店・導線ハブ",
  description:
    "note、Zenn、Medium、BOOTH、GitHub、X、YouTube、メルマガ、コミュニティ、相談を束ねるAIノートの導線ハブです。",
  ogDescription:
    "AIノートを学ぶ、使う、作る、売るための入口を、無料キット、商品、記事、相談へ整理しています。",
  siteUrl: normalizePublicEnv(process.env.NEXT_PUBLIC_SITE_URL, fallbackSiteUrl),
  fallbackSiteUrl,
  noteUrl: normalizePublicEnv(process.env.NEXT_PUBLIC_NOTE_URL, defaultNoteUrl),
  contactEmail: normalizePublicEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  links: {
    note: normalizePublicEnv(process.env.NEXT_PUBLIC_NOTE_URL, defaultNoteUrl),
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
