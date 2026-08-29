import Image from "next/image";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { CallToAction } from "@/components/ui/call-to-action";
import { businessFacts } from "@/content/business";

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
          <figure className="about-founder-portrait" data-reveal>
            <Image
              src="/assets/jvf/jacqueline-valentin-founder.jpg"
              alt={content.about.founderImageAlt}
              width={1300}
              height={1024}
              sizes="(max-width: 900px) 100vw, 42vw"
              priority
            />
            <figcaption>
              <strong>{businessFacts.owner}</strong>
              <span>{content.about.founderRole}</span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="founder-statement-section page-section">
        <div className="site-container founder-statement-grid" data-reveal>
          <div className="founder-identity">
            <span aria-hidden="true">01 /</span>
            <p className="page-kicker">{content.about.founderEyebrow}</p>
            <h2>{businessFacts.owner}</h2>
            <p>{content.about.founderRole}</p>
          </div>
          <blockquote className="founder-statement">
            <span aria-hidden="true">“</span>
            <p>{content.about.founderStatement}</p>
          </blockquote>
        </div>
      </section>
      <section className="page-section">
        <div className="site-container mission-grid" data-reveal>
          <h2>{content.about.missionTitle}</h2>
          <p>{content.about.missionBody}</p>
        </div>
      </section>
      <section className="values-section page-section">
        <div className="site-container">
          <h2>{content.about.valuesHeading}</h2>
          <div className="values-list">
            {content.about.values.map((value, index) => (
              <article key={value.title} data-reveal>
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
              ? `How can ${businessFacts.publicName} help?`
              : `¿Cómo puede ayudarle ${businessFacts.publicName}?`
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
