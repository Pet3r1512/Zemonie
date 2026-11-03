import { useState } from "react";

export const RELEASE_BANNER_KEY = "zemonie-release-banner-dismissed";
export const RELEASE_BANNER_OFFSET = "top-11"; // 2.75rem / 44px, matches the banner height

export function useReleaseBannerVisible() {
  return useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem(RELEASE_BANNER_KEY);
    }
    return false;
  });
}
