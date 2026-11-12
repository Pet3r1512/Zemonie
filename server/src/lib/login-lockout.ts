import { createHash } from "node:crypto";

export interface LoginLimitStore {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

interface LockoutTier {
  failures: number;
  lockMs: number;
}

// Checked from the highest threshold down; the first match sets the lock length.
export const LOCKOUT_TIERS: readonly LockoutTier[] = [
  { failures: 10, lockMs: 24 * 60 * 60 * 1000 },
  { failures: 5, lockMs: 10 * 60 * 1000 },
  { failures: 3, lockMs: 3 * 60 * 1000 },
];

// Failure counts are kept this long after the last failure, so old mistakes expire.
const FAILURE_WINDOW_SECONDS = 24 * 60 * 60;
// Cloudflare KV rejects TTLs under 60 seconds.
const MIN_KV_TTL_SECONDS = 60;

interface LockoutRecord {
  failures: number;
  lockedUntil: number;
}

export interface LockoutStatus {
  locked: boolean;
  retryAfterSeconds: number;
}

export function lockDurationFor(failures: number): number {
  const tier = LOCKOUT_TIERS.find((t) => failures >= t.failures);
  return tier?.lockMs ?? 0;
}

export function normalizeLoginKey(email: string): string {
  const digest = createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
  return `login:${digest}`;
}

async function readRecord(store: LoginLimitStore, email: string): Promise<LockoutRecord> {
  const raw = await store.get(normalizeLoginKey(email));
  if (!raw) return { failures: 0, lockedUntil: 0 };
  try {
    const parsed = JSON.parse(raw) as Partial<LockoutRecord>;
    return {
      failures: Number(parsed.failures) || 0,
      lockedUntil: Number(parsed.lockedUntil) || 0,
    };
  } catch {
    return { failures: 0, lockedUntil: 0 };
  }
}

export async function getLockoutStatus(
  store: LoginLimitStore,
  email: string,
  now: number,
): Promise<LockoutStatus> {
  const record = await readRecord(store, email);
  if (record.lockedUntil <= now) return { locked: false, retryAfterSeconds: 0 };
  return {
    locked: true,
    retryAfterSeconds: Math.ceil((record.lockedUntil - now) / 1000),
  };
}

export async function recordFailedLogin(
  store: LoginLimitStore,
  email: string,
  now: number,
): Promise<LockoutStatus> {
  const previous = await readRecord(store, email);
  const failures = previous.failures + 1;
  const lockMs = lockDurationFor(failures);
  const lockedUntil =
    lockMs > 0 ? Math.max(previous.lockedUntil, now + lockMs) : previous.lockedUntil;

  const ttlSeconds = Math.max(
    FAILURE_WINDOW_SECONDS,
    Math.ceil((lockedUntil - now) / 1000),
    MIN_KV_TTL_SECONDS,
  );
  await store.put(
    normalizeLoginKey(email),
    JSON.stringify({ failures, lockedUntil } satisfies LockoutRecord),
    { expirationTtl: ttlSeconds },
  );

  return {
    locked: lockedUntil > now,
    retryAfterSeconds: Math.max(0, Math.ceil((lockedUntil - now) / 1000)),
  };
}

export async function clearLoginFailures(store: LoginLimitStore, email: string): Promise<void> {
  await store.delete(normalizeLoginKey(email));
}

export type SignInOutcome = "invalid_credentials" | "success" | "other_failure";

// Only wrong-password results count as failures. Unverified or other errors do not.
export async function applySignInOutcome(
  store: LoginLimitStore,
  email: string,
  outcome: SignInOutcome,
  now: number,
): Promise<void> {
  if (outcome === "invalid_credentials") {
    await recordFailedLogin(store, email, now);
    return;
  }
  if (outcome === "success") {
    await clearLoginFailures(store, email);
  }
}
