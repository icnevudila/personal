'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            color: ['#fff', '#FF8C42', '#fff'],
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: delay + index * 0.15 },
            color: {
              duration: 4, // Çok yavaş ve smooth
              delay: delay + index * 0.15 + 1,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse'
            }
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
