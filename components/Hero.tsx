'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'
import LofiText from './LofiText'
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
          alert(t.hero.uploadSuccess)
        } else {
          setHeroImage(base64String)
          localStorage.setItem('heroImage', base64String)
          alert(t.hero.uploadLocalSuccess)
        }
      } catch (error) {
        console.error('Upload error:', error)
        setHeroImage(base64String)
        localStorage.setItem('heroImage', base64String)
        alert(t.hero.uploadLocalSuccess)
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
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="absolute inset-0"
      >
        
        {/* Single subtle accent - Hidden on mobile */}
        <motion.div
          animate={{
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="hidden md:block absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#F97316] rounded-full blur-3xl"
        />
      </motion.div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-4 md:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Profile Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start"
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
                            {heroImage && heroImage.startsWith('data:') ? t.hero.changeImage : t.hero.uploadImage}
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
          <div className="mb-2 flex justify-center lg:justify-start">
            <LofiText as="span" delay={0} className="text-base text-gray-400" hover={false}>
              {t.hero.greeting}
            </LofiText>
          </div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 flex justify-center lg:justify-start relative inline-block"
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 100%',
                backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.03) 50%, transparent 100%)',
              }}
              className="absolute inset-0 blur-xl pointer-events-none"
            />
            <span className="relative text-black dark:text-[#f1f5f9]">ic<span className="text-[#F97316]">ne</span>vudila</span>
          </motion.h1>

          {/* Title */}
          <div className="flex justify-center lg:justify-start">
            <LofiText 
              as="h2" 
              delay={0.2} 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#f1f5f9] mb-6 sm:mb-8 font-medium"
            >
              {t.hero.title}
            </LofiText>
          </div>

          {/* Description */}
          <div className="flex justify-center lg:justify-start">
            <LofiText 
              as="p" 
              delay={0.3} 
              className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-center lg:text-left font-medium"
              hover={false}
            >
              {t.hero.description}
            </LofiText>
          </div>

          </div>
        </div>



      </div>
    </section>
  )
}

