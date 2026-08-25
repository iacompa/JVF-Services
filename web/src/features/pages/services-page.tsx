import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { ServiceCard } from "@/components/ui/service-card";

export function ServicesPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <>
      <section className="page-hero simple-page-hero">
        <div className="site-container narrow-heading">
          <p className="page-kicker">{content.services.eyebrow}</p>
          <h1>{content.services.title}</h1>
          <p>{content.services.intro}</p>
        </div>
      </section>
      <section className="page-section">
        <div className="site-container grouped-services">
          <div className="service-group">
            <h2>{content.services.homeGroup}</h2>
            <div className="service-list">
              <ServiceCard
                number="01"
                service={content.serviceDetails.housekeeping}
                href={localizedHref("housekeeping", locale)}
                learnMore={content.common.learnMore}
              />
              <ServiceCard
                number="02"
                service={content.serviceDetails.decoration}
                href={localizedHref("decoration", locale)}
                learnMore={content.common.learnMore}
              />
            </div>
          </div>
          <div className="service-group">
            <h2>{content.services.professionalGroup}</h2>
            <div className="service-list">
              <ServiceCard
                number="03"
                service={content.serviceDetails.notary}
                href={localizedHref("notary", locale)}
                learnMore={content.common.learnMore}
              />
              <ServiceCard
                number="04"
                service={content.serviceDetails.interpreting}
                href={localizedHref("interpreting", locale)}
                learnMore={content.common.learnMore}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
