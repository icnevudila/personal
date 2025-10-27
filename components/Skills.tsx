'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'
import { 
  ComputerDesktopIcon, 
  PaintBrushIcon, 
  SwatchIcon, 
  SparklesIcon, 
  ClockIcon, 
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline'

interface SkillCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  delay: number
  isInView: boolean
}

function SkillCard({ icon: Icon, title, description, delay, isInView }: SkillCardProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={isReducedMotion ? { duration: 0 } : { duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={isReducedMotion ? {} : { 
        scale: 1.05, 
        rotateY: 5, 
        rotateX: -2,
        boxShadow: '0 20px 40px rgba(249,115,22,0.2)'
      }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      className="group relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#F97316]/40 transition-all duration-300 ease-out hover:shadow-[0_0_30px_rgba(249,115,22,0.20)] overflow-hidden"
    >
      {/* 3D Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#F97316]/0 via-[#F97316]/20 to-[#F97316]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
        whileHover={{ scale: 1.2, rotate: 45 }}
      />
      {/* Icon with 3D rotation */}
      <motion.div 
        className="mb-4 relative z-10"
        whileHover={{ 
          rotate: [0, 10, -10, 0],
          scale: 1.1
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-12 h-12 bg-[#F97316]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F97316]/20 transition-colors group-hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]">
          <Icon className="w-6 h-6 text-[#F97316] group-hover:scale-110 transition-transform" />
        </div>
      </motion.div>
      
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-2 group-hover:text-[#F97316] transition-colors">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.article>
  )
}

export function Skills() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    // Clean up any existing inline styles
    const cleanup = () => {
      const skillsCards = document.querySelectorAll('#skills h3, #skills p')
      skillsCards.forEach(el => {
        (el as HTMLElement).style.removeProperty('color')
      })
    }

    cleanup()
  }, [])


  const skills = t.skills.skillCards.map((skill, index) => ({
    icon: [
      ComputerDesktopIcon,
      PaintBrushIcon,
      SwatchIcon,
      SparklesIcon,
      ClockIcon,
      ChatBubbleLeftRightIcon
    ][index],
    title: skill.title,
    description: skill.description,
    delay: index * 0.1
  }))

  return (
    <section id="skills" className="section-padding" aria-labelledby="skills-title">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 id="skills-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-[#F97316]">
              <AnimatedText text={t.skills.title} />
            </h2>
            <div className="w-24 h-1 bg-[#F97316] mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-[#94A3B8] mt-4 md:mt-6 max-w-2xl mx-auto">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Skills Grid - Desktop 3x2, Tablet 2x3, Mobile 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.title}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                delay={index * 0.1}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Footer text */}
          <div className="text-center mt-12">
            <p className="text-sm text-[#94A3B8] italic">
              
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

