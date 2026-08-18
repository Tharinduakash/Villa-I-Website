import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 8 * 1024 * 1024 // 8 MB

// POST /api/gallery/upload — public (for guest review photo uploads)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, WebP and GIF images are allowed' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File must be under 8 MB' }, { status: 400 })
    }

    const ext = extname(file.name).toLowerCase() || '.jpg'
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const filename = `review-${unique}${ext}`

    // On Vercel (production) the filesystem is read-only — use Vercel Blob instead
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob')
      const blob = await put(`uploads/reviews/${filename}`, file, {
        access: 'public',
        contentType: file.type,
      })
      return NextResponse.json({ url: blob.url })
    }

    // Local development — write to public/uploads/
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'reviews')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, filename), buffer)
    return NextResponse.json({ url: `/uploads/reviews/${filename}` })
  } catch (error) {
    console.error('POST /api/gallery/upload error:', error)
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}
