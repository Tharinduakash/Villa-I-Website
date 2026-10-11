import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'
import { rateLimit, clientIp, tooManyRequests, checkFields, EMAIL_REGEX } from '@/lib/security'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('GET /api/inquiries error:', error)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const limit = rateLimit(`inquiry:${clientIp(request)}`, 5, 60 * 60 * 1000)
  if (!limit.ok) return tooManyRequests(limit.retryAfter)

  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const fieldError = checkFields({
      name: [name, 100], email: [email, 254], subject: [subject, 200], message: [message, 2000],
    })
    if (fieldError) return NextResponse.json({ error: fieldError }, { status: 400 })

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const inquiry = await prisma.inquiry.create({ data: { name, email, subject, message } })
    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 })
  } catch (error) {
    console.error('POST /api/inquiries error:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
