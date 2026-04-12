import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CtaFooter from "@/components/CtaFooter";
import { client } from "@/sanity/client";

// Tyyppi yhdelle kortille
type FeatureCard = {
  title: string;
  description: string;
};

// Tyyppi Sanitysta haettavalle datalle
type HomepageData = {
  heroTitle?: string;
  heroDescription?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  featureCards?: FeatureCard[];
};

// GROQ-query: hae homepage-dokumentista kaikki kentät
const query = `*[_type == "homepage"][0]{
  heroTitle,
  heroDescription,
  ctaTitle,
  ctaDescription,
  featureCards
}`;

// async-funktio mahdollistaa datan haun palvelimella ennen renderöintiä
export default async function Home() {
  const data: HomepageData = await client.fetch(query);

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col">
      <Hero
        title={data.heroTitle}
        description={data.heroDescription}
      />
      <Features cards={data.featureCards} />
      <CtaFooter
        title={data.ctaTitle}
        description={data.ctaDescription}
      />
    </main>
  );
}
