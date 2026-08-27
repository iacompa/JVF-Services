import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ReviewsSection } from "./reviews-section";

describe("ReviewsSection", () => {
  test("keeps Google reviews separate and links submissions back to Google", () => {
    render(
      <ReviewsSection
        locale="en"
        googleFeed={{
          averageRating: 4.9,
          totalReviewCount: 12,
          reviews: [
            {
              id: "google-review-1",
              author: "Google Customer",
              rating: 5,
              text: "Professional, careful, and on time.",
              publishedAt: "2026-08-20T12:00:00Z",
            },
          ],
        }}
        googleLinks={{
          writeReviewUrl: "https://g.page/r/example/review",
          allReviewsUrl: "https://www.google.com/maps/place/example",
        }}
      />,
    );

    expect(screen.getByText("12 Google reviews")).toBeVisible();
    expect(screen.getByText("Reviews from Google")).toBeVisible();
    expect(screen.getByText("From our previous website")).toBeVisible();
    expect(screen.getByText("Google Customer")).toBeVisible();
    expect(screen.getByText("Rebecca Hawland")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Leave a review on Google" }),
    ).toHaveAttribute("href", "https://g.page/r/example/review");
  });
});
