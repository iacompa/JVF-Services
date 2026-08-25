import type { Locale } from "@/content/types";
import { routePaths, type RouteKey } from "@/lib/routes";

export const locales = ["en", "es"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function localizedHref(route: RouteKey, locale: Locale): string {
  const path = routePaths[route];

  if (locale === "en") {
    return path;
  }

  return path === "/" ? "/es" : `/es${path}`;
}
