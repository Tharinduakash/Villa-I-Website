import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'villa-admin-token'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes (except /admin/login)
  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    const secret = process.env.JWT_SECRET
    // No secret configured → treat every token as invalid rather than trusting a default
    if (!secret || secret.length < 32) throw new Error('JWT_SECRET is not configured')
    await jwtVerify(token, new TextEncoder().encode(secret))
    return NextResponse.next()
  } catch {
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.delete(COOKIE_NAME)
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
