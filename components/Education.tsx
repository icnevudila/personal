'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'

export function Education() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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

  return (
    <section id="education" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <AnimatedText text={t.education.title} />
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
            <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto">
              {t.education.subtitle}
            </p>
          </motion.div>

          {/* Learning Section */}
          <motion.div variants={itemVariants}>
            <div className="card text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl" />
              </div>
              
              <div className="relative z-10">
                <BookOpenIcon className="w-16 h-16 text-primary-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t.education.mainTitle}
                </h3>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {t.education.mainDescription}
                </p>
                
                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {t.education.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                      whileHover={{ 
                        scale: 1.05,
                        rotate: [0, -2, 2, -2, 0],
                        transition: { duration: 0.3 }
                      }}
                      className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                    >
                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 blur-xl"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Icon animation */}
                      <motion.div
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-3 h-3 border-2 border-primary-500 rounded-full"
                        />
                      </motion.div>
                      
                      <span className="text-white font-medium text-sm relative z-10 group-hover:text-primary-500 transition-colors">
                        {tech}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Quote */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-300 italic text-lg mb-2">
                    "{t.education.quote}"
                  </p>
                  <p className="text-gray-500 text-sm">
                    {t.education.dailyProgress}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

