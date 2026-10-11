import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'
import { rateLimit, clientIp, tooManyRequests, checkFields, EMAIL_REGEX } from '@/lib/security'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const subscriptions = await prisma.subscription.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('GET /api/subscriptions error:', error)
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const limit = rateLimit(`subscribe:${clientIp(request)}`, 5, 60 * 60 * 1000)
  if (!limit.ok) return tooManyRequests(limit.retryAfter)

  try {
    const { email } = await request.json()

    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    const fieldError = checkFields({
      email: [email, 254],
    })
    if (fieldError) return NextResponse.json({ error: fieldError }, { status: 400 })

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    await prisma.subscription.upsert({
      where: { email },
      update: {},
      create: { email },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('POST /api/subscriptions error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
