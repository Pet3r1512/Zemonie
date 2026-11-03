import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_VERSION, useCookieConsent } from "./useCookieConsent";

describe("useCookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

  it("is visible when cookies cannot be read", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage is unavailable");
    });

    const { result } = renderHook(() => useCookieConsent());

    expect(result.current.visible).toBe(true);
  });

  it("stores consent and hides the banner when accepted", () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.accept();
    });

    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe(COOKIE_CONSENT_VERSION);
    expect(result.current.visible).toBe(false);
  });

  it("still hides the banner when consent cannot be stored", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage is unavailable");
    });

    const { result } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.accept();
    });

    expect(result.current.visible).toBe(false);
  });
});
