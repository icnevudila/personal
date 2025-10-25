'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
  const { t } = useLanguage()
  const [logoUrl, setLogoUrl] = useState<string>('')
  
  const navItems = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.blog, href: '#blog' },
    { name: t.nav.contact, href: '#contact' },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Load logo from localStorage
    const savedLogo = localStorage.getItem('siteLogo')
    if (savedLogo) {
      setLogoUrl(savedLogo)
    }
    
    // Check for updates every second
    const interval = setInterval(() => {
      const updatedLogo = localStorage.getItem('siteLogo')
      if (updatedLogo && updatedLogo !== logoUrl) {
        setLogoUrl(updatedLogo)
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [logoUrl])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    
    // Blog için ayrı sayfaya git
    if (href === '#blog') {
      window.location.href = '/blog'
      return
    }
    
    // Diğer bölümler için smooth scroll
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="icnevudila" 
                className="h-10 w-auto"
              />
            ) : (
              <span className="text-xl font-bold">
                <span className="text-primary-500">ic</span>
                <span className="text-gray-300">nevudila</span>
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-500 after:transition-all after:duration-300 group-hover:after:w-full">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
                >
                  {item.name}
                </motion.button>
              ))}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

