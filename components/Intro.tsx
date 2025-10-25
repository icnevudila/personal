'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Intro() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)

    // Check if user has seen intro before
    const seenIntro = sessionStorage.getItem('hasSeenIntro')
    if (seenIntro || prefersReducedMotion) {
      setIsVisible(false)
      setHasSeenIntro(true)
      return
    }

    // Hide intro after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('hasSeenIntro', 'true')
    }, 3000)

    return () => {
      clearTimeout(timer)
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [prefersReducedMotion])

  if (hasSeenIntro) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-[#0f172a] flex items-center justify-center overflow-hidden"
        >
          {/* Matrix-like data lines */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: '-10%', opacity: 0 }}
                animate={{ 
                  y: '110%',
                  opacity: [0, 0.15, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute left-0 w-px h-32"
                style={{
                  left: `${Math.random() * 100}%`,
                  background: 'linear-gradient(to bottom, transparent, rgba(249,115,22,0.15), transparent)',
                }}
              />
            ))}
          </div>

          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 text-center"
          >
            {/* Glow effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 blur-2xl bg-[#F97316] opacity-30"
            />

            {/* Logo text */}
            <div className="relative z-10">
              <h1 className="text-6xl md:text-8xl font-bold font-space-grotesk">
                <span className="text-[#F97316]">ic</span>
                <span className="text-[#94A3B8] text-2xl md:text-3xl">.</span>
              </h1>
              
              {/* System initializing text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-6 text-sm md:text-base text-[#94A3B8] font-mono tracking-wider"
              >
                system initializing...
              </motion.p>
            </div>
          </motion.div>

          {/* Flash fade-out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2.5, duration: 0.3 }}
            className="absolute inset-0 bg-[#F97316]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

