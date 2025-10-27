'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function LofiText({ 
  as: Tag = 'div', 
  children, 
  delay = 0, 
  hover = true,
  className = '' 
}: {
  as?: keyof JSX.IntrinsicElements
  children: React.ReactNode
  delay?: number
  hover?: boolean
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={
        hover
          ? {
              scale: 1.05,
              color: '#f97316',
              textShadow: '0 0 12px rgba(249,115,22,0.4)',
              transition: { duration: 0.4, ease: 'easeOut' },
            }
          : {}
      }
      viewport={{ once: true }}
      className={`inline-block cursor-default transition-all duration-700 ${className}`}
    >
      <Tag>{children}</Tag>
    </motion.div>
  )
}
