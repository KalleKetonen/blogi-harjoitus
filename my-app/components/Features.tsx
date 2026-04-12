// Features — "Mitä opettelen" -osio etusivulla
// Server Component: pelkkää staattista HTML:ää

type FeatureCard = {
  title: string;
  description: string;
};

type FeaturesProps = {
  cards?: FeatureCard[];
};

// Fallback-kortit käytetään jos Sanitysta ei tule dataa
const fallbackCards: FeatureCard[] = [
  {
    title: "React & Next.js",
    description:
      "Rakennan käyttöliittymiä Reactilla ja hyödynnän Next.js App Routeria sivureitityksen ja palvelinkomponenttien hallintaan.",
  },
  {
    title: "Git & GitHub",
    description:
      "Hallitsen versionhallintaa Gitin avulla ja säilytän projektini GitHubissa. Harjoittelen myös branchien ja commit-historian käyttöä.",
  },
  {
    title: "Sanity CMS",
    description:
      "Käytän Sanitya sisällönhallintaan. Se mahdollistaa tekstien ja kuvien muokkaamisen ilman koodimuutoksia.",
  },
  {
    title: "Neljäs kortti",
    description: "Tekstisisältö tähän jeejee",
  },
  {
    title: "Viides kortti",
    description: "Tekstiä tähän koska miksi ei",
  },
  {
    title: "Kuudes ja viimeinen kortti",
    description: "Tekstiä xddd",
  },
];

export default function Features({ cards }: FeaturesProps) {
  // Jos Sanitysta tulee kortit, käytetään niitä — muuten fallback
  const displayCards = cards ?? fallbackCards;

  return (
    <section className="px-6 py-20 bg-gray-900">
      {/* Otsikko */}
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Mitä opettelen
      </h2>

      {/* Korttiruudukko */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {displayCards.map((card) => (
          <div
            key={card.title}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-3">
              {card.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
