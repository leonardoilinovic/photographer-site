import {defineField, defineType} from 'sanity'
import {hasLocalizedContent} from './localization'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  preview: {
    select: {localized: 'heroTitleLocalized'},
    prepare({localized}) {
      return {title: localized?.de || 'Untitled'}
    },
  },
  fields: [
    defineField({
      name: 'heroTitleLocalized',
      title: 'Hero Title',
      type: 'localizedString',
      description: 'Add German and English content. Empty translations fall back to German only.',
      validation: (Rule) => Rule.custom((value) =>
        hasLocalizedContent(value) || 'Add a German value.',
      ),
    }),
    defineField({
      name: 'heroSubtitleLocalized',
      title: 'Hero Subtitle',
      type: 'localizedText',
      description: 'Add German and English content. Empty translations fall back to German only.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})