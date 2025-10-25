'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  BriefcaseIcon, 
  StarIcon, 
  GlobeAltIcon, 
  HeartIcon, 
  SparklesIcon, 
  EyeIcon 
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  value: number
  suffix: string
  label: string
  description: string
  delay: number
  isInView: boolean
}

function StatCard({ icon: Icon, value, suffix, label, description, delay, isInView }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [iconGlow, setIconGlow] = useState(false)

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)

      const interval = setInterval(() => {
        start += increment
        if (start >= end) {
          setDisplayValue(end)
          clearInterval(interval)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIconGlow(true), delay * 1000 + 100)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 group"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className="relative">
          <div 
            className={`absolute inset-0 bg-orange-500/20 rounded-full blur-xl transition-opacity duration-500 ${
              iconGlow ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="relative bg-gray-700/50 p-4 rounded-full group-hover:bg-gray-700 transition-colors duration-300">
            <Icon className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        {/* Value */}
        <div className="space-y-1">
          <div className="text-4xl sm:text-5xl font-bold text-white tabular-nums">
            {displayValue.toFixed(displayValue % 1 !== 0 ? 1 : 0)}{suffix}
          </div>
          <div className="text-lg font-semibold text-white">{label}</div>
          <div className="text-sm text-gray-400">{description}</div>
        </div>
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
      icon: BriefcaseIcon,
      value: 26,
      suffix: '+',
      label: t.skills.stats.projectsCompleted,
      description: t.skills.stats.projectsCompletedDesc
    },
    {
      icon: StarIcon,
      value: 4.9,
      suffix: '/5',
      label: t.skills.stats.clientSatisfaction,
      description: t.skills.stats.clientSatisfactionDesc
    },
    {
      icon: GlobeAltIcon,
      value: 8,
      suffix: '',
      label: t.skills.stats.countries,
      description: t.skills.stats.countriesDesc
    },
    {
      icon: HeartIcon,
      value: 320,
      suffix: '+',
      label: t.skills.stats.positiveFeedback,
      description: t.skills.stats.positiveFeedbackDesc
    },
    {
      icon: SparklesIcon,
      value: 40,
      suffix: '%',
      label: t.skills.stats.aiTimeSaved,
      description: t.skills.stats.aiTimeSavedDesc
    },
    {
      icon: EyeIcon,
      value: 15.2,
      suffix: 'K+',
      label: t.skills.stats.websiteViews,
      description: t.skills.stats.websiteViewsDesc
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="skills" className="section-padding bg-gray-800/30" aria-labelledby="skills-title">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 id="skills-title" className="text-4xl sm:text-5xl font-bold mb-6">
              <AnimatedText text={t.skills.title} />
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
            <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto">
              {t.skills.subtitle}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
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

