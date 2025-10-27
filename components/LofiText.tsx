'use client'

import { motion } from 'framer-motion'

export default function LofiText({ 
  as: Tag = 'div', 
  delay = 0, 
  children, 
  className = '' 
}: {
  as?: keyof JSX.IntrinsicElements
  delay?: number
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
      className={className}
    >
      <Tag>{children}</Tag>
    </motion.div>
  )
}
