"use client";

import { useState, useEffect, useRef } from "react";
import PortraitPlaceholder from "./PortraitPlaceholder";

// ─── Sijoittelutyyppi ────────────────────────────────────────────────────────
//
// Kortilla on 6 mahdollista paikkaa näytöllä.
// Muokkaa SECTIONS-arrayta vaihtaaksesi minkä tahansa osion paikkaa.

type CardPosition =
  | "top-left"
  | "top-right"
  | "center-left"
  | "center-right"
  | "bottom-left"
  | "bottom-right";

// Jokainen paikka muuntuu absolute-sijainniksi section-divissä.
// Kortti on aina fyysisesti tässä kohdassa — ei liu'u reunoilta.
const CARD_POSITION: Record<CardPosition, string> = {
  "top-left":     "top-24 left-6 lg:left-14",
  "top-right":    "top-24 right-6 lg:right-14",
  "center-left":  "top-1/2 -translate-y-1/2 left-6 lg:left-14",
  "center-right": "top-1/2 -translate-y-1/2 right-6 lg:right-14",
  "bottom-left":  "bottom-24 left-6 lg:left-14",
  "bottom-right": "bottom-24 right-6 lg:right-14",
};

// ─── Osiodata ────────────────────────────────────────────────────────────────

type Section = {
  id: string;
  label: string;
  title: string;
  position: CardPosition;
  gradient: string;
};

// Sijoittelu on valittu niin, että kortit liikkuvat näytöllä eri kohtiin —
// ei pelkkää vasemmalta-oikealta vaihtoa, vaan lavastettu kokonaisuus.
const SECTIONS: Section[] = [
  {
    id: "intro",
    label: "01 / Esittely",
    title: "Etunimi Sukunimi",
    position: "center-left",      // Intro: keskellä vasemmalla — pääroolissa
    gradient: "from-indigo-950 via-gray-900 to-gray-950",
  },
  {
    id: "contact",
    label: "02 / Yhteystiedot",
    title: "Ota yhteyttä",
    position: "top-right",        // Yhteystiedot: yläoikealla — kevyt ja siisti
    gradient: "from-slate-950 via-gray-900 to-indigo-950",
  },
  {
    id: "education",
    label: "03 / Koulutus & Työ",
    title: "Tausta",
    position: "bottom-left",      // Tausta: alavasemmalla — ankkuroitu
    gradient: "from-gray-950 via-indigo-950 to-gray-900",
  },
  {
    id: "skills",
    label: "04 / Osaaminen",
    title: "Mitä osaan",
    position: "top-left",         // Osaaminen: ylävasemmalla — tiivis ja tekninen
    gradient: "from-violet-950 via-gray-950 to-gray-900",
  },
  {
    id: "projects",
    label: "05 / Projektit",
    title: "Rakennettua",
    position: "center-right",     // Projektit: keskellä oikealla — loppuhuipennus
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

// ─── Pääkomponentti ───────────────────────────────────────────────────────────
//
// Animaatiologiikka:
//   Jokainen kortti on absolute-sijainneilla kiinni sille osoitetussa paikassa.
//   Ei slidea mihinkään. Kun osio aktivoituu (IntersectionObserver), kortti
//   saa opacity: 1 ja scale: 1. Inaktiivisella opacity: 0 ja scale: 0.97.
//   transition-all duration-300 ease-out hoitaa sulavan poppin.

export default function ScrollytellingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex(
              (el) => el === entry.target
            );
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid">

      {/* ── Sticky visuaalinen taso ─────────────────────────────────────── */}
      <div
        style={{ gridArea: "1 / 1" }}
        className="sticky top-0 h-screen overflow-hidden"
        aria-hidden="true"
      >
        {/* Taustakerrokset: cross-fade osiosta toiseen */}
        {SECTIONS.map((section, i) => (
          <div
            key={section.id}
            className={`absolute inset-0 bg-gradient-to-br ${section.gradient} transition-opacity duration-700`}
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          />
        ))}

        {/* Henkilökuva — aina keskellä taustaa */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PortraitPlaceholder />
        </div>

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

      {/* ── Scrollattava sisältö ────────────────────────────────────────── */}
      <div style={{ gridArea: "1 / 1" }} className="relative z-10">
        {SECTIONS.map((section, i) => {
          const isActive = i === activeIndex;

          return (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              // Osio vie min-h-screen tilaa scrollauksesta ja on relative,
              // jotta absolute-kortit asettuvat suhteessa siihen
              className="relative min-h-screen"
            >
              {/*
                Kortti on absolute-sijainneilla tarkasti paikallaan.
                Pop-animaatio: opacity 0→1, scale 0.97→1.
                Ei translateX/Y muutoksia — kortti ei liu'u mistään.
                pointer-events-none estää inaktiivisten korttien klikkaukset.
              */}
              <div
                className={`
                  absolute ${CARD_POSITION[section.position]}
                  w-full max-w-xs lg:max-w-sm
                  transition-all duration-300 ease-out
                  ${isActive
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-[0.97] pointer-events-none"
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
            </div>
          );
        })}
      </div>

    </div>
  );
}
