type SectionProps = {
  children: React.ReactNode;
  id?: string;
  tone?: "white" | "soft" | "dark";
  className?: string;
};

export function Section({
  children,
  id,
  tone = "white",
  className = "",
}: SectionProps) {
  const toneClass = {
    white: "bg-white text-stone-950",
    soft: "bg-stone-50 text-stone-950",
    dark: "bg-stone-950 text-white",
  }[tone];

  return (
    <section id={id} className={`${toneClass} px-5 py-20 sm:px-8 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
