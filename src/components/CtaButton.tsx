import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "dark";
  className?: string;
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaButtonProps) {
  const variantClass = {
    primary:
      "bg-teal-700 text-white shadow-lg shadow-teal-900/15 hover:bg-teal-800",
    secondary:
      "border border-stone-300 bg-white text-stone-950 hover:border-teal-500 hover:text-teal-800",
    light: "bg-teal-300 text-stone-950 hover:bg-teal-200",
    dark: "bg-stone-950 text-white hover:bg-stone-800",
  }[variant];

  const classes = `inline-flex min-h-12 items-center justify-center rounded-[8px] px-5 py-3 text-sm font-bold transition ${variantClass} ${className}`;

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
