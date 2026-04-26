type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-stone-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-stone-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
