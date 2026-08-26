import Image from "next/image";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { CallToAction } from "@/components/ui/call-to-action";

export function GalleryPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);

  return (
    <>
      <section className="page-hero gallery-hero">
        <div className="site-container narrow-heading">
          <p className="page-kicker">{content.gallery.eyebrow}</p>
          <h1>{content.gallery.title}</h1>
          <p>{content.gallery.intro}</p>
        </div>
      </section>
      <section className="page-section gallery-section">
        <div className="site-container gallery-grid">
          <figure className="gallery-feature gallery-feature-wide">
            <Image
              src="/assets/jvf/project-basement-wide.jpg"
              alt={content.gallery.firstCaption}
              width={948}
              height={706}
              sizes="(max-width: 900px) 100vw, 58vw"
            />
            <figcaption>{content.gallery.firstCaption}</figcaption>
          </figure>
          <figure className="gallery-feature">
            <Image
              src="/assets/jvf/project-basement-detail.jpg"
              alt={content.gallery.secondCaption}
              width={1290}
              height={948}
              sizes="(max-width: 900px) 100vw, 42vw"
            />
            <figcaption>{content.gallery.secondCaption}</figcaption>
          </figure>
        </div>
      </section>
      <div className="site-container page-section compact-section">
        <CallToAction
          locale={locale}
          title={
            locale === "en"
              ? "Have a project in mind?"
              : "¿Tiene un proyecto en mente?"
          }
          body={
            locale === "en"
              ? "Tell us about the space, your goals, and your preferred timing."
              : "Cuéntenos sobre el espacio, sus objetivos y el horario que prefiere."
          }
          href={localizedHref("contact", locale)}
          label={content.common.requestQuote}
        />
      </div>
    </>
  );
}
