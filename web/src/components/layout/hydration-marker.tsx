"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HydrationMarker() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang =
      pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
    document.documentElement.dataset.hydrated = "true";
    return () => {
      delete document.documentElement.dataset.hydrated;
    };
  }, [pathname]);

  return null;
}
