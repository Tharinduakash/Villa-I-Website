'use client'
import AnimatedSection from '@/components/AnimatedSection'

const values = [
  { label: 'Established', value: '2010' },
  { label: 'Happy Guests', value: '5000+' },
  { label: 'To the Beach', value: '100m' },
  { label: 'Room Types', value: '4' },
]

export default function AboutStats() {
  return (
    <section className="section-gradient-mid border-y border-white/5 py-14">
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
  )
}
