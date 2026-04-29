'use client'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'

export default function AboutIntro() {
  return (
    <section className="section-padding section-gradient-a">
      <div className="container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-4">Who We Are</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white leading-tight mb-6">
              A Hidden Coastal{' '}
              <span className="italic text-luxury-gold">Retreat</span>
            </h2>
            <p className="text-white/60 font-lato text-base leading-relaxed mb-5">
              Villa i Hotel is a boutique luxury retreat nestled in the heart of Mount Lavinia, Sri Lanka.
              Located just 50 metres from the Indian Ocean, we offer a rare combination of privacy,
              comfort, and authentic Sri Lankan hospitality.
            </p>
            <p className="text-white/60 font-lato text-base leading-relaxed mb-8">
              Whether you are seeking a romantic getaway, a family holiday, or an exclusive villa
              experience, Villa i is your private sanctuary by the sea. Our team of dedicated hosts
              ensures every moment of your stay feels effortless and extraordinary.
            </p>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-luxury-gold text-luxury-black font-lato text-xs tracking-[0.3em] uppercase hover:bg-luxury-gold-light transition-colors duration-300"
            >
              Plan Your Stay
            </Link>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="relative">
              <div className="relative h-[480px] overflow-hidden">
                <Image
                  src="/webp/room7.jpg"
                  alt="Villa i Pool Garden"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-luxury-dark border border-luxury-gold/30 p-6">
                <p className="text-luxury-gold font-playfair text-3xl font-bold">10+</p>
                <p className="text-white/50 font-lato text-xs tracking-wide mt-1">Years of Excellence</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
