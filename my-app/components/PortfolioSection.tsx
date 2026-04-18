// Uudelleenkäytettävä portfolio-osio.
// Henkilökuva pysyy aina keskellä, tietolaatikko vaihtaa puolta (left/right).

import PortraitPlaceholder from "./PortraitPlaceholder";

type Props = {
  id?: string;
  label: string;           // pieni ylätunniste, esim. "01 / INTRO"
  side: "left" | "right";  // kummalla puolella tietolaatikko on
  dark?: boolean;           // vaihtelee taustaväriä osioiden välillä
  children: React.ReactNode;
};

export default function PortfolioSection({
  id,
  label,
  side,
  dark = false,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center px-6 py-20 lg:px-16 transition-colors ${
        dark ? "bg-gray-900" : "bg-gray-950"
      }`}
    >
      <div className="w-full max-w-5xl mx-auto">

        {/* Osion pieni tunniste */}
        <p className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.25em] mb-10 lg:mb-14">
          {label}
        </p>

        {/*
          Desktop: kolme saraketta joustavalla flex-rivillä
            [vasen (flex-1)] [henkilökuva] [oikea (flex-1)]

          Tyhjä puoli täyttää flex-1 tilan, pitäen kuvan keskellä.
          Mobiili: pino (kuva → sisältö).
        */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0">

          {/* VASEN PAIKKA */}
          <div className="w-full lg:flex-1 lg:flex lg:justify-end lg:pr-12">
            {side === "left" ? children : null}
          </div>

          {/* HENKILÖKUVA — aina keskellä desktopilla, ylhäällä mobiililla */}
          <div className="order-first lg:order-none shrink-0">
            <PortraitPlaceholder />
          </div>

          {/* OIKEA PAIKKA */}
          <div className="w-full lg:flex-1 lg:pl-12">
            {side === "right" ? children : null}
          </div>

        </div>
      </div>
    </section>
  );
}
