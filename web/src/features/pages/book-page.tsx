import Link from "next/link";
import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { getGoogleWorkflow } from "@/lib/google-workflow";

export function BookPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const workflow = getGoogleWorkflow();
  const copy = content.book;

  return (
    <>
      <section className="page-hero booking-hero">
        <div className="site-container booking-hero-grid">
          <div className="narrow-heading">
            <p className="page-kicker">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
          </div>
          <div className="booking-duration" aria-label={copy.durationLabel}>
            <strong>15</strong>
            <span>{copy.minutes}</span>
          </div>
        </div>
      </section>
      <section className="page-section booking-section">
        <div className="site-container booking-layout">
          <div className="booking-copy" data-reveal>
            <p className="section-number" aria-hidden="true">
              01 /
            </p>
            <h2>{copy.consultationTitle}</h2>
            <p>{copy.consultationBody}</p>
            <ul className="booking-checklist">
              {copy.consultationPoints.map((point) => (
                <li key={point}>
                  <span aria-hidden="true">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <aside className="booking-panel" data-reveal>
            {workflow.bookingUrl ? (
              <>
                <p className="booking-panel-label">{copy.calendarLabel}</p>
                <h2>{copy.calendarTitle}</h2>
                <p>{copy.calendarBody}</p>
                <a className="button button-primary" href={workflow.bookingUrl}>
                  {copy.openCalendar}
                </a>
              </>
            ) : (
              <>
                <p className="booking-panel-label">{copy.fallbackLabel}</p>
                <h2>{copy.fallbackTitle}</h2>
                <p>{copy.fallbackBody}</p>
                <a
                  className="button button-primary"
                  href={businessFacts.phoneHref}
                >
                  {content.common.call}
                </a>
                <a
                  className="button button-secondary"
                  href={businessFacts.smsHref}
                >
                  {content.common.text}
                </a>
              </>
            )}
            <Link
              className="text-action"
              href={localizedHref("contact", locale)}
            >
              {copy.requestInstead}
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
