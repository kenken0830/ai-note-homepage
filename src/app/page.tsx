import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { HeroSection } from "@/components/HeroSection";
import { LatestNotes } from "@/components/LatestNotes";
import { TopicsSection } from "@/components/TopicsSection";
import { featuredArticles, latestNotes } from "@/data/articles";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TopicsSection />
      <FeaturedArticles articles={featuredArticles} />
      <LatestNotes notes={latestNotes} />
      <ContactSection />
    </main>
  );
}
