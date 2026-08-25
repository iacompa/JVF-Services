import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { AssetSlot } from "@/components/ui/asset-slot";
import { CallToAction } from "@/components/ui/call-to-action";

export function AboutPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <>
      <section className="page-hero about-hero">
        <div className="site-container about-hero-grid">
          <div>
            <p className="page-kicker">{content.about.eyebrow}</p>
            <h1>{content.about.title}</h1>
            <p className="hero-summary">{content.about.intro}</p>
          </div>
          <AssetSlot
            variant="portrait"
            placeholderText={locale === "en" ? "Placeholder" : "Marcador visual"}
            notRealWorkText={
              locale === "en"
                ? "This is not a photograph of completed JVF work."
                : "Esta no es una fotografía de un trabajo terminado de JVF."
            }
            label={content.about.placeholderTitle}
            description={content.about.placeholderBody}
          />
        </div>
      </section>
      <section className="page-section">
        <div className="site-container mission-grid">
          <h2>{content.about.missionTitle}</h2>
          <p>{content.about.missionBody}</p>
        </div>
      </section>
      <section className="values-section page-section">
        <div className="site-container">
          <h2>{content.about.valuesHeading}</h2>
          <div className="values-list">
            {content.about.values.map((value, index) => (
              <article key={value.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="site-container page-section compact-section">
        <CallToAction
          locale={locale}
          title={
            locale === "en"
              ? "How can JVF Services help?"
              : "¿Cómo puede ayudarle JVF Services?"
          }
          body={
            locale === "en"
              ? "Tell us what you need and we will respond with a clear next step."
              : "Cuéntenos qué necesita y responderemos con un siguiente paso claro."
          }
          href={localizedHref("contact", locale)}
          label={content.common.requestQuote}
        />
      </div>
    </>
  );
}
