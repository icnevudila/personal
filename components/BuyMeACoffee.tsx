'use client'

import { motion } from 'framer-motion'
import { BeakerIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

export function BuyMeACoffee() {
  const { t } = useLanguage()
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="section-padding"
    >
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h2 className="text-3xl font-bold text-[#F1F5F9] mb-4">
              {t.buyMeACoffee.title}
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed mb-2">
              {t.buyMeACoffee.description}
            </p>
            <p className="text-sm text-[#64748B] italic">
              {t.buyMeACoffee.comingSoon}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1e293b]/50 border-2 border-[#334155]/50 rounded-full cursor-not-allowed opacity-50"
            title={t.buyMeACoffee.tooltip}
          >
            <BeakerIcon className="w-6 h-6 text-[#F97316]" />
            <span className="text-[#94A3B8]">{t.buyMeACoffee.button}</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

