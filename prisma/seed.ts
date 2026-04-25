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
      name: 'Family Suite',
      shortName: 'Family Room',
      description: 'Spacious and comfortable, our family suites offer extra room for the whole family to relax and enjoy the coastal lifestyle together.',
      features: ['Air Conditioning', 'Multiple Beds', 'Living Area', 'Kitchen Corner', 'Smart TV', 'Free WiFi'],
      pricePerNight: 75,
      priceLabel: 'From $75/night',
      image: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
      capacity: '4–6 Guests',
      size: '45 sqm',
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

  for (const room of roomsData) {
    await prisma.room.upsert({
      where: { id: room.name.toLowerCase().replace(/\s+/g, '-') },
      update: room,
      create: { id: room.name.toLowerCase().replace(/\s+/g, '-'), ...room },
    })
  }
  console.log(`✅ Seeded ${roomsData.length} rooms`)

  // Services
  const servicesData = [
    {
      title: 'Luxury Accommodation',
      description: 'Choose from our range of thoughtfully designed rooms and suites, each offering a unique blend of comfort and coastal charm.',
      icon: '🏨',
      features: ['A/C & Non A/C options', 'Family suites available', 'Full villa booking', 'Daily housekeeping'],
    },
    {
      title: 'Culinary Experience',
      description: 'Savor authentic Sri Lankan cuisine and international favorites, prepared fresh with local ingredients and ocean-inspired flavors.',
      icon: '🍽️',
      features: ['Breakfast included', 'Sri Lankan cuisine', 'Western menu options', 'Dietary needs catered'],
    },
    {
      title: 'Beach Access',
      description: 'Steps away from the pristine shores of Mount Lavinia beach, perfect for morning swims, sunset walks, and water activities.',
      icon: '🌊',
      features: ['100m to beach', 'Beach equipment', 'Stunning sunset views', 'Water activities nearby'],
    },
    {
      title: 'Relaxation & Wellness',
      description: 'Unwind in our serene garden spaces, enjoy tropical breezes, and experience the restorative calm of coastal living.',
      icon: '🌿',
      features: ['Tropical garden spaces', 'Meditation areas', 'Yoga sessions on request', 'Spa treatments'],
    },
  ]

  for (const service of servicesData) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } })
    if (!existing) {
      await prisma.service.create({ data: service })
    }
  }
  console.log(`✅ Seeded ${servicesData.length} services`)

  console.log('\n🎉 Seed complete!')
  console.log('   Admin login: admin@villaihotel.com / admin123')
  console.log('   ⚠️  Change the admin password after first login!\n')
}

main()
  .catch((e) => { console.error('Seed error:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
