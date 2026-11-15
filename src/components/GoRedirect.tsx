"use client";

import { useEffect } from "react";

// Moves on as soon as Vercel Web Analytics has sent the page view for /go/<code>
// (so the visit is counted there too), or after a short wait at most.
const MAX_WAIT_MS = 1200;
const POLL_MS = 50;

export function GoRedirect({ to }: { to: string }) {
  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.replace(to);
    };

    const sentPageView = () =>
      performance
        .getEntriesByType("resource")
        .some((entry) => entry.name.includes("/_vercel/insights/view"));

    const poll = window.setInterval(() => {
      if (sentPageView()) go();
    }, POLL_MS);
    const fallback = window.setTimeout(go, MAX_WAIT_MS);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(fallback);
    };
  }, [to]);

  return (
    <noscript>
      <meta httpEquiv="refresh" content={`0;url=${to}`} />
    </noscript>
  );
}
