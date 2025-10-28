'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { LofiPlayer } from './LofiPlayer'
import Lottie from 'lottie-react'
import coffeeAnimation from '../Brewing Coffee.json'

export function Navbar() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const pathname = usePathname()
  const [logoUrl, setLogoUrl] = useState<string>('')
  
  // Ana sayfada # linkleri, diğer sayfalarda / linkleri kullan
  const isHomePage = pathname === '/'
  const navItems = isHomePage ? [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.services, href: '#hizmetler' },
    { name: t.nav.portfolio, href: '#portfolio' },
    { name: t.nav.blog, href: '#blog' },
    { name: t.nav.contact, href: '#contact' },
  ] : [
    { name: t.nav.home, href: '/' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.skills, href: '/skills' },
    { name: t.nav.services, href: '/#hizmetler' },
    { name: t.nav.portfolio, href: '/portfolio' },
    { name: t.nav.blog, href: '/blog' },
    { name: t.nav.contact, href: '/contact' },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [showMusicHint, setShowMusicHint] = useState(false)

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
    let lastScrollTop = 0
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Scroll pozisyonunu kontrol et
      setScrolled(currentScrollY > 20)
      
      // Scroll yönünü kontrol et
      const scrollDifference = currentScrollY - lastScrollTop
      
      if (scrollDifference > 10 && currentScrollY > 100 && !isOpen) {
        // Aşağı kaydırıyor ve 100px'den fazla scroll yapmış ve mobil menü kapalı
        setIsVisible(false)
      } else if (scrollDifference < -10 || currentScrollY <= 100) {
        // Yukarı kaydırıyor veya üstte
        setIsVisible(true)
      }
      
      lastScrollTop = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  const handleMobileMenuClose = () => {
    setIsOpen(false)
  }

  const handleNavClick = async (href: string) => {
    if (href.startsWith('#')) {
      // Diğer sayfalardan ana sayfa bölümlerine git
      if (!isHomePage) {
        // Ana sayfaya yönlendir ve sonra scroll yap
        window.location.href = `/${href}`
        return
      } else {
        // Ana sayfada # linkleri için scroll
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out',
        'bg-transparent',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 w-full">
            <div className="flex items-baseline space-x-8 flex-1">
              {navItems.map((item) => (
                isHomePage ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-300 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#F97316] after:transition-all after:duration-300 group-hover:after:w-full">
                      {item.name}
                    </span>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    className="text-gray-300 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#F97316] after:transition-all after:duration-300 group-hover:after:w-full">
                      {item.name}
                    </span>
                  </Link>
                )
              ))}
            </div>
            
            {/* Right side - Logo and Controls */}
            <div className="flex items-center gap-4 relative">
              <span className="text-lg font-bold text-white hidden lg:block">
                ic<span className="text-orange-500">ne</span>vudila
              </span>
              <div 
                className="relative"
                onMouseEnter={() => setShowMusicHint(true)}
                onMouseLeave={() => setShowMusicHint(false)}
              >
                <LofiPlayer />
                {showMusicHint && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-[52px] right-0 text-xs text-gray-500 hover:text-orange-400 transition-all duration-700 cursor-pointer whitespace-nowrap z-50"
                  >
                    ♪ click for lofi
                  </motion.p>
                )}
              </div>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button and controls */}
          <div className="md:hidden relative z-50 flex items-center justify-between w-full">
            {/* Coffee Menu Button */}
            <button
              onClick={() => {
                setIsOpen(!isOpen)
              }}
              className="text-white hover:text-orange-400 p-2 transition-colors bg-transparent min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <div className="h-10 w-10 flex items-center justify-center relative">
                  <div 
                    className={clsx(
                      "relative",
                      theme === 'dark' && 'brightness-0 invert'
                    )}
                  >
                    <Lottie 
                      animationData={coffeeAnimation} 
                      loop={true}
                      autoplay={true}
                      style={{ width: 40, height: 40 }}
                    />
                  </div>
                </div>
              )}
            </button>
            
            {/* Lofi Player - Mobile - Tam Sağda */}
            <div 
              className="relative"
              onMouseEnter={() => setShowMusicHint(true)}
              onMouseLeave={() => setShowMusicHint(false)}
            >
              <LofiPlayer />
              {showMusicHint && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-[52px] right-0 text-xs text-gray-500 hover:text-orange-400 transition-all duration-700 cursor-pointer whitespace-nowrap z-50"
                >
                  ♪ click for lofi
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 md:hidden bg-black/60 backdrop-blur-sm z-50"
            onClick={handleMobileMenuClose}
          >
            <div className="absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleMobileMenuClose}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-800/50"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>
              <div className="px-6 pb-8 space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {isHomePage ? (
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="text-white hover:text-orange-400 block px-4 py-3 text-lg font-medium w-full text-left transition-colors duration-200 rounded-lg hover:bg-gray-800/50"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        prefetch={true}
                        onClick={handleMobileMenuClose}
                        className="text-white hover:text-orange-400 block px-4 py-3 text-lg font-medium w-full text-left transition-colors duration-200 rounded-lg hover:bg-gray-800/50"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <div className="pt-6 border-t border-gray-700/50 mt-6 space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <div onClick={handleMobileMenuClose}>
                      <LofiPlayer />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1" onClick={handleMobileMenuClose}>
                      <ThemeToggle />
                    </div>
                    <div className="flex-1" onClick={handleMobileMenuClose}>
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

