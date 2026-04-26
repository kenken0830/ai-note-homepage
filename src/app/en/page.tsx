import type { Metadata } from "next";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "English entrance for AI note-taking workflows",
  description:
    "An English entrance for AI note-taking workflows, future Medium essays, Gumroad products, and an English newsletter.",
};

export default function EnglishPage() {
  return (
    <main>
      <PageHero
        eyebrow="English"
        title="AI note-taking workflows for independent creators."
        description="This is the English entrance for future Medium essays, Gumroad products, templates, and an English newsletter."
        primaryCta={{ label: "Browse the library", href: "/library" }}
        secondaryCta={{ label: "Join the newsletter", href: "/newsletter" }}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Roadmap"
            title="Built first as a hub, then connected to global channels."
            description="The Japanese site is the main store. This entrance prepares the structure for Medium, Gumroad, and English newsletter flows."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Medium", "Long-form essays for global readers."],
              ["Gumroad", "Future templates and workflow kits."],
              ["Newsletter", "A guided sequence from free kit to consulting."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-stone-950">{title}</h2>
                <p className="mt-4 leading-7 text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaButton href="/free">Start with the free kit</CtaButton>
          <CtaButton href="/consulting" variant="secondary">
            Consulting
          </CtaButton>
        </div>
      </Section>
    </main>
  );
}
