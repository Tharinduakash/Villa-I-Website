'use client'
import AnimatedSection from '@/components/AnimatedSection'

export default function RoomsIntro() {
  return (
    <section className="section-gradient-mid border-b border-white/5 py-12">
      <div className="container-padding">
        <AnimatedSection className="max-w-2xl">
          <p className="text-white/60 font-lato text-base leading-relaxed">
            At Villa i Hotel, we believe that a room is more than just a place to rest.It's your personal sanctuary, a canvas for unforgettable memories, and the heart of your experience with us. 
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
