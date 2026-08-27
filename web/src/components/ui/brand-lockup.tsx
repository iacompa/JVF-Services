import Image from "next/image";
import Link from "next/link";
import { businessFacts } from "@/content/business";

export function BrandLockup({
  href,
  homeLabel,
  inverse = false,
}: {
  href: string;
  homeLabel: string;
  inverse?: boolean;
}) {
  return (
    <Link
      className={`brand-lockup${inverse ? " brand-lockup-inverse" : ""}`}
      href={href}
      aria-label={`${businessFacts.publicName} — ${homeLabel}`}
      translate="no"
    >
      <Image
        className="brand-logo-image"
        src="/assets/jvf/jvf-services-logo.png"
        alt=""
        width={1376}
        height={768}
        sizes="(max-width: 680px) 156px, (max-width: 1080px) 180px, 230px"
      />
    </Link>
  );
}
