'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ColorThemeToggle() {
  const [isYellow, setIsYellow] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('colorTheme')
    if (savedTheme === 'orange') {
      setIsYellow(false)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isYellow
    setIsYellow(newTheme)
    
    // Save to localStorage
    localStorage.setItem('colorTheme', newTheme ? 'yellow' : 'orange')
    
    // Reload page to apply changes
    window.location.reload()
  }

  if (!isClient) return null

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
      title={isYellow ? 'Turuncu temaya geç' : 'Sarı temaya geç'}
    >
      <motion.div
        animate={{ rotate: isYellow ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="w-6 h-6"
      >
        {isYellow ? (
          <SunIcon className="w-6 h-6 text-[#FFD700]" />
        ) : (
          <MoonIcon className="w-6 h-6 text-[#F97316]" />
        )}
      </motion.div>
    </motion.button>
  )
}

