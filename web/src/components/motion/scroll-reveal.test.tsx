import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ScrollReveal } from "./scroll-reveal";

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

class IntersectionObserverDouble implements IntersectionObserver {
  static instances: IntersectionObserverDouble[] = [];

  readonly root = null;
  readonly rootMargin: string = "0px 0px -12% 0px";
  readonly scrollMargin = "0px";
  readonly thresholds: ReadonlyArray<number> = [0.12];
  readonly observe = vi.fn();
  readonly unobserve = vi.fn();
  readonly disconnect = vi.fn();
  readonly takeRecords = vi.fn(() => []);

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.rootMargin = options?.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
    IntersectionObserverDouble.instances.push(this);
  }

  enter(target: Element) {
    this.callback(
      [
        {
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: target.getBoundingClientRect(),
          isIntersecting: true,
          rootBounds: null,
          target,
          time: 0,
        },
      ],
      this,
    );
  }
}

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue({
      matches,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

beforeEach(() => {
  pathname = "/";
  IntersectionObserverDouble.instances = [];
  setReducedMotion(false);
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: IntersectionObserverDouble,
  });
});

afterEach(() => {
  delete document.documentElement.dataset.revealReady;
  Reflect.deleteProperty(window, "IntersectionObserver");
});

describe("ScrollReveal", () => {
  test("reveals each target once as it enters the viewport", () => {
    const { unmount } = render(
      <>
        <section data-reveal>First section</section>
        <section data-reveal>Second section</section>
        <ScrollReveal />
      </>,
    );

    const first = screen.getByText("First section");
    const second = screen.getByText("Second section");
    const observer = IntersectionObserverDouble.instances[0];

    expect(document.documentElement).toHaveAttribute(
      "data-reveal-ready",
      "true",
    );
    expect(IntersectionObserverDouble.instances).toHaveLength(1);
    expect(observer.observe).toHaveBeenCalledWith(first);
    expect(observer.observe).toHaveBeenCalledWith(second);

    act(() => observer.enter(first));

    expect(first).toHaveAttribute("data-revealed", "true");
    expect(second).not.toHaveAttribute("data-revealed");
    expect(observer.unobserve).toHaveBeenCalledWith(first);

    unmount();
    expect(observer.disconnect).toHaveBeenCalledOnce();
    expect(document.documentElement).not.toHaveAttribute("data-reveal-ready");
  });

  test("leaves content visible when reduced motion is preferred", () => {
    setReducedMotion(true);

    render(
      <>
        <p data-reveal>Reduced-motion content</p>
        <ScrollReveal />
      </>,
    );

    const content = screen.getByText("Reduced-motion content");
    expect(IntersectionObserverDouble.instances).toHaveLength(0);
    expect(document.documentElement).not.toHaveAttribute("data-reveal-ready");
    expect(content).not.toHaveAttribute("data-revealed");
    expect(content).not.toHaveAttribute("aria-hidden");
  });

  test("leaves content visible when IntersectionObserver is unavailable", () => {
    Reflect.deleteProperty(window, "IntersectionObserver");

    render(
      <>
        <p data-reveal>Fallback content</p>
        <ScrollReveal />
      </>,
    );

    const content = screen.getByText("Fallback content");
    expect(document.documentElement).not.toHaveAttribute("data-reveal-ready");
    expect(content).not.toHaveAttribute("data-revealed");
    expect(content).not.toHaveAttribute("aria-hidden");
  });

  test("does not disturb keyboard focus when revealing an interactive target", () => {
    render(
      <>
        <a data-reveal href="/contact">
          Request service
        </a>
        <ScrollReveal />
      </>,
    );

    const link = screen.getByRole("link", { name: "Request service" });
    link.focus();

    act(() => IntersectionObserverDouble.instances[0].enter(link));

    expect(link).toHaveFocus();
    expect(link).not.toHaveAttribute("aria-hidden");
    expect(link).not.toHaveAttribute("tabindex");
  });
});
