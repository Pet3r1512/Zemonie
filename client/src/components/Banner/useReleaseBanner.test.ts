import { renderHook } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { useReleaseBannerVisible, RELEASE_BANNER_KEY } from "./useReleaseBanner";

describe("useReleaseBannerVisible", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns visible true when banner not dismissed", () => {
    const { result } = renderHook(() => useReleaseBannerVisible());
    expect(result.current[0]).toBe(true);
  });

  it("returns visible false when banner dismissed in localStorage", () => {
    localStorage.setItem(RELEASE_BANNER_KEY, "true");
    const { result } = renderHook(() => useReleaseBannerVisible());
    expect(result.current[0]).toBe(false);
  });
});
