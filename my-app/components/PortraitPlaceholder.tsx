// Henkilökuvan placeholder — vaihda tähän oikea kuva myöhemmin.
// Käytetään kaikissa PortfolioSection-osioissa.

export default function PortraitPlaceholder() {
  return (
    <div className="relative w-52 h-72 lg:w-64 lg:h-84 shrink-0 rounded-3xl overflow-hidden border border-gray-700/60 shadow-2xl shadow-black/40 bg-gradient-to-b from-gray-800 to-gray-900">

      {/* Hienovarainen indigoinen sävy taustan yläosassa */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-transparent" />

      {/* Siluettikuva — SVG-henkilöhahmo */}
      <svg
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 right-0 w-full"
        aria-hidden="true"
      >
        {/* Pää */}
        <circle cx="100" cy="90" r="42" fill="#4B5563" />
        {/* Kaula + hartiat */}
        <path
          d="M60 160 Q100 145 140 160 L155 280 H45 Z"
          fill="#374151"
        />
        {/* Kehon yläosa — pyöristetty siluetti */}
        <ellipse cx="100" cy="230" rx="72" ry="58" fill="#374151" />
      </svg>

      {/* Placeholder-teksti kuvan päällä */}
      <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
        <span className="text-gray-600 text-[10px] font-semibold uppercase tracking-[0.25em]">
          Kuva
        </span>
      </div>

    </div>
  );
}
