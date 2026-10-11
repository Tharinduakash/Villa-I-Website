import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken, setAuthCookie } from '@/lib/auth'
import { rateLimit, resetRateLimit, clientIp, tooManyRequests } from '@/lib/security'

const WINDOW_MS = 15 * 60 * 1000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Slow down password guessing: per IP and per account
    const ipLimit = rateLimit(`login-ip:${clientIp(request)}`, 10, WINDOW_MS)
    if (!ipLimit.ok) return tooManyRequests(ipLimit.retryAfter)
    const emailKey = `login-email:${email.toLowerCase()}`
    const emailLimit = rateLimit(emailKey, 5, WINDOW_MS)
    if (!emailLimit.ok) return tooManyRequests(emailLimit.retryAfter)

    const admin = await prisma.adminUser.findUnique({ where: { email } })

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await compare(password, admin.password)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    resetRateLimit(emailKey)
    const token = await signToken({ id: admin.id, email: admin.email, name: admin.name })
    const cookie = setAuthCookie(token)

    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    })

    response.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof response.cookies.set>[2])

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
