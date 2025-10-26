'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'
import Image from 'next/image'

export function Hero() {
  const { t } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Scroll-reactive transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  
  useEffect(() => {
    const applyColors = () => {
      const isLightMode = document.documentElement.getAttribute('data-theme') === 'light'
      
      const heroTitle = document.querySelector('h1 span') as HTMLElement
      const heroNe = document.querySelector('h1 span span') as HTMLElement
      
      if (isLightMode) {
        // Light mode: "ic" ve "vudila" siyah, "ne" turuncu
        if (heroTitle) {
          heroTitle.style.setProperty('color', '#000000', 'important')
        }
        if (heroNe) {
          heroNe.style.setProperty('color', '#F97316', 'important')
        }
      } else {
        // Dark mode: "ic" ve "vudila" beyaz, "ne" turuncu
        if (heroTitle) {
          heroTitle.style.setProperty('color', '#f1f5f9', 'important')
        }
        if (heroNe) {
          heroNe.style.setProperty('color', '#F97316', 'important')
        }
      }
    }

    // Apply colors immediately
    applyColors()

    // Listen for theme changes
    const observer = new MutationObserver(applyColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => observer.disconnect()
  }, [])
  const [heroImage, setHeroImage] = useState<string>('https://res.cloudinary.com/dqiwrytdx/image/upload/hero/hero-profile-1761406363151.jpg')
  const [showUpload, setShowUpload] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const savedHeroImage = localStorage.getItem('heroImage')
    if (savedHeroImage) {
      setHeroImage(savedHeroImage)
    }
    
    const adminMode = localStorage.getItem('adminMode')
    setIsAdmin(adminMode === 'true')
    
    const interval = setInterval(() => {
      const adminMode = localStorage.getItem('adminMode')
      setIsAdmin(adminMode === 'true')
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result as string
      
      try {
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageData: base64String,
            section: 'hero'
          })
        })

        const data = await response.json()
        
        if (data.success) {
          setHeroImage(data.url)
          localStorage.setItem('heroImage', data.url)
          alert('Fotoğraf başarıyla yüklendi ve herkese görünecek!')
        } else {
          setHeroImage(base64String)
          localStorage.setItem('heroImage', base64String)
          alert('Fotoğraf kaydedildi (sadece sizde görünecek)')
        }
      } catch (error) {
        console.error('Upload error:', error)
        setHeroImage(base64String)
        localStorage.setItem('heroImage', base64String)
        alert('Fotoğraf kaydedildi (sadece sizde görünecek)')
      }
    }
    reader.readAsDataURL(file)
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Eğer ana sayfada değilsek ana sayfaya yönlendir
      window.location.href = '/#contact'
    }
  }


  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="absolute inset-0"
      >
        
        {/* Single subtle accent */}
        <motion.div
          animate={{
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#F97316] rounded-full blur-3xl"
        />
      </motion.div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Profile Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
                            {/* Profile Circle */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                 
                 {/* Profile Image Container */}
                <div className="absolute inset-0 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden group/profile">
                  {/* Profile Image */}
                  <div className="w-full h-full bg-[#F97316]/30 flex items-center justify-center relative">
                    {heroImage ? (
                      <Image 
                        src={heroImage} 
                        alt="icnevudila" 
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 400px"
                      />
                    ) : (
                      <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#F97316]">ic</span>
                    )}
                  </div>
                  
                  {/* Upload Button - Admin Only */}
                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/profile:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 rounded-full">
                      <label className="cursor-pointer z-40">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#F97316] hover:bg-[#ea6707] rounded-lg transition-colors">
                          <PhotoIcon className="w-5 h-5 text-white" />
                          <span className="text-white font-medium">
                            {heroImage && heroImage.startsWith('data:') ? 'Değiştir' : 'Görsel Yükle'}
                          </span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-[#F97316]/30 rounded-full blur-xl"
              />
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent-500/30 rounded-full blur-xl"
              />
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex justify-center lg:justify-start"
          >
            <span className="text-lg text-gray-400 font-mono">
              {t.hero.greeting}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 flex justify-center lg:justify-start"
          >
            <span className="text-black dark:text-[#f1f5f9]">ic<span className="text-[#F97316]">ne</span>vudila</span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#f1f5f9] mb-6 sm:mb-8 flex justify-center lg:justify-start font-medium"
          >
            {t.hero.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-black dark:text-[#94A3B8] max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed text-center lg:text-left"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                boxShadow: "0 0 30px rgba(249,115,22,0.4), 0 8px 25px rgba(0,0,0,0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={scrollToContact}
              className="px-8 py-4 bg-[#F97316] hover:bg-[#ea6707] text-white font-semibold rounded-lg shadow-lg transition-all duration-300 text-lg"
            >
              {t.hero.ctaButton}
            </motion.button>
          </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToContact}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDownIcon className="h-8 w-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

