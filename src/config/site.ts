export const siteConfig = {
  name: "AI Compass Journal",
  title: "AI Compass Journal | AIノートの本店・導線ハブ",
  description:
    "note、Zenn、Medium、BOOTH、GitHub、X、YouTube、メルマガ、コミュニティ、相談を束ねるAIノートの導線ハブです。",
  ogDescription:
    "AIノートを学ぶ、使う、作る、売るための入口を、無料キット、商品、記事、相談へ整理しています。",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim(),
  noteUrl:
    process.env.NEXT_PUBLIC_NOTE_URL?.trim() ?? "https://note.com/life_to_ai",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim(),
  links: {
    note: process.env.NEXT_PUBLIC_NOTE_URL?.trim() ?? "https://note.com/life_to_ai",
    zenn: process.env.NEXT_PUBLIC_ZENN_URL?.trim() ?? "https://zenn.dev/placeholder",
    medium:
      process.env.NEXT_PUBLIC_MEDIUM_URL?.trim() ??
      "https://medium.com/@placeholder",
    booth:
      process.env.NEXT_PUBLIC_BOOTH_URL?.trim() ??
      "https://booth.pm/ja/items/placeholder",
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL?.trim() ??
      "https://github.com/kenken0830/ai-note-homepage",
    x: process.env.NEXT_PUBLIC_X_URL?.trim() ?? "https://x.com/placeholder",
    youtube:
      process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() ??
      "https://www.youtube.com/@placeholder",
    newsletter:
      process.env.NEXT_PUBLIC_NEWSLETTER_URL?.trim() ??
      "https://newsletter.placeholder",
    community:
      process.env.NEXT_PUBLIC_COMMUNITY_URL?.trim() ??
      "https://community.placeholder",
  },
};

export function getMailHref(email: string | undefined) {
  if (!email) {
    return undefined;
  }

  const subject = encodeURIComponent("AI Compass Journalへの問い合わせ");
  return `mailto:${email}?subject=${subject}`;
}
