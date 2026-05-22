// One-time seed: inserts the 5 original hero slides into the database.
// Run with: node scripts/seed-hero-slides.mjs
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const slides = [
  {
    desktopImage:      '/webp/Anantara Tangalle - Dining by Design.jpg',
    mobileImage:       '/webp/Anantara Tangalle - Dining by Design.jpg',
    accentColor:       'rgba(201,169,110,1)',
    accentGlow:        'rgba(201,169,110,0.4)',
    eyebrow:           'Mount Lavinia, Sri Lanka',
    title:             'Ocean Meets',
    titleItalic:       'Paradise',
    titleEnd:          'Luxury Living',
    ctaLabel:          'Reserve Your Stay',
    ctaHref:           '/contact',
    ctaSecondaryLabel: 'Explore Rooms',
    ctaSecondaryHref:  '/rooms',
    order:             0,
    active:            true,
  },
  {
    desktopImage:      '/webp/roomvilla.png',
    mobileImage:       '/webp/IMG_2983.webp',
    accentColor:       'rgba(255,255,255,0.95)',
    accentGlow:        'rgba(255,255,255,0.25)',
    eyebrow:           'Comfort for Every Stay',
    title:             'Relax in',
    titleItalic:       'Non A/C & A/C',
    titleEnd:          'Rooms',
    ctaLabel:          'View Rooms',
    ctaHref:           '/rooms',
    ctaSecondaryLabel: 'Book Now',
    ctaSecondaryHref:  '/contact',
    order:             1,
    active:            true,
  },
  {
    desktopImage:      '/webp/pexels-tomas-malik-793526-1998439.webp',
    mobileImage:       '/webp/pexels-ollivves-1078983.jpg',
    accentColor:       'rgba(201,169,110,1)',
    accentGlow:        'rgba(201,169,110,0.4)',
    eyebrow:           '50m from the Beach',
    title:             'Wake Up to',
    titleItalic:       'Ocean',
    titleEnd:          'Breezes',
    ctaLabel:          'Reserve Your Stay',
    ctaHref:           '/contact',
    ctaSecondaryLabel: 'Explore Experience',
    ctaSecondaryHref:  '/about',
    order:             2,
    active:            true,
  },
  {
    desktopImage:      '/webp/fruit juices.webp',
    mobileImage:       '/webp/fruit juices.webp',
    accentColor:       'rgba(255,255,255,0.95)',
    accentGlow:        'rgba(255,255,255,0.25)',
    eyebrow:           'Refreshing Moments',
    title:             'Enjoy Our',
    titleItalic:       'Drinks',
    titleEnd:          'Corner',
    ctaLabel:          'View Services',
    ctaHref:           '/services',
    ctaSecondaryLabel: 'Contact Us',
    ctaSecondaryHref:  '/contact',
    order:             3,
    active:            true,
  },
  {
    desktopImage:      '/webp/IMG_3123.webp',
    mobileImage:       '/webp/IMG_3123.webp',
    accentColor:       'rgba(201,169,110,1)',
    accentGlow:        'rgba(201,169,110,0.4)',
    eyebrow:           'Private & Exclusive',
    title:             'Book the',
    titleItalic:       'Full Villa',
    titleEnd:          'Experience',
    ctaLabel:          'Book Full Villa',
    ctaHref:           '/rooms#full-villa',
    ctaSecondaryLabel: 'View All Rooms',
    ctaSecondaryHref:  '/rooms',
    order:             4,
    active:            true,
  },
]

async function main() {
  const existing = await prisma.heroSlide.count()
  if (existing > 0) {
    console.log(`Skipped — ${existing} slides already exist in the database.`)
    return
  }

  const result = await prisma.heroSlide.createMany({ data: slides })
  console.log(`Seeded ${result.count} hero slides successfully.`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
