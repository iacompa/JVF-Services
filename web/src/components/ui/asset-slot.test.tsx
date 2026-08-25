import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { AssetSlot } from "./asset-slot";

describe("missing visual asset slots", () => {
  test.each([
    ["logo", "10 / 3"],
    ["hero", "4 / 3"],
    ["landscape", "4 / 3"],
    ["portrait", "4 / 5"],
  ] as const)("exposes the %s slot at %s", (variant, ratio) => {
    render(
      <AssetSlot
        variant={variant}
        label="Future visual"
        description="The original asset will be added before launch."
      />,
    );

    const slot = screen.getByRole("img", { name: /placeholder/i });
    expect(slot).toBeVisible();
    expect(slot).toHaveAttribute("data-aspect-ratio", ratio);
    expect(slot).toHaveTextContent(/placeholder/i);
    expect(slot).toHaveAccessibleName(/not a photograph of completed JVF work/i);
  });

  test("never emits a broken image or describes a placeholder as real work", () => {
    const { container } = render(
      <AssetSlot
        label="Service image"
        description="A verified image will be added later."
      />,
    );

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector('img[src=""]')).not.toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAccessibleName(/placeholder/i);
  });
});
