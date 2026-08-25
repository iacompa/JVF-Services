import Link from "next/link";
import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale, ServiceKey } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { AssetSlot } from "@/components/ui/asset-slot";
import { CallToAction } from "@/components/ui/call-to-action";
import { ServiceCard } from "@/components/ui/service-card";

const serviceRoutes: Record<
  ServiceKey,
  "housekeeping" | "decoration" | "notary" | "interpreting"
> = {
  housekeeping: "housekeeping",
  decoration: "decoration",
  notary: "notary",
  interpreting: "interpreting",
};

export function HomePage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const services = Object.entries(content.serviceDetails) as Array<
    [ServiceKey, (typeof content.serviceDetails)[ServiceKey]]
  >;

  return (
    <>
      <section className="home-hero page-section">
        <div className="site-container hero-grid">
          <div className="hero-copy">
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
                href={localizedHref("services", locale)}
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
          <AssetSlot
            variant="hero"
            label={
              locale === "en"
                ? "Future JVF service photograph"
                : "Próxima fotografía de un servicio JVF"
            }
            description={
              locale === "en"
                ? "A bright, real home-care image will be added before launch."
                : "Se añadirá una imagen real y luminosa del servicio antes del lanzamiento."
            }
          />
        </div>
      </section>

      <section className="availability-band">
        <div className="site-container availability-grid">
          <p className="availability-index" aria-hidden="true">
            24/7
          </p>
          <div>
            <h2>{content.home.availabilityTitle}</h2>
            <p>{content.home.availabilityBody}</p>
          </div>
          <Link
            href={`${localizedHref("contact", locale)}?service=interpreting`}
            className="text-action dark-action"
          >
            {content.serviceDetails.interpreting.cta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="page-section service-index-section">
        <div className="site-container">
          <div className="section-intro split-intro">
            <h2>{content.home.servicesHeading}</h2>
            <p>{content.home.servicesIntro}</p>
          </div>
          <div className="service-list">
            {services.map(([key, service], index) => (
              <ServiceCard
                key={key}
                number={String(index + 1).padStart(2, "0")}
                service={service}
                href={localizedHref(serviceRoutes[key], locale)}
                learnMore={content.common.learnMore}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="why-section page-section">
        <div className="site-container why-grid">
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
