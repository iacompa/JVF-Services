export const routePaths = {
  home: "/",
  services: "/services",
  housekeeping: "/services/housekeeping",
  remodeling: "/services/home-remodeling",
  decoration: "/services/home-decoration",
  notary: "/services/notary",
  interpreting: "/services/interpreting",
  gallery: "/gallery",
  about: "/about",
  contact: "/contact",
  terms: "/terms",
  privacy: "/privacy",
  accessibility: "/accessibility",
} as const;

export type RouteKey = keyof typeof routePaths;

export const routeKeys = Object.freeze(Object.keys(routePaths) as RouteKey[]);
