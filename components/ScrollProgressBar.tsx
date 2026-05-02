'use client'
import { useScroll, motion } from 'framer-motion'

export default function ScrollProgressBar() {
  // target: document.body gives a stable scroll container and silences the
  // "non-static position" warning that appears when useScroll has no target
  const { scrollYProgress } = useScroll({ offset: ['start start', 'end end'] })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left center',
        background: 'linear-gradient(90deg, rgba(176,141,87,0.7) 0%, rgba(201,169,110,1) 60%, rgba(232,213,176,0.9) 100%)',
        boxShadow: '0 0 6px rgba(201,169,110,0.5)',
      }}
    />
  )
}
