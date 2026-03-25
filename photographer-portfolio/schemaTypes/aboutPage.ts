import {defineField, defineType} from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'portraitTop',
      title: 'Portrait Top (main)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'portraitBottom',
      title: 'Portrait Bottom (reveal)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait (legacy)',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: true,
    }),
  ],
})