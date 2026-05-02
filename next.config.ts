import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
