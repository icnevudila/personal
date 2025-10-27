'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function LofiImage({ 
  src, 
  alt, 
  delay = 0, 
  className = '' 
}: {
  src: string
  alt: string
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
      className={`rounded-2xl ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        className="rounded-2xl w-full h-full object-cover"
      />
    </motion.div>
  )
}
