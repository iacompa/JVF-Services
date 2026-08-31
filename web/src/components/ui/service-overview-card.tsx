import Link from "next/link";
import type { ReactNode } from "react";
import type { ServiceCopy, ServiceKey } from "@/content/types";

const icons: Record<ServiceKey, ReactNode> = {
  housekeeping: <path d="M6 18h12M8 18l1.8-7h4.4L16 18M12 4v7M9.5 6.5h5" />,
  decoration: <path d="M5 19V8h14v11M8 19v-5h8v5M9 8V5h6v3" />,
  notary: <path d="M7 4h8l3 3v13H7zM15 4v4h3M10 12h5M10 15h5" />,
  interpreting: <path d="M4 5h10v8H8l-4 3zm8 4h8v8h-4l-4 3z" />,
};

export function ServiceOverviewCard({
  number,
  serviceKey,
  service,
  href,
  actionLabel,
}: {
  number: string;
  serviceKey: ServiceKey;
  service: ServiceCopy;
  href: string;
  actionLabel: string;
}) {
  return (
    <article
      className="service-overview-card"
      data-testid="service-overview-card"
      data-reveal
    >
      <div className="service-overview-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          {icons[serviceKey]}
        </svg>
      </div>
      <div className="service-overview-copy">
        <span>{number}</span>
        <h3>
          <Link href={href}>{service.title}</Link>
        </h3>
        <p>{service.summary}</p>
      </div>
      <Link
        className="service-overview-action"
        href={href}
        aria-label={`${actionLabel}: ${service.title}`}
      >
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
