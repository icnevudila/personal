'use client'

import { motion } from 'framer-motion'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

export function QuoteButton() {
  const { language } = useLanguage()
  const t = require('@/lib/translations').translations[language]

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Eğer ana sayfada değilsek ana sayfaya yönlendir
      window.location.href = '/#contact'
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      onClick={scrollToContact}
      className="fixed bottom-6 right-6 z-40 bg-[#F97316]/80 hover:bg-[#F97316] backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
      aria-label={t.contact.send}
    >
      <EnvelopeIcon className="w-5 h-5" />
      <span className="hidden sm:inline">{t.contact.send}</span>
      <span className="sm:hidden">{t.contact.send}</span>
    </motion.button>
  )
}

