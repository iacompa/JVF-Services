import Link from "next/link";
import { businessFacts } from "@/content/business";
import type { Locale } from "@/content/types";

interface CallToActionProps {
  locale: Locale;
  title: string;
  body: string;
  href: string;
  label: string;
  showDirectActions?: boolean;
}

export function CallToAction({
  locale,
  title,
  body,
  href,
  label,
  showDirectActions = false,
}: CallToActionProps) {
  return (
    <section className="closing-cta" aria-labelledby="closing-cta-title">
      <div>
        <h2 id="closing-cta-title">{title}</h2>
        <p>{body}</p>
      </div>
      <div className="cta-actions">
        <Link className="button button-light" href={href}>
          {label}
        </Link>
        {showDirectActions ? (
          <>
            <a className="text-action" href={businessFacts.phoneHref}>
              {locale === "en" ? "Call now" : "Llamar ahora"}
            </a>
            <a className="text-action" href={businessFacts.smsHref}>
              {locale === "en" ? "Text for a callback" : "Enviar mensaje"}
            </a>
          </>
        ) : null}
      </div>
    </section>
  );
}
