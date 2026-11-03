import { useState } from "react";

export const COOKIE_CONSENT_KEY = "zemonie-cookie-consent";
export const COOKIE_CONSENT_VERSION = "1";

function hasAcknowledgedCookies() {
  if (typeof window === "undefined") return true;

  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === COOKIE_CONSENT_VERSION;
  } catch {
    return false;
  }
}

export function useCookieConsent() {
  const [visible, setVisible] = useState(() => !hasAcknowledgedCookies());

  function accept() {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VERSION);
    } catch {
      // Storage can be unavailable (e.g. privacy mode); still hide it for this session.
    }
    setVisible(false);
  }

  return { visible, accept };
}
