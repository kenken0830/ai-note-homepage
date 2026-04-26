type BadgeProps = {
  children: React.ReactNode;
  tone?: "teal" | "stone" | "dark";
};

export function Badge({ children, tone = "teal" }: BadgeProps) {
  const toneClass = {
    teal: "bg-teal-50 text-teal-800",
    stone: "bg-stone-100 text-stone-700",
    dark: "bg-stone-900 text-white",
  }[tone];

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${toneClass}`}>
      {children}
    </span>
  );
}
