"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = "[data-reveal]";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia(reducedMotionQuery).matches;

    delete root.dataset.revealReady;

    if (
      prefersReducedMotion ||
      typeof window.IntersectionObserver !== "function"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    for (const target of document.querySelectorAll(revealSelector)) {
      observer.observe(target);
    }

    root.dataset.revealReady = "true";

    return () => {
      delete root.dataset.revealReady;
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
