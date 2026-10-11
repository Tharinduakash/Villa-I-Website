import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// Read lazily so a missing secret fails loudly at use time instead of
// silently falling back to a guessable value
function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be set and at least 32 characters long')
  }
  return new TextEncoder().encode(secret)
}
const COOKIE_NAME = 'villa-admin-token'
const EXPIRES_IN = '1d'

export interface AdminPayload {
  id: string
  email: string
  name: string
}

export async function signToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as AdminPayload
  } catch {
    return null
  }
}

export async function getAdminSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

export function setAuthCookie(token: string): { name: string; value: string; options: object } {
  return {
    name: COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    },
  }
}

export const COOKIE_NAME_EXPORT = COOKIE_NAME
