'use client'

import { motion } from 'framer-motion'
import { BeakerIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8 inline-block"
        >
          <BeakerIcon className="w-24 h-24 text-[#F97316] mx-auto" />
        </motion.div>

        <h1 className="text-6xl font-bold text-[#F1F5F9] mb-4">404</h1>
        <p className="text-2xl text-[#94A3B8] mb-8">
          Bu sayfa henüz tasarlanmadı. Ama kahve içiliyor olabilir ☕
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-[#F97316]/90 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(249,115,22,0.3)]"
        >
          Ana Sayfaya Dön
        </Link>
      </motion.div>
    </div>
  )
}

