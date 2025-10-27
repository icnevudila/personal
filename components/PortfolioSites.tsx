'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowTopRightOnSquareIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface PortfolioSite {
  id: string
  title: string
  description: string | { tr: string; en: string }
  category: string
  image: string
  url: string
  tags: string[] | { tr: string[]; en: string[] }
  featured: boolean
}

export function PortfolioSites() {
  const { t, language } = useLanguage()
  const [portfolioSites, setPortfolioSites] = useState<PortfolioSite[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredSite, setHoveredSite] = useState<string | null>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState('')
  const [selectedPreviewTitle, setSelectedPreviewTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Emotional taglines for each category
  const getEmotionalTagline = (category: string) => {
    const taglines: { [key: string]: string } = {
      'Interior Design': 'Mekanların ruhunu ortaya çıkarıyorum',
      'Wellness': 'İç huzuru tasarımla buluşturuyorum',
      'Food & Beverage': 'Lezzeti görsel deneyimle harmanlıyorum',
      'Fitness': 'Hareketin estetiğini yakalıyorum',
      'Audio': 'Seslerin görsel hikayesini anlatıyorum',
      'Photography': 'Anları sonsuzluğa taşıyorum',
      'Creative Agency': 'Yaratıcılığın sınırlarını zorluyorum',
      'Lighting': 'Işığın dansını tasarlıyorum',
      'Technology': 'Geleceği bugünle buluşturuyorum',
      'Dashboard': 'Veriyi güzellikle sunuyorum'
    }
    return taglines[category] || 'Her proje bir hikaye'
  }

  useEffect(() => {
    const loadPortfolioSites = async () => {
      try {
        const response = await fetch('/portfolio-sites.json')
        const data = await response.json()
        console.log('Portfolio sites loaded:', data)
        setPortfolioSites(data)
      } catch (error) {
        console.error('Portfolio sites yüklenirken hata:', error)
        // Fallback data
        const fallbackData = [
          {
            id: "atelier-luna",
            title: "Atelier Luna",
            description: "Size Uygun Mekanlar - Interior Design Studio",
            category: "Interior Design",
            image: "/hero-profile.jpg",
            url: "/portfolio/AtelierLuna.html",
            tags: ["Interior", "Design", "Studio"],
            featured: true
          },
          {
            id: "bloom-path",
            title: "BloomPath",
            description: "Wellness & Personal Growth Platform",
            category: "Wellness",
            image: "/portfolio/auraroa.jpg",
            url: "/portfolio/BloomPath.html",
            tags: ["Wellness", "Growth", "Platform"],
            featured: true
          },
          {
            id: "brew-lab",
            title: "BrewLab",
            description: "Coffee Roasting & Brewing Experience",
            category: "Food & Beverage",
            image: "/portfolio/luma.jpg",
            url: "/portfolio/BrewLab.html",
            tags: ["Coffee", "Roasting", "Experience"],
            featured: true
          },
          {
            id: "core-flow",
            title: "CoreFlow",
            description: "Fitness & Movement Studio",
            category: "Fitness",
            image: "/portfolio/mindflolio.jpg",
            url: "/portfolio/CoreFlow.html",
            tags: ["Fitness", "Movement", "Studio"],
            featured: true
          },
          {
            id: "echo-verse",
            title: "EchoVerse",
            description: "Audio Production & Sound Design",
            category: "Audio",
            image: "/portfolio/hero-profile.jpg.png",
            url: "/portfolio/EchoVerse.html",
            tags: ["Audio", "Production", "Sound"],
            featured: true
          },
          {
            id: "elias-grey",
            title: "Elias Grey",
            description: "Photography & Visual Storytelling",
            category: "Photography",
            image: "/portfolio/elias-grey.jpg",
            url: "/portfolio/EliasGrey.html",
            tags: ["Photography", "Visual", "Storytelling"],
            featured: true
          },
          {
            id: "frame-haus",
            title: "FrameHaus",
            description: "Digital Art & Creative Agency",
            category: "Creative Agency",
            image: "/portfolio/frame-haus.jpg",
            url: "/portfolio/FrameHaus.html",
            tags: ["Digital Art", "Creative", "Agency"],
            featured: true
          },
          {
            id: "lume",
            title: "Lume",
            description: "Lighting Design & Installation",
            category: "Lighting",
            image: "/portfolio/lume.jpg",
            url: "/portfolio/Lume.html",
            tags: ["Lighting", "Design", "Installation"],
            featured: true
          },
          {
            id: "nova-ai",
            title: "Nova AI",
            description: "AI-Powered Business Solutions",
            category: "Technology",
            image: "/portfolio/nova-ai.jpg",
            url: "/portfolio/NovaAI.html",
            tags: ["AI", "Business", "Solutions"],
            featured: true
          },
          {
            id: "orbit",
            title: "Orbit",
            description: "Space Technology & Innovation",
            category: "Technology",
            image: "/portfolio/orbit.jpg",
            url: "/portfolio/Orbit.html",
            tags: ["Space", "Technology", "Innovation"],
            featured: true
          },
          {
            id: "thinkcore",
            title: "ThinkCore",
            description: "Business Intelligence Dashboard",
            category: "Dashboard",
            image: "/portfolio/thinkcore.jpg",
            url: "/portfolio/ThinkCore.html",
            tags: ["Business", "Intelligence", "Dashboard"],
            featured: true
          },
          {
            id: "thinkcore-dashboard",
            title: "ThinkCore Dashboard",
            description: "Advanced Analytics Interface",
            category: "Dashboard",
            image: "/portfolio/thinkcore-dashboard.jpg",
            url: "/portfolio/ThinkCore-Dashboard.html",
            tags: ["Analytics", "Interface", "Dashboard"],
            featured: false
          }
        ]
        setPortfolioSites(fallbackData)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolioSites()
  }, [])

  const categories = ['all', ...Array.from(new Set(portfolioSites.map(site => site.category)))]
  
  const filteredSites = selectedCategory === 'all' 
    ? portfolioSites 
    : portfolioSites.filter(site => site.category === selectedCategory)

  const featuredSites = portfolioSites.filter(site => site.featured)

  const openPreviewModal = (url: string, title: string) => {
    setSelectedPreviewUrl(url)
    setSelectedPreviewTitle(title)
    setShowPreviewModal(true)
    document.body.style.overflow = 'hidden'
  }

  const closePreviewModal = () => {
    setShowPreviewModal(false)
    setSelectedPreviewUrl('')
    setSelectedPreviewTitle('')
    document.body.style.overflow = ''
  }

  // Handle ESC key to close modal
  useEffect(() => {
    if (!showPreviewModal) return
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowPreviewModal(false)
        setSelectedPreviewUrl('')
        setSelectedPreviewTitle('')
        document.body.style.overflow = ''
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [showPreviewModal])


  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden content-visibility-auto">

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
            <span className="text-white">{t.portfolio.title}</span>
          </h2>
          <div className="w-24 h-1 bg-[#F97316] mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-[#94A3B8] mt-4 md:mt-6 max-w-2xl mx-auto">
            {t.portfolio?.subtitle || "Farklı sektörlerden yaratıcı projeler. Her biri kendine özgü hikayesi olan tasarım deneyimleri."}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#F97316] to-[#ea6707] text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white backdrop-blur-sm'
              }`}
            >
              {category === 'all' 
                ? (t.portfolio?.allCategories || 'Tümü')
                : (t.portfolio?.categories?.[category as keyof typeof t.portfolio.categories] || category)
              }
            </motion.button>
          ))}
        </motion.div>

        {/* Mobile: Collapsible Portfolio Section */}
        <div className="md:hidden mb-6">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-orange-500/50 shadow-md hover:shadow-lg backdrop-blur-sm group"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-orange-500 text-lg"
              >
                ▶
              </motion.div>
              <span className="text-gray-300 group-hover:text-orange-400 font-medium text-sm transition-colors">
                {language === 'tr' ? 'Siteleri Görmek İçin Tıklayın' : 'Click to View Sites'}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-orange-500"
            >
              ▼
            </motion.div>
          </motion.button>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 scroll-smooth snap-y snap-mandatory ${
            isOpen ? 'max-h-none' : 'max-h-0 overflow-hidden'
          } md:max-h-none`}
          style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gridAutoRows: 'minmax(480px, auto)',
            scrollSnapType: 'y mandatory',
            touchAction: 'pan-y'
          }}
        >
          {filteredSites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{
                y: -10,
                rotateY: 5,
                rotateX: -3,
                scale: hoveredSite === site.id ? 1.03 : 1.01
              }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredSite(site.id)}
              onMouseLeave={() => setHoveredSite(null)}
              className={`group relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl rounded-xl overflow-hidden border transition-all duration-500 flex flex-col h-[480px] snap-start ${
                hoveredSite === site.id 
                  ? 'border-[#F97316]/60 shadow-[0_20px_60px_rgba(249,115,22,0.3)] z-10' 
                  : hoveredSite 
                    ? 'border-[#F97316]/10 opacity-70' 
                    : 'border-[#F97316]/20 hover:border-[#F97316]/40'
              }`}
            >
              {/* 3D Glow Effect - Turuncu Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#F97316]/0 via-[#F97316]/15 to-[#F97316]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
                whileHover={{ scale: 1.2, rotate: 45 }}
              />
              {/* Gradient Underline Glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Live Preview */}
              <div className="h-48 bg-gray-200 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 overflow-hidden relative flex-shrink-0" style={{ overflow: 'hidden' }}>
                <iframe
                  src={site.url}
                  className="w-full h-full scale-50 origin-top-left pointer-events-none"
                  style={{ 
                    width: '200%', 
                    height: '200%',
                    border: 'none',
                    transform: 'scale(0.5)',
                    transformOrigin: 'top left',
                    overflow: 'hidden',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    opacity: '1',
                    visibility: 'visible',
                    display: 'block',
                    background: 'white',
                    zIndex: 10,
                    position: 'relative'
                  }}
                  sandbox="allow-scripts allow-same-origin"
                  scrolling="no"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-black/20 to-transparent"></div>
                <div className="absolute top-2 right-2 bg-[#F97316] text-white text-xs px-2 py-1 rounded">
                  {t.portfolio?.livePreview || "Live Preview"}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                {/* Fixed height content area */}
                <div className="flex-grow flex flex-col justify-between">
                  {/* Top content */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#E5E7EB] group-hover:text-[#F97316] transition-colors truncate">
                        {site.title}
                      </h3>
                      <span className="text-xs font-semibold text-[#F97316] bg-[#F97316]/10 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                        {t.portfolio?.categories?.[site.category as keyof typeof t.portfolio.categories] || site.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2 mb-2">
                      {typeof site.description === 'string' 
                        ? site.description 
                        : site.description[language as 'tr' | 'en'] || site.description.tr
                      }
                    </p>
                    {/* Emotional Tagline */}
                    <p className="text-xs italic text-[#64748B] opacity-80 leading-relaxed">
                      {getEmotionalTagline(site.category)}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(typeof site.tags === 'string' ? site.tags : (site.tags as { tr: string[]; en: string[] })[language as 'tr' | 'en'] || (site.tags as { tr: string[]; en: string[] }).tr).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* icnevudila Signature */}
                <motion.div 
                  className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  whileHover={{ 
                    textShadow: "0 0 8px rgba(249,115,22,0.6)",
                    scale: 1.05
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs font-mono text-[#F97316]/60 tracking-wider">
                    icnevudila
                  </span>
                </motion.div>

                {/* Action Button - Always at bottom */}
                <div className="mt-auto">
                        <motion.button
                          onClick={() => openPreviewModal(site.url, site.title)}
                          whileHover={{ scale: 1.01, y: -1 }}
                          whileTap={{ scale: 0.99 }}
                          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#F97316] via-[#ea6707] to-[#d45a05] p-[1px] shadow-lg hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all duration-300"
                        >
                          <div className="relative flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#F97316] to-[#ea6707] px-4 py-3 text-white transition-all duration-300 group-hover:from-[#ea6707] group-hover:to-[#d45a05]">
                            <motion.div
                              className="flex items-center gap-2"
                              initial={{ opacity: 1 }}
                              whileHover={{ opacity: 0.9 }}
                            >
                              <EyeIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                              <span className="text-xs font-semibold tracking-wide">
                                {t.portfolio?.viewButton || "Siteyi Görüntüle"}
                              </span>
                            </motion.div>
                            
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#F97316]/10 to-[#ea6707]/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                          </div>
                        </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Section */}
        {selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold text-[#f1f5f9] text-center mb-8">
              {t.portfolio?.featuredProjects || "Öne Çıkan Projeler"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSites.slice(0, 4).map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-gray-800/30 dark:bg-gray-800/30 bg-white/90 dark:backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 dark:border-gray-700/30 border-gray-400 dark:hover:border-[#F97316]/30 hover:border-[#F97316]/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] shadow-lg"
                >
                  <h4 className="font-semibold text-[#E5E7EB] dark:text-[#E5E7EB] text-gray-800 dark:group-hover:text-[#F97316] group-hover:text-[#F97316] transition-colors mb-2">
                    {site.title}
                  </h4>
                  <p className="text-sm text-[#94A3B8] dark:text-[#94A3B8] text-gray-600 mb-3">
                    {typeof site.description === 'string' 
                    ? site.description 
                    : site.description[language as 'tr' | 'en'] || site.description.tr
                  }
                  </p>
                  <Link
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F97316] dark:text-[#F97316] text-orange-600 dark:text-sm text-sm font-medium hover:underline"
                  >
                    Görüntüle →
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Signature Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="text-sm font-mono text-[#F97316]/40 tracking-wider italic"
        >
          designed by icnevudila
        </motion.p>
             </motion.div>
       {showPreviewModal && typeof document !== 'undefined' && createPortal(
         <AnimatePresence>
                       <div 
              className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
              onClick={closePreviewModal}
            >
                <div 
                   className="w-[90vw] max-w-6xl max-h-[90vh] bg-[#0F172A] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                   style={{ 
                     backdropFilter: 'blur(10px)'
                   }}
                   onClick={(e) => e.stopPropagation()}
                 >
                             {/* Header */}
               <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                 <div>
                   <h3 className="text-xl font-bold text-white">{selectedPreviewTitle}</h3>
                 </div>
                 <button
                   onClick={closePreviewModal}
                   className="p-2 rounded-full hover:bg-gray-700 text-[#94A3B8] hover:text-white transition-colors"
                   aria-label="Kapat"
                 >
                   <XMarkIcon className="w-6 h-6" />
                 </button>
               </div>
              
              {/* Content */}
              <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
                <iframe
                  src={selectedPreviewUrl}
                  title={selectedPreviewTitle}
                  className="w-full h-full min-h-[500px] border-0 rounded-lg"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
                                                           </div>
                </div>
               </div>
             </AnimatePresence>
        , document.body
       )}
      </section>
  )
}
