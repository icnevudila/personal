'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  variant?: 'full' | 'monogram'
  className?: string
}

export function Logo({ variant = 'full', className = '' }: LogoProps) {
  if (variant === 'monogram') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-[#F97316] font-space-grotesk"
        >
          ic
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-[#94A3B8] font-mono"
        >
          .
        </motion.span>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Glow effect behind logo */}
      <div className="absolute inset-0 opacity-20 blur-xl">
        <div className="w-full h-full bg-gradient-to-r from-[#F97316] via-[#0EA5E9] to-transparent" />
      </div>
      
      {/* Logo text */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-xl font-bold font-space-grotesk tracking-tight"
      >
        <span className="text-gray-900 dark:text-[#E2E8F0]">ic</span>
        <span className="text-orange-600 dark:text-[#F97316] inline-block relative">
          ne
        </span>
        <span className="text-gray-900 dark:text-[#E2E8F0]">vudila</span>
      </motion.span>
    </div>
  )
}

