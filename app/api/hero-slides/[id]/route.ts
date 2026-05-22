import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()

    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        ...(body.desktopImage      !== undefined && { desktopImage: body.desktopImage }),
        ...(body.mobileImage       !== undefined && { mobileImage: body.mobileImage }),
        ...(body.eyebrow           !== undefined && { eyebrow: body.eyebrow }),
        ...(body.title             !== undefined && { title: body.title }),
        ...(body.titleItalic       !== undefined && { titleItalic: body.titleItalic }),
        ...(body.titleEnd          !== undefined && { titleEnd: body.titleEnd }),
        ...(body.accentColor       !== undefined && { accentColor: body.accentColor }),
        ...(body.accentGlow        !== undefined && { accentGlow: body.accentGlow }),
        ...(body.ctaLabel          !== undefined && { ctaLabel: body.ctaLabel }),
        ...(body.ctaHref           !== undefined && { ctaHref: body.ctaHref }),
        ...(body.ctaSecondaryLabel !== undefined && { ctaSecondaryLabel: body.ctaSecondaryLabel }),
        ...(body.ctaSecondaryHref  !== undefined && { ctaSecondaryHref: body.ctaSecondaryHref }),
        ...(body.order             !== undefined && { order: body.order }),
        ...(body.active            !== undefined && { active: body.active }),
      },
    })

    revalidatePath('/')
    return NextResponse.json(slide)
  } catch (error) {
    console.error('PUT /api/hero-slides/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update slide' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.heroSlide.delete({ where: { id } })
    revalidatePath('/')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/hero-slides/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 })
  }
}
