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
        src="/assets/jvf/jvf-homeworks-pro-logo.png"
        alt=""
        width={300}
        height={195}
        sizes="(max-width: 720px) 124px, 154px"
      />
    </Link>
  );
}
