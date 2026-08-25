import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import type { RouteKey } from "@/lib/routes";

export function LegalPage({
  locale,
  route,
}: {
  locale: Locale;
  route: Extract<RouteKey, "terms" | "privacy" | "accessibility">;
}) {
  const content = getContent(locale);
  const page = content.legal[route];
  return (
    <section className="page-section legal-page">
      <div className="site-container legal-copy">
        <p className="legal-status">{page.status}</p>
        <h1>{page.title}</h1>
        <p className="legal-date">{content.legal.lastUpdated}</p>
        <p className="legal-introduction">{page.introduction}</p>
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        {route === "terms" ? (
          <p className="legal-resource">
            <a href="https://www.ohiosos.gov/notary/become-a-notary-in-ohio/resources-and-frequently-asked-questions">
              {content.legal.officialNotaryResource}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
