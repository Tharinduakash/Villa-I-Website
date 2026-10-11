import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'
import { rateLimit, clientIp, tooManyRequests, checkFields, EMAIL_REGEX } from '@/lib/security'

// Fields safe to show on the public gallery — never the guest's email
const PUBLIC_FIELDS = {
  id: true, guestName: true, title: true, image: true, roomType: true,
  rating: true, review: true, span: true, year: true, createdAt: true,
} as const

// Guests may only attach photos uploaded through /api/gallery/upload
function isAllowedReviewImage(url: string): boolean {
  if (url.startsWith('/uploads/reviews/')) return true
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && u.hostname.endsWith('.public.blob.vercel-storage.com')
  } catch {
    return false
  }
}

export const dynamic = 'force-dynamic'

// GET /api/gallery/reviews?approved=true  → public (approved only)
// GET /api/gallery/reviews                → admin only (all)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const approvedOnly = searchParams.get('approved') === 'true'

    if (approvedOnly) {
      const reviews = await prisma.galleryReview.findMany({
        where: { approved: true },
        orderBy: { createdAt: 'desc' },
        select: PUBLIC_FIELDS,
      })
      return NextResponse.json(reviews)
    }

    const session = await getAdminSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const reviews = await prisma.galleryReview.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('GET /api/gallery/reviews error:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// POST /api/gallery/reviews — public (customer submission) or admin (direct publish)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guestName, email, title, image, roomType, rating, review, span, year, approved } = body

    if (!guestName || !email || !title || !roomType || !rating || !review) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const fieldError = checkFields({
      name: [guestName, 100], email: [email, 254], title: [title, 150],
      'room type': [roomType, 50], review: [review, 2000], image: [image, 500],
    })
    if (fieldError) return NextResponse.json({ error: fieldError }, { status: 400 })
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const ratingNum = parseInt(String(rating))
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const spanNum = span ? Math.min(3, Math.max(1, parseInt(String(span)))) : 1
    const yearNum = year ? parseInt(String(year)) : new Date().getFullYear()

    // Only admins can create pre-approved entries or use arbitrary images
    const session = await getAdminSession()
    const isApproved = approved === true && !!session

    if (!session) {
      const limit = rateLimit(`review:${clientIp(request)}`, 3, 60 * 60 * 1000)
      if (!limit.ok) return tooManyRequests(limit.retryAfter)
      if (image && !isAllowedReviewImage(image)) {
        return NextResponse.json({ error: 'Invalid image' }, { status: 400 })
      }
    }

    const newReview = await prisma.galleryReview.create({
      data: {
        guestName,
        email,
        title,
        image: image || null,
        roomType,
        rating: ratingNum,
        review,
        span: spanNum,
        year: yearNum,
        approved: isApproved,
      },
    })

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error('POST /api/gallery/reviews error:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
