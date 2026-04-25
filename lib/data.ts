export const rooms = [
  {
    id: 'ac-room',
    name: 'Air Conditioned Room',
    shortName: 'A/C Room',
    description:
      'A serene retreat with modern amenities and cooling comfort. Perfect for couples and solo travelers seeking a refreshing stay near the beach.',
    features: ['Air Conditioning', 'Private Bathroom', 'Sea-view Balcony', 'Mini Bar', 'Smart TV', 'Free WiFi'],
    price: 'From $45/night',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    capacity: '2 Guests',
    size: '25 sqm',
  },
  {
    id: 'non-ac-room',
    name: 'Garden View Room',
    shortName: 'Non A/C Room',
    description:
      'Embrace the natural coastal breeze in our garden-view rooms. Designed for eco-conscious travelers who appreciate natural ventilation.',
    features: ['Ceiling Fans', 'Private Bathroom', 'Garden View', 'Natural Ventilation', 'Smart TV', 'Free WiFi'],
    price: 'From $30/night',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    capacity: '2 Guests',
    size: '22 sqm',
  },
  {
    id: 'family-room',
    name: 'Family Suite',
    shortName: 'Family Room',
    description:
      'Spacious and comfortable, our family suites offer extra room for the whole family to relax and enjoy the coastal lifestyle together.',
    features: ['Air Conditioning', 'Multiple Beds', 'Living Area', 'Kitchen Corner', 'Smart TV', 'Free WiFi'],
    price: 'From $75/night',
    image: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
    capacity: '4–6 Guests',
    size: '45 sqm',
  },
  {
    id: 'full-villa',
    name: 'Full Villa Exclusive',
    shortName: 'Full Villa',
    description:
      'The ultimate private luxury experience. Book the entire Villa i for your group or event and enjoy exclusive access to all amenities.',
    features: [
      'All Rooms Included',
      'Private Garden',
      'Full Kitchen',
      'Event Space',
      'Concierge Service',
      'Free WiFi',
    ],
    price: 'From $250/night',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    capacity: 'Up to 15 Guests',
    size: '350 sqm',
  },
]

export const services = [
  {
    id: 'accommodation',
    title: 'Luxury Accommodation',
    description:
      'Choose from our range of thoughtfully designed rooms and suites, each offering a unique blend of comfort and coastal charm.',
    icon: '🏨',
    features: ['A/C & Non A/C options', 'Family suites available', 'Full villa booking', 'Daily housekeeping'],
  },
  {
    id: 'dining',
    title: 'Culinary Experience',
    description:
      'Savor authentic Sri Lankan cuisine and international favorites, prepared fresh with local ingredients and ocean-inspired flavors.',
    icon: '🍽️',
    features: ['Breakfast included', 'Sri Lankan cuisine', 'Western menu options', 'Dietary needs catered'],
  },
  {
    id: 'beach',
    title: 'Beach Access',
    description:
      'Steps away from the pristine shores of Mount Lavinia beach, perfect for morning swims, sunset walks, and water activities.',
    icon: '🌊',
    features: ['100m to beach', 'Beach equipment', 'Stunning sunset views', 'Water activities nearby'],
  },
  {
    id: 'wellness',
    title: 'Relaxation & Wellness',
    description:
      'Unwind in our serene garden spaces, enjoy tropical breezes, and experience the restorative calm of coastal living.',
    icon: '🌿',
    features: ['Tropical garden spaces', 'Meditation areas', 'Yoga sessions on request', 'Spa treatments'],
  },
]

export const galleryImages = [
  {
    src: '/webp/room1.jpg',
    alt: 'Mount Lavinia Beach',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    alt: 'Villa Pool Area',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    alt: 'Luxury Room',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    alt: 'Fine Dining',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    alt: 'Full Villa',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
    alt: 'Family Suite',
    span: '',
  },
]

export const highlights = [
  { icon: 'beach', label: '100m to Beach' },
  { icon: 'privacy', label: 'Full Villa Privacy' },
  { icon: 'meals', label: 'Meals Included' },
  { icon: 'climate', label: 'A/C & Non A/C' },
]



export const whyChooseUs = [
  {
    title: 'Local Experience',
    description:
      'Immerse yourself in authentic Sri Lankan hospitality, culture, and cuisine, guided by a passionate local team.',
    icon: '🇱🇰',
  },
  {
    title: 'Private & Peaceful',
    description:
      'Escape the crowds with our secluded villa setting. Your personal oasis awaits, with garden spaces and quiet luxury.',
    icon: '🌴',
  },
  {
    title: 'Affordable Luxury',
    description:
      'Experience world-class comfort and service at prices that make luxury accessible. Exceptional value by the sea.',
    icon: '✨',
  },
]
