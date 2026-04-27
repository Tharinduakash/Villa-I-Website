import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

// GET /api/rooms/:id — public
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const room = await prisma.room.findUnique({ where: { id } })
    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    return NextResponse.json(room)
  } catch (error) {
    console.error('GET /api/rooms/[id] error:', error)
    return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 })
  }
}

// PUT /api/rooms/:id — admin only
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()
    const { name, shortName, description, features, pricePerNight, priceLabel, image, images, capacity, size, available } = body

    const room = await prisma.room.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(shortName !== undefined && { shortName }),
        ...(description !== undefined && { description }),
        ...(features !== undefined && { features }),
        ...(pricePerNight !== undefined && { pricePerNight: parseFloat(pricePerNight) }),
        ...(priceLabel !== undefined && { priceLabel }),
        ...(image !== undefined && { image }),
        ...(images !== undefined && { images }),
        ...(capacity !== undefined && { capacity }),
        ...(size !== undefined && { size }),
        ...(available !== undefined && { available }),
      },
    })

    return NextResponse.json(room)
  } catch (error) {
    console.error('PUT /api/rooms/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 })
  }
}

// DELETE /api/rooms/:id — admin only
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.room.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/rooms/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 })
  }
}
