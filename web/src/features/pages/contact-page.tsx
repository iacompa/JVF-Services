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
            <ContactForm locale={locale} initialService={initialService} />
            <p className="privacy-callout">{content.contact.privacyNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
