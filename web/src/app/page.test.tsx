import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "./page";

test("renders the JVF Services homepage", async () => {
  render(await Home());

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /reliable home services\. one trusted team\./i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: /what our clients say/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("Hellen Smith")).toBeInTheDocument();
  expect(screen.getByText("Rebecca Hawland")).toBeInTheDocument();
  expect(screen.getByText("Michelle")).toBeInTheDocument();
});
