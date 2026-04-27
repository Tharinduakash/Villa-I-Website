'use client'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'

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

export default function ServicesPackages() {
  return (
    <section className="section-padding section-gradient-a">
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
  )
}
