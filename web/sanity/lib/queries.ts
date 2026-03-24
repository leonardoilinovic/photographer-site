export const homepageQuery = `
  *[_type == "homepage"][0]{
    heroTitle,
    heroSubtitle,
    heroImage,
    featuredGalleries[]->{
      _id,
      title,
      slug,
      coverImage,
      description
    }
  }
`

export const galleriesQuery = `
  *[_type == "gallery"] | order(_createdAt desc){
    _id,
    title,
    slug,
    coverImage,
    description
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
    title,
    slug,
    coverImage,
    description,
    photos
  }
`

export const aboutPageQuery = `
  *[_type == "aboutPage"][0]{
    title,
    bio,
    portrait
  }
`

export const contactPageQuery = `
  *[_type == "contactPage"][0]{
    email,
    phone,
    instagram,
    contactText
  }
`