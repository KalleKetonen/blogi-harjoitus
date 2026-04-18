"use client";

import { useState, useEffect, useRef } from "react";
import PortraitPlaceholder from "./PortraitPlaceholder";

// ─── Data ────────────────────────────────────────────────────────────────────

// Jokaisella osiolla on otsikko, puoli ja oma taustagradietti.
// Sisältö on SectionContent-funktiossa alempana — helppo muokata.

type Section = {
  id: string;
  label: string;
  title: string;
  side: "left" | "right";
  gradient: string; // Tailwind-luokat sticky-taustan värikerrokselle
};

const SECTIONS: Section[] = [
  {
    id: "intro",
    label: "01 / Esittely",
    title: "Etunimi Sukunimi",
    side: "left",
    gradient: "from-indigo-950 via-gray-900 to-gray-950",
  },
  {
    id: "contact",
    label: "02 / Yhteystiedot",
    title: "Ota yhteyttä",
    side: "right",
    gradient: "from-slate-950 via-gray-900 to-indigo-950",
  },
  {
    id: "education",
    label: "03 / Koulutus & Työ",
    title: "Tausta",
    side: "left",
    gradient: "from-gray-950 via-indigo-950 to-gray-900",
  },
  {
    id: "skills",
    label: "04 / Osaaminen",
    title: "Mitä osaan",
    side: "right",
    gradient: "from-violet-950 via-gray-950 to-gray-900",
  },
  {
    id: "projects",
    label: "05 / Projektit",
    title: "Rakennettua",
    side: "left",
    gradient: "from-gray-950 via-slate-950 to-indigo-950",
  },
];

// ─── Osiokohtainen sisältö ────────────────────────────────────────────────────
// Muokkaa tämä placeholder-sisältöä myöhemmin oikeaksi

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
// Layout-idea:
//   CSS Grid, molemmat lapset samassa grid-alueessa (1 / 1):
//
//     [sticky visuaalinen taso]  ← tausta, henkilökuva
//     [scrollattava sisältö]     ← teksti-kortit, z-10 päälle
//
//   Ulompi grid saa korkeudekseen isomman lapsen (= sisältökolumni, n × 100vh).
//   Sticky-elementti pysyy näkyvissä koko sen ajan — näin yksi tausta riittää.
//
// Taustanvaihto:
//   Jokainen gradient-kerros on absoluuttisesti sijoitettu visuaalitason päälle.
//   Aktiivinen osio saa opacity: 1, muut opacity: 0.
//   Tailwind transition-opacity duration-700 hoitaa sulan liukuman.
//
// Aktiivinen osio:
//   IntersectionObserver kuuntelee sisältöosioita (sectionRefs).
//   Kun osio on 50 % näkyvissä, se asetetaan aktiiviseksi (activeIndex).

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
    // CSS grid: molemmat lapset asetetaan samaan soluun (gridArea '1 / 1')
    // → ne limittyvät, ulompi grid kasvaa sisältölapsen mukaan
    <div className="grid">

      {/* ── Sticky visuaalinen taso ─────────────────────────────────────── */}
      {/* Pysyy näkyvissä koko sivun scrollauksen ajan                       */}
      <div
        style={{ gridArea: "1 / 1" }}
        className="sticky top-0 h-screen overflow-hidden"
        aria-hidden="true"
      >
        {/* Taustakerrokset — yksi per osio, cross-fade oppacityllä */}
        {SECTIONS.map((section, i) => (
          <div
            key={section.id}
            className={`absolute inset-0 bg-gradient-to-br ${section.gradient} transition-opacity duration-700`}
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          />
        ))}

        {/* Henkilökuva — keskitettynä taustaan */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PortraitPlaceholder />
        </div>

        {/* Osion edistymispisteet oikeassa reunassa */}
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
      {/* z-10: renderöityy sticky-tason päälle, tausta läpinäkyvä         */}
      <div style={{ gridArea: "1 / 1" }} className="relative z-10">
        {SECTIONS.map((section, i) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="min-h-screen flex items-center px-6 py-20 lg:px-14"
          >
            {/* Tekstikortti vaihtelee vasemmalle / oikealle */}
            <div
              className={`w-full flex ${
                section.side === "left" ? "justify-start" : "justify-end"
              }`}
            >
              <div className="bg-gray-950/85 backdrop-blur-md border border-gray-700/60 rounded-2xl p-6 lg:p-8 w-full max-w-xs lg:max-w-sm shadow-2xl shadow-black/50">
                {/* Osion pieni tunniste */}
                <p className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  {section.label}
                </p>

                {/* Pääotsikko */}
                <h2 className="text-white text-xl lg:text-2xl font-bold leading-tight mb-4">
                  {section.title}
                </h2>

                {/* Osiokohtainen sisältö */}
                <SectionContent id={section.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
