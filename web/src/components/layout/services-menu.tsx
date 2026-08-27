"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";

export function ServicesMenu({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const content = getContent(locale);
  const panelId = `services-menu-${locale}`;

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div className="services-menu" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="nav-disclosure"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {content.nav.services}
        <span aria-hidden="true" className="disclosure-mark">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div id={panelId} className="services-panel" hidden={!isOpen}>
        <div className="service-link-group">
          <p>{content.nav.homeServices}</p>
          <Link href={localizedHref("housekeeping", locale)}>
            {content.serviceDetails.housekeeping.title}
          </Link>
          <Link href={localizedHref("decoration", locale)}>
            {content.serviceDetails.decoration.title}
          </Link>
        </div>
        <div className="service-link-group">
          <p>{content.nav.professionalServices}</p>
          <Link href={localizedHref("notary", locale)}>
            {content.serviceDetails.notary.title}
          </Link>
          <Link href={localizedHref("interpreting", locale)}>
            {content.serviceDetails.interpreting.title}
          </Link>
        </div>
        <Link
          className="services-overview-link"
          href={localizedHref("services", locale)}
        >
          {locale === "en" ? "View all services" : "Ver todos los servicios"}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
