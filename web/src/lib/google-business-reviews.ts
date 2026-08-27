export const googleStarRatings = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
} as const;

export type GoogleReview = {
  id: string;
  author: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  publishedAt: string;
};

export type GoogleReviewsFeed = {
  averageRating: number;
  totalReviewCount: number;
  reviews: GoogleReview[];
};

export type GoogleReviewLinks = {
  writeReviewUrl?: string;
  allReviewsUrl?: string;
};

export type GoogleBusinessProfileReview = {
  reviewId?: string;
  reviewer?: {
    displayName?: string;
    profilePhotoUrl?: string;
  };
  starRating?: keyof typeof googleStarRatings;
  comment?: string;
  createTime?: string;
  updateTime?: string;
};

export type GoogleBusinessProfileReviewsResponse = {
  reviews?: GoogleBusinessProfileReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
};

export function normalizeGoogleReview(
  review: GoogleBusinessProfileReview,
): GoogleReview | null {
  const rating = review.starRating
    ? googleStarRatings[review.starRating]
    : undefined;
  const publishedAt = review.updateTime ?? review.createTime;

  if (
    !review.reviewId ||
    !rating ||
    !publishedAt ||
    Number.isNaN(Date.parse(publishedAt))
  )
    return null;

  return {
    id: review.reviewId,
    author: review.reviewer?.displayName?.trim() || "Google user",
    authorPhotoUrl: review.reviewer?.profilePhotoUrl,
    rating,
    text: review.comment?.trim() || "",
    publishedAt,
  };
}
