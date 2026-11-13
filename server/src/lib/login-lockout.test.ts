import { describe, expect, it } from "vitest";
import {
  applySignInOutcome,
  clearLoginFailures,
  getLockoutStatus,
  lockDurationFor,
  LoginLimitStore,
  normalizeLoginKey,
  recordFailedLogin,
} from "./login-lockout";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

function createFakeKV() {
  const data = new Map<string, { value: string; expiresAt?: number }>();
  const store: LoginLimitStore & { data: typeof data } = {
    data,
    async get(key) {
      const entry = data.get(key);
      if (!entry) return null;
      return entry.value;
    },
    async put(key, value, options) {
      data.set(key, {
        value,
        expiresAt: options?.expirationTtl ? Date.now() + options.expirationTtl * 1000 : undefined,
      });
    },
    async delete(key) {
      data.delete(key);
    },
  };
  return store;
}

const EMAIL = "user@example.com";

describe("lockDurationFor", () => {
  it("has no lock below 3 failures", () => {
    expect(lockDurationFor(0)).toBe(0);
    expect(lockDurationFor(1)).toBe(0);
    expect(lockDurationFor(2)).toBe(0);
  });

  it("locks 3 minutes at 3 and 4 failures", () => {
    expect(lockDurationFor(3)).toBe(3 * MINUTE);
    expect(lockDurationFor(4)).toBe(3 * MINUTE);
  });

  it("locks 10 minutes at 5 to 9 failures", () => {
    expect(lockDurationFor(5)).toBe(10 * MINUTE);
    expect(lockDurationFor(9)).toBe(10 * MINUTE);
  });

  it("locks 24 hours at 10 or more failures", () => {
    expect(lockDurationFor(10)).toBe(24 * HOUR);
    expect(lockDurationFor(50)).toBe(24 * HOUR);
  });
});

describe("recordFailedLogin", () => {
  it("does not lock before the third failure", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    await recordFailedLogin(store, EMAIL, now);
    const result = await recordFailedLogin(store, EMAIL, now + 1000);
    expect(result.locked).toBe(false);
  });

  it("locks for 3 minutes on the third failure", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    await recordFailedLogin(store, EMAIL, now);
    await recordFailedLogin(store, EMAIL, now);
    const result = await recordFailedLogin(store, EMAIL, now);

    expect(result.locked).toBe(true);
    expect(result.retryAfterSeconds).toBe(180);
  });

  it("escalates to 10 minutes on the fifth failure", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    let result = { locked: false, retryAfterSeconds: 0 };
    for (let i = 0; i < 5; i++) {
      result = await recordFailedLogin(store, EMAIL, now);
    }
    expect(result.retryAfterSeconds).toBe(600);
  });

  it("escalates to 24 hours on the tenth failure", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    let result = { locked: false, retryAfterSeconds: 0 };
    for (let i = 0; i < 10; i++) {
      result = await recordFailedLogin(store, EMAIL, now);
    }
    expect(result.retryAfterSeconds).toBe(24 * 60 * 60);
  });

  it("never shortens an existing lock when a failure lands in a lower tier", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    for (let i = 0; i < 10; i++) {
      await recordFailedLogin(store, EMAIL, now);
    }
    // Failure 11 is in the 24h tier too, so the lock restarts from its time, never shorter.
    const result = await recordFailedLogin(store, EMAIL, now + 1000);
    expect(result.retryAfterSeconds).toBe(24 * 60 * 60);
  });
});

describe("getLockoutStatus", () => {
  it("is unlocked for an unknown email", async () => {
    const store = createFakeKV();
    expect(await getLockoutStatus(store, EMAIL, 1_000_000)).toEqual({
      locked: false,
      retryAfterSeconds: 0,
    });
  });

  it("reports the remaining lock time", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) await recordFailedLogin(store, EMAIL, now);

    const status = await getLockoutStatus(store, EMAIL, now + MINUTE);
    expect(status).toEqual({ locked: true, retryAfterSeconds: 120 });
  });

  it("unlocks once the lock has expired", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) await recordFailedLogin(store, EMAIL, now);

    const status = await getLockoutStatus(store, EMAIL, now + 3 * MINUTE);
    expect(status.locked).toBe(false);
  });

  it("keeps counting after a lock expires, so the next failure re-locks", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) await recordFailedLogin(store, EMAIL, now);

    const later = now + 4 * MINUTE;
    const result = await recordFailedLogin(store, EMAIL, later);
    expect(result.locked).toBe(true);
    expect(result.retryAfterSeconds).toBe(180);
  });
});

describe("clearLoginFailures", () => {
  it("resets the count and lock after a successful sign-in", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) await recordFailedLogin(store, EMAIL, now);

    await clearLoginFailures(store, EMAIL);

    expect((await getLockoutStatus(store, EMAIL, now)).locked).toBe(false);
    const next = await recordFailedLogin(store, EMAIL, now);
    expect(next.locked).toBe(false);
  });
});

describe("email handling", () => {
  it("treats case and surrounding spaces as the same account", () => {
    expect(normalizeLoginKey("User@Example.com ")).toBe(normalizeLoginKey("user@example.com"));
  });

  it("does not store the raw email in the KV key", () => {
    const key = normalizeLoginKey(EMAIL);
    expect(key.startsWith("login:")).toBe(true);
    expect(key).not.toContain("example.com");
    expect(key).not.toContain("user");
  });

  it("counts failures across case variations of the same email", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    await recordFailedLogin(store, "User@Example.com", now);
    await recordFailedLogin(store, "user@example.com ", now);
    const result = await recordFailedLogin(store, "USER@EXAMPLE.COM", now);
    expect(result.locked).toBe(true);
  });

  it("keeps different accounts independent", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) await recordFailedLogin(store, "a@example.com", now);

    expect((await getLockoutStatus(store, "b@example.com", now)).locked).toBe(false);
  });
});

describe("KV expiry", () => {
  it("sets a TTL of at least 24 hours on the failure record", async () => {
    const store = createFakeKV();
    await recordFailedLogin(store, EMAIL, 1_000_000);
    const entry = store.data.get(normalizeLoginKey(EMAIL));
    expect(entry?.expiresAt).toBeGreaterThanOrEqual(Date.now() + 24 * 60 * 60 * 1000 - 5000);
  });
});

describe("applySignInOutcome", () => {
  it("counts wrong-password results", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) {
      await applySignInOutcome(store, EMAIL, "invalid_credentials", now);
    }
    expect((await getLockoutStatus(store, EMAIL, now)).locked).toBe(true);
  });

  it("does not count other failures such as unverified email", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    for (let i = 0; i < 5; i++) {
      await applySignInOutcome(store, EMAIL, "other_failure", now);
    }
    expect((await getLockoutStatus(store, EMAIL, now)).locked).toBe(false);
  });

  it("clears failures on success", async () => {
    const store = createFakeKV();
    const now = 1_000_000;
    for (let i = 0; i < 2; i++) {
      await applySignInOutcome(store, EMAIL, "invalid_credentials", now);
    }
    await applySignInOutcome(store, EMAIL, "success", now);
    await applySignInOutcome(store, EMAIL, "invalid_credentials", now);
    expect((await getLockoutStatus(store, EMAIL, now)).locked).toBe(false);
  });
});
