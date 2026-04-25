import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

// GET /api/bookings — admin only
export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { room: { select: { name: true } } },
    })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('GET /api/bookings error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

// POST /api/bookings — public (contact form submission)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, checkIn, checkOut, guests, roomType, message } = body

    if (!name || !email || !checkIn || !checkOut) {
      return NextResponse.json({ error: 'Name, email, check-in, and check-out are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json({ error: 'Check-out must be after check-in' }, { status: 400 })
    }

    // Try to link a room by type if one matches
    let roomId: string | null = null
    if (roomType) {
      const room = await prisma.room.findFirst({
        where: { shortName: { contains: roomType, mode: 'insensitive' } },
      })
      roomId = room?.id ?? null
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests ?? '1',
        roomType: roomType ?? 'Not specified',
        message: message ?? null,
        roomId,
      },
    })

    return NextResponse.json({ success: true, bookingId: booking.id }, { status: 201 })
  } catch (error) {
    console.error('POST /api/bookings error:', error)
    return NextResponse.json({ error: 'Failed to submit booking' }, { status: 500 })
  }
}
