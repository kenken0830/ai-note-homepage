"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "dark";
  className?: string;
  trackingId?: string;
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
  trackingId = "unspecified",
}: CtaButtonProps) {
  const variantClass = {
    primary:
      "bg-teal-700 text-white shadow-lg shadow-teal-900/15 hover:bg-teal-800",
    secondary:
      "border border-stone-300 bg-white text-stone-950 hover:border-teal-500 hover:text-teal-800",
    light: "bg-teal-300 text-stone-950 hover:bg-teal-200",
    dark: "bg-stone-950 text-white hover:bg-stone-800",
  }[variant];

  const classes = `inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-[8px] px-5 py-3 text-sm font-bold transition ${variantClass} ${className}`;
  const label = typeof children === "string" ? children : "cta";
  const recordClick = () => track("cta_click", { href, label, placement: trackingId });

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} onClick={recordClick}>
        {children}
      </a>
    );
  }

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={recordClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={recordClick}>
      {children}
    </Link>
  );
}
