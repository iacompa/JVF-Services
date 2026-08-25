import Link from "next/link";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";

interface LanguageSwitcherProps {
  locale: Locale;
  route: RouteKey;
  compact?: boolean;
}

export function LanguageSwitcher({
  locale,
  route,
  compact = false,
}: LanguageSwitcherProps) {
  return (
    <nav
      aria-label={locale === "en" ? "Language" : "Idioma"}
      className={compact ? "language-switcher is-compact" : "language-switcher"}
    >
      <Link
        href={localizedHref(route, "en")}
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "page" : undefined}
      >
        English
      </Link>
      <span aria-hidden="true">/</span>
      <Link
        href={localizedHref(route, "es")}
        hrefLang="es"
        lang="es"
        aria-current={locale === "es" ? "page" : undefined}
      >
        Español
      </Link>
    </nav>
  );
}
