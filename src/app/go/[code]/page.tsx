import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { GoRedirect } from "@/components/GoRedirect";
import { findGoLink, isNonHumanAgent, recordGoHit } from "@/lib/goLinks";

// Every visit must run on the server so it is counted once.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "移動しています",
  robots: { index: false, follow: false },
};

type GoPageProps = {
  params: Promise<{ code: string }>;
};

export default async function GoPage({ params }: GoPageProps) {
  const { code } = await params;
  const link = findGoLink(code);
  if (!link) {
    notFound();
  }

  const requestHeaders = await headers();
  if (!isNonHumanAgent(requestHeaders.get("user-agent"))) {
    await recordGoHit(code);
  }

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 px-5 py-16 text-center">
      <p className="text-base text-slate-700">ページに移動しています…</p>
      <GoRedirect to={link.to} />
      <a href={link.to} className="font-semibold text-blue-700 underline underline-offset-4">
        移動しないときはこちら
      </a>
    </main>
  );
}
