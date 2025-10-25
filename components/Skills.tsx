'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'

interface StatCardProps {
  value: string
  label: string
  description: string
  delay: number
  isInView: boolean
}

function SkillCard({ value, label, description, delay, isInView }: StatCardProps) {
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
      whileHover={isReducedMotion ? {} : { scale: 1.02 }}
      className="group relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#F97316]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]"
    >
      {/* Icon/Emoji */}
      <div className="flex items-start gap-4">
        <div className="text-3xl sm:text-4xl flex-shrink-0">
          {description.match(/[☕🌍🤖🎯💡🧠]/)?.pop() || '✨'}
        </div>
        
        <div className="flex-1">
          {/* Label */}
          <h3 className="text-lg sm:text-xl font-bold text-[#E5E7EB] mb-2 group-hover:text-[#F97316] transition-colors">
            {label}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export function Skills() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skills = [
    {
      value: '',
      label: 'Kahve Bağımlısı',
      description: '26+ proje tamamladım çünkü kafein çok güçlü ☕'
    },
    {
      value: '',
      label: 'Çok Dilli Düşünür',
      description: '8 ülkeden insanla çalıştım, 3 dilde Figma açıyorum 🌍'
    },
    {
      value: '',
      label: 'Müşteri Delisi',
      description: '4.9★ müşteri memnuniyeti, AI bile onayladı 🤖'
    },
    {
      value: '',
      label: 'Revizyon Ustası',
      description: '320+ "biraz daha sağa alalım" isteğini başarıyla atlattım 🎯'
    },
    {
      value: '',
      label: 'Bitmeyen Deneyimci',
      description: '∞ yaratıcı fikir, sonsuz deneme–yanılma döngüsü 💡'
    },
    {
      value: '',
      label: 'Console.log Sever',
      description: '2.7K saat kod yazdım ama hâlâ console.log kullanıyorum 🧠'
    },
  ]

  return (
    <section id="skills" className="section-padding bg-[#0f172a]" aria-labelledby="skills-title">
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
            <h2 id="skills-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-[#E5E7EB]">
              <AnimatedText text="Gerçek Yeteneklerim" />
            </h2>
            <div className="w-24 h-1 bg-[#F97316] mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-[#94A3B8] mt-4 md:mt-6 max-w-2xl mx-auto">
              Formel yetenekler değil, gerçek hayat hikayeleri 💼
            </p>
          </div>

          {/* Skills Grid - Desktop 3x2, Tablet 2x3, Mobile 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.label}
                value={skill.value}
                label={skill.label}
                description={skill.description}
                delay={index * 0.1}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

