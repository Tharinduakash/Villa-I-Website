import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const hashedPassword = await hash('admin123', 12)
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@villaihotel.com' },
    update: {},
    create: {
      email: 'admin@villaihotel.com',
      password: hashedPassword,
      name: 'Villa i Admin',
    },
  })
  console.log('✅ Admin user:', admin.email)

  // Rooms
  const roomsData = [
    {
      name: 'Air Conditioned Room',
      shortName: 'A/C Room',
      description: 'A serene retreat with modern amenities and cooling comfort. Perfect for couples and solo travelers seeking a refreshing stay near the beach.',
      features: ['Air Conditioning', 'Private Bathroom', 'Sea-view Balcony', 'Mini Bar', 'Smart TV', 'Free WiFi'],
      pricePerNight: 45,
      priceLabel: 'From $45/night',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      capacity: '2 Guests',
      size: '25 sqm',
      available: true,
    },
    {
      name: 'Garden View Room',
      shortName: 'Non A/C Room',
      description: 'Embrace the natural coastal breeze in our garden-view rooms. Designed for eco-conscious travelers who appreciate natural ventilation.',
      features: ['Ceiling Fans', 'Private Bathroom', 'Garden View', 'Natural Ventilation', 'Smart TV', 'Free WiFi'],
      pricePerNight: 30,
      priceLabel: 'From $30/night',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      capacity: '2 Guests',
      size: '22 sqm',
      available: true,
    },
    {
      name: 'Half Board Villa',
      shortName: 'Half Board',
      description: 'Reserve an entire floor of Villa i for your family, corporate retreat, or private party. Enjoy dedicated living spaces, personalized service, and a full half-board experience with breakfast and dinner included.',
      features: ['Full Floor Access', 'Multiple Rooms', 'Private Living Area', 'Event & Party Ready', 'Breakfast & Dinner Included', 'Free WiFi'],
      pricePerNight: 120,
      priceLabel: 'From $120/night',
      image: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
      capacity: '8–12 Guests',
      size: '180 sqm',
      available: true,
    },
    {
      name: 'Full Villa Exclusive',
      shortName: 'Full Villa',
      description: 'The ultimate private luxury experience. Book the entire Villa i for your group or event and enjoy exclusive access to all amenities.',
      features: ['All Rooms Included', 'Private Garden', 'Full Kitchen', 'Event Space', 'Concierge Service', 'Free WiFi'],
      pricePerNight: 250,
      priceLabel: 'From $250/night',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      capacity: 'Up to 15 Guests',
      size: '350 sqm',
      available: true,
    },
  ]

  // Remove old family-suite room if it exists (renamed to Half Board Villa)
  await prisma.room.deleteMany({ where: { id: 'family-suite' } })

  for (const room of roomsData) {
    await prisma.room.upsert({
      where: { id: room.name.toLowerCase().replace(/\s+/g, '-') },
      update: room,
      create: { id: room.name.toLowerCase().replace(/\s+/g, '-'), ...room },
    })
  }
  console.log(`✅ Seeded ${roomsData.length} rooms`)

  // Services — clear all and reseed with the full 6-service set
  await prisma.service.deleteMany({})
  const servicesData = [
    {
      id: 'accommodation',
      title: 'Luxury Accommodation',
      description: 'Choose from our range of thoughtfully designed rooms and suites, each offering a unique blend of comfort and coastal charm.',
      icon: '🏨',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
      features: ['A/C & Non A/C options', 'Half Board Villa available', 'Full villa booking', 'Daily housekeeping'],
    },
    {
      id: 'spa',
      title: 'Spa & Wellness',
      description: 'Indulge in rejuvenating massage and therapy treatments in our serene spa sanctuary. Our skilled therapists blend traditional Sri Lankan healing with modern wellness techniques.',
      icon: '💆',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=85',
      features: ['Traditional massages', 'Aromatherapy sessions', 'Body scrubs & wraps', 'Therapy treatments'],
    },
    {
      id: 'beach',
      title: 'Beach Access',
      description: 'Steps away from the pristine shores of Mount Lavinia beach, perfect for morning swims, sunset walks, and water activities.',
      icon: '🌊',
      image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85',
      features: ['100m to beach', 'Beach equipment', 'Stunning sunset views', 'Water activities nearby'],
    },
    {
      id: 'party',
      title: 'Party Arrangements',
      description: 'Host unforgettable events at Villa i. From intimate family celebrations to corporate gatherings, we handle every detail — venue, meals, chef, and décor — so you can simply enjoy.',
      icon: '🎉',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=85',
      features: ['Event space booking', 'Full meal packages', 'Private chef hire', 'Décor & setup included'],
    },
    {
      id: 'juice-corner',
      title: 'Juice Corner',
      description: 'Refresh and revitalize at our vibrant juice corner. We blend the finest tropical fruits and superfoods into a colorful menu of fresh juices, smoothies, and mocktails.',
      icon: '🍹',
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=900&q=85',
      features: ['Fresh tropical juices', 'Smoothies & blends', 'Mocktails & lemonades', 'Seasonal specials'],
    },
    {
      id: 'byob',
      title: 'BYOB & Bar Lounge',
      description: 'Bring your own spirits and enjoy them in our dedicated bar lounge area. We provide the setup, glassware, ice, and a relaxed atmosphere for a perfect evening.',
      icon: '🥂',
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=85',
      features: ['BYOB permitted', 'Dedicated bar lounge', 'Glassware & ice included', 'Relaxed serving area'],
    },
  ]

  for (const service of servicesData) {
    await prisma.service.create({ data: service })
  }
  console.log(`✅ Seeded ${servicesData.length} services`)

  console.log('\n🎉 Seed complete!')
  console.log('   Admin login: admin@villaihotel.com / admin123')
  console.log('   ⚠️  Change the admin password after first login!\n')
}

main()
  .catch((e) => { console.error('Seed error:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
