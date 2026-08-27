import { businessFacts } from "@/content/business";
import type { Locale } from "@/content/types";

const copy = {
  en: {
    eyebrow: "Client feedback",
    heading: "What our clients say",
    intro:
      "Real feedback originally submitted and published on the previous JVF HomeWorks Pro website.",
    average: "Average rating",
    count: "3 customer reviews",
    rating: (value: number) => `Rated ${value} out of 5 stars`,
  },
  es: {
    eyebrow: "Opiniones de clientes",
    heading: "Lo que dicen nuestros clientes",
    intro:
      "Opiniones reales enviadas y publicadas originalmente en el sitio web anterior de JVF HomeWorks Pro.",
    average: "Calificación promedio",
    count: "3 reseñas de clientes",
    rating: (value: number) => `Calificación: ${value} de 5 estrellas`,
  },
} as const;

function formatReviewDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function ReviewsSection({ locale }: { locale: Locale }) {
  const labels = copy[locale];
  const reviews = businessFacts.reviews;
  const averageRating = (
    reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section
      className="reviews-section page-section"
      aria-labelledby="reviews-heading"
    >
      <div className="site-container">
        <div className="reviews-heading-grid" data-reveal>
          <div className="section-intro reviews-intro">
            <p className="page-kicker">{labels.eyebrow}</p>
            <h2 id="reviews-heading">{labels.heading}</h2>
            <p>{labels.intro}</p>
          </div>
          <div className="reviews-score" aria-label={`${averageRating} / 5`}>
            <span>{averageRating}</span>
            <div>
              <strong>{labels.average}</strong>
              <small>{labels.count}</small>
            </div>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <figure
              className={`review-card ${index === 0 ? "review-card-featured" : ""}`}
              data-reveal
              key={review.id}
            >
              <div className="review-card-meta">
                <span
                  className="review-stars"
                  role="img"
                  aria-label={labels.rating(review.rating)}
                >
                  <span aria-hidden="true">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </span>
                <time dateTime={review.date}>
                  {formatReviewDate(review.date, locale)}
                </time>
              </div>

              <blockquote>
                {review.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </blockquote>

              <figcaption>
                <span className="review-avatar" aria-hidden="true">
                  {review.author
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span>
                  <strong>{review.author}</strong>
                  <small>{review.title}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
