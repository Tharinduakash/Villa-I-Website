import { NextRequest, NextResponse } from 'next/server'

// ── Rate limiting ────────────────────────────────────────────────────
// In-memory fixed-window limiter. Each server instance keeps its own counts,
// so on Vercel this slows abuse down rather than giving a hard global cap.
type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now()

  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k)
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }

  bucket.count++
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }
  return { ok: true, retryAfter: 0 }
}

export function resetRateLimit(key: string) {
  buckets.delete(key)
}

export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export function tooManyRequests(retryAfter: number) {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } },
  )
}

// ── Input validation ─────────────────────────────────────────────────
// Returns an error message for the first field that is not a string or is
// longer than its limit; optional fields may be null/undefined.
export function checkFields(fields: Record<string, [value: unknown, max: number]>): string | null {
  for (const [name, [value, max]] of Object.entries(fields)) {
    if (value === undefined || value === null || value === '') continue
    if (typeof value !== 'string') return `Invalid ${name}`
    if (value.length > max) return `${name} must be ${max} characters or fewer`
  }
  return null
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Button links may only be site paths or http(s) URLs — never javascript: or data:
export function isSafeHref(href: unknown): boolean {
  if (typeof href !== 'string') return false
  if (href.startsWith('/') && !href.startsWith('//')) return true
  try {
    const u = new URL(href)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}
