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
      {text.split('').map((char, index) => {
        // "ne" kısmını turuncu yap
        let colorClass = ''
        if (text === 'icnevudila') {
          if (index >= 2 && index <= 3) { // "ne" kısmı (index 2 ve 3)
            colorClass = 'text-orange-600 dark:text-orange-500'
          } else {
            colorClass = 'text-gray-900 dark:text-gray-300'
          }
        }
        
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
            }}
            transition={{ 
              duration: 0.8, 
              delay: delay + index * 0.15,
            }}
            className={`inline-block ${colorClass}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </span>
  )
}
