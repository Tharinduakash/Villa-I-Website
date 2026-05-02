'use client'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'

const points = [
  '50m walk to Mount Lavinia Beach',
  '20 minutes from Colombo City Centre',
  'Easy access from Bandaranaike Airport',
  'Near local restaurants and seafood shacks',
  'Adjacent to Galle Road (A2 Highway)',
]

export default function AboutLocation() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[400px] lg:h-auto">
          <Image
            src="/webp/Anantara Tangalle - Dining by Design.jpg"
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
              Mount Lavinia is one of Sri Lanka&apos;s most celebrated coastal destinations. A
              vibrant yet tranquil suburb of Colombo, beloved for its golden beaches, fresh seafood,
              and legendary sunsets.
            </p>
            <ul className="space-y-3">
              {points.map((point) => (
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
  )
}
