"use client";

import { useState, useEffect, useRef } from "react";
import PortraitPlaceholder from "./PortraitPlaceholder";

// ─── Kortin sijoittelu stagessa ───────────────────────────────────────────────
//
// Kaikki positiot ovat sticky stagen sisäisiä absolute-sijainteja.
// Kortit eivät koskaan ole osa scrollaavaa dokumenttivirtaa.

type CardPosition = "left" | "right" | "top" | "top-left" | "top-right";

const CARD_POSITION: Record<CardPosition, string> = {
  "left":      "top-1/2 -translate-y-1/2 left-6 lg:left-14",
  "right":     "top-1/2 -translate-y-1/2 right-6 lg:right-14",
  "top":       "top-16 left-1/2 -translate-x-1/2",
  "top-left":  "top-16 left-6 lg:left-14",
  "top-right": "top-16 right-6 lg:right-14",
};

// ─── Osiodata ─────────────────────────────────────────────────────────────────

type Section = {
  id: string;
  label: string;
  title: string;
  position: CardPosition;
  gradient: string;
};

const SECTIONS: Section[] = [
  {
    id: "intro",
    label: "01 / Esittely",
    title: "Etunimi Sukunimi",
    position: "left",
    gradient: "from-indigo-950 via-gray-900 to-gray-950",
  },
  {
    id: "contact",
    label: "02 / Yhteystiedot",
    title: "Ota yhteyttä",
    position: "top-right",
    gradient: "from-slate-950 via-gray-900 to-indigo-950",
  },
  {
    id: "education",
    label: "03 / Koulutus & Työ",
    title: "Tausta",
    position: "right",
    gradient: "from-gray-950 via-indigo-950 to-gray-900",
  },
  {
    id: "skills",
    label: "04 / Osaaminen",
    title: "Mitä osaan",
    position: "top-left",
    gradient: "from-violet-950 via-gray-950 to-gray-900",
  },
  {
    id: "projects",
    label: "05 / Projektit",
    title: "Rakennettua",
    position: "top",
    gradient: "from-gray-950 via-slate-950 to-indigo-950",
  },
];

