import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { ContactForm } from "@/features/contact/contact-form";
import type { ServiceId } from "@/features/contact/types";

export function ContactPage({
  locale,
  initialService,
}: {
  locale: Locale;
  initialService?: ServiceId;
}) {
  const content = getContent(locale);
  const process =
    locale === "en"
      ? [
          ["01", "Choose the service"],
          ["02", "Share practical details"],
          ["03", "Receive a personal response"],
        ]
      : [
          ["01", "Elija el servicio"],
          ["02", "Comparta detalles prácticos"],
          ["03", "Reciba una respuesta personal"],
        ];

  return (
    <>
      <section className="page-hero contact-hero">
        <div className="site-container contact-hero-grid">
          <div className="narrow-heading">
            <p className="page-kicker">{content.contact.eyebrow}</p>
            <h1>{content.contact.title}</h1>
            <p>{content.contact.intro}</p>
          </div>
          <ol
            className="contact-process"
            aria-label={
              locale === "en" ? "What happens next" : "Qué sucede después"
            }
          >
            {process.map(([number, label]) => (
              <li key={number}>
                <span>{number}</span>
                {label}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="page-section contact-section">
        <div className="site-container contact-layout" data-reveal>
          <aside className="contact-direct">
            <p className="contact-direct-label">
              {locale === "en" ? "Direct contact" : "Contacto directo"}
            </p>
            <h2>{content.contact.directTitle}</h2>
            <p>{content.contact.directBody}</p>
            <a className="button button-primary" href={businessFacts.phoneHref}>
              {content.common.call}
            </a>
            <a className="button button-secondary" href={businessFacts.smsHref}>
              {content.common.text}
            </a>
            <dl className="contact-facts">
              <div>
                <dt>{locale === "en" ? "Email" : "Correo electrónico"}</dt>
                <dd>
                  <a href={businessFacts.emailHref}>{businessFacts.email}</a>
                </dd>
              </div>
              <div>
                <dt>
                  {locale === "en" ? "Mailing address" : "Dirección postal"}
                </dt>
                <dd>{businessFacts.mailingAddress.formatted}</dd>
              </div>
            </dl>
          </aside>
          <div className="form-stage">
            <ContactForm locale={locale} initialService={initialService} />
            <p className="privacy-callout">{content.contact.privacyNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
