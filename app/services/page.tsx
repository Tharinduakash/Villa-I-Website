'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import ServiceCard from '@/components/ServiceCard'
import BookingBanner from '@/components/BookingBanner'
import { services } from '@/lib/data'

const packages = [
  {
    name: 'Beach Escape',
    subtitle: 'Ideal for Couples',
    price: 'From $80/night',
    features: ['A/C Room', 'Daily Breakfast', 'Beach Access', 'Welcome Drink', 'Free WiFi'],
    highlight: false,
  },
  {
    name: 'Family Retreat',
    subtitle: 'Perfect for Families',
    price: 'From $130/night',
    features: ['Family Suite', 'Full Board Meals', 'Beach Access', 'Children Activities', 'Airport Transfer'],
    highlight: true,
  },
  {
    name: 'Villa Exclusive',
    subtitle: 'For Groups & Events',
    price: 'From $300/night',
    features: ['Full Villa', 'All Meals Included', 'Private Garden', 'Concierge Service', 'Event Setup'],
    highlight: false,
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[450px] overflow-hidden flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85"
          alt="Villa i Dining Experience"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-luxury-black/20" />
        <div className="relative z-10 container-padding w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-luxury-gold font-lato text-xs tracking-[0.4em] uppercase mb-3">What We Offer</p>
            <h1 className="font-playfair text-5xl md:text-7xl text-white">
              Our <span className="italic text-luxury-gold">Services</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─────────────────────────────────────────── */}
      <section className="section-padding bg-luxury-black">
        <div className="container-padding">
          <AnimatedSection className="text-center mb-14">
            <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">Experiences</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white">
              Crafted for Your{' '}
              <span className="italic text-luxury-gold">Comfort</span>
            </h2>
            <p className="text-white/50 font-lato text-base max-w-xl mx-auto mt-4">
              Every service at Villa i is designed to make your stay seamless, memorable, and deeply relaxing.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── DINING FEATURE ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-luxury-dark px-10 py-16 lg:py-24 flex items-center order-2 lg:order-1">
            <AnimatedSection direction="left">
              <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-4">Dining</p>
              <h2 className="font-playfair text-4xl text-white leading-tight mb-6">
                A Taste of{' '}
                <span className="italic text-luxury-gold">Sri Lanka</span>
              </h2>
              <p className="text-white/60 font-lato text-sm leading-relaxed mb-5">
                Our culinary experience celebrates the rich flavors of Sri Lankan cuisine — aromatic
                curries, fresh seafood, tropical fruits — all prepared with love and local expertise.
              </p>
              <p className="text-white/60 font-lato text-sm leading-relaxed mb-8">
                Guests can enjoy breakfast with ocean views, hearty local lunches, and candlelit dinners
                in our garden. International options are also available on request.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Sri Lankan Cuisine', 'Fresh Seafood', 'Western Options', 'Vegetarian Friendly', 'In-Room Dining'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 border border-luxury-gold/30 text-luxury-gold font-lato text-xs tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <div className="relative h-[400px] lg:h-auto order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85"
              alt="Sri Lankan Dining"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ───────────────────────────────────────────────── */}
      <section className="section-padding bg-luxury-black">
        <div className="container-padding">
          <AnimatedSection className="text-center mb-14">
            <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">Stay Packages</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white">
              Choose Your{' '}
              <span className="italic text-luxury-gold">Experience</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <AnimatedSection
                key={pkg.name}
                delay={i * 0.15}
                className={`relative p-8 border transition-all duration-300 ${
                  pkg.highlight
                    ? 'border-luxury-gold bg-luxury-dark'
                    : 'border-white/8 bg-luxury-dark hover:border-luxury-gold/40'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-luxury-gold px-4 py-1">
                    <span className="text-luxury-black font-lato text-xs tracking-widest uppercase">Most Popular</span>
                  </div>
                )}
                <p className="text-white/40 font-lato text-xs tracking-[0.2em] uppercase mb-1">{pkg.subtitle}</p>
                <h3 className="font-playfair text-2xl text-white mb-2">{pkg.name}</h3>
                <p className="text-luxury-gold font-playfair text-xl italic mb-6">{pkg.price}</p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-white/50 font-lato text-sm">
                      <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center py-3 font-lato text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                    pkg.highlight
                      ? 'bg-luxury-gold text-luxury-black hover:bg-luxury-gold-light'
                      : 'border border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black'
                  }`}
                >
                  Book This Package
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <BookingBanner />
    </>
  )
}
