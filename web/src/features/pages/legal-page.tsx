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
  const title =
    route === "terms"
      ? content.legal.termsTitle
      : route === "privacy"
        ? content.legal.privacyTitle
        : content.legal.accessibilityTitle;
  return (
    <section className="page-section legal-page">
      <div className="site-container legal-copy">
        <h1>{title}</h1>
        <p className="legal-date">{content.legal.lastUpdated}</p>
        <h2>{locale === "en" ? "Review version" : "Versión para revisión"}</h2>
        <p>
          {locale === "en"
            ? "This page is part of the local website review and will contain the full launch-ready policy before publication."
            : "Esta página forma parte de la revisión local y contendrá la política completa antes de la publicación."}
        </p>
      </div>
    </section>
  );
}
