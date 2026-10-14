import {defineField, defineType} from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      description: 'Example: https://instagram.com/',
    }),
    defineField({
      name: 'contactTextLocalized',
      title: 'Contact Text',
      type: 'localizedText',
      description: 'Add German and English content. Empty translations fall back to German only.',
    }),
  ],
})