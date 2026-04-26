'use client'
import AnimatedSection from '@/components/AnimatedSection'
import ServiceCard from '@/components/ServiceCard'
import { services } from '@/lib/data'

export default function ServicesGrid() {
  return (
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
  )
}
