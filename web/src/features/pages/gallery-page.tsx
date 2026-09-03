import { getContent } from "@/content/content";
import { businessFacts } from "@/content/business";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { CallToAction } from "@/components/ui/call-to-action";

export function GalleryPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);

  return (
    <>
      <section className="page-hero gallery-hero">
        <div className="site-container narrow-heading">
          <p className="page-kicker">{content.gallery.eyebrow}</p>
          <h1>{content.gallery.title}</h1>
          <p>{content.gallery.intro}</p>
        </div>
      </section>
      <section className="page-section gallery-section">
        <div className="site-container gallery-holding" data-reveal>
          <div>
            <p className="section-number" aria-hidden="true">
              01 /
            </p>
            <h2>
              {locale === "en"
                ? "Our service portfolio is being refreshed"
                : "Estamos actualizando nuestro portafolio de servicios"}
            </h2>
            <p>
              {locale === "en"
                ? "We removed older images that no longer represented the services JVF Services offers. Current, permission-approved work will be added here as it becomes available."
                : "Quitamos imágenes anteriores que ya no representaban los servicios de JVF Services. Agregaremos aquí trabajos actuales con la autorización correspondiente."}
            </p>
            <a
              className="button button-primary gallery-google-link"
              href={businessFacts.googleProfile.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {locale === "en"
                ? "View photos on Google Maps"
                : "Ver fotos en Google Maps"}
            </a>
          </div>
          <ul>
            <li>{content.gallery.firstCaption}</li>
            <li>{content.gallery.secondCaption}</li>
          </ul>
        </div>
      </section>
      <div className="site-container page-section compact-section">
        <CallToAction
          locale={locale}
          title={locale === "en" ? "Need help now?" : "¿Necesita ayuda ahora?"}
          body={
            locale === "en"
              ? "Tell us which service you need and your preferred timing."
              : "Indique qué servicio necesita y el horario que prefiere."
          }
          href={localizedHref("contact", locale)}
          label={content.common.requestQuote}
        />
      </div>
    </>
  );
}
