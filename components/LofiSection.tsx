'use client'

import { motion } from 'framer-motion'

export default function LofiSection({ 
  children, 
  delay = 0, 
  className = '' 
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.8, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={`min-h-[60vh] flex flex-col justify-center items-center text-center px-6 ${className}`}
    >
      {children}
    </motion.section>
  )
}
