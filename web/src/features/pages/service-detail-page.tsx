import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale, ServiceKey } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { AssetSlot } from "@/components/ui/asset-slot";
import { CallToAction } from "@/components/ui/call-to-action";

export function ServiceDetailPage({
  locale,
  service,
}: {
  locale: Locale;
  service: ServiceKey;
}) {
  const content = getContent(locale);
  const copy = content.serviceDetails[service];
  const contactHref = `${localizedHref("contact", locale)}?service=${service}`;
  const isInterpreting = service === "interpreting";

  return (
    <>
      <section className="service-detail-hero page-section">
        <div className="site-container service-hero-grid">
          <div>
            <p className="page-kicker">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="hero-summary">{copy.summary}</p>
            <a className="button button-primary" href={contactHref}>
              {copy.cta}
            </a>
          </div>
          <AssetSlot
            variant="landscape"
            placeholderText={
              locale === "en"
                ? "JVF service direction"
                : "Dirección de servicio JVF"
            }
            notRealWorkText={
              locale === "en"
                ? "This is original abstract artwork, not a photograph of completed JVF work."
                : "Esta es una ilustración abstracta original, no una fotografía de un trabajo terminado de JVF."
            }
            label={copy.eyebrow}
            description={copy.summary}
          />
        </div>
      </section>
      <section className="service-story page-section">
        <div className="site-container service-story-grid">
          <div className="service-intro">
            <h2>{locale === "en" ? "What to expect" : "Qué puede esperar"}</h2>
            <p>{copy.intro}</p>
          </div>
          <ul className="feature-lines">
            {copy.features.map((feature) => (
              <li key={feature}>
                <span aria-hidden="true">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="service-detail-band">
        <div className="site-container detail-band-grid">
          <div>
            <p className="detail-label">{copy.scheduleTitle}</p>
            <p>{copy.scheduleBody}</p>
          </div>
          <div className="price-note">
            <p>{copy.price}</p>
            <p>{copy.note}</p>
          </div>
        </div>
      </section>
      {isInterpreting ? (
        <section className="direct-help-strip">
          <div className="site-container">
            <p>
              {locale === "en"
                ? "Need interpretation now?"
                : "¿Necesita interpretación ahora?"}
            </p>
            <a href={businessFacts.phoneHref}>{content.common.call}</a>
            <a href={businessFacts.smsHref}>{content.common.text}</a>
          </div>
        </section>
      ) : null}
      <div className="site-container page-section compact-section">
        <CallToAction
          locale={locale}
          title={
            locale === "en"
              ? "Ready to discuss your request?"
              : "¿Lista para conversar sobre su solicitud?"
          }
          body={
            locale === "en"
              ? "Share a few practical details and we will confirm scope, timing, and availability."
              : "Comparta algunos detalles prácticos y confirmaremos el alcance, el horario y la disponibilidad."
          }
          href={contactHref}
          label={copy.cta}
          showDirectActions={isInterpreting}
        />
      </div>
    </>
  );
}
