import type { Locale } from "@/i18n/config";
import type { LegalPage as LegalPageType } from "@/lib/seo";

type Props = {
  locale: Locale;
  page: LegalPageType;
};

function Imprint({ locale }: { locale: Locale }) {
  if (locale === "de") {
    return (
      <>
        <p>
          Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
        </p>
        <h2 className="mt-8 text-2xl">T.K. Photo Art</h2>
        <p className="mt-3">
          Kristijan Turbić
          <br />
          Einzelunternehmer
          <br />
          [STRASSE UND HAUSNUMMER]
          <br />
          [PLZ UND ORT]
        </p>
        <h2 className="mt-8 text-2xl">Kontakt</h2>
        <p className="mt-3">
          E-Mail: [E-MAIL]
          <br />
          Telefon: [TELEFON]
        </p>
      </>
    );
  }

  return (
    <>
      <p>Information pursuant to Section 5 of the German Digital Services Act (DDG)</p>
      <h2 className="mt-8 text-2xl">T.K. Photo Art</h2>
      <p className="mt-3">
        Kristijan Turbić
        <br />
        Sole proprietor
        <br />
        [STRASSE UND HAUSNUMMER]
        <br />
        [PLZ UND ORT]
      </p>
      <h2 className="mt-8 text-2xl">Contact</h2>
      <p className="mt-3">
        Email: [E-MAIL]
        <br />
        Telephone: [TELEFON]
      </p>
    </>
  );
}

