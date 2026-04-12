// CtaFooter — toimintakehote ja alatunniste
// Server Component: ei tilaa eikä tapahtumankäsittelijöitä

import Image from "next/image";

type CtaFooterProps = {
  title?: string;
  description?: string;
};

export default function CtaFooter({ title, description }: CtaFooterProps) {
  return (
    <>
      {/* CTA-alue */}
      <section className="bg-gray-950 px-6 py-24">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* Tekstisisältö */}
          <div className="flex-1 text-center lg:text-left">
            {/* Pieni yläteksti */}
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Parempaa AI sloppia tekemässä
            </p>

            {/* Iso otsikko */}
            <h2 className="text-4xl font-bold text-white mb-5 leading-tight">
              {title ?? "Tähän voisi laittaa kiinnostavan footer tekstin tai kuvan"}
            </h2>

            {/* Kuvausteksti */}
            <p className="text-gray-400 text-lg mb-10">
              {description ?? "Olen aina kiinnostunut kuulemaan ideoita, palautetta tai uusia mahdollisuuksia. Kirjoita rohkeasti."}
            </p>

            {/* Pääpainike */}
            <a
              href="/yhteys"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Lähetä viesti
            </a>
          </div>

          {/* Kuva-alue — vaihda src oikeaan polkuun, ks. ohjeet alla */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/cta-image.png"
              alt="CTA-kuva"
              width={480}
              height={360}
              className="rounded-2xl object-cover w-full max-w-sm"
            />
          </div>

        </div>
      </section>

      {/* Erotinviiva CTA:n ja footerin välissä */}
      <hr className="border-gray-800" />

      {/* Footer-alue */}
      <footer className="bg-gray-950 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Sivun nimi vasemmalla */}
          <span className="text-white font-bold text-base">Kallen Blogi</span>

          {/* Navigointilinkit oikealla */}
          <ul className="flex gap-6">
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Etusivu
              </a>
            </li>
            <li>
              <a
                href="/projektit"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Projektit
              </a>
            </li>
            <li>
              <a
                href="/yhteys"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Yhteys
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-xs text-center mt-6">
          © {new Date().getFullYear()} Kallen Blogi. Kaikki oikeudet pidätetään.
        </p>
      </footer>
    </>
  );
}
