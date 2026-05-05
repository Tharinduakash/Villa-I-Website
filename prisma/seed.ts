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

  // Rooms — clear FK references on bookings, then delete and recreate with correct IDs
  await prisma.booking.updateMany({ data: { roomId: null } })
  await prisma.room.deleteMany({})

  const roomsData = [
    {
      id: 'ac-room',
      name: 'Air Conditioned Room',
      shortName: 'A/C Room',
      description:
        'A serene retreat with modern amenities and cooling comfort. Perfect for couples and solo travelers seeking a refreshing stay near the beach.',
      features: ['Air Conditioning', 'Private Bathroom', 'Sea-view Balcony', 'Mini Bar', 'Smart TV', 'Free WiFi'],
      pricePerNight: 20,
      priceLabel: 'From Rs. 6,000/night',
      image: '/webp/IMG_2980.webp',
      images: [],
      capacity: '2 Guests',
      size: '25 sqm',
      available: true,
    },
    {
      id: 'non-ac-room',
      name: 'Garden View Room',
      shortName: 'Non A/C Room',
      description:
        'Embrace the natural coastal breeze in our garden-view rooms. Designed for eco-conscious travelers who appreciate natural ventilation.',
      features: ['Ceiling Fans', 'Private Bathroom', 'Garden View', 'Natural Ventilation', 'Smart TV', 'Free WiFi'],
      pricePerNight: 13,
      priceLabel: 'From Rs. 4,000/night',
      image: '/webp/IMG_3176.webp',
      images: [],
      capacity: '2 Guests',
      size: '22 sqm',
      available: true,
    },
    {
      id: 'family-room',
      name: 'Half Board Villa',
      shortName: 'Half Board',
      description:
        'Reserve an entire floor of Villa i for your family, corporate retreat, or private party. Enjoy dedicated living spaces, personalized service, and a full half-board experience with breakfast and dinner included.',
      features: ['Full Floor Access', 'Multiple Rooms', 'Private Living Area', 'Event & Party Ready', 'Breakfast & Dinner Included', 'Free WiFi'],
      pricePerNight: 83,
      priceLabel: 'From Rs. 25,000/night',
      image: '/webp/IMG_3236.webp',
      images: [],
      capacity: '8–12 Guests',
      size: '180 sqm',
      available: true,
    },
    {
      id: 'full-villa',
      name: 'Full Villa Exclusive',
      shortName: 'Full Villa',
      description:
        'The ultimate private luxury experience. Book the entire Villa i for your group or event and enjoy exclusive access to all amenities.',
      features: ['All Rooms Included', 'Private Garden', 'Full Kitchen', 'Event Space', 'Concierge Service', 'Free WiFi'],
      pricePerNight: 135,
      priceLabel: 'From Rs. 40,000/night',
      image: '/webp/IMG_3118.webp',
      images: [],
      capacity: 'Up to 15 Guests',
      size: '350 sqm',
      available: true,
    },
  ]

  for (const room of roomsData) {
    await prisma.room.create({ data: room })
  }
  console.log(`✅ Seeded ${roomsData.length} rooms`)

  // Services — clear all and reseed (images left empty so UI fallbacks take over)
  await prisma.service.deleteMany({})
  const servicesData = [
    {
      id: 'accommodation',
      title: 'Luxury Accommodation',
      description:
        'Choose from our range of thoughtfully designed rooms and suites, each offering a unique blend of comfort and coastal charm.',
      icon: '🏨',
      image: '/webp/IMG_3022.webp',
      features: ['A/C & Non A/C options', 'Half Board Villa available', 'Full villa booking', 'Daily housekeeping'],
    },
    {
      id: 'spa',
      title: 'Spa & Wellness',
      description:
        'Indulge in rejuvenating massage and therapy treatments in our serene spa sanctuary. Our skilled therapists blend traditional Sri Lankan healing with modern wellness techniques.',
      icon: '🌿',
      image: '/webp/P22.webp',
      features: ['Traditional massages', 'Aromatherapy sessions', 'Body scrubs & wraps', 'Therapy treatments'],
    },
    {
      id: 'beach',
      title: 'Beach Access',
      description:
        'Steps away from the pristine shores of Mount Lavinia beach, perfect for morning swims, sunset walks, and water activities.',
      icon: '🌊',
      image: '/webp/pexels-tomas-malik-793526-1998439.webp',
      features: ['100m to beach', 'Beach equipment', 'Stunning sunset views', 'Water activities nearby'],
    },
    {
      id: 'party',
      title: 'Party Arrangements',
      description:
        'Host unforgettable events at Villa i. From intimate family celebrations to corporate gatherings, we handle every detail — venue, meals, chef, and décor — so you can simply enjoy.',
      icon: '🎉',
      image: '/webp/party.webp',
      features: ['Event space booking', 'Full meal packages', 'Private chef hire', 'Décor & setup included'],
    },
    {
      id: 'juice-corner',
      title: 'Juice Corner',
      description:
        'Refresh and revitalize at our vibrant juice corner. We blend the finest tropical fruits and superfoods into a colorful menu of fresh juices, smoothies, and mocktails.',
      icon: '🍹',
      image: '/webp/drinks2.jpg',
      features: ['Fresh tropical juices', 'Smoothies & blends', 'Mocktails & lemonades', 'Seasonal specials'],
    },
    {
      id: 'byob',
      title: 'BYOB & Bar Lounge',
      description:
        'Bring your own spirits and enjoy them in our dedicated bar lounge area. We provide the setup, glassware, ice, and a relaxed atmosphere for a perfect evening.',
      icon: '🥂',
      image: '/webp/byob.jpg',
      features: ['BYOB permitted', 'Dedicated bar lounge', 'Glassware & ice included', 'Relaxed serving area'],
    },
  ]

  for (const service of servicesData) {
    await prisma.service.create({ data: service })
  }
  console.log(`✅ Seeded ${servicesData.length} services`)

  // Gallery reviews — only seed if none exist
  const galleryCount = await prisma.galleryReview.count()
  if (galleryCount === 0) {
    const galleryPhotos = [
      { title: 'Comfort with a View',      image: '/webp/IMG_2980.webp',                            guestName: 'Sarah Mitchell',    email: 'sarah.mitchell@example.com',    roomType: 'A/C Room',    rating: 5, review: 'Waking up to this view every morning was absolutely magical.', year: 2025, span: 3 },
      { title: 'Beach Experience',          image: '/webp/beach.avif',                               guestName: "James O'Brien",     email: 'james.obrien@example.com',      roomType: 'A/C Room',    rating: 5, review: 'The beach access was a dream come true.',                     year: 2025, span: 2 },
      { title: 'Luxury Suite Interior',     image: '/webp/IMG_3065.webp',                            guestName: 'Lena Hoffmann',     email: 'lena.hoffmann@example.com',     roomType: 'A/C Room',    rating: 5, review: 'Spotless, elegant and so comfortable.',                       year: 2026, span: 1 },
      { title: 'Beach Walk at Dusk',        image: '/webp/pexels-vika-glitter-392079-31277449.jpg',  guestName: 'Priya Wijesekara',  email: 'priya.wijesekara@example.com',  roomType: 'Family Room', rating: 5, review: 'The beach literally steps away. We went every evening.',        year: 2025, span: 2 },
      { title: 'Evening Vibe',              image: '/webp/girls1.jpg',                               guestName: 'Marco Rossi',       email: 'marco.rossi@example.com',       roomType: 'Non A/C Room',rating: 5, review: 'The home-cooked meals were the highlight of our stay.',        year: 2026, span: 3 },
      { title: 'Family Villa Time',         image: '/webp/beach-girl.jpg',                           guestName: 'Emma Thornton',     email: 'emma.thornton@example.com',     roomType: 'Full Villa',  rating: 5, review: 'Booked the whole villa for our family — best decision.',        year: 2025, span: 1 },
      { title: 'Sunset from the Balcony',   image: '/webp/IMG_3176.webp',                            guestName: 'Amal Perera',       email: 'amal.perera@example.com',       roomType: 'A/C Room',    rating: 5, review: 'That golden hour from our balcony — unforgettable.',             year: 2026, span: 2 },
      { title: 'Family Suite Living Area',  image: '/webp/IMG_3123.webp',                            guestName: 'Thilini Kumari',    email: 'thilini.kumari@example.com',    roomType: 'Family Room', rating: 4, review: 'Plenty of space for all four of us. Kids loved it.',             year: 2025, span: 1 },
      { title: 'Dinner with an Ocean View', image: '/webp/foods11.jpg',                              guestName: 'Chathu Silva',      email: 'chathu.silva@example.com',      roomType: 'Non A/C Room',rating: 5, review: 'Incredible location. The sound of waves all night long.',        year: 2025, span: 3 },
      { title: 'Living Area',               image: '/webp/IMG_3002.webp',                            guestName: 'Dinesh Rathnayake', email: 'dinesh.rathnayake@example.com', roomType: 'Non A/C Room',rating: 4, review: 'Cozy and comfortable, with a rustic charm.',                    year: 2026, span: 2 },
      { title: 'Comfort Washroom',          image: '/webp/IMG_3049.webp',                            guestName: 'Nina Schreiber',    email: 'nina.schreiber@example.com',    roomType: 'A/C Room',    rating: 5, review: 'Bathroom was such a unique experience!',                        year: 2025, span: 1 },
      { title: 'Villa Exterior at Night',   image: '/webp/foods4.jpg',                               guestName: 'Oliver Jensen',     email: 'oliver.jensen@example.com',     roomType: 'Full Villa',  rating: 5, review: 'The whole property glows beautifully at night.',               year: 2025, span: 1 },
    ]
    await prisma.galleryReview.createMany({
      data: galleryPhotos.map((p) => ({ ...p, approved: true })),
    })
    console.log(`✅ Seeded ${galleryPhotos.length} gallery photos`)
  } else {
    console.log(`⏭️  Gallery: ${galleryCount} records already exist, skipping`)
  }

  console.log('\n🎉 Seed complete!')
  console.log('   Admin login: admin@villaihotel.com / admin123')
  console.log('   ⚠️  Change the admin password after first login!\n')
}

main()
  .catch((e) => { console.error('Seed error:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