function Privacy({ locale }: { locale: Locale }) {
  if (locale === "de") {
    return (
      <>
        <section>
          <h2 className="text-2xl">Verantwortlicher</h2>
          <p className="mt-3">
            Kristijan Turbić, T.K. Photo Art (Einzelunternehmer)
            <br />
            [STRASSE UND HAUSNUMMER], [PLZ UND ORT]
            <br />
            E-Mail: [E-MAIL]
            <br />
            Telefon: [TELEFON]
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl">Hosting und Serverprotokolle</h2>
          <p className="mt-3">
            Diese Website wird bei Vercel gehostet. Beim Aufruf verarbeitet der Hostinganbieter
            technische Verbindungs- und Zugriffsdaten, beispielsweise IP-Adresse, Zeitpunkt und
            angeforderte Adresse, soweit dies für Auslieferung, Stabilität und Sicherheit der
            Website erforderlich ist. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse am sicheren und zuverlässigen Betrieb). Die
            Speicherdauer richtet sich nach den betrieblichen und sicherheitsbezogenen Erfordernissen
            des Anbieters; eine feste Frist ist von uns nicht festgelegt.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl">Inhalte, Bilder und Schriftarten</h2>
          <p className="mt-3">
            Für die Verwaltung von Website-Inhalten und die Bereitstellung von Bildern verwenden wir
            Sanity CMS und das Sanity CDN. Bei Abrufen können dort technische Verbindungsdaten
            verarbeitet werden, die zur Bereitstellung der Inhalte erforderlich sind. Rechtsgrundlage
            ist Art. 6 Abs. 1 lit. f DSGVO (Interesse an einer funktionsfähigen Präsentation der
            Arbeiten).
          </p>
          <p className="mt-3">
            Ob und in welchem Umfang Daten außerhalb des Europäischen Wirtschaftsraums verarbeitet
            werden, hängt von den eingesetzten Anbieter- und Projekteinstellungen ab und ist vor
            Veröffentlichung anhand der aktuellen Verträge und Einstellungen zu prüfen.
          </p>
          <p className="mt-3">
            Die Schriftarten werden während des Builds mit Next.js bezogen und anschließend von
            dieser Website selbst ausgeliefert. Beim bloßen Seitenaufruf stellt Ihr Browser deshalb
            keine Verbindung zu Google Fonts her.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl">Kontakt per E-Mail oder Telefon</h2>
          <p className="mt-3">
            Die Kontaktseite enthält E-Mail- und Telefonlinks, aber kein Kontaktformular. Wenn Sie
            uns kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Angaben, um Ihre Anfrage
            zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern es um vorvertragliche
            Maßnahmen geht, andernfalls Art. 6 Abs. 1 lit. f DSGVO (Bearbeitung der Anfrage). Die
            Daten werden gelöscht, sobald die Anfrage erledigt ist und keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl">Externer Instagram-Link</h2>
          <p className="mt-3">
            Diese Website enthält lediglich einen normalen Link zu Instagram; es gibt kein
            Instagram-Embed und kein Widget. Erst wenn Sie dem Link folgen, wird Instagram/Meta
            aufgerufen. Ab diesem Zeitpunkt verarbeitet Meta Daten in eigener Verantwortung nach
            den dort geltenden Datenschutzbestimmungen.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl">Cookies, Speicher und Reichweitenmessung</h2>
          <p className="mt-3">
            Die Website setzt selbst keine Cookies und verwendet weder localStorage noch
            sessionStorage. Es werden derzeit keine Analyse-, Marketing- oder Trackingdienste
            eingesetzt.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl">Ihre Rechte</h2>
          <p className="mt-3">
            Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft (Art. 15), Berichtigung
            (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
            Datenübertragbarkeit (Art. 20) und Widerspruch gegen eine Verarbeitung auf Grundlage
            berechtigter Interessen (Art. 21). Soweit eine Verarbeitung auf einer Einwilligung
            beruht, können Sie diese mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3).
            Außerdem können Sie sich bei einer Datenschutzaufsichtsbehörde beschweren (Art. 77).
            Zur Ausübung Ihrer Rechte können Sie uns unter den oben genannten Kontaktdaten erreichen.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <section>
        <h2 className="text-2xl">Controller</h2>
        <p className="mt-3">
          Kristijan Turbić, T.K. Photo Art (sole proprietor)
          <br />
          [STRASSE UND HAUSNUMMER], [PLZ UND ORT]
          <br />
          Email: [E-MAIL]
          <br />
          Telephone: [TELEFON]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">Hosting and server logs</h2>
        <p className="mt-3">
          This website is hosted by Vercel. When you access it, the hosting provider processes
          technical connection and access data, such as IP address, time of access and requested
          address, as necessary to deliver, maintain and secure the website. The legal basis is
          Article 6(1)(f) GDPR (our legitimate interest in secure and reliable website operation).
          Retention depends on the provider&apos;s operational and security requirements; we have
          not set a fixed period.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">Content, images and fonts</h2>
        <p className="mt-3">
          We use Sanity CMS and the Sanity CDN to manage website content and deliver images.
          Technical connection data necessary to provide requested content may be processed when
          content is retrieved. The legal basis is Article 6(1)(f) GDPR (our interest in presenting
          our work through a functioning website).
        </p>
        <p className="mt-3">
          Whether and to what extent data is processed outside the European Economic Area depends
          on the providers&apos; and project&apos;s configurations. This must be checked against the
          current contracts and settings before publication.
        </p>
        <p className="mt-3">
          Fonts are obtained during the build using Next.js and are then served by this website.
          Your browser therefore does not connect to Google Fonts when you simply visit the site.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">Contact by email or telephone</h2>
        <p className="mt-3">
          The contact page provides email and telephone links, not a contact form. If you contact
          us, we process the information you provide to handle your enquiry. The legal basis is
          Article 6(1)(b) GDPR for pre-contractual steps, or otherwise Article 6(1)(f) GDPR (handling
          your enquiry). We delete the information when the enquiry is resolved unless statutory
          retention obligations apply.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">External Instagram link</h2>
        <p className="mt-3">
          This website contains an ordinary link to Instagram only; it does not embed Instagram
          content or a widget. Instagram/Meta is accessed only if you follow that link. From then
          on, Meta processes data under its own responsibility and privacy terms.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">Cookies, browser storage and analytics</h2>
        <p className="mt-3">
          The website itself does not set cookies and does not use localStorage or sessionStorage.
          No analytics, marketing or tracking services are currently used.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">Your rights</h2>
        <p className="mt-3">
          Subject to the GDPR, you have the right to access (Article 15), rectification (Article 16),
          erasure (Article 17), restriction of processing (Article 18), data portability
          (Article 20) and to object to processing based on legitimate interests (Article 21).
          Where processing is based on consent, you may withdraw it for the future (Article 7(3)).
          You also have the right to lodge a complaint with a data protection supervisory authority
          (Article 77). You can contact us using the details above to exercise your rights.
        </p>
      </section>
    </>
  );
}

export default function LegalPage({ locale, page }: Props) {
  const isImprint = page === "imprint";
  const title = isImprint
    ? (locale === "de" ? "Impressum" : "Imprint")
    : (locale === "de" ? "Datenschutzerklärung" : "Privacy Policy");

  return (
    <main className="bg-white text-black">
      <article className="mx-auto max-w-4xl px-6 py-12 md:px-12 md:py-16">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
          {locale === "de" ? "T.K. Photo Art" : "T.K. Photo Art"}
        </p>
        <h1 className="text-4xl font-light leading-tight sm:text-5xl md:text-7xl">
          {title}
        </h1>
        <div className="mt-8 max-w-3xl space-y-4 text-base leading-8 text-neutral-700 md:text-lg">
          {isImprint ? <Imprint locale={locale} /> : <Privacy locale={locale} />}
        </div>
      </article>
    </main>
  );
}
