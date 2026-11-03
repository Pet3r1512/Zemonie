import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_VERSION, useCookieConsent } from "./useCookieConsent";

describe("useCookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("is visible when no consent is stored", () => {
    const { result } = renderHook(() => useCookieConsent());

    expect(result.current.visible).toBe(true);
  });

  it("is hidden when the current consent version is stored", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VERSION);

    const { result } = renderHook(() => useCookieConsent());

    expect(result.current.visible).toBe(false);
  });

  it("stores consent and hides the banner when accepted", () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.accept();
    });

    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe(COOKIE_CONSENT_VERSION);
    expect(result.current.visible).toBe(false);
  });
});
