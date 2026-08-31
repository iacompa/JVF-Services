import type { MetadataRoute } from "next";
import { routeKeys } from "@/lib/routes";
import { absoluteLocalizedUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return routeKeys.flatMap((route) =>
    ["en", "es"].map((locale) => ({
      url: absoluteLocalizedUrl(route, locale as "en" | "es"),
      changeFrequency:
        route === "home" ? ("weekly" as const) : ("monthly" as const),
      priority:
        route === "home"
          ? 1
          : route === "contact" || route === "book"
            ? 0.9
            : route === "gallery"
              ? 0.4
              : 0.7,
      alternates: {
        languages: {
          en: absoluteLocalizedUrl(route, "en"),
          es: absoluteLocalizedUrl(route, "es"),
        },
      },
    })),
  );
}
