'use client'
import AnimatedSection from '@/components/AnimatedSection'

const story = [
  {
    year: '2010',
    title: 'A Vision by the Shore',
    text: "Villa i began as a dream — to create a sanctuary where travelers could experience Sri Lanka's coastal beauty without sacrificing comfort or privacy.",
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

export default function AboutStory() {
  return (
    <section className="section-padding bg-luxury-black">
      <div className="container-padding">
        <AnimatedSection className="text-center mb-14">
          <p className="text-luxury-gold font-lato text-xs tracking-[0.3em] uppercase mb-3">Our Journey</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white">
            The Villa i <span className="italic text-luxury-gold">Story</span>
          </h2>
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-luxury-gold/20 md:-translate-x-px" />
          {story.map((item, i) => (
            <AnimatedSection
              key={item.year}
              delay={i * 0.2}
              className={`relative flex gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className={`flex-1 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <span className="text-luxury-gold font-playfair text-lg italic">{item.year}</span>
                <h3 className="font-playfair text-xl text-white mt-1 mb-3">{item.title}</h3>
                <p className="text-white/50 font-lato text-sm leading-relaxed">{item.text}</p>
              </div>
              <div className="absolute left-0 md:left-1/2 top-1 w-3 h-3 bg-luxury-gold rounded-full md:-translate-x-1.5 -translate-x-1.5" />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
