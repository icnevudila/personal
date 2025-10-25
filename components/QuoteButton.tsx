'use client'

import { motion } from 'framer-motion'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

export function QuoteButton() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      onClick={scrollToContact}
      className="fixed bottom-6 right-6 z-40 bg-[#F97316]/80 hover:bg-[#F97316] backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
      aria-label="Teklif Al"
    >
      <EnvelopeIcon className="w-5 h-5" />
      <span className="hidden sm:inline">Teklif Al</span>
      <span className="sm:hidden">Fiyat</span>
    </motion.button>
  )
}

