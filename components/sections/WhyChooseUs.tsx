'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'

const cards = [
  {
    title: 'Party Arrangements',
    description:
      'Celebrate in style with our expert party planning services. From intimate gatherings to grand celebrations, we create unforgettable experiences tailored to your vision.',
    image: '/webp/party.webp',
    tag: 'Unforgettable Events',
    stat: '70+',
    statLabel: 'Events Hosted',
  },
  {
    title: 'BYOB & Private Dining',
    description:
      'Indulge in personalized dining experiences with our BYOB and private dining options. Savor exquisite meals in an intimate setting, crafted to your preferences.',
    image: '/webp/byob.jpg',
    tag: 'Exclusive Dining',
    stat: '5 mins',
    statLabel: 'From Your Room',
  },
  {
    title: 'Beach Vibes',
    description:
      'Enjoy direct access to pristine beaches from our luxurious accommodations. Experience the perfect blend of comfort and coastal beauty, just steps away from your room.',
    image: '/webp/pexels-freestockpro-320184.webp',
    tag: 'Premium Value',
    stat: '4.9★',
    statLabel: 'Guest Rating',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding section-gradient-a overflow-hidden">
      <div className="container-padding">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block h-px w-10" style={{ background: 'rgba(176,141,87,0.5)' }} />
            <p className="font-lato text-xs tracking-[0.4em] uppercase text-luxury-gold">Why Villa i</p>
            <span className="block h-px w-10" style={{ background: 'rgba(176,141,87,0.5)' }} />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl text-white">
            More Than a{' '}
            <span className="italic text-luxury-gold">Stay</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden flex flex-col"
              style={{
                border: '1px solid rgba(176,141,87,0.10)',
                background: 'linear-gradient(160deg, #0f1228 0%, #07091c 100%)',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(176,141,87,0.40)'
                el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(176,141,87,0.07)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(176,141,87,0.10)'
                el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'
              }}
            >
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 z-20 pointer-events-none">
                <div className="w-6 h-px transition-all duration-500 group-hover:w-10"
                  style={{ background: 'linear-gradient(to right, rgba(176,141,87,0.9), transparent)' }} />
                <div className="w-px h-6 transition-all duration-500 group-hover:h-10"
                  style={{ background: 'linear-gradient(to bottom, rgba(176,141,87,0.9), transparent)' }} />
              </div>
              <div className="absolute bottom-0 right-0 z-20 pointer-events-none">
                <div className="w-6 h-px ml-auto transition-all duration-500 group-hover:w-10"
                  style={{ background: 'linear-gradient(to left, rgba(176,141,87,0.9), transparent)' }} />
                <div className="w-px h-6 ml-auto transition-all duration-500 group-hover:h-10"
                  style={{ background: 'linear-gradient(to top, rgba(176,141,87,0.9), transparent)', marginLeft: 'auto' }} />
              </div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out"
                  style={{ transform: 'scale(1.0)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.0)' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5,7,14,0.05) 0%, rgba(5,7,14,0.12) 40%, rgba(5,7,14,0.85) 80%, rgba(5,7,14,1) 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(176,141,87,0.10) 0%, transparent 50%, rgba(176,141,87,0.06) 100%)',
                  }}
                />
                <div
                  className="absolute top-4 left-4 px-2.5 py-1"
                  style={{
                    background: 'rgba(5,7,14,0.82)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(176,141,87,0.25)',
                  }}
                >
                  <span className="font-lato text-[9px] tracking-[0.3em] uppercase text-luxury-gold/80">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-5 text-right">
                  <p
                    className="font-playfair text-2xl leading-none transition-colors duration-300 group-hover:text-luxury-gold"
                    style={{ color: 'rgba(176,141,87,0.9)' }}
                  >
                    {item.stat}
                  </p>
                  <p
                    className="font-lato text-[9px] tracking-[0.2em] uppercase mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {item.statLabel}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
                <h3
                  className="font-playfair text-xl mb-3 transition-colors duration-300 group-hover:text-luxury-gold"
                  style={{ color: 'rgba(255,255,255,0.92)' }}
                >
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block h-px flex-1" style={{ background: 'rgba(176,141,87,0.12)' }} />
                  <span className="block w-1 h-1 rotate-45" style={{ background: 'rgba(176,141,87,0.35)' }} />
                  <span className="block h-px flex-1" style={{ background: 'rgba(176,141,87,0.12)' }} />
                </div>
                <p
                  className="font-lato text-sm leading-relaxed flex-1"
                  style={{ color: 'rgba(255,255,255,0.42)' }}
                >
                  {item.description}
                </p>
                <div
                  className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.7), transparent)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
