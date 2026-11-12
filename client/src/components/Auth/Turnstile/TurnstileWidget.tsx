import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";

const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export interface TurnstileHandle {
  reset: () => void;
}

interface TurnstileWidgetProps {
  ref?: Ref<TurnstileHandle>;
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.addEventListener("load", () => resolve());
      script.addEventListener("error", () => {
        scriptPromise = null;
        reject(new Error("Failed to load verification widget"));
      });
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export default function TurnstileWidget({ ref, onVerify, onExpire }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({ onVerify, onExpire });
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    callbacksRef.current = { onVerify, onExpire };
  });

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    },
  }));

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container || !SITE_KEY) return;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile || widgetIdRef.current) return;
        widgetIdRef.current = window.turnstile.render(container, {
          sitekey: SITE_KEY,
          callback: (token: string) => callbacksRef.current.onVerify(token),
          "expired-callback": () => callbacksRef.current.onExpire?.(),
          "error-callback": () => callbacksRef.current.onExpire?.(),
        });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, []);

  if (!SITE_KEY || loadFailed) {
    return (
      <p role="alert" className="text-center text-sm text-destructive">
        Verification is unavailable. Please refresh the page and try again.
      </p>
    );
  }

  return <div ref={containerRef} data-testid="turnstile-widget" className="flex justify-center" />;
}
