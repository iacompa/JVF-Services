import Image from "next/image";
import Link from "next/link";
import type { Locale, ServiceCopy, ServiceKey } from "@/content/types";

const artwork: Partial<
  Record<ServiceKey, { src: string; width: number; height: number }>
> = {
  housekeeping: {
    src: "/assets/jvf/cleaning-hero.jpg",
    width: 1600,
    height: 1000,
  },
  decoration: {
    src: "/assets/jvf/decoration-cabinet.png",
    width: 452,
    height: 444,
  },
};

export function FeaturedServiceCard({
  locale,
  serviceKey,
  number,
  service,
  href,
}: {
  locale: Locale;
  serviceKey: ServiceKey;
  number: string;
  service: ServiceCopy;
  href: string;
}) {
  const serviceArtwork = artwork[serviceKey];
  const included = locale === "en" ? "What’s included?" : "¿Qué incluye?";
  const getStarted = locale === "en" ? "View service" : "Ver servicio";

  return (
    <article
      className={`featured-service-card featured-service-${serviceKey}`}
      data-reveal
    >
      <div className="featured-service-copy">
        <div className="featured-service-heading">
          <h3>
            <Link href={href}>{service.title}</Link>
          </h3>
          <span className="featured-service-number" aria-hidden="true">
            {number}
          </span>
        </div>
        <p className="featured-service-included">
          <span aria-hidden="true">✦</span>
          {included}
        </p>
        <p className="featured-service-summary">{service.summary}</p>
        <ul>
          {service.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="featured-service-footer">
          <p>{service.cardPrice}</p>
          <Link
            className="featured-service-action"
            href={href}
            aria-label={`${getStarted}: ${service.title}`}
          >
            {getStarted}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="featured-service-artwork" aria-hidden="true">
        {serviceArtwork ? (
          <Image
            src={serviceArtwork.src}
            alt=""
            width={serviceArtwork.width}
            height={serviceArtwork.height}
            sizes="(max-width: 760px) 70vw, 34vw"
          />
        ) : (
          <div className="featured-service-monogram">
            <span>JVF</span>
            <strong>{serviceKey === "notary" ? "NOTARY" : "ES / EN"}</strong>
            <i>✦</i>
          </div>
        )}
      </div>
    </article>
  );
}
