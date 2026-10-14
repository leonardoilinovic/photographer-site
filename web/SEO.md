# SEO setup

Production origin: `https://kristijanturbic.de`, configured in `lib/seo.ts`.
Metadata never derives canonical URLs from localhost or the incoming request host.

- Main pages use localized `seo` copy in `i18n/de.json` and `i18n/en.json`.
- Titles end with `Kristijan Turbić Photography`. Visible UI copy is unchanged.
- Gallery titles/descriptions use the same localized Sanity content as the page,
  including its German fallback. Empty fields use localized SEO fallback copy.
- Each page has a self-canonical URL plus reciprocal de/en and x-default links.
  German canonical paths have no /de prefix; x-default points to German.
- Open Graph and Twitter cards use the same title/description and gallery cover
  where available. Images preserve their original ratio. No invented social handles.
- `app/sitemap.ts` generates both locales of the four main pages and published
  gallery slugs, with language alternates and real gallery update timestamps.
  Static-page modification dates are omitted rather than fabricated.
- `app/robots.ts` permits crawling and advertises the production sitemap.
  Existing proxy rules bypass filenames such as sitemap.xml and robots.txt.
- The shared locale layout retains the matching HTML lang. Missing pages continue
  using Next.js notFound(), which adds noindex.

## Content review

Some current galleries return empty localized titles (for example `wedding-2`).
Populate their localized title/description fields in Sanity to get unique, useful
gallery metadata instead of the generic SEO fallback. No schema change is needed.

## Assets to supply

1. Provide an approved 1200 x 630 social image at `public/social-preview.jpg`.
   Then set `DEFAULT_SOCIAL_IMAGE` in `lib/seo.ts` to `/social-preview.jpg`.
   Until then, main pages use text-only summary metadata; galleries with covers
   have large-image cards. No nonexistent default image URL is published.
2. Review/replace the existing `app/favicon.ico` with your approved brand favicon.
   An optional `app/apple-icon.png` (180 x 180) can be supplied for Apple devices.
   No favicon artwork was invented or replaced by this change.

Run `npm run build` and redeploy after publishing Sanity content or changing SEO
copy/assets, so statically generated pages, metadata and sitemap stay in sync.
After deploying to the production domain, submit `/sitemap.xml` in Search Console.
If using a publicly reachable staging deployment, configure noindex/access control
there separately; this production robots file deliberately permits indexing.
