import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "./page";

test("renders the migrated JVF HomeWorks Pro homepage", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /reliable home services\. one trusted team\./i,
    }),
  ).toBeInTheDocument();
});
