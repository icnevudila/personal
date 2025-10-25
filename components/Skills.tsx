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

function StatCard({ value, label, description, delay, isInView }: StatCardProps) {
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
      whileHover={isReducedMotion ? {} : { scale: 1.03 }}
      className="group relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]"
    >
      {/* Value */}
      <div className="mb-3">
        <h3 className="text-4xl sm:text-5xl font-bold text-[#F97316] tabular-nums">
          {value}
        </h3>
      </div>

      {/* Label */}
      <div className="mb-2">
        <p className="text-base sm:text-lg font-semibold text-[#E5E7EB]">
          {label}
        </p>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          {description}
        </p>
      </div>
    </motion.article>
  )
}

export function Skills() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    {
      value: '26+',
      label: 'Tamamlanan Proje',
      description: 'Kahveyle desteklenen üretkenlik rekoru ☕'
    },
    {
      value: '8',
      label: 'İş Yapılan Ülke',
      description: 'Figma menüleri artık 3 dilde düşünülüyor 🌍'
    },
    {
      value: '4.9★',
      label: 'Müşteri Memnuniyeti',
      description: 'AI bile onayladı 🤖'
    },
    {
      value: '320+',
      label: 'Tasarım Revizyonu',
      description: 'Her "biraz daha sağa alalım" isteği kayıtlarda 🎯'
    },
    {
      value: '∞',
      label: 'Yaratıcı Fikir',
      description: 'Bitmeyen deneme–yanılma döngüsü 💡'
    },
    {
      value: '2.7K',
      label: 'Harcanan Kod Saati',
      description: 'Ama hâlâ console.log kullanıyorum 🧠'
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
              <AnimatedText text={t.skills.title} />
            </h2>
            <div className="w-24 h-1 bg-[#F97316] mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-[#94A3B8] mt-4 md:mt-6 max-w-2xl mx-auto">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Stats Grid - Desktop 3x2, Tablet 2x3, Mobile 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                description={stat.description}
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

