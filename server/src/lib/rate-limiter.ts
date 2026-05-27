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
