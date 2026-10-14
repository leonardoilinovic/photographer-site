import {defineField, defineType} from 'sanity'

export const contentLanguages = [
  {id: 'de', title: 'Deutsch'},
  {id: 'en', title: 'English'},
] as const
export const defaultContentLanguage = 'de'

export function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function hasLocalizedContent(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false
  const translations = value as Record<string, unknown>
  return hasText(translations[defaultContentLanguage])
}

export function galleryTitle(document: Record<string, unknown>): string {
  const translations = document.titleLocalized as Record<string, unknown> | undefined
  const title = translations?.[defaultContentLanguage]
  return hasText(title) ? title : ''
}

export const localizedStringType = defineType({
  name: 'localizedString',
  title: 'Localized string',
  type: 'object',
  fields: contentLanguages.map(({id, title}) => defineField({name: id, title, type: 'string',
    validation: (Rule) => Rule.custom((value) => !value || hasText(value) || 'Enter text or clear this field.'),
  })),
})

export const localizedTextType = defineType({
  name: 'localizedText',
  title: 'Localized text',
  type: 'object',
  fields: contentLanguages.map(({id, title}) => defineField({name: id, title, type: 'text', rows: 5,
    validation: (Rule) => Rule.custom((value) => !value || hasText(value) || 'Enter text or clear this field.'),
  })),
})
