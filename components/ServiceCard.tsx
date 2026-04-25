'use client'
import { motion } from 'framer-motion'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative p-8 border border-white/8 hover:border-luxury-gold/40 bg-luxury-dark hover:bg-luxury-dark/80 transition-all duration-500 overflow-hidden"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="text-4xl mb-5">{service.icon}</div>
        <h3 className="font-playfair text-xl text-white mb-3">{service.title}</h3>
        <p className="text-white/50 font-lato text-sm leading-relaxed mb-6">{service.description}</p>
        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-white/40 font-lato text-xs">
              <span className="w-1 h-1 bg-luxury-gold rounded-full shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-luxury-gold group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}
