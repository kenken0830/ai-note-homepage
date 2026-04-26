export const siteConfig = {
  name: "AI Compass Journal",
  title: "AI Compass Journal | AI情報を発信するnote公式ホームページ",
  description:
    "生成AI、ChatGPT活用、AI副業、AIニュース解説、仕事効率化を発信するnoteクリエイターの公式ホームページです。",
  ogDescription:
    "AIを仕事と暮らしに取り入れるための実践知を、noteからわかりやすく届けます。",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim(),
  noteUrl:
    process.env.NEXT_PUBLIC_NOTE_URL?.trim() ?? "https://note.com/life_to_ai",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim(),
};

export function getMailHref(email: string | undefined) {
  if (!email) {
    return undefined;
  }

  const subject = encodeURIComponent("AI Compass Journalへの問い合わせ");
  return `mailto:${email}?subject=${subject}`;
}
