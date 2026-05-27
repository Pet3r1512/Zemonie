interface Entry {
  attempts: number
  resetAt: number
}

const store = new Map<string, Entry>()

const FIVE_MIN = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < FIVE_MIN) return
  lastCleanup = now
  for (const [key, entry] of store) {
    if (now >= entry.resetAt) store.delete(key)
  }
}

function getIp(c: { req: { header: (name: string) => string | undefined } }) {
  return c.req.header("cf-connecting-ip") || c.req.header("x-forwarded-for") || "unknown"
}

export function rateLimit(opts: {
  max: number
  windowMs: number
}) {
  return (ip: string): { allowed: boolean; remaining: number; retryAfter: number } => {
    cleanup()
    const now = Date.now()
    const entry = store.get(ip)

    if (!entry || now >= entry.resetAt) {
      store.set(ip, { attempts: 1, resetAt: now + opts.windowMs })
      return { allowed: true, remaining: opts.max - 1, retryAfter: 0 }
    }

    if (entry.attempts >= opts.max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
      return { allowed: false, remaining: 0, retryAfter }
    }

    entry.attempts++
    return { allowed: true, remaining: opts.max - entry.attempts, retryAfter: 0 }
  }
}

class RateLimiter {
  private limiters = new Map<string, ReturnType<typeof rateLimit>>()

  add(name: string, opts: { max: number; windowMs: number }) {
    this.limiters.set(name, rateLimit(opts))
    return this
  }

  check(name: string, ip: string) {
    const limiter = this.limiters.get(name)
    if (!limiter) return { allowed: true, remaining: Infinity, retryAfter: 0 }
    return limiter(ip)
  }
}

export function createRateLimiter() {
  return new RateLimiter()
}

export { getIp }
