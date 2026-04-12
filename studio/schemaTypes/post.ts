import {defineType, defineField} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blogipostaus',
  type: 'document',

  fields: [

    defineField({
      name: 'title',
      title: 'Otsikko',
      type: 'string',
    }),

    // Slug generoidaan automaattisesti otsikosta
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title', // täyttää slugin automaattisesti otsikosta
      },
    }),

    defineField({
      name: 'excerpt',
      title: 'Lyhyt kuvaus',
      type: 'text',
      rows: 3,
      description: 'Näkyy blogilistassa kortin alla',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Julkaisupäivä',
      type: 'datetime',
    }),

    // Rich text -sisältö — block on Sanityn standardi muotoillulle tekstille
    defineField({
      name: 'content',
      title: 'Sisältö',
      type: 'array',
      of: [{type: 'block'}],
    }),

  ],

  // Studion listanäkymässä näkyy otsikko ja julkaisupäivä
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
    },
  },
})
