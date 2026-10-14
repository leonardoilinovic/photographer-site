import {defineField, defineType} from 'sanity'
import {hasLocalizedContent} from './localization'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  preview: {
    select: {localized: 'titleLocalized'},
    prepare({localized}) {
      return {title: localized?.de || 'Untitled'}
    },
  },
  fields: [
    defineField({
      name: 'titleLocalized',
      title: 'Title',
      type: 'localizedString',
      description: 'Add German and English content. Empty translations fall back to German only.',
      validation: (Rule) => Rule.custom((value) =>
        hasLocalizedContent(value) || 'Add a German value.',
      ),
    }),
    defineField({
      name: 'bioLocalized',
      title: 'Bio',
      type: 'localizedText',
      description: 'Add German and English content. Empty translations fall back to German only.',
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