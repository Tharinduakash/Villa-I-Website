import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/rooms — public
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(rooms)
  } catch (error) {
    console.error('GET /api/rooms error:', error)
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 })
  }
}

// POST /api/rooms — admin only
export async function POST(request: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { name, shortName, description, features, pricePerNight, priceLabel, image, images, capacity, size, available } = body

    if (!name || !shortName || !description || !pricePerNight || !image || !capacity || !size) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const room = await prisma.room.create({
      data: {
        name,
        shortName,
        description,
        features: features ?? [],
        pricePerNight: parseFloat(pricePerNight),
        priceLabel: priceLabel ?? `From $${pricePerNight}/night`,
        image,
        images: images ?? [],
        capacity,
        size,
        available: available ?? true,
      },
    })

    return NextResponse.json(room, { status: 201 })
  } catch (error) {
    console.error('POST /api/rooms error:', error)
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }
}
