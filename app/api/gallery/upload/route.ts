import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, clientIp, tooManyRequests } from '@/lib/security'

const MAX_SIZE = 8 * 1024 * 1024 // 8 MB

// Extension is chosen from the detected type — never from the uploaded filename
const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
}

// Identify the real image type from the file's first bytes; the browser-sent
// type and filename are attacker-controlled
function detectImageType(bytes: Uint8Array): string | null {
  const startsWith = (sig: number[], offset = 0) => sig.every((b, i) => bytes[offset + i] === b)
  if (startsWith([0xff, 0xd8, 0xff])) return 'image/jpeg'
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'image/png'
  if (startsWith([0x47, 0x49, 0x46, 0x38])) return 'image/gif'
  if (startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8)) return 'image/webp'
  return null
}

// POST /api/gallery/upload — public (for guest review photo uploads)
export async function POST(request: NextRequest) {
  const limit = rateLimit(`review-upload:${clientIp(request)}`, 5, 60 * 60 * 1000)
  if (!limit.ok) return tooManyRequests(limit.retryAfter)

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File must be under 8 MB' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const type = detectImageType(buffer)
    if (!type) {
      return NextResponse.json({ error: 'Only JPG, PNG, WebP and GIF images are allowed' }, { status: 400 })
    }

    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const filename = `review-${unique}${EXT_BY_TYPE[type]}`

    // On Vercel (production) the filesystem is read-only — use Vercel Blob instead
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob')
      const blob = await put(`uploads/reviews/${filename}`, buffer, {
        access: 'public',
        contentType: type,
      })
      return NextResponse.json({ url: blob.url })
    }

    // Local development — write to public/uploads/
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'reviews')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, filename), buffer)
    return NextResponse.json({ url: `/uploads/reviews/${filename}` })
  } catch (error) {
    console.error('POST /api/gallery/upload error:', error)
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}
