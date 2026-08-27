import { describe, expect, test } from "vitest";
import { normalizeGoogleReview } from "./google-business-reviews";

describe("normalizeGoogleReview", () => {
  test("maps a Google Business Profile review into public display data", () => {
    expect(
      normalizeGoogleReview({
        reviewId: "review-123",
        reviewer: {
          displayName: "  Ana Customer  ",
          profilePhotoUrl: "https://example.com/ana.jpg",
        },
        starRating: "FIVE",
        comment: "  Excellent service.  ",
        createTime: "2026-08-01T12:00:00Z",
        updateTime: "2026-08-02T12:00:00Z",
      }),
    ).toEqual({
      id: "review-123",
      author: "Ana Customer",
      authorPhotoUrl: "https://example.com/ana.jpg",
      rating: 5,
      text: "Excellent service.",
      publishedAt: "2026-08-02T12:00:00Z",
    });
  });

  test("supports rating-only reviews and anonymous display names", () => {
    expect(
      normalizeGoogleReview({
        reviewId: "review-456",
        starRating: "FOUR",
        createTime: "2026-08-03T12:00:00Z",
      }),
    ).toEqual({
      id: "review-456",
      author: "Google user",
      authorPhotoUrl: undefined,
      rating: 4,
      text: "",
      publishedAt: "2026-08-03T12:00:00Z",
    });
  });

  test("rejects incomplete records instead of rendering misleading content", () => {
    expect(normalizeGoogleReview({ reviewId: "missing-rating" })).toBeNull();
    expect(
      normalizeGoogleReview({
        reviewId: "missing-date",
        starRating: "FIVE",
      }),
    ).toBeNull();
    expect(
      normalizeGoogleReview({
        reviewId: "invalid-date",
        starRating: "FIVE",
        createTime: "not-a-date",
      }),
    ).toBeNull();
  });
});
