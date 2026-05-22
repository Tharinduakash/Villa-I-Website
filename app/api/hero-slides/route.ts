import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(_request: NextRequest) {
  try {
    const session = await getAdminSession()
    const isAdmin = !!session
    const slides = await prisma.heroSlide.findMany({
      where: isAdmin ? {} : { active: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    })
    return NextResponse.json(slides)
  } catch (error) {
    console.error('GET /api/hero-slides error:', error)
    return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const {
      desktopImage, mobileImage, eyebrow, title, titleItalic, titleEnd,
      accentColor, accentGlow, ctaLabel, ctaHref, ctaSecondaryLabel,
      ctaSecondaryHref, order, active,
    } = body

    if (!desktopImage || !titleItalic || !ctaLabel || !ctaSecondaryLabel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const slide = await prisma.heroSlide.create({
      data: {
        desktopImage,
        mobileImage: mobileImage ?? '',
        eyebrow: eyebrow ?? '',
        title: title ?? '',
        titleItalic,
        titleEnd: titleEnd ?? '',
        accentColor: accentColor ?? 'rgba(201,169,110,1)',
        accentGlow: accentGlow ?? 'rgba(201,169,110,0.4)',
        ctaLabel,
        ctaHref: ctaHref ?? '/contact',
        ctaSecondaryLabel,
        ctaSecondaryHref: ctaSecondaryHref ?? '/rooms',
        order: order ?? 0,
        active: active ?? true,
      },
    })

    revalidatePath('/')
    return NextResponse.json(slide, { status: 201 })
  } catch (error) {
    console.error('POST /api/hero-slides error:', error)
    return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 })
  }
}