// ─── Osiokohtainen sisältö ────────────────────────────────────────────────────

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case "intro":
      return (
        <>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Ohjelmistokehittäjä ja rakentaja. Innostun web-teknologioista,
            käyttöliittymäsuunnittelusta ja asioista jotka oikeasti ratkaisevat
            ongelmia.
          </p>
          <p className="text-gray-500 text-xs uppercase tracking-widest">
            Kehittäjä · Rakentaja · Ongelmanratkaisija
          </p>
        </>
      );

    case "contact":
      return (
        <ul className="flex flex-col gap-3">
          {[
            { icon: "✉",  label: "Sähköposti", value: "etunimi@esimerkki.fi" },
            { icon: "📍", label: "Sijainti",   value: "Espoo, Suomi"         },
            { icon: "💼", label: "LinkedIn",   value: "linkedin.com/in/..."  },
            { icon: "🐙", label: "GitHub",     value: "github.com/..."       },
          ].map(({ icon, label, value }) => (
            <li key={label} className="flex items-start gap-3">
              <span className="text-sm mt-0.5 shrink-0">{icon}</span>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
                <p className="text-gray-200 text-sm">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      );

    case "education":
      return (
        <ul className="flex flex-col gap-4">
          {[
            {
              period: "2023 –",
              title:  "Ohjelmistokehittäjä",
              place:  "Yritys Oy",
              desc:   "Web-kehitystä React ja Next.js -teknologioilla.",
            },
            {
              period: "2021 – 2023",
              title:  "Juniori / Harjoittelija",
              place:  "Toinen Yritys Oy",
              desc:   "Frontend ja käyttöliittymäsuunnittelu.",
            },
            {
              period: "2019 – 2023",
              title:  "Tietojenkäsittely, AMK",
              place:  "Ammattikorkeakoulu",
              desc:   "Ohjelmointi, tietokannat, projektijohtaminen.",
            },
          ].map(({ period, title, place, desc }) => (
            <li key={title} className="flex gap-3">
              <div className="flex flex-col items-center shrink-0 pt-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <div className="w-px flex-1 bg-gray-700 mt-1" />
              </div>
              <div className="pb-3">
                <p className="text-gray-500 text-xs uppercase tracking-wide">{period}</p>
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-gray-400 text-xs">{place}</p>
                <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      );

    case "skills":
      return (
        <div className="flex flex-col gap-4">
          {[
            { category: "Frontend", tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
            { category: "Backend",  tags: ["Node.js", "REST API", "GraphQL", "PostgreSQL"]  },
            { category: "Työkalut", tags: ["Git", "GitHub", "Vercel", "VS Code"]            },
          ].map(({ category, tags }) => (
            <div key={category}>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">{category}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800/80 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "projects":
      return (
        <ul className="flex flex-col gap-4">
          {[
            {
              name: "Blogi-harjoitus",
              desc: "Next.js 16 + Sanity CMS + kodin infopaneeli. Rakennettu itsenäisesti.",
              tags: ["Next.js", "TypeScript"],
            },
            { name: "Projekti B", desc: "Kuvaus tulossa.", tags: ["React"]   },
            { name: "Projekti C", desc: "Kuvaus tulossa.", tags: ["Node.js"] },
          ].map(({ name, desc, tags }) => (
            <li key={name} className="border-b border-gray-700/50 pb-4 last:border-none last:pb-0">
              <p className="text-white font-semibold text-sm mb-1">{name}</p>
              <p className="text-gray-400 text-xs leading-relaxed mb-2">{desc}</p>
              <div className="flex gap-2 flex-wrap">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="text-indigo-400 text-[10px] uppercase tracking-wide font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}

// ─── StickyStage ──────────────────────────────────────────────────────────────
//
// Pysyy paikallaan koko sivun ajan. Sisältää:
//   - taustagradientin (cross-fade osiosta toiseen)
//   - henkilökuvan (aina keskellä)
//   - kaikki tekstikortit absolute-positioituna (vain aktiivinen näkyvissä)
//   - edistymispisteet
//
// Kortit ovat tässä komponentissa — eivät koskaan scrollaavassa virrassa.

function StickyStage({ activeIndex }: { activeIndex: number }) {
  return (
    <div
      style={{ gridArea: "1 / 1" }}
      className="sticky top-0 h-screen overflow-hidden"
    >
      {/* Taustakerrokset: cross-fade osiosta toiseen */}
      {SECTIONS.map((section, i) => (
        <div
          key={section.id}
          className={`absolute inset-0 bg-gradient-to-br ${section.gradient} transition-opacity duration-700`}
          style={{ opacity: i === activeIndex ? 1 : 0 }}
        />
      ))}

      {/* Henkilökuva — aina keskellä */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PortraitPlaceholder />
      </div>

      {/* Tekstikortit — kaikki stagessa, vain aktiivinen näkyvissä.
          Animaatio: opacity fade + pieni scale. Ei translate-liikettä. */}
      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={section.id}
            className={`
              absolute ${CARD_POSITION[section.position]}
              w-full max-w-xs lg:max-w-sm
              transition-opacity transition-transform duration-300 ease-out
              ${isActive
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-[0.98] pointer-events-none"
              }
            `}
          >
            <div className="bg-gray-950/85 backdrop-blur-md border border-gray-700/60 rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black/50">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                {section.label}
              </p>
              <h2 className="text-white text-xl lg:text-2xl font-bold leading-tight mb-4">
                {section.title}
              </h2>
              <SectionContent id={section.id} />
            </div>
          </div>
        );
      })}

      {/* Edistymispisteet */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-10">
        {SECTIONS.map((section, i) => (
          <div
            key={section.id}
            title={section.label}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-2 h-2 bg-white"
                : "w-1.5 h-1.5 bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── ScrollTriggers ───────────────────────────────────────────────────────────
//
// Näkymätön scrollattava alue. Ainoa tehtävä: tehdä sivu riittävän pitkäksi
// scrollausta varten ja kertoa IntersectionObserverille mikä step on aktiivinen.
// Ei sisällä mitään visuaalista.

function ScrollTriggers({
  triggerRefs,
}: {
  triggerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  return (
    <div
      style={{ gridArea: "1 / 1" }}
      className="relative pointer-events-none"
      aria-hidden="true"
    >
      {SECTIONS.map((section, i) => (
        <div
          key={section.id}
          id={section.id}
          ref={(el) => { triggerRefs.current[i] = el; }}
          className="min-h-screen"
        />
      ))}
    </div>
  );
}

// ─── Pääkomponentti ───────────────────────────────────────────────────────────
//
// CSS Grid -kikka: StickyStage ja ScrollTriggers jakavat saman grid-alueen
// (gridArea "1 / 1"). Gridin korkeus määräytyy isomman lapsen mukaan
// (= ScrollTriggers, n × 100vh). StickyStage pysyy näkyvissä koko ajan.
//
// Rakenne:
//   ScrollTriggers  — scrollattava, näkymätön, määrittää aktiivisen stepin
//   StickyStage     — pysyy paikallaan, näyttää taustan + kuvan + kortin

export default function ScrollytellingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = triggerRefs.current.findIndex(
              (el) => el === entry.target
            );
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    triggerRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid">
      <StickyStage activeIndex={activeIndex} />
      <ScrollTriggers triggerRefs={triggerRefs} />
    </div>
  );
}
