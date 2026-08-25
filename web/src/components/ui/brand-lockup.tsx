import Link from "next/link";

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
      aria-label={`JVF Services — ${homeLabel}`}
      translate="no"
    >
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 44 44" focusable="false">
          <path className="brand-roof" d="M5 24 22 9l17 15" />
          <path className="brand-home" d="M10 23v14h24V23" />
          <path className="brand-door" d="M19 37V25h6v12" />
          <path className="brand-spark" d="M34 5v8M30 9h8" />
        </svg>
      </span>
      <span className="brand-name">
        <span>JVF</span>
        <strong>Services</strong>
      </span>
    </Link>
  );
}
