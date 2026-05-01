'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import clsx from 'clsx'

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'clip'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: Direction
  duration?: number
  spring?: boolean
  margin?: string
}

const getVariants = (direction: Direction) => {
  switch (direction) {
    case 'up':    return { hidden: { opacity: 0, y: 48 },             visible: { opacity: 1, y: 0 } }
    case 'down':  return { hidden: { opacity: 0, y: -48 },            visible: { opacity: 1, y: 0 } }
    case 'left':  return { hidden: { opacity: 0, x: 60 },             visible: { opacity: 1, x: 0 } }
    case 'right': return { hidden: { opacity: 0, x: -60 },            visible: { opacity: 1, x: 0 } }
    case 'scale': return { hidden: { opacity: 0, scale: 0.88 },       visible: { opacity: 1, scale: 1 } }
    case 'clip':  return { hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)' } }
    default:      return { hidden: { opacity: 0 },                    visible: { opacity: 1 } }
  }
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  spring = false,
  margin = '-80px 0px',
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: margin as any })
  const variants = getVariants(direction)

  const transition = spring
    ? { type: 'spring', stiffness: 60, damping: 18, delay }
    : { duration, delay, ease: [0.22, 1, 0.36, 1] }

  return (
    <motion.div
      ref={ref}
      variants={{ hidden: variants.hidden, visible: { ...variants.visible, transition } }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  )
}
