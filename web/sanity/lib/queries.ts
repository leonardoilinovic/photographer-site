// Keep the response shape unchanged while choosing localized content.
// Empty translations count as missing; only German is used as a fallback.
const localized = (field: string) => `coalesce(
  select(length(coalesce(${field}Localized[$locale], "")) > 0 => ${field}Localized[$locale]),
  select(length(coalesce(${field}Localized[$fallbackLocale], "")) > 0 => ${field}Localized[$fallbackLocale])
)`

export const homepageQuery = `
  *[_type == "homepage"][0]{
    "heroTitle": ${localized("heroTitle")},
    "heroSubtitle": ${localized("heroSubtitle")},
    heroImage
  }
`

export const galleriesQuery = `
  *[_type == "gallery"] | order(_createdAt desc){
    _id,
    "title": ${localized("title")},
    slug,
    coverImage,
    "description": ${localized("description")}
  }
`

export const gallerySlugsQuery = `
  *[_type == "gallery" && defined(slug.current)][]{
    "slug": slug.current
  }
`

export const galleryBySlugQuery = `
  *[_type == "gallery" && slug.current == $slug][0]{
    _id,
    "title": ${localized("title")},
    slug,
    coverImage,
    "description": ${localized("description")},
    photos
  }
`

export const aboutPageQuery = `
  *[_type == "aboutPage"][0]{
    "title": ${localized("title")},
    "bio": ${localized("bio")},
    portraitTop,
    portraitBottom,
    portrait
  }
`

export const contactPageQuery = `
  *[_type == "contactPage"][0]{
    email,
    phone,
    instagram,
    "contactText": ${localized("contactText")}
  }
`