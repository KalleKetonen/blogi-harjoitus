import {defineType, defineField} from 'sanity'

// homepage-dokumenttityyppi
// Tästä voi olla vain yksi kappale (etusivu on aina sama dokumentti)

export const homepage = defineType({
  name: 'homepage',       // tekninen nimi — täsmää GROQ-queryssä käytettyyn _type-arvoon
  title: 'Etusivu',       // näkyy Sanity Studion valikossa
  type: 'document',

  fields: [

    // Hero-osion otsikko
    defineField({
      name: 'heroTitle',
      title: 'Hero-otsikko',
      type: 'string',
      description: 'Iso otsikko hero-osiossa',
    }),

    // Hero-osion kuvaus
    defineField({
      name: 'heroDescription',
      title: 'Hero-kuvaus',
      type: 'text',
      rows: 3,
      description: 'Lyhyt kuvaus hero-osion alla',
    }),

    // CTA-osion otsikko
    defineField({
      name: 'ctaTitle',
      title: 'CTA-otsikko',
      type: 'string',
      description: 'Otsikko sivun alareunassa olevassa CTA-osiossa',
    }),

    // CTA-osion kuvaus
    defineField({
      name: 'ctaDescription',
      title: 'CTA-kuvaus',
      type: 'text',
      rows: 3,
      description: 'Lyhyt kuvaus CTA-osion alla',
    }),

    // Features-osion kortit
    // Tämä on taulukko — voit lisätä, poistaa ja järjestellä kortteja Studiossa
    defineField({
      name: 'featureCards',
      title: 'Oppimiset (kortit)',
      type: 'array',
      description: 'Lisää, poista tai järjestele kortteja vetämällä',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Otsikko',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Kuvaus',
              type: 'text',
              rows: 3,
            }),
          ],
          // Studion esikatselu näyttää kortille otsikon listanäkymässä
          preview: {
            select: {title: 'title'},
          },
        },
      ],
    }),

  ],
})
