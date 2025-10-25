'use client'

import { motion } from 'framer-motion'

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function FadeInSection({ children, delay = 0, className = '' }: FadeInSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

