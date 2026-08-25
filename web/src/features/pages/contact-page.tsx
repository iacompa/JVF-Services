import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";

export function ContactPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="site-container narrow-heading">
          <p className="page-kicker">{content.contact.eyebrow}</p>
          <h1>{content.contact.title}</h1>
          <p>{content.contact.intro}</p>
        </div>
      </section>
      <section className="page-section">
        <div className="site-container contact-layout">
          <aside className="contact-direct">
            <h2>{content.contact.directTitle}</h2>
            <p>{content.contact.directBody}</p>
            <a className="button button-primary" href={businessFacts.phoneHref}>
              {content.common.call}
            </a>
            <a className="button button-secondary" href={businessFacts.smsHref}>
              {content.common.text}
            </a>
          </aside>
          <div className="form-stage">
            <h2>{content.contact.formTitle}</h2>
            <p>
              {locale === "en"
                ? "The secure demo request form is loading in the next implementation step."
                : "El formulario seguro de demostración se añadirá en el siguiente paso."}
            </p>
            <p className="privacy-callout">{content.contact.privacyNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
