export interface AuthErrorLike {
  status?: number;
  message?: string;
  retryAfter?: number;
}

export function readRetryAfterSeconds(headers: Headers): number | undefined {
  const value = headers.get("X-Retry-After") ?? headers.get("Retry-After");
  if (!value) return undefined;

  const seconds = Number(value);
  if (Number.isFinite(seconds)) return seconds > 0 ? Math.ceil(seconds) : undefined;

  const retryAt = Date.parse(value);
  if (Number.isNaN(retryAt)) return undefined;
  const remaining = Math.ceil((retryAt - Date.now()) / 1000);
  return remaining > 0 ? remaining : undefined;
}

// better-auth builds the client error from the response body only, so the
// Retry-After header is copied into the body where the client can read it.
export async function withRetryAfterInBody(response: Response): Promise<Response> {
  if (response.status !== 429) return response;

  const retryAfter = readRetryAfterSeconds(response.headers);
  if (retryAfter === undefined) return response;

  const text = await response.clone().text();
  let body: Record<string, unknown> = {};
  try {
    const parsed: unknown = text ? JSON.parse(text) : {};
    if (parsed && typeof parsed === "object") body = parsed as Record<string, unknown>;
  } catch {
    body = {};
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(JSON.stringify({ ...body, retryAfter }), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function rateLimitMessage(retryAfter?: number): string {
  if (!retryAfter) return "Too many attempts. Please wait a few minutes and try again.";
  if (retryAfter < 60) return `Too many attempts. Please try again in ${retryAfter} seconds.`;

  const minutes = Math.ceil(retryAfter / 60);
  return `Too many attempts. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`;
}

export function getAuthErrorMessage(error: AuthErrorLike | null | undefined, fallback: string) {
  if (error?.status === 429) return rateLimitMessage(error.retryAfter);
  return error?.message || fallback;
}
