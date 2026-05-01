'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import clsx from 'clsx'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: number
  direction?: 'up' | 'fade' | 'scale'
}

const itemVariants = (direction: 'up' | 'fade' | 'scale') => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 36 : 0,
    scale: direction === 'scale' ? 0.9 : 1,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
})

export function StaggerItem({ children, className, direction = 'up' }: { children: React.ReactNode; className?: string; direction?: 'up' | 'fade' | 'scale' }) {
  return (
    <motion.div variants={itemVariants(direction)} className={clsx(className)}>
      {children}
    </motion.div>
  )
}

export default function StaggerContainer({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  direction = 'up',
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  )
}
