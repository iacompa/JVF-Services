import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { FeaturedServiceCard } from "@/components/ui/featured-service-card";

export function ServicesPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <>
      <section className="page-hero simple-page-hero">
        <div className="site-container narrow-heading" data-reveal>
          <p className="page-kicker">{content.services.eyebrow}</p>
          <h1>{content.services.title}</h1>
          <p>{content.services.intro}</p>
        </div>
      </section>
      <section className="page-section">
        <div className="site-container grouped-services">
          <div className="service-group" data-reveal>
            <h2>{content.services.homeGroup}</h2>
            <div className="featured-service-list">
              <FeaturedServiceCard
                locale={locale}
                serviceKey="housekeeping"
                number="01"
                service={content.serviceDetails.housekeeping}
                href={localizedHref("housekeeping", locale)}
              />
              <FeaturedServiceCard
                locale={locale}
                serviceKey="decoration"
                number="02"
                service={content.serviceDetails.decoration}
                href={localizedHref("decoration", locale)}
              />
            </div>
          </div>
          <div className="service-group" data-reveal>
            <h2>{content.services.professionalGroup}</h2>
            <div className="featured-service-list">
              <FeaturedServiceCard
                locale={locale}
                serviceKey="notary"
                number="03"
                service={content.serviceDetails.notary}
                href={localizedHref("notary", locale)}
              />
              <FeaturedServiceCard
                locale={locale}
                serviceKey="interpreting"
                number="04"
                service={content.serviceDetails.interpreting}
                href={localizedHref("interpreting", locale)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
