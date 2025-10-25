'use client'

import { motion } from 'framer-motion'
import { ArrowDownIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'

export function Hero() {
  const { t } = useLanguage()
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

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToBlog = () => {
    const element = document.querySelector('#blog')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
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
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-primary-500 rounded-full blur-3xl"
        />
      </div>

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
                {/* Outer Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-4 border-primary-500 p-1"
                  style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                  }}
                />
                
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full z-10"
                  style={{
                    pointerEvents: 'none',
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,140,66,0.3) 0%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                />
                
                {/* Profile Image Container */}
                <div className="absolute inset-0 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden group/profile">
                  {/* Profile Image */}
                  <div className="w-full h-full bg-primary-500/30 flex items-center justify-center relative">
                    {heroImage ? (
                      <img 
                        src={heroImage} 
                        alt="icnevudila" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary-500">ic</span>
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
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
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
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500/30 rounded-full blur-xl"
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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 flex justify-center lg:justify-start"
          >
            <span className="flex flex-wrap">
              {'icnevudila'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    color: ['#fff', '#FF8C42', '#fff'],
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 0.1 + index * 0.08 },
                    color: {
                      duration: 4,
                      delay: 0.1 + index * 0.08 + 1,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-8 flex justify-center lg:justify-start"
          >
            {t.hero.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed text-center lg:text-left"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={scrollToProjects}
              className="btn-primary hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all"
            >
              {t.hero.ctaProjects}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={scrollToBlog}
              className="btn-secondary hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all"
            >
              {t.hero.ctaBlog}
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
            onClick={scrollToProjects}
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

