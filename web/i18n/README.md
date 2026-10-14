# Localization infrastructure

German is the default: `/`, `/about`, `/contact`, `/portfolio`, `/portfolio/:slug`.
English uses `/en` plus the same paths. `proxy.ts` internally rewrites unprefixed
URLs to `/de/...`; direct `/de/...` requests redirect to their unprefixed canonical
URL. No browser-language detection or locale cookies override the requested URL.
The shared `app/[locale]` layout and pages render both locales, with static
pre-rendering for the existing pages and Sanity gallery slugs.

`config.ts` owns locales, native language names, and localized URL generation.
All internal links use `localizedPath`. The navbar switch preserves the current
page/gallery path and uses plain inline DE / EN text links. There is no new
language UI, dropdown, pill, or flag selector.

## Static interface copy

`de.json` and `en.json` provide the German and English static UI respectively.
`dictionary.ts` registers complete dictionaries and checks their key shape with
TypeScript. Pages, navbar, footer, metadata, image fallback labels, carousel
controls and mobile menu accessibility labels use the same locale dictionary.
The existing demo UI prose and missing-content fallback copy are also translated;
these fallbacks never override populated Sanity content.

Hero title/subtitle, gallery titles/descriptions, about title/bio and contact
text remain in Sanity and are resolved by the existing localized GROQ queries.
Names, brand marks, contact values, images and URLs are not translated by the UI.
To add a language, extend `locales`, `languageNames`, and dictionary registration
with a complete dictionary. The shared route tree, static params, proxy and inline
switch already support the configured locales.

## Sanity content localization (legacy cleanup complete)

Only localized content fields are exposed in Studio and read by the website:

| Document | Removed legacy field | Active field |
| --- | --- | --- |
| Homepage | heroTitle | heroTitleLocalized |
| Homepage | heroSubtitle | heroSubtitleLocalized |
| Gallery | title | titleLocalized |
| Gallery | description | descriptionLocalized |
| About | title | titleLocalized |
| About | bio | bioLocalized |
| Contact | contactText | contactTextLocalized |

The reusable `localizedString` and `localizedText` objects still have `de` and
`en` fields generated from `contentLanguages` in the Studio localization module.
Required titles must have German text; legacy scalars no longer satisfy
validation. Studio previews and slug generation read the German localized title.
Existing slug values are untouched and never regenerated automatically.

GROQ keeps the existing response shape and resolves every localized field as:

1. Nonempty requested language (`de` at `/`, `en` at `/en`).
2. Nonempty German (`fallbackLocale` supplied as `de` by every content caller).
3. Null if neither exists; the existing frontend empty state remains unchanged.

Legacy fields are not read, even when all translations are missing. German
never falls back to English. Optional translations can be empty; whitespace-only
values are rejected by Studio validation.

This cleanup changes schemas and queries only. It does not unset, delete,
migrate, or publish any Sanity document data. Historical scalar values remain
stored but are no longer schema inputs or query fallbacks. Studio may flag them
as unknown stored fields; do not use any remove/unset action if retaining that
historical data is required.

Images (including the existing hidden portrait compatibility field), email,
phone, Instagram, slugs, routing, and frontend design are unchanged. Publishing
content still requires a web rebuild/redeploy for statically generated pages.

Run query regression tests from `web`:

```sh
node --test sanity/lib/queries.test.cjs
```

Tests cover locale selection, empty/null/missing translations, German-only
fallback, ignoring retained legacy values without mutating them, and unchanged
shared assets/contact details/slugs. No test writes production data.
