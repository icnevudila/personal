'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { BriefcaseIcon, SparklesIcon, HeartIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'
import LofiText from './LofiText'
import { uploadImageToSupabase } from '@/lib/supabase-storage'

export function About() {
  const { t, language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [aboutImage, setAboutImage] = useState<string>('https://res.cloudinary.com/dqiwrytdx/image/upload/v1761406379/hero/about-profile-1761406376606.jpg')
  const [showUpload, setShowUpload] = useState(false)
  // Admin functionality removed for security

  useEffect(() => {
    const saved = localStorage.getItem('aboutImage')
    if (saved) {
      setAboutImage(saved)
    }
    // Admin functionality removed for security
  }, [])

  // Upload function removed for security

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
    <section id="about" className="section-padding">
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
            <div className="w-24 h-1 bg-[#F97316] mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start px-4">
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 flex flex-col justify-center">
              <LofiText as="p" delay={0.2} hover={false} className="text-base sm:text-lg text-gray-900 dark:text-white leading-relaxed">
                {t.about.description1}
              </LofiText>
              
              <LofiText as="p" delay={0.3} hover={false} className="text-base sm:text-lg text-gray-900 dark:text-white leading-relaxed">
                {t.about.description2}
              </LofiText>

              <LofiText as="p" delay={0.4} hover={false} className="text-base sm:text-lg text-gray-900 dark:text-white leading-relaxed">
                {t.about.description3}
              </LofiText>

              {/* Caption */}
              <motion.p 
                variants={itemVariants}
                className="text-center text-black dark:text-gray-400 italic mt-6 md:mt-8 max-w-2xl mx-auto text-sm sm:text-base px-4 leading-relaxed"
              >
                {language === 'tr' 
                  ? '"Deneyimle desteklenen, teknoloji ile güçlendirilen ve duyguyla yönlendirilen tasarım."'
                  : '"Design backed by experience, powered by technology, and guided by emotion."'
                }
              </motion.p>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-12 max-w-4xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: -2,
                      transition: { duration: 0.3 }
                    }}
                    style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                    className="group cursor-pointer bg-gray-800/50 border border-gray-700 rounded-xl p-4 md:p-5 hover:border-[#F97316]/50 hover:shadow-[0_20px_40px_rgba(249,115,22,0.2)] transition-all ease-out duration-300 relative overflow-hidden"
                  >
                    {/* 3D Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#F97316]/0 via-[#F97316]/10 to-[#F97316]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                      whileHover={{ scale: 1.2, rotate: 45 }}
                    />
                    {/* Icon */}
                    <motion.div
                      className="mb-2 md:mb-3"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.3 }
                      }}
                    >
                      <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-[#F97316] group-hover:text-[#ea6707] transition-colors" />
                    </motion.div>
                    
                    {/* Title */}
                    <h4 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-1.5 group-hover:text-[#ea6707] transition-colors">
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
              className="relative flex items-center justify-center"
              onMouseEnter={() => setShowUpload(true)}
              onMouseLeave={() => setShowUpload(false)}
            >
              <div className="relative w-full max-w-lg">
                {/* Placeholder for profile image */}
                <div className="w-full h-64 md:h-96 bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Uploaded Image */}
                  {aboutImage ? (
                    <img src={aboutImage} alt="About" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="text-center relative z-10">
                        <div className="w-32 h-32 bg-[#F97316] rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">ic</span>
                        </div>
                        <p className="text-gray-400">İş & Tasarım</p>
                      </div>
                      
                      {/* Decorative orbs */}
                      <div className="absolute top-8 right-8 w-24 h-24 bg-[#F97316]/20 rounded-full blur-2xl animate-pulse" />
                      <div className="absolute bottom-8 left-8 w-20 h-20 bg-accent-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </>
                  )}
                  
                  {/* Upload functionality removed for security */}
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-[#F97316]/20 rounded-full blur-xl"
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

