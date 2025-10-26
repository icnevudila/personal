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
          // i=0, c=1, n=2, e=3, v=4...
          if (index === 2 || index === 3) { // "ne" kısmı - turuncu
            colorClass = '!text-[#F97316] dark:!text-[#F97316]'
          } else { // "icvudila" kısmı - siyah/beyaz
            colorClass = '!text-black dark:!text-white'
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
