import Image from "next/image";
import Link from "next/link";
import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale, ServiceKey } from "@/content/types";
import type {
  GoogleReviewLinks,
  GoogleReviewsFeed,
} from "@/lib/google-business-reviews";
import { localizedHref } from "@/lib/i18n";
import { CallToAction } from "@/components/ui/call-to-action";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceOverviewCard } from "@/components/ui/service-overview-card";

const serviceRoutes: Record<
  ServiceKey,
  "housekeeping" | "decoration" | "notary" | "interpreting"
> = {
  housekeeping: "housekeeping",
  decoration: "decoration",
  notary: "notary",
  interpreting: "interpreting",
};

export function HomePage({
  locale,
  googleReviews,
  googleReviewLinks,
}: {
  locale: Locale;
  googleReviews?: GoogleReviewsFeed | null;
  googleReviewLinks?: GoogleReviewLinks;
}) {
  const content = getContent(locale);
  const services = Object.entries(content.serviceDetails) as Array<
    [ServiceKey, (typeof content.serviceDetails)[ServiceKey]]
  >;

  return (
    <>
      <section className="home-hero page-section">
        <Image
          className="home-hero-image"
          src="/assets/jvf/cleaning-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          preload
        />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="page-kicker">{content.home.eyebrow}</p>
            <h1>{content.home.title}</h1>
            <p className="hero-summary">{content.home.summary}</p>
            <div className="hero-actions">
              <Link
                className="button button-primary"
                href={localizedHref("contact", locale)}
              >
                {content.home.primaryCta}
              </Link>
              <Link
                className="button button-secondary"
                href={localizedHref("book", locale)}
              >
                {content.home.secondaryCta}
              </Link>
            </div>
            <div className="direct-contact-line">
              <span>
                {locale === "en"
                  ? "Prefer a direct conversation?"
                  : "¿Prefiere hablar directamente?"}
              </span>
              <a href={businessFacts.phoneHref}>{content.common.call}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section page-section">
        <div className="site-container">
          <div className="section-intro process-intro">
            <p className="page-kicker">
              {locale === "en" ? "How it works" : "Cómo funciona"}
            </p>
            <h2>{content.home.stepsHeading}</h2>
          </div>
          <div className="process-grid">
            {content.home.steps.map((step) => (
              <article key={step.number} data-reveal>
                <span aria-hidden="true">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="availability-band">
        <div className="site-container availability-grid" data-reveal>
          <p className="availability-index" aria-hidden="true">
            24/7
          </p>
          <div>
            <h2>{content.home.availabilityTitle}</h2>
            <p>{content.home.availabilityBody}</p>
          </div>
          <a href={businessFacts.phoneHref} className="text-action dark-action">
            {locale === "en" ? "Call Now" : "Llamar ahora"}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="page-section service-index-section">
        <div className="site-container">
          <div className="section-intro popular-services-intro" data-reveal>
            <p className="popular-services-kicker">
              {locale === "en"
                ? "Spotless spaces. Zero stress."
                : "Espacios impecables. Cero estrés."}
            </p>
            <h2>{content.home.servicesHeading}</h2>
            <p>{content.home.servicesIntro}</p>
          </div>
          <div className="service-overview-grid">
            {services.map(([key, service], index) => (
              <ServiceOverviewCard
                key={key}
                serviceKey={key}
                number={String(index + 1).padStart(2, "0")}
                service={service}
                href={localizedHref(serviceRoutes[key], locale)}
                actionLabel={content.common.learnMore}
              />
            ))}
          </div>
          <div className="service-index-action">
            <Link
              className="text-action"
              href={localizedHref("services", locale)}
            >
              {locale === "en"
                ? "View all service details"
                : "Ver todos los detalles"}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="why-section page-section">
        <div className="site-container why-grid" data-reveal>
          <div className="why-heading">
            <span aria-hidden="true">✦</span>
            <h2>{content.home.whyHeading}</h2>
          </div>
          <ol className="why-list">
            {content.home.whyItems.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ReviewsSection
        locale={locale}
        googleFeed={googleReviews}
        googleLinks={googleReviewLinks}
      />

      <div className="site-container page-section compact-section">
        <CallToAction
          locale={locale}
          title={content.home.closingTitle}
          body={content.home.closingBody}
          href={localizedHref("contact", locale)}
          label={content.common.requestQuote}
        />
      </div>
    </>
  );
}
