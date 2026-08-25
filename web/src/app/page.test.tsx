import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "./page";

test("renders the JVF Services concept", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /reliable help for the spaces and moments that matter/i,
    }),
  ).toBeInTheDocument();
});
