import { afterEach, describe, expect, it, vi } from "vitest";
import { getAuthErrorMessage, rateLimitMessage, readRetryAfterSeconds } from "./auth-errors";

describe("readRetryAfterSeconds", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("reads X-Retry-After in seconds", () => {
    const headers = new Headers({ "X-Retry-After": "42" });
    expect(readRetryAfterSeconds(headers)).toBe(42);
  });

  it("falls back to Retry-After", () => {
    const headers = new Headers({ "Retry-After": "120" });
    expect(readRetryAfterSeconds(headers)).toBe(120);
  });

  it("parses an HTTP date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const headers = new Headers({ "Retry-After": "Thu, 01 Jan 2026 00:02:00 GMT" });
    expect(readRetryAfterSeconds(headers)).toBe(120);
  });

  it("returns undefined when the header is missing or invalid", () => {
    expect(readRetryAfterSeconds(new Headers())).toBeUndefined();
    expect(readRetryAfterSeconds(new Headers({ "Retry-After": "soon" }))).toBeUndefined();
    expect(readRetryAfterSeconds(new Headers({ "Retry-After": "0" }))).toBeUndefined();
  });
});

describe("rateLimitMessage", () => {
  it("uses a generic message when the wait is unknown", () => {
    expect(rateLimitMessage()).toBe("Too many attempts. Please wait a few minutes and try again.");
  });

  it("shows seconds under a minute", () => {
    expect(rateLimitMessage(30)).toBe("Too many attempts. Please try again in 30 seconds.");
  });

  it("rounds up to minutes", () => {
    expect(rateLimitMessage(60)).toBe("Too many attempts. Please try again in 1 minute.");
    expect(rateLimitMessage(61)).toBe("Too many attempts. Please try again in 2 minutes.");
    expect(rateLimitMessage(900)).toBe("Too many attempts. Please try again in 15 minutes.");
  });
});

describe("getAuthErrorMessage", () => {
  it("uses the rate limit message for 429 responses", () => {
    expect(getAuthErrorMessage({ status: 429, retryAfter: 90 }, "Sign in failed")).toBe(
      "Too many attempts. Please try again in 2 minutes.",
    );
  });

  it("uses the server message for other errors", () => {
    expect(
      getAuthErrorMessage({ status: 401, message: "Invalid password" }, "Sign in failed"),
    ).toBe("Invalid password");
  });

  it("uses the fallback when there is no message", () => {
    expect(getAuthErrorMessage({ status: 500 }, "Sign in failed")).toBe("Sign in failed");
    expect(getAuthErrorMessage(null, "Sign in failed")).toBe("Sign in failed");
  });
});

describe("authClient rate limit handling", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("exposes retryAfter from X-Retry-After on 429 responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ message: "Too many requests. Please try again later." }), {
            status: 429,
            headers: { "Content-Type": "application/json", "X-Retry-After": "75" },
          }),
      ),
    );

    const { authClient } = await import("./auth-client");
    const { error } = await authClient.signIn.email({
      email: "user@example.com",
      password: "Passwordvalid",
    });

    expect(error?.status).toBe(429);
    expect(getAuthErrorMessage(error, "Sign in failed")).toBe(
      "Too many attempts. Please try again in 2 minutes.",
    );
  });
});
