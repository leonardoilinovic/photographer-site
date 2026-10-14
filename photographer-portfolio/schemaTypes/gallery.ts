import {defineField, defineType} from 'sanity'
import {hasLocalizedContent, galleryTitle} from './localization'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  preview: {
    select: {localized: 'titleLocalized'},
    prepare({localized}) {
      return {title: galleryTitle({titleLocalized: localized}) || 'Untitled'}
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
      name: 'slug',
      title: 'Slug',
      description: 'Shared by both languages. Existing slugs stay unchanged unless you explicitly edit or regenerate them.',
      type: 'slug',
      options: {
        source: (document) => galleryTitle(document),
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionLocalized',
      title: 'Description',
      type: 'localizedText',
      description: 'Add German and English content. Empty translations fall back to German only.',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})