'use client'

import { motion } from 'framer-motion'
import { CoffeeIcon } from '@heroicons/react/24/outline'

export function BuyMeACoffee() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="section-padding bg-[#1e293b]/30 border-y border-[#334155]/50"
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
              Destekle ☕️
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              Bir kahve, bir fikir. Her destek yeni bir pikseli güzelleştiriyor.
            </p>
          </motion.div>

          <motion.a
            href="https://buymeacoffee.com/icnevudila"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#F97316] hover:bg-[#F97316]/90 text-white font-semibold rounded-full shadow-lg hover:shadow-[0_0_24px_rgba(249,115,22,0.3)] transition-all duration-300"
          >
            <CoffeeIcon className="w-6 h-6" />
            <span>Buy Me a Coffee</span>
          </motion.a>
        </div>
      </div>
    </motion.section>
  )
}

