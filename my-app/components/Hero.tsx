// Hero — etusivun pääosio
// Server Component: pelkkää staattista HTML:ää, 'use client' ei tarvita

type HeroProps = {
  title?: string;
  description?: string;
};

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center flex-1 px-6 py-24 text-center">
      {/* Pieni yläteksti */}
      <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
        Tervetuloa
      </p>

      {/* Iso otsikko */}
      <h1 className="text-5xl font-bold text-white leading-tight max-w-2xl mb-6">
        {title ?? "Rakennan moderneja web-sovelluksia"}
      </h1>

      {/* Kuvausteksti */}
      <p className="text-gray-400 text-lg max-w-xl mb-10">
        {description ?? "Harjoittelen Reactia, Next.js:ää ja Sanitya. Tämä on paikka, jossa dokumentoin oppimistani ja jaan projektejani."}
      </p>

      {/* Kaksi nappia */}
      <div className="flex gap-4">
        <a
          href="/projektit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Katso projektit
        </a>
        <a
          href="/yhteys"
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Ota yhteyttä
        </a>
      </div>
    </section>
  );
}
