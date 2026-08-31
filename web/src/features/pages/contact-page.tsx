import Link from "next/link";
import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import type { ServiceId } from "@/features/contact/types";
import { localizedHref } from "@/lib/i18n";
import { getGoogleWorkflow } from "@/lib/google-workflow";

export function ContactPage({
  locale,
  initialService,
}: {
  locale: Locale;
  initialService?: ServiceId;
}) {
  const content = getContent(locale);
  const workflow = getGoogleWorkflow();
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
            <div className="hero-actions contact-hero-actions">
              <a className="button button-primary" href="#request-service">
                {content.common.requestQuote}
              </a>
              <Link
                className="button button-secondary"
                href={localizedHref("book", locale)}
              >
                {locale === "en"
                  ? "Book a Consultation"
                  : "Reservar una consulta"}
              </Link>
            </div>
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
          <div className="form-stage" id="request-service">
            <p className="form-stage-kicker">
              {locale === "en" ? "Service request" : "Solicitud de servicio"}
            </p>
            <h2>{content.contact.formTitle}</h2>
            <p>
              {locale === "en"
                ? "Use the bilingual Google form to share only the practical details needed to review your request. Submitting the form does not confirm a booking or final price."
                : "Use el formulario bilingüe de Google para compartir solo los datos prácticos necesarios. Enviar el formulario no confirma una reserva ni el precio final."}
            </p>
            {initialService && initialService !== "general" ? (
              <p className="selected-service-note">
                {locale === "en" ? "Selected service" : "Servicio seleccionado"}
                :{" "}
                <strong>{content.serviceDetails[initialService].title}</strong>
              </p>
            ) : null}
            {workflow.requestFormUrl ? (
              <a
                className="button button-primary"
                href={workflow.requestFormUrl}
              >
                {locale === "en"
                  ? "Open secure request form"
                  : "Abrir formulario seguro"}
              </a>
            ) : (
              <div className="workflow-fallback" role="status">
                <h3>
                  {locale === "en"
                    ? "Online form setup in progress"
                    : "Configuración del formulario en proceso"}
                </h3>
                <p>
                  {locale === "en"
                    ? "Call, text, or email us now and we will take your request directly."
                    : "Llame, envíe un mensaje o correo y tomaremos su solicitud directamente."}
                </p>
                <div className="workflow-fallback-actions">
                  <a
                    className="button button-primary"
                    href={businessFacts.phoneHref}
                  >
                    {content.common.call}
                  </a>
                  <a
                    className="button button-secondary"
                    href={businessFacts.emailHref}
                  >
                    {locale === "en" ? "Email JVF Services" : "Enviar correo"}
                  </a>
                </div>
              </div>
            )}
            <p className="privacy-callout">{content.contact.privacyNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
