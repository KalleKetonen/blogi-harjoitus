// Navbar — näkyy sivun yläreunassa
// Server Component: ei tilaa eikä tapahtumankäsittelijöitä, joten 'use client' ei tarvita

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      {/* Sivun nimi vasemmalla */}
      <span className="text-white font-bold text-lg tracking-tight">
        Kallen Blogi
      </span>

      {/* Navigointilinkit oikealla */}
      <ul className="flex gap-8">
        <li>
          <a
            href="/"
            className="text-gray-300 hover:text-white transition-colors text-sm"
          >
            Etusivu
          </a>
        </li>
        <li>
          <a
            href="/blog"
            className="text-gray-300 hover:text-white transition-colors text-sm"
          >
            Blogi
          </a>
        </li>
        <li>
          <a
            href="/koti"
            className="text-gray-300 hover:text-white transition-colors text-sm"
          >
            Koti
          </a>
        </li>
        <li>
          <a
            href="/yhteys"
            className="text-gray-300 hover:text-white transition-colors text-sm"
          >
            Yhteys
          </a>
        </li>
      </ul>
    </nav>
  );
}
