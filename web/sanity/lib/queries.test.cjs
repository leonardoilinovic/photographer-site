const assert = require('node:assert/strict');
const {test} = require('node:test');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {Module} = require('node:module');
const ts = require('typescript');
const {parse, evaluate} = require('groq-js');

// Execute the production query definitions without requiring a test framework.
const compiled = ts.transpileModule(readFileSync(join(__dirname, 'queries.ts'), 'utf8'), {
  compilerOptions: {module: ts.ModuleKind.CommonJS},
}).outputText;
const queryModule = new Module(join(__dirname, 'queries.ts'));
queryModule._compile(compiled, queryModule.id);
const queries = queryModule.exports;
const cases = [
  ['homepageQuery', 'homepage', ['heroTitle', 'heroSubtitle']],
  ['galleriesQuery', 'gallery', ['title', 'description']],
  ['galleryBySlugQuery', 'gallery', ['title', 'description']],
  ['aboutPageQuery', 'aboutPage', ['title', 'bio']],
  ['contactPageQuery', 'contactPage', ['contactText']],
];
async function run(query, document, locale) {
  const params = {locale, fallbackLocale: 'de', slug: 'shared-slug'};
  const value = await evaluate(parse(queries[query], {params}), {
    dataset: [document], params,
  });
  const result = await value.get();
  return Array.isArray(result) ? result[0] : result;
}
for (const [query, type, fields] of cases) {
  test(`${query}: requested language, German-only fallback, legacy values ignored`, async () => {
    const document = {_id: 'fixture', _type: type, slug: {current: 'shared-slug'}};
    for (const field of fields) {
      document[field] = `legacy ${field}`;
      document[field + 'Localized'] = {de: `German ${field}`, en: `English ${field}`};
    }
    for (const [locale, prefix] of [['de', 'German'], ['en', 'English']]) {
      const result = await run(query, document, locale);
      for (const field of fields) assert.equal(result[field], `${prefix} ${field}`);
    }
    // Empty, null, and absent English values must use German, never legacy.
    for (const empty of ['', null, undefined]) {
      for (const field of fields) document[field + 'Localized'].en = empty;
      const before = JSON.stringify(document);
      const result = await run(query, document, 'en');
      for (const field of fields) assert.equal(result[field], `German ${field}`);
      assert.equal(JSON.stringify(document), before);
    }
    // German must not borrow English or a legacy scalar when German is empty.
    for (const field of fields) document[field + 'Localized'] = {de: '', en: `English ${field}`};
    let result = await run(query, document, 'de');
    for (const field of fields) assert.equal(result[field], null);
    for (const field of fields) delete document[field + 'Localized'];
    const legacyOnly = JSON.stringify(document);
    for (const locale of ['de', 'en']) {
      result = await run(query, document, locale);
      for (const field of fields) assert.equal(result[field], null);
    }
    assert.equal(JSON.stringify(document), legacyOnly);
  });
}
test('images, contacts and slug remain shared; slug query needs no locale', async () => {
  const image = {_type: 'image', asset: {_ref: 'image-fixture'}};
  const gallery = {_id: 'gallery', _type: 'gallery', title: 'Original', slug: {current: 'shared-slug'}, coverImage: image, photos: [image]};
  for (const locale of ['de', 'en']) {
    const result = await run('galleryBySlugQuery', gallery, locale);
    assert.deepEqual(result.slug, gallery.slug);
    assert.deepEqual(result.coverImage, image);
    assert.deepEqual(result.photos, [image]);
    const contact = {_type: 'contactPage', email: 'test@example.com', phone: '+123', instagram: 'https://instagram.com/test'};
    const details = await run('contactPageQuery', contact, locale);
    for (const key of ['email', 'phone', 'instagram']) assert.equal(details[key], contact[key]);
  }
  const slugs = await (await evaluate(parse(queries.gallerySlugsQuery), {dataset: [gallery]})).get();
  assert.deepEqual(slugs, [{slug: 'shared-slug'}]);
});
