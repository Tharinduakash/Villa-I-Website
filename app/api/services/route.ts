import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } })
    return NextResponse.json(services)
  } catch (error) {
    console.error('GET /api/services error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { title, description, icon, features } = body

    if (!title || !description || !icon) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const service = await prisma.service.create({
      data: { title, description, icon, features: features ?? [] },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('POST /api/services error:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
