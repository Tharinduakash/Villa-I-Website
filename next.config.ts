import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      // Allow any HTTPS hostname for user-submitted gallery photos
      { protocol: 'https', hostname: '**' },
    ],
  },
}

export default nextConfig
