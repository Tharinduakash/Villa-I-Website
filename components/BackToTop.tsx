'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed z-40 flex items-center justify-center"
          style={{
            bottom: 28,
            left: 20,
            width: 44,
            height: 44,
            background: 'rgba(6,8,15,0.88)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(201,169,110,0.35)',
          }}
          initial={{ opacity: 0, y: 12, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.85 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.88 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.7)'
            e.currentTarget.style.background = 'rgba(201,169,110,0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)'
            e.currentTarget.style.background = 'rgba(6,8,15,0.88)'
          }}
        >
          <HiArrowUp size={16} style={{ color: 'rgba(201,169,110,1)' }} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
