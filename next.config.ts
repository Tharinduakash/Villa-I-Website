import path from 'path'
import type { NextConfig } from 'next'

// Browser hardening applied to every response
const securityHeaders = [
  // Block other sites from framing this one (clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'" },
  // Stop browsers guessing content types (e.g. treating an upload as HTML)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  // Pin the workspace root to this project — a stray lockfile in the user's
  // home directory otherwise makes Turbopack resolve modules from the wrong place
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '**' },
    ],
    // Cache optimized images for 7 days — reduces how often they're reprocessed
    minimumCacheTTL: 60 * 60 * 24 * 7,
    // Fewer size variants = less disk usage per image
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    // Allow the quality values used across the codebase (75 default, 90 gallery, 100 hero)
    qualities: [75, 90, 100],
  },
}

export default nextConfig
