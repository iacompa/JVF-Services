import { businessFacts } from "@/content/business";
import type { Locale } from "@/content/types";
import type {
  GoogleReviewLinks,
  GoogleReviewsFeed,
} from "@/lib/google-business-reviews";

const copy = {
  en: {
    eyebrow: "Client reviews",
    heading: "What our clients say",
    previousIntro:
      "Real feedback originally submitted and published on our previous company website.",
    average: "Average rating",
    previousCount: (count: number) =>
      `${count} ${count === 1 ? "review" : "reviews"} from our previous website`,
    googleCount: (count: number) =>
      `${count} ${count === 1 ? "Google review" : "Google reviews"}`,
    googleIntro:
      "Current reviews are published by customers on Google and displayed here without changing their ratings.",
    googleSource: "Reviews from Google",
    previousSource: "From our previous website",
    leaveReview: "Leave a review on Google",
    readAll: "Read all reviews on Google",
    googleReview: "Google review",
    googleMaps: "Google Maps",
    ratingOnly: "This customer left a star rating without a written comment.",
    rating: (value: number) => `Rated ${value} out of 5 stars`,
  },
  es: {
    eyebrow: "Reseñas de clientes",
    heading: "Lo que dicen nuestros clientes",
    previousIntro:
      "Opiniones reales enviadas y publicadas originalmente en el sitio web anterior de la empresa.",
    average: "Calificación promedio",
    previousCount: (count: number) =>
      `${count} ${count === 1 ? "reseña" : "reseñas"} de nuestro sitio web anterior`,
    googleCount: (count: number) =>
      `${count} ${count === 1 ? "reseña de Google" : "reseñas de Google"}`,
    googleIntro:
      "Las reseñas actuales son publicadas por clientes en Google y se muestran aquí sin cambiar sus calificaciones.",
    googleSource: "Reseñas de Google",
    previousSource: "De nuestro sitio web anterior",
    leaveReview: "Dejar una reseña en Google",
    readAll: "Leer todas las reseñas en Google",
    googleReview: "Reseña de Google",
    googleMaps: "Google Maps",
    ratingOnly: "Este cliente dejó una calificación sin un comentario escrito.",
    rating: (value: number) => `Calificación: ${value} de 5 estrellas`,
  },
} as const;

function formatReviewDate(date: string, locale: Locale) {
  const value = date.length === 10 ? `${date}T00:00:00Z` : date;
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(value));
}

function ReviewStars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="review-stars" role="img" aria-label={label}>
      <span aria-hidden="true">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </span>
    </span>
  );
}

export function ReviewsSection({
  locale,
  googleFeed = null,
  googleLinks = {},
}: {
  locale: Locale;
  googleFeed?: GoogleReviewsFeed | null;
  googleLinks?: GoogleReviewLinks;
}) {
  const labels = copy[locale];
  const reviews = businessFacts.reviews;
  const previousAverage = (
    reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
  ).toFixed(1);
  const hasGoogleReviews = Boolean(googleFeed?.reviews.length);
  const displayedAverage = googleFeed
    ? googleFeed.averageRating.toFixed(1)
    : previousAverage;
  const displayedCount = googleFeed
    ? labels.googleCount(googleFeed.totalReviewCount)
    : labels.previousCount(reviews.length);

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
            <p>{googleFeed ? labels.googleIntro : labels.previousIntro}</p>
            {(googleLinks.writeReviewUrl || googleLinks.allReviewsUrl) && (
              <div className="reviews-actions">
                {googleLinks.writeReviewUrl && (
                  <a
                    className="button button-primary"
                    href={googleLinks.writeReviewUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {labels.leaveReview}
                  </a>
                )}
                {googleLinks.allReviewsUrl && (
                  <a
                    className="text-action"
                    href={googleLinks.allReviewsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {labels.readAll}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="reviews-score" aria-label={`${displayedAverage} / 5`}>
            <span>{displayedAverage}</span>
            <div>
              <strong>{labels.average}</strong>
              <small>{displayedCount}</small>
            </div>
          </div>
        </div>

        {hasGoogleReviews && googleFeed && (
          <div className="reviews-source-group">
            <div className="reviews-source-heading">
              <h3>{labels.googleSource}</h3>
              <a
                href={
                  googleLinks.allReviewsUrl ??
                  googleLinks.writeReviewUrl ??
                  "https://www.google.com/maps"
                }
                target="_blank"
                rel="noreferrer"
                aria-label={
                  googleLinks.allReviewsUrl || googleLinks.writeReviewUrl
                    ? labels.readAll
                    : labels.googleMaps
                }
              >
                Google
              </a>
            </div>
            <div className="reviews-grid google-reviews-grid">
              {googleFeed.reviews.map((review, index) => (
                <figure
                  className={`review-card ${index === 0 ? "review-card-featured" : ""}`}
                  data-reveal
                  key={review.id}
                >
                  <div className="review-card-meta">
                    <ReviewStars
                      rating={review.rating}
                      label={labels.rating(review.rating)}
                    />
                    <time dateTime={review.publishedAt}>
                      {formatReviewDate(review.publishedAt, locale)}
                    </time>
                  </div>

                  <blockquote>
                    <p>{review.text || labels.ratingOnly}</p>
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
                      <small>{labels.googleReview}</small>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {googleFeed && (
          <div className="reviews-source-heading previous-review-heading">
            <h3>{labels.previousSource}</h3>
            <p>{labels.previousIntro}</p>
          </div>
        )}

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <figure
              className={`review-card ${index === 0 ? "review-card-featured" : ""}`}
              data-reveal
              key={review.id}
            >
              <div className="review-card-meta">
                <ReviewStars
                  rating={review.rating}
                  label={labels.rating(review.rating)}
                />
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
