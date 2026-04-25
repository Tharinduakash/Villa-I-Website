'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import BookingBanner from '@/components/BookingBanner'

const values = [
  { label: 'Established', value: '2010' },
  { label: 'Happy Guests', value: '5000+' },
  { label: 'To the Beach', value: '100m' },
  { label: 'Room Types', value: '4' },
]

const story = [
  {
    year: '2010',
    title: 'A Vision by the Shore',
    text: 'Villa i began as a dream — to create a sanctuary where travelers could experience Sri Lanka\'s coastal beauty without sacrificing comfort or privacy.',
  },
  {
    year: '2015',
    title: 'Growing in Warmth',
    text: 'After welcoming thousands of guests from around the world, we expanded our offerings to include family suites and the full villa booking experience.',
  },
  {
    year: 'Today',
    title: 'A Beloved Retreat',
    text: 'Recognized for our personalized hospitality and authentic charm, Villa i continues to be the preferred coastal escape for discerning travelers.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=85"
          alt="Villa i Hotel Exterior"
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
            <p className="text-luxury-gold font-lato text-xs tracking-[0.4em] uppercase mb-3">Our Story</p>
            <h1 className="font-playfair text-5xl md:text-7xl text-white">
              About <span className="italic text-luxury-gold">Villa i</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── INTRO ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-luxury-black">
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
                Located just 100 metres from the Indian Ocean, we offer a rare combination of privacy,
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
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85"
                    alt="Villa i Pool Garden"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating stats box */}
                <div className="absolute -bottom-6 -left-6 bg-luxury-dark border border-luxury-gold/30 p-6">
                  <p className="text-luxury-gold font-playfair text-3xl font-bold">14+</p>
                  <p className="text-white/50 font-lato text-xs tracking-wide mt-1">Years of Excellence</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────────────── */}
      <section className="bg-luxury-dark border-y border-white/5 py-14">
        <div className="container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.1} className="text-center">
                <p className="font-playfair text-4xl md:text-5xl text-luxury-gold mb-2">{item.value}</p>
                <p className="text-white/40 font-lato text-xs tracking-[0.2em] uppercase">{item.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR STORY TIMELINE ───────────────────────────────────── */}
      <section className="section-padding bg-luxury-black">
        <div className="container-padding">
          <AnimatedSection className="text-center mb-14">
            <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">Our Journey</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white">
              The Villa i <span className="italic text-luxury-gold">Story</span>
            </h2>
          </AnimatedSection>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-luxury-gold/20 md:-translate-x-px" />

            {story.map((item, i) => (
              <AnimatedSection
                key={item.year}
                delay={i * 0.2}
                className={`relative flex gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <span className="text-luxury-gold font-playfair text-lg italic">{item.year}</span>
                  <h3 className="font-playfair text-xl text-white mt-1 mb-3">{item.title}</h3>
                  <p className="text-white/50 font-lato text-sm leading-relaxed">{item.text}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 top-1 w-3 h-3 bg-luxury-gold rounded-full md:-translate-x-1.5 -translate-x-1.5" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCATION ADVANTAGE ────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1586861203927-800a5acddfbd?w=800&q=85"
              alt="Mount Lavinia Coastline"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="bg-luxury-dark px-10 py-16 lg:py-24 flex items-center">
            <AnimatedSection direction="right">
              <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-4">Location</p>
              <h2 className="font-playfair text-4xl text-white leading-tight mb-6">
                Where Land Meets{' '}
                <span className="italic text-luxury-gold">Ocean</span>
              </h2>
              <p className="text-white/60 font-lato text-sm leading-relaxed mb-6">
                Mount Lavinia is one of Sri Lanka&apos;s most celebrated coastal destinations — a
                vibrant yet tranquil suburb of Colombo, beloved for its golden beaches, fresh seafood,
                and legendary sunsets.
              </p>
              <ul className="space-y-3">
                {[
                  '100m walk to Mount Lavinia Beach',
                  '10 minutes from Colombo City Centre',
                  'Easy access from Bandaranaike Airport',
                  'Near local restaurants and seafood shacks',
                  'Adjacent to Galle Road (A2 Highway)',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-white/50 font-lato text-sm">
                    <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <BookingBanner />
    </>
  )
}
