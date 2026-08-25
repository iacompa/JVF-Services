import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { ContactForm, getRequestedService } from "./contact-form";
import { DemoQuoteDelivery } from "./demo-delivery";
import type { QuoteRequest } from "./types";

const failureAction = vi.fn(async (_previous: unknown, formData: FormData) => ({
  status: "error" as const,
  message: "Please review the highlighted fields.",
  fieldErrors: {
    email: "This field needs attention.",
  },
  values: Object.fromEntries(formData.entries()) as Record<string, string>,
}));

const successAction = vi.fn(async () => ({
  status: "success" as const,
  message: "Your request was received.",
  submissionId: "demo-123",
}));

describe("accessible contact form", () => {
  beforeEach(() => {
    failureAction.mockClear();
    successAction.mockClear();
  });

  test("normalizes service preselection from a query value", () => {
    expect(getRequestedService("notary")).toBe("notary");
    expect(getRequestedService(["interpreting"])).toBe("interpreting");
    expect(getRequestedService("unknown")).toBe("general");
  });

  test("preselects a service and changes its keyboard-operable fields", async () => {
    const user = userEvent.setup();
    render(<ContactForm locale="en" initialService="notary" />);

    const service = screen.getByLabelText(/service needed/i);
    expect(service).toHaveValue("notary");
    expect(screen.getByLabelText(/appointment type/i)).toHaveValue("in-person");

    await user.selectOptions(service, "interpreting");
    expect(screen.getByLabelText(/language direction/i)).toBeVisible();
    expect(screen.getByLabelText(/service format/i)).toBeVisible();
    expect(
      screen.queryByLabelText(/appointment type/i),
    ).not.toBeInTheDocument();
  });

  test("provides programmatic labels and required-field semantics", () => {
    render(<ContactForm locale="en" />);

    for (const name of [
      /full name/i,
      /phone number/i,
      /email address/i,
      /^city/i,
      /zip code/i,
      /service needed/i,
    ]) {
      expect(screen.getByLabelText(name)).toBeRequired();
    }
    expect(screen.getByLabelText(/not include documents/i)).toBeRequired();
    expect(screen.getAllByLabelText(/email address/i)).toHaveLength(1);
    expect(
      screen.queryByLabelText(/upload|street address|budget/i),
    ).not.toBeInTheDocument();
  });

  test("focuses a linked error summary and preserves values on failure", async () => {
    const user = userEvent.setup();
    render(<ContactForm locale="en" action={failureAction} />);

    await user.type(screen.getByLabelText(/full name/i), "Marta Rivera");
    await user.type(screen.getByLabelText(/phone number/i), "7165550199");
    await user.type(screen.getByLabelText(/email address/i), "bad-email");
    await user.type(screen.getByLabelText(/^city/i), "Buffalo");
    await user.type(screen.getByLabelText(/zip code/i), "14201");
    await user.type(screen.getByLabelText(/how can we help/i), "A question");
    await user.click(screen.getByLabelText(/not include documents/i));

    await act(async () => {
      fireEvent.submit(screen.getByRole("form", { name: /request service/i }));
    });

    const summary = await screen.findByRole("alert");
    expect(summary).toHaveFocus();
    expect(
      screen.getByRole("link", { name: /email address/i }),
    ).toHaveAttribute("href", "#email");
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Marta Rivera");
    expect(screen.getByRole("link", { name: /^call/i })).toHaveAttribute(
      "href",
      "tel:+17167489117",
    );
    expect(screen.getByRole("link", { name: /^text/i })).toHaveAttribute(
      "href",
      "sms:+17167489117",
    );
  });

  test("announces success and resets entered values", async () => {
    const user = userEvent.setup();
    render(<ContactForm locale="en" action={successAction} />);

    await user.type(screen.getByLabelText(/full name/i), "Marta Rivera");
    await act(async () => {
      fireEvent.submit(screen.getByRole("form", { name: /request service/i }));
    });

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        /request was received/i,
      ),
    );
    expect(screen.getByLabelText(/full name/i)).toHaveValue("");
  });
});

describe("safe demo delivery", () => {
  test("logs redacted metadata without customer or message fields", async () => {
    const info = vi.fn();
    const delivery = new DemoQuoteDelivery({
      logger: { info },
      createId: () => "demo-123",
      now: () => new Date("2026-08-25T12:00:00.000Z"),
    });
    const request = {
      service: "general",
      locale: "en",
      name: "Private Name",
      phone: "7165550100",
      email: "private@example.com",
      city: "Buffalo",
      zip: "14201",
      note: "Private note",
      privacyAcknowledged: true,
      startedAt: Date.now() - 3_000,
      website: "",
      reason: "A private reason",
    } satisfies QuoteRequest;

    await expect(delivery.deliver(request)).resolves.toEqual({
      ok: true,
      submissionId: "demo-123",
    });
    expect(info).toHaveBeenCalledOnce();
    const payload = info.mock.calls[0][0];
    expect(payload).toEqual({
      event: "demo_quote",
      submissionId: "demo-123",
      locale: "en",
      service: "general",
      timestamp: "2026-08-25T12:00:00.000Z",
    });
    expect(JSON.stringify(payload)).not.toMatch(
      /Private Name|7165550100|private@example\.com|Buffalo|14201|Private note/,
    );
  });
});
