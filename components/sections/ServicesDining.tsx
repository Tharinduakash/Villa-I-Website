'use client'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'

const tags = ['Sri Lankan Cuisine', 'Fresh Seafood', 'Western Options', 'Vegetarian Friendly', 'In-Room Dining']

export default function ServicesDining() {
  return (
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
              {tags.map((tag) => (
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
  )
}
