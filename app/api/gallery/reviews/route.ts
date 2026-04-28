import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

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
    const { guestName, email, title, image, roomType, rating, review, approved } = body

    if (!guestName || !email || !title || !roomType || !rating || !review) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ratingNum = parseInt(String(rating))
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // Only admins can create pre-approved entries
    let isApproved = false
    if (approved === true) {
      const session = await getAdminSession()
      isApproved = !!session
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
        approved: isApproved,
      },
    })

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error('POST /api/gallery/reviews error:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
