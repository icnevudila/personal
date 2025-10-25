'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { BriefcaseIcon, SparklesIcon, HeartIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'

export function About() {
  const { t, language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [aboutImage, setAboutImage] = useState<string>('/hero-profile.jpg.png')
  const [showUpload, setShowUpload] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('aboutImage')
    if (saved) {
      setAboutImage(saved)
    }
    const adminMode = localStorage.getItem('adminMode')
    setIsAdmin(adminMode === 'true')
    
    // Check admin mode every second for same-tab updates
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
        // Cloudinary'ye yükle
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageData: base64String,
            section: 'about'
          })
        })

        const data = await response.json()
        
        if (data.success) {
          setAboutImage(data.url)
          localStorage.setItem('aboutImage', data.url)
          alert('Fotoğraf başarıyla yüklendi ve herkese görünecek!')
        } else {
          // Fallback: localStorage kullan
          setAboutImage(base64String)
          localStorage.setItem('aboutImage', base64String)
          alert('Fotoğraf kaydedildi (sadece sizde görünecek)')
        }
      } catch (error) {
        console.error('Upload error:', error)
        // Fallback: localStorage kullan
        setAboutImage(base64String)
        localStorage.setItem('aboutImage', base64String)
        alert('Fotoğraf kaydedildi (sadece sizde görünecek)')
      }
    }
    reader.readAsDataURL(file)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const stats = [
    { 
      title: t.about.stats.experience, 
      subtitle: t.about.stats.experienceSubtitle,
      icon: BriefcaseIcon 
    },
    { 
      title: t.about.stats.aiSkills, 
      subtitle: t.about.stats.aiSkillsSubtitle,
      icon: CpuChipIcon 
    },
    { 
      title: t.about.stats.design, 
      subtitle: t.about.stats.designSubtitle,
      icon: HeartIcon 
    },
  ]

  return (
    <section id="about" className="section-padding bg-slate-800/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 md:mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              <AnimatedText text={t.about.title} />
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center px-4">
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {t.about.description1}
              </p>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {t.about.description2}
              </p>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {t.about.description3}
              </p>

              {/* Caption */}
              <motion.p 
                variants={itemVariants}
                className="text-center text-gray-400 italic mt-6 md:mt-8 max-w-2xl mx-auto text-sm sm:text-base px-2"
              >
                {language === 'tr' 
                  ? '"Deneyimle desteklenen, teknoloji ile güçlendirilen ve duyguyla yönlendirilen tasarım."'
                  : '"Design backed by experience, powered by technology, and guided by emotion."'
                }
              </motion.p>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="group cursor-pointer bg-gray-800/50 border border-gray-700 rounded-xl p-4 md:p-5 hover:border-primary-500/50 transition-all duration-300"
                  >
                    {/* Icon */}
                    <motion.div
                      className="mb-2 md:mb-3"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.3 }
                      }}
                    >
                      <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-500 group-hover:text-primary-400 transition-colors" />
                    </motion.div>
                    
                    {/* Title */}
                    <h4 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-1.5 group-hover:text-primary-400 transition-colors">
                      <AnimatedText text={stat.title} />
                    </h4>
                    
                    {/* Subtitle */}
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                      {stat.subtitle}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image/Visual */}
            <motion.div 
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => setShowUpload(true)}
              onMouseLeave={() => setShowUpload(false)}
            >
              <div className="relative">
                {/* Placeholder for profile image */}
                <div className="w-full h-64 md:h-96 bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      pointerEvents: 'none',
                      background: 'radial-gradient(circle at 50% 50%, rgba(255,140,66,0.2) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      ease: 'easeInOut',
                      repeat: Infinity,
                    }}
                  />
                  {/* Uploaded Image */}
                  {aboutImage ? (
                    <img src={aboutImage} alt="About" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full" style={{
                          backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(249,115,22,0.2) 1px, transparent 0)',
                          backgroundSize: '50px 50px'
                        }} />
                      </div>
                      
                      <div className="text-center relative z-10">
                        <div className="w-32 h-32 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">ic</span>
                        </div>
                        <p className="text-gray-400">İş & Tasarım</p>
                      </div>
                      
                      {/* Decorative orbs */}
                      <div className="absolute top-8 right-8 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl animate-pulse" />
                      <div className="absolute bottom-8 left-8 w-20 h-20 bg-accent-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </>
                  )}
                  
                  {/* Upload Button - Admin Only */}
                  {isAdmin && showUpload && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
                    >
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                          <PhotoIcon className="w-5 h-5" />
                          <span className="text-white font-medium">
                            {aboutImage ? 'Değiştir' : 'Görsel Yükle'}
                          </span>
                        </div>
                      </label>
                    </motion.div>
                  )}
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500/20 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-500/20 rounded-full blur-xl"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

