import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? "local",
      environment: process.env.VERCEL_ENV ?? "local",
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
