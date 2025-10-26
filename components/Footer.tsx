'use client'

import { motion } from 'framer-motion'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { AnimatedText } from './AnimatedText'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'icnevudila2024'

  // Check admin mode
  useEffect(() => {
    const checkAdminMode = () => {
      const adminMode = localStorage.getItem('adminMode')
      setIsAdmin(adminMode === 'true')
    }
    checkAdminMode()
    const interval = setInterval(checkAdminMode, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isAdmin) {
      // If already admin, log out
      localStorage.setItem('adminMode', 'false')
      alert(t.footer.adminModeClosed)
      window.location.reload()
    } else {
      // If not admin, show password modal
      setShowPasswordModal(true)
    }
  }

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminMode', 'true')
      alert(t.footer.adminModeOpened)
      setShowPasswordModal(false)
      setPassword('')
      window.location.reload()
    } else {
      alert(t.footer.wrongPassword)
      setPassword('')
    }
  }

  const footerLinks = {
    [t.footer.quickLinks]: [
      { name: t.footer.aboutMe, href: '#about' },
      { name: t.footer.skills, href: '#skills' },
      { name: t.footer.projects, href: '#projects' },
      { name: t.footer.contact, href: '#contact' },
    ],
    [t.footer.resources]: [
      { name: t.footer.blog, href: '#blog' },
      { name: t.footer.portfolio, href: '#projects' },
      { name: t.footer.services, href: '#contact' },
    ],
    [t.footer.connections]: [
      { name: t.footer.github, href: 'https://github.com/icnevudila' },
      { name: t.footer.linkedin, href: 'https://www.linkedin.com/in/ali-düvenci' },
      { name: t.footer.twitter, href: 'https://twitter.com/icnevudila' },
      { name: t.footer.email, href: 'mailto:icnevudila@gmail.com' },
    ],
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Eğer ana sayfada değilsek ana sayfaya yönlendir
        window.location.href = `/${href}`
      }
    }
  }

  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50">
      <div className="container-custom">
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  <AnimatedText text="icnevudila" />
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {t.footer.brandDescription}
                </p>
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#F97316] hover:text-[#ea6707] transition-colors font-medium"
                >
                  {t.footer.backToTop}
                </motion.button>
              </motion.div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-4">
                  <AnimatedText text={category} />
                </h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.name === 'Admin Giriş' || link.name === 'Admin Çıkış') {
                            handleAdminClick(e)
                          } else if (link.href.startsWith('#')) {
                            e.preventDefault()
                            handleNavClick(link.href)
                          }
                        }}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-400 hover:text-white transition-colors duration-200 block"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 rounded-xl p-6 mb-8"
          >
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2">
                <AnimatedText text={t.footer.stayUpdated} />
              </h4>
              <p className="text-gray-400 mb-4">
                {t.footer.newsletterDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#ea6707] transition-all duration-300"
                >
                  {t.footer.subscribe}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-700/50 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400">
                <span>© {currentYear} icnevudila.</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <HeartIcon className="w-4 h-4 text-red-500" />
                </motion.div>
                <span>{t.footer.madeWith}</span>
              </div>

              {/* Tagline */}
              <div className="hidden md:block text-center text-gray-500 text-sm italic">
                {t.footer.tagline}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { 
                    name: 'GitHub', 
                    href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/icnevudila',
                    icon: 'G'
                  },
                  { 
                    name: 'LinkedIn', 
                    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/ali-düvenci',
                    icon: 'L'
                  },
                  { 
                    name: 'Twitter', 
                    href: process.env.NEXT_PUBLIC_TWITTER_URL || '#',
                    icon: 'T'
                  },
                  { 
                    name: 'Dribbble', 
                    href: process.env.NEXT_PUBLIC_DRIBBBLE_URL || '#',
                    icon: 'D'
                  }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#F97316] transition-colors duration-300"
                  >
                    <span className="text-sm font-medium text-gray-300 hover:text-white">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Additional Links */}
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.privacyPolicy}
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.termsOfUse}
                </a>
                <a href="/sitemap.xml" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.sitemap}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">{t.footer.adminLogin}</h3>
            <p className="text-gray-400 mb-4">{t.footer.adminLoginDesc}</p>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white mb-4 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              placeholder={t.footer.password}
              autoFocus
            />
            
            <div className="flex gap-2">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white transition-colors"
              >
                {t.footer.submit}
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPassword('')
                }}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
              >
                {t.footer.cancel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </footer>
  )
}

