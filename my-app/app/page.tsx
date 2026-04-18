import PortfolioSection from "@/components/PortfolioSection";

// ---- Jaettu korttityyli ------------------------------------------------
// Tietolaatikot, joita käytetään jokaisessa osiossa

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/60 rounded-2xl p-6 lg:p-8 max-w-sm w-full hover:border-indigo-500/40 transition-colors duration-300">
      {children}
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-white text-2xl lg:text-3xl font-bold leading-tight mb-4">
      {children}
    </h2>
  );
}

function CardText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
      {children}
    </p>
  );
}

// ---- Etusivu -----------------------------------------------------------

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">

      {/* ── 1. HERO / INTRO ───────────────────────────────────────────── */}
      <PortfolioSection id="intro" label="01 / Esittely" side="left">
        <InfoCard>
          <CardLabel>Moi, olen</CardLabel>
          <CardTitle>Etunimi Sukunimi</CardTitle>
          <CardText>
            Ohjelmistokehittäjä ja rakentaja. Innostun erityisesti
            web-teknologioista, käyttöliittymäsuunnittelusta ja
            asioista jotka oikeasti ratkaisevat ongelmia.
          </CardText>
          <p className="text-gray-500 text-xs mt-4 uppercase tracking-widest">
            Kehittäjä · Rakentaja · Ongelmanratkaisija
          </p>
        </InfoCard>
      </PortfolioSection>

      {/* ── 2. YHTEYSTIEDOT ───────────────────────────────────────────── */}
      <PortfolioSection id="contact" label="02 / Yhteystiedot" side="right" dark>
        <InfoCard>
          <CardLabel>Ota yhteyttä</CardLabel>
          <CardTitle>Löydät minut täältä</CardTitle>
          <ul className="flex flex-col gap-3 mt-2">
            {[
              { icon: "✉", label: "Sähköposti", value: "etunimi@esimerkki.fi" },
              { icon: "📍", label: "Sijainti",   value: "Espoo, Suomi"         },
              { icon: "💼", label: "LinkedIn",   value: "linkedin.com/in/..."  },
              { icon: "🐙", label: "GitHub",     value: "github.com/..."       },
            ].map(({ icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="text-base mt-0.5 shrink-0">{icon}</span>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
                  <p className="text-gray-200 text-sm">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </InfoCard>
      </PortfolioSection>

      {/* ── 3. KOULUTUS & TYÖHISTORIA ─────────────────────────────────── */}
      <PortfolioSection id="education" label="03 / Koulutus & Työ" side="left">
        <InfoCard>
          <CardLabel>Tausta</CardLabel>
          <CardTitle>Koulutus & Kokemus</CardTitle>
          <ul className="flex flex-col gap-5 mt-2">
            {[
              {
                period: "2023 –",
                title:  "Ohjelmistokehittäjä",
                place:  "Yritys Oy, Espoo",
                desc:   "Web-kehitystä React- ja Next.js-teknologioilla.",
              },
              {
                period: "2021 – 2023",
                title:  "Harjoittelija / Juniori",
                place:  "Toinen Yritys Oy",
                desc:   "Frontend-kehitystä ja käyttöliittymäsuunnittelua.",
              },
              {
                period: "2019 – 2023",
                title:  "Tietojenkäsittely, AMK",
                place:  "Ammattikorkeakoulu",
                desc:   "Ohjelmointi, tietokantasuunnittelu, projektijohtaminen.",
              },
            ].map(({ period, title, place, desc }) => (
              <li key={title} className="flex gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5" />
                  <div className="w-px flex-1 bg-gray-700 mt-1" />
                </div>
                <div className="pb-2">
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">{period}</p>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-gray-400 text-xs mb-1">{place}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </InfoCard>
      </PortfolioSection>

      {/* ── 4. OSAAMINEN ──────────────────────────────────────────────── */}
      <PortfolioSection id="skills" label="04 / Osaaminen" side="right" dark>
        <InfoCard>
          <CardLabel>Teknologiat</CardLabel>
          <CardTitle>Mitä osaan</CardTitle>
          <div className="flex flex-col gap-4 mt-2">
            {[
              { category: "Frontend",  tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
              { category: "Backend",   tags: ["Node.js", "REST API", "GraphQL", "PostgreSQL"]   },
              { category: "Työkalut",  tags: ["Git", "GitHub", "Vercel", "VS Code"]             },
            ].map(({ category, tags }) => (
              <div key={category}>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-700/60 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </PortfolioSection>

      {/* ── 5. PROJEKTIT / CTA ────────────────────────────────────────── */}
      <PortfolioSection id="projects" label="05 / Projektit" side="left">
        <InfoCard>
          <CardLabel>Mitä olen rakentanut</CardLabel>
          <CardTitle>Projektit</CardTitle>
          <ul className="flex flex-col gap-4 mt-2">
            {[
              {
                name: "Blogi-harjoitus",
                desc: "Next.js 16 + Sanity CMS + kodin infopaneeli. Rakennettu alusta loppuun itsenäisesti.",
                tags: ["Next.js", "TypeScript"],
              },
              {
                name: "Projekti B",
                desc: "Placeholder-kuvaus projektista. Lisätään myöhemmin.",
                tags: ["React", "Node.js"],
              },
              {
                name: "Projekti C",
                desc: "Placeholder-kuvaus projektista. Lisätään myöhemmin.",
                tags: ["TypeScript"],
              },
            ].map(({ name, desc, tags }) => (
              <li key={name} className="border-b border-gray-700/50 pb-4 last:border-none last:pb-0">
                <p className="text-white font-semibold text-sm mb-1">{name}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-2">{desc}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {tags.map((t) => (
                    <span key={t} className="text-indigo-400 text-[10px] uppercase tracking-wide font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </InfoCard>
      </PortfolioSection>

    </main>
  );
}
