import Link from "next/link";
import type { ServiceCopy } from "@/content/types";

interface ServiceCardProps {
  number: string;
  service: ServiceCopy;
  href: string;
  learnMore: string;
}

export function ServiceCard({
  number,
  service,
  href,
  learnMore,
}: ServiceCardProps) {
  return (
    <article className="service-card">
      <span className="service-number" aria-hidden="true">
        {number}
      </span>
      <div>
        <h3>
          <Link href={href}>{service.title}</Link>
        </h3>
        <p>{service.summary}</p>
        <p className="service-card-price">{service.price}</p>
      </div>
      <Link
        className="service-arrow"
        href={href}
        aria-label={`${learnMore}: ${service.title}`}
      >
        <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
