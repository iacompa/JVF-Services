import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "./page";

test("renders the JVF Services concept", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", { name: /JVF Services/i }),
  ).toBeInTheDocument();
});
