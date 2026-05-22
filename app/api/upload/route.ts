import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_FOLDERS = ['services', 'rooms', 'gallery', 'hero'] as const
type Folder = typeof ALLOWED_FOLDERS[number]

export async function POST(request: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const folderParam = searchParams.get('folder') ?? 'services'
    const folder: Folder = (ALLOWED_FOLDERS as readonly string[]).includes(folderParam)
      ? (folderParam as Folder)
      : 'services'

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (!ALLOWED_TYPES.includes(file.type))
      return NextResponse.json({ error: 'Only JPG, PNG, WebP and GIF allowed' }, { status: 400 })
    if (file.size > MAX_SIZE)
      return NextResponse.json({ error: 'File must be under 5 MB' }, { status: 400 })

    const ext = extname(file.name).toLowerCase() || '.jpg'
    const filename = `${folder}-${Date.now()}${ext}`

    // On Vercel (production) the filesystem is read-only — use Vercel Blob instead
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob')
      const blob = await put(`uploads/${folder}/${filename}`, file, {
        access: 'public',
        contentType: file.type,
      })
      return NextResponse.json({ url: blob.url })
    }

    // Local development — write to public/uploads/
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder)
    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, filename), buffer)
    return NextResponse.json({ url: `/uploads/${folder}/${filename}` })
  } catch (error) {
    console.error('POST /api/upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
