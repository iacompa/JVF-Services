import "server-only";

import { unstable_cache } from "next/cache";
import {
  normalizeGoogleReview,
  type GoogleReviewLinks,
  type GoogleReviewsFeed,
  type GoogleBusinessProfileReviewsResponse,
} from "./google-business-reviews";

const GOOGLE_REVIEWS_CACHE_SECONDS = 21_600;
const GOOGLE_REVIEWS_PAGE_SIZE = 50;

type GoogleBusinessProfileConfig = {
  accountId: string;
  locationId: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

function readGoogleBusinessProfileConfig(): GoogleBusinessProfileConfig | null {
  const accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID;
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!accountId || !locationId || !clientId || !clientSecret || !refreshToken)
    return null;

  return { accountId, locationId, clientId, clientSecret, refreshToken };
}

function parsePublicUrl(value: string | undefined) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function getGoogleReviewLinks(): GoogleReviewLinks {
  return {
    writeReviewUrl: parsePublicUrl(process.env.GOOGLE_REVIEW_URL),
    allReviewsUrl: parsePublicUrl(process.env.GOOGLE_REVIEWS_URL),
  };
}

async function requestGoogleAccessToken(
  config: GoogleBusinessProfileConfig,
): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(
      `Google OAuth request failed with status ${response.status}`,
    );
  }

  const body = (await response.json()) as { access_token?: string };
  if (!body.access_token)
    throw new Error("Google OAuth returned no access token");

  return body.access_token;
}

async function loadGoogleBusinessReviews(): Promise<GoogleReviewsFeed | null> {
  const config = readGoogleBusinessProfileConfig();
  if (!config) return null;

  const accessToken = await requestGoogleAccessToken(config);
  const reviews = [];
  const seenPageTokens = new Set<string>();
  let pageToken: string | undefined;
  let averageRating = 0;
  let totalReviewCount = 0;

  do {
    const endpoint = new URL(
      `https://mybusiness.googleapis.com/v4/accounts/${encodeURIComponent(config.accountId)}/locations/${encodeURIComponent(config.locationId)}/reviews`,
    );
    endpoint.searchParams.set("pageSize", String(GOOGLE_REVIEWS_PAGE_SIZE));
    if (pageToken) endpoint.searchParams.set("pageToken", pageToken);

    const response = await fetch(endpoint, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(
        `Google Business Profile reviews request failed with status ${response.status}`,
      );
    }

    const body =
      (await response.json()) as GoogleBusinessProfileReviewsResponse;
    averageRating = body.averageRating ?? averageRating;
    totalReviewCount = body.totalReviewCount ?? totalReviewCount;

    for (const item of body.reviews ?? []) {
      const review = normalizeGoogleReview(item);
      if (review) reviews.push(review);
    }

    const nextPageToken = body.nextPageToken;
    if (!nextPageToken || seenPageTokens.has(nextPageToken)) break;
    seenPageTokens.add(nextPageToken);
    pageToken = nextPageToken;
  } while (pageToken);

  reviews.sort(
    (left, right) =>
      Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
  );

  return { averageRating, totalReviewCount, reviews };
}

const getCachedGoogleBusinessReviews = unstable_cache(
  loadGoogleBusinessReviews,
  ["google-business-profile-reviews"],
  {
    revalidate: GOOGLE_REVIEWS_CACHE_SECONDS,
    tags: ["google-business-profile-reviews"],
  },
);

export async function getGoogleBusinessReviews() {
  if (!readGoogleBusinessProfileConfig()) return null;

  try {
    return await getCachedGoogleBusinessReviews();
  } catch (error) {
    console.error(
      "Unable to load Google Business Profile reviews:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return null;
  }
}
