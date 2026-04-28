import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

// PATCH /api/gallery/reviews/:id — toggle approved status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()
    const { approved } = body

    const review = await prisma.galleryReview.update({
      where: { id },
      data: { approved },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('PATCH /api/gallery/reviews/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

// DELETE /api/gallery/reviews/:id — admin only
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.galleryReview.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/gallery/reviews/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}
