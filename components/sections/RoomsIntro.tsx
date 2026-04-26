'use client'
import AnimatedSection from '@/components/AnimatedSection'

export default function RoomsIntro() {
  return (
    <section className="bg-luxury-dark border-b border-white/5 py-12">
      <div className="container-padding">
        <AnimatedSection className="max-w-2xl">
          <p className="text-white/60 font-lato text-base leading-relaxed">
            Each room at Villa i has been thoughtfully designed to bring comfort and coastal elegance
            together. Choose the space that suits your journey — from intimate rooms to an exclusive
            full villa experience.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
