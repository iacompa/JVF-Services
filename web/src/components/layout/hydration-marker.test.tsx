import { render, waitFor } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { vi } from "vitest";
import { HydrationMarker } from "./hydration-marker";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

afterEach(() => {
  delete document.documentElement.dataset.hydrated;
});

test("marks the document after client hydration", async () => {
  render(<HydrationMarker />);

  await waitFor(() =>
    expect(document.documentElement).toHaveAttribute("data-hydrated", "true"),
  );
});
