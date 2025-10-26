'use client'

import { motion } from 'framer-motion'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const handleToggle = () => {
    console.log('Toggle clicked, current theme:', theme)
    toggleTheme()
  }

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className="group relative p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/30 hover:border-[#F97316]/50 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]"
      aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 1.1
        }}
        transition={{ 
          duration: 0.4,
          ease: 'easeInOut'
        }}
        className="w-5 h-5 relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          {theme === 'dark' ? (
            <MoonIcon className="w-5 h-5 text-[#F97316] group-hover:text-[#ea6707] transition-colors" />
          ) : (
            <SunIcon className="w-5 h-5 text-[#F97316] group-hover:text-[#ea6707] transition-colors" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#F97316]/10 to-[#ea6707]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </motion.button>
  )
}
